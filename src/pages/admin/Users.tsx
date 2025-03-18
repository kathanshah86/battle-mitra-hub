
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormDescription } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { 
  Search, 
  User, 
  UserCheck, 
  UserX, 
  Shield, 
  Ban, 
  CheckCircle, 
  AlertCircle,
  Eye
} from "lucide-react";

const AdminUsers = () => {
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [userDetailsOpen, setUserDetailsOpen] = useState(false);
  const [banDialogOpen, setBanDialogOpen] = useState(false);
  const [verifyDialogOpen, setVerifyDialogOpen] = useState(false);
  const banUserForm = useForm();
  
  // Mock data - in a real app, this would come from your backend
  const users = [
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul.sharma@example.com",
      joinDate: "2023-05-12",
      tournamentCount: 8,
      verified: true,
      status: "active"
    },
    {
      id: 2,
      name: "Priya Patel",
      email: "priya.patel@example.com",
      joinDate: "2023-06-03",
      tournamentCount: 5,
      verified: true,
      status: "active"
    },
    {
      id: 3,
      name: "Amit Kumar",
      email: "amit.kumar@example.com",
      joinDate: "2023-06-18",
      tournamentCount: 3,
      verified: false,
      status: "pending"
    },
    {
      id: 4,
      name: "Deepak Singh",
      email: "deepak@example.com",
      joinDate: "2023-07-22",
      tournamentCount: 0,
      verified: false,
      status: "banned"
    },
    {
      id: 5,
      name: "Sneha Gupta",
      email: "sneha.g@example.com",
      joinDate: "2023-08-05",
      tournamentCount: 2,
      verified: true,
      status: "active"
    }
  ];
  
  const openUserDetails = (user: any) => {
    setSelectedUser(user);
    setUserDetailsOpen(true);
  };
  
  const openBanDialog = (user: any) => {
    setSelectedUser(user);
    setBanDialogOpen(true);
  };
  
  const openVerifyDialog = (user: any) => {
    setSelectedUser(user);
    setVerifyDialogOpen(true);
  };
  
  const handleBanUser = () => {
    toast({
      title: "User Banned",
      description: `${selectedUser?.name} has been banned from the platform.`,
    });
    setBanDialogOpen(false);
  };
  
  const handleVerifyUser = () => {
    toast({
      title: "User Verified",
      description: `${selectedUser?.name} has been successfully verified.`,
    });
    setVerifyDialogOpen(false);
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-esports-green text-white">
          <CheckCircle className="mr-1 h-3 w-3" />
          Active
        </span>;
      case "pending":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-esports-yellow text-black">
          <AlertCircle className="mr-1 h-3 w-3" />
          Pending
        </span>;
      case "banned":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-esports-red text-white">
          <Ban className="mr-1 h-3 w-3" />
          Banned
        </span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-400 text-white">
          Unknown
        </span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
      </div>

      {/* User Stats Cards */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <Card className="bg-esports-card border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <User className="h-4 w-4 text-esports-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,250</div>
            <p className="text-xs text-muted-foreground">
              +15 new users this week
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-esports-card border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verified Users</CardTitle>
            <UserCheck className="h-4 w-4 text-esports-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,143</div>
            <p className="text-xs text-muted-foreground">
              91.4% of total users
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-esports-card border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Banned Users</CardTitle>
            <UserX className="h-4 w-4 text-esports-red" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">
              1.8% of total users
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search users..." 
            className="pl-10 bg-esports-card border-gray-800"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="bg-esports-card border-gray-800">
            All Users
          </Button>
          <Button variant="outline" className="bg-esports-card border-gray-800">
            Verified
          </Button>
          <Button variant="outline" className="bg-esports-card border-gray-800">
            Pending
          </Button>
          <Button variant="outline" className="bg-esports-card border-gray-800">
            Banned
          </Button>
        </div>
      </div>

      {/* Users Table */}
      <div className="rounded-md border border-gray-800 overflow-hidden">
        <Table>
          <TableHeader className="bg-esports-card">
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Tournaments</TableHead>
              <TableHead>Verified</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} className="bg-esports-card border-gray-800">
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <div className="bg-esports-purple h-10 w-10 rounded-full flex items-center justify-center text-white">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-xs text-muted-foreground">{user.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{new Date(user.joinDate).toLocaleDateString()}</TableCell>
                <TableCell>{user.tournamentCount}</TableCell>
                <TableCell>
                  {user.verified ? (
                    <span className="inline-flex items-center text-esports-green">
                      <CheckCircle className="mr-1 h-4 w-4" />
                      Verified
                    </span>
                  ) : (
                    <span className="inline-flex items-center text-esports-yellow">
                      <AlertCircle className="mr-1 h-4 w-4" />
                      Not Verified
                    </span>
                  )}
                </TableCell>
                <TableCell>{getStatusBadge(user.status)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => openUserDetails(user)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    
                    {user.status !== "banned" ? (
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => openBanDialog(user)}
                      >
                        <Ban className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button 
                        variant="ghost" 
                        size="icon"
                      >
                        <UserCheck className="h-4 w-4" />
                      </Button>
                    )}
                    
                    {!user.verified && (
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => openVerifyDialog(user)}
                      >
                        <Shield className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* User Details Dialog */}
      <Dialog open={userDetailsOpen} onOpenChange={setUserDetailsOpen}>
        <DialogContent className="sm:max-w-[600px] bg-esports-card border-gray-800">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
          </DialogHeader>
          
          {selectedUser && (
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center justify-center">
                  <div className="bg-esports-purple h-24 w-24 rounded-full flex items-center justify-center text-white text-2xl">
                    {selectedUser.name.split(' ').map((n: string) => n[0]).join('')}
                  </div>
                  <p className="mt-2 font-medium">{selectedUser.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                </div>
                
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Join Date</p>
                      <p className="font-medium">{new Date(selectedUser.joinDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <p className="font-medium">{getStatusBadge(selectedUser.status)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Tournaments Entered</p>
                      <p className="font-medium">{selectedUser.tournamentCount}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Identity Verified</p>
                      <p className="font-medium">{selectedUser.verified ? "Yes" : "No"}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Account Controls</p>
                    <div className="mt-2 flex items-center justify-between bg-esports-darker rounded-md p-3">
                      <div className="flex items-center">
                        <Ban className="h-5 w-5 mr-2 text-esports-red" />
                        <div>
                          <p className="font-medium">Ban User</p>
                          <p className="text-xs text-muted-foreground">Prevent this user from accessing the platform</p>
                        </div>
                      </div>
                      <Switch checked={selectedUser.status === "banned"} />
                    </div>
                    
                    <div className="mt-2 flex items-center justify-between bg-esports-darker rounded-md p-3">
                      <div className="flex items-center">
                        <Shield className="h-5 w-5 mr-2 text-esports-green" />
                        <div>
                          <p className="font-medium">Identity Verification</p>
                          <p className="text-xs text-muted-foreground">Mark user as identity verified</p>
                        </div>
                      </div>
                      <Switch checked={selectedUser.verified} />
                    </div>
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setUserDetailsOpen(false)}>
                  Close
                </Button>
                <Button>Save Changes</Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Ban User Dialog */}
      <Dialog open={banDialogOpen} onOpenChange={setBanDialogOpen}>
        <DialogContent className="sm:max-w-[500px] bg-esports-card border-gray-800">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-esports-red">
              <Ban className="h-5 w-5" />
              Ban User
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to ban this user? They will be unable to participate in tournaments or access most platform features.
            </DialogDescription>
          </DialogHeader>
          
          {selectedUser && (
            <>
              <div className="flex items-center space-x-4 py-4">
                <div className="bg-esports-purple h-12 w-12 rounded-full flex items-center justify-center text-white">
                  {selectedUser.name.split(' ').map((n: string) => n[0]).join('')}
                </div>
                <div>
                  <p className="font-medium">{selectedUser.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                </div>
              </div>
              
              <Form {...banUserForm}>
                <FormField
                  control={banUserForm.control}
                  name="banReason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reason for ban</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g., Violating platform rules, cheating, etc."
                          className="bg-esports-darker border-gray-700"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </Form>
              
              <DialogFooter className="gap-2 mt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setBanDialogOpen(false)}
                  className="bg-esports-darker border-gray-700"
                >
                  Cancel
                </Button>
                <Button 
                  variant="destructive"
                  onClick={handleBanUser}
                >
                  Ban User
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Verify User Dialog */}
      <Dialog open={verifyDialogOpen} onOpenChange={setVerifyDialogOpen}>
        <DialogContent className="sm:max-w-[500px] bg-esports-card border-gray-800">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-esports-green">
              <Shield className="h-5 w-5" />
              Verify User Identity
            </DialogTitle>
            <DialogDescription>
              Confirm that this user's identity has been verified according to platform requirements.
            </DialogDescription>
          </DialogHeader>
          
          {selectedUser && (
            <>
              <div className="flex items-center space-x-4 py-4">
                <div className="bg-esports-purple h-12 w-12 rounded-full flex items-center justify-center text-white">
                  {selectedUser.name.split(' ').map((n: string) => n[0]).join('')}
                </div>
                <div>
                  <p className="font-medium">{selectedUser.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                </div>
              </div>
              
              <div className="bg-esports-darker p-4 rounded-md">
                <p className="text-sm text-muted-foreground mb-2">Verification Checklist:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-esports-green" />
                    Identity document verified
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-esports-green" />
                    Address proof checked
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-esports-green" />
                    Age verification complete
                  </li>
                </ul>
              </div>
              
              <DialogFooter className="gap-2 mt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setVerifyDialogOpen(false)}
                  className="bg-esports-darker border-gray-700"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleVerifyUser}
                >
                  Confirm Verification
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminUsers;
