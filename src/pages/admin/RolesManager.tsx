
import { useState } from "react";
import { 
  Shield,
  Plus,
  Edit,
  Trash,
  Save,
  X,
  Check,
  MoreHorizontal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface Role {
  id: string;
  name: string;
  description: string;
  isSystem: boolean;
  users: number;
}

interface Permission {
  id: string;
  category: string;
  name: string;
  description: string;
  isGranted: Record<string, boolean>;
}

const RolesManager = () => {
  const [roles, setRoles] = useState<Role[]>([
    {
      id: "admin",
      name: "Administrateur",
      description: "Accès complet à toutes les fonctionnalités",
      isSystem: true,
      users: 1
    },
    {
      id: "editor",
      name: "Éditeur",
      description: "Peut créer et modifier du contenu",
      isSystem: true,
      users: 2
    },
    {
      id: "reader",
      name: "Lecteur",
      description: "Peut uniquement consulter le contenu",
      isSystem: true,
      users: 1
    },
    {
      id: "custom-1",
      name: "Gestionnaire de médias",
      description: "Gère uniquement la bibliothèque médias",
      isSystem: false,
      users: 0
    }
  ]);
  
  const [permissions, setPermissions] = useState<Permission[]>([
    {
      id: "content-view",
      category: "Contenu",
      name: "Voir le contenu",
      description: "Peut voir les pages et leur contenu",
      isGranted: { admin: true, editor: true, reader: true, "custom-1": false }
    },
    {
      id: "content-create",
      category: "Contenu",
      name: "Créer du contenu",
      description: "Peut créer de nouvelles pages",
      isGranted: { admin: true, editor: true, reader: false, "custom-1": false }
    },
    {
      id: "content-edit",
      category: "Contenu",
      name: "Modifier du contenu",
      description: "Peut modifier les pages existantes",
      isGranted: { admin: true, editor: true, reader: false, "custom-1": false }
    },
    {
      id: "content-delete",
      category: "Contenu",
      name: "Supprimer du contenu",
      description: "Peut supprimer des pages",
      isGranted: { admin: true, editor: false, reader: false, "custom-1": false }
    },
    {
      id: "content-publish",
      category: "Contenu",
      name: "Publier du contenu",
      description: "Peut publier ou dépublier des pages",
      isGranted: { admin: true, editor: true, reader: false, "custom-1": false }
    },
    {
      id: "media-view",
      category: "Médias",
      name: "Voir les médias",
      description: "Peut voir la bibliothèque de médias",
      isGranted: { admin: true, editor: true, reader: true, "custom-1": true }
    },
    {
      id: "media-upload",
      category: "Médias",
      name: "Télécharger des médias",
      description: "Peut ajouter des médias",
      isGranted: { admin: true, editor: true, reader: false, "custom-1": true }
    },
    {
      id: "media-delete",
      category: "Médias",
      name: "Supprimer des médias",
      description: "Peut supprimer des médias",
      isGranted: { admin: true, editor: false, reader: false, "custom-1": true }
    },
    {
      id: "users-view",
      category: "Utilisateurs",
      name: "Voir les utilisateurs",
      description: "Peut voir la liste des utilisateurs",
      isGranted: { admin: true, editor: false, reader: false, "custom-1": false }
    },
    {
      id: "users-create",
      category: "Utilisateurs",
      name: "Créer des utilisateurs",
      description: "Peut ajouter de nouveaux utilisateurs",
      isGranted: { admin: true, editor: false, reader: false, "custom-1": false }
    },
    {
      id: "users-edit",
      category: "Utilisateurs",
      name: "Modifier les utilisateurs",
      description: "Peut modifier les utilisateurs existants",
      isGranted: { admin: true, editor: false, reader: false, "custom-1": false }
    },
    {
      id: "users-delete",
      category: "Utilisateurs",
      name: "Supprimer des utilisateurs",
      description: "Peut supprimer des utilisateurs",
      isGranted: { admin: true, editor: false, reader: false, "custom-1": false }
    },
    {
      id: "settings-view",
      category: "Paramètres",
      name: "Voir les paramètres",
      description: "Peut voir les paramètres du site",
      isGranted: { admin: true, editor: true, reader: false, "custom-1": false }
    },
    {
      id: "settings-edit",
      category: "Paramètres",
      name: "Modifier les paramètres",
      description: "Peut modifier les paramètres du site",
      isGranted: { admin: true, editor: false, reader: false, "custom-1": false }
    }
  ]);
  
  const [selectedRole, setSelectedRole] = useState<string>("admin");
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const { toast } = useToast();
  
  const handleTogglePermission = (permissionId: string, roleId: string) => {
    setPermissions(permissions.map(permission => {
      if (permission.id === permissionId) {
        return {
          ...permission,
          isGranted: {
            ...permission.isGranted,
            [roleId]: !permission.isGranted[roleId]
          }
        };
      }
      return permission;
    }));
    
    toast({
      title: "Permission mise à jour",
      description: "La permission a été modifiée avec succès."
    });
  };
  
  const handleAddRole = () => {
    setEditingRole(null);
    setIsRoleDialogOpen(true);
  };
  
  const handleEditRole = (role: Role) => {
    setEditingRole(role);
    setIsRoleDialogOpen(true);
  };
  
  const handleSaveRole = (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsRoleDialogOpen(false);
    
    setTimeout(() => {
      if (editingRole) {
        // Mise à jour d'un rôle existant
        setRoles(roles.map(role => role.id === editingRole.id ? { ...editingRole, name: "Rôle modifié" } : role));
        
        toast({
          title: "Rôle mis à jour",
          description: "Le rôle a été modifié avec succès."
        });
      } else {
        // Création d'un nouveau rôle
        const newRole: Role = {
          id: `custom-${Date.now()}`,
          name: "Nouveau rôle",
          description: "Description du nouveau rôle",
          isSystem: false,
          users: 0
        };
        
        setRoles([...roles, newRole]);
        
        // Ajouter le nouveau rôle à toutes les permissions
        setPermissions(permissions.map(permission => ({
          ...permission,
          isGranted: {
            ...permission.isGranted,
            [newRole.id]: false
          }
        })));
        
        toast({
          title: "Rôle créé",
          description: "Le nouveau rôle a été créé avec succès."
        });
      }
    }, 500);
  };
  
  const handleDeleteRole = (id: string) => {
    setRoles(roles.filter(role => role.id !== id));
    
    // Supprimer le rôle des permissions
    setPermissions(permissions.map(permission => {
      const { [id]: _, ...remainingGrants } = permission.isGranted;
      return {
        ...permission,
        isGranted: remainingGrants
      };
    }));
    
    toast({
      title: "Rôle supprimé",
      description: "Le rôle a été supprimé avec succès."
    });
    
    if (selectedRole === id) {
      setSelectedRole("admin");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Rôles et permissions</h1>
          <p className="text-muted-foreground mt-1">
            Gérez les rôles utilisateurs et leurs permissions
          </p>
        </div>
        
        <Button onClick={handleAddRole}>
          <Plus className="mr-2 h-4 w-4" />
          Ajouter un rôle
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Rôles</CardTitle>
              <CardDescription>
                Sélectionnez un rôle pour gérer ses permissions
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {roles.map((role) => (
                  <button
                    key={role.id}
                    className={`w-full p-3 text-left hover:bg-muted transition-colors flex justify-between items-center ${
                      selectedRole === role.id ? "bg-primary/10" : ""
                    }`}
                    onClick={() => setSelectedRole(role.id)}
                  >
                    <div>
                      <p className="font-medium">{role.name}</p>
                      <p className="text-xs text-muted-foreground">{role.description}</p>
                      <div className="flex items-center mt-1">
                        {role.isSystem && (
                          <Badge variant="outline" className="mr-2 text-xs">Système</Badge>
                        )}
                        <span className="text-xs text-muted-foreground">
                          {role.users} utilisateur{role.users !== 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                    
                    {!role.isSystem && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="sm" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={(e) => {
                            e.stopPropagation();
                            handleEditRole(role);
                          }}>
                            <Edit className="mr-2 h-4 w-4" /> Modifier
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-destructive focus:text-destructive"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteRole(role.id);
                            }}
                          >
                            <Trash className="mr-2 h-4 w-4" /> Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Permissions pour: {roles.find(r => r.id === selectedRole)?.name}</span>
              </CardTitle>
              <CardDescription>
                Configurez les accès pour ce rôle
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="Contenu">
                <TabsList className="mb-4">
                  {Array.from(new Set(permissions.map(p => p.category))).map((category) => (
                    <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
                  ))}
                </TabsList>
                
                {Array.from(new Set(permissions.map(p => p.category))).map((category) => (
                  <TabsContent key={category} value={category}>
                    <div className="border rounded-lg">
                      <table className="w-full">
                        <thead className="bg-muted/50">
                          <tr>
                            <th className="p-3 text-left">Permission</th>
                            <th className="p-3 text-left hidden md:table-cell">Description</th>
                            <th className="p-3 text-right">Accès</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          {permissions
                            .filter(p => p.category === category)
                            .map((permission) => (
                              <tr key={permission.id} className="hover:bg-muted/50 transition-colors">
                                <td className="p-3">
                                  <p className="font-medium">{permission.name}</p>
                                </td>
                                <td className="p-3 hidden md:table-cell">
                                  <p className="text-sm text-muted-foreground">
                                    {permission.description}
                                  </p>
                                </td>
                                <td className="p-3 text-right">
                                  <Switch
                                    checked={permission.isGranted[selectedRole] || false}
                                    onCheckedChange={() => handleTogglePermission(permission.id, selectedRole)}
                                    disabled={selectedRole === "admin" && permission.isGranted.admin}
                                  />
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Dialog pour ajouter/modifier un rôle */}
      <Dialog open={isRoleDialogOpen} onOpenChange={setIsRoleDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingRole ? "Modifier le rôle" : "Ajouter un rôle"}</DialogTitle>
            <DialogDescription>
              {editingRole 
                ? "Modifiez les détails du rôle" 
                : "Définissez un nouveau rôle utilisateur"
              }
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSaveRole} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom du rôle</Label>
              <Input 
                id="name" 
                defaultValue={editingRole?.name || ""}
                placeholder="ex: Gestionnaire de contenu"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input 
                id="description" 
                defaultValue={editingRole?.description || ""} 
                placeholder="ex: Peut gérer le contenu du site" 
              />
            </div>
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="secondary" 
                onClick={() => setIsRoleDialogOpen(false)}
              >
                Annuler
              </Button>
              <Button type="submit">
                {editingRole ? (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Enregistrer
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Créer le rôle
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RolesManager;
