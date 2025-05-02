
import { useState, useEffect } from "react";
import { 
  Globe,
  Search,
  Edit,
  Trash,
  Plus,
  Check,
  X,
  ChevronDown,
  Filter
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { LanguageSetting } from "@/types/admin";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const LanguageManager = () => {
  const [languages, setLanguages] = useState<LanguageSetting[]>([]);
  const [isLanguageDialogOpen, setIsLanguageDialogOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<LanguageSetting | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  
  // Simulation des données
  useEffect(() => {
    const mockLanguages: LanguageSetting[] = [
      {
        code: "fr",
        name: "Français",
        flag: "🇫🇷",
        isDefault: true,
        isEnabled: true
      },
      {
        code: "en",
        name: "English",
        flag: "🇬🇧",
        isDefault: false,
        isEnabled: true
      },
      {
        code: "es",
        name: "Español",
        flag: "🇪🇸",
        isDefault: false,
        isEnabled: true
      }
    ];
    
    setLanguages(mockLanguages);
  }, []);
  
  const getTranslationProgress = (code: string) => {
    // Simule le progrès de traduction
    const progressMap: Record<string, number> = {
      fr: 100,
      en: 85,
      es: 62
    };
    
    return progressMap[code] || 0;
  };
  
  const filteredLanguages = languages.filter(lang => 
    lang.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lang.code.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleAddLanguage = () => {
    setCurrentLanguage(null);
    setIsLanguageDialogOpen(true);
  };
  
  const handleEditLanguage = (language: LanguageSetting) => {
    setCurrentLanguage(language);
    setIsLanguageDialogOpen(true);
  };
  
  const handleSaveLanguage = (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLanguageDialogOpen(false);
    
    // Simuler la sauvegarde
    setTimeout(() => {
      if (currentLanguage) {
        toast({
          title: "Langue mise à jour",
          description: `${currentLanguage.name} a été mise à jour.`,
        });
      } else {
        const newLanguage: LanguageSetting = {
          code: "it",
          name: "Italiano",
          flag: "🇮🇹",
          isDefault: false,
          isEnabled: true
        };
        
        setLanguages(prev => [...prev, newLanguage]);
        
        toast({
          title: "Langue ajoutée",
          description: `${newLanguage.name} a été ajouté avec succès.`,
        });
      }
    }, 500);
  };
  
  const handleDeleteLanguage = (code: string) => {
    setLanguages(prev => prev.filter(lang => lang.code !== code));
    
    toast({
      title: "Langue supprimée",
      description: "La langue a été supprimée avec succès.",
    });
  };
  
  const handleToggleLanguage = (code: string) => {
    setLanguages(prev => prev.map(lang => 
      lang.code === code ? { ...lang, isEnabled: !lang.isEnabled } : lang
    ));
    
    const lang = languages.find(l => l.code === code);
    
    toast({
      title: lang?.isEnabled ? "Langue désactivée" : "Langue activée",
      description: `${lang?.name} a été ${lang?.isEnabled ? "désactivée" : "activée"}.`,
    });
  };
  
  const handleSetDefaultLanguage = (code: string) => {
    setLanguages(prev => prev.map(lang => ({
      ...lang,
      isDefault: lang.code === code
    })));
    
    toast({
      title: "Langue par défaut modifiée",
      description: `La langue par défaut a été changée.`,
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Gestion des langues</h1>
          <p className="text-muted-foreground mt-1">
            Configurer et gérer les langues disponibles sur le site
          </p>
        </div>
        
        <Button onClick={handleAddLanguage}>
          <Plus className="mr-2 h-4 w-4" />
          Ajouter une langue
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-3/4">
          <Card>
            <CardHeader className="p-4 border-b">
              <div className="flex items-center justify-between">
                <CardTitle>Langues disponibles</CardTitle>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full">
                <thead className="bg-muted/50 text-left">
                  <tr>
                    <th className="p-3">Langue</th>
                    <th className="p-3">Code</th>
                    <th className="p-3 hidden md:table-cell">Progrès</th>
                    <th className="p-3">Statut</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredLanguages.map((language) => {
                    const progress = getTranslationProgress(language.code);
                    
                    return (
                      <tr key={language.code} className="hover:bg-muted/50 transition-colors">
                        <td className="p-3">
                          <div className="flex items-center">
                            <span className="text-2xl mr-3">{language.flag}</span>
                            <div>
                              <p className="font-medium">{language.name}</p>
                              {language.isDefault && (
                                <Badge variant="outline" className="mt-1">Par défaut</Badge>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="p-3">
                          <span className="text-muted-foreground">{language.code}</span>
                        </td>
                        <td className="p-3 hidden md:table-cell">
                          <div className="w-full space-y-1">
                            <div className="flex justify-between text-xs">
                              <span>Traduction</span>
                              <span>{progress}%</span>
                            </div>
                            <Progress value={progress} className="h-1" />
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center">
                            <Switch
                              checked={language.isEnabled}
                              onCheckedChange={() => handleToggleLanguage(language.code)}
                              aria-label={`Toggle ${language.name}`}
                            />
                            <span className="ml-2 text-sm text-muted-foreground">
                              {language.isEnabled ? "Activé" : "Désactivé"}
                            </span>
                          </div>
                        </td>
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => handleEditLanguage(language)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button size="sm" variant="ghost">
                                  <ChevronDown className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Options</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuCheckboxItem
                                  checked={language.isDefault}
                                  onCheckedChange={() => handleSetDefaultLanguage(language.code)}
                                  disabled={language.isDefault}
                                >
                                  Définir par défaut
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuCheckboxItem
                                  checked={language.isEnabled}
                                  onCheckedChange={() => handleToggleLanguage(language.code)}
                                >
                                  Activé
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuCheckboxItem
                                  className="text-destructive focus:text-destructive"
                                  onCheckedChange={() => handleDeleteLanguage(language.code)}
                                  disabled={language.isDefault}
                                >
                                  Supprimer
                                </DropdownMenuCheckboxItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              
              {filteredLanguages.length === 0 && (
                <div className="p-8 text-center">
                  <p className="text-muted-foreground">Aucune langue trouvée</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="w-full md:w-1/4">
          <Card>
            <CardHeader>
              <CardTitle>Statistiques</CardTitle>
              <CardDescription>Aperçu des langues</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium">Total des langues</p>
                <p className="text-3xl font-bold">{languages.length}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium">Langues actives</p>
                <p className="text-3xl font-bold">{languages.filter(l => l.isEnabled).length}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium">Langue par défaut</p>
                <div className="flex items-center mt-1">
                  <span className="text-2xl mr-2">
                    {languages.find(l => l.isDefault)?.flag}
                  </span>
                  <span className="font-bold">
                    {languages.find(l => l.isDefault)?.name}
                  </span>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-2">Progrès global</p>
                <div className="space-y-2">
                  {languages.map(lang => {
                    const progress = getTranslationProgress(lang.code);
                    return (
                      <div key={lang.code} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>{lang.name}</span>
                          <span>{progress}%</span>
                        </div>
                        <Progress value={progress} className="h-1" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Dialog pour ajouter/modifier une langue */}
      <Dialog open={isLanguageDialogOpen} onOpenChange={setIsLanguageDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{currentLanguage ? "Modifier la langue" : "Ajouter une langue"}</DialogTitle>
            <DialogDescription>
              {currentLanguage 
                ? "Modifiez les paramètres de la langue" 
                : "Ajoutez une nouvelle langue au site"
              }
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSaveLanguage} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom</Label>
              <Input 
                id="name" 
                defaultValue={currentLanguage?.name || ""} 
                placeholder="ex: Français" 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="code">Code</Label>
              <Input 
                id="code" 
                defaultValue={currentLanguage?.code || ""} 
                placeholder="ex: fr" 
                maxLength={2}
              />
              <p className="text-xs text-muted-foreground">
                Code ISO 639-1 à deux lettres
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="flag">Drapeau</Label>
              <Input 
                id="flag" 
                defaultValue={currentLanguage?.flag || ""} 
                placeholder="ex: 🇫🇷" 
              />
            </div>
            
            <div className="flex items-center justify-between pt-2">
              <div>
                <Label htmlFor="enabled">Activé</Label>
                <p className="text-xs text-muted-foreground">
                  La langue sera disponible sur le site
                </p>
              </div>
              <Switch 
                id="enabled" 
                defaultChecked={currentLanguage?.isEnabled ?? true} 
              />
            </div>
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="secondary" 
                onClick={() => setIsLanguageDialogOpen(false)}
              >
                Annuler
              </Button>
              <Button type="submit">
                {currentLanguage ? "Enregistrer" : "Ajouter"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LanguageManager;
