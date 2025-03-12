
import { useState } from "react";
import { useAppointment } from "@/contexts/AppointmentContext";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  Clock, 
  Calendar as CalendarIcon, 
  Ban, 
  AlertCircle 
} from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default function ClientAppointments() {
  const { appointments, cancelAppointment } = useAppointment();
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Filter appointments by status for different tabs
  const upcomingAppointments = appointments.filter(
    app => app.status === "confirmed" && new Date(app.date) > new Date()
  );
  
  const pendingAppointments = appointments.filter(
    app => app.status === "pending"
  );
  
  const pastAppointments = appointments.filter(
    app => app.status === "completed" || new Date(app.date) < new Date()
  );
  
  const cancelledAppointments = appointments.filter(
    app => app.status === "cancelled"
  );
  
  // Get appointments for selected date
  const appointmentsForDate = appointments.filter(
    app => date && format(new Date(app.date), "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
  );
  
  // Function to render status badge
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-500"><CheckCircle className="h-3 w-3 mr-1" /> Confirmé</Badge>;
      case "pending":
        return <Badge variant="outline" className="border-yellow-500 text-yellow-500"><Clock className="h-3 w-3 mr-1" /> En attente</Badge>;
      case "completed":
        return <Badge className="bg-blue-500"><CheckCircle className="h-3 w-3 mr-1" /> Terminé</Badge>;
      case "cancelled":
        return <Badge variant="destructive"><Ban className="h-3 w-3 mr-1" /> Annulé</Badge>;
      default:
        return <Badge variant="outline"><AlertCircle className="h-3 w-3 mr-1" /> {status}</Badge>;
    }
  };
  
  // Function to handle appointment cancellation
  const handleCancelAppointment = (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir annuler ce rendez-vous ?")) {
      cancelAppointment(id);
    }
  };
  
  // Function to render appointment card
  const renderAppointmentCard = (appointment: any) => {
    const appointmentDate = new Date(appointment.date);
    const isPast = appointmentDate < new Date();
    
    return (
      <Card key={appointment.id} className="mb-4">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            <div>
              <h3 className="text-xl font-semibold">{appointment.providerName}</h3>
              <p className="text-muted-foreground">{appointment.serviceName}</p>
              
              <div className="flex items-center mt-2">
                <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
                <span>
                  {format(appointmentDate, "PPPP", { locale: fr })} à {format(appointmentDate, "HH:mm")}
                </span>
              </div>
              
              <div className="mt-2">
                {renderStatusBadge(appointment.status)}
              </div>
              
              {appointment.notes && (
                <div className="mt-3">
                  <p className="text-sm font-medium">Notes:</p>
                  <p className="text-sm text-muted-foreground">{appointment.notes}</p>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              {appointment.status === "confirmed" && !isPast && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleCancelAppointment(appointment.id)}
                >
                  Annuler
                </Button>
              )}
              
              {(appointment.status === "confirmed" || appointment.status === "completed") && (
                <Button variant="outline" size="sm" className="ml-0 md:ml-2">
                  Contacter
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };
  
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Mes Rendez-vous</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="upcoming">
                À venir ({upcomingAppointments.length})
              </TabsTrigger>
              <TabsTrigger value="pending">
                En attente ({pendingAppointments.length})
              </TabsTrigger>
              <TabsTrigger value="past">
                Passés ({pastAppointments.length})
              </TabsTrigger>
              <TabsTrigger value="cancelled">
                Annulés ({cancelledAppointments.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming" className="mt-6">
              {upcomingAppointments.length === 0 ? (
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-center text-muted-foreground py-8">
                      Vous n'avez aucun rendez-vous à venir.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                upcomingAppointments.map(renderAppointmentCard)
              )}
            </TabsContent>
            
            <TabsContent value="pending" className="mt-6">
              {pendingAppointments.length === 0 ? (
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-center text-muted-foreground py-8">
                      Vous n'avez aucun rendez-vous en attente de confirmation.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                pendingAppointments.map(renderAppointmentCard)
              )}
            </TabsContent>
            
            <TabsContent value="past" className="mt-6">
              {pastAppointments.length === 0 ? (
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-center text-muted-foreground py-8">
                      Vous n'avez aucun rendez-vous passé.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                pastAppointments.map(renderAppointmentCard)
              )}
            </TabsContent>
            
            <TabsContent value="cancelled" className="mt-6">
              {cancelledAppointments.length === 0 ? (
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-center text-muted-foreground py-8">
                      Vous n'avez aucun rendez-vous annulé.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                cancelledAppointments.map(renderAppointmentCard)
              )}
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Calendrier</CardTitle>
              <CardDescription>
                Consultez vos rendez-vous par date
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
                locale={fr}
              />
              
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-3">
                  {date ? format(date, "d MMMM yyyy", { locale: fr }) : "Sélectionnez une date"}
                </h3>
                
                {appointmentsForDate.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    Aucun rendez-vous pour cette date.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {appointmentsForDate.map((app) => (
                      <div key={app.id} className="p-3 border rounded-md">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{app.providerName}</p>
                            <p className="text-sm text-muted-foreground">{app.serviceName}</p>
                            <p className="text-sm">{format(new Date(app.date), "HH:mm")}</p>
                          </div>
                          {renderStatusBadge(app.status)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
