
import { useState, useEffect } from "react";
import { 
  MenuIcon,
  Plus,
  Trash,
  Edit,
  GripVertical,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Globe
} from "lucide-react";
import { SiteMenu, MenuItem } from "@/types/admin";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

const MenuManager = () => {
  const [menus, setMenus] = useState<SiteMenu[]>([]);
  const [currentMenuId, setCurrentMenuId] = useState<string | null>(null);
  const [isMenuDialogOpen, setIsMenuDialogOpen] = useState(false);
  const [isItemDialogOpen, setIsItemDialogOpen] = useState(false);
  const [currentMenuItem, setCurrentMenuItem] = useState<MenuItem | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState<string>("fr");
  const { toast } = useToast();
  
  // Simuler le chargement des données
  useEffect(() => {
    const mockMenus: SiteMenu[] = [
      {
        id: "menu-1",
        name: "Menu principal",
        location: "header",
        language: "fr",
        items: [
          {
            id: "item-1",
            label: "Accueil",
            url: "/",
            icon: "home",
            position: 1,
            isExternal: false,
          },
          {
            id: "item-2",
            label: "Services",
            url: "/services",
            position: 2,
            isExternal: false,
          },
          {
            id: "item-3",
            label: "Prestataires",
            url: "/prestataires",
            position: 3,
            isExternal: false,
          },
          {
            id: "item-4",
            label: "Comment ça marche",
            url: "/comment-ca-marche",
            position: 4,
            isExternal: false,
          },
          {
            id: "item-5",
            label: "Blog",
            url: "/blog",
            position: 5,
            isExternal: false,
          },
          {
            id: "item-6",
            label: "Documentation",
            url: "https://docs.example.com",
            position: 6,
            isExternal: true,
          }
        ]
      },
      {
        id: "menu-2",
        name: "Menu du pied de page",
        location: "footer",
        language: "fr",
        items: [
          {
            id: "footer-1",
            label: "À propos",
            url: "/a-propos",
            position: 1,
            isExternal: false,
          },
          {
            id: "footer-2",
            label: "Mentions légales",
            url: "/mentions-legales",
            position: 2,
            isExternal: false,
          },
          {
            id: "footer-3",
            label: "Conditions d'utilisation",
            url: "/conditions",
            position: 3,
            isExternal: false,
          },
          {
            id: "footer-4",
            label: "Contact",
            url: "/contact",
            position: 4,
            isExternal: false,
          }
        ]
      },
      {
        id: "menu-3",
        name: "Menu principal",
        location: "header",
        language: "en",
        items: [
          {
            id: "en-item-1",
            label: "Home",
            url: "/",
            icon: "home",
            position: 1,
            isExternal: false,
          },
          {
            id: "en-item-2",
            label: "Services",
            url: "/services",
            position: 2,
            isExternal: false,
          },
          {
            id: "en-item-3",
            label: "Providers",
            url: "/prestataires",
            position: 3,
            isExternal: false,
          },
          {
            id: "en-item-4",
            label: "How it works",
            url: "/comment-ca-marche",
            position: 4,
            isExternal: false,
          }
        ]
      }
    ];
    
    setMenus(mockMenus);
    if (mockMenus.length > 0) {
      setCurrentMenuId(mockMenus[0].id);
    }
  }, []);
  
  const currentMenu = menus.find(menu => 
    menu.id === currentMenuId && menu.language === currentLanguage
  );
  
  const availableMenus = menus
    .filter(menu => menu.language === currentLanguage)
    .reduce<{ id: string, name: string }[]>((acc, menu) => {
      if (!acc.some(m => m.name === menu.name)) {
        acc.push({ id: menu.id, name: menu.name });
      }
      return acc;
    }, []);
  
  const handleAddMenu = () => {
    const newMenu: SiteMenu = {
      id: `menu-${menus.length + 1}`,
      name: "Nouveau menu",
      location: "header",
      language: currentLanguage,
      items: []
    };
    
    setMenus([...menus, newMenu]);
    setCurrentMenuId(newMenu.id);
    
    toast({
      title: "Menu ajouté",
      description: "Le nouveau menu a été ajouté avec succès.",
    });
  };
  
  const handleDeleteMenu = (menuId: string) => {
    setMenus(menus.filter(menu => menu.id !== menuId));
    
    if (currentMenuId === menuId) {
      setCurrentMenuId(menus.find(m => m.id !== menuId)?.id || null);
    }
    
    toast({
      title: "Menu supprimé",
      description: "Le menu a été supprimé avec succès.",
    });
  };
  
  const handleAddMenuItem = () => {
    setCurrentMenuItem(null);
    setIsItemDialogOpen(true);
  };
  
  const handleEditMenuItem = (item: MenuItem) => {
    setCurrentMenuItem(item);
    setIsItemDialogOpen(true);
  };
  
  const handleSaveMenuItem = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simuler l'enregistrement
    if (currentMenuItem) {
      // Mise à jour d'un élément existant
      setMenus(menus.map(menu => {
        if (menu.id === currentMenuId && menu.language === currentLanguage) {
          return {
            ...menu,
            items: menu.items.map(item => 
              item.id === currentMenuItem.id ? { ...currentMenuItem, label: "Élément modifié" } : item
            )
          };
        }
        return menu;
      }));
      
      toast({
        title: "Élément de menu modifié",
        description: "L'élément a été mis à jour avec succès.",
      });
    } else if (currentMenuId) {
      // Ajout d'un nouvel élément
      const newItem: MenuItem = {
        id: `item-${Date.now()}`,
        label: "Nouvel élément",
        url: "/nouveau-lien",
        position: currentMenu?.items.length ? currentMenu.items.length + 1 : 1,
        isExternal: false
      };
      
      setMenus(menus.map(menu => {
        if (menu.id === currentMenuId && menu.language === currentLanguage) {
          return {
            ...menu,
            items: [...menu.items, newItem]
          };
        }
        return menu;
      }));
      
      toast({
        title: "Élément de menu ajouté",
        description: "Le nouvel élément a été ajouté avec succès.",
      });
    }
    
    setIsItemDialogOpen(false);
  };
  
  const handleDeleteMenuItem = (itemId: string) => {
    setMenus(menus.map(menu => {
      if (menu.id === currentMenuId && menu.language === currentLanguage) {
        return {
          ...menu,
          items: menu.items.filter(item => item.id !== itemId)
        };
      }
      return menu;
    }));
    
    toast({
      title: "Élément supprimé",
      description: "L'élément de menu a été supprimé avec succès.",
    });
  };
  
  const handleMoveMenuItem = (itemId: string, direction: "up" | "down") => {
    setMenus(menus.map(menu => {
      if (menu.id === currentMenuId && menu.language === currentLanguage) {
        const items = [...menu.items];
        const index = items.findIndex(item => item.id === itemId);
        
        if (direction === "up" && index > 0) {
          // Échanger avec l'élément précédent
          [items[index - 1], items[index]] = [items[index], items[index - 1]];
          
          // Mettre à jour les positions
          items[index - 1].position--;
          items[index].position++;
        } else if (direction === "down" && index < items.length - 1) {
          // Échanger avec l'élément suivant
          [items[index], items[index + 1]] = [items[index + 1], items[index]];
          
          // Mettre à jour les positions
          items[index].position--;
          items[index + 1].position++;
        }
        
        return { ...menu, items };
      }
      return menu;
    }));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Gestion des menus</h1>
          <p className="text-muted-foreground mt-1">
            Configurez les menus et la navigation du site
          </p>
        </div>
        
        <Button onClick={handleAddMenu}>
          <Plus className="mr-2 h-4 w-4" />
          Ajouter un menu
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Menus</span>
              <Select value={currentLanguage} onValueChange={setCurrentLanguage}>
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fr">🇫🇷 FR</SelectItem>
                  <SelectItem value="en">🇬🇧 EN</SelectItem>
                  <SelectItem value="es">🇪🇸 ES</SelectItem>
                </SelectContent>
              </Select>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {availableMenus.map((menu) => (
                <div 
                  key={menu.id} 
                  className={`p-3 rounded-lg cursor-pointer flex items-center justify-between ${
                    currentMenuId === menu.id ? "bg-primary/10 border border-primary/20" : "hover:bg-muted"
                  }`}
                  onClick={() => setCurrentMenuId(menu.id)}
                >
                  <div className="flex items-center">
                    <MenuIcon className="h-5 w-5 mr-2 text-muted-foreground" />
                    <span className="font-medium">{menu.name}</span>
                  </div>
                  {currentMenuId === menu.id && (
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={(e) => { 
                        e.stopPropagation();
                        handleDeleteMenu(menu.id);
                      }}
                    >
                      <Trash className="h-4 w-4 text-destructive" />
                    </Button>
                  )}
                </div>
              ))}
              
              {availableMenus.length === 0 && (
                <div className="text-center p-4">
                  <p className="text-muted-foreground mb-2">Aucun menu disponible</p>
                  <Button onClick={handleAddMenu} variant="outline" size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Créer un menu
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              {currentMenu ? (
                <>
                  <span>Éléments du menu : {currentMenu.name}</span>
                  <div className="flex items-center space-x-2">
                    <Select 
                      defaultValue={currentMenu.location}
                      onValueChange={(value: "header" | "footer" | "sidebar") => {
                        setMenus(menus.map(menu => {
                          if (menu.id === currentMenuId && menu.language === currentLanguage) {
                            return { ...menu, location: value };
                          }
                          return menu;
                        }));
                      }}
                    >
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Emplacement" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="header">En-tête</SelectItem>
                        <SelectItem value="footer">Pied de page</SelectItem>
                        <SelectItem value="sidebar">Barre latérale</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Button onClick={handleAddMenuItem}>
                      <Plus className="mr-2 h-4 w-4" />
                      Ajouter un élément
                    </Button>
                  </div>
                </>
              ) : (
                <span>Sélectionnez un menu</span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {currentMenu ? (
              currentMenu.items.length > 0 ? (
                <div className="border rounded-lg divide-y divide-border">
                  {currentMenu.items.map((item, index) => (
                    <div key={item.id} className="p-3 flex items-center justify-between hover:bg-muted/50">
                      <div className="flex items-center">
                        <div className="p-2 cursor-grab">
                          <GripVertical className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="ml-2">
                          <div className="font-medium">{item.label}</div>
                          <div className="text-xs flex items-center text-muted-foreground">
                            {item.url}
                            {item.isExternal && (
                              <ExternalLink className="h-3 w-3 ml-1" />
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          disabled={index === 0}
                          onClick={() => handleMoveMenuItem(item.id, "up")}
                        >
                          <ChevronUp className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          disabled={index === currentMenu.items.length - 1}
                          onClick={() => handleMoveMenuItem(item.id, "down")}
                        >
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEditMenuItem(item)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteMenuItem(item.id)}
                        >
                          <Trash className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-8 border-2 border-dashed border-border rounded-lg">
                  <MenuIcon className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                  <h3 className="font-medium">Aucun élément dans ce menu</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Ajoutez des éléments pour compléter votre menu
                  </p>
                  <Button onClick={handleAddMenuItem}>
                    <Plus className="mr-2 h-4 w-4" />
                    Ajouter un élément
                  </Button>
                </div>
              )
            ) : (
              <div className="text-center p-8 border-2 border-dashed border-border rounded-lg">
                <MenuIcon className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                <h3 className="font-medium">Aucun menu sélectionné</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Sélectionnez un menu existant ou créez-en un nouveau
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Dialog pour ajouter/modifier un élément de menu */}
      <Dialog open={isItemDialogOpen} onOpenChange={setIsItemDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{currentMenuItem ? "Modifier l'élément" : "Ajouter un élément"}</DialogTitle>
            <DialogDescription>
              {currentMenuItem 
                ? "Modifiez les détails de l'élément de menu" 
                : "Ajoutez un nouvel élément au menu"
              }
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSaveMenuItem} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="label">Libellé</Label>
              <Input 
                id="label" 
                defaultValue={currentMenuItem?.label || ""} 
                placeholder="ex: Accueil" 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="url">URL</Label>
              <Input 
                id="url" 
                defaultValue={currentMenuItem?.url || ""} 
                placeholder="ex: /accueil" 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="icon">Icône (optionnel)</Label>
              <Input 
                id="icon" 
                defaultValue={currentMenuItem?.icon || ""} 
                placeholder="ex: home" 
              />
            </div>
            
            <div className="flex items-center justify-between pt-2">
              <div>
                <Label htmlFor="external">Lien externe</Label>
                <p className="text-xs text-muted-foreground">
                  Ouvrir dans une nouvelle fenêtre
                </p>
              </div>
              <Switch 
                id="external" 
                defaultChecked={currentMenuItem?.isExternal ?? false} 
              />
            </div>
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="secondary" 
                onClick={() => setIsItemDialogOpen(false)}
              >
                Annuler
              </Button>
              <Button type="submit">
                {currentMenuItem ? "Enregistrer" : "Ajouter"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MenuManager;
