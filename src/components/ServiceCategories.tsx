
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { categories } from "@/utils/serviceData";
import { 
  Home, 
  GraduationCap, 
  Languages, 
  Landmark, 
  Car, 
  Truck, 
  Scale, 
  Stethoscope 
} from "lucide-react";

const getCategoryIcon = (iconName: string) => {
  switch(iconName) {
    case "home":
      return <Home className="h-6 w-6" />;
    case "graduation-cap":
      return <GraduationCap className="h-6 w-6" />;
    case "languages":
      return <Languages className="h-6 w-6" />;
    case "landmark":
      return <Landmark className="h-6 w-6" />;
    case "car":
      return <Car className="h-6 w-6" />;
    case "truck":
      return <Truck className="h-6 w-6" />;
    case "scale":
      return <Scale className="h-6 w-6" />;
    case "stethoscope":
      return <Stethoscope className="h-6 w-6" />;
    default:
      return <Home className="h-6 w-6" />;
  }
};

export default function ServiceCategories() {
  return (
    <section className="py-24 bg-background">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Nos catégories de services
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Découvrez notre large gamme de services destinés aux expatriés, quelle que soit votre situation.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link to={`/prestataires?category=${category.id}`} key={category.id}>
              <Card className="h-full transition-all duration-300 hover:shadow-md hover:-translate-y-1 border border-border/60">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                    {getCategoryIcon(category.icon)}
                  </div>
                  <h3 className="font-bold mb-2">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {category.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
