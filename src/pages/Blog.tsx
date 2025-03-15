
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Blog article data with translations
const articles = [
  {
    id: "cost-benefits",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=800&h=400&q=80",
    date: "2023-06-01",
    readTime: 8,
    author: "Sophie Martin",
    category: "finance"
  },
  {
    id: "quality-service",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&h=400&q=80",
    date: "2023-06-15",
    readTime: 10,
    author: "Jean Dupont",
    category: "services"
  },
  {
    id: "timezone-advantage",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&h=400&q=80",
    date: "2023-07-01",
    readTime: 6,
    author: "Pierre Leclerc",
    category: "lifestyle"
  },
  {
    id: "language-barriers",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&h=400&q=80",
    date: "2023-07-20",
    readTime: 9,
    author: "Marie Dubois",
    category: "culture"
  },
  {
    id: "legal-compliance",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&h=400&q=80",
    date: "2023-08-05",
    readTime: 12,
    author: "Luc Bernard",
    category: "legal"
  }
];

const Blog = () => {
  const { translate, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    
    if (language === "fr") {
      return new Intl.DateTimeFormat('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
    } else if (language === "es") {
      return new Intl.DateTimeFormat('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
    } else {
      return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
    }
  };
  
  const filteredArticles = activeCategory === "all" 
    ? articles 
    : articles.filter(article => article.category === activeCategory);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-16">
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
              <span className="text-sm font-medium text-primary">{translate('blog.subtitle')}</span>
              <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
                {translate('blog.title')}
              </h1>
              <p className="text-muted-foreground">
                {translate('blog.description')}
              </p>
            </div>

            <div className="animate-fade-in delay-100">
              <Tabs defaultValue="all" className="w-full mb-8">
                <div className="flex justify-center mb-6 overflow-x-auto pb-2">
                  <TabsList className="bg-background/50 p-1">
                    <TabsTrigger 
                      value="all" 
                      onClick={() => setActiveCategory("all")}
                      className="px-4 py-2"
                    >
                      {translate('blog.allCategories')}
                    </TabsTrigger>
                    <TabsTrigger 
                      value="finance" 
                      onClick={() => setActiveCategory("finance")}
                      className="px-4 py-2"
                    >
                      {translate('blog.financeCategory')}
                    </TabsTrigger>
                    <TabsTrigger 
                      value="services" 
                      onClick={() => setActiveCategory("services")}
                      className="px-4 py-2"
                    >
                      {translate('blog.servicesCategory')}
                    </TabsTrigger>
                    <TabsTrigger 
                      value="legal" 
                      onClick={() => setActiveCategory("legal")}
                      className="px-4 py-2"
                    >
                      {translate('blog.legalCategory')}
                    </TabsTrigger>
                    <TabsTrigger 
                      value="lifestyle" 
                      onClick={() => setActiveCategory("lifestyle")}
                      className="px-4 py-2"
                    >
                      {translate('blog.lifestyleCategory')}
                    </TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="all" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredArticles.map((article) => (
                      <Card key={article.id} className="overflow-hidden hover:shadow-md transition-all border border-border/60 group animate-fade-in">
                        <div className="h-48 overflow-hidden">
                          <img 
                            src={article.image} 
                            alt={translate(`blog.articles.${article.id}.title`)} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <CardContent className="p-6">
                          <div className="flex items-center text-sm text-muted-foreground mb-3 gap-4">
                            <span className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {formatDate(article.date)}
                            </span>
                            <span className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {article.readTime} {translate('blog.minRead')}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                            {translate(`blog.articles.${article.id}.title`)}
                          </h3>
                          <p className="text-muted-foreground mb-4 line-clamp-3">
                            {translate(`blog.articles.${article.id}.excerpt`)}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-sm">
                              <User className="h-4 w-4 mr-1 text-primary" />
                              <span>{article.author}</span>
                            </div>
                            <Button variant="ghost" size="sm" className="font-medium flex items-center gap-1 hover:gap-2 transition-all group-hover:text-primary">
                              {translate('blog.readMore')}
                              <ArrowRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                {/* Same content structure for other tabs with filtered results */}
                <TabsContent value="finance" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredArticles.map((article) => (
                      <Card key={article.id} className="overflow-hidden hover:shadow-md transition-all border border-border/60 group">
                        <div className="h-48 overflow-hidden">
                          <img 
                            src={article.image} 
                            alt={translate(`blog.articles.${article.id}.title`)} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <CardContent className="p-6">
                          <div className="flex items-center text-sm text-muted-foreground mb-3 gap-4">
                            <span className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {formatDate(article.date)}
                            </span>
                            <span className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {article.readTime} {translate('blog.minRead')}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                            {translate(`blog.articles.${article.id}.title`)}
                          </h3>
                          <p className="text-muted-foreground mb-4 line-clamp-3">
                            {translate(`blog.articles.${article.id}.excerpt`)}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-sm">
                              <User className="h-4 w-4 mr-1 text-primary" />
                              <span>{article.author}</span>
                            </div>
                            <Button variant="ghost" size="sm" className="font-medium flex items-center gap-1 hover:gap-2 transition-all group-hover:text-primary">
                              {translate('blog.readMore')}
                              <ArrowRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="services" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredArticles.map((article) => (
                      <Card key={article.id} className="overflow-hidden hover:shadow-md transition-all border border-border/60 group">
                        <div className="h-48 overflow-hidden">
                          <img 
                            src={article.image} 
                            alt={translate(`blog.articles.${article.id}.title`)} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <CardContent className="p-6">
                          <div className="flex items-center text-sm text-muted-foreground mb-3 gap-4">
                            <span className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {formatDate(article.date)}
                            </span>
                            <span className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {article.readTime} {translate('blog.minRead')}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                            {translate(`blog.articles.${article.id}.title`)}
                          </h3>
                          <p className="text-muted-foreground mb-4 line-clamp-3">
                            {translate(`blog.articles.${article.id}.excerpt`)}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-sm">
                              <User className="h-4 w-4 mr-1 text-primary" />
                              <span>{article.author}</span>
                            </div>
                            <Button variant="ghost" size="sm" className="font-medium flex items-center gap-1 hover:gap-2 transition-all group-hover:text-primary">
                              {translate('blog.readMore')}
                              <ArrowRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="legal" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredArticles.map((article) => (
                      <Card key={article.id} className="overflow-hidden hover:shadow-md transition-all border border-border/60 group">
                        <div className="h-48 overflow-hidden">
                          <img 
                            src={article.image} 
                            alt={translate(`blog.articles.${article.id}.title`)} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <CardContent className="p-6">
                          <div className="flex items-center text-sm text-muted-foreground mb-3 gap-4">
                            <span className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {formatDate(article.date)}
                            </span>
                            <span className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {article.readTime} {translate('blog.minRead')}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                            {translate(`blog.articles.${article.id}.title`)}
                          </h3>
                          <p className="text-muted-foreground mb-4 line-clamp-3">
                            {translate(`blog.articles.${article.id}.excerpt`)}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-sm">
                              <User className="h-4 w-4 mr-1 text-primary" />
                              <span>{article.author}</span>
                            </div>
                            <Button variant="ghost" size="sm" className="font-medium flex items-center gap-1 hover:gap-2 transition-all group-hover:text-primary">
                              {translate('blog.readMore')}
                              <ArrowRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="lifestyle" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredArticles.map((article) => (
                      <Card key={article.id} className="overflow-hidden hover:shadow-md transition-all border border-border/60 group">
                        <div className="h-48 overflow-hidden">
                          <img 
                            src={article.image} 
                            alt={translate(`blog.articles.${article.id}.title`)} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <CardContent className="p-6">
                          <div className="flex items-center text-sm text-muted-foreground mb-3 gap-4">
                            <span className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {formatDate(article.date)}
                            </span>
                            <span className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {article.readTime} {translate('blog.minRead')}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                            {translate(`blog.articles.${article.id}.title`)}
                          </h3>
                          <p className="text-muted-foreground mb-4 line-clamp-3">
                            {translate(`blog.articles.${article.id}.excerpt`)}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-sm">
                              <User className="h-4 w-4 mr-1 text-primary" />
                              <span>{article.author}</span>
                            </div>
                            <Button variant="ghost" size="sm" className="font-medium flex items-center gap-1 hover:gap-2 transition-all group-hover:text-primary">
                              {translate('blog.readMore')}
                              <ArrowRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
              
              {filteredArticles.length === 0 && (
                <div className="text-center py-16">
                  <h3 className="text-xl font-semibold mb-2">{translate('blog.noArticles')}</h3>
                  <p className="text-muted-foreground">{translate('blog.tryOtherCategory')}</p>
                </div>
              )}
            </div>
            
            <div className="mt-16 text-center">
              <div className="bg-secondary/30 p-8 rounded-xl border border-border max-w-4xl mx-auto animate-fade-in delay-300">
                <h3 className="text-2xl font-bold mb-4">{translate('blog.subscribeTitle')}</h3>
                <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                  {translate('blog.subscribeDescription')}
                </p>
                <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder={translate('blog.emailPlaceholder')}
                    className="flex-grow px-4 py-2 rounded-lg border border-input focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none"
                  />
                  <Button type="submit" className="px-6">
                    {translate('blog.subscribe')}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
