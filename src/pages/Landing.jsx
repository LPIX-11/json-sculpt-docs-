import Navbar from "../components/Navbar";
import Divider from "../components/Divider";
import Hero from "../sections/Hero";
import BeforeAfter from "../sections/BeforeAfter";
import Features from "../sections/Features";
import Playground from "../sections/Playground";
import Stats from "../sections/Stats";
import DeepDive from "../sections/DeepDive";
import Install from "../sections/Install";
import Footer from "../sections/Footer";

export function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <BeforeAfter />
      <Divider />
      <Features />
      <Playground />
      <Stats />
      <DeepDive />
      <Install />
      <Footer />
    </>
  );
}
