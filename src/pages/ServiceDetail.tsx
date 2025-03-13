
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { categories, getProvidersByCategory } from '@/utils/serviceData';
import { Provider } from '@/types/provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ProviderCard from '@/components/ProviderCard';
import { ArrowLeft } from 'lucide-react';

const ServiceDetail = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<any>(null);

  useEffect(() => {
    if (!categoryId) return;

    setLoading(true);
    const fetchData = async () => {
      try {
        // Find the current category
        const categoryData = categories.find(c => c.id === categoryId);
        setCategory(categoryData);

        // Get providers for this category
        const categoryProviders = getProvidersByCategory(categoryId);
        setProviders(categoryProviders);
      } catch (error) {
        console.error('Error fetching service details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryId]);

  if (!categoryId || !category) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Service non trouvé</h1>
          <p className="text-muted-foreground mb-6">
            La catégorie de service que vous recherchez n'existe pas.
          </p>
          <Link to="/services">
            <Button>Voir tous les services</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <div className="mb-8">
        <Link to="/services" className="inline-flex items-center text-primary hover:underline mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour aux services
        </Link>
        <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
        <p className="text-muted-foreground max-w-3xl">{category.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Prestataires de services {category.name}</h2>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-card animate-pulse h-64 rounded-lg border border-border/60" />
              ))}
            </div>
          ) : providers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {providers.map((provider) => (
                <ProviderCard key={provider.id} provider={provider} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-card rounded-lg border border-border">
              <h3 className="text-lg font-medium mb-2">Aucun prestataire trouvé</h3>
              <p className="text-muted-foreground mb-6">
                Aucun prestataire n'est disponible dans cette catégorie pour le moment.
              </p>
            </div>
          )}
        </div>

        <div>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Spécialités</h3>
              <ul className="space-y-2">
                {category.subcategories.map((subcategory: string, index: number) => (
                  <li key={index} className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                    {subcategory}
                  </li>
                ))}
              </ul>
              
              <div className="mt-6 pt-6 border-t border-border">
                <h3 className="text-lg font-semibold mb-4">Besoin d'aide ?</h3>
                <p className="text-muted-foreground mb-4">
                  Vous ne trouvez pas ce que vous cherchez ? Contactez-nous et nous vous aiderons à trouver le bon prestataire.
                </p>
                <Link to="/contact">
                  <Button className="w-full">Nous contacter</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
