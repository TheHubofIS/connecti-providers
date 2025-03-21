
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useAppointments } from "@/contexts/AppointmentContext";
import { useMessages } from "@/contexts/MessageContext";
import { Calendar, UserRound, MessageSquare, CalendarClock, LogOut, DollarSign, Star } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function FournisseurDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { appointments, getAppointments } = useAppointments();
  const { conversations, getConversations } = useMessages();

  useEffect(() => {
    getAppointments();
    getConversations();
  }, []);

  const pendingAppointments = appointments.filter(app => app.status === "pending").length;
  const upcomingAppointments = appointments.filter(app => 
    app.status === "confirmed" && new Date(app.date) > new Date()
  ).length;
  
  const unreadMessages = conversations.reduce((acc, conv) => acc + conv.unreadCount, 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto py-24 px-4">
        <div className="flex flex-col md:flex-row items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Tableau de bord Prestataire</h1>
            <p className="text-muted-foreground">
              Bienvenue, {user?.name}
            </p>
          </div>
          <Button variant="ghost" onClick={logout} className="mt-4 md:mt-0">
            <LogOut className="h-4 w-4 mr-2" />
            Déconnexion
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Demandes en attente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-orange-500 mr-2" />
                <span className="text-2xl font-bold">{pendingAppointments}</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Rendez-vous à venir
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <CalendarClock className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-2xl font-bold">{upcomingAppointments}</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Messages clients
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <MessageSquare className="h-5 w-5 text-blue-500 mr-2" />
                <span className="text-2xl font-bold">{unreadMessages}</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Complétion du profil
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <UserRound className="h-5 w-5 text-purple-500 mr-2" />
                <span className="text-2xl font-bold">{user?.profileCompleted ? "100%" : "75%"}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Performance</CardTitle>
              <CardDescription>Vos statistiques de performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Évaluation moyenne</span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="font-medium">4.8/5</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Taux de réponse</span>
                  <span className="font-medium">95%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Temps de réponse moyen</span>
                  <span className="font-medium">2h</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Projets complétés</span>
                  <span className="font-medium">12</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Revenus</CardTitle>
              <CardDescription>Aperçu de vos revenus</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Ce mois-ci</span>
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 text-green-500 mr-1" />
                    <span className="font-medium">1,250 €</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Mois dernier</span>
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 text-green-500 mr-1" />
                    <span className="font-medium">980 €</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">En attente de paiement</span>
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 text-orange-500 mr-1" />
                    <span className="font-medium">320 €</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Actions rapides</CardTitle>
              <CardDescription>Accédez rapidement aux fonctionnalités principales</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <Button onClick={() => navigate("/fournisseur/appointments")} className="justify-start">
                  <Calendar className="mr-2 h-4 w-4" />
                  Gérer mes rendez-vous
                </Button>
                <Button onClick={() => navigate("/fournisseur/messages")} className="justify-start">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Mes messages
                </Button>
                <Button onClick={() => navigate("/fournisseur/profile")} variant="outline" className="justify-start">
                  <UserRound className="mr-2 h-4 w-4" />
                  Modifier mon profil
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dernières activités</CardTitle>
              <CardDescription>Vos dernières activités sur la plateforme</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appointments.length > 0 ? (
                  appointments.slice(0, 3).map((appointment) => (
                    <div key={appointment.id} className="flex items-start space-x-4">
                      <span className={`flex h-2 w-2 mt-2 rounded-full ${
                        appointment.status === 'confirmed' ? 'bg-green-500' : 
                        appointment.status === 'pending' ? 'bg-orange-500' : 
                        appointment.status === 'completed' ? 'bg-blue-500' : 'bg-red-500'
                      }`} />
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{appointment.title}</p>
                        <p className="text-xs text-muted-foreground">
                          Client: {appointment.clientName} - {new Date(appointment.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Aucune activité récente
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
