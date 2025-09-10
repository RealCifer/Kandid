import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Plus, 
  Play, 
  Pause, 
  Edit, 
  Trash2, 
  Target, 
  Users, 
  TrendingUp, 
  Calendar,
  BarChart3,
  Mail
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Campaign {
  id: string;
  name: string;
  status: "Draft" | "Active" | "Paused" | "Completed";
  totalLeads: number;
  successfulLeads: number;
  responseRate: number;
  createdDate: string;
  progress: number;
}

const mockCampaigns: Campaign[] = [
  {
    id: "1",
    name: "Summer Product Launch",
    status: "Active",
    totalLeads: 450,
    successfulLeads: 67,
    responseRate: 24.8,
    createdDate: "2024-01-01",
    progress: 72
  },
  {
    id: "2",
    name: "Enterprise Outreach Q3",
    status: "Active",
    totalLeads: 320,
    successfulLeads: 89,
    responseRate: 31.2,
    createdDate: "2023-12-15",
    progress: 85
  },
  {
    id: "3",
    name: "SaaS Demo Campaign",
    status: "Paused",
    totalLeads: 180,
    successfulLeads: 34,
    responseRate: 18.9,
    createdDate: "2024-01-10",
    progress: 45
  },
  {
    id: "4",
    name: "Holiday Special Offer",
    status: "Completed",
    totalLeads: 275,
    successfulLeads: 58,
    responseRate: 21.1,
    createdDate: "2023-11-20",
    progress: 100
  },
  {
    id: "5",
    name: "New Year Prospects",
    status: "Draft",
    totalLeads: 0,
    successfulLeads: 0,
    responseRate: 0,
    createdDate: "2024-01-16",
    progress: 0
  }
];

const Campaigns = () => {
  const [campaigns] = useState<Campaign[]>(mockCampaigns);
  const { toast } = useToast();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-success text-success-foreground";
      case "Paused":
        return "bg-warning text-warning-foreground";
      case "Completed":
        return "bg-primary text-primary-foreground";
      case "Draft":
        return "bg-secondary text-secondary-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const handleActionClick = (action: string, campaign: Campaign) => {
    toast({
      title: `${action} Campaign`,
      description: `${action} "${campaign.name}" campaign.`,
    });
  };

  // Calculate summary statistics
  const totalCampaigns = campaigns.length;
  const activeCampaigns = campaigns.filter(c => c.status === "Active").length;
  const totalLeads = campaigns.reduce((sum, c) => sum + c.totalLeads, 0);
  const totalSuccessful = campaigns.reduce((sum, c) => sum + c.successfulLeads, 0);
  const avgResponseRate = totalLeads > 0 ? (totalSuccessful / totalLeads) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Campaigns</h1>
          <p className="text-muted-foreground mt-1">
            Manage and monitor your outreach campaigns.
          </p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90">
          <Plus className="mr-2 h-4 w-4" />
          Create Campaign
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Campaigns
            </CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalCampaigns}</div>
            <p className="text-xs text-muted-foreground">
              {activeCampaigns} currently active
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Leads
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalLeads.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Across all campaigns
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Successful Leads
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalSuccessful}</div>
            <p className="text-xs text-muted-foreground">
              Total conversions
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg Response Rate
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{avgResponseRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              Overall performance
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Campaigns Table */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mail className="h-5 w-5" />
            <span>All Campaigns</span>
          </CardTitle>
          <CardDescription>
            Monitor campaign performance and manage your outreach efforts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Total Leads</TableHead>
                  <TableHead>Successful</TableHead>
                  <TableHead>Response Rate</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {campaigns.map((campaign) => (
                  <TableRow key={campaign.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground">{campaign.name}</p>
                        <p className="text-sm text-muted-foreground">ID: {campaign.id}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(campaign.status)}>
                        {campaign.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{campaign.totalLeads}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4 text-success" />
                        <span className="font-medium">{campaign.successfulLeads}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span className={`font-medium ${
                          campaign.responseRate > 25 ? 'text-success' : 
                          campaign.responseRate > 15 ? 'text-warning' : 'text-muted-foreground'
                        }`}>
                          {campaign.responseRate.toFixed(1)}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2 min-w-[120px]">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">{campaign.progress}%</span>
                        </div>
                        <Progress value={campaign.progress} className="h-2" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{campaign.createdDate}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        {campaign.status === "Active" ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleActionClick("Pause", campaign)}
                          >
                            <Pause className="h-4 w-4" />
                          </Button>
                        ) : campaign.status === "Paused" ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleActionClick("Resume", campaign)}
                          >
                            <Play className="h-4 w-4" />
                          </Button>
                        ) : null}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleActionClick("Edit", campaign)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleActionClick("Delete", campaign)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
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

export default Campaigns;