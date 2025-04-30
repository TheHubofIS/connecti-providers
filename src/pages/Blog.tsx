
import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight, Calendar, User, Tag, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Blog = () => {
  const { translate } = useLanguage();
  
  // Scroll to top when the page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const blogArticles = [
    {
      id: "expatriation-guide",
      title: "Guide complet d'expatriation: ce qu'il faut savoir avant de partir",
      excerpt: "Découvrez tous les aspects essentiels à considérer avant de vous expatrier, des démarches administratives à l'intégration culturelle.",
      date: "15 mai 2023",
      author: "Marie Dubois",
      category: "Expatriation",
      readTime: "8 min",
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: "remote-work-trends",
      title: "Tendances du travail à distance en 2023 pour les expatriés",
      excerpt: "Analyse des dernières évolutions du travail à distance et leur impact sur la communauté des expatriés français à l'international.",
      date: "28 avril 2023",
      author: "Thomas Martin",
      category: "Travail",
      readTime: "6 min",
      image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: "tax-optimization",
      title: "Optimisation fiscale pour les français à l'étranger",
      excerpt: "Les stratégies les plus efficaces pour gérer votre fiscalité en tant qu'expatrié français, tout en restant conforme aux réglementations.",
      date: "10 avril 2023",
      author: "Sophie Petit",
      category: "Finance",
      readTime: "10 min",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: "healthcare-abroad",
      title: "Accès aux soins médicaux à l'étranger : guide pratique",
      excerpt: "Comment naviguer dans les différents systèmes de santé à l'international et maintenir un suivi médical de qualité.",
      date: "22 mars 2023",
      author: "Dr. Philippe Blanc",
      category: "Santé",
      readTime: "7 min",
      image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: "legal-challenges",
      title: "Les défis juridiques des entrepreneurs français à l'international",
      excerpt: "Analyse des principales problématiques légales rencontrées par les entrepreneurs français qui développent leur activité à l'étranger.",
      date: "5 mars 2023",
      author: "Maître Jean Legrand",
      category: "Juridique",
      readTime: "9 min",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: "cost-benefits",
      title: "Coût-bénéfice des services professionnels pour expatriés",
      excerpt: "Pourquoi investir dans des services professionnels adaptés peut faire économiser du temps et de l'argent aux expatriés sur le long terme.",
      date: "18 février 2023",
      author: "Claire Dupont",
      category: "Business",
      readTime: "5 min",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80"
    }
  ];
  
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-16">
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
              <span className="text-sm font-medium text-primary">Actualités & Conseils</span>
              <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
                Blog & Ressources
              </h1>
              <p className="text-muted-foreground">
                Découvrez nos derniers articles, guides et conseils pour les expatriés et professionnels français à l'international
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in delay-100">
              {blogArticles.map((article, index) => (
                <article key={article.id} className="flex flex-col h-full bg-white dark:bg-secondary/50 rounded-xl shadow-sm overflow-hidden border border-border hover:shadow-md transition-all duration-300">
                  <div className="relative h-48">
                    <img 
                      src={article.image} 
                      alt={article.title} 
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        // Fallback for broken images
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80";
                      }}
                    />
                    <div className="absolute top-3 right-3 bg-primary/90 text-white text-xs font-medium px-2 py-1 rounded">
                      {article.category}
                    </div>
                  </div>
                  
                  <div className="flex-grow p-6">
                    <div className="flex items-center text-xs text-muted-foreground mb-3 gap-4">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{article.date}</span>
                      </div>
                      <div className="flex items-center">
                        <User className="h-3 w-3 mr-1" />
                        <span>{article.author}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                    
                    <h2 className="text-xl font-semibold mb-3 line-clamp-2">{article.title}</h2>
                    <p className="text-muted-foreground mb-4 line-clamp-3">{article.excerpt}</p>
                    
                    <Link
                      to={`/blog/${article.id}`}
                      className="inline-flex items-center text-primary font-medium hover:underline"
                      onClick={() => window.scrollTo(0, 0)}
                    >
                      <span>Lire l'article</span>
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
            
            <div className="mt-12 text-center animate-fade-in delay-200">
              <Link
                to="/categories"
                className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-all"
                onClick={() => window.scrollTo(0, 0)}
              >
                <span>Parcourir toutes les catégories</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
