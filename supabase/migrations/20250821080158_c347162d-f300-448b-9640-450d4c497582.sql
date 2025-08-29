-- Create user_voices table for storing cloned voices
CREATE TABLE IF NOT EXISTS public.user_voices (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  voice_id TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.user_voices ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own voices" 
ON public.user_voices 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own voices" 
ON public.user_voices 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own voices" 
ON public.user_voices 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own voices" 
ON public.user_voices 
FOR DELETE 
USING (auth.uid() = user_id);

-- Add trigger for automatic timestamp updates
CREATE TRIGGER update_user_voices_updated_at
BEFORE UPDATE ON public.user_voices
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add some credits to existing user profiles for testing
UPDATE public.user_profiles 
SET credits_remaining = 100 
WHERE credits_remaining IS NULL OR credits_remaining < 10;