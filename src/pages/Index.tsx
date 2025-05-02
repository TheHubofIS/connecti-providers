
import { useEffect, useState, useRef } from "react";
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

const useParallax = () => {
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return scrollY;
};

const Index = () => {
  const { language } = useLanguage();
  const scrollY = useParallax();
  const sectionRefs = useRef([]);
  const [visibleSections, setVisibleSections] = useState({});
  
  // Initialiser les refs
  useEffect(() => {
    sectionRefs.current = sectionRefs.current.slice(0, 9);
  }, []);
  
  // Observer les sections pour déclencher les animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1
    };
    
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisibleSections(prev => ({
            ...prev,
            [entry.target.dataset.section]: true
          }));
        }
      });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    sectionRefs.current.forEach((ref, index) => {
      if (ref) {
        ref.dataset.section = `section-${index}`;
        observer.observe(ref);
      }
    });
    
    return () => observer.disconnect();
  }, []);
  
  // Créer une fonction pour calculer les styles de parallaxe
  const getParallaxStyle = (speed) => ({
    transform: `translateY(${scrollY * speed}px)`
  });
  
  // Déterminer si une section est visible
  const isVisible = (index) => visibleSections[`section-${index}`];
  
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <main>
        <div 
          ref={el => sectionRefs.current[0] = el}
          className={`transition-all duration-1000 ${isVisible(0) ? "opacity-100" : "opacity-0 transform translate-y-10"}`}
        >
          <Hero />
        </div>
        
        <div 
          ref={el => sectionRefs.current[1] = el}
          className={`transition-all duration-1000 delay-100 ${isVisible(1) ? "opacity-100" : "opacity-0 transform translate-y-10"}`}
        >
          <ServiceCategories />
        </div>
        
        <div 
          ref={el => sectionRefs.current[2] = el}
          className={`transition-all duration-1000 delay-150 ${isVisible(2) ? "opacity-100" : "opacity-0 transform translate-y-10"}`}
        >
          <HowItWorks />
        </div>
        
        <div 
          ref={el => sectionRefs.current[3] = el}
          className={`transition-all duration-1000 delay-200 ${isVisible(3) ? "opacity-100" : "opacity-0 transform translate-y-10"}`}
        >
          <FeaturedProviders />
        </div>
        
        <div 
          ref={el => sectionRefs.current[4] = el}
          className={`transition-all duration-1000 delay-250 ${isVisible(4) ? "opacity-100" : "opacity-0 transform translate-y-10"}`}
        >
          <Stats />
        </div>
        
        <div 
          ref={el => sectionRefs.current[5] = el}
          className={`transition-all duration-1000 delay-300 ${isVisible(5) ? "opacity-100" : "opacity-0 transform translate-y-10"}`}
        >
          <div className="relative overflow-hidden">
            {/* Couches de parallaxe */}
            <div 
              className="absolute inset-0 pointer-events-none z-0" 
              style={getParallaxStyle(0.05)}
            >
              {Array.from({ length: 10 }).map((_, i) => (
                <div 
                  key={i}
                  className="absolute rounded-full bg-primary/5"
                  style={{
                    width: `${Math.random() * 200 + 100}px`,
                    height: `${Math.random() * 200 + 100}px`,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    opacity: Math.random() * 0.5 + 0.1
                  }}
                />
              ))}
            </div>
            
            {/* Contenu réel */}
            <div className="relative z-10">
              <ProjectsCarousel />
            </div>
          </div>
        </div>
        
        <div 
          ref={el => sectionRefs.current[6] = el}
          className={`transition-all duration-1000 delay-350 ${isVisible(6) ? "opacity-100" : "opacity-0 transform translate-y-10"}`}
        >
          <FeaturedExpats />
        </div>
        
        <div 
          ref={el => sectionRefs.current[7] = el}
          className={`transition-all duration-1000 delay-400 relative overflow-hidden ${isVisible(7) ? "opacity-100" : "opacity-0 transform translate-y-10"}`}
        >
          {/* Effet de parallaxe pour les témoignages */}
          <div 
            className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 z-0" 
            style={getParallaxStyle(-0.03)}
          />
          <div 
            className="absolute inset-0 pointer-events-none z-0" 
            style={getParallaxStyle(-0.05)}
          >
            {Array.from({ length: 15 }).map((_, i) => (
              <div 
                key={i}
                className="absolute rounded-full bg-white/10 dark:bg-white/5"
                style={{
                  width: `${Math.random() * 80 + 20}px`,
                  height: `${Math.random() * 80 + 20}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  boxShadow: "0 0 20px rgba(255, 255, 255, 0.1)",
                  opacity: Math.random() * 0.4 + 0.1
                }}
              />
            ))}
          </div>
          
          <div 
            className="absolute top-10 left-20 transform rotate-12 opacity-10 z-0" 
            style={getParallaxStyle(0.04)}
          >
            <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 15C21 16.1046 20.1046 17 19 17H7L3 21V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V15Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
            </svg>
          </div>
          
          <div 
            className="absolute bottom-10 right-20 transform -rotate-12 opacity-10 z-0" 
            style={getParallaxStyle(-0.04)}
          >
            <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 12H8.01M12 12H12.01M16 12H16.01M21 12C21 16.418 16.97 20 12 20C10.5 20 9.077 19.732 7.8 19.246L3 20L4.3 15.5C3.469 14.25 3 12.909 3 12C3 7.582 7.03 4 12 4C16.97 4 21 7.582 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          
          <div className="relative z-10">
            <Testimonials />
          </div>
        </div>
        
        <div 
          ref={el => sectionRefs.current[8] = el}
          className={`transition-all duration-1000 delay-450 ${isVisible(8) ? "opacity-100" : "opacity-0 transform translate-y-10"}`}
        >
          <ContactCTA />
        </div>
      </main>
      <Footer />
      
      {/* Style pour les animations de parallaxe */}
      <style>
        {`
        .parallax-zoom {
          transition: transform 0.3s ease-out;
        }
        .parallax-zoom:hover {
          transform: scale(1.05);
        }
        `}
      </style>
    </div>
  );
};

export default Index;
