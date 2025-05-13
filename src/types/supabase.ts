
import { Database as OriginalDatabase } from '@/integrations/supabase/types';

// Extend the original Database type with our tables
export interface Database extends OriginalDatabase {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string;
          bio: string | null;
          game_experience: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          username: string;
          bio?: string | null;
          game_experience?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          username?: string;
          bio?: string | null;
          game_experience?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      chat_rooms: {
        Row: {
          id: string;
          name: string;
          type: string;
          description: string | null;
          image_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          type: string;
          description?: string | null;
          image_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          type?: string;
          description?: string | null;
          image_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      chat_messages: {
        Row: {
          id: string;
          content: string;
          user_id: string;
          room_id: string;
          created_at: string;
          updated_at: string;
          likes: number;
          reply_to: string | null;
        };
        Insert: {
          id?: string;
          content: string;
          user_id: string;
          room_id: string;
          created_at?: string;
          updated_at?: string;
          likes?: number;
          reply_to?: string | null;
        };
        Update: {
          id?: string;
          content?: string;
          user_id?: string;
          room_id?: string;
          created_at?: string;
          updated_at?: string;
          likes?: number;
          reply_to?: string | null;
        };
      };
      tournament_registrations: {
        Row: {
          id: string;
          tournament_id: string;
          user_id: string;
          game_username: string;
          registration_date: string;
          payment_status: string;
          payment_amount: number | null;
          payment_currency: string;
          payment_reference: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          tournament_id: string;
          user_id: string;
          game_username: string;
          registration_date?: string;
          payment_status?: string;
          payment_amount?: number | null;
          payment_currency?: string;
          payment_reference?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          tournament_id?: string;
          user_id?: string;
          game_username?: string;
          registration_date?: string;
          payment_status?: string;
          payment_amount?: number | null;
          payment_currency?: string;
          payment_reference?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      user_roles: {
        Row: {
          id: string;
          user_id: string;
          role: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          role: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          role?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      bgmi_tournament_registrations: {
        Row: {
          id: string;
          tournament_id: string;
          user_id: string;
          game_username: string;
          registration_date: string;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          tournament_id: string;
          user_id: string;
          game_username: string;
          registration_date?: string;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          tournament_id?: string;
          user_id?: string;
          game_username?: string;
          registration_date?: string;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: OriginalDatabase['public']['Views'];
    Functions: OriginalDatabase['public']['Functions'];
    Enums: OriginalDatabase['public']['Enums'];
    CompositeTypes: OriginalDatabase['public']['CompositeTypes'];
  };
}
