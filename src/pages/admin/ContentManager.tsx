
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash, 
  Eye, 
  Globe, 
  FileText,
  Check, 
  X,
  MoreHorizontal,
  ArrowUpDown,
  ListFilter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ContentItem, PageLayout } from "@/types/admin";
import { useToast } from "@/hooks/use-toast";

interface ContentPage {
  id: string;
  title: string;
  slug: string;
  template: string;
  status: "published" | "draft" | "scheduled";
  languages: string[];
  updatedAt: string;
  updatedBy: string;
}

const ContentManager = () => {
  const [pages, setPages] = useState<ContentPage[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Simuler le chargement des données
  useEffect(() => {
    const mockPages: ContentPage[] = [
      {
        id: "page-1",
        title: "Accueil",
        slug: "/",
        template: "Page d'accueil",
        status: "published",
        languages: ["fr", "en"],
        updatedAt: new Date().toISOString(),
        updatedBy: "Admin"
      },
      {
        id: "page-2",
        title: "À propos",
        slug: "/a-propos",
        template: "Standard",
        status: "published",
        languages: ["fr", "en", "es"],
        updatedAt: new Date(Date.now() - 86400000).toISOString(),
        updatedBy: "Admin"
      },
      {
        id: "page-3",
        title: "Services",
        slug: "/services",
        template: "Standard",
        status: "published",
        languages: ["fr", "en"],
        updatedAt: new Date(Date.now() - 172800000).toISOString(),
        updatedBy: "Sophie Martin"
      },
      {
        id: "page-4",
        title: "Témoignages",
        slug: "/temoignages",
        template: "Standard",
        status: "draft",
        languages: ["fr"],
        updatedAt: new Date(Date.now() - 259200000).toISOString(),
        updatedBy: "Admin"
      },
      {
        id: "page-5",
        title: "Blog",
        slug: "/blog",
        template: "Blog",
        status: "published",
        languages: ["fr", "en"],
        updatedAt: new Date(Date.now() - 345600000).toISOString(),
        updatedBy: "Admin"
      },
      {
        id: "page-6",
        title: "Nouveau service",
        slug: "/services/nouveau",
        template: "Standard",
        status: "scheduled",
        languages: ["fr"],
        updatedAt: new Date(Date.now() - 432000000).toISOString(),
        updatedBy: "Sophie Martin"
      }
    ];
    
    setPages(mockPages);
  }, []);
  
  const filteredPages = pages.filter(page => {
    const matchesSearch = page.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          page.slug.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || page.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case "published":
        return <Badge className="bg-green-500">Publié</Badge>;
      case "draft":
        return <Badge variant="outline">Brouillon</Badge>;
      case "scheduled":
        return <Badge className="bg-blue-500">Planifié</Badge>;
      default:
        return null;
    }
  };
  
  const handleDeletePage = (id: string) => {
    setPages(prev => prev.filter(page => page.id !== id));
    toast({
      title: "Page supprimée",
      description: "La page a été supprimée avec succès.",
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Gestion du contenu</h1>
          <p className="text-muted-foreground mt-1">
            Gérer les pages et le contenu du site
          </p>
        </div>
        
        <Button onClick={() => navigate("/admin/content/pages/new")}>
          <Plus className="mr-2 h-4 w-4" />
          Créer une page
        </Button>
      </div>
      
      <Tabs defaultValue="pages" className="space-y-4">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="pages" className="flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              Pages
            </TabsTrigger>
            <TabsTrigger value="layouts" className="flex items-center">
              <ListFilter className="h-4 w-4 mr-2" />
              Mises en page
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="pages" className="space-y-4">
          <Card>
            <CardHeader className="p-4 flex-row items-center justify-between space-y-0">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher des pages..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      {statusFilter === "all" ? "Tous statuts" : 
                       statusFilter === "published" ? "Publiés" : 
                       statusFilter === "draft" ? "Brouillons" : "Planifiés"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                      <Check className={`mr-2 h-4 w-4 ${statusFilter === "all" ? "opacity-100" : "opacity-0"}`} />
                      Tous statuts
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("published")}>
                      <Check className={`mr-2 h-4 w-4 ${statusFilter === "published" ? "opacity-100" : "opacity-0"}`} />
                      Publiés
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("draft")}>
                      <Check className={`mr-2 h-4 w-4 ${statusFilter === "draft" ? "opacity-100" : "opacity-0"}`} />
                      Brouillons
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("scheduled")}>
                      <Check className={`mr-2 h-4 w-4 ${statusFilter === "scheduled" ? "opacity-100" : "opacity-0"}`} />
                      Planifiés
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted/50 text-left">
                    <tr>
                      <th className="p-3">
                        <div className="flex items-center">
                          <span>Titre</span>
                          <ArrowUpDown className="ml-1 h-3 w-3" />
                        </div>
                      </th>
                      <th className="p-3">
                        <div className="flex items-center">
                          <span>URL</span>
                          <ArrowUpDown className="ml-1 h-3 w-3" />
                        </div>
                      </th>
                      <th className="p-3 hidden md:table-cell">
                        <div className="flex items-center">
                          <span>Template</span>
                          <ArrowUpDown className="ml-1 h-3 w-3" />
                        </div>
                      </th>
                      <th className="p-3">
                        <div className="flex items-center">
                          <span>Statut</span>
                          <ArrowUpDown className="ml-1 h-3 w-3" />
                        </div>
                      </th>
                      <th className="p-3 hidden lg:table-cell">
                        <div className="flex items-center">
                          <span>Langues</span>
                        </div>
                      </th>
                      <th className="p-3 hidden md:table-cell">
                        <div className="flex items-center">
                          <span>Dernière mise à jour</span>
                          <ArrowUpDown className="ml-1 h-3 w-3" />
                        </div>
                      </th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredPages.map((page) => (
                      <tr key={page.id} className="hover:bg-muted/50 transition-colors">
                        <td className="p-3">
                          <span className="font-medium">{page.title}</span>
                        </td>
                        <td className="p-3">
                          <span className="text-muted-foreground">{page.slug}</span>
                        </td>
                        <td className="p-3 hidden md:table-cell">
                          <span>{page.template}</span>
                        </td>
                        <td className="p-3">
                          {getStatusBadge(page.status)}
                        </td>
                        <td className="p-3 hidden lg:table-cell">
                          <div className="flex items-center space-x-1">
                            {page.languages.map(lang => (
                              <span 
                                key={lang} 
                                className="h-6 w-6 inline-flex items-center justify-center rounded-full bg-muted text-xs font-medium"
                                title={lang === "fr" ? "Français" : lang === "en" ? "English" : "Español"}
                              >
                                {lang.toUpperCase()}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="p-3 hidden md:table-cell">
                          <div className="text-xs text-muted-foreground">
                            <div>{formatDate(page.updatedAt)}</div>
                            <div>par {page.updatedBy}</div>
                          </div>
                        </td>
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end space-x-1">
                            <Button size="sm" variant="ghost" 
                              onClick={() => window.open(`${page.slug}`, "_blank")}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              onClick={() => navigate(`/admin/content/pages/edit/${page.id}`)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button size="sm" variant="ghost">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => navigate(`/admin/content/pages/edit/${page.id}`)}>
                                  <Edit className="mr-2 h-4 w-4" /> Modifier
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => navigate(`/admin/content/pages/translate/${page.id}`)}>
                                  <Globe className="mr-2 h-4 w-4" /> Traduire
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  className="text-destructive focus:text-destructive" 
                                  onClick={() => handleDeletePage(page.id)}
                                >
                                  <Trash className="mr-2 h-4 w-4" /> Supprimer
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {filteredPages.length === 0 && (
                  <div className="p-8 text-center">
                    <p className="text-muted-foreground">Aucune page trouvée</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="layouts" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Mises en page</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center p-8 border-2 border-dashed border-border rounded-lg">
                <div className="text-center">
                  <FileText className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                  <h3 className="font-medium">Éditeur de mises en page</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Créez et modifiez les mises en page du site
                  </p>
                  <Button onClick={() => navigate("/admin/content/layouts/edit")}>
                    <Plus className="mr-2 h-4 w-4" />
                    Créer une mise en page
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentManager;
