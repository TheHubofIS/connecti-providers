
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { 
  generateDummyProviders, 
  categories, 
  searchProviders, 
  getProvidersByCategory 
} from "@/utils/serviceData";
import { Provider } from "@/types/provider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProviderCard from "../components/ProviderCard";
import PrestatairesFilters from "../components/PrestatairesFilters";
import SearchBar from "../components/SearchBar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Filter } from "lucide-react";

export default function Prestataires() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll to top when the page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Parse URL query parameters
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [location]);

  // Fetch providers based on filters
  useEffect(() => {
    setLoading(true);
    
    const getProviders = async () => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      try {
        let results;
        if (selectedCategory === "all") {
          results = generateDummyProviders();
        } else {
          results = getProvidersByCategory(selectedCategory);
        }
        setProviders(results);
      } catch (error) {
        console.error("Error fetching providers:", error);
      } finally {
        setLoading(false);
      }
    };
    
    getProviders();
  }, [selectedCategory]);

  // Handle search
  const handleSearch = async (query: string, category: string) => {
    setLoading(true);
    console.info("Recherche:", { query, category });
    
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      if (!query || query.trim() === "") {
        // If no query, just filter by category
        if (category === "all") {
          setProviders(generateDummyProviders());
        } else {
          setProviders(getProvidersByCategory(category));
        }
      } else {
        // If we have a query, search by it
        const results = searchProviders(query);
        
        // Additionally filter by category if needed
        if (category !== "all") {
          const categoryObj = categories.find(c => c.id === category);
          if (categoryObj) {
            setProviders(results.filter(p => p.category === categoryObj.name));
          } else {
            setProviders(results);
          }
        } else {
          setProviders(results);
        }
      }
    } catch (error) {
      console.error("Error searching providers:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle category change
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    
    // Update URL to reflect the selected category
    const searchParams = new URLSearchParams(location.search);
    
    if (categoryId === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", categoryId);
    }
    
    navigate({
      pathname: location.pathname,
      search: searchParams.toString()
    });

    // Scroll back to top on category change
    window.scrollTo(0, 0);
  };

  // Get selected category name
  const getSelectedCategoryName = () => {
    if (selectedCategory === "all") return "Tous les prestataires";
    
    const category = categories.find(c => c.id === selectedCategory);
    return category ? `Prestataires ${category.name}` : "Prestataires";
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pb-16 pt-28 px-4">
        <div className="container mx-auto">
          <div className="mb-8">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold">{getSelectedCategoryName()}</h1>
                <p className="text-muted-foreground mt-2">
                  Trouvez les meilleurs professionnels pour vous accompagner dans votre expatriation
                </p>
              </div>
              
              <Button 
                variant="outline" 
                className="lg:hidden"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filtres
              </Button>
            </div>
            
            <SearchBar onSearch={handleSearch} selectedCategory={selectedCategory} />
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className={`lg:w-64 shrink-0 ${showFilters ? 'block' : 'hidden'} lg:block`}>
              <PrestatairesFilters 
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
              />
            </aside>
            
            <main className="flex-1">
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(9)].map((_, i) => (
                    <div 
                      key={i} 
                      className="bg-card animate-pulse h-64 rounded-lg border border-border/60"
                    />
                  ))}
                </div>
              ) : providers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {providers.map((provider) => (
                    <ProviderCard key={provider.id} provider={provider} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium mb-2">Aucun prestataire trouvé</h3>
                  <p className="text-muted-foreground mb-6">
                    Aucun prestataire ne correspond à vos critères de recherche.
                  </p>
                  <Button onClick={() => {
                    setSelectedCategory("all");
                    navigate("/prestataires");
                  }}>
                    Voir tous les prestataires
                  </Button>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
