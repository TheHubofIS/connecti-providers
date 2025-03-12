
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { renderStatusBadge } from "./AppointmentCard";

interface CalendarViewProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  appointmentsForDate: any[];
  weeklyAppointmentsCount: number;
  confirmationRate: number;
  pendingAppointmentsCount: number;
}

const CalendarView: React.FC<CalendarViewProps> = ({
  date,
  setDate,
  appointmentsForDate,
  weeklyAppointmentsCount,
  confirmationRate,
  pendingAppointmentsCount
}) => {
  return (
    <>
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
                        <p className="font-medium">{app.clientName}</p>
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
      
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Statistiques</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span>Rendez-vous cette semaine:</span>
              <Badge variant="outline" className="font-mono">
                {weeklyAppointmentsCount}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span>Taux de confirmation:</span>
              <Badge variant="outline" className="font-mono">
                {confirmationRate}%
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span>Rendez-vous en attente:</span>
              <Badge variant="outline" className="font-mono">
                {pendingAppointmentsCount}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default CalendarView;
