import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, CreditCard, Pill, TrendingUp, Clock } from "lucide-react";

const stats = [
  {
    title: "Total Patients",
    value: "2,847",
    change: "+12%",
    trend: "up",
    icon: Users,
    color: "text-primary"
  },
  {
    title: "Appointments Today",
    value: "24",
    change: "+3",
    trend: "up", 
    icon: Calendar,
    color: "text-secondary"
  },
  {
    title: "Pending Bills",
    value: "$452",
    change: "-8%",
    trend: "down",
    icon: CreditCard,
    color: "text-warning"
  },
  {
    title: "Active Prescriptions",
    value: "186",
    change: "+15%",
    trend: "up",
    icon: Pill,
    color: "text-success"
  }
];

const recentAppointments = [
  { patient: "Aniket", time: "9:00 AM", type: "Consultation", status: "Scheduled" },
  { patient: "Karan", time: "10:30 AM", type: "Follow-up", status: "In Progress" },
  { patient: "Shivam", time: "2:00 PM", type: "Check-up", status: "Scheduled" },
  { patient: "Sarah", time: "3:30 PM", type: "Consultation", status: "Scheduled" }
];

const pendingTasks = [
  "Review lab results for patient #2847",
  "Approve prescription refill for John Doe",
  "Update billing information for insurance claims",
  "Schedule follow-up appointments for this week"
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <div className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <span className={stat.trend === "up" ? "text-success" : "text-destructive"}>
                  {stat.change}
                </span>
                <span>from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Appointments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-primary" />
              Today's Appointments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAppointments.map((appointment, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-medical-light rounded-lg">
                  <div>
                    <p className="font-medium">{appointment.patient}</p>
                    <p className="text-sm text-muted-foreground">{appointment.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{appointment.time}</p>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      appointment.status === "In Progress" ? "bg-warning text-warning-foreground" :
                      appointment.status === "Completed" ? "bg-success text-success-foreground" :
                      "bg-info text-info-foreground"
                    }`}>
                      {appointment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pending Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-5 w-5 text-secondary" />
              Pending Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingTasks.map((task, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 hover:bg-muted rounded-lg transition-colors">
                  <div className="w-4 h-4 border-2 border-muted-foreground rounded mt-0.5" />
                  <p className="text-sm">{task}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}