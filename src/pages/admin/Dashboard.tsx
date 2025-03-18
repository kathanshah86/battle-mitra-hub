
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  Users, 
  Trophy, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle,
  BarChart3,
  LineChart,
  Activity
} from "lucide-react";

const AdminDashboard = () => {
  // In a real app, this data would come from your backend
  const stats = {
    totalTournaments: 24,
    activeTournaments: 5,
    totalUsers: 1250,
    revenue: 12500,
    alerts: 3
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <span className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleString()}</span>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-esports-card border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tournaments</CardTitle>
            <Trophy className="h-4 w-4 text-esports-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTournaments}</div>
            <p className="text-xs text-muted-foreground">
              +2 from last month
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-esports-card border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Tournaments</CardTitle>
            <Clock className="h-4 w-4 text-esports-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeTournaments}</div>
            <p className="text-xs text-muted-foreground">
              2 starting today
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-esports-card border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-esports-purple" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              +18% increase this month
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-esports-card border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-esports-yellow" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{stats.revenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* System Alerts */}
      <Card className="bg-esports-card border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-esports-orange" />
            System Alerts ({stats.alerts})
          </CardTitle>
          <CardDescription>Recent issues requiring your attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="bg-gray-800/50 p-3 rounded-md border-l-4 border-esports-red">
              <div className="flex items-center justify-between">
                <div className="font-medium">Payment Gateway Error</div>
                <div className="text-xs text-muted-foreground">2 hours ago</div>
              </div>
              <p className="text-sm mt-1">Stripe webhook failed to process for tournament #124. 3 payments affected.</p>
            </div>
            
            <div className="bg-gray-800/50 p-3 rounded-md border-l-4 border-esports-yellow">
              <div className="flex items-center justify-between">
                <div className="font-medium">User Verification Pending</div>
                <div className="text-xs text-muted-foreground">5 hours ago</div>
              </div>
              <p className="text-sm mt-1">12 new users waiting for identity verification approval.</p>
            </div>
            
            <div className="bg-gray-800/50 p-3 rounded-md border-l-4 border-esports-purple">
              <div className="flex items-center justify-between">
                <div className="font-medium">Tournament Clash</div>
                <div className="text-xs text-muted-foreground">Yesterday</div>
              </div>
              <p className="text-sm mt-1">Two tournaments scheduled at the same time for 5 players.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analytics Tabs */}
      <Tabs defaultValue="revenue" className="space-y-4">
        <TabsList className="grid grid-cols-3 bg-esports-card">
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="users">User Growth</TabsTrigger>
          <TabsTrigger value="tournaments">Tournament Activity</TabsTrigger>
        </TabsList>
        
        <TabsContent value="revenue" className="space-y-4">
          <Card className="bg-esports-card border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-esports-green" />
                Revenue Analytics
              </CardTitle>
              <CardDescription>Monthly revenue breakdown</CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <LineChart className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>Revenue chart visualization would appear here.</p>
                <p className="text-sm mt-2">Connects to your analytics data source</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users" className="space-y-4">
          <Card className="bg-esports-card border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-esports-purple" />
                User Growth
              </CardTitle>
              <CardDescription>New user registrations over time</CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <Activity className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>User growth chart visualization would appear here.</p>
                <p className="text-sm mt-2">Connect to your analytics system</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tournaments" className="space-y-4">
          <Card className="bg-esports-card border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-esports-yellow" />
                Tournament Activity
              </CardTitle>
              <CardDescription>Total tournaments and participation stats</CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <TrendingUp className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>Tournament activity visualization would appear here.</p>
                <p className="text-sm mt-2">Connect to tournament data source</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
