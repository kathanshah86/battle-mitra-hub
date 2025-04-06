
import { messagesService } from './messagesService';
import { roomsService } from './roomsService';
import { realtimeService } from './realtimeService';

export * from './types';

// Combine all services into one chatService export
export const chatService = {
  // Messages
  getChatMessages: messagesService.getChatMessages,
  sendMessage: messagesService.sendMessage,
  updateMessage: messagesService.updateMessage,
  
  // Rooms
  getChatRooms: roomsService.getChatRooms,
  
  // Realtime
  subscribeToRoom: realtimeService.subscribeToRoom,
};
