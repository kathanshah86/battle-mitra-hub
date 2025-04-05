
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
    
    // First check the BGMI tournament registrations table
    const { data: bgmiData, error: bgmiError } = await supabase
      .from('bgmi_tournament_registrations')
      .select('id')
      .eq('tournament_id', tournamentId)
      .eq('user_id', userId)
      .maybeSingle();
    
    if (bgmiError && bgmiError.code !== 'PGRST116') { // PGRST116 means no rows returned
      console.error('Error checking BGMI registration:', bgmiError);
    }
    
    if (bgmiData) {
      return true;
    }
    
    // Then check the general tournament registrations table
    const { data: generalData, error: generalError } = await supabase
      .from('tournament_registrations')
      .select('id')
      .eq('tournament_id', tournamentId)
      .eq('user_id', userId)
      .maybeSingle();
    
    if (generalError && generalError.code !== 'PGRST116') {
      console.error('Error checking general registration:', generalError);
    }
    
    return !!generalData;
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
    
    // For BGMI tournaments (ID 7), use the bgmi_tournament_registrations table
    if (tournamentId === '7') {
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
        console.error('Error registering for BGMI tournament:', error);
        throw error;
      }
      
      return data as TournamentRegistration;
    } 
    
    // For all other tournaments, use the tournament_registrations table
    const registration = {
      tournament_id: tournamentId,
      user_id: userId,
      game_username: gameUsername,
      payment_status: 'completed'
    };
    
    const { data, error } = await supabase
      .from('tournament_registrations')
      .insert(registration)
      .select()
      .single();
    
    if (error) {
      console.error('Error registering for tournament:', error);
      throw error;
    }
    
    // Transform the data to match the TournamentRegistration interface
    // Map payment_status to status for general tournament registrations
    const transformedData: TournamentRegistration = {
      id: data.id,
      tournament_id: data.tournament_id,
      user_id: data.user_id,
      game_username: data.game_username,
      registration_date: data.registration_date,
      status: data.payment_status, // Map payment_status to status
      created_at: data.created_at,
      updated_at: data.updated_at
    };
    
    return transformedData;
  },
  
  // Get all registered users for a tournament
  async getRegistrations(tournamentId: string): Promise<TournamentRegistration[]> {
    // For BGMI tournaments
    if (tournamentId === '7') {
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
        console.error('Error fetching BGMI tournament registrations:', error);
        throw error;
      }
      
      return data as unknown as TournamentRegistration[] || [];
    }
    
    // For all other tournaments
    const { data, error } = await supabase
      .from('tournament_registrations')
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
    
    // Transform the data to match the TournamentRegistration interface
    const transformedData = data.map(item => ({
      id: item.id,
      tournament_id: item.tournament_id,
      user_id: item.user_id,
      game_username: item.game_username,
      registration_date: item.registration_date,
      status: item.payment_status, // Map payment_status to status
      created_at: item.created_at,
      updated_at: item.updated_at,
      profiles: item.profiles // Keep the joined profiles data
    }));
    
    return transformedData as unknown as TournamentRegistration[];
  },
  
  // Get a user's registrations
  async getUserRegistrations(userId: string): Promise<TournamentRegistration[]> {
    if (!userId) return [];
    
    // First get BGMI registrations
    const { data: bgmiData, error: bgmiError } = await supabase
      .from('bgmi_tournament_registrations')
      .select('*')
      .eq('user_id', userId)
      .order('registration_date', { ascending: false });
    
    if (bgmiError) {
      console.error('Error fetching user BGMI registrations:', bgmiError);
    }
    
    // Then get general tournament registrations
    const { data: generalData, error: generalError } = await supabase
      .from('tournament_registrations')
      .select('*')
      .eq('user_id', userId)
      .order('registration_date', { ascending: false });
    
    if (generalError) {
      console.error('Error fetching user general registrations:', generalError);
    }
    
    // Transform general registrations to match TournamentRegistration interface
    const transformedGeneralData = (generalData || []).map(item => ({
      id: item.id,
      tournament_id: item.tournament_id,
      user_id: item.user_id,
      game_username: item.game_username,
      registration_date: item.registration_date,
      status: item.payment_status, // Map payment_status to status
      created_at: item.created_at,
      updated_at: item.updated_at
    }));
    
    // Combine the results
    const combinedData = [
      ...(bgmiData || []),
      ...transformedGeneralData
    ];
    
    return combinedData as TournamentRegistration[];
  }
};
