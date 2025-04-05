
import { supabase } from '@/integrations/supabase/client';

export interface TournamentRegistration {
  id: string;
  tournament_id: string;
  user_id: string;
  game_username: string;
  registration_date: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export const tournamentService = {
  // Check if a user is registered for a tournament
  async checkRegistration(tournamentId: string, userId: string): Promise<boolean> {
    if (!userId) return false;
    
    const { data, error } = await supabase
      .from('bgmi_tournament_registrations')
      .select('id')
      .eq('tournament_id', tournamentId)
      .eq('user_id', userId)
      .single();
    
    if (error && error.code !== 'PGRST116') { // PGRST116 means no rows returned
      console.error('Error checking registration:', error);
      throw error;
    }
    
    return !!data;
  },
  
  // Register a user for a tournament
  async registerForTournament(
    tournamentId: string, 
    userId: string, 
    gameUsername: string
  ): Promise<TournamentRegistration> {
    // Check if already registered
    const isRegistered = await this.checkRegistration(tournamentId, userId);
    if (isRegistered) {
      throw new Error('You are already registered for this tournament');
    }
    
    const registration = {
      tournament_id: tournamentId,
      user_id: userId,
      game_username: gameUsername,
      status: 'confirmed'
    };
    
    const { data, error } = await supabase
      .from('bgmi_tournament_registrations')
      .insert(registration)
      .select()
      .single();
    
    if (error) {
      console.error('Error registering for tournament:', error);
      throw error;
    }
    
    return data as TournamentRegistration;
  },
  
  // Get all registered users for a tournament
  async getRegistrations(tournamentId: string): Promise<TournamentRegistration[]> {
    const { data, error } = await supabase
      .from('bgmi_tournament_registrations')
      .select(`
        *,
        profiles:user_id (
          username,
          avatar_url
        )
      `)
      .eq('tournament_id', tournamentId)
      .order('registration_date', { ascending: false });
    
    if (error) {
      console.error('Error fetching tournament registrations:', error);
      throw error;
    }
    
    return data as unknown as TournamentRegistration[] || [];
  },
  
  // Get a user's registrations
  async getUserRegistrations(userId: string): Promise<TournamentRegistration[]> {
    if (!userId) return [];
    
    const { data, error } = await supabase
      .from('bgmi_tournament_registrations')
      .select('*')
      .eq('user_id', userId)
      .order('registration_date', { ascending: false });
    
    if (error) {
      console.error('Error fetching user registrations:', error);
      throw error;
    }
    
    return data as TournamentRegistration[] || [];
  }
};
