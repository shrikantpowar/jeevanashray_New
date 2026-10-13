/**
 * Community Vignettes and Field Narratives
 * Honest documentary accounts reflecting real areas of work
 */

export interface FieldStory {
  id: string;
  title: string;
  program: string;
  location: string;
  excerpt: string;
  body: string;
  imageSlotId: string;
  impactHighlight: string;
}

export const fieldStories: FieldStory[] = [
  {
    id: "story-crop-resilience",
    title: "Overcoming Low Crop Yields: An Agrarian Community in Palghar",
    program: "Rural Agriculture & Livelihoods",
    location: "Palghar District, Maharashtra",
    excerpt: "How marginal farming families moved from debt cycles to soil restoration and shared compost methods.",
    body: "In rural Maharashtra, erratic rainfall and depleted topsoil had reduced seasonal grain yields to unsustainable levels. Through Jeevanashray Foundation's rural livelihoods initiative, smallholders formed mutual learning circles. By introducing indigenous drought-resistant seeds, compost-enriched moisture retention, and collective seed banks, the community reduced reliance on expensive commercial fertilizers and stabilized subsistence harvests.",
    imageSlotId: "story-savitri",
    impactHighlight: "Saved 40+ agrarian households from high-interest emergency borrowing"
  }
];
