
import { Search, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { translate } = useLanguage();

  const categories = [
    { id: "all", name: translate('all') },
    { id: "juridique", name: "Juridique" },
    { id: "comptabilite", name: "Comptabilité" },
    { id: "it", name: "IT" },
    { id: "medical", name: "Médical" },
    { id: "dentaire", name: "Dentaire" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique de recherche à implémenter
    console.log("Recherche:", { query: searchQuery, category: selectedCategory });
  };

  return (
    <div className="relative min-h-screen pt-24 pb-16 flex flex-col justify-center">
      {/* Background gradients */}
      <div className="blur-gradient blur-gradient-primary absolute top-1/4 right-[10%]"></div>
      <div className="blur-gradient blur-gradient-secondary absolute bottom-1/4 left-[10%]"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block animate-fade-in px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            {translate('hero.tagline')}
          </span>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in delay-100 text-balance leading-tight">
            {translate('hero.title')}
            <span className="text-primary"> </span>
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in delay-200">
            {translate('hero.subtitle')}
          </p>

          <div className="bg-white dark:bg-secondary/30 rounded-xl p-2 shadow-lg max-w-2xl mx-auto animate-fade-in delay-300 neo">
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
                className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all flex items-center justify-center"
              >
                {translate('search')}
              </button>
            </form>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-8 animate-fade-in delay-400">
            <Link
              to="/comment-ca-marche"
              className="px-6 py-3 rounded-lg border border-primary/20 text-primary hover:bg-primary/5 transition-all flex items-center gap-2"
            >
              <span>{translate('hero.btnHowItWorks')}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/prestataires"
              className="px-6 py-3 rounded-lg bg-foreground dark:bg-foreground/90 text-background dark:text-background hover:bg-foreground/90 dark:hover:bg-foreground/80 transition-all"
            >
              {translate('hero.btnBrowseProviders')}
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap gap-6 justify-center animate-fade-in delay-500">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-sm font-medium">{translate('hero.feature1')}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <span className="text-sm font-medium">{translate('hero.feature2')}</span>
            </div>
            <div className="flex items-center gap-2">
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
