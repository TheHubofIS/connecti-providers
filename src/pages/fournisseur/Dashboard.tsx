
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Calendar, DollarSign, Mail, MessageSquare, Clock, Users, Briefcase, Star, Award, CheckCircle, AlertCircle, X, Phone, FileEdit, ArrowUpRight } from "lucide-react";

export default function ProviderDashboard() {
  // Mock provider data
  const provider = {
    id: "1",
    name: "Sophie Dubois",
    profession: "Avocate spécialisée en droit des affaires",
    avatarUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    location: "Barcelone, Espagne",
    description: "Avocate au barreau de Paris depuis 15 ans, je propose mes services aux entreprises françaises souhaitant s'implanter en Espagne ou développer leurs activités sur le marché espagnol.",
    category: "Juridique",
    subcategory: "Droit des affaires",
    skills: ["Contrats internationaux", "Droit commercial", "Fusions-acquisitions", "Propriété intellectuelle"],
    languages: ["Français", "Anglais", "Espagnol"],
    hourlyRate: 150,
    availability: "Disponible",
    rating: 4.9,
    reviews: 124,
    joinDate: "Janvier 2022",
    status: "Vérifié",
    completionRate: 85,
    responseRate: 95,
    membership: "Premium",
    email: "sophie.dubois@exemple.com",
    phone: "+34 612 345 678",
  };

  // Mock projects data
  const projects = [
    {
      id: "p1",
      client: {
        name: "TechFrance SAS",
        avatarUrl: "https://ui-avatars.com/api/?name=TF&background=random",
      },
      title: "Révision des contrats clients internationaux",
      status: "En cours",
      deadline: "15 juin 2024",
      budget: "3 500 €",
      messages: 12,
      progress: 60,
    },
    {
      id: "p2",
      client: {
        name: "GlobalExpansion SARL",
        avatarUrl: "https://ui-avatars.com/api/?name=GE&background=random",
      },
      title: "Accompagnement implantation filiale à Barcelone",
      status: "Terminé",
      deadline: "28 avril 2024",
      budget: "5 200 €",
      messages: 18,
      progress: 100,
    },
    {
      id: "p3",
      client: {
        name: "InnovLab",
        avatarUrl: "https://ui-avatars.com/api/?name=IL&background=random",
      },
      title: "Protection marque et brevets sur le marché espagnol",
      status: "Terminé",
      deadline: "10 mars 2024",
      budget: "2 800 €",
      messages: 9,
      progress: 100,
    },
  ];

  // Mock messages data
  const messages = [
    {
      id: "m1",
      from: {
        name: "Antoine Martin",
        company: "TechFrance SAS",
        avatarUrl: "https://ui-avatars.com/api/?name=AM&background=random",
      },
      subject: "Question sur le contrat client",
      preview: "Bonjour Sophie, concernant la clause 4.2 du contrat, je me demandais si...",
      date: "Aujourd'hui, 10:24",
      unread: true,
    },
    {
      id: "m2",
      from: {
        name: "Camille Leroy",
        company: "GlobalExpansion SARL",
        avatarUrl: "https://ui-avatars.com/api/?name=CL&background=random",
      },
      subject: "Validation documents administratifs",
      preview: "Les documents ont bien été reçus par l'administration espagnole. Nous avons maintenant besoin de...",
      date: "Hier, 16:42",
      unread: false,
    },
    {
      id: "m3",
      from: {
        name: "Support Connecti",
        company: "Connecti",
        avatarUrl: "https://ui-avatars.com/api/?name=CS&background=random",
      },
      subject: "Votre abonnement Premium a été renouvelé",
      preview: "Nous vous confirmons le renouvellement de votre abonnement Premium pour une durée d'un an...",
      date: "12 mai 2024",
      unread: false,
    },
  ];

  // Mock proposals data
  const proposals = [
    {
      id: "rfq1",
      company: {
        name: "LuxeMode SA",
        avatarUrl: "https://ui-avatars.com/api/?name=LM&background=random",
      },
      title: "Conseil juridique pour ouverture boutique à Barcelone",
      type: "Appel d'offres",
      budget: "4 000 - 6 000 €",
      deadline: "Réponse avant le 25 mai 2024",
      posted: "15 mai 2024",
      status: "En attente",
      submitted: false,
      matchScore: 92,
    },
    {
      id: "rfq2",
      company: {
        name: "Data Analytics France",
        avatarUrl: "https://ui-avatars.com/api/?name=DA&background=random",
      },
      title: "Rédaction contrats de partenariat international",
      type: "Invitation directe",
      budget: "2 000 - 3 500 €",
      deadline: "Réponse avant le 20 mai 2024",
      posted: "12 mai 2024",
      status: "Répondu",
      submitted: true,
      matchScore: 85,
    },
  ];

  const [stats, setStats] = useState({
    projectsCompleted: 12,
    activeProjects: 1,
    totalEarnings: "18 750 €",
    averageRating: 4.9,
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-secondary/50 rounded-xl border border-border p-5 sticky top-24">
                <div className="flex flex-col items-center mb-6">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={provider.avatarUrl} alt={provider.name} />
                    <AvatarFallback>{provider.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-bold text-center">{provider.name}</h2>
                  <p className="text-sm text-muted-foreground text-center mt-1">{provider.profession}</p>
                  
                  <div className="flex items-center mt-2">
                    <Badge variant="outline" className="bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-800">
                      {provider.status}
                    </Badge>
                    <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 border-blue-200 dark:border-blue-800">
                      {provider.membership}
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-start">
                    <Building className="h-5 w-5 text-muted-foreground mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm font-medium">{provider.category}</p>
                      <p className="text-xs text-muted-foreground">{provider.subcategory}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 text-muted-foreground mr-3" />
                    <p className="text-sm">{provider.hourlyRate}€/heure</p>
                  </div>
                  
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-muted-foreground mr-3" />
                    <p className="text-sm">Membre depuis {provider.joinDate}</p>
                  </div>
                  
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-amber-500 fill-amber-500 mr-3" />
                    <p className="text-sm">{provider.rating} ({provider.reviews} avis)</p>
                  </div>
                </div>
                
                <div className="space-y-3 mb-6">
                  <h3 className="text-sm font-semibold">Compétences</h3>
                  <div className="flex flex-wrap gap-2">
                    {provider.skills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="bg-primary/5">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-3 mb-6">
                  <h3 className="text-sm font-semibold">Langues</h3>
                  <div className="flex flex-wrap gap-2">
                    {provider.languages.map((language, index) => (
                      <Badge key={index} variant="outline">
                        {language}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold">Contact</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-muted-foreground mr-2" />
                      <p className="text-sm">{provider.email}</p>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-muted-foreground mr-2" />
                      <p className="text-sm">{provider.phone}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-border">
                  <Button variant="outline" className="w-full mb-2">
                    <FileEdit className="h-4 w-4 mr-2" />
                    Modifier mon profil
                  </Button>
                  <Link to="/prestataires/1">
                    <Button variant="secondary" className="w-full">
                      <ArrowUpRight className="h-4 w-4 mr-2" />
                      Voir mon profil public
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Main content */}
            <div className="lg:col-span-3">
              {/* Stats cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Projets terminés</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.projectsCompleted}</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Projets actifs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.activeProjects}</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Revenus totaux</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.totalEarnings}</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Note moyenne</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold flex items-center">
                      {stats.averageRating}
                      <Star className="h-5 w-5 text-amber-500 fill-amber-500 ml-1" />
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Main tabs */}
              <Tabs defaultValue="projets" className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="projets">Projets</TabsTrigger>
                  <TabsTrigger value="appels-offres">Appels d'offres</TabsTrigger>
                  <TabsTrigger value="messages">Messages</TabsTrigger>
                  <TabsTrigger value="calendrier">Calendrier</TabsTrigger>
                </TabsList>
                
                {/* Projects tab */}
                <TabsContent value="projets">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold">Mes projets</h2>
                      <Button variant="outline" size="sm">
                        <Filter className="h-4 w-4 mr-2" />
                        Filtrer
                      </Button>
                    </div>
                    
                    {projects.map((project) => (
                      <Card key={project.id} className="overflow-hidden">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-4">
                              <Avatar>
                                <AvatarImage src={project.client.avatarUrl} />
                                <AvatarFallback>{project.client.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <div>
                                <CardTitle className="text-base">{project.title}</CardTitle>
                                <CardDescription>{project.client.name}</CardDescription>
                              </div>
                            </div>
                            <Badge 
                              className={
                                project.status === "En cours" 
                                  ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400" 
                                  : "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400"
                              }
                            >
                              {project.status}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                              <span>{project.deadline}</span>
                            </div>
                            <div className="flex items-center">
                              <DollarSign className="h-4 w-4 text-muted-foreground mr-2" />
                              <span>{project.budget}</span>
                            </div>
                            <div className="flex items-center">
                              <MessageSquare className="h-4 w-4 text-muted-foreground mr-2" />
                              <span>{project.messages} messages</span>
                            </div>
                          </div>
                          
                          {project.status === "En cours" && (
                            <div className="mt-4">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xs text-muted-foreground">Progression : {project.progress}%</span>
                              </div>
                              <div className="w-full bg-muted rounded-full h-2.5">
                                <div 
                                  className="bg-primary h-2.5 rounded-full" 
                                  style={{ width: `${project.progress}%` }}
                                ></div>
                              </div>
                            </div>
                          )}
                        </CardContent>
                        <CardFooter className="border-t bg-muted/50 px-6 py-3">
                          <Button variant="outline" size="sm" className="text-xs">
                            Voir les détails
                          </Button>
                          {project.status === "En cours" && (
                            <Button variant="default" size="sm" className="ml-auto text-xs">
                              <MessageSquare className="h-3 w-3 mr-1" />
                              Envoyer un message
                            </Button>
                          )}
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                {/* RFQs tab */}
                <TabsContent value="appels-offres">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold">Appels d'offres</h2>
                      <Button variant="outline" size="sm">
                        <Filter className="h-4 w-4 mr-2" />
                        Filtrer
                      </Button>
                    </div>
                    
                    {proposals.map((proposal) => (
                      <Card key={proposal.id} className="overflow-hidden">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-4">
                              <Avatar>
                                <AvatarImage src={proposal.company.avatarUrl} />
                                <AvatarFallback>{proposal.company.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <div>
                                <CardTitle className="text-base">{proposal.title}</CardTitle>
                                <CardDescription>{proposal.company.name}</CardDescription>
                              </div>
                            </div>
                            <Badge 
                              className={
                                proposal.submitted
                                  ? "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400" 
                                  : "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400"
                              }
                            >
                              {proposal.status}
                            </Badge>
                          </div>
                          
                          <div className="mt-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                            {proposal.type}
                          </div>
                          
                          <div className="mt-2 flex items-center">
                            <span className="text-xs bg-primary/5 px-2 py-1 rounded-full">
                              Match: {proposal.matchScore}%
                            </span>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div className="flex items-center">
                              <DollarSign className="h-4 w-4 text-muted-foreground mr-2" />
                              <span>{proposal.budget}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                              <span>{proposal.deadline}</span>
                            </div>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                              <span>Posté le {proposal.posted}</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="border-t bg-muted/50 px-6 py-3">
                          <Button variant="outline" size="sm" className="text-xs">
                            Voir les détails
                          </Button>
                          {!proposal.submitted && (
                            <Button variant="default" size="sm" className="ml-auto text-xs">
                              Soumettre une proposition
                            </Button>
                          )}
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                {/* Messages tab */}
                <TabsContent value="messages">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold">Messagerie</h2>
                      <Button variant="outline" size="sm">
                        <Filter className="h-4 w-4 mr-2" />
                        Filtrer
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`p-4 border ${
                            message.unread ? 'border-primary/20 bg-primary/5' : 'border-border'
                          } rounded-lg hover:shadow-sm transition-shadow cursor-pointer`}
                        >
                          <div className="flex items-start gap-4">
                            <Avatar>
                              <AvatarImage src={message.from.avatarUrl} />
                              <AvatarFallback>{message.from.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium truncate">
                                  {message.from.name}
                                  {message.unread && (
                                    <span className="ml-2 inline-flex h-2 w-2 rounded-full bg-primary"></span>
                                  )}
                                </h4>
                                <span className="text-xs text-muted-foreground">
                                  {message.date}
                                </span>
                              </div>
                              
                              <p className="text-xs text-muted-foreground mb-1">
                                {message.from.company}
                              </p>
                              
                              <h3 className="text-sm font-medium mb-1">{message.subject}</h3>
                              
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {message.preview}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                {/* Calendar tab */}
                <TabsContent value="calendrier">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold">Mon calendrier</h2>
                      <Button variant="outline" size="sm">
                        <Filter className="h-4 w-4 mr-2" />
                        Filtrer
                      </Button>
                    </div>
                    
                    <div className="bg-white dark:bg-secondary/50 rounded-xl border border-border p-6 text-center">
                      <div className="mb-4 flex justify-center">
                        <Calendar className="h-12 w-12 text-muted-foreground" />
                      </div>
                      <h3 className="text-xl font-medium mb-2">Module de calendrier</h3>
                      <p className="text-muted-foreground mb-4">
                        Gérez vos rendez-vous, réunions et disponibilités depuis cette interface.
                      </p>
                      <Button>
                        Configurer mon calendrier
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

// Added missing Filter component
function Filter(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}
