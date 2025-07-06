import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Plus, 
  Pill,
  Calendar,
  User,
  AlertTriangle,
  CheckCircle,
  Clock
} from "lucide-react";

const prescriptions = [
  {
    id: "RX-001",
    patientName: "Aniket",
    patientId: "P001",
    medication: "Lisinopril 10mg",
    dosage: "1 tablet daily",
    quantity: 30,
    prescribedDate: "2024-01-15",
    expiryDate: "2024-07-15",
    refills: 2,
    doctor: "Dr. Johnson",
    status: "Active",
    instructions: "Take with food. Monitor blood pressure."
  },
  {
    id: "RX-002",
    patientName: "Karan", 
    patientId: "P002",
    medication: "Metformin 500mg",
    dosage: "2 tablets twice daily",
    quantity: 120,
    prescribedDate: "2024-01-10",
    expiryDate: "2024-07-10",
    refills: 3,
    doctor: "Dr. Prafful",
    status: "Active",
    instructions: "Take with meals. Check blood sugar regularly."
  },
  {
    id: "RX-003",
    patientName: "Shivam",
    patientId: "P003", 
    medication: "Ibuprofen 400mg",
    dosage: "1 tablet as needed",
    quantity: 60,
    prescribedDate: "2023-12-20",
    expiryDate: "2024-06-20",
    refills: 1,
    doctor: "Dr. Wilson",
    status: "Expired",
    instructions: "For pain relief. Do not exceed 3 tablets per day."
  },
  {
    id: "RX-004",
    patientName: "Sarah",
    patientId: "P004",
    medication: "Albuterol Inhaler",
    dosage: "2 puffs as needed",
    quantity: 1,
    prescribedDate: "2024-01-18",
    expiryDate: "2025-01-18",
    refills: 4,
    doctor: "Dr. Johnson", 
    status: "Active",
    instructions: "Use for asthma symptoms. Rinse mouth after use."
  },
  {
    id: "RX-005",
    patientName: "David Lee",
    patientId: "P005",
    medication: "Aspirin 81mg",
    dosage: "1 tablet daily",
    quantity: 90,
    prescribedDate: "2024-01-19",
    expiryDate: "2024-07-19", 
    refills: 2,
    doctor: "Dr. Brown",
    status: "Pending",
    instructions: "For heart health. Take with food."
  }
];

export default function Prescriptions() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPrescription, setSelectedPrescription] = useState<any>(null);

  const filteredPrescriptions = prescriptions.filter(prescription =>
    prescription.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prescription.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prescription.medication.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-success text-success-foreground";
      case "Pending": return "bg-warning text-warning-foreground";
      case "Expired": return "bg-destructive text-destructive-foreground";  
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Active": return CheckCircle;
      case "Pending": return Clock;
      case "Expired": return AlertTriangle;
      default: return Clock;
    }
  };

  const activeCount = prescriptions.filter(p => p.status === "Active").length;
  const pendingCount = prescriptions.filter(p => p.status === "Pending").length;
  const expiredCount = prescriptions.filter(p => p.status === "Expired").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Prescription Management</h1>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          New Prescription
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Prescriptions
            </CardTitle>
            <CheckCircle className="h-5 w-5 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{activeCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Approval
            </CardTitle>
            <Clock className="h-5 w-5 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{pendingCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Expired
            </CardTitle>
            <AlertTriangle className="h-5 w-5 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{expiredCount}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle>Search Prescriptions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by patient name, prescription ID or medication..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">Filter</Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Prescriptions List */}
        <Card>
          <CardHeader>
            <CardTitle>Prescriptions ({filteredPrescriptions.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredPrescriptions.map((prescription) => {
                const StatusIcon = getStatusIcon(prescription.status);
                return (
                  <div
                    key={prescription.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedPrescription?.id === prescription.id ? "bg-medical-light" : "hover:bg-muted"
                    }`}
                    onClick={() => setSelectedPrescription(prescription)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{prescription.patientName}</h3>
                        <p className="text-sm text-muted-foreground">
                          {prescription.id} • {prescription.medication}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(prescription.status)}>
                          <StatusIcon className="mr-1 h-3 w-3" />
                          {prescription.status}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          {prescription.refills} refills left
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Prescription Details */}
        <Card>
          <CardHeader>
            <CardTitle>Prescription Details</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedPrescription ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">{selectedPrescription.id}</h3>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">Edit</Button>
                    <Button size="sm" variant="outline">Refill</Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-muted-foreground">Patient</p>
                    <p>{selectedPrescription.patientName}</p>
                    <p className="text-xs text-muted-foreground">ID: {selectedPrescription.patientId}</p>
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground">Doctor</p>
                    <p>{selectedPrescription.doctor}</p>
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground">Prescribed Date</p>
                    <p>{selectedPrescription.prescribedDate}</p>
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground">Expiry Date</p>
                    <p>{selectedPrescription.expiryDate}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Pill className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{selectedPrescription.medication}</p>
                      <p className="text-sm text-muted-foreground">{selectedPrescription.dosage}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-muted-foreground">Quantity</p>
                      <p>{selectedPrescription.quantity}</p>
                    </div>
                    <div>
                      <p className="font-medium text-muted-foreground">Refills Remaining</p>
                      <p>{selectedPrescription.refills}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="font-medium text-muted-foreground mb-2">Instructions</p>
                  <p className="text-sm bg-medical-light p-3 rounded">
                    {selectedPrescription.instructions}
                  </p>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Status</span>
                    <Badge className={getStatusColor(selectedPrescription.status)}>
                      {selectedPrescription.status}
                    </Badge>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-8">
                <Pill className="mx-auto h-12 w-12 mb-4 opacity-50" />
                <p>Select a prescription to view details</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}