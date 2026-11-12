import Hero from "../components/Hero.jsx";
import HowItWorks from "../components/HowItWorks.jsx";
import TrustSafety from "../components/TrustSafety.jsx";
import Footer from "../components/Footer.jsx";

export const path = "/";

export default function CreateGiftingPage() {
  return (
    <div className="flex flex-col">
      <Hero />
      <HowItWorks />
      <TrustSafety />
      <Footer />
    </div>
  );
}
