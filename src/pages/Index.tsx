
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ServiceCategories from "@/components/ServiceCategories";
import FeaturedProviders from "@/components/FeaturedProviders";
import ProjectsCarousel from "@/components/ProjectsCarousel";
import FeaturedExpats from "@/components/FeaturedExpats";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import Stats from "@/components/Stats";
import ContactCTA from "@/components/ContactCTA";

const Index = () => {
  const { language } = useLanguage();
  
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <div className="animate-fade-in">
          <Hero />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "100ms" }}>
          <ServiceCategories />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
          <HowItWorks />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "300ms" }}>
          <FeaturedProviders />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "400ms" }}>
          <Stats />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "500ms" }}>
          <ProjectsCarousel />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "600ms" }}>
          <FeaturedExpats />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "700ms" }}>
          <Testimonials />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "800ms" }}>
          <ContactCTA />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
