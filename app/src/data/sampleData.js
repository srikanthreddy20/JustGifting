// Sample data for Week 2. Replaced by the FastAPI + Supabase data in Week 6.
import { IMG } from "./images.js";

export const samplePage = {
  // `slug` is used to generate the public shareable URL, e.g. /p/<slug>
  slug: "maya-30th",
  title: "Maya's 30th Birthday",
  interests: "Art & Coffee lover",
  budgetMin: 5000,
  budgetMax: 15000,
};

export const sampleGifts = [
  { id: "g1", title: "Artisan Ceramic Pour-Over Coffee Set", reason: "Matches their love of art & coffee",
    description: "Handcrafted by local studio Blue Pottery, featuring unique reactive glaze and gold-rimmed dripper.",
    shop: "Blue Studio Artisans, Indiranagar", price: 4500, priority: "High Priority", img: IMG.coffeeSet, selected: true },
  { id: "g2", title: "Professional Botanical Watercolor Kit", reason: "Matches their love of art",
    description: "Curated set of 24 artist-grade pan paints, sable brushes, and a custom-bound cold-press journal.",
    shop: "Kala Arts & Crafts, Brigade Road", price: 8200, priority: "Nice to Have", img: IMG.watercolor, selected: false },
  { id: "g3", title: "Conical Burr Coffee Grinder", reason: "Matches coffee enthusiast profile",
    description: "Precision grinding settings from espresso to cold brew, essential for the morning ritual.",
    shop: "Blue Tokai Roasters", price: 12000, priority: "High Priority", img: IMG.grinder, selected: true },
  { id: "g4", title: "Masterclass Cookbook Edition", reason: "Matches their love of cooking",
    description: "Hardcover collector edition with step-by-step techniques from world-class chefs.",
    shop: "Bookworm, Church Street", price: 3200, priority: "Nice to Have", img: IMG.cookbook, selected: true },
  { id: "g5", title: "Smart Indoor Herb Garden", reason: "Matches their love of fresh coffee-time treats",
    description: "A self-watering planter with grow lights, so herbs thrive all year on the studio balcony.",
    shop: "Green Nook, Jayanagar", price: 5000, priority: "Nice to Have", img: IMG.herbGarden, selected: true },
];

// Amount pledged so far per gift (simulated)
export const samplePledged = { g1: 4500, g3: 8000, g4: 3200, g5: 2800 };
