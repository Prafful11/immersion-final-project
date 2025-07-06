import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Plus, User, Phone } from "lucide-react";

const appointments = [
  {
    id: "A001",
    patientName: "Aniket",
    patientId: "P001",
    date: "2024-01-20",
    time: "9:00 AM",
    type: "Consultation",
    doctor: "Dr. Johnson",
    status: "Scheduled",
    phone: "(555) 123-4567",
    reason: "Routine checkup and blood pressure monitoring"
  },
  {
    id: "A002", 
    patientName: "Karan",
    patientId: "P002",
    date: "2024-01-20",
    time: "10:30 AM",
    type: "Follow-up",
    doctor: "Dr. Prafful",
    status: "In Progress",
    phone: "(555) 234-5678",
    reason: "Diabetes management and medication review"
  },
  {
    id: "A003",
    patientName: "Shivam", 
    patientId: "P003",
    date: "2024-01-20",
    time: "2:00 PM",
    type: "Check-up",
    doctor: "Dr. Wilson",
    status: "Scheduled",
    phone: "(555) 345-6789",
    reason: "Arthritis pain assessment"
  },
  {
    id: "A004",
    patientName: "Sarah",
    patientId: "P004", 
    date: "2024-01-21",
    time: "11:00 AM",
    type: "Consultation",
    doctor: "Dr. Johnson",
    status: "Scheduled",
    phone: "(555) 456-7890",
    reason: "Asthma symptoms and inhaler review"
  },
  {
    id: "A005",
    patientName: "David Lee",
    patientId: "P005",
    date: "2024-01-21", 
    time: "3:30 PM",
    type: "Emergency",
    doctor: "Dr. Brown",
    status: "Urgent",
    phone: "(555) 567-8901",
    reason: "Chest pain and breathing difficulty"
  }
];

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM"
];

export default function Appointments() {
  const [selectedDate, setSelectedDate] = useState("2024-01-20");
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);

  const todayAppointments = appointments.filter(apt => apt.date === selectedDate);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Scheduled": return "bg-info text-info-foreground";
      case "In Progress": return "bg-warning text-warning-foreground";
      case "Completed": return "bg-success text-success-foreground";
      case "Urgent": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Appointments</h1>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          Schedule Appointment
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar View */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-primary" />
              Calendar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-sm font-medium text-muted-foreground">Select Date</div>
              <div className="grid grid-cols-7 gap-1 text-center text-xs">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                  <div key={day} className="p-2 font-medium text-muted-foreground">
                    {day}
                  </div>
                ))}
                {Array.from({length: 31}, (_, i) => i + 1).map(day => (
                  <button
                    key={day}
                    className={`p-2 rounded hover:bg-muted transition-colors ${
                      day === 20 ? "bg-primary text-primary-foreground" : ""
                    }`}
                    onClick={() => setSelectedDate(`2024-01-${day.toString().padStart(2, '0')}`)}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <div className="text-sm font-medium text-muted-foreground">Time Slots</div>
              <div className="grid grid-cols-2 gap-2">
                {timeSlots.map(time => {
                  const isBooked = todayAppointments.some(apt => apt.time === time);
                  return (
                    <div
                      key={time}
                      className={`p-2 text-xs text-center rounded border ${
                        isBooked 
                          ? "bg-destructive text-destructive-foreground" 
                          : "bg-success text-success-foreground hover:bg-success/80 cursor-pointer"
                      }`}
                    >
                      {time}
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Appointments List */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>
              Appointments for {new Date(selectedDate).toLocaleDateString()}
              <Badge variant="outline" className="ml-2">
                {todayAppointments.length} appointments
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todayAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedAppointment?.id === appointment.id ? "bg-medical-light" : "hover:bg-muted"
                  }`}
                  onClick={() => setSelectedAppointment(appointment)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{appointment.time}</span>
                      </div>
                      <div>
                        <h3 className="font-medium">{appointment.patientName}</h3>
                        <p className="text-sm text-muted-foreground">
                          {appointment.type} • {appointment.doctor}
                        </p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(appointment.status)}>
                      {appointment.status}
                    </Badge>
                  </div>
                </div>
              ))}

              {todayAppointments.length === 0 && (
                <div className="text-center text-muted-foreground py-8">
                  <Calendar className="mx-auto h-12 w-12 mb-4 opacity-50" />
                  <p>No appointments scheduled for this date</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Appointment Details */}
      {selectedAppointment && (
        <Card>
          <CardHeader>
            <CardTitle>Appointment Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">{selectedAppointment.patientName}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>Patient ID: {selectedAppointment.patientId}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedAppointment.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedAppointment.date} at {selectedAppointment.time}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="font-medium text-muted-foreground mb-2">Appointment Type</p>
                  <Badge variant="outline">{selectedAppointment.type}</Badge>
                </div>

                <div>
                  <p className="font-medium text-muted-foreground mb-2">Assigned Doctor</p>
                  <p>{selectedAppointment.doctor}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="font-medium text-muted-foreground mb-2">Reason for Visit</p>
                  <p className="text-sm bg-medical-light p-3 rounded">
                    {selectedAppointment.reason}
                  </p>
                </div>

                <div>
                  <p className="font-medium text-muted-foreground mb-2">Status</p>
                  <Badge className={getStatusColor(selectedAppointment.status)}>
                    {selectedAppointment.status}
                  </Badge>
                </div>

                <div className="flex space-x-2 pt-4">
                  <Button size="sm" variant="outline">Edit</Button>
                  <Button size="sm" variant="outline">Reschedule</Button>
                  <Button size="sm" variant="outline">Cancel</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}