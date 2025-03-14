
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { translate } = useLanguage();

  return (
    <footer className="bg-secondary/50 dark:bg-secondary/20 border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="animate-fade-in">
            <Link to="/" className="text-2xl font-bold text-primary mb-4 inline-block transition-all duration-300 hover:scale-105">
              {translate('siteName')}
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md">
              Mise en relation entre clients français et prestataires français basés à l'étranger dans les domaines juridique, comptabilité, IT, médical et dentaire.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:scale-125 transform">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:scale-125 transform">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:scale-125 transform">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:scale-125 transform">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="animate-fade-in" style={{ animationDelay: "100ms" }}>
            <h3 className="font-semibold text-lg mb-4">{translate('footer.quickLinks')}</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block">
                  {translate('home')}
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block">
                  {translate('services')}
                </Link>
              </li>
              <li>
                <Link to="/prestataires" className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block">
                  {translate('providers')}
                </Link>
              </li>
              <li>
                <Link to="/comment-ca-marche" className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block">
                  {translate('howItWorks')}
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
            <h3 className="font-semibold text-lg mb-4">{translate('footer.support')}</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block">
                  Centre d'aide
                </Link>
              </li>
              <li>
                <Link to="/confidentialite" className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link to="/conditions" className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block">
                  Conditions d'utilisation
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block">
                  {translate('contact')}
                </Link>
              </li>
            </ul>
          </div>

          <div className="animate-fade-in" style={{ animationDelay: "300ms" }}>
            <h3 className="font-semibold text-lg mb-4">{translate('footer.contact')}</h3>
            <ul className="space-y-3">
              <li className="flex items-start group">
                <Mail className="h-5 w-5 mr-2 text-primary mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">contact@hubofis.com</span>
              </li>
              <li className="flex items-start group">
                <Phone className="h-5 w-5 mr-2 text-primary mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">+33 1 23 45 67 89</span>
              </li>
              <li className="flex items-start group">
                <MapPin className="h-5 w-5 mr-2 text-primary mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  12 rue de la Paix, 75002 Paris, France
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} {translate('siteName')}. {translate('footer.rights')}.</p>
        </div>
      </div>
    </footer>
  );
}
