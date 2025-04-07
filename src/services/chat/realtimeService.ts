
import { supabase } from '@/integrations/supabase/client';
import { ChatMessage } from './types';
import { RealtimeChannel } from '@supabase/supabase-js';

export const realtimeService = {
  // Subscribe to new messages with improved connection handling
  subscribeToRoom(roomId: string, callback: (message: ChatMessage) => void): RealtimeChannel {
    console.log(`Setting up subscription for room: ${roomId}`);
    
    // Improved channel configuration with auto-reconnect
    return supabase
      .channel(`room:${roomId}`, {
        config: {
          broadcast: { self: true },
          presence: { key: '' }
        }
      })
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'chat_messages',
        filter: `room_id=eq.${roomId}` 
      }, payload => {
        if (payload.new) {
          // Simplified user data handling
          const message = payload.new as ChatMessage;
          console.log(`New message received in room ${roomId}:`, message.id);
          
          // Get user data from profiles with shorter timeout
          supabase
            .from('profiles')
            .select('id, username, avatar_url')
            .eq('id', message.user_id)
            .single()
            .then(({ data: userData, error }) => {
              if (error) {
                console.log('User data fetch error, using placeholder:', error);
                callback({
                  ...message,
                  user: {
                    id: message.user_id,
                    name: 'Unknown User',
                    avatar_url: '',
                  }
                });
                return;
              }

              callback({
                ...message,
                user: {
                  id: userData.id,
                  name: userData.username || 'Unknown User',
                  avatar_url: userData.avatar_url || '',
                }
              });
            })
            .then(undefined, error => {
              console.error('Error in real-time user data fetch:', error);
              callback({
                ...message,
                user: {
                  id: message.user_id,
                  name: 'Unknown User',
                  avatar_url: '',
                }
              });
            });
        }
      })
      .subscribe((status) => {
        console.log(`Realtime connection status: ${status}`);
        if (status === 'SUBSCRIBED') {
          console.log(`Successfully subscribed to room: ${roomId}`);
        }
        if (status === 'CHANNEL_ERROR') {
          console.error(`Error subscribing to room: ${roomId}`);
        }
      });
  }
};
