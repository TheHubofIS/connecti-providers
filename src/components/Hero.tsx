
import { Search, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { translate } = useLanguage();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  const categories = [
    { id: "all", name: translate('all') },
    { id: "juridique", name: translate('categories.legal') },
    { id: "comptabilite", name: translate('categories.accounting') },
    { id: "it", name: translate('categories.it') },
    { id: "medical", name: translate('categories.medical') },
    { id: "dentaire", name: translate('categories.dental') },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/prestataires?query=${encodeURIComponent(searchQuery)}&category=${selectedCategory}`);
  };
  
  useEffect(() => {
    setIsVisible(true);
    
    // Animation sequence for the gradient elements
    const gradients = document.querySelectorAll('.blur-gradient');
    gradients.forEach((gradient, index) => {
      setTimeout(() => {
        (gradient as HTMLElement).style.opacity = '0.5';
        (gradient as HTMLElement).classList.add('animate-float');
      }, 300 + (index * 200));
    });
  }, []);

  return (
    <div className="relative min-h-screen pt-24 pb-16 flex flex-col justify-center overflow-hidden">
      {/* Enhanced background gradients with staggered animations */}
      <div 
        className={`blur-gradient blur-gradient-primary absolute top-1/4 right-[10%] opacity-0 transition-opacity duration-1000 ease-in-out`} 
        style={{ animationDelay: '0.3s' }}
      />
      <div 
        className={`blur-gradient blur-gradient-secondary absolute bottom-1/4 left-[10%] opacity-0 transition-opacity duration-1000 ease-in-out`}
        style={{ animationDelay: '0.5s' }}
      />
      <div 
        className={`blur-gradient blur-gradient-primary opacity-0 absolute top-[60%] left-[30%] transition-opacity duration-1000 ease-in-out`}
        style={{ animationDelay: '0.7s' }}
      />
      <div 
        className={`blur-gradient blur-gradient-secondary opacity-0 absolute bottom-[70%] right-[20%] transition-opacity duration-1000 ease-in-out`}
        style={{ animationDelay: '0.9s' }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <span 
            className={`inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 ${
              isVisible ? 'animate-fade-in opacity-100' : 'opacity-0'
            }`}
            style={{ transitionDelay: '0.2s' }}
          >
            {translate('hero.tagline')}
          </span>
          
          <h1 
            className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance leading-tight ${
              isVisible ? 'animate-fade-in opacity-100' : 'opacity-0'
            }`}
            style={{ transitionDelay: '0.4s' }}
          >
            {translate('hero.title')}
            <span className="text-primary"> </span>
          </h1>
          
          <p 
            className={`text-lg text-muted-foreground mb-8 max-w-2xl mx-auto ${
              isVisible ? 'animate-fade-in opacity-100' : 'opacity-0'
            }`}
            style={{ transitionDelay: '0.6s' }}
          >
            {translate('hero.subtitle')}
          </p>

          <div 
            className={`bg-white dark:bg-secondary/30 rounded-xl p-2 shadow-lg max-w-2xl mx-auto neo ${
              isVisible ? 'animate-fade-in opacity-100' : 'opacity-0'
            }`}
            style={{ transitionDelay: '0.8s' }}
          >
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-2">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <input
                  type="text"
                  placeholder={translate('hero.searchPlaceholder')}
                  className="w-full py-3 pl-10 pr-4 bg-transparent rounded-lg border border-input focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <select
                className="py-3 px-4 border border-input rounded-lg bg-transparent focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all md:w-auto"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              
              <button
                type="submit"
                className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all flex items-center justify-center hover:shadow-md"
              >
                {translate('search')}
              </button>
            </form>
          </div>

          <div 
            className={`flex flex-wrap justify-center gap-4 mt-8 ${
              isVisible ? 'animate-fade-in opacity-100' : 'opacity-0'
            }`}
            style={{ transitionDelay: '1s' }}
          >
            <Link
              to="/comment-ca-marche"
              className="px-6 py-3 rounded-lg border border-primary/20 text-primary hover:bg-primary/5 transition-all flex items-center gap-2 hover-lift"
            >
              <span>{translate('hero.btnHowItWorks')}</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/prestataires"
              className="px-6 py-3 rounded-lg bg-foreground dark:bg-foreground/90 text-background dark:text-background hover:bg-foreground/90 dark:hover:bg-foreground/80 transition-all hover-lift"
            >
              {translate('hero.btnBrowseProviders')}
            </Link>
          </div>

          <div 
            className={`mt-12 flex flex-wrap gap-6 justify-center ${
              isVisible ? 'animate-fade-in opacity-100' : 'opacity-0'
            }`}
            style={{ transitionDelay: '1.2s' }}
          >
            <div className="flex items-center gap-2 hover:scale-105 transition-transform">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-sm font-medium">{translate('hero.feature1')}</span>
            </div>
            <div className="flex items-center gap-2 hover:scale-105 transition-transform">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <span className="text-sm font-medium">{translate('hero.feature2')}</span>
            </div>
            <div className="flex items-center gap-2 hover:scale-105 transition-transform">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <span className="text-sm font-medium">{translate('hero.feature3')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
