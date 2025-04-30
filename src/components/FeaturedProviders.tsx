
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFeaturedProviders } from "@/utils/serviceData";
import { Provider } from "@/types/provider";
import ProviderCard from "./ProviderCard";

export default function FeaturedProviders() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Force scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Simulate API call with a small delay
    const fetchProviders = async () => {
      setLoading(true);
      try {
        // Small delay to simulate network request
        await new Promise(resolve => setTimeout(resolve, 300));
        const featuredProviders = getFeaturedProviders();
        setProviders(featuredProviders);
      } catch (error) {
        console.error("Error fetching featured providers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, []);

  const handleClick = () => {
    // Ensure scroll to top when navigating to providers page
    window.scrollTo(0, 0);
  };

  return (
    <section className="py-24 bg-muted/30">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Prestataires à la une
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Découvrez nos prestataires de services les mieux notés, tous vérifiés et prêts à vous aider dans votre aventure d'expatriation.
            </p>
          </div>
          <Link
            to="/prestataires"
            className="mt-6 md:mt-0 inline-flex items-center text-primary hover:underline"
            onClick={handleClick}
          >
            Voir tous les prestataires
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-card animate-pulse h-64 rounded-lg border border-border/60" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {providers.map((provider) => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
