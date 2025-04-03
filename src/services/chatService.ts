
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

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

export const chatService = {
  // Get all chat rooms
  async getChatRooms(): Promise<ChatRoom[]> {
    const { data, error } = await supabase
      .from('chat_rooms')
      .select('*')
      .order('name');
    
    if (error) {
      console.error('Error fetching chat rooms:', error);
      throw error;
    }
    
    return data || [];
  },
  
  // Get messages for a specific room
  async getChatMessages(roomId: string): Promise<ChatMessage[]> {
    const { data, error } = await supabase
      .from('chat_messages')
      .select(`
        *,
        profiles:user_id (
          id,
          username,
          avatar_url
        )
      `)
      .eq('room_id', roomId)
      .order('created_at')
      .limit(100);
    
    if (error) {
      console.error('Error fetching chat messages:', error);
      throw error;
    }
    
    return data?.map(item => ({
      ...item,
      user: item.profiles ? {
        id: item.profiles.id,
        name: item.profiles.username,
        avatar_url: item.profiles.avatar_url,
      } : undefined
    })) || [];
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
      .select('*')
      .single();
    
    if (error) {
      console.error('Error sending message:', error);
      throw error;
    }
    
    return data;
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
          callback(payload.new as ChatMessage);
        }
      })
      .subscribe();
  }
};
