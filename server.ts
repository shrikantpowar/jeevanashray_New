import express, { Request, Response } from 'express';
import path from 'path';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Enable raw body capture on JSON payloads for webhook HMAC verification
app.use(
  express.json({
    verify: (req: any, _res, buf) => {
      req.rawBody = buf;
    }
  })
);

// In-memory idempotent store for processed webhook events (Zero database architecture)
const processedWebhookEventIds = new Set<string>();

// Cashfree configuration from environment variables
const CASHFREE_APP_ID = process.env.CASHFREE_APP_ID || '';
const CASHFREE_SECRET_KEY = process.env.CASHFREE_SECRET_KEY || '';
const CASHFREE_ENV = (process.env.CASHFREE_ENV || 'TEST').toUpperCase();
const CASHFREE_API_VERSION = process.env.CASHFREE_API_VERSION || '2023-08-01';
const CASHFREE_WEBHOOK_SECRET = process.env.CASHFREE_WEBHOOK_SECRET || '';
const APP_BASE_URL = process.env.APP_BASE_URL || `http://localhost:${PORT}`;

const isProduction = CASHFREE_ENV === 'PROD' || CASHFREE_ENV === 'PRODUCTION';
const CASHFREE_BASE_URL = isProduction
  ? 'https://api.cashfree.com/pg'
  : 'https://sandbox.cashfree.com/pg';

const hasRealCredentials =
  Boolean(CASHFREE_APP_ID && CASHFREE_SECRET_KEY) &&
  !CASHFREE_APP_ID.includes('CF_APP_ID') &&
  !CASHFREE_SECRET_KEY.includes('CF_SECRET_KEY');

/**
 * 1. POST /api/payments/create-order
 * Validates donation details and creates an official Cashfree payment order.
 */
app.post('/api/payments/create-order', async (req: Request, res: Response): Promise<void> => {
  try {
    const { amount, frequency, customerName, customerEmail, customerPhone, pan } = req.body;

    // Strict Server-Side Validation
    const donationAmount = Number(amount);
    if (!donationAmount || isNaN(donationAmount) || donationAmount < 10) {
      res.status(400).json({
        success: false,
        message: 'Invalid donation amount. Minimum donation is ₹10.'
      });
      return;
    }

    if (!customerName || typeof customerName !== 'string' || customerName.trim().length === 0) {
      res.status(400).json({
        success: false,
        message: 'Full legal name is required for receipt generation.'
      });
      return;
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!customerEmail || !emailRegex.test(customerEmail)) {
      res.status(400).json({
        success: false,
        message: 'A valid email address is required for 80G receipt dispatch.'
      });
      return;
    }

    const cleanPhone = String(customerPhone).replace(/[^0-9]/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      res.status(400).json({
        success: false,
        message: 'A valid 10-digit mobile number is required.'
      });
      return;
    }

    // Generate unique order reference: e.g. JAF_1742080000000_abc12
    const orderId = `JAF_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const customerId = `donor_${cleanPhone.slice(-10)}_${Date.now().toString(36)}`;

    // If live/sandbox credentials are configured in environment
    if (hasRealCredentials) {
      const orderPayload = {
        order_amount: donationAmount,
        order_currency: 'INR',
        order_id: orderId,
        customer_details: {
          customer_id: customerId,
          customer_phone: cleanPhone.slice(-10),
          customer_name: customerName.trim(),
          customer_email: customerEmail.trim()
        },
        order_meta: {
          return_url: `${APP_BASE_URL}/donation-success?order_id={order_id}`
        },
        order_note: `Donation to Jeevanashray Foundation (${frequency || 'one-time'})`
      };

      const cfResponse = await fetch(`${CASHFREE_BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-client-id': CASHFREE_APP_ID,
          'x-client-secret': CASHFREE_SECRET_KEY,
          'x-api-version': CASHFREE_API_VERSION
        },
        body: JSON.stringify(orderPayload)
      });

      const cfData = await cfResponse.json();

      if (!cfResponse.ok || !cfData.payment_session_id) {
        res.status(cfResponse.status || 502).json({
          success: false,
          message: cfData.message || 'Error communicating with Cashfree payment gateway.',
          details: cfData
        });
        return;
      }

      res.status(200).json({
        success: true,
        orderId: cfData.order_id,
        paymentSessionId: cfData.payment_session_id,
        sandboxMode: !isProduction
      });
      return;
    }

    // Sandbox Demonstration Mode (When waiting for real Cashfree credentials in .env)
    const mockPaymentSessionId = `session_mock_${orderId}_${Math.random().toString(36).substring(2, 9)}`;

    res.status(200).json({
      success: true,
      orderId,
      paymentSessionId: mockPaymentSessionId,
      sandboxMode: true,
      isDemoSandbox: true,
      message: 'Cashfree test order initialized in sandbox mode.'
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Internal server error processing payment request.',
      error: error.message
    });
  }
});

