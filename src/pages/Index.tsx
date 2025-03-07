
import Hero from "@/components/Hero";
import ServiceCategories from "@/components/ServiceCategories";
import FeaturedProviders from "@/components/FeaturedProviders";
import ProjectsCarousel from "@/components/ProjectsCarousel";
import FeaturedExpats from "@/components/FeaturedExpats";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import Stats from "@/components/Stats";
import ContactCTA from "@/components/ContactCTA";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <ServiceCategories />
        <HowItWorks />
        <ProjectsCarousel />
        <FeaturedProviders />
        <FeaturedExpats />
        <Stats />
        <Testimonials />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
