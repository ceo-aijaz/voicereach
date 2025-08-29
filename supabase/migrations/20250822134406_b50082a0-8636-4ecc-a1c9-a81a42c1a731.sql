-- Create campaign sequences table
CREATE TABLE public.campaign_sequences (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  campaign_id UUID NOT NULL REFERENCES public.campaigns(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'paused', 'completed')),
  sequence_order INTEGER NOT NULL DEFAULT 1,
  delay_hours INTEGER NOT NULL DEFAULT 24,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create campaign sequence steps table
CREATE TABLE public.campaign_sequence_steps (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  sequence_id UUID NOT NULL REFERENCES public.campaign_sequences(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  step_type TEXT NOT NULL CHECK (step_type IN ('message', 'voice_note', 'email', 'follow_up', 'delay')),
  step_order INTEGER NOT NULL DEFAULT 1,
  content TEXT,
  voice_id TEXT,
  voice_model TEXT DEFAULT 'eleven_multilingual_v2',
  delay_hours INTEGER DEFAULT 0,
  conditions JSONB DEFAULT '{}',
  settings JSONB DEFAULT '{}',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create campaign targets/audience table
CREATE TABLE public.campaign_targets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  campaign_id UUID NOT NULL REFERENCES public.campaigns(id) ON DELETE CASCADE,
  lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'failed', 'paused')),
  current_sequence_id UUID REFERENCES public.campaign_sequences(id),
  current_step_id UUID REFERENCES public.campaign_sequence_steps(id),
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  last_activity_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  retry_count INTEGER DEFAULT 0,
  error_message TEXT,
  personalization_data JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create campaign executions/activities table
CREATE TABLE public.campaign_executions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  campaign_id UUID NOT NULL REFERENCES public.campaigns(id) ON DELETE CASCADE,
  target_id UUID NOT NULL REFERENCES public.campaign_targets(id) ON DELETE CASCADE,
  sequence_id UUID NOT NULL REFERENCES public.campaign_sequences(id) ON DELETE CASCADE,
  step_id UUID NOT NULL REFERENCES public.campaign_sequence_steps(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  execution_type TEXT NOT NULL CHECK (execution_type IN ('message_sent', 'voice_generated', 'email_sent', 'delay_completed', 'response_received')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'skipped')),
  executed_at TIMESTAMP WITH TIME ZONE,
  response_data JSONB DEFAULT '{}',
  error_message TEXT,
  retry_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create campaign analytics table
CREATE TABLE public.campaign_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  campaign_id UUID NOT NULL REFERENCES public.campaigns(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  targets_total INTEGER DEFAULT 0,
  targets_completed INTEGER DEFAULT 0,
  messages_sent INTEGER DEFAULT 0,
  voice_notes_sent INTEGER DEFAULT 0,
  emails_sent INTEGER DEFAULT 0,
  responses_received INTEGER DEFAULT 0,
  errors_count INTEGER DEFAULT 0,
  conversion_rate DECIMAL(5,2) DEFAULT 0.00,
  avg_response_time_hours INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(campaign_id, date)
);

-- Add missing columns to campaigns table
ALTER TABLE public.campaigns ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE public.campaigns ADD COLUMN IF NOT EXISTS campaign_type TEXT DEFAULT 'outreach' CHECK (campaign_type IN ('outreach', 'engagement', 'voice_cloning', 'follow_up'));
ALTER TABLE public.campaigns ADD COLUMN IF NOT EXISTS target_audience JSONB DEFAULT '{}';
ALTER TABLE public.campaigns ADD COLUMN IF NOT EXISTS schedule_settings JSONB DEFAULT '{}';
ALTER TABLE public.campaigns ADD COLUMN IF NOT EXISTS throttle_settings JSONB DEFAULT '{"messages_per_day": 50, "messages_per_hour": 10}';
ALTER TABLE public.campaigns ADD COLUMN IF NOT EXISTS personalization_tags JSONB DEFAULT '{}';
ALTER TABLE public.campaigns ADD COLUMN IF NOT EXISTS started_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE public.campaigns ADD COLUMN IF NOT EXISTS completed_at TIMESTAMP WITH TIME ZONE;

