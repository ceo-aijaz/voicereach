export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      affiliate_applications: {
        Row: {
          approved_at: string | null
          audience_size: string | null
          commission_rate: number | null
          created_at: string
          email: string
          full_name: string
          id: string
          marketing_experience: string | null
          status: string
          user_id: string
          website: string | null
        }
        Insert: {
          approved_at?: string | null
          audience_size?: string | null
          commission_rate?: number | null
          created_at?: string
          email: string
          full_name: string
          id?: string
          marketing_experience?: string | null
          status?: string
          user_id: string
          website?: string | null
        }
        Update: {
          approved_at?: string | null
          audience_size?: string | null
          commission_rate?: number | null
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          marketing_experience?: string | null
          status?: string
          user_id?: string
          website?: string | null
        }
        Relationships: []
      }
      campaign_analytics: {
        Row: {
          avg_response_time_hours: number | null
          campaign_id: string
          conversion_rate: number | null
          created_at: string
          date: string
          emails_sent: number | null
          errors_count: number | null
          id: string
          messages_sent: number | null
          responses_received: number | null
          targets_completed: number | null
          targets_total: number | null
          updated_at: string
          user_id: string
          voice_notes_sent: number | null
        }
        Insert: {
          avg_response_time_hours?: number | null
          campaign_id: string
          conversion_rate?: number | null
          created_at?: string
          date?: string
          emails_sent?: number | null
          errors_count?: number | null
          id?: string
          messages_sent?: number | null
          responses_received?: number | null
          targets_completed?: number | null
          targets_total?: number | null
          updated_at?: string
          user_id: string
          voice_notes_sent?: number | null
        }
        Update: {
          avg_response_time_hours?: number | null
          campaign_id?: string
          conversion_rate?: number | null
          created_at?: string
          date?: string
          emails_sent?: number | null
          errors_count?: number | null
          id?: string
          messages_sent?: number | null
          responses_received?: number | null
          targets_completed?: number | null
          targets_total?: number | null
          updated_at?: string
          user_id?: string
          voice_notes_sent?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "campaign_analytics_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      campaign_executions: {
        Row: {
          campaign_id: string
          created_at: string
          error_message: string | null
          executed_at: string | null
          execution_type: string
          id: string
          response_data: Json | null
          retry_count: number | null
          sequence_id: string
          status: string
          step_id: string
          target_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          campaign_id: string
          created_at?: string
          error_message?: string | null
          executed_at?: string | null
          execution_type: string
          id?: string
          response_data?: Json | null
          retry_count?: number | null
          sequence_id: string
          status?: string
          step_id: string
          target_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          campaign_id?: string
          created_at?: string
          error_message?: string | null
          executed_at?: string | null
          execution_type?: string
          id?: string
          response_data?: Json | null
          retry_count?: number | null
          sequence_id?: string
          status?: string
          step_id?: string
          target_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "campaign_executions_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_executions_sequence_id_fkey"
            columns: ["sequence_id"]
            isOneToOne: false
            referencedRelation: "campaign_sequences"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_executions_step_id_fkey"
            columns: ["step_id"]
            isOneToOne: false
            referencedRelation: "campaign_sequence_steps"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_executions_target_id_fkey"
            columns: ["target_id"]
            isOneToOne: false
            referencedRelation: "campaign_targets"
            referencedColumns: ["id"]
          },
        ]
      }
      campaign_sequence_steps: {
        Row: {
          conditions: Json | null
          content: string | null
          created_at: string
          delay_hours: number | null
          id: string
          is_active: boolean
          sequence_id: string
          settings: Json | null
          step_order: number
          step_type: string
          updated_at: string
          user_id: string
          voice_id: string | null
          voice_model: string | null
        }
        Insert: {
          conditions?: Json | null
          content?: string | null
          created_at?: string
          delay_hours?: number | null
          id?: string
          is_active?: boolean
          sequence_id: string
          settings?: Json | null
          step_order?: number
          step_type: string
          updated_at?: string
          user_id: string
          voice_id?: string | null
          voice_model?: string | null
        }
        Update: {
          conditions?: Json | null
          content?: string | null
          created_at?: string
          delay_hours?: number | null
          id?: string
          is_active?: boolean
          sequence_id?: string
          settings?: Json | null
          step_order?: number
          step_type?: string
          updated_at?: string
          user_id?: string
          voice_id?: string | null
          voice_model?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "campaign_sequence_steps_sequence_id_fkey"
            columns: ["sequence_id"]
            isOneToOne: false
            referencedRelation: "campaign_sequences"
            referencedColumns: ["id"]
          },
        ]
      }
      campaign_sequences: {
        Row: {
          campaign_id: string
          created_at: string
          delay_hours: number
          description: string | null
          id: string
          name: string
          sequence_order: number
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          campaign_id: string
          created_at?: string
          delay_hours?: number
          description?: string | null
          id?: string
          name: string
          sequence_order?: number
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          campaign_id?: string
          created_at?: string
          delay_hours?: number
          description?: string | null
          id?: string
          name?: string
          sequence_order?: number
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "campaign_sequences_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      campaign_targets: {
        Row: {
          campaign_id: string
          completed_at: string | null
          created_at: string
          current_sequence_id: string | null
          current_step_id: string | null
          error_message: string | null
          id: string
          last_activity_at: string | null
          lead_id: string
          personalization_data: Json | null
          retry_count: number | null
          started_at: string | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          campaign_id: string
          completed_at?: string | null
          created_at?: string
          current_sequence_id?: string | null
          current_step_id?: string | null
          error_message?: string | null
          id?: string
          last_activity_at?: string | null
          lead_id: string
          personalization_data?: Json | null
          retry_count?: number | null
          started_at?: string | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          campaign_id?: string
          completed_at?: string | null
          created_at?: string
          current_sequence_id?: string | null
          current_step_id?: string | null
          error_message?: string | null
          id?: string
          last_activity_at?: string | null
          lead_id?: string
          personalization_data?: Json | null
          retry_count?: number | null
          started_at?: string | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "campaign_targets_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_targets_current_sequence_id_fkey"
            columns: ["current_sequence_id"]
            isOneToOne: false
            referencedRelation: "campaign_sequences"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_targets_current_step_id_fkey"
            columns: ["current_step_id"]
            isOneToOne: false
            referencedRelation: "campaign_sequence_steps"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_targets_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      campaigns: {
        Row: {
          campaign_type: string | null
          completed_at: string | null
          created_at: string
          description: string | null
          id: string
          name: string
          personalization_tags: Json | null
          schedule_settings: Json | null
          started_at: string | null
          status: string
          target_audience: Json | null
          throttle_settings: Json | null
          updated_at: string
          user_id: string
        }
        Insert: {
          campaign_type?: string | null
          completed_at?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name: string
          personalization_tags?: Json | null
          schedule_settings?: Json | null
          started_at?: string | null
          status?: string
          target_audience?: Json | null
          throttle_settings?: Json | null
          updated_at?: string
          user_id: string
        }
        Update: {
          campaign_type?: string | null
          completed_at?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          personalization_tags?: Json | null
          schedule_settings?: Json | null
          started_at?: string | null
          status?: string
          target_audience?: Json | null
          throttle_settings?: Json | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      leads: {
        Row: {
          bio: string | null
          campaign_id: string | null
          created_at: string
          email: string
          engagement_rate: number | null
          full_name: string | null
          id: string
          last_active_date: string | null
          lead_source: string | null
          name: string
          platform: string | null
          score: number | null
          status: string
          tags: Json | null
          total_followers: number | null
          updated_at: string
          url: string | null
          user_id: string
          username: string | null
        }
        Insert: {
          bio?: string | null
          campaign_id?: string | null
          created_at?: string
          email: string
          engagement_rate?: number | null
          full_name?: string | null
          id?: string
          last_active_date?: string | null
          lead_source?: string | null
          name: string
          platform?: string | null
          score?: number | null
          status?: string
          tags?: Json | null
          total_followers?: number | null
          updated_at?: string
          url?: string | null
          user_id: string
          username?: string | null
        }
        Update: {
          bio?: string | null
          campaign_id?: string | null
          created_at?: string
          email?: string
          engagement_rate?: number | null
          full_name?: string | null
          id?: string
          last_active_date?: string | null
          lead_source?: string | null
          name?: string
          platform?: string | null
          score?: number | null
          status?: string
          tags?: Json | null
          total_followers?: number | null
          updated_at?: string
          url?: string | null
          user_id?: string
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "leads_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          credits_remaining: number | null
          email: string | null
          full_name: string | null
          id: string
          subscription_tier: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          credits_remaining?: number | null
          email?: string | null
          full_name?: string | null
          id?: string
          subscription_tier?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          credits_remaining?: number | null
          email?: string | null
          full_name?: string | null
          id?: string
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_voices: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          updated_at: string
          user_id: string
          voice_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          updated_at?: string
          user_id: string
          voice_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          updated_at?: string
          user_id?: string
          voice_id?: string
        }
        Relationships: []
      }
      voice_accounts: {
        Row: {
          created_at: string
          id: string
          platform: string
          status: string
          updated_at: string
          user_id: string
          username: string
        }
        Insert: {
          created_at?: string
          id?: string
          platform?: string
          status?: string
          updated_at?: string
          user_id: string
          username: string
        }
        Update: {
          created_at?: string
          id?: string
          platform?: string
          status?: string
          updated_at?: string
          user_id?: string
          username?: string
        }
        Relationships: []
      }
      voice_clones: {
        Row: {
          audio_samples: string[] | null
          clone_status: string
          created_at: string
          description: string | null
          id: string
          name: string
          updated_at: string
          user_id: string
          voice_id: string
        }
        Insert: {
          audio_samples?: string[] | null
          clone_status?: string
          created_at?: string
          description?: string | null
          id?: string
          name: string
          updated_at?: string
          user_id: string
          voice_id: string
        }
        Update: {
          audio_samples?: string[] | null
          clone_status?: string
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          updated_at?: string
          user_id?: string
          voice_id?: string
        }
        Relationships: []
      }
      voice_generations: {
        Row: {
          audio_url: string | null
          created_at: string
          generation_status: string
          id: string
          model: string
          text_content: string
          updated_at: string
          user_id: string
          voice_id: string
        }
        Insert: {
          audio_url?: string | null
          created_at?: string
          generation_status?: string
          id?: string
          model?: string
          text_content: string
          updated_at?: string
          user_id: string
          voice_id: string
        }
        Update: {
          audio_url?: string | null
          created_at?: string
          generation_status?: string
          id?: string
          model?: string
          text_content?: string
          updated_at?: string
          user_id?: string
          voice_id?: string
        }
        Relationships: []
      }
      voice_outreach_messages: {
        Row: {
          audio_url: string | null
          campaign_id: string | null
          company_name: string | null
          created_at: string
          final_text: string
          id: string
          recipient_name: string
          status: string
          template_text: string
          updated_at: string
          user_id: string
          voice_id: string
        }
        Insert: {
          audio_url?: string | null
          campaign_id?: string | null
          company_name?: string | null
          created_at?: string
          final_text: string
          id?: string
          recipient_name: string
          status?: string
          template_text: string
          updated_at?: string
          user_id: string
          voice_id: string
        }
        Update: {
          audio_url?: string | null
          campaign_id?: string | null
          company_name?: string | null
          created_at?: string
          final_text?: string
          id?: string
          recipient_name?: string
          status?: string
          template_text?: string
          updated_at?: string
          user_id?: string
          voice_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "voice_outreach_messages_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      voice_templates: {
        Row: {
          audio_url: string | null
          created_at: string
          description: string | null
          id: string
          is_public: boolean
          model: string
          name: string
          sample_text: string
          updated_at: string
          user_id: string
          voice_id: string
        }
        Insert: {
          audio_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_public?: boolean
          model?: string
          name: string
          sample_text: string
          updated_at?: string
          user_id: string
          voice_id: string
        }
        Update: {
          audio_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_public?: boolean
          model?: string
          name?: string
          sample_text?: string
          updated_at?: string
          user_id?: string
          voice_id?: string
        }
        Relationships: []
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
