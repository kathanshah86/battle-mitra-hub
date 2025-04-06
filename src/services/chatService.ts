
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

const MESSAGES_LIMIT = 20; // Reduced for faster initial loading

export const chatService = {
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
  },
  
  // Get messages for a specific room with optimized query
  async getChatMessages(roomId: string): Promise<ChatMessage[]> {
    // Try to use cached messages for immediate display while loading fresh ones
    const cacheKey = `chatMessages_${roomId}`;
    const cachedMessages = sessionStorage.getItem(cacheKey);
    let initialMessages: ChatMessage[] = [];
    
    if (cachedMessages) {
      try {
        initialMessages = JSON.parse(cachedMessages);
        console.log('Using cached messages while loading fresh ones');
      } catch (e) {
        console.error('Error parsing cached messages:', e);
      }
    }
    
    // Add a shorter timeout
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('Messages query timed out')), 3000); // 3 second timeout
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
      .limit(MESSAGES_LIMIT);
    
    try {
      // Race between the query and the timeout
      const { data, error } = await Promise.race([
        queryPromise,
        timeoutPromise.then(() => {
          // If we have cached messages, don't throw, just return them
          if (initialMessages.length > 0) {
            console.log('Query timed out but using cached messages');
            return { data: null, error: null };
          }
          throw new Error('Messages query timed out');
        })
      ]);
      
      // If we got here with no data but have initialMessages, return those
      if (!data && initialMessages.length > 0) {
        return initialMessages;
      }
      
      if (error) {
        console.error('Error fetching chat messages:', error);
        // Return cached messages if available, otherwise throw
        if (initialMessages.length > 0) {
          return initialMessages;
        }
        throw error;
      }
      
      // Process the messages
      const messages = (data || []).reverse().map(item => {
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
      
      // Cache the processed messages
      sessionStorage.setItem(cacheKey, JSON.stringify(messages));
      
      return messages;
    } catch (error) {
      console.error('Error in getChatMessages:', error);
      
      // If we have cached messages, return them instead of throwing
      if (initialMessages.length > 0) {
        return initialMessages;
      }
      
      throw error;
    }
  },
  
  // Send a new message with optimized error handling
  async sendMessage(roomId: string, content: string, userId: string, replyTo?: string): Promise<ChatMessage> {
    if (!content.trim()) {
      throw new Error("Message content cannot be empty");
    }
    
    const message = {
      room_id: roomId,
      content,
      user_id: userId,
      reply_to: replyTo || null,
    };
    
    try {
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
    } catch (error) {
      console.error('Failed to send message:', error);
      throw error;
    }
  },
  
  // Update message with improved error handling
  async updateMessage(messageId: string, updates: Partial<ChatMessage>): Promise<void> {
    try {
      const { error } = await supabase
        .from('chat_messages')
        .update(updates)
        .eq('id', messageId);
      
      if (error) {
        console.error('Error updating message:', error);
        throw error;
      }
    } catch (error) {
      console.error('Failed to update message:', error);
      throw error;
    }
  },
  
  // Subscribe to new messages with improved connection handling
  subscribeToRoom(roomId: string, callback: (message: ChatMessage) => void) {
    // Improved channel configuration with auto-reconnect
    return supabase
      .channel(`room:${roomId}`)
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'chat_messages',
        filter: `room_id=eq.${roomId}` 
      }, payload => {
        if (payload.new) {
          // Simplified user data handling
          const message = payload.new as ChatMessage;
          
          // Get user data from profiles
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
            .catch(error => {
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
      .subscribe();
  }
};
