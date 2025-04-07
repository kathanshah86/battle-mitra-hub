
import { supabase } from '@/integrations/supabase/client';
import { ChatRoom } from './types';

export const roomsService = {
  // Get all chat rooms with improved performance and error handling
  async getChatRooms(): Promise<ChatRoom[]> {
    // Use locally stored cache with very short TTL for snappy experience
    const cacheKey = 'chatRooms_cache';
    const cachedRooms = localStorage.getItem(cacheKey);
    
    // Use cached data if available and not older than 60 seconds
    if (cachedRooms) {
      const { data, timestamp } = JSON.parse(cachedRooms);
      const isCacheValid = Date.now() - timestamp < 60 * 1000; // 60 seconds
      
      if (isCacheValid) {
        console.log('Using cached chat rooms');
        return data;
      }
    }
    
    // Add a shorter timeout to fail fast
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('Room query timed out')), 5000); // 5 second timeout
    });
    
    // Prepare fallback rooms in case of complete failure
    const fallbackRooms: ChatRoom[] = [
      {
        id: '1',
        name: 'General Chat',
        type: 'general',
        description: 'Main discussion area',
      }
    ];
    
    // Try to get rooms from local storage even if expired as a fallback
    let staleRooms: ChatRoom[] = [];
    if (cachedRooms) {
      staleRooms = JSON.parse(cachedRooms).data;
    }
    
    const queryPromise = supabase
      .from('chat_rooms')
      .select('*')
      .order('name')
      .limit(8)
      .abortSignal(AbortSignal.timeout(4000)); // 4 second abort signal
    
    try {
      // Race between the query and the timeout
      const { data, error } = await Promise.race([
        queryPromise,
        timeoutPromise.then(() => { throw new Error('Room query timed out'); })
      ]);
      
      if (error) {
        console.error('Error fetching chat rooms:', error);
        // If we have stale cache, better use it than fallback
        return staleRooms.length > 0 ? staleRooms : fallbackRooms;
      }
      
      const rooms = data?.map(room => ({
        id: room.id,
        name: room.name,
        type: (room.type as 'general' | 'game' | 'team'),
        description: room.description,
        image_url: room.image_url,
      })) || [];
      
      // Cache the result
      localStorage.setItem(cacheKey, JSON.stringify({
        data: rooms,
        timestamp: Date.now()
      }));
      
      return rooms;
    } catch (error) {
      console.error('Error in getChatRooms:', error);
      
      // If we have stale cache, better use it than fallback
      return staleRooms.length > 0 ? staleRooms : fallbackRooms;
    }
  }
};
