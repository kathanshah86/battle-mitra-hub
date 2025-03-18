
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Plus, Edit, Trash, Eye, Award, Calendar } from "lucide-react";

// Tournament form schema
const tournamentSchema = z.object({
  name: z.string().min(3, "Tournament name must be at least 3 characters"),
  game: z.string().min(1, "Game name is required"),
  entryFee: z.string().min(1, "Entry fee is required"),
  prizePool: z.string().min(1, "Prize pool is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  maxParticipants: z.string().min(1, "Maximum participants is required"),
  rules: z.string().min(10, "Rules must be at least 10 characters")
});

const AdminTournaments = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTournament, setEditingTournament] = useState<any>(null);
  
  // Mock data - in a real app, this would come from your backend
  const tournaments = [
    {
      id: 1,
      name: "Battle Royale Championship",
      game: "PUBG Mobile",
      entryFee: "₹500",
      prizePool: "₹50,000",
      startDate: "2023-10-15",
      endDate: "2023-10-18",
      status: "active",
      participants: 64,
      maxParticipants: 64
    },
    {
      id: 2,
      name: "League Masters Cup",
      game: "League of Legends",
      entryFee: "₹300",
      prizePool: "₹25,000",
      startDate: "2023-11-01",
      endDate: "2023-11-05",
      status: "upcoming",
      participants: 12,
      maxParticipants: 16
    },
    {
      id: 3,
      name: "CS:GO Pro Series",
      game: "Counter-Strike: Global Offensive",
      entryFee: "₹400",
      prizePool: "₹30,000",
      startDate: "2023-09-10",
      endDate: "2023-09-15",
      status: "completed",
      participants: 32,
      maxParticipants: 32
    }
  ];
  
  const form = useForm<z.infer<typeof tournamentSchema>>({
    resolver: zodResolver(tournamentSchema),
    defaultValues: {
      name: "",
      game: "",
      entryFee: "",
      prizePool: "",
      startDate: "",
      endDate: "",
      maxParticipants: "",
      rules: ""
    }
  });
  
  const openNewTournamentDialog = () => {
    form.reset();
    setEditingTournament(null);
    setIsDialogOpen(true);
  };
  
  const openEditTournamentDialog = (tournament: any) => {
    setEditingTournament(tournament);
    form.reset({
      name: tournament.name,
      game: tournament.game,
      entryFee: tournament.entryFee.replace("₹", ""),
      prizePool: tournament.prizePool.replace("₹", ""),
      startDate: tournament.startDate,
      endDate: tournament.endDate,
      maxParticipants: tournament.maxParticipants.toString(),
      rules: "Tournament rules and regulations..."  // In a real app, fetch this from the backend
    });
    setIsDialogOpen(true);
  };
  
  const onSubmit = (values: z.infer<typeof tournamentSchema>) => {
    console.log("Tournament form submitted:", values);
    // In a real app, you would send this data to your backend
    setIsDialogOpen(false);
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-esports-green text-white";
      case "upcoming":
        return "bg-esports-blue text-white";
      case "completed":
        return "bg-gray-500 text-white";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Tournament Management</h2>
        <Button onClick={openNewTournamentDialog}>
          <Plus className="mr-2 h-4 w-4" />
          Add Tournament
        </Button>
      </div>

      {/* Search and filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Input 
            placeholder="Search tournaments..." 
            className="bg-esports-card border-gray-800"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="bg-esports-card border-gray-800">
            All
          </Button>
          <Button variant="outline" className="bg-esports-card border-gray-800">
            Active
          </Button>
          <Button variant="outline" className="bg-esports-card border-gray-800">
            Upcoming
          </Button>
          <Button variant="outline" className="bg-esports-card border-gray-800">
            Completed
          </Button>
        </div>
      </div>

      {/* Tournaments Table */}
      <div className="rounded-md border border-gray-800 overflow-hidden">
        <Table>
          <TableHeader className="bg-esports-card">
            <TableRow>
              <TableHead>Tournament</TableHead>
              <TableHead>Game</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Entry Fee</TableHead>
              <TableHead>Prize Pool</TableHead>
              <TableHead>Participants</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tournaments.map((tournament) => (
              <TableRow key={tournament.id} className="bg-esports-card border-gray-800">
                <TableCell className="font-medium">{tournament.name}</TableCell>
                <TableCell>{tournament.game}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    {new Date(tournament.startDate).toLocaleDateString()}
                  </div>
                </TableCell>
                <TableCell>{tournament.entryFee}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Award className="mr-2 h-4 w-4 text-esports-yellow" />
                    {tournament.prizePool}
                  </div>
                </TableCell>
                <TableCell>{`${tournament.participants}/${tournament.maxParticipants}`}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(tournament.status)}`}>
                    {tournament.status.charAt(0).toUpperCase() + tournament.status.slice(1)}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => openEditTournamentDialog(tournament)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Tournament Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px] bg-esports-card border-gray-800">
          <DialogHeader>
            <DialogTitle>
              {editingTournament ? "Edit Tournament" : "Create New Tournament"}
            </DialogTitle>
            <DialogDescription>
              Fill out the details below to {editingTournament ? "update the" : "create a new"} tournament.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tournament Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Battle Royale Championship"
                          {...field}
                          className="bg-esports-darker border-gray-700"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="game"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Game</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="PUBG Mobile"
                          {...field}
                          className="bg-esports-darker border-gray-700"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="entryFee"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Entry Fee (₹)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="500"
                          {...field}
                          className="bg-esports-darker border-gray-700"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="prizePool"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prize Pool (₹)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="50000"
                          {...field}
                          className="bg-esports-darker border-gray-700"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          className="bg-esports-darker border-gray-700"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Date</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          className="bg-esports-darker border-gray-700"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="maxParticipants"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Max Participants</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="64"
                          {...field}
                          className="bg-esports-darker border-gray-700"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="rules"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tournament Rules</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter detailed rules and regulations for this tournament..."
                        className="min-h-[120px] bg-esports-darker border-gray-700"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                  className="bg-esports-darker border-gray-700"
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editingTournament ? "Update Tournament" : "Create Tournament"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminTournaments;
