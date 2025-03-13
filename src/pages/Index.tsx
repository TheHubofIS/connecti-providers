
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
  return (
    <div className="min-h-screen">
      <main>
        <Hero />
        <ServiceCategories />
        <HowItWorks />
        <FeaturedProviders />
        <Stats />
        <ProjectsCarousel />
        <FeaturedExpats />
        <Testimonials />
        <ContactCTA />
      </main>
    </div>
  );
};

export default Index;