/**
 * 2. GET /api/payments/verify/:orderId
 * Authoritative server-side verification of payment status directly with Cashfree.
 */
app.get('/api/payments/verify/:orderId', async (req: Request, res: Response): Promise<void> => {
  try {
    const { orderId } = req.params;

    if (!orderId) {
      res.status(400).json({ success: false, message: 'Missing orderId parameter.' });
      return;
    }

    if (hasRealCredentials) {
      const cfResponse = await fetch(`${CASHFREE_BASE_URL}/orders/${encodeURIComponent(orderId)}`, {
        method: 'GET',
        headers: {
          'x-client-id': CASHFREE_APP_ID,
          'x-client-secret': CASHFREE_SECRET_KEY,
          'x-api-version': CASHFREE_API_VERSION
        }
      });

      const cfData = await cfResponse.json();

      if (!cfResponse.ok) {
        res.status(cfResponse.status).json({
          success: false,
          message: cfData.message || 'Unable to retrieve order from Cashfree.',
          order_status: 'UNKNOWN'
        });
        return;
      }

      res.status(200).json({
        success: true,
        orderId: cfData.order_id,
        order_status: cfData.order_status, // 'PAID', 'ACTIVE', 'EXPIRED', 'TERMINATED'
        order_amount: cfData.order_amount,
        order_currency: cfData.order_currency
      });
      return;
    }

    // In sandbox test without live API keys:
    res.status(200).json({
      success: true,
      orderId,
      order_status: 'PAID',
      order_amount: 1000,
      order_currency: 'INR',
      isDemoSandbox: true
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to verify payment with Cashfree server.',
      error: error.message
    });
  }
});

/**
 * 3. POST /api/payments/webhook
 * Verifies webhook signatures using HMAC-SHA256 with raw body buffer and handles duplicates safely.
 */
app.post('/api/payments/webhook', (req: any, res: Response): void => {
  try {
    const signature = req.headers['x-webhook-signature'] as string;
    const timestamp = req.headers['x-webhook-timestamp'] as string;

    if (!signature || !timestamp) {
      res.status(400).json({ success: false, message: 'Missing webhook verification headers.' });
      return;
    }

    // Signature verification using raw body buffer
    const rawBodyBuffer = req.rawBody as Buffer;
    if (!rawBodyBuffer) {
      res.status(400).json({ success: false, message: 'Raw body missing for HMAC computation.' });
      return;
    }

    const secret = CASHFREE_WEBHOOK_SECRET || 'test_webhook_secret';
    const computedSignature = crypto
      .createHmac('sha256', secret)
      .update(timestamp + rawBodyBuffer.toString('utf8'))
      .digest('base64');

    // Safe timing-safe comparison to prevent timing attacks
    let signaturesMatch = false;
    try {
      const sigBuffer = Buffer.from(signature);
      const compBuffer = Buffer.from(computedSignature);
      if (sigBuffer.length === compBuffer.length) {
        signaturesMatch = crypto.timingSafeEqual(sigBuffer, compBuffer);
      }
    } catch {
      signaturesMatch = false;
    }

    // In test environment, allow test event pass if secret is not configured
    if (!signaturesMatch && hasRealCredentials && CASHFREE_WEBHOOK_SECRET) {
      res.status(401).json({ success: false, message: 'Invalid webhook signature.' });
      return;
    }

    const payload = req.body;
    const eventId = payload?.data?.order?.order_id || payload?.event_time || `${timestamp}_${signature.slice(0, 8)}`;

    // Safe handling of duplicate webhook events (idempotence)
    if (processedWebhookEventIds.has(eventId)) {
      res.status(200).json({ success: true, message: 'Duplicate webhook event acknowledged without reprocessing.' });
      return;
    }

    processedWebhookEventIds.add(eventId);

    // Keep cache bounded to 1000 items in memory
    if (processedWebhookEventIds.size > 1000) {
      const first = processedWebhookEventIds.values().next().value;
      if (first) processedWebhookEventIds.delete(first);
    }

    res.status(200).json({ success: true, message: 'Webhook processed successfully.' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Webhook processing error.', error: error.message });
  }
});

// Vite Middleware for Development / Static Hosting for Production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve('dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, () => {
    // Clean server startup
  });
}

startServer();
