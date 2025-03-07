
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Users, 
  BarChart3, 
  Settings, 
  LogOut, 
  Briefcase, 
  MessageSquare, 
  Bell, 
  Mail, 
  Search,
  Plus,
  MoreHorizontal,
  Filter,
  Download,
  Trash,
  Edit
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Types
interface Provider {
  id: string;
  name: string;
  category: string;
  specialty: string;
  location: string;
  rating: number;
  status: "active" | "pending" | "inactive";
  joinDate: string;
  avatar: string;
}

interface StatCard {
  title: string;
  value: string | number;
  change: number;
  icon: React.ElementType;
}

const AdminDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("providers");
  const [providers, setProviders] = useState<Provider[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    // Vérifier l'authentification
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/connexion");
      return;
    }

    const parsedUser = JSON.parse(userData);
    if (parsedUser.role !== "admin") {
      navigate("/connexion");
      return;
    }

    setUser(parsedUser);

    // Charger les données simulées
    setProviders([
      {
        id: "1",
        name: "Sophie Dubois",
        category: "Juridique",
        specialty: "Droit des affaires",
        location: "Barcelone, Espagne",
        rating: 4.9,
        status: "active",
        joinDate: "2023-05-15",
        avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=300&auto=format&fit=crop",
      },
      {
        id: "2",
        name: "Pierre Martin",
        category: "Comptabilité",
        specialty: "Fiscalité internationale",
        location: "Lisbonne, Portugal",
        rating: 4.8,
        status: "active",
        joinDate: "2023-06-22",
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300&auto=format&fit=crop",
      },
      {
        id: "3",
        name: "Julie Lefèvre",
        category: "IT",
        specialty: "Développement web",
        location: "Berlin, Allemagne",
        rating: 5.0,
        status: "pending",
        joinDate: "2023-08-10",
        avatar: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?q=80&w=300&auto=format&fit=crop",
      },
      {
        id: "4",
        name: "Thomas Roux",
        category: "Médical",
        specialty: "Consultation à distance",
        location: "Montréal, Canada",
        rating: 4.7,
        status: "active",
        joinDate: "2023-04-05",
        avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=300&auto=format&fit=crop",
      },
      {
        id: "5",
        name: "Marie Dupont",
        category: "Dentaire",
        specialty: "Prothèses dentaires",
        location: "Budapest, Hongrie",
        rating: 4.9,
        status: "inactive",
        joinDate: "2023-02-18",
        avatar: "https://images.unsplash.com/photo-1614644147724-2d4785d69962?q=80&w=300&auto=format&fit=crop",
      },
      {
        id: "6",
        name: "Alex Bernard",
        category: "Juridique",
        specialty: "Droit immobilier",
        location: "Miami, États-Unis",
        rating: 4.8,
        status: "active",
        joinDate: "2023-07-30",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=300&auto=format&fit=crop",
      },
    ]);
  }, [navigate]);

  const filteredProviders = providers.filter(provider => {
    const matchesSearch = provider.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          provider.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          provider.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || provider.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/connexion");
  };

  const handleDeleteProvider = (id: string) => {
    setProviders(providers.filter(provider => provider.id !== id));
  };

  const handleEditProvider = (id: string) => {
    navigate(`/admin/prestataires/edit/${id}`);
  };

  const stats: StatCard[] = [
    {
      title: "Prestataires",
      value: providers.length,
      change: 12.5,
      icon: Users,
    },
    {
      title: "Clients",
      value: 1834,
      change: 8.2,
      icon: Briefcase,
    },
    {
      title: "Messages",
      value: 342,
      change: -4.3,
      icon: MessageSquare,
    },
    {
      title: "Revenus",
      value: "€38,400",
      change: 15.3,
      icon: BarChart3,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="w-full lg:w-64 shrink-0">
              <div className="bg-white dark:bg-secondary/30 rounded-xl shadow-sm border border-border overflow-hidden">
                <div className="p-6 border-b border-border">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold">A</span>
                    </div>
                    <div>
                      <h3 className="font-medium">{user?.email || "Admin"}</h3>
                      <p className="text-xs text-muted-foreground">Administrateur</p>
                    </div>
                  </div>
                </div>
                
                <nav className="p-4">
                  <ul className="space-y-2">
                    <li>
                      <button
                        onClick={() => setActiveTab("providers")}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                          activeTab === "providers"
                            ? "bg-primary text-white"
                            : "hover:bg-muted"
                        }`}
                      >
                        <Users className="h-5 w-5" />
                        <span>Prestataires</span>
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setActiveTab("analytics")}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                          activeTab === "analytics"
                            ? "bg-primary text-white"
                            : "hover:bg-muted"
                        }`}
                      >
                        <BarChart3 className="h-5 w-5" />
                        <span>Statistiques</span>
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setActiveTab("messages")}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                          activeTab === "messages"
                            ? "bg-primary text-white"
                            : "hover:bg-muted"
                        }`}
                      >
                        <MessageSquare className="h-5 w-5" />
                        <span>Messages</span>
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setActiveTab("settings")}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                          activeTab === "settings"
                            ? "bg-primary text-white"
                            : "hover:bg-muted"
                        }`}
                      >
                        <Settings className="h-5 w-5" />
                        <span>Paramètres</span>
                      </button>
                    </li>
                  </ul>
                  
                  <div className="mt-8 pt-4 border-t border-border">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-3 px-3 py-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                    >
                      <LogOut className="h-5 w-5" />
                      <span>Déconnexion</span>
                    </button>
                  </div>
                </nav>
              </div>
            </div>
            
            {/* Main content */}
            <div className="flex-1">
              {activeTab === "providers" && (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold">Gestion des prestataires</h1>
                    <Link
                      to="/admin/prestataires/new"
                      className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Ajouter</span>
                    </Link>
                  </div>
                  
                  <div className="bg-white dark:bg-secondary/30 rounded-xl shadow-sm border border-border overflow-hidden">
                    <div className="p-4 border-b border-border">
                      <div className="flex flex-col sm:flex-row gap-4 justify-between">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <input
                            type="text"
                            placeholder="Rechercher un prestataire..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-9 pr-4 py-2 w-full max-w-xs bg-muted/50 rounded-lg border border-input focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all"
                          />
                        </div>
                        
                        <div className="flex gap-2">
                          <select 
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-3 py-2 bg-muted/50 rounded-lg border border-input focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all"
                          >
                            <option value="all">Tous les statuts</option>
                            <option value="active">Actifs</option>
                            <option value="pending">En attente</option>
                            <option value="inactive">Inactifs</option>
                          </select>
                          
                          <button className="flex items-center space-x-1 px-3 py-2 bg-muted/50 rounded-lg border border-input hover:bg-muted transition-colors">
                            <Filter className="h-4 w-4" />
                            <span>Filtres</span>
                          </button>
                          
                          <button className="flex items-center space-x-1 px-3 py-2 bg-muted/50 rounded-lg border border-input hover:bg-muted transition-colors">
                            <Download className="h-4 w-4" />
                            <span>Exporter</span>
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-muted/50">
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                              Prestataire
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                              Catégorie
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                              Spécialité
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                              Localisation
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                              Évaluation
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                              Statut
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          {filteredProviders.map((provider) => (
                            <tr key={provider.id} className="hover:bg-muted/30 transition-colors">
                              <td className="px-4 py-3 whitespace-nowrap">
                                <div className="flex items-center space-x-3">
                                  <div className="h-10 w-10 rounded-full overflow-hidden">
                                    <img
                                      src={provider.avatar}
                                      alt={provider.name}
                                      className="h-full w-full object-cover"
                                    />
                                  </div>
                                  <div>
                                    <div className="font-medium">{provider.name}</div>
                                    <div className="text-xs text-muted-foreground">
                                      Inscrit le {new Date(provider.joinDate).toLocaleDateString()}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                {provider.category}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                {provider.specialty}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                {provider.location}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <div className="flex items-center">
                                  <span className="text-amber-500">★</span>
                                  <span className="ml-1">{provider.rating}</span>
                                </div>
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  provider.status === "active"
                                    ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                                    : provider.status === "pending"
                                    ? "bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400"
                                    : "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
                                }`}>
                                  {provider.status === "active"
                                    ? "Actif"
                                    : provider.status === "pending"
                                    ? "En attente"
                                    : "Inactif"}
                                </span>
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <div className="flex items-center space-x-2">
                                  <button 
                                    onClick={() => handleEditProvider(provider.id)}
                                    className="p-1 hover:bg-muted rounded-full transition-colors"
                                  >
                                    <Edit className="h-4 w-4 text-muted-foreground" />
                                  </button>
                                  <button 
                                    onClick={() => handleDeleteProvider(provider.id)}
                                    className="p-1 hover:bg-destructive/10 hover:text-destructive rounded-full transition-colors"
                                  >
                                    <Trash className="h-4 w-4" />
                                  </button>
                                  <button className="p-1 hover:bg-muted rounded-full transition-colors">
                                    <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      
                      {filteredProviders.length === 0 && (
                        <div className="p-8 text-center">
                          <p className="text-muted-foreground">Aucun prestataire trouvé.</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4 border-t border-border">
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                          Affichage de {filteredProviders.length} sur {providers.length} prestataires
                        </p>
                        <div className="flex items-center space-x-2">
                          <button className="px-3 py-1 bg-muted/50 rounded-md border border-input hover:bg-muted transition-colors disabled:opacity-50">
                            Précédent
                          </button>
                          <button className="px-3 py-1 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors">
                            1
                          </button>
                          <button className="px-3 py-1 bg-muted/50 rounded-md border border-input hover:bg-muted transition-colors">
                            Suivant
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
              
              {activeTab === "analytics" && (
                <>
                  <div className="mb-6">
                    <h1 className="text-2xl font-bold">Statistiques du tableau de bord</h1>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {stats.map((stat, index) => (
                      <div 
                        key={index} 
                        className="bg-white dark:bg-secondary/30 rounded-xl p-6 border border-border"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm text-muted-foreground">{stat.title}</p>
                            <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                          </div>
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <stat.icon className="h-5 w-5 text-primary" />
                          </div>
                        </div>
                        <div className={`mt-4 flex items-center text-sm ${
                          stat.change > 0 ? "text-green-600" : "text-red-600"
                        }`}>
                          <span>{stat.change > 0 ? "+" : ""}{stat.change}%</span>
                          <span className="text-muted-foreground ml-1">depuis le mois dernier</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-secondary/30 rounded-xl p-6 border border-border">
                      <h3 className="text-lg font-semibold mb-4">Inscriptions récentes</h3>
                      <div className="space-y-4">
                        {providers.slice(0, 4).map((provider) => (
                          <div key={provider.id} className="flex items-center space-x-3">
                            <div className="h-10 w-10 rounded-full overflow-hidden">
                              <img
                                src={provider.avatar}
                                alt={provider.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="font-medium">{provider.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {provider.category} • {provider.location}
                              </div>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {new Date(provider.joinDate).toLocaleDateString()}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-white dark:bg-secondary/30 rounded-xl p-6 border border-border">
                      <h3 className="text-lg font-semibold mb-4">Répartition par catégorie</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span>Juridique</span>
                          <span>30%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: "30%" }}></div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span>Comptabilité</span>
                          <span>25%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: "25%" }}></div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span>IT & Digital</span>
                          <span>20%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: "20%" }}></div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span>Médical</span>
                          <span>15%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: "15%" }}></div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span>Dentaire</span>
                          <span>10%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: "10%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
              
              {activeTab === "messages" && (
                <div className="bg-white dark:bg-secondary/30 rounded-xl shadow-sm border border-border overflow-hidden">
                  <div className="p-6 border-b border-border">
                    <h1 className="text-xl font-bold">Messages de contact</h1>
                    <p className="text-muted-foreground mt-1">
                      Gestion des messages reçus via le formulaire de contact
                    </p>
                  </div>
                  
                  <div className="p-6">
                    <div className="space-y-6">
                      {[1, 2, 3, 4, 5].map((index) => (
                        <div key={index} className="p-4 border border-border rounded-lg hover:border-primary transition-colors">
                          <div className="flex justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                                <Mail className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <h3 className="font-medium">Jean Dubois</h3>
                                <p className="text-xs text-muted-foreground">
                                  jean.dubois@exemple.com
                                </p>
                              </div>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              Il y a {index} jour{index > 1 ? "s" : ""}
                            </span>
                          </div>
                          
                          <div className="mt-3">
                            <h4 className="font-medium">Demande de renseignement sur les services juridiques</h4>
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                              Bonjour, je suis à la recherche d'un avocat français basé en Espagne pour m'aider à résoudre un problème immobilier. Pourriez-vous me mettre en relation avec un expert dans ce domaine ?
                            </p>
                          </div>
                          
                          <div className="mt-4 flex items-center space-x-3">
                            <button className="px-3 py-1.5 text-xs bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                              Répondre
                            </button>
                            <button className="px-3 py-1.5 text-xs border border-input rounded-lg hover:bg-muted transition-colors">
                              Marquer comme traité
                            </button>
                            <button className="ml-auto p-1.5 text-destructive hover:bg-destructive/10 rounded-lg transition-colors">
                              <Trash className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === "settings" && (
                <div className="bg-white dark:bg-secondary/30 rounded-xl shadow-sm border border-border overflow-hidden">
                  <div className="p-6 border-b border-border">
                    <h1 className="text-xl font-bold">Paramètres du site</h1>
                    <p className="text-muted-foreground mt-1">
                      Gérez les paramètres généraux de la plateforme
                    </p>
                  </div>
                  
                  <div className="p-6">
                    <form className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Nom du site</label>
                        <input
                          type="text"
                          defaultValue="ConnectiPro"
                          className="w-full px-4 py-2 bg-transparent rounded-lg border border-input focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Email de contact</label>
                        <input
                          type="email"
                          defaultValue="contact@connectipro.fr"
                          className="w-full px-4 py-2 bg-transparent rounded-lg border border-input focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Commission sur les transactions (%)</label>
                        <input
                          type="number"
                          defaultValue="5"
                          className="w-full px-4 py-2 bg-transparent rounded-lg border border-input focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all"
                        />
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="maintenance"
                          className="h-4 w-4 rounded border-input text-primary focus:ring-primary/20"
                        />
                        <label htmlFor="maintenance" className="text-sm font-medium">
                          Mode maintenance
                        </label>
                      </div>
                      
                      <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                        Enregistrer les modifications
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
