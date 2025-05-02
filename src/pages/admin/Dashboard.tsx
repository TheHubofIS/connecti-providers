
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  FileText, 
  Users, 
  Image, 
  Settings,
  BarChart3,
  Globe,
  ArrowUpRight,
  ArrowUp,
  ArrowDown,
  PlusCircle,
  Edit,
  Clock
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

interface StatCard {
  title: string;
  value: string | number;
  change: number;
  changeText: string;
  icon: React.ElementType;
  color: string;
  link: string;
}

interface ActivityItem {
  id: string;
  title: string;
  description: string;
  type: "create" | "update" | "delete" | "publish";
  user: {
    name: string;
    avatar: string;
  };
  timestamp: string;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<StatCard[]>([]);
  const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([]);
  
  // Simuler le chargement des données
  useEffect(() => {
    setStats([
      {
        title: "Pages",
        value: "24",
        change: 12.5,
        changeText: "depuis le dernier mois",
        icon: FileText,
        color: "bg-blue-500/10 text-blue-500",
        link: "/admin/content/pages"
      },
      {
        title: "Médias",
        value: "148",
        change: 8.2,
        changeText: "depuis le dernier mois",
        icon: Image,
        color: "bg-amber-500/10 text-amber-500",
        link: "/admin/media"
      },
      {
        title: "Prestataires",
        value: "32",
        change: 15.3,
        changeText: "depuis le dernier mois",
        icon: Users,
        color: "bg-green-500/10 text-green-500",
        link: "/admin/providers"
      },
      {
        title: "Langues",
        value: "3",
        change: 0,
        changeText: "aucun changement",
        icon: Globe,
        color: "bg-purple-500/10 text-purple-500",
        link: "/admin/settings/languages"
      }
    ]);
    
    setRecentActivity([
      {
        id: "1",
        title: "Page d'accueil mise à jour",
        description: "Modification du contenu principal",
        type: "update",
        user: {
          name: "Admin",
          avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop"
        },
        timestamp: "Il y a 2 heures"
      },
      {
        id: "2",
        title: "Nouvelle image ajoutée",
        description: "hero-background.jpg a été ajoutée à la bibliothèque",
        type: "create",
        user: {
          name: "Sophie Martin",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop"
        },
        timestamp: "Il y a 4 heures"
      },
      {
        id: "3",
        title: "Traduction mise à jour",
        description: "Contenu traduit en anglais",
        type: "update",
        user: {
          name: "Admin",
          avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop"
        },
        timestamp: "Il y a 12 heures"
      },
      {
        id: "4",
        title: "Page 'Services' publiée",
        description: "La page est maintenant visible",
        type: "publish",
        user: {
          name: "Admin",
          avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop"
        },
        timestamp: "Il y a 1 jour"
      },
      {
        id: "5",
        title: "Menu principal modifié",
        description: "Ajout d'un lien vers 'Prestataires'",
        type: "update",
        user: {
          name: "Sophie Martin",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop"
        },
        timestamp: "Il y a 2 jours"
      }
    ]);
  }, []);
  
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "create":
        return <PlusCircle className="h-4 w-4 text-green-500" />;
      case "update":
        return <Edit className="h-4 w-4 text-blue-500" />;
      case "delete":
        return <Edit className="h-4 w-4 text-red-500" />;
      case "publish":
        return <ArrowUpRight className="h-4 w-4 text-purple-500" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Tableau de bord</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, idx) => (
          <Card key={idx}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`p-2 rounded-full ${stat.color}`}>
                <stat.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                {stat.change > 0 ? (
                  <>
                    <ArrowUp className="h-3 w-3 mr-1 text-green-500" />
                    <span className="text-green-500">+{stat.change}%</span>
                  </>
                ) : stat.change < 0 ? (
                  <>
                    <ArrowDown className="h-3 w-3 mr-1 text-red-500" />
                    <span className="text-red-500">{stat.change}%</span>
                  </>
                ) : (
                  <span>±0%</span>
                )}
                <span className="ml-1">{stat.changeText}</span>
              </p>
              <Link to={stat.link} className="text-xs text-primary hover:underline flex items-center mt-4">
                Voir détails
                <ArrowUpRight className="h-3 w-3 ml-1" />
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Activité récente</CardTitle>
            <CardDescription>Les dernières actions effectuées sur le site</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex space-x-4">
                <div className="relative">
                  <div className="h-9 w-9 rounded-full overflow-hidden">
                    <img 
                      src={activity.user.avatar} 
                      alt={activity.user.name} 
                      className="h-full w-full object-cover" 
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-background flex items-center justify-center">
                    {getActivityIcon(activity.type)}
                  </div>
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">{activity.title}</p>
                  <p className="text-xs text-muted-foreground">{activity.description}</p>
                  <div className="flex items-center pt-1">
                    <span className="text-xs text-muted-foreground">{activity.user.name}</span>
                    <span className="mx-1 text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Accès rapide</CardTitle>
            <CardDescription>Raccourcis vers les fonctions principales</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link 
              to="/admin/content/pages/new" 
              className="flex items-center p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
            >
              <div className="p-2 rounded-full bg-blue-500/10 text-blue-500 mr-3">
                <FileText className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium">Créer une page</p>
                <p className="text-xs text-muted-foreground">Ajouter une nouvelle page au site</p>
              </div>
            </Link>
            
            <Link 
              to="/admin/media/upload" 
              className="flex items-center p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
            >
              <div className="p-2 rounded-full bg-amber-500/10 text-amber-500 mr-3">
                <Image className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium">Ajouter des médias</p>
                <p className="text-xs text-muted-foreground">Télécharger des images ou des documents</p>
              </div>
            </Link>
            
            <Link 
              to="/admin/content/menus" 
              className="flex items-center p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
            >
              <div className="p-2 rounded-full bg-green-500/10 text-green-500 mr-3">
                <Settings className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium">Gérer les menus</p>
                <p className="text-xs text-muted-foreground">Modifier les menus du site</p>
              </div>
            </Link>
            
            <Link 
              to="/admin/translations" 
              className="flex items-center p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
            >
              <div className="p-2 rounded-full bg-purple-500/10 text-purple-500 mr-3">
                <Globe className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium">Traduire le contenu</p>
                <p className="text-xs text-muted-foreground">Gérer les traductions du site</p>
              </div>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
