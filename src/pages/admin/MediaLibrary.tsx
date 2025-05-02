
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  Trash, 
  Download, 
  Edit, 
  Search, 
  Filter, 
  Upload,
  Grid,
  List,
  X,
  Plus,
  Image,
  FilePlus
} from "lucide-react";
import { SiteImage } from "@/types/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const MediaLibrary = () => {
  const [images, setImages] = useState<SiteImage[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [currentTag, setCurrentTag] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  // Simuler le chargement des données
  useEffect(() => {
    // Images simulées
    const mockImages: SiteImage[] = Array.from({ length: 16 }).map((_, i) => ({
      id: `img-${i}`,
      fileName: `image-${i + 1}.jpg`,
      url: `https://picsum.photos/seed/${i + 1}/800/600`,
      thumbnailUrl: `https://picsum.photos/seed/${i + 1}/300/200`,
      size: Math.round(Math.random() * 5000000), // Taille aléatoire entre 0 et 5MB
      dimensions: {
        width: 800,
        height: 600
      },
      alt: `Image ${i + 1}`,
      tags: ["site", i % 2 === 0 ? "homepage" : "content", i % 3 === 0 ? "banner" : "product"],
      uploadedAt: new Date(Date.now() - i * 86400000).toISOString(), // Dates échelonnées
      uploadedBy: "Admin"
    }));
    
    setImages(mockImages);
  }, []);

  const filteredImages = images.filter((image) => {
    const matchesSearch = image.fileName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          image.alt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = currentTag ? image.tags.includes(currentTag) : true;
    return matchesSearch && matchesTag;
  });
  
  const allTags = Array.from(new Set(images.flatMap(image => image.tags)));
  
  const handleImageSelect = (id: string) => {
    setSelectedImages(prev => 
      prev.includes(id) 
        ? prev.filter(imgId => imgId !== id) 
        : [...prev, id]
    );
  };
  
  const handleDeleteSelected = () => {
    setImages(prev => prev.filter(image => !selectedImages.includes(image.id)));
    toast({
      title: `${selectedImages.length} image(s) supprimée(s)`,
      description: "Les images ont été supprimées avec succès.",
    });
    setSelectedImages([]);
  };
  
  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    
    // Simuler un téléchargement
    setTimeout(() => {
      setIsUploading(false);
      setIsUploadDialogOpen(false);
      
      toast({
        title: "Téléchargement réussi",
        description: "Vos images ont été téléchargées avec succès.",
      });
      
      // Ajouter une nouvelle image simulée
      const newImage: SiteImage = {
        id: `img-${images.length}`,
        fileName: `image-new-${images.length + 1}.jpg`,
        url: `https://picsum.photos/seed/${images.length + 100}/800/600`,
        thumbnailUrl: `https://picsum.photos/seed/${images.length + 100}/300/200`,
        size: Math.round(Math.random() * 5000000),
        dimensions: {
          width: 800,
          height: 600
        },
        alt: `Nouvelle image ${images.length + 1}`,
        tags: ["nouveau"],
        uploadedAt: new Date().toISOString(),
        uploadedBy: "Admin"
      };
      
      setImages(prev => [newImage, ...prev]);
    }, 2000);
  };
  
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    const kb = bytes / 1024;
    if (kb < 1024) return kb.toFixed(1) + ' KB';
    const mb = kb / 1024;
    return mb.toFixed(1) + ' MB';
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Bibliothèque médias</h1>
          <p className="text-muted-foreground mt-1">
            Gérer toutes les images et médias du site
          </p>
        </div>
        
        <div className="flex space-x-2">
          <Button 
            onClick={() => setIsUploadDialogOpen(true)}
            className="flex items-center"
          >
            <Upload className="mr-2 h-4 w-4" />
            Télécharger
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-64 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          
          <div className="bg-white dark:bg-secondary/30 rounded-xl overflow-hidden border border-border">
            <div className="p-3 border-b border-border bg-muted/50">
              <h3 className="font-medium">Filtres</h3>
            </div>
            <div className="p-3">
              <h4 className="text-sm font-medium mb-2">Tags</h4>
              <div className="space-y-1">
                <button
                  onClick={() => setCurrentTag(null)}
                  className={`px-2 py-1 text-sm rounded-md w-full text-left transition-colors ${!currentTag ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}`}
                >
                  Tous
                </button>
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setCurrentTag(tag)}
                    className={`px-2 py-1 text-sm rounded-md w-full text-left transition-colors ${currentTag === tag ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex-1">
          <div className="bg-white dark:bg-secondary/30 rounded-xl overflow-hidden border border-border">
            <div className="p-4 border-b border-border flex justify-between items-center bg-muted/50">
              <div>
                <span className="text-sm text-muted-foreground">
                  {filteredImages.length} résultats
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                {selectedImages.length > 0 && (
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={handleDeleteSelected}
                  >
                    <Trash className="mr-1 h-4 w-4" />
                    Supprimer ({selectedImages.length})
                  </Button>
                )}
                
                <div className="border border-border rounded-md overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 ${viewMode === "grid" ? "bg-muted" : ""}`}
                    aria-label="Vue en grille"
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 ${viewMode === "list" ? "bg-muted" : ""}`}
                    aria-label="Vue en liste"
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Vue en grille */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
                {filteredImages.map((image) => (
                  <div 
                    key={image.id} 
                    className={`relative group rounded-lg overflow-hidden border ${
                      selectedImages.includes(image.id) ? "border-primary ring-2 ring-primary/20" : "border-border"
                    } hover:border-primary/60 transition-colors`}
                    onClick={() => handleImageSelect(image.id)}
                  >
                    <div className="aspect-square relative">
                      <img 
                        src={image.thumbnailUrl} 
                        alt={image.alt} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
                      
                      {/* Checkbox */}
                      <div className="absolute top-2 left-2">
                        <div className={`h-5 w-5 rounded border ${
                          selectedImages.includes(image.id) ? "bg-primary border-primary" : "border-white/70 bg-black/30"
                        }`}>
                          {selectedImages.includes(image.id) && (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                              <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      </div>
                      
                      {/* Actions */}
                      <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="sm" variant="secondary">
                              <Edit className="h-3 w-3 mr-1" />
                              Actions
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" /> Modifier
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="h-4 w-4 mr-2" /> Télécharger
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive focus:text-destructive">
                              <Trash className="h-4 w-4 mr-2" /> Supprimer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    
                    <div className="p-2 bg-muted/50">
                      <p className="text-xs font-medium truncate">{image.fileName}</p>
                      <p className="text-xs text-muted-foreground">{formatFileSize(image.size)}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Vue en liste */
              <table className="w-full">
                <thead className="bg-muted/50 text-left">
                  <tr>
                    <th className="p-3 w-10">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary/20"
                        />
                      </div>
                    </th>
                    <th className="p-3">Fichier</th>
                    <th className="p-3 hidden md:table-cell">Dimensions</th>
                    <th className="p-3 hidden md:table-cell">Taille</th>
                    <th className="p-3 hidden md:table-cell">Date</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredImages.map((image) => (
                    <tr 
                      key={image.id} 
                      className={`${
                        selectedImages.includes(image.id) ? "bg-primary/5" : "hover:bg-muted/50"
                      } transition-colors`}
                    >
                      <td className="p-3">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedImages.includes(image.id)}
                            onChange={() => handleImageSelect(image.id)}
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary/20"
                          />
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded overflow-hidden mr-3 border border-border">
                            <img 
                              src={image.thumbnailUrl} 
                              alt={image.alt} 
                              className="h-full w-full object-cover" 
                            />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{image.fileName}</p>
                            <p className="text-xs text-muted-foreground">{image.alt}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 hidden md:table-cell">
                        <span className="text-sm">{image.dimensions.width} x {image.dimensions.height}</span>
                      </td>
                      <td className="p-3 hidden md:table-cell">
                        <span className="text-sm">{formatFileSize(image.size)}</span>
                      </td>
                      <td className="p-3 hidden md:table-cell">
                        <span className="text-sm">{formatDate(image.uploadedAt)}</span>
                      </td>
                      <td className="p-3 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="sm" variant="ghost">
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" /> Modifier
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="h-4 w-4 mr-2" /> Télécharger
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive focus:text-destructive">
                              <Trash className="h-4 w-4 mr-2" /> Supprimer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            
            {filteredImages.length === 0 && (
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Image className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-medium mb-1">Aucun média trouvé</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Aucune image ne correspond à votre recherche
                </p>
                <Button onClick={() => {
                  setSearchTerm("");
                  setCurrentTag(null);
                }}>
                  Réinitialiser les filtres
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Dialog de téléchargement */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Télécharger des médias</DialogTitle>
            <DialogDescription>
              Ajoutez de nouvelles images à la bibliothèque de médias
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleUpload} className="space-y-6">
            <div className="border-2 border-dashed border-border rounded-lg p-10 text-center">
              <div className="flex flex-col items-center">
                <FilePlus className="h-10 w-10 text-muted-foreground mb-4" />
                <p className="text-sm font-medium mb-1">
                  Glissez-déposez des fichiers ici
                </p>
                <p className="text-xs text-muted-foreground mb-4">
                  SVG, PNG, JPG ou GIF (max. 5MB)
                </p>
                
                <Button type="button" variant="outline">
                  Parcourir les fichiers
                  <input
                    type="file"
                    multiple
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </Button>
              </div>
            </div>
            
            <DialogFooter className="sm:justify-end">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setIsUploadDialogOpen(false)}
                disabled={isUploading}
              >
                Annuler
              </Button>
              <Button type="submit" disabled={isUploading}>
                {isUploading ? (
                  <>
                    <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin mr-2" />
                    Téléchargement...
                  </>
                ) : (
                  "Télécharger"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MediaLibrary;
