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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const patients = [
  {
    id: "P001",
    name: "Aniket",
    age: 45,
    gender: "Male",
    phone: "(555) 123-4567",
    email: "anikit.singh@email.com",
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
    email: "karan.rajput@email.com",
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
    email: "shivam12@email.com",
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
  const [patientList, setPatientList] = useState(patients);
  const [showAddModal, setShowAddModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "Male",
    phone: "",
    email: "",
    address: "",
    lastVisit: "",
    condition: "",
    status: "Active"
  });
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState(form);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filter, setFilter] = useState({ status: "", gender: "" });

  const filteredPatients = patientList.filter(patient => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.condition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filter.status ? patient.status === filter.status : true;
    const matchesGender = filter.gender ? patient.gender === filter.gender : true;
    return matchesSearch && matchesStatus && matchesGender;
  });

  function handleFormChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleAddPatient(e: React.FormEvent) {
    e.preventDefault();
    const newPatient = {
      ...form,
      id: `P${(patientList.length + 1).toString().padStart(3, "0")}`,
      age: Number(form.age),
    };
    setPatientList([newPatient, ...patientList]);
    setShowAddModal(false);
    setForm({
      name: "",
      age: "",
      gender: "Male",
      phone: "",
      email: "",
      address: "",
      lastVisit: "",
      condition: "",
      status: "Active"
    });
  }

  function handleEditFormChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  }

  function handleEditPatient(e: React.FormEvent) {
    e.preventDefault();
    setPatientList(patientList.map(p =>
      p.id === selectedPatient.id ? { ...editForm, id: p.id, age: Number(editForm.age) } : p
    ));
    setShowEditModal(false);
    setSelectedPatient({ ...editForm, id: selectedPatient.id, age: Number(editForm.age) });
  }

  function openEditModal(patient: any) {
    setSelectedPatient(patient);
    setEditForm({ ...patient, age: String(patient.age) });
    setShowEditModal(true);
  }

  function openViewModal(patient: any) {
    setSelectedPatient(patient);
    setShowViewModal(true);
  }

  function handleFilterChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  }

  function clearFilter() {
    setFilter({ status: "", gender: "" });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Patient Records</h1>
        <Button className="bg-primary hover:bg-primary/90" onClick={() => setShowAddModal(true)}>
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
            <Button variant="outline" onClick={() => setShowFilterModal(true)}>Filter</Button>
          </div>
        </CardContent>
      </Card>

      {/* Add Patient Modal */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Patient</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddPatient} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" value={form.name} onChange={handleFormChange} required />
              </div>
              <div>
                <Label htmlFor="age">Age</Label>
                <Input id="age" name="age" type="number" value={form.age} onChange={handleFormChange} required min="0" />
              </div>
              <div>
                <Label htmlFor="gender">Gender</Label>
                <select id="gender" name="gender" value={form.gender} onChange={handleFormChange} className="w-full border rounded h-10 px-2">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" value={form.phone} onChange={handleFormChange} required />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={form.email} onChange={handleFormChange} required />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input id="address" name="address" value={form.address} onChange={handleFormChange} required />
              </div>
              <div>
                <Label htmlFor="lastVisit">Last Visit</Label>
                <Input id="lastVisit" name="lastVisit" type="date" value={form.lastVisit} onChange={handleFormChange} required />
              </div>
              <div>
                <Label htmlFor="condition">Condition</Label>
                <Input id="condition" name="condition" value={form.condition} onChange={handleFormChange} required />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <select id="status" name="status" value={form.status} onChange={handleFormChange} className="w-full border rounded h-10 px-2">
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowAddModal(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-primary hover:bg-primary/90">Add</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Filter Modal */}
      <Dialog open={showFilterModal} onOpenChange={setShowFilterModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Filter Patients</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="filter-status">Status</Label>
              <select id="filter-status" name="status" value={filter.status} onChange={handleFilterChange} className="w-full border rounded h-10 px-2">
                <option value="">All</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div>
              <Label htmlFor="filter-gender">Gender</Label>
              <select id="filter-gender" name="gender" value={filter.gender} onChange={handleFilterChange} className="w-full border rounded h-10 px-2">
                <option value="">All</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={clearFilter}>Clear</Button>
              <Button type="button" onClick={() => setShowFilterModal(false)}>Apply</Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

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
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" variant="outline" onClick={e => { e.stopPropagation(); openViewModal(patient); }}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={e => { e.stopPropagation(); openEditModal(patient); }}>
                      <Edit className="h-4 w-4" />
                    </Button>
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
                    <Button size="sm" variant="outline" onClick={() => openEditModal(selectedPatient)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => openViewModal(selectedPatient)}>
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

      {/* View Patient Modal */}
      <Dialog open={showViewModal} onOpenChange={setShowViewModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Patient Details</DialogTitle>
          </DialogHeader>
          {selectedPatient && (
            <div className="space-y-2">
              <div><b>Name:</b> {selectedPatient.name}</div>
              <div><b>Age:</b> {selectedPatient.age}</div>
              <div><b>Gender:</b> {selectedPatient.gender}</div>
              <div><b>Phone:</b> {selectedPatient.phone}</div>
              <div><b>Email:</b> {selectedPatient.email}</div>
              <div><b>Address:</b> {selectedPatient.address}</div>
              <div><b>Last Visit:</b> {selectedPatient.lastVisit}</div>
              <div><b>Condition:</b> {selectedPatient.condition}</div>
              <div><b>Status:</b> {selectedPatient.status}</div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      {/* Edit Patient Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Patient</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditPatient} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-name">Name</Label>
                <Input id="edit-name" name="name" value={editForm.name} onChange={handleEditFormChange} required />
              </div>
              <div>
                <Label htmlFor="edit-age">Age</Label>
                <Input id="edit-age" name="age" type="number" value={editForm.age} onChange={handleEditFormChange} required min="0" />
              </div>
              <div>
                <Label htmlFor="edit-gender">Gender</Label>
                <select id="edit-gender" name="gender" value={editForm.gender} onChange={handleEditFormChange} className="w-full border rounded h-10 px-2">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <Label htmlFor="edit-phone">Phone</Label>
                <Input id="edit-phone" name="phone" value={editForm.phone} onChange={handleEditFormChange} required />
              </div>
              <div>
                <Label htmlFor="edit-email">Email</Label>
                <Input id="edit-email" name="email" type="email" value={editForm.email} onChange={handleEditFormChange} required />
              </div>
              <div>
                <Label htmlFor="edit-address">Address</Label>
                <Input id="edit-address" name="address" value={editForm.address} onChange={handleEditFormChange} required />
              </div>
              <div>
                <Label htmlFor="edit-lastVisit">Last Visit</Label>
                <Input id="edit-lastVisit" name="lastVisit" type="date" value={editForm.lastVisit} onChange={handleEditFormChange} required />
              </div>
              <div>
                <Label htmlFor="edit-condition">Condition</Label>
                <Input id="edit-condition" name="condition" value={editForm.condition} onChange={handleEditFormChange} required />
              </div>
              <div>
                <Label htmlFor="edit-status">Status</Label>
                <select id="edit-status" name="status" value={editForm.status} onChange={handleEditFormChange} className="w-full border rounded h-10 px-2">
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
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
    </div>
  );
}