import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  Mail, 
  Bell, 
  Shield, 
  Key, 
  Database, 
  Save, 
  Upload 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been updated successfully.",
    });
  };

  return (
    <div className="flex-1 p-6 bg-slate-50 overflow-y-auto">
      <div className="space-y-6 max-w-5xl mx-auto">
        {/* Page Header */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
          <p className="text-gray-500 mt-1">
            Manage your account settings and preferences.
          </p>
        </div>

        {/* Profile Settings */}
        <Card className="shadow-card bg-white">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Profile Settings</span>
            </CardTitle>
            <CardDescription>
              Update your profile information and avatar
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-6">
              <Avatar className="h-20 w-20">
                <AvatarImage src="" alt="Profile" />
                <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                  JD
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <Button variant="outline" size="sm">
                  <Upload className="mr-2 h-4 w-4" />
                  Change Avatar
                </Button>
                <p className="text-xs text-gray-500">
                  JPG, PNG up to 2MB
                </p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" defaultValue="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="john@company.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" defaultValue="Acme Corp" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Job Title</Label>
                <Input id="role" defaultValue="Marketing Manager" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="shadow-card bg-white">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Notification Preferences</span>
            </CardTitle>
            <CardDescription>
              Choose what notifications you want to receive
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                title: "Email Notifications",
                desc: "Receive email updates about your campaigns and leads",
                checked: true,
              },
              {
                title: "Lead Response Alerts",
                desc: "Get notified when leads respond to your campaigns",
                checked: true,
              },
              {
                title: "Campaign Status Updates",
                desc: "Notifications about campaign performance and milestones",
                checked: true,
              },
              {
                title: "Weekly Reports",
                desc: "Weekly summary of your lead generation performance",
                checked: false,
              },
            ].map((item, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                  <Switch defaultChecked={item.checked} />
                </div>
                {idx < 3 && <Separator />}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Security */}
        <Card className="shadow-card bg-white">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Security & Privacy</span>
            </CardTitle>
            <CardDescription>
              Manage your account security settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input id="currentPassword" type="password" />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input id="confirmPassword" type="password" />
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Key className="mr-2 h-4 w-4" />
              Update Password
            </Button>
          </CardContent>
        </Card>

        {/* Integrations */}
        <Card className="shadow-card bg-white">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="h-5 w-5" />
              <span>Integrations</span>
            </CardTitle>
            <CardDescription>
              Connect your favorite tools and services
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                  <Mail className="h-4 w-4 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-medium">Gmail Integration</p>
                  <p className="text-sm text-gray-500">
                    Sync your email campaigns
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">Connect</Button>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
                  <Database className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="font-medium">CRM Integration</p>
                  <p className="text-sm text-gray-500">
                    Connect your CRM system
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">Connect</Button>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button 
            onClick={handleSave}
            className="bg-gradient-primary hover:opacity-90"
          >
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
