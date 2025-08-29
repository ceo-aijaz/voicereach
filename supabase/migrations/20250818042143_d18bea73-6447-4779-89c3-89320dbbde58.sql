-- Create voice_templates table to store ElevenLabs voice templates
CREATE TABLE public.voice_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  voice_id TEXT NOT NULL,
  model TEXT NOT NULL DEFAULT 'eleven_multilingual_v2',
  sample_text TEXT NOT NULL,
  audio_url TEXT,
  is_public BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create voice_clones table to store user's cloned voices
CREATE TABLE public.voice_clones (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  voice_id TEXT NOT NULL,
  clone_status TEXT NOT NULL DEFAULT 'pending',
  audio_samples TEXT[], -- Array of audio file URLs
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create voice_generations table to track generated audio
CREATE TABLE public.voice_generations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  voice_id TEXT NOT NULL,
  text_content TEXT NOT NULL,
  model TEXT NOT NULL DEFAULT 'eleven_multilingual_v2',
  audio_url TEXT,
  generation_status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create voice_outreach_messages table for outreach campaigns
CREATE TABLE public.voice_outreach_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  campaign_id UUID REFERENCES public.campaigns(id),
  recipient_name TEXT NOT NULL,
  company_name TEXT,
  template_text TEXT NOT NULL,
  final_text TEXT NOT NULL,
  voice_id TEXT NOT NULL,
  audio_url TEXT,
  status TEXT NOT NULL DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_profiles table for additional user information
CREATE TABLE public.user_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  subscription_tier TEXT DEFAULT 'free',
  credits_remaining INTEGER DEFAULT 100,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security for all new tables
ALTER TABLE public.voice_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.voice_clones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.voice_generations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.voice_outreach_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- RLS policies for voice_templates
CREATE POLICY "Users can view public templates and their own" 
ON public.voice_templates 
FOR SELECT 
USING (is_public = true OR auth.uid() = user_id);

CREATE POLICY "Users can create their own templates" 
ON public.voice_templates 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own templates" 
ON public.voice_templates 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own templates" 
ON public.voice_templates 
FOR DELETE 
USING (auth.uid() = user_id);

-- RLS policies for voice_clones
CREATE POLICY "Users can view their own voice clones" 
ON public.voice_clones 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own voice clones" 
ON public.voice_clones 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own voice clones" 
ON public.voice_clones 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own voice clones" 
ON public.voice_clones 
FOR DELETE 
USING (auth.uid() = user_id);

-- RLS policies for voice_generations
CREATE POLICY "Users can view their own voice generations" 
ON public.voice_generations 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own voice generations" 
ON public.voice_generations 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own voice generations" 
ON public.voice_generations 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own voice generations" 
ON public.voice_generations 
FOR DELETE 
USING (auth.uid() = user_id);

-- RLS policies for voice_outreach_messages
CREATE POLICY "Users can view their own outreach messages" 
ON public.voice_outreach_messages 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own outreach messages" 
ON public.voice_outreach_messages 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own outreach messages" 
ON public.voice_outreach_messages 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own outreach messages" 
ON public.voice_outreach_messages 
FOR DELETE 
USING (auth.uid() = user_id);

-- RLS policies for user_profiles
CREATE POLICY "Users can view their own profile" 
ON public.user_profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own profile" 
ON public.user_profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.user_profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Add triggers for automatic timestamp updates
CREATE TRIGGER update_voice_templates_updated_at
BEFORE UPDATE ON public.voice_templates
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_voice_clones_updated_at
BEFORE UPDATE ON public.voice_clones
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_voice_generations_updated_at
BEFORE UPDATE ON public.voice_generations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_voice_outreach_messages_updated_at
BEFORE UPDATE ON public.voice_outreach_messages
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at
BEFORE UPDATE ON public.user_profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default voice templates from ElevenLabs
INSERT INTO public.voice_templates (user_id, name, description, voice_id, sample_text, is_public) VALUES
('00000000-0000-0000-0000-000000000000', 'Aria - Professional Female', 'Clear, professional female voice perfect for business communications', '9BWtsMINqrJLrRacOk9x', 'Hello! This is Aria speaking. I have a warm, professional tone that works great for business presentations and customer service.', true),
('00000000-0000-0000-0000-000000000000', 'Roger - Confident Male', 'Deep, confident male voice ideal for authority and leadership', 'CwhRBWXzGAHq8TQ4Fs17', 'This is Roger. My voice conveys confidence and authority, making it perfect for executive communications and sales presentations.', true),
('00000000-0000-0000-0000-000000000000', 'Sarah - Friendly Female', 'Warm, approachable female voice great for customer outreach', 'EXAVITQu4vr4xnSDxMaL', 'Hi there! I''m Sarah, and I bring a friendly, approachable energy that''s perfect for customer outreach and marketing messages.', true),
('00000000-0000-0000-0000-000000000000', 'Charlie - Energetic Male', 'Upbeat, energetic male voice perfect for sales and marketing', 'IKne3meq5aSn9XLyUdCD', 'Hey! Charlie here with an energetic, upbeat delivery that''s ideal for sales calls and promotional content.', true),
('00000000-0000-0000-0000-000000000000', 'Charlotte - Elegant Female', 'Sophisticated, elegant female voice for premium communications', 'XB0fDUnXU5powFXDhCwa', 'Good day. This is Charlotte speaking with an elegant, sophisticated tone perfect for luxury brands and premium services.', true);

-- Create function to automatically create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (user_id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger to automatically create profile on user signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();