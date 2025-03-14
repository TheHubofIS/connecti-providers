
import { useLanguage, Language } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'es', name: 'Español', flag: '🇪🇸' }
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="px-2 transition-all duration-300 hover:bg-primary/10 group hover-lift"
        >
          <Globe className="h-4 w-4 mr-1 group-hover:text-primary transition-colors duration-300 group-hover:rotate-12 transform" />
          <span className="hidden md:inline group-hover:text-primary transition-colors duration-300">
            {language.toUpperCase()}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="animate-scale-in glass">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            className={`${language === lang.code ? "bg-primary/10" : ""} transition-all duration-300 hover:bg-primary/5 neo`}
            onClick={() => setLanguage(lang.code)}
          >
            <span className="mr-2 transform hover:scale-125 transition-transform duration-300">{lang.flag}</span>
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
