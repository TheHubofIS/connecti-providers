
import { useState, useEffect } from "react";
import { 
  Search,
  Plus, 
  User as UserIcon, 
  Edit,
  Trash,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Filter,
  ArrowUpDown,
  Shield
} from "lucide-react";
import { AdminUser, AdminRole } from "@/types/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const UsersManager = () => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [roleFilter, setRoleFilter] = useState<AdminRole | "all">("all");
  const { toast } = useToast();
  
  // Simuler le chargement des données
  useEffect(() => {
    const mockUsers: AdminUser[] = [
      {
        id: "user-1",
        email: "admin@example.com",
        name: "Admin Système",
        role: "admin",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop",
        lastLogin: new Date().toISOString(),
        createdAt: "2023-01-01T00:00:00.000Z"
      },
      {
        id: "user-2",
        email: "sophie@example.com",
        name: "Sophie Martin",
        role: "editor",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop",
        lastLogin: new Date(Date.now() - 86400000).toISOString(),
        createdAt: "2023-03-15T00:00:00.000Z"
      },
      {
        id: "user-3",
        email: "thomas@example.com",
        name: "Thomas Dubois",
        role: "reader",
        lastLogin: new Date(Date.now() - 172800000).toISOString(),
        createdAt: "2023-05-10T00:00:00.000Z"
      },
      {
        id: "user-4",
        email: "julie@example.com",
        name: "Julie Bernard",
        role: "editor",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100&auto=format&fit=crop",
        lastLogin: new Date(Date.now() - 259200000).toISOString(),
        createdAt: "2023-06-22T00:00:00.000Z"
      }
    ];
    
    setUsers(mockUsers);
  }, []);
  
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    
    return matchesSearch && matchesRole;
  });
  
  const handleAddUser = () => {
    setCurrentUser(null);
    setIsUserDialogOpen(true);
  };
  
  const handleEditUser = (user: AdminUser) => {
    setCurrentUser(user);
    setIsUserDialogOpen(true);
  };
  
  const handleSaveUser = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simuler la sauvegarde
    setIsUserDialogOpen(false);
    
    setTimeout(() => {
      if (currentUser) {
        // Mise à jour d'un utilisateur existant
        setUsers(users.map(u => u.id === currentUser.id ? { ...currentUser, name: "Utilisateur modifié" } : u));
        
        toast({
          title: "Utilisateur mis à jour",
          description: "L'utilisateur a été mis à jour avec succès."
        });
      } else {
        // Création d'un nouvel utilisateur
        const newUser: AdminUser = {
          id: `user-${Date.now()}`,
          name: "Nouvel utilisateur",
          email: "nouveau@example.com",
          role: "reader",
          createdAt: new Date().toISOString(),
        };
        
        setUsers([...users, newUser]);
        
        toast({
          title: "Utilisateur créé",
          description: "Le nouvel utilisateur a été créé avec succès."
        });
      }
    }, 500);
  };
  
  const handleDeleteUser = (id: string) => {
    setUsers(users.filter(user => user.id !== id));
    
    toast({
      title: "Utilisateur supprimé",
      description: "L'utilisateur a été supprimé avec succès."
    });
  };
  
  const getRoleBadge = (role: AdminRole) => {
    switch(role) {
      case "admin":
        return <Badge className="bg-primary">Administrateur</Badge>;
      case "editor":
        return <Badge className="bg-blue-500">Éditeur</Badge>;
      case "reader":
        return <Badge variant="outline">Lecteur</Badge>;
      default:
        return null;
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Gestion des utilisateurs</h1>
          <p className="text-muted-foreground mt-1">
            Gérez les accès et les autorisations des utilisateurs
          </p>
        </div>
        
        <Button onClick={handleAddUser}>
          <Plus className="mr-2 h-4 w-4" />
          Ajouter un utilisateur
        </Button>
      </div>
      
      <Card>
        <CardHeader className="p-4 flex-row items-center justify-between space-y-0">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher des utilisateurs..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Select defaultValue="all" onValueChange={(value: AdminRole | "all") => setRoleFilter(value)}>
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filtrer par rôle" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les rôles</SelectItem>
                <SelectItem value="admin">Administrateur</SelectItem>
                <SelectItem value="editor">Éditeur</SelectItem>
                <SelectItem value="reader">Lecteur</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted/50 text-left">
                <tr>
                  <th className="p-3">
                    <div className="flex items-center">
                      <span>Utilisateur</span>
                      <ArrowUpDown className="ml-1 h-3 w-3" />
                    </div>
                  </th>
                  <th className="p-3">
                    <div className="flex items-center">
                      <span>Rôle</span>
                      <ArrowUpDown className="ml-1 h-3 w-3" />
                    </div>
                  </th>
                  <th className="p-3 hidden md:table-cell">
                    <div className="flex items-center">
                      <span>Statut</span>
                    </div>
                  </th>
                  <th className="p-3 hidden md:table-cell">
                    <div className="flex items-center">
                      <span>Créé le</span>
                      <ArrowUpDown className="ml-1 h-3 w-3" />
                    </div>
                  </th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-muted/50 transition-colors">
                    <td className="p-3">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      {getRoleBadge(user.role)}
                    </td>
                    <td className="p-3 hidden md:table-cell">
                      <div className="flex items-center">
                        {user.lastLogin ? (
                          <>
                            <CheckCircle className="h-4 w-4 text-green-500 mr-1.5" />
                            <span className="text-sm">Actif</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="h-4 w-4 text-muted-foreground mr-1.5" />
                            <span className="text-sm text-muted-foreground">Inactif</span>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="p-3 hidden md:table-cell">
                      <span className="text-sm">{formatDate(user.createdAt)}</span>
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end space-x-1">
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => handleEditUser(user)}
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
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleEditUser(user)}>
                              <Edit className="mr-2 h-4 w-4" /> Modifier
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Shield className="mr-2 h-4 w-4" /> Permissions
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-destructive focus:text-destructive"
                              onClick={() => handleDeleteUser(user.id)}
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
            
            {filteredUsers.length === 0 && (
              <div className="p-8 text-center">
                <UserIcon className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                <h3 className="font-medium mb-1">Aucun utilisateur trouvé</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Aucun utilisateur ne correspond à vos critères de recherche
                </p>
                <Button onClick={handleAddUser}>
                  <Plus className="mr-2 h-4 w-4" />
                  Ajouter un utilisateur
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Dialog pour ajouter/modifier un utilisateur */}
      <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{currentUser ? "Modifier l'utilisateur" : "Ajouter un utilisateur"}</DialogTitle>
            <DialogDescription>
              {currentUser 
                ? "Modifiez les informations de l'utilisateur" 
                : "Ajoutez un nouvel utilisateur au système"
              }
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSaveUser} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom</Label>
              <Input 
                id="name" 
                defaultValue={currentUser?.name || ""}
                placeholder="ex: Jean Dupont"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                defaultValue={currentUser?.email || ""} 
                placeholder="ex: jean.dupont@example.com" 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">Rôle</Label>
              <Select defaultValue={currentUser?.role || "reader"}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez un rôle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Administrateur</SelectItem>
                  <SelectItem value="editor">Éditeur</SelectItem>
                  <SelectItem value="reader">Lecteur</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                <strong>Administrateur</strong> : Accès complet au système<br />
                <strong>Éditeur</strong> : Peut modifier le contenu<br />
                <strong>Lecteur</strong> : Peut uniquement consulter
              </p>
            </div>
            
            {!currentUser && (
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input 
                  id="password" 
                  type="password"
                  placeholder="Entrez un mot de passe sécurisé" 
                />
              </div>
            )}
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="secondary" 
                onClick={() => setIsUserDialogOpen(false)}
              >
                Annuler
              </Button>
              <Button type="submit">
                {currentUser ? "Enregistrer" : "Créer l'utilisateur"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UsersManager;
