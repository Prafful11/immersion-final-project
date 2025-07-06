import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Plus, 
  Download, 
  DollarSign,
  CreditCard,
  AlertCircle,
  CheckCircle,
  Clock
} from "lucide-react";

const billingRecords = [
  {
    id: "INV-001",
    patientName: "Aniket",
    patientId: "P001", 
    date: "2024-01-15",
    amount: 450.00,
    services: ["Consultation", "Blood Test"],
    status: "Paid",
    paymentMethod: "Insurance",
    dueDate: "2024-01-30"
  },
  {
    id: "INV-002",
    patientName: "Karan",
    patientId: "P002",
    date: "2024-01-10", 
    amount: 280.00,
    services: ["Follow-up", "Prescription"],
    status: "Pending",
    paymentMethod: "Cash",
    dueDate: "2024-01-25"
  },
  {
    id: "INV-003", 
    patientName: "Shivam",
    patientId: "P003",
    date: "2023-12-20",
    amount: 650.00,
    services: ["X-Ray", "Consultation", "Medication"],
    status: "Overdue",
    paymentMethod: "Credit Card",
    dueDate: "2024-01-05"
  },
  {
    id: "INV-004",
    patientName: "Sarah", 
    patientId: "P004",
    date: "2024-01-18",
    amount: 320.00,
    services: ["Consultation", "Inhaler"],
    status: "Paid",
    paymentMethod: "Insurance",
    dueDate: "2024-02-02"
  },
  {
    id: "INV-005",
    patientName: "David Lee",
    patientId: "P005",
    date: "2024-01-19",
    amount: 1200.00,
    services: ["Emergency Care", "ECG", "Medication"],
    status: "Pending",
    paymentMethod: "Insurance",
    dueDate: "2024-02-03"
  }
];

export default function Billing() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBill, setSelectedBill] = useState<any>(null);

  const filteredBills = billingRecords.filter(bill =>
    bill.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bill.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bill.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid": return "bg-success text-success-foreground";
      case "Pending": return "bg-warning text-warning-foreground";  
      case "Overdue": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Paid": return CheckCircle;
      case "Pending": return Clock;
      case "Overdue": return AlertCircle;
      default: return Clock;
    }
  };

  const totalRevenue = billingRecords.reduce((sum, bill) => sum + bill.amount, 0);
  const paidAmount = billingRecords.filter(b => b.status === "Paid").reduce((sum, bill) => sum + bill.amount, 0);
  const pendingAmount = billingRecords.filter(b => b.status === "Pending").reduce((sum, bill) => sum + bill.amount, 0);
  const overdueAmount = billingRecords.filter(b => b.status === "Overdue").reduce((sum, bill) => sum + bill.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Billing Management</h1>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          Create Invoice
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Paid
            </CardTitle>
            <CheckCircle className="h-5 w-5 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">${paidAmount.toFixed(2)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending
            </CardTitle>
            <Clock className="h-5 w-5 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">${pendingAmount.toFixed(2)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Overdue
            </CardTitle>
            <AlertCircle className="h-5 w-5 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">${overdueAmount.toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle>Search Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by patient name, invoice ID or status..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">Filter</Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Billing Records List */}
        <Card>
          <CardHeader>
            <CardTitle>Invoices ({filteredBills.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredBills.map((bill) => {
                const StatusIcon = getStatusIcon(bill.status);
                return (
                  <div
                    key={bill.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedBill?.id === bill.id ? "bg-medical-light" : "hover:bg-muted"
                    }`}
                    onClick={() => setSelectedBill(bill)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{bill.patientName}</h3>
                        <p className="text-sm text-muted-foreground">
                          {bill.id} • {bill.date}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">${bill.amount.toFixed(2)}</p>
                        <Badge className={getStatusColor(bill.status)}>
                          <StatusIcon className="mr-1 h-3 w-3" />
                          {bill.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Invoice Details */}
        <Card>
          <CardHeader>
            <CardTitle>Invoice Details</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedBill ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">{selectedBill.id}</h3>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button size="sm" className="bg-primary hover:bg-primary/90">
                      Process Payment
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-muted-foreground">Patient</p>
                    <p>{selectedBill.patientName}</p>
                    <p className="text-xs text-muted-foreground">ID: {selectedBill.patientId}</p>
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground">Amount</p>
                    <p className="text-xl font-bold">${selectedBill.amount.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground">Date</p>
                    <p>{selectedBill.date}</p>
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground">Due Date</p>
                    <p>{selectedBill.dueDate}</p>
                  </div>
                </div>

                <div>
                  <p className="font-medium text-muted-foreground mb-2">Payment Method</p>
                  <div className="flex items-center space-x-2">
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{selectedBill.paymentMethod}</span>
                  </div>
                </div>

                <div>
                  <p className="font-medium text-muted-foreground mb-2">Services</p>
                  <div className="space-y-1">
                    {selectedBill.services.map((service, index) => (
                      <div key={index} className="text-sm bg-medical-light p-2 rounded">
                        {service}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Status</span>
                    <Badge className={getStatusColor(selectedBill.status)}>
                      {selectedBill.status}
                    </Badge>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-8">
                <CreditCard className="mx-auto h-12 w-12 mb-4 opacity-50" />
                <p>Select an invoice to view details</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}