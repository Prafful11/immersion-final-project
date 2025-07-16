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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

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
    patientName: "Rohit",
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
  const [bills, setBills] = useState(billingRecords);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBill, setSelectedBill] = useState<any>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filter, setFilter] = useState({ status: "", paymentMethod: "" });
  const { toast } = useToast();

  // Form state for creating invoice
  const [form, setForm] = useState({
    patientName: "",
    patientId: "",
    date: "",
    amount: "",
    services: "",
    status: "Pending",
    paymentMethod: "Cash",
    dueDate: ""
  });

  // Filtered bills
  const filteredBills = bills.filter(bill => {
    const matchesSearch =
      bill.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.status.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filter.status ? bill.status === filter.status : true;
    const matchesPayment = filter.paymentMethod ? bill.paymentMethod === filter.paymentMethod : true;
    return matchesSearch && matchesStatus && matchesPayment;
  });

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

  const totalRevenue = bills.reduce((sum, bill) => sum + bill.amount, 0);
  const paidAmount = bills.filter(b => b.status === "Paid").reduce((sum, bill) => sum + bill.amount, 0);
  const pendingAmount = bills.filter(b => b.status === "Pending").reduce((sum, bill) => sum + bill.amount, 0);
  const overdueAmount = bills.filter(b => b.status === "Overdue").reduce((sum, bill) => sum + bill.amount, 0);

  // Handlers for create invoice
  const openCreateModal = () => {
    setForm({
      patientName: "",
      patientId: "",
      date: "",
      amount: "",
      services: "",
      status: "Pending",
      paymentMethod: "Cash",
      dueDate: ""
    });
    setShowCreateModal(true);
  };
  const handleFormChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleCreate = (e: any) => {
    e.preventDefault();
    const newBill = {
      id: `INV-${bills.length + 1}`,
      patientName: form.patientName,
      patientId: form.patientId,
      date: form.date,
      amount: parseFloat(form.amount),
      services: form.services.split(",").map(s => s.trim()),
      status: form.status,
      paymentMethod: form.paymentMethod,
      dueDate: form.dueDate
    };
    setBills([newBill, ...bills]);
    setShowCreateModal(false);
    toast({ title: "Invoice created!" });
  };

  // Handlers for filter
  const openFilterModal = () => setShowFilterModal(true);
  const handleFilterChange = (e: any) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };
  const handleApplyFilter = () => setShowFilterModal(false);
  const handleClearFilter = () => {
    setFilter({ status: "", paymentMethod: "" });
    setShowFilterModal(false);
  };

  // Export CSV
  const handleExport = () => {
    const csvRows = [
      [
        "Invoice ID",
        "Patient Name",
        "Patient ID",
        "Date",
        "Amount",
        "Services",
        "Status",
        "Payment Method",
        "Due Date"
      ],
      ...filteredBills.map(bill => [
        bill.id,
        bill.patientName,
        bill.patientId,
        bill.date,
        bill.amount,
        bill.services.join("; "),
        bill.status,
        bill.paymentMethod,
        bill.dueDate
      ])
    ];
    const csvContent = csvRows.map(row => row.map(String).map(s => `"${s.replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "invoices.csv";
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: "Exported invoices as CSV." });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Billing Management</h1>
        <Button className="bg-primary hover:bg-primary/90" onClick={openCreateModal}>
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
            <Button variant="outline" onClick={openFilterModal}>Filter</Button>
            <Button variant="outline" onClick={handleExport}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Create Invoice Modal */}
      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Invoice</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreate} className="space-y-4">
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
                <Label htmlFor="amount">Amount</Label>
                <Input id="amount" name="amount" type="number" value={form.amount} onChange={handleFormChange} required min="0" />
              </div>
              <div>
                <Label htmlFor="services">Services (comma separated)</Label>
                <Input id="services" name="services" value={form.services} onChange={handleFormChange} required />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <select id="status" name="status" value={form.status} onChange={handleFormChange} className="w-full border rounded h-10 px-2">
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
                  <option value="Overdue">Overdue</option>
                </select>
              </div>
              <div>
                <Label htmlFor="paymentMethod">Payment Method</Label>
                <select id="paymentMethod" name="paymentMethod" value={form.paymentMethod} onChange={handleFormChange} className="w-full border rounded h-10 px-2">
                  <option value="Cash">Cash</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Insurance">Insurance</option>
                </select>
              </div>
              <div>
                <Label htmlFor="dueDate">Due Date</Label>
                <Input id="dueDate" name="dueDate" type="date" value={form.dueDate} onChange={handleFormChange} required />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowCreateModal(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-primary hover:bg-primary/90">Create</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Filter Modal */}
      <Dialog open={showFilterModal} onOpenChange={setShowFilterModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Filter Invoices</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="filter-status">Status</Label>
              <select id="filter-status" name="status" value={filter.status} onChange={handleFilterChange} className="w-full border rounded h-10 px-2">
                <option value="">All</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Overdue">Overdue</option>
              </select>
            </div>
            <div>
              <Label htmlFor="filter-payment">Payment Method</Label>
              <select id="filter-payment" name="paymentMethod" value={filter.paymentMethod} onChange={handleFilterChange} className="w-full border rounded h-10 px-2">
                <option value="">All</option>
                <option value="Cash">Cash</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Insurance">Insurance</option>
              </select>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleClearFilter}>Clear</Button>
              <Button type="button" onClick={handleApplyFilter}>Apply</Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

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