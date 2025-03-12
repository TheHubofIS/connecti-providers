
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useAppointments } from "@/contexts/AppointmentContext";
import { useMessages } from "@/contexts/MessageContext";
import { Calendar, UserRound, MessageSquare, CalendarClock, LogOut } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function ClientDashboard() {
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
            <h1 className="text-3xl font-bold">Tableau de bord</h1>
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
                Rendez-vous en attente
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
                Prochains rendez-vous
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
                Messages non lus
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
                <span className="text-2xl font-bold">{user?.profileCompleted ? "100%" : "50%"}</span>
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
                <Button onClick={() => navigate("/prestataires")} className="justify-start">
                  <UserRound className="mr-2 h-4 w-4" />
                  Rechercher des prestataires
                </Button>
                <Button onClick={() => navigate("/client/appointments")} className="justify-start">
                  <Calendar className="mr-2 h-4 w-4" />
                  Gérer mes rendez-vous
                </Button>
                <Button onClick={() => navigate("/client/messages")} className="justify-start">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Mes messages
                </Button>
                <Button onClick={() => navigate("/client/profile")} variant="outline" className="justify-start">
                  <UserRound className="mr-2 h-4 w-4" />
                  Compléter mon profil
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Activités récentes</CardTitle>
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
                          {new Date(appointment.date).toLocaleDateString()} - {appointment.startTime}
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
