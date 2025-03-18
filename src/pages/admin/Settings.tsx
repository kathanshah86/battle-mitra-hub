
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { Save, Globe, Mail, Bell, FileText } from "lucide-react";

const AdminSettings = () => {
  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your changes have been successfully saved.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Website Settings</h2>
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 bg-esports-card">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4">
          <Card className="bg-esports-card border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-esports-blue" />
                General Information
              </CardTitle>
              <CardDescription>
                Basic settings for your Battle Mitra website
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    name="siteName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Site Name</FormLabel>
                        <FormControl>
                          <Input 
                            defaultValue="Battle Mitra"
                            className="bg-esports-darker border-gray-700"
                          />
                        </FormControl>
                        <FormDescription>
                          The name of your tournament platform
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    name="adminEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Admin Email</FormLabel>
                        <FormControl>
                          <Input 
                            defaultValue="admin@battlemitra.com"
                            className="bg-esports-darker border-gray-700"
                          />
                        </FormControl>
                        <FormDescription>
                          Email for admin notifications and alerts
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    name="timezone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Default Timezone</FormLabel>
                        <FormControl>
                          <Input 
                            defaultValue="Asia/Kolkata"
                            className="bg-esports-darker border-gray-700"
                          />
                        </FormControl>
                        <FormDescription>
                          Timezone for displaying tournament dates and times
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    name="currency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Default Currency</FormLabel>
                        <FormControl>
                          <Input 
                            defaultValue="INR (₹)"
                            className="bg-esports-darker border-gray-700"
                          />
                        </FormControl>
                        <FormDescription>
                          Currency for tournament fees and prize pools
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    name="maintenanceMode"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border border-gray-700 p-4 bg-esports-darker">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Maintenance Mode</FormLabel>
                          <FormDescription>
                            Temporarily disable the website for maintenance
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={false} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    name="userRegistration"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border border-gray-700 p-4 bg-esports-darker">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">User Registration</FormLabel>
                          <FormDescription>
                            Allow new users to register for the platform
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={true} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance" className="space-y-4">
          <Card className="bg-esports-card border-gray-800">
            <CardHeader>
              <CardTitle>Theme & Appearance</CardTitle>
              <CardDescription>
                Customize how your platform looks to users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-esports-darker p-6 rounded-lg border border-gray-700">
                  <h3 className="font-medium mb-4">Color Theme</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg p-4 bg-esports-darker border border-gray-700 flex items-center justify-center cursor-pointer hover:border-esports-purple transition-colors">
                      Dark Mode
                    </div>
                    <div className="rounded-lg p-4 bg-white text-black border border-gray-300 flex items-center justify-center cursor-pointer">
                      Light Mode
                    </div>
                  </div>
                </div>
                
                <div className="bg-esports-darker p-6 rounded-lg border border-gray-700">
                  <h3 className="font-medium mb-4">Site Logo</h3>
                  <div className="flex items-center space-x-4">
                    <img 
                      src="/lovable-uploads/b336d175-874a-4fce-a78d-6cb2d1f49ecc.png" 
                      alt="Battle Mitra Logo" 
                      className="h-12 w-auto" 
                    />
                    <Button variant="outline" className="border-gray-700">
                      Change Logo
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4">
          <Card className="bg-esports-card border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-esports-purple" />
                Notification Settings
              </CardTitle>
              <CardDescription>
                Configure email and in-app notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form>
                <div className="space-y-4">
                  <h3 className="font-medium text-lg">Email Notifications</h3>
                  
                  <FormField
                    name="emailFromName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>From Name</FormLabel>
                        <FormControl>
                          <Input 
                            defaultValue="Battle Mitra"
                            className="bg-esports-darker border-gray-700"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    name="emailFromAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>From Email Address</FormLabel>
                        <FormControl>
                          <Input 
                            defaultValue="notifications@battlemitra.com"
                            className="bg-esports-darker border-gray-700"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <FormField
                      name="notifyNewUser"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border border-gray-700 p-4 bg-esports-darker">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">New User Registration</FormLabel>
                            <FormDescription>
                              Send email when a new user registers
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={true} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      name="notifyNewTournament"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border border-gray-700 p-4 bg-esports-darker">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">New Tournament Created</FormLabel>
                            <FormDescription>
                              Send email when a new tournament is created
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={true} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      name="notifyPayment"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border border-gray-700 p-4 bg-esports-darker">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Payment Notifications</FormLabel>
                            <FormDescription>
                              Send email for payment events
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={true} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      name="notifyResults"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border border-gray-700 p-4 bg-esports-darker">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Tournament Results</FormLabel>
                            <FormDescription>
                              Send email when tournament results are posted
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={true} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="content" className="space-y-4">
          <Card className="bg-esports-card border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-esports-green" />
                Content Management
              </CardTitle>
              <CardDescription>
                Manage home page content and announcements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form>
                <div className="space-y-6">
                  <FormField
                    name="homeHeroTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Home Page Hero Title</FormLabel>
                        <FormControl>
                          <Input 
                            defaultValue="Battle Mitra - India's Premier Esports Tournament Platform"
                            className="bg-esports-darker border-gray-700"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    name="homeHeroDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Home Page Hero Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            defaultValue="Join thousands of players competing in tournaments across various games. Win prizes and build your esports career with Battle Mitra."
                            className="min-h-[100px] bg-esports-darker border-gray-700"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    name="announcement"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Global Announcement (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Enter an announcement to display on all pages..."
                            className="min-h-[100px] bg-esports-darker border-gray-700"
                          />
                        </FormControl>
                        <FormDescription>
                          Leave empty to hide the announcement banner
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    name="showAnnouncement"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border border-gray-700 p-4 bg-esports-darker">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Display Announcement</FormLabel>
                          <FormDescription>
                            Show the announcement banner on the website
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={false} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
