
import { useState, useEffect } from "react";
import { 
  User as UserIcon,
  Plus,
  Search,
  Trash,
  Edit,
  Check,
  X,
  Filter,
  Shield,
  User,
  Users,
  MoreHorizontal,
  Eye,
  Key,
  Lock
} from "lucide-react";
import { AdminUser, AdminRole } from "@/types/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const UserManager = () => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<AdminRole | "all">("all");
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const { toast } = useToast();
  
  // Simuler le chargement des données
  useEffect(() => {
    const mockUsers: AdminUser[] = [
      {
        id: "user-1",
        email: "admin@example.com",
        name: "Admin Principal",
        role: "admin",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop",
        lastLogin: new Date().toISOString(),
        createdAt: new Date(Date.now() - 30 * 86400000).toISOString()
      },
      {
        id: "user-2",
        email: "sophie@example.com",
        name: "Sophie Martin",
        role: "editor",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop",
        lastLogin: new Date(Date.now() - 2 * 86400000).toISOString(),
        createdAt: new Date(Date.now() - 60 * 86400000).toISOString()
      },
      {
        id: "user-3",
        email: "thomas@example.com",
        name: "Thomas Dubois",
        role: "editor",
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=crop",
        lastLogin: new Date(Date.now() - 5 * 86400000).toISOString(),
        createdAt: new Date(Date.now() - 45 * 86400000).toISOString()
      },
      {
        id: "user-4",
        email: "julie@example.com",
        name: "Julie Bernard",
        role: "reader",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100&auto=format&fit=crop",
        lastLogin: new Date(Date.now() - 1 * 86400000).toISOString(),
        createdAt: new Date(Date.now() - 20 * 86400000).toISOString()
      },
      {
        id: "user-5",
        email: "pierre@example.com",
        name: "Pierre Laurent",
        role: "reader",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop",
        lastLogin: new Date(Date.now() - 10 * 86400000).toISOString(),
        createdAt: new Date(Date.now() - 15 * 86400000).toISOString()
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
  
  const handleDeleteUser = (userId: string) => {
    // Vérifier s'il s'agit du dernier administrateur
    const adminUsers = users.filter(u => u.role === "admin");
    const userToDelete = users.find(u => u.id === userId);
    
    if (adminUsers.length === 1 && userToDelete?.role === "admin") {
      toast({
        title: "Action impossible",
        description: "Vous ne pouvez pas supprimer le dernier administrateur.",
        variant: "destructive"
      });
      return;
    }
    
    setUsers(users.filter(user => user.id !== userId));
    
    toast({
      title: "Utilisateur supprimé",
      description: "L'utilisateur a été supprimé avec succès.",
    });
  };
  
  const handleSaveUser = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const role = formData.get("role") as AdminRole;
    
    if (currentUser) {
      // Mise à jour d'un utilisateur existant
      setUsers(users.map(user => 
        user.id === currentUser.id 
          ? { ...user, name, email, role } 
          : user
      ));
      
      toast({
        title: "Utilisateur modifié",
        description: "Les informations ont été mises à jour avec succès.",
      });
    } else {
      // Ajout d'un nouvel utilisateur
      const newUser: AdminUser = {
        id: `user-${Date.now()}`,
        name,
        email,
        role,
        avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${name}`,
        lastLogin: new Date().toISOString(),
        createdAt: new Date().toISOString()
      };
      
      setUsers([...users, newUser]);
      
      toast({
        title: "Utilisateur ajouté",
        description: "Le nouvel utilisateur a été ajouté avec succès.",
      });
    }
    
    setIsUserDialogOpen(false);
  };
  
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsPasswordDialogOpen(false);
    
    toast({
      title: "Mot de passe modifié",
      description: "Le mot de passe a été modifié avec succès.",
    });
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };
  
  const getRoleBadge = (role: AdminRole) => {
    switch(role) {
      case "admin":
        return <Badge className="bg-primary">Administrateur</Badge>;
      case "editor":
        return <Badge variant="secondary">Éditeur</Badge>;
      case "reader":
        return <Badge variant="outline">Lecteur</Badge>;
      default:
        return null;
    }
  };
  
  const getRoleIcon = (role: AdminRole) => {
    switch(role) {
      case "admin":
        return <Shield className="h-4 w-4 text-primary" />;
      case "editor":
        return <Edit className="h-4 w-4 text-blue-500" />;
      case "reader":
        return <Eye className="h-4 w-4 text-green-500" />;
      default:
        return <User className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Gestion des utilisateurs</h1>
          <p className="text-muted-foreground mt-1">
            Gérer les utilisateurs et leurs rôles
          </p>
        </div>
        
        <Button onClick={handleAddUser}>
          <Plus className="mr-2 h-4 w-4" />
          Ajouter un utilisateur
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader className="p-4 flex-row items-center justify-between space-y-0 border-b">
              <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher des utilisateurs..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Select 
                value={roleFilter} 
                onValueChange={(value: AdminRole | "all") => setRoleFilter(value)}
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filtrer par rôle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les rôles</SelectItem>
                  <SelectItem value="admin">Administrateurs</SelectItem>
                  <SelectItem value="editor">Éditeurs</SelectItem>
                  <SelectItem value="reader">Lecteurs</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full">
                <thead className="bg-muted/50 text-left">
                  <tr>
                    <th className="p-3">Utilisateur</th>
                    <th className="p-3 hidden md:table-cell">Email</th>
                    <th className="p-3">Rôle</th>
                    <th className="p-3 hidden md:table-cell">Dernière connexion</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-muted/50 transition-colors">
                      <td className="p-3">
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 rounded-full overflow-hidden">
                            <img 
                              src={user.avatar} 
                              alt={user.name} 
                              className="h-full w-full object-cover" 
                            />
                          </div>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-xs text-muted-foreground">Depuis {formatDate(user.createdAt)}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 hidden md:table-cell">
                        <span className="text-muted-foreground">{user.email}</span>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center space-x-2">
                          {getRoleIcon(user.role)}
                          <span>{getRoleBadge(user.role)}</span>
                        </div>
                      </td>
                      <td className="p-3 hidden md:table-cell">
                        <span className="text-muted-foreground">{formatDate(user.lastLogin)}</span>
                      </td>
                      <td className="p-3 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEditUser(user)}>
                              <Edit className="mr-2 h-4 w-4" /> Modifier
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => {
                              setCurrentUser(user);
                              setIsPasswordDialogOpen(true);
                            }}>
                              <Key className="mr-2 h-4 w-4" /> Changer le mot de passe
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-destructive focus:text-destructive" 
                              onClick={() => handleDeleteUser(user.id)}
                              disabled={user.role === "admin" && users.filter(u => u.role === "admin").length === 1}
                            >
                              <Trash className="mr-2 h-4 w-4" /> Supprimer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {filteredUsers.length === 0 && (
                <div className="p-8 text-center">
                  <p className="text-muted-foreground">Aucun utilisateur trouvé</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Statistiques</CardTitle>
              <CardDescription>Aperçu des utilisateurs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="text-sm font-medium">Total des utilisateurs</p>
                <p className="text-3xl font-bold">{users.length}</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-primary" />
                    <span className="text-sm">Administrateurs</span>
                  </div>
                  <span className="font-bold">{users.filter(u => u.role === "admin").length}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Edit className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">Éditeurs</span>
                  </div>
                  <span className="font-bold">{users.filter(u => u.role === "editor").length}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Eye className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Lecteurs</span>
                  </div>
                  <span className="font-bold">{users.filter(u => u.role === "reader").length}</span>
                </div>
              </div>
              
              <div className="pt-4 border-t border-border">
                <Button className="w-full" onClick={handleAddUser}>
                  <Plus className="mr-2 h-4 w-4" />
                  Ajouter un utilisateur
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
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
                name="name"
                defaultValue={currentUser?.name || ""} 
                placeholder="ex: Jean Dupont" 
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                name="email"
                defaultValue={currentUser?.email || ""} 
                placeholder="ex: jean@example.com" 
                type="email"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">Rôle</Label>
              <Select 
                name="role"
                defaultValue={currentUser?.role || "reader"}
              >
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
                <span className="font-medium">Administrateur</span>: Accès complet<br />
                <span className="font-medium">Éditeur</span>: Peut modifier le contenu<br />
                <span className="font-medium">Lecteur</span>: Peut voir le contenu
              </p>
            </div>
            
            {!currentUser && (
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input 
                  id="password" 
                  name="password"
                  placeholder="••••••••" 
                  type="password"
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
                {currentUser ? "Enregistrer" : "Ajouter"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Dialog pour changer le mot de passe */}
      <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Changer le mot de passe</DialogTitle>
            <DialogDescription>
              {currentUser && `Modifier le mot de passe de ${currentUser.name}`}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="new-password">Nouveau mot de passe</Label>
              <Input 
                id="new-password" 
                placeholder="••••••••" 
                type="password"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
              <Input 
                id="confirm-password" 
                placeholder="••••••••" 
                type="password"
              />
            </div>
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="secondary" 
                onClick={() => setIsPasswordDialogOpen(false)}
              >
                Annuler
              </Button>
              <Button type="submit">
                Enregistrer
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManager;
