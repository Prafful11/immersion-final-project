import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Plus, 
  Edit, 
  Eye, 
  Phone, 
  Mail,
  MapPin,
  Calendar,
  Users
} from "lucide-react";

const patients = [
  {
    id: "P001",
    name: "Aniket",
    age: 45,
    gender: "Male",
    phone: "(555) 123-4567",
    email: "john.smith@email.com",
    address: "123 Main St, City, State",
    lastVisit: "2024-01-15",
    condition: "Hypertension",
    status: "Active"
  },
  {
    id: "P002", 
    name: "Karan",
    age: 32,
    gender: "Female",
    phone: "(555) 234-5678",
    email: "emily.johnson@email.com",
    address: "456 Oak Ave, City, State",
    lastVisit: "2024-01-10",
    condition: "Diabetes",
    status: "Active"
  },
  {
    id: "P003",
    name: "Shivam",
    age: 58,
    gender: "Male", 
    phone: "(555) 345-6789",
    email: "michael.brown@email.com",
    address: "789 Pine St, City, State",
    lastVisit: "2023-12-20",
    condition: "Arthritis",
    status: "Inactive"
  },
  {
    id: "P004",
    name: "Sarah",
    age: 28,
    gender: "Female",
    phone: "(555) 456-7890", 
    email: "sarah.wilson@email.com",
    address: "321 Elm St, City, State",
    lastVisit: "2024-01-18",
    condition: "Asthma",
    status: "Active"
  }
];

export default function Patients() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<any>(null);

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Patient Records</h1>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          Add Patient
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search Patients</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, ID or condition..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">Filter</Button>
          </div>
        </CardContent>
      </Card>

      {/* Patients List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Patient List ({filteredPatients.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredPatients.map((patient) => (
                <div
                  key={patient.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedPatient?.id === patient.id ? "bg-medical-light" : "hover:bg-muted"
                  }`}
                  onClick={() => setSelectedPatient(patient)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{patient.name}</h3>
                      <p className="text-sm text-muted-foreground">ID: {patient.id}</p>
                    </div>
                    <Badge variant={patient.status === "Active" ? "default" : "secondary"}>
                      {patient.status}
                    </Badge>
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    <p>{patient.age} years • {patient.gender}</p>
                    <p className="text-xs mt-1">{patient.condition}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Patient Details */}
        <Card>
          <CardHeader>
            <CardTitle>Patient Details</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedPatient ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">{selectedPatient.name}</h3>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-muted-foreground">Patient ID</p>
                    <p>{selectedPatient.id}</p>
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground">Age</p>
                    <p>{selectedPatient.age} years</p>
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground">Gender</p>
                    <p>{selectedPatient.gender}</p>
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground">Status</p>
                    <Badge variant={selectedPatient.status === "Active" ? "default" : "secondary"}>
                      {selectedPatient.status}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{selectedPatient.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{selectedPatient.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{selectedPatient.address}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Last visit: {selectedPatient.lastVisit}</span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="font-medium text-muted-foreground mb-2">Current Condition</p>
                  <p className="text-sm bg-medical-light p-2 rounded">{selectedPatient.condition}</p>
                </div>
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-8">
                <Users className="mx-auto h-12 w-12 mb-4 opacity-50" />
                <p>Select a patient to view details</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}