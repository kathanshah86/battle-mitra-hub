
import { supabase } from '@/integrations/supabase/client';

export interface ChatMessage {
  id: string;
  content: string;
  user_id: string;
  room_id: string;
  created_at: string;
  updated_at: string;
  likes: number;
  reply_to?: string | null;
  user?: {
    id: string;
    email?: string;
    name?: string;
    avatar_url?: string;
  };
}

export interface ChatRoom {
  id: string;
  name: string;
  type: 'general' | 'game' | 'team';
  description?: string;
  image_url?: string;
  unread?: number;
}

const MESSAGES_LIMIT = 30; // Reduce limit for faster initial loading

export const chatService = {
  // Get all chat rooms with improved performance
  async getChatRooms(): Promise<ChatRoom[]> {
    const cacheKey = 'chatRooms_cache';
    const cachedRooms = sessionStorage.getItem(cacheKey);
    
    // Use cached data if available and not older than 2 minutes
    if (cachedRooms) {
      const { data, timestamp } = JSON.parse(cachedRooms);
      const isCacheValid = Date.now() - timestamp < 2 * 60 * 1000; // 2 minutes
      
      if (isCacheValid) {
        console.log('Using cached chat rooms');
        return data;
      }
    }
    
    const { data, error } = await supabase
      .from('chat_rooms')
      .select('*')
      .order('name')
      .limit(10); // Reduced limit for faster loading
    
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
    sessionStorage.setItem(cacheKey, JSON.stringify({
      data: rooms,
      timestamp: Date.now()
    }));
    
    return rooms;
  },
  
  // Get messages for a specific room with optimized query
  async getChatMessages(roomId: string): Promise<ChatMessage[]> {
    // Add a shorter timeout to fail fast
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('Query timed out')), 5000); // 5 second timeout instead of 8
    });
    
    const queryPromise = supabase
      .from('chat_messages')
      .select(`
        id,
        content,
        user_id,
        room_id,
        created_at,
        updated_at,
        likes,
        reply_to,
        profiles:user_id (
          id,
          username,
          avatar_url
        )
      `)
      .eq('room_id', roomId)
      .order('created_at', { ascending: false })
      .limit(MESSAGES_LIMIT)
      .then(async ({ data, error }) => {
        if (error) {
          console.error('Error fetching chat messages:', error);
          throw error;
        }
        
        // Reverse the array to show messages in chronological order
        return (data || []).reverse().map(item => {
          // Safely extract profile data
          let username = 'Unknown User';
          let avatarUrl = '';
          
          if (item.profiles !== null && 
              item.profiles !== undefined && 
              typeof item.profiles === 'object') {
            const profileObj = item.profiles as Record<string, unknown>;
            username = profileObj?.username ? String(profileObj.username) : 'Unknown User';
            avatarUrl = profileObj?.avatar_url ? String(profileObj.avatar_url) : '';
          }
          
          return {
            id: item.id,
            content: item.content,
            user_id: item.user_id,
            room_id: item.room_id,
            created_at: item.created_at,
            updated_at: item.updated_at,
            likes: item.likes,
            reply_to: item.reply_to,
            user: {
              id: item.user_id,
              name: username,
              avatar_url: avatarUrl,
            }
          };
        });
      });
    
    // Race between the query and the timeout
    return Promise.race([queryPromise, timeoutPromise]);
  },
  
  // Send a new message
  async sendMessage(roomId: string, content: string, userId: string, replyTo?: string): Promise<ChatMessage> {
    const message = {
      room_id: roomId,
      content,
      user_id: userId,
      reply_to: replyTo || null,
    };
    
    const { data, error } = await supabase
      .from('chat_messages')
      .insert(message)
      .select(`
        *,
        profiles:user_id (
          id,
          username,
          avatar_url
        )
      `)
      .single();
    
    if (error) {
      console.error('Error sending message:', error);
      throw error;
    }
    
    // Transform the data
    let username = 'Unknown User';
    let avatarUrl = '';
    
    if (data.profiles !== null && 
        data.profiles !== undefined && 
        typeof data.profiles === 'object') {
      const profileObj = data.profiles as Record<string, unknown>;
      username = profileObj?.username ? String(profileObj.username) : 'Unknown User';
      avatarUrl = profileObj?.avatar_url ? String(profileObj.avatar_url) : '';
    }
    
    return {
      ...data,
      user: {
        id: data.user_id,
        name: username,
        avatar_url: avatarUrl,
      }
    };
  },
  
  // Update message (e.g., likes)
  async updateMessage(messageId: string, updates: Partial<ChatMessage>): Promise<void> {
    const { error } = await supabase
      .from('chat_messages')
      .update(updates)
      .eq('id', messageId);
    
    if (error) {
      console.error('Error updating message:', error);
      throw error;
    }
  },
  
  // Subscribe to new messages in a room
  subscribeToRoom(roomId: string, callback: (message: ChatMessage) => void) {
    return supabase
      .channel(`room:${roomId}`)
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'chat_messages',
        filter: `room_id=eq.${roomId}` 
      }, payload => {
        if (payload.new) {
          // Query for the user data to match our expected format
          const fetchUserData = async () => {
            try {
              const { data: userData, error } = await supabase
                .from('profiles')
                .select('id, username, avatar_url')
                .eq('id', (payload.new as ChatMessage).user_id)
                .single();
              
              const message = payload.new as ChatMessage;
              
              if (error) {
                console.error('Error fetching user data for new message:', error);
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
                user: userData ? {
                  id: userData.id || '',
                  name: userData.username || '',
                  avatar_url: userData.avatar_url || '',
                } : {
                  id: message.user_id,
                  name: 'Unknown User',
                  avatar_url: '',
                }
              });
            } catch (error) {
              console.error('Error fetching user data for new message:', error);
              callback({
                ...(payload.new as ChatMessage),
                user: {
                  id: (payload.new as ChatMessage).user_id,
                  name: 'Unknown User',
                  avatar_url: '',
                }
              });
            }
          };
          
          // Execute the async function
          fetchUserData();
        }
      })
      .subscribe();
  }
};
