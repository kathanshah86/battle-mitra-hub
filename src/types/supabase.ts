
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string
          bio: string | null
          avatar_url: string | null
          game_experience: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username: string
          bio?: string | null
          avatar_url?: string | null
          game_experience?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string
          bio?: string | null
          avatar_url?: string | null
          game_experience?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      tournament_registrations: {
        Row: {
          id: string
          user_id: string
          tournament_id: string
          registration_date: string
          status: string
        }
        Insert: {
          id?: string
          user_id: string
          tournament_id: string
          registration_date?: string
          status?: string
        }
        Update: {
          id?: string
          user_id?: string
          tournament_id?: string
          registration_date?: string
          status?: string
        }
      }
      chat_rooms: {
        Row: {
          id: string
          name: string
          description: string | null
          created_at: string
          updated_at: string
          created_by: string | null
          is_private: boolean
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          created_at?: string
          updated_at?: string
          created_by?: string | null
          is_private?: boolean
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          created_at?: string
          updated_at?: string
          created_by?: string | null
          is_private?: boolean
        }
      }
      chat_messages: {
        Row: {
          id: string
          room_id: string
          user_id: string
          content: string
          created_at: string
          updated_at: string
          deleted: boolean
          reply_to: string | null
        }
        Insert: {
          id?: string
          room_id: string
          user_id: string
          content: string
          created_at?: string
          updated_at?: string
          deleted?: boolean
          reply_to?: string | null
        }
        Update: {
          id?: string
          room_id?: string
          user_id?: string
          content?: string
          created_at?: string
          updated_at?: string
          deleted?: boolean
          reply_to?: string | null
        }
      }
      room_participants: {
        Row: {
          id: string
          room_id: string
          user_id: string
          joined_at: string
          last_read: string | null
        }
        Insert: {
          id?: string
          room_id: string
          user_id: string
          joined_at?: string
          last_read?: string | null
        }
        Update: {
          id?: string
          room_id?: string
          user_id?: string
          joined_at?: string
          last_read?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
