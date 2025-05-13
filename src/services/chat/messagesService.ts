
import { supabase } from '@/integrations/supabase/client';
import { ChatMessage } from './types';

const MESSAGES_LIMIT = 20;

export const messagesService = {
  // Get messages for a specific room with optimized query
  async getChatMessages(roomId: string): Promise<ChatMessage[]> {
    console.log(`Fetching messages for room: ${roomId}`);
    
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
      setTimeout(() => reject(new Error('Messages query timed out')), 2500); // 2.5 second timeout
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
      .abortSignal(AbortSignal.timeout(2000)); // 2 second abort signal
    
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
        throw new Error(`Failed to load messages: ${error.message}`);
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
      
      // Make sure we throw a proper Error object
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error('Unknown error fetching messages');
      }
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
        throw new Error(`Failed to send message: ${error.message}`);
      }
      
      if (!data) {
        throw new Error('No data returned from insert operation');
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
        id: data.id,
        content: data.content,
        user_id: data.user_id,
        room_id: data.room_id,
        created_at: data.created_at,
        updated_at: data.updated_at,
        likes: data.likes || 0,
        reply_to: data.reply_to,
        user: {
          id: data.user_id,
          name: username,
          avatar_url: avatarUrl,
        }
      };
    } catch (error) {
      console.error('Failed to send message:', error);
      
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error('Unknown error sending message');
      }
    }
  },
  
  // Update message with improved error handling
  async updateMessage(messageId: string, updates: Partial<ChatMessage>): Promise<void> {
    try {
      const { error } = await supabase
        .from('chat_messages')
        .update(updates as any)
        .eq('id', messageId);
      
      if (error) {
        console.error('Error updating message:', error);
        throw new Error(`Failed to update message: ${error.message}`);
      }
    } catch (error) {
      console.error('Failed to update message:', error);
      
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error('Unknown error updating message');
      }
    }
  }
};
