
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const NotFound = () => {
  const location = useLocation();
  const { translate } = useLanguage();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/30">
      <div className="text-center max-w-md p-6">
        <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
        <p className="text-2xl font-semibold text-foreground mb-6">{translate('notFound.title')}</p>
        <p className="text-muted-foreground mb-8">
          {translate('notFound.description')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" onClick={() => window.history.back()} className="flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            {translate('notFound.back')}
          </Button>
          <Link to="/">
            <Button className="w-full flex items-center">
              <Home className="h-4 w-4 mr-2" />
              {translate('notFound.home')}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
