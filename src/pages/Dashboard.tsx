import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Users, Target, TrendingUp, Mail, BarChart3, Calendar } from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Leads",
      value: "2,847",
      change: "+12%",
      changeType: "increase" as const,
      icon: Users,
      description: "Active leads in your pipeline"
    },
    {
      title: "Active Campaigns",
      value: "18",
      change: "+3",
      changeType: "increase" as const,
      icon: Target,
      description: "Currently running campaigns"
    },
    {
      title: "Conversion Rate",
      value: "24.5%",
      change: "+2.1%",
      changeType: "increase" as const,
      icon: TrendingUp,
      description: "Lead to customer conversion"
    },
    {
      title: "Email Responses",
      value: "1,204",
      change: "+8%",
      changeType: "increase" as const,
      icon: Mail,
      description: "Total email responses received"
    }
  ];

  const recentCampaigns = [
    {
      name: "Summer Product Launch",
      status: "Active",
      leads: 450,
      converted: 67,
      progress: 72
    },
    {
      name: "Enterprise Outreach Q3",
      status: "Active",
      leads: 320,
      converted: 89,
      progress: 85
    },
    {
      name: "SaaS Demo Campaign",
      status: "Paused",
      leads: 180,
      converted: 34,
      progress: 45
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-success text-success-foreground";
      case "Paused":
        return "bg-warning text-warning-foreground";
      case "Completed":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's an overview of your lead generation performance.
          </p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>Last updated: Today at 7:30 PM</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="shadow-card hover:shadow-professional transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="flex items-center space-x-1 text-xs">
                <span className={`font-medium ${
                  stat.changeType === 'increase' ? 'text-success' : 'text-destructive'
                }`}>
                  {stat.change}
                </span>
                <span className="text-muted-foreground">from last month</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Campaign Performance */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Campaign Performance</span>
            </CardTitle>
            <CardDescription>
              Track your most active campaigns and their conversion rates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCampaigns.map((campaign) => (
                <div key={campaign.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-sm">{campaign.name}</h4>
                      <Badge className={`text-xs ${getStatusColor(campaign.status)}`}>
                        {campaign.status}
                      </Badge>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {campaign.converted}/{campaign.leads} converted
                    </span>
                  </div>
                  <Progress value={campaign.progress} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{campaign.leads} leads</span>
                    <span>{campaign.progress}% complete</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks and shortcuts to boost your productivity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              <button className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-accent transition-colors text-left">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-sm">Import New Leads</p>
                  <p className="text-xs text-muted-foreground">Upload CSV or connect integrations</p>
                </div>
              </button>
              
              <button className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-accent transition-colors text-left">
                <Target className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-sm">Create Campaign</p>
                  <p className="text-xs text-muted-foreground">Start a new outreach campaign</p>
                </div>
              </button>
              
              <button className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-accent transition-colors text-left">
                <Mail className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-sm">Email Templates</p>
                  <p className="text-xs text-muted-foreground">Manage your email templates</p>
                </div>
              </button>
              
              <button className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-accent transition-colors text-left">
                <BarChart3 className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-sm">View Reports</p>
                  <p className="text-xs text-muted-foreground">Detailed analytics and insights</p>
                </div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;