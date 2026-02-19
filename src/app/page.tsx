import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingCTA from "@/components/layout/FloatingCTA";
import HeroSection from "@/components/sections/HeroSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import ProcessSection from "@/components/sections/ProcessSection";
import AboutSection from "@/components/sections/AboutSection";
import FAQSection from "@/components/sections/FAQSection";
import ContactSection from "@/components/sections/ContactSection";
import FinalCTASection from "@/components/sections/FinalCTASection";
import { getAllPortfolios } from "@/lib/content/portfolio";

export default function Home() {
  const portfolios = getAllPortfolios();

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <PortfolioSection portfolios={portfolios} />
        <ProcessSection />
        <AboutSection />
        <FAQSection />
        <ContactSection />
        <FinalCTASection />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
