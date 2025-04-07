export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      bgmi_tournament_registrations: {
        Row: {
          created_at: string | null
          game_username: string
          id: string
          registration_date: string | null
          status: string | null
          tournament_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          game_username: string
          id?: string
          registration_date?: string | null
          status?: string | null
          tournament_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          game_username?: string
          id?: string
          registration_date?: string | null
          status?: string | null
          tournament_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          content: string
          created_at: string
          deleted: boolean | null
          id: string
          likes: number | null
          metadata: Json | null
          reply_to: string | null
          room_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          deleted?: boolean | null
          id?: string
          likes?: number | null
          metadata?: Json | null
          reply_to?: string | null
          room_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          deleted?: boolean | null
          id?: string
          likes?: number | null
          metadata?: Json | null
          reply_to?: string | null
          room_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_reply_to_fkey"
            columns: ["reply_to"]
            isOneToOne: false
            referencedRelation: "chat_messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_messages_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "chat_rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_rooms: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          image_url: string | null
          metadata: Json | null
          name: string
          type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          metadata?: Json | null
          name: string
          type: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          metadata?: Json | null
          name?: string
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      message_reactions: {
        Row: {
          created_at: string
          id: string
          message_id: string
          reaction: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          message_id: string
          reaction: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          message_id?: string
          reaction?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "message_reactions_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "chat_messages"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          game_experience: string | null
          id: string
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          game_experience?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          game_experience?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      room_members: {
        Row: {
          joined_at: string
          role: string | null
          room_id: string
          status: string | null
          user_id: string
        }
        Insert: {
          joined_at?: string
          role?: string | null
          room_id: string
          status?: string | null
          user_id: string
        }
        Update: {
          joined_at?: string
          role?: string | null
          room_id?: string
          status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "room_members_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "chat_rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      student_activities: {
        Row: {
          activity_details: Json | null
          activity_type: string
          completed_at: string | null
          id: string
          student_id: string
        }
        Insert: {
          activity_details?: Json | null
          activity_type: string
          completed_at?: string | null
          id?: string
          student_id: string
        }
        Update: {
          activity_details?: Json | null
          activity_type?: string
          completed_at?: string | null
          id?: string
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_activities_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      student_badges: {
        Row: {
          badge_description: string
          badge_icon: string
          badge_name: string
          earned_at: string | null
          id: string
          student_id: string
        }
        Insert: {
          badge_description: string
          badge_icon: string
          badge_name: string
          earned_at?: string | null
          id?: string
          student_id: string
        }
        Update: {
          badge_description?: string
          badge_icon?: string
          badge_name?: string
          earned_at?: string | null
          id?: string
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_badges_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      student_notifications: {
        Row: {
          created_at: string | null
          id: string
          message: string
          notification_type: string
          read: boolean | null
          student_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          message: string
          notification_type: string
          read?: boolean | null
          student_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          message?: string
          notification_type?: string
          read?: boolean | null
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_notifications_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      student_performance: {
        Row: {
          average_score: number | null
          chapters_completed: number | null
          id: string
          improvement: number | null
          status: string | null
          student_id: string
          subject: string
          total_chapters: number | null
          updated_at: string | null
          weak_areas: string[] | null
        }
        Insert: {
          average_score?: number | null
          chapters_completed?: number | null
          id?: string
          improvement?: number | null
          status?: string | null
          student_id: string
          subject: string
          total_chapters?: number | null
          updated_at?: string | null
          weak_areas?: string[] | null
        }
        Update: {
          average_score?: number | null
          chapters_completed?: number | null
          id?: string
          improvement?: number | null
          status?: string | null
          student_id?: string
          subject?: string
          total_chapters?: number | null
          updated_at?: string | null
          weak_areas?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "student_performance_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      student_tasks: {
        Row: {
          created_at: string | null
          due_date: string | null
          id: string
          priority: string
          progress: number | null
          student_id: string
          subject: string
          task_type: string
          title: string
          total_duration: number | null
        }
        Insert: {
          created_at?: string | null
          due_date?: string | null
          id?: string
          priority: string
          progress?: number | null
          student_id: string
          subject: string
          task_type: string
          title: string
          total_duration?: number | null
        }
        Update: {
          created_at?: string | null
          due_date?: string | null
          id?: string
          priority?: string
          progress?: number | null
          student_id?: string
          subject?: string
          task_type?: string
          title?: string
          total_duration?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "student_tasks_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      students: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          full_name: string
          grade: number
          id: string
          learning_pace: string | null
          streak: number | null
          student_id: string
          updated_at: string | null
          xp: number | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          full_name: string
          grade: number
          id: string
          learning_pace?: string | null
          streak?: number | null
          student_id: string
          updated_at?: string | null
          xp?: number | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string
          grade?: number
          id?: string
          learning_pace?: string | null
          streak?: number | null
          student_id?: string
          updated_at?: string | null
          xp?: number | null
        }
        Relationships: []
      }
      team_finder: {
        Row: {
          availability: Json
          created_at: string
          description: string | null
          game: string
          id: string
          skill_level: string
          status: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          availability: Json
          created_at?: string
          description?: string | null
          game: string
          id?: string
          skill_level: string
          status?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          availability?: Json
          created_at?: string
          description?: string | null
          game?: string
          id?: string
          skill_level?: string
          status?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      tournament_registrations: {
        Row: {
          created_at: string | null
          game_username: string
          id: string
          payment_amount: number | null
          payment_currency: string | null
          payment_reference: string | null
          payment_status: string | null
          registration_date: string | null
          tournament_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          game_username: string
          id?: string
          payment_amount?: number | null
          payment_currency?: string | null
          payment_reference?: string | null
          payment_status?: string | null
          registration_date?: string | null
          tournament_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          game_username?: string
          id?: string
          payment_amount?: number | null
          payment_currency?: string | null
          payment_reference?: string | null
          payment_status?: string | null
          registration_date?: string | null
          tournament_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: { user_id: string; role_name: string }
        Returns: boolean
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_room_moderator: {
        Args: { room_id: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
