
import { supabase } from '@/integrations/supabase/client';
import { ChatRoom } from './types';

export const roomsService = {
  // Get all chat rooms with improved performance
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
    
    // Add a timeout to fail fast
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('Room query timed out')), 3000); // 3 second timeout
    });
    
    const queryPromise = supabase
      .from('chat_rooms')
      .select('*')
      .order('name')
      .limit(8); // Further reduced limit
    
    try {
      // Race between the query and the timeout
      const { data, error } = await Promise.race([
        queryPromise,
        timeoutPromise.then(() => { throw new Error('Room query timed out'); })
      ]);
      
      if (error) {
        console.error('Error fetching chat rooms:', error);
        throw error;
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
      
      // If we have stale cache, better use it than nothing
      if (cachedRooms) {
        console.log('Using stale cached chat rooms after error');
        return JSON.parse(cachedRooms).data;
      }
      
      throw error;
    }
  }
};
