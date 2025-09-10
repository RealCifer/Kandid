import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, Plus, Mail, Phone, Building, Calendar, User, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Lead {
  id: string;
  name: string;
  email: string;
  company: string;
  campaign: string;
  status: "Pending" | "Contacted" | "Responded" | "Converted";
  lastContact: string;
  phone?: string;
  notes?: string;
}

const mockLeads: Lead[] = [
  {
    id: "1",
    name: "Sarah Chen",
    email: "sarah.chen@techcorp.com",
    company: "TechCorp Inc",
    campaign: "Summer Product Launch",
    status: "Responded",
    lastContact: "2024-01-15",
    phone: "+1 (555) 123-4567",
    notes: "Very interested in the enterprise plan. Scheduled follow-up call for next week."
  },
  {
    id: "2",
    name: "Michael Rodriguez",
    email: "m.rodriguez@innovate.io",
    company: "Innovate Solutions",
    campaign: "Enterprise Outreach Q3",
    status: "Contacted",
    lastContact: "2024-01-14",
    phone: "+1 (555) 987-6543",
    notes: "Initial outreach sent. Waiting for response."
  },
  {
    id: "3",
    name: "Jennifer Walsh",
    email: "jen.walsh@startup.com",
    company: "Walsh Startup",
    campaign: "SaaS Demo Campaign",
    status: "Pending",
    lastContact: "2024-01-12",
    notes: "Added to campaign, no contact made yet."
  },
  {
    id: "4",
    name: "David Kim",
    email: "david@marketpro.com",
    company: "MarketPro Agency",
    campaign: "Summer Product Launch",
    status: "Converted",
    lastContact: "2024-01-10",
    phone: "+1 (555) 456-7890",
    notes: "Successfully converted to paying customer. Upgraded to Pro plan."
  },
  {
    id: "5",
    name: "Lisa Thompson",
    email: "lisa.t@consultfirm.com",
    company: "Thompson Consulting",
    campaign: "Enterprise Outreach Q3",
    status: "Responded",
    lastContact: "2024-01-13",
    phone: "+1 (555) 234-5678",
    notes: "Requested demo and pricing information. High potential lead."
  }
];

const Leads = () => {
  const [leads] = useState<Lead[]>(mockLeads);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const { toast } = useToast();

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.campaign.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Converted":
        return "bg-success text-success-foreground";
      case "Responded":
        return "bg-primary text-primary-foreground";
      case "Contacted":
        return "bg-warning text-warning-foreground";
      case "Pending":
        return "bg-secondary text-secondary-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const handleContactLead = (lead: Lead) => {
    toast({
      title: "Contact initiated",
      description: `Contacting ${lead.name} at ${lead.email}`,
    });
  };

  const handleUpdateStatus = (lead: Lead, newStatus: string) => {
    toast({
      title: "Status updated",
      description: `${lead.name}'s status updated to ${newStatus}`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Leads</h1>
          <p className="text-muted-foreground mt-1">
            Manage and track your leads across all campaigns.
          </p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90">
          <Plus className="mr-2 h-4 w-4" />
          Add Lead
        </Button>
      </div>

      {/* Filters and Search */}
      <Card className="shadow-card">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search leads by name, email, company, or campaign..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {["all", "Pending", "Contacted", "Responded", "Converted"].map((status) => (
                <Button
                  key={status}
                  variant={statusFilter === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter(status)}
                >
                  {status === "all" ? "All" : status}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Leads Table */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>All Leads ({filteredLeads.length})</span>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              More Filters
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Lead</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Campaign</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Contact</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeads.map((lead) => (
                  <TableRow key={lead.id} className="hover:bg-muted/50 cursor-pointer">
                    <TableCell>
                      <Sheet>
                        <SheetTrigger asChild>
                          <div 
                            className="space-y-1"
                            onClick={() => setSelectedLead(lead)}
                          >
                            <p className="font-medium text-foreground hover:text-primary transition-colors">
                              {lead.name}
                            </p>
                            <p className="text-sm text-muted-foreground">{lead.email}</p>
                          </div>
                        </SheetTrigger>
                        <SheetContent className="w-[400px] sm:w-[540px]">
                          <SheetHeader>
                            <SheetTitle className="flex items-center space-x-2">
                              <User className="h-5 w-5" />
                              <span>{selectedLead?.name}</span>
                            </SheetTitle>
                            <SheetDescription>
                              Lead details and interaction history
                            </SheetDescription>
                          </SheetHeader>
                          
                          {selectedLead && (
                            <div className="mt-6 space-y-6">
                              {/* Contact Information */}
                              <div className="space-y-4">
                                <h3 className="font-semibold text-foreground">Contact Information</h3>
                                <div className="grid gap-3">
                                  <div className="flex items-center space-x-3">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">{selectedLead.email}</span>
                                  </div>
                                  {selectedLead.phone && (
                                    <div className="flex items-center space-x-3">
                                      <Phone className="h-4 w-4 text-muted-foreground" />
                                      <span className="text-sm">{selectedLead.phone}</span>
                                    </div>
                                  )}
                                  <div className="flex items-center space-x-3">
                                    <Building className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">{selectedLead.company}</span>
                                  </div>
                                </div>
                              </div>

                              {/* Campaign Information */}
                              <div className="space-y-4">
                                <h3 className="font-semibold text-foreground">Campaign Details</h3>
                                <div className="grid gap-3">
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Campaign:</span>
                                    <span className="text-sm font-medium">{selectedLead.campaign}</span>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Status:</span>
                                    <Badge className={getStatusColor(selectedLead.status)}>
                                      {selectedLead.status}
                                    </Badge>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Last Contact:</span>
                                    <span className="text-sm">{selectedLead.lastContact}</span>
                                  </div>
                                </div>
                              </div>

                              {/* Notes */}
                              {selectedLead.notes && (
                                <div className="space-y-4">
                                  <h3 className="font-semibold text-foreground">Notes</h3>
                                  <div className="p-3 bg-muted rounded-lg">
                                    <p className="text-sm text-muted-foreground">{selectedLead.notes}</p>
                                  </div>
                                </div>
                              )}

                              {/* Actions */}
                              <div className="space-y-3 pt-4 border-t">
                                <Button 
                                  className="w-full bg-gradient-primary hover:opacity-90"
                                  onClick={() => handleContactLead(selectedLead)}
                                >
                                  <Mail className="mr-2 h-4 w-4" />
                                  Send Email
                                </Button>
                                <div className="grid grid-cols-2 gap-2">
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => handleUpdateStatus(selectedLead, "Contacted")}
                                  >
                                    Mark Contacted
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => handleUpdateStatus(selectedLead, "Converted")}
                                  >
                                    Mark Converted
                                  </Button>
                                </div>
                              </div>
                            </div>
                          )}
                        </SheetContent>
                      </Sheet>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{lead.company}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">{lead.campaign}</span>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(lead.status)}>
                        {lead.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{lead.lastContact}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleContactLead(lead)}
                      >
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Leads;