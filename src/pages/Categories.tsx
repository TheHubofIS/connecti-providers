
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Search, Filter, Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Types
type Category = {
  id: string;
  name: string;
  description: string;
  count: number;
  icon: string;
  featured: boolean;
};

export default function Categories() {
  const { translate, language } = useLanguage();
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "featured">("all");

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Sample data
        const categoriesData = [
          {
            id: "legal",
            name: language === "fr" ? "Services juridiques" : 
                  language === "en" ? "Legal services" : 
                  "Servicios legales",
            description: language === "fr" ? "Expertise juridique pour expatriés et entreprises" : 
                         language === "en" ? "Legal expertise for expats and companies" : 
                         "Experiencia legal para expatriados y empresas",
            count: 28,
            icon: "⚖️",
            featured: true
          },
          {
            id: "accounting",
            name: language === "fr" ? "Comptabilité & Finance" : 
                  language === "en" ? "Accounting & Finance" : 
                  "Contabilidad y finanzas",
            description: language === "fr" ? "Experts comptables et conseillers financiers" : 
                         language === "en" ? "Accountants and financial advisors" : 
                         "Contadores y asesores financieros",
            count: 35,
            icon: "📊",
            featured: true
          },
          {
            id: "it",
            name: language === "fr" ? "IT & Digital" : 
                  language === "en" ? "IT & Digital" : 
                  "TI y Digital",
            description: language === "fr" ? "Services informatiques et transformation digitale" : 
                         language === "en" ? "IT services and digital transformation" : 
                         "Servicios informáticos y transformación digital",
            count: 42,
            icon: "💻",
            featured: true
          },
          {
            id: "medical",
            name: language === "fr" ? "Services médicaux" : 
                  language === "en" ? "Medical services" : 
                  "Servicios médicos",
            description: language === "fr" ? "Professionnels de santé francophones" : 
                         language === "en" ? "French-speaking healthcare professionals" : 
                         "Profesionales de la salud de habla francesa",
            count: 19,
            icon: "🩺",
            featured: true
          },
          {
            id: "dental",
            name: language === "fr" ? "Services dentaires" : 
                  language === "en" ? "Dental services" : 
                  "Servicios dentales",
            description: language === "fr" ? "Dentistes et spécialistes dentaires" : 
                         language === "en" ? "Dentists and dental specialists" : 
                         "Dentistas y especialistas dentales",
            count: 15,
            icon: "🦷",
            featured: false
          },
          {
            id: "real-estate",
            name: language === "fr" ? "Immobilier" : 
                  language === "en" ? "Real Estate" : 
                  "Inmobiliaria",
            description: language === "fr" ? "Agents immobiliers et experts" : 
                         language === "en" ? "Real estate agents and experts" : 
                         "Agentes inmobiliarios y expertos",
            count: 23,
            icon: "🏠",
            featured: false
          },
          {
            id: "education",
            name: language === "fr" ? "Éducation" : 
                  language === "en" ? "Education" : 
                  "Educación",
            description: language === "fr" ? "Écoles, professeurs et formation" : 
                         language === "en" ? "Schools, teachers and training" : 
                         "Escuelas, profesores y formación",
            count: 17,
            icon: "🎓",
            featured: false
          },
          {
            id: "translation",
            name: language === "fr" ? "Traduction & Interprétation" : 
                  language === "en" ? "Translation & Interpretation" : 
                  "Traducción e interpretación",
            description: language === "fr" ? "Services linguistiques professionnels" : 
                         language === "en" ? "Professional language services" : 
                         "Servicios lingüísticos profesionales",
            count: 31,
            icon: "🔤",
            featured: false
          },
          {
            id: "marketing",
            name: language === "fr" ? "Marketing & Communication" : 
                  language === "en" ? "Marketing & Communication" : 
                  "Marketing y comunicación",
            description: language === "fr" ? "Experts en marketing et communication" : 
                         language === "en" ? "Marketing and communication experts" : 
                         "Expertos en marketing y comunicación",
            count: 26,
            icon: "📢",
            featured: false
          },
          {
            id: "coaching",
            name: language === "fr" ? "Coaching & Développement personnel" : 
                  language === "en" ? "Coaching & Personal Development" : 
                  "Coaching y desarrollo personal",
            description: language === "fr" ? "Accompagnement personnel et professionnel" : 
                         language === "en" ? "Personal and professional guidance" : 
                         "Orientación personal y profesional",
            count: 12,
            icon: "🧠",
            featured: false
          },
          {
            id: "relocation",
            name: language === "fr" ? "Relocation & Installation" : 
                  language === "en" ? "Relocation & Settlement" : 
                  "Reubicación e instalación",
            description: language === "fr" ? "Assistance pour l'installation à l'étranger" : 
                         language === "en" ? "Assistance for settling abroad" : 
                         "Asistencia para establecerse en el extranjero",
            count: 29,
            icon: "✈️",
            featured: true
          },
          {
            id: "insurance",
            name: language === "fr" ? "Assurance" : 
                  language === "en" ? "Insurance" : 
                  "Seguros",
            description: language === "fr" ? "Courtiers et conseillers en assurance" : 
                         language === "en" ? "Insurance brokers and advisors" : 
                         "Corredores y asesores de seguros",
            count: 18,
            icon: "🔐",
            featured: false
          }
        ];
        
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCategories();
  }, [language]);
  
  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         category.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filter === "featured") {
      return matchesSearch && category.featured;
    }
    
    return matchesSearch;
  });
  
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-16">
        <section className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12 animate-fade-in">
            <span className="text-sm font-medium text-primary">
              {translate("categories.explore")}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
              {translate("categories.title")}
            </h1>
            <p className="text-muted-foreground">
              {translate("categories.description")}
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto mb-10">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  className="pl-10"
                  placeholder={translate("categories.searchPlaceholder")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="min-w-[120px] flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    {filter === "featured" ? translate("categories.featured") : translate("categories.all")}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>{translate("categories.filter")}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    checked={filter === "all"}
                    onCheckedChange={() => setFilter("all")}
                  >
                    {translate("categories.all")}
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={filter === "featured"}
                    onCheckedChange={() => setFilter("featured")}
                  >
                    {translate("categories.featured")}
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-64 bg-card rounded-xl border border-border animate-pulse" />
              ))}
            </div>
          ) : (
            <>
              {filteredCategories.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium mb-2">{translate("categories.noResults")}</h3>
                  <p className="text-muted-foreground mb-4">{translate("categories.tryDifferent")}</p>
                  <Button onClick={() => {setSearchQuery(""); setFilter("all");}}>
                    {translate("categories.clearFilters")}
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCategories.map((category) => (
                    <Link to={`/services/${category.id}`} key={category.id}>
                      <div className="bg-card border border-border rounded-xl overflow-hidden h-full hover:shadow-md transition-all group">
                        <div className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center">
                              <span className="text-4xl mr-3">{category.icon}</span>
                              <div>
                                <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                                  {category.name}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                  {category.count} {translate("categories.providers")}
                                </p>
                              </div>
                            </div>
                            {category.featured && (
                              <Badge variant="secondary" className="flex items-center gap-1">
                                <Check className="h-3 w-3" /> {translate("categories.featured")}
                              </Badge>
                            )}
                          </div>
                          
                          <p className="text-muted-foreground mb-6">
                            {category.description}
                          </p>
                          
                          <div className="flex items-center text-primary font-medium">
                            <span>{translate("categories.explore")}</span>
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
