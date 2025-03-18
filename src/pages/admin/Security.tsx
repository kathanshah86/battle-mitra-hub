
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { 
  Shield, 
  Key, 
  Lock, 
  Eye, 
  EyeOff, 
  Smartphone, 
  AlertTriangle, 
  RefreshCw,
  Clock,
  UserX
} from "lucide-react";

const AdminSecurity = () => {
  const [showApiKey, setShowApiKey] = useState(false);
  const [setup2FAOpen, setSetup2FAOpen] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  
  // Mock data - in a real app, these would come from your backend
  const apiKey = "sk_test_51NxgT7SIJD5tF4Tk1X8Kj7jd5Gk3lFm9";
  const accessLogs = [
    {
      id: 1,
      user: "admin@battlemitra.com",
      action: "Login successful",
      ip: "103.25.128.45",
      date: "2023-09-20T14:32:15",
      status: "success"
    },
    {
      id: 2,
      user: "Unknown",
      action: "Failed login attempt",
      ip: "45.123.45.67",
      date: "2023-09-20T12:15:30",
      status: "failed"
    },
    {
      id: 3,
      user: "admin@battlemitra.com",
      action: "Changed tournament settings",
      ip: "103.25.128.45",
      date: "2023-09-19T16:42:10",
      status: "success"
    },
    {
      id: 4,
      user: "Unknown",
      action: "Failed login attempt",
      ip: "87.236.12.98",
      date: "2023-09-19T10:05:22",
      status: "failed"
    },
    {
      id: 5,
      user: "admin@battlemitra.com",
      action: "Password changed",
      ip: "103.25.128.45",
      date: "2023-09-18T09:12:45",
      status: "success"
    }
  ];
  
  const handleGenerateApiKey = () => {
    toast({
      title: "New API Key Generated",
      description: "Your new API key has been generated successfully.",
    });
  };
  
  const handleSetup2FA = () => {
    // Close the dialog and show a success message
    if (verificationCode.length === 6) {
      setSetup2FAOpen(false);
      toast({
        title: "Two-Factor Authentication Enabled",
        description: "Your account is now protected with 2FA.",
      });
    } else {
      toast({
        title: "Invalid Code",
        description: "Please enter a valid 6-digit verification code.",
        variant: "destructive",
      });
    }
  };
  
  const getActionStatusColor = (status: string) => {
    return status === "success" ? "text-esports-green" : "text-esports-red";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Security Settings</h2>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        {/* Two-Factor Authentication */}
        <Card className="bg-esports-card border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="h-5 w-5 text-esports-purple" />
              Two-Factor Authentication
            </CardTitle>
            <CardDescription>
              Add an extra layer of security to your admin account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between bg-esports-darker p-4 rounded-lg">
              <div className="flex items-center">
                <Shield className="h-8 w-8 text-esports-green mr-4" />
                <div>
                  <p className="font-medium">2FA Status</p>
                  <p className="text-sm text-muted-foreground">Currently enabled for your account</p>
                </div>
              </div>
              <Switch checked={true} />
            </div>
            
            <div className="flex flex-col space-y-2">
              <Button variant="outline" className="w-full" onClick={() => setSetup2FAOpen(true)}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Reconfigure 2FA
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Last updated: 2 months ago
              </p>
            </div>
          </CardContent>
        </Card>
        
        {/* API Keys */}
        <Card className="bg-esports-card border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5 text-esports-yellow" />
              API Keys
            </CardTitle>
            <CardDescription>
              Manage API keys for external service integrations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Input 
                className="pr-16 bg-esports-darker border-gray-700 font-mono text-sm"
                value={showApiKey ? apiKey : "••••••••••••••••••••••••••••••••"}
                readOnly
              />
              <Button 
                variant="ghost" 
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                onClick={() => setShowApiKey(!showApiKey)}
              >
                {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            
            <div className="flex justify-between gap-2">
              <Button variant="outline" className="flex-1" onClick={handleGenerateApiKey}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Generate New Key
              </Button>
              <Button variant="outline" className="flex-1">
                Copy to Clipboard
              </Button>
            </div>
            
            <div className="bg-esports-darker p-3 rounded-md text-sm">
              <p className="text-yellow-400 flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Keep your API keys secret
              </p>
              <p className="text-muted-foreground text-xs mt-1">
                Treat your API keys like passwords. Never share them publicly or in client-side code.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* IP Access Control */}
      <Card className="bg-esports-card border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-esports-red" />
            IP Access Control
          </CardTitle>
          <CardDescription>
            Restrict admin access to specific IP addresses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form>
            <div className="space-y-4">
              <FormField
                name="ipControl"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border border-gray-700 p-4 bg-esports-darker">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Enable IP Restrictions</FormLabel>
                      <FormDescription>
                        Only allow admin access from approved IP addresses
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={false} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                name="allowedIPs"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Allowed IP Addresses</FormLabel>
                    <FormDescription>
                      Enter IP addresses that are allowed to access the admin panel (one per line)
                    </FormDescription>
                    <FormControl>
                      <Textarea 
                        placeholder="e.g., 103.25.128.45"
                        className="min-h-[100px] bg-esports-darker border-gray-700 font-mono"
                        disabled
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <Button disabled className="w-full md:w-auto">
                Save IP Settings
              </Button>
            </div>
          </Form>
        </CardContent>
      </Card>

      {/* Access Logs */}
      <Card className="bg-esports-card border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-esports-blue" />
            Access Logs
          </CardTitle>
          <CardDescription>
            Recent admin activity and access attempts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-gray-800 overflow-hidden">
            <Table>
              <TableHeader className="bg-esports-darker">
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {accessLogs.map((log) => (
                  <TableRow key={log.id} className="border-gray-800">
                    <TableCell className="font-medium">{log.user}</TableCell>
                    <TableCell>{log.action}</TableCell>
                    <TableCell>{log.ip}</TableCell>
                    <TableCell>{new Date(log.date).toLocaleString()}</TableCell>
                    <TableCell>
                      <span className={getActionStatusColor(log.status)}>
                        {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="mt-4 flex justify-between">
            <p className="text-sm text-muted-foreground">Showing last 5 entries</p>
            <Button variant="outline" className="bg-esports-darker border-gray-700">
              View All Logs
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 2FA Setup Dialog */}
      <Dialog open={setup2FAOpen} onOpenChange={setSetup2FAOpen}>
        <DialogContent className="sm:max-w-[500px] bg-esports-card border-gray-800">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Smartphone className="h-5 w-5 text-esports-purple" />
              Setup Two-Factor Authentication
            </DialogTitle>
            <DialogDescription>
              Scan the QR code with your authenticator app to set up 2FA.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col items-center space-y-6 py-4">
            <div className="bg-white p-4 rounded">
              {/* This would be a real QR code in a production app */}
              <div className="h-48 w-48 bg-gray-200 flex items-center justify-center">
                <span className="text-black">QR Code Placeholder</span>
              </div>
            </div>
            
            <div className="w-full">
              <FormLabel>Verification Code</FormLabel>
              <Input 
                className="mt-2 bg-esports-darker border-gray-700 font-mono text-center text-lg tracking-widest"
                placeholder="000000"
                maxLength={6}
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-2">
                Enter the 6-digit code from your authenticator app to verify setup
              </p>
            </div>
          </div>
          
          <DialogFooter className="gap-2 mt-4">
            <Button 
              variant="outline" 
              onClick={() => setSetup2FAOpen(false)}
              className="bg-esports-darker border-gray-700"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSetup2FA}
              disabled={verificationCode.length !== 6}
            >
              Verify and Enable
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminSecurity;
