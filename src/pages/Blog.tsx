
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Blog = () => {
  const { translate } = useLanguage();

  return (
    <div className="min-h-screen">
      <main className="pt-24 pb-16">
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
              <span className="text-sm font-medium text-primary">{translate('blog.title')}</span>
              <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
                {translate('blog.subtitle')}
              </h1>
              <p className="text-muted-foreground">
                {translate('blog.description')}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 animate-fade-in delay-100">
              <div className="bg-white dark:bg-secondary/50 rounded-xl shadow-sm p-6 border border-border hover:shadow-md transition-all duration-300">
                <h2 className="text-2xl font-bold mb-4">{translate('blog.underConstruction')}</h2>
                <p className="text-muted-foreground mb-6">
                  {translate('blog.comingSoon')}
                </p>
                <Link
                  to="/"
                  className="inline-flex items-center px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-all duration-300 hover:translate-x-1"
                >
                  <span>{translate('blog.backToHome')}</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Blog;