-- Add missing columns to leads table for audience building
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS username TEXT;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS full_name TEXT;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS url TEXT;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS bio TEXT;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS total_followers INTEGER DEFAULT 0;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS engagement_rate DECIMAL(5,2);
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS last_active_date DATE;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS platform TEXT DEFAULT 'instagram';
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS tags JSONB DEFAULT '[]';
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS lead_source TEXT DEFAULT 'manual';
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS score INTEGER DEFAULT 0;

-- Enable Row Level Security
ALTER TABLE public.campaign_sequences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaign_sequence_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaign_targets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaign_executions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaign_analytics ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for campaign_sequences
CREATE POLICY "Users can view their own campaign sequences" ON public.campaign_sequences FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own campaign sequences" ON public.campaign_sequences FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own campaign sequences" ON public.campaign_sequences FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own campaign sequences" ON public.campaign_sequences FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for campaign_sequence_steps
CREATE POLICY "Users can view their own campaign sequence steps" ON public.campaign_sequence_steps FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own campaign sequence steps" ON public.campaign_sequence_steps FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own campaign sequence steps" ON public.campaign_sequence_steps FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own campaign sequence steps" ON public.campaign_sequence_steps FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for campaign_targets
CREATE POLICY "Users can view their own campaign targets" ON public.campaign_targets FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own campaign targets" ON public.campaign_targets FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own campaign targets" ON public.campaign_targets FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own campaign targets" ON public.campaign_targets FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for campaign_executions
CREATE POLICY "Users can view their own campaign executions" ON public.campaign_executions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own campaign executions" ON public.campaign_executions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own campaign executions" ON public.campaign_executions FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own campaign executions" ON public.campaign_executions FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for campaign_analytics
CREATE POLICY "Users can view their own campaign analytics" ON public.campaign_analytics FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own campaign analytics" ON public.campaign_analytics FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own campaign analytics" ON public.campaign_analytics FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own campaign analytics" ON public.campaign_analytics FOR DELETE USING (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX idx_campaign_sequences_campaign_id ON public.campaign_sequences(campaign_id);
CREATE INDEX idx_campaign_sequences_user_id ON public.campaign_sequences(user_id);
CREATE INDEX idx_campaign_sequence_steps_sequence_id ON public.campaign_sequence_steps(sequence_id);
CREATE INDEX idx_campaign_sequence_steps_user_id ON public.campaign_sequence_steps(user_id);
CREATE INDEX idx_campaign_targets_campaign_id ON public.campaign_targets(campaign_id);
CREATE INDEX idx_campaign_targets_lead_id ON public.campaign_targets(lead_id);
CREATE INDEX idx_campaign_targets_user_id ON public.campaign_targets(user_id);
CREATE INDEX idx_campaign_targets_status ON public.campaign_targets(status);
CREATE INDEX idx_campaign_executions_campaign_id ON public.campaign_executions(campaign_id);
CREATE INDEX idx_campaign_executions_target_id ON public.campaign_executions(target_id);
CREATE INDEX idx_campaign_executions_user_id ON public.campaign_executions(user_id);
CREATE INDEX idx_campaign_analytics_campaign_id ON public.campaign_analytics(campaign_id);
CREATE INDEX idx_campaign_analytics_user_id ON public.campaign_analytics(user_id);
CREATE INDEX idx_campaign_analytics_date ON public.campaign_analytics(date);
CREATE INDEX idx_leads_user_id_platform ON public.leads(user_id, platform);
CREATE INDEX idx_leads_total_followers ON public.leads(total_followers);
CREATE INDEX idx_leads_engagement_rate ON public.leads(engagement_rate);

-- Create triggers for updated_at columns
CREATE TRIGGER update_campaign_sequences_updated_at BEFORE UPDATE ON public.campaign_sequences FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_campaign_sequence_steps_updated_at BEFORE UPDATE ON public.campaign_sequence_steps FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_campaign_targets_updated_at BEFORE UPDATE ON public.campaign_targets FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_campaign_executions_updated_at BEFORE UPDATE ON public.campaign_executions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_campaign_analytics_updated_at BEFORE UPDATE ON public.campaign_analytics FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();