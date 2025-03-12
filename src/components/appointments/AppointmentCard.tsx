
import React from "react";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  Clock, 
  Calendar as CalendarIcon, 
  Ban, 
  AlertCircle, 
  Check, 
  X 
} from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface AppointmentCardProps {
  appointment: any;
  notes: string;
  setNotes: (notes: string) => void;
  onConfirm: (id: string) => void;
  onCancel: (id: string) => void;
  onComplete: (id: string) => void;
}

export const renderStatusBadge = (status: string) => {
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

const AppointmentCard: React.FC<AppointmentCardProps> = ({ 
  appointment, 
  notes, 
  setNotes, 
  onConfirm, 
  onCancel, 
  onComplete 
}) => {
  const appointmentDate = new Date(appointment.date);
  const isToday = format(appointmentDate, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd");
  const isPast = appointmentDate < new Date();
  
  return (
    <Card key={appointment.id} className="mb-4">
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
          <div>
            <h3 className="text-xl font-semibold">{appointment.clientName}</h3>
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
            {appointment.status === "pending" && (
              <>
                <Button
                  variant="default"
                  size="sm"
                  className="bg-green-500 hover:bg-green-600"
                  onClick={() => onConfirm(appointment.id)}
                >
                  <Check className="h-4 w-4 mr-1" /> Confirmer
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onCancel(appointment.id)}
                >
                  <X className="h-4 w-4 mr-1" /> Refuser
                </Button>
              </>
            )}
            
            {appointment.status === "confirmed" && !isPast && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onCancel(appointment.id)}
              >
                Annuler
              </Button>
            )}
            
            {appointment.status === "confirmed" && (isToday || isPast) && (
              <>
                <Button
                  variant="default"
                  size="sm"
                  className="bg-blue-500 hover:bg-blue-600"
                  onClick={() => onComplete(appointment.id)}
                >
                  Marquer comme terminé
                </Button>
                
                <div className="pt-2">
                  <Label htmlFor={`notes-${appointment.id}`} className="text-xs">
                    Notes après service
                  </Label>
                  <Textarea
                    id={`notes-${appointment.id}`}
                    placeholder="Ajouter des notes sur le rendez-vous..."
                    className="text-sm mt-1"
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
              </>
            )}
            
            <Button variant="outline" size="sm">
              Contacter
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppointmentCard;
