import { supabase } from '@/integrations/supabase/client';
import { ChatRoom } from './types';

// Pre-defined fallback rooms in case of API failure
const fallbackRooms: ChatRoom[] = [
  {
    id: '1',
    name: 'General Chat',
    type: 'general',
    description: 'Main discussion area',
  },
  {
    id: '2',
    name: 'Battle Mitra',
    type: 'game',
    description: 'Discussion for Battle Mitra game and strategies',
  }
];

export const roomsService = {
  // Get all chat rooms with improved performance and error handling
  async getChatRooms(): Promise<ChatRoom[]> {
    // Use locally stored cache with very short TTL for snappy experience
    const cacheKey = 'chatRooms_cache';
    const cachedRooms = localStorage.getItem(cacheKey);
    
    // Use cached data if available and not older than 30 seconds
    if (cachedRooms) {
      const { data, timestamp } = JSON.parse(cachedRooms);
      const isCacheValid = Date.now() - timestamp < 30 * 1000; // 30 seconds
      
      if (isCacheValid) {
        console.log('Using cached chat rooms');
        return data;
      }
    }
    
    // Add a shorter timeout to fail fast
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('Room query timed out')), 3000); // 3 second timeout
    });
    
    // Try to get rooms from local storage even if expired as a fallback
    let staleRooms: ChatRoom[] = [];
    if (cachedRooms) {
      staleRooms = JSON.parse(cachedRooms).data;
    }
    
    const queryPromise = supabase
      .from('chat_rooms')
      .select('*')
      .order('name')
      .limit(10)
      .abortSignal(AbortSignal.timeout(2500)); // 2.5 second abort signal
    
    try {
      // Race between the query and the timeout
      const { data, error } = await Promise.race([
        queryPromise,
        timeoutPromise.then(() => { throw new Error('Room query timed out'); })
      ]);
      
      if (error) {
        console.error('Error fetching chat rooms:', error);
        
        // If we have stale cache, better use it than fallback
        if (staleRooms.length > 0) {
          console.log('Using stale cached rooms due to error');
          return staleRooms;
        }
        
        // Otherwise use fallback that includes Battle Mitra
        console.log('Using fallback rooms including Battle Mitra');
        return fallbackRooms;
      }
      
      // Check if Battle Mitra exists in the data
      const battleMitraExists = data?.some(room => room.name === 'Battle Mitra');
      
      // If Battle Mitra doesn't exist, add it to the rooms data
      let rooms = data?.map(room => ({
        id: room.id,
        name: room.name,
        type: (room.type as 'general' | 'game' | 'team'),
        description: room.description,
        image_url: room.image_url,
      })) || [];
      
      // Add Battle Mitra if it doesn't exist in the database results
      if (!battleMitraExists && rooms.length > 0) {
        try {
          // Try to create the Battle Mitra room in the database
          const { data: newRoom, error: createError } = await supabase
            .from('chat_rooms')
            .insert({
              name: 'Battle Mitra',
              type: 'game',
              description: 'Discussion for Battle Mitra game and strategies'
            })
            .select('*')
            .single();
          
          if (!createError && newRoom) {
            console.log('Created new Battle Mitra room:', newRoom);
            rooms.push({
              id: newRoom.id,
              name: newRoom.name,
              type: (newRoom.type as 'general' | 'game' | 'team'),
              description: newRoom.description,
              image_url: newRoom.image_url,
            });
          } else {
            console.error('Error creating Battle Mitra room:', createError);
            
            // Add a client-side fallback if create failed
            rooms.push({
              id: '2',
              name: 'Battle Mitra',
              type: 'game',
              description: 'Discussion for Battle Mitra game and strategies',
            });
          }
        } catch (createErr) {
          console.error('Exception creating Battle Mitra room:', createErr);
          
          // Add a client-side fallback if create failed
          rooms.push({
            id: '2',
            name: 'Battle Mitra',
            type: 'game',
            description: 'Discussion for Battle Mitra game and strategies',
          });
        }
      }
      
      // Cache the result
      localStorage.setItem(cacheKey, JSON.stringify({
        data: rooms,
        timestamp: Date.now()
      }));
      
      return rooms;
    } catch (error) {
      console.error('Error in getChatRooms:', error);
      
      // If we have stale cache, better use it than fallback
      if (staleRooms.length > 0) {
        console.log('Using stale cached rooms after exception');
        return staleRooms;
      }
      
      console.log('Using fallback rooms after exception');
      return fallbackRooms;
    }
  }
};
