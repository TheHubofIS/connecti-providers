
import { useState } from "react";
import { useAppointment } from "@/contexts/AppointmentContext";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { format } from "date-fns";
import { useToast } from "@/components/ui/use-toast";
import AppointmentsList from "@/components/appointments/AppointmentsList";
import CalendarView from "@/components/appointments/CalendarView";

export default function FournisseurAppointments() {
  const { 
    appointments, 
    confirmAppointment, 
    cancelAppointment, 
    completeAppointment 
  } = useAppointment();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [notes, setNotes] = useState("");
  const { toast } = useToast();
  
  // Filter appointments by status for different tabs
  const todayAppointments = appointments.filter(
    app => format(new Date(app.date), "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd")
  );
  
  const upcomingAppointments = appointments.filter(
    app => app.status === "confirmed" && 
           new Date(app.date) > new Date() && 
           format(new Date(app.date), "yyyy-MM-dd") !== format(new Date(), "yyyy-MM-dd")
  );
  
  const pendingAppointments = appointments.filter(
    app => app.status === "pending"
  );
  
  const pastAppointments = appointments.filter(
    app => app.status === "completed" || 
           (app.status !== "cancelled" && new Date(app.date) < new Date() &&
            format(new Date(app.date), "yyyy-MM-dd") !== format(new Date(), "yyyy-MM-dd"))
  );
  
  // Get appointments for selected date
  const appointmentsForDate = appointments.filter(
    app => date && format(new Date(app.date), "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
  );
  
  // Functions to handle appointment actions
  const handleConfirmAppointment = (id: string) => {
    confirmAppointment(id);
    toast({
      title: "Rendez-vous confirmé",
      description: "Le rendez-vous a été confirmé avec succès.",
    });
  };
  
  const handleCancelAppointment = (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir annuler ce rendez-vous ?")) {
      cancelAppointment(id);
      toast({
        title: "Rendez-vous annulé",
        description: "Le rendez-vous a été annulé.",
        variant: "destructive",
      });
    }
  };
  
  const handleCompleteAppointment = (id: string) => {
    completeAppointment(id, notes);
    setNotes("");
    toast({
      title: "Rendez-vous terminé",
      description: "Le rendez-vous a été marqué comme terminé.",
    });
  };
  
  // Calculate statistics
  const weeklyAppointmentsCount = appointments.filter(app => 
    new Date(app.date) >= new Date() && 
    new Date(app.date) <= new Date(new Date().setDate(new Date().getDate() + 7))
  ).length;
  
  const confirmationRate = appointments.length > 0 
    ? Math.round((appointments.filter(app => app.status === "confirmed" || app.status === "completed").length / appointments.length) * 100) 
    : 0;
  
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Gestion des Rendez-vous</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Tabs defaultValue="today" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="today">
                Aujourd'hui ({todayAppointments.length})
              </TabsTrigger>
              <TabsTrigger value="upcoming">
                À venir ({upcomingAppointments.length})
              </TabsTrigger>
              <TabsTrigger value="pending">
                En attente ({pendingAppointments.length})
              </TabsTrigger>
              <TabsTrigger value="past">
                Passés ({pastAppointments.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="today" className="mt-6">
              <AppointmentsList
                appointments={todayAppointments}
                emptyMessage="Vous n'avez aucun rendez-vous aujourd'hui."
                notes={notes}
                setNotes={setNotes}
                onConfirm={handleConfirmAppointment}
                onCancel={handleCancelAppointment}
                onComplete={handleCompleteAppointment}
              />
            </TabsContent>
            
            <TabsContent value="upcoming" className="mt-6">
              <AppointmentsList
                appointments={upcomingAppointments}
                emptyMessage="Vous n'avez aucun rendez-vous à venir."
                notes={notes}
                setNotes={setNotes}
                onConfirm={handleConfirmAppointment}
                onCancel={handleCancelAppointment}
                onComplete={handleCompleteAppointment}
              />
            </TabsContent>
            
            <TabsContent value="pending" className="mt-6">
              <AppointmentsList
                appointments={pendingAppointments}
                emptyMessage="Vous n'avez aucun rendez-vous en attente de confirmation."
                notes={notes}
                setNotes={setNotes}
                onConfirm={handleConfirmAppointment}
                onCancel={handleCancelAppointment}
                onComplete={handleCompleteAppointment}
              />
            </TabsContent>
            
            <TabsContent value="past" className="mt-6">
              <AppointmentsList
                appointments={pastAppointments}
                emptyMessage="Vous n'avez aucun rendez-vous passé."
                notes={notes}
                setNotes={setNotes}
                onConfirm={handleConfirmAppointment}
                onCancel={handleCancelAppointment}
                onComplete={handleCompleteAppointment}
              />
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <CalendarView
            date={date}
            setDate={setDate}
            appointmentsForDate={appointmentsForDate}
            weeklyAppointmentsCount={weeklyAppointmentsCount}
            confirmationRate={confirmationRate}
            pendingAppointmentsCount={pendingAppointments.length}
          />
        </div>
      </div>
    </div>
  );
}
