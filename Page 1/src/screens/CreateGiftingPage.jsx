import Placeholder from "@/components/Placeholder.jsx";
import Hero from "../components/Hero.jsx";
import HowItWorks from "../components/HowItWorks.jsx";

export const path = "/";

export default function CreateGiftingPage() {
  return (
    <div>
      <Hero />
      <HowItWorks />
      <Placeholder label="Trust and safety note" week={3} />
    </div>
  );
}
