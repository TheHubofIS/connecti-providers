
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import AppointmentCard from "./AppointmentCard";

interface AppointmentsListProps {
  appointments: any[];
  emptyMessage: string;
  notes: string;
  setNotes: (notes: string) => void;
  onConfirm: (id: string) => void;
  onCancel: (id: string) => void;
  onComplete: (id: string) => void;
}

const AppointmentsList: React.FC<AppointmentsListProps> = ({
  appointments,
  emptyMessage,
  notes,
  setNotes,
  onConfirm,
  onCancel,
  onComplete
}) => {
  if (appointments.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground py-8">
            {emptyMessage}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      {appointments.map((appointment) => (
        <AppointmentCard
          key={appointment.id}
          appointment={appointment}
          notes={notes}
          setNotes={setNotes}
          onConfirm={onConfirm}
          onCancel={onCancel}
          onComplete={onComplete}
        />
      ))}
    </>
  );
};

export default AppointmentsList;
