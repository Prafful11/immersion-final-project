import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Plus, User, Phone } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

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
    patientName: "Rohit",
    patientId: "P005",
    date: "2024-01-21", 
    time: "3:30 PM",
    type: "Emergency",
    doctor: "Dr. Prafful",
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
  const [appointmentsState, setAppointmentsState] = useState(appointments);
  const [selectedDate, setSelectedDate] = useState("2024-01-20");
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const { toast } = useToast();

  // Form state for scheduling/editing
  const [form, setForm] = useState({
    patientName: "",
    patientId: "",
    date: selectedDate,
    time: timeSlots[0],
    type: "Consultation",
    doctor: "",
    status: "Scheduled",
    phone: "",
    reason: ""
  });

  // Filtered appointments for the selected date
  const todayAppointments = appointmentsState.filter(apt => apt.date === selectedDate);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Scheduled": return "bg-info text-info-foreground";
      case "In Progress": return "bg-warning text-warning-foreground";
      case "Completed": return "bg-success text-success-foreground";
      case "Urgent": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  // Handlers for scheduling
  const openScheduleModal = () => {
    setForm({
      patientName: "",
      patientId: "",
      date: selectedDate,
      time: timeSlots[0],
      type: "Consultation",
      doctor: "",
      status: "Scheduled",
      phone: "",
      reason: ""
    });
    setShowScheduleModal(true);
  };
  const handleFormChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSchedule = (e: any) => {
    e.preventDefault();
    const newAppointment = {
      ...form,
      id: `A${appointmentsState.length + 1}`,
    };
    setAppointmentsState([newAppointment, ...appointmentsState]);
    setShowScheduleModal(false);
    setSelectedDate(form.date);
    toast({ title: "Appointment scheduled!" });
  };

  // Handlers for editing
  const openEditModal = (apt: any) => {
    setForm({ ...apt });
    setShowEditModal(true);
  };
  const handleEdit = (e: any) => {
    e.preventDefault();
    setAppointmentsState(appointmentsState.map(a => a.id === form.id ? { ...form } : a));
    setShowEditModal(false);
    setSelectedAppointment({ ...form });
    toast({ title: "Appointment updated!" });
  };

  // Handlers for rescheduling
  const openRescheduleModal = (apt: any) => {
    setForm({ ...apt });
    setShowRescheduleModal(true);
  };
  const handleReschedule = (e: any) => {
    e.preventDefault();
    setAppointmentsState(appointmentsState.map(a => a.id === form.id ? { ...a, date: form.date, time: form.time } : a));
    setShowRescheduleModal(false);
    setSelectedAppointment({ ...form, date: form.date, time: form.time });
    setSelectedDate(form.date);
    toast({ title: "Appointment rescheduled!" });
  };

  // Handler for cancel
  const openCancelModal = (apt: any) => {
    setForm({ ...apt });
    setShowCancelModal(true);
  };
  const handleCancel = () => {
    setAppointmentsState(appointmentsState.filter(a => a.id !== form.id));
    setShowCancelModal(false);
    setSelectedAppointment(null);
    toast({ title: "Appointment cancelled." });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Appointments</h1>
        <Button className="bg-primary hover:bg-primary/90" onClick={openScheduleModal}>
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
                {[
                  "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
                ].map(day => (
                  <div key={day} className="p-2 font-medium text-muted-foreground">
                    {day}
                  </div>
                ))}
                {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                  <button
                    key={day}
                    className={`p-2 rounded hover:bg-muted transition-colors ${
                      selectedDate === `2024-01-${day.toString().padStart(2, "0")}` ? "bg-primary text-primary-foreground" : ""
                    }`}
                    onClick={() => setSelectedDate(`2024-01-${day.toString().padStart(2, "0")}`)}
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
                  <Button size="sm" variant="outline" onClick={() => openEditModal(selectedAppointment)}>Edit</Button>
                  <Button size="sm" variant="outline" onClick={() => openRescheduleModal(selectedAppointment)}>Reschedule</Button>
                  <Button size="sm" variant="outline" onClick={() => openCancelModal(selectedAppointment)}>Cancel</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Schedule Appointment Modal */}
      <Dialog open={showScheduleModal} onOpenChange={setShowScheduleModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Schedule Appointment</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSchedule} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="patientName">Patient Name</Label>
                <Input id="patientName" name="patientName" value={form.patientName} onChange={handleFormChange} required />
              </div>
              <div>
                <Label htmlFor="patientId">Patient ID</Label>
                <Input id="patientId" name="patientId" value={form.patientId} onChange={handleFormChange} required />
              </div>
              <div>
                <Label htmlFor="date">Date</Label>
                <Input id="date" name="date" type="date" value={form.date} onChange={handleFormChange} required />
              </div>
              <div>
                <Label htmlFor="time">Time</Label>
                <select id="time" name="time" value={form.time} onChange={handleFormChange} className="w-full border rounded h-10 px-2">
                  {timeSlots.map(slot => <option key={slot} value={slot}>{slot}</option>)}
                </select>
              </div>
              <div>
                <Label htmlFor="type">Type</Label>
                <Input id="type" name="type" value={form.type} onChange={handleFormChange} required />
              </div>
              <div>
                <Label htmlFor="doctor">Doctor</Label>
                <Input id="doctor" name="doctor" value={form.doctor} onChange={handleFormChange} required />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" value={form.phone} onChange={handleFormChange} required />
              </div>
              <div>
                <Label htmlFor="reason">Reason</Label>
                <Input id="reason" name="reason" value={form.reason} onChange={handleFormChange} required />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowScheduleModal(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-primary hover:bg-primary/90">Schedule</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Appointment Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Appointment</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEdit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-patientName">Patient Name</Label>
                <Input id="edit-patientName" name="patientName" value={form.patientName} onChange={handleFormChange} required />
              </div>
              <div>
                <Label htmlFor="edit-patientId">Patient ID</Label>
                <Input id="edit-patientId" name="patientId" value={form.patientId} onChange={handleFormChange} required />
              </div>
              <div>
                <Label htmlFor="edit-date">Date</Label>
                <Input id="edit-date" name="date" type="date" value={form.date} onChange={handleFormChange} required />
              </div>
              <div>
                <Label htmlFor="edit-time">Time</Label>
                <select id="edit-time" name="time" value={form.time} onChange={handleFormChange} className="w-full border rounded h-10 px-2">
                  {timeSlots.map(slot => <option key={slot} value={slot}>{slot}</option>)}
                </select>
              </div>
              <div>
                <Label htmlFor="edit-type">Type</Label>
                <Input id="edit-type" name="type" value={form.type} onChange={handleFormChange} required />
              </div>
              <div>
                <Label htmlFor="edit-doctor">Doctor</Label>
                <Input id="edit-doctor" name="doctor" value={form.doctor} onChange={handleFormChange} required />
              </div>
              <div>
                <Label htmlFor="edit-phone">Phone</Label>
                <Input id="edit-phone" name="phone" value={form.phone} onChange={handleFormChange} required />
              </div>
              <div>
                <Label htmlFor="edit-reason">Reason</Label>
                <Input id="edit-reason" name="reason" value={form.reason} onChange={handleFormChange} required />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowEditModal(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-primary hover:bg-primary/90">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Reschedule Appointment Modal */}
      <Dialog open={showRescheduleModal} onOpenChange={setShowRescheduleModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reschedule Appointment</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleReschedule} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="reschedule-date">Date</Label>
                <Input id="reschedule-date" name="date" type="date" value={form.date} onChange={handleFormChange} required />
              </div>
              <div>
                <Label htmlFor="reschedule-time">Time</Label>
                <select id="reschedule-time" name="time" value={form.time} onChange={handleFormChange} className="w-full border rounded h-10 px-2">
                  {timeSlots.map(slot => <option key={slot} value={slot}>{slot}</option>)}
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowRescheduleModal(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-primary hover:bg-primary/90">Reschedule</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Cancel Appointment Modal */}
      <Dialog open={showCancelModal} onOpenChange={setShowCancelModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Appointment</DialogTitle>
          </DialogHeader>
          <div className="py-4">Are you sure you want to cancel this appointment?</div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setShowCancelModal(false)}>
              No
            </Button>
            <Button type="button" className="bg-destructive hover:bg-destructive/90" onClick={handleCancel}>
              Yes, Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}