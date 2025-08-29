import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Play, Volume2, Star, User, Users } from 'lucide-react';
import { useElevenLabs } from '@/hooks/useElevenLabs';
import { toast } from 'sonner';

interface VoiceModel {
  id: string;
  name: string;
  description: string;
  category: string;
  accent?: string;
  age?: string;
  gender: 'male' | 'female';
  preview_url?: string;
}

const voiceModels: VoiceModel[] = [
  // Male Voices
  {
    id: 'FmBhnvP58BK0vz65OOj7',
    name: 'Viraj',
    description: 'Hindi Male Voice - Natural and expressive for multilingual content',
    category: 'Multilingual',
    accent: 'Hindi',
    age: 'Adult',
    gender: 'male',
  },
  {
    id: 'GBv7mTt0atIp3Br8iCZE',
    name: 'Thomas',
    description: 'English Male Voice - Professional and clear for business content',
    category: 'Professional',
    accent: 'English',
    age: 'Adult', 
    gender: 'male',
  },
  {
    id: 'UgBBYS2sOqTuMpoF3BR0',
    name: 'Mark',
    description: 'Natural English Male Voice - Conversational and friendly for outreach',
    category: 'Conversational',
    accent: 'English',
    age: 'Adult',
    gender: 'male',
  },
  {
    id: 'IKne3meq5aSn9XLyUdCD',
    name: 'Charlie',
    description: 'Young English Male Voice - Energetic and dynamic for marketing',
    category: 'Energetic',
    accent: 'English',
    age: 'Young Adult',
    gender: 'male',
  },
  // Female Voices
  {
    id: '56AoDkrOh6qfVPDXZ7Pt',
    name: 'Cassidy',
    description: 'English Confident Female Voice - Authoritative and persuasive',
    category: 'Professional',
    accent: 'English',
    age: 'Adult',
    gender: 'female',
  },
  {
    id: 'Xb7hH8MSUJpSbSDYk0k2',
    name: 'Alice',
    description: 'English Engaging Female Voice - Warm and inviting for sales',
    category: 'Conversational',
    accent: 'English',
    age: 'Adult',
    gender: 'female',
  },
  {
    id: 'LcfcDJNUP1GQjkzn1xUU',
    name: 'Emily',
    description: 'English Female Voice - Versatile and natural for any content',
    category: 'Professional',
    accent: 'English',
    age: 'Adult',
    gender: 'female',
  },
];

interface VoiceModelsProps {
  onSelectVoice?: (voice: VoiceModel) => void;
  selectedVoiceId?: string;
}

export const VoiceModels: React.FC<VoiceModelsProps> = ({ onSelectVoice, selectedVoiceId }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'male' | 'female'>('all');
  const [playingVoice, setPlayingVoice] = useState<string | null>(null);
  const { generateSpeech, loading } = useElevenLabs();

  const handlePlayPreview = async (voice: VoiceModel) => {
    if (playingVoice === voice.id) {
      setPlayingVoice(null);
      return;
    }

    console.log('Starting voice preview for:', voice.name, voice.id);
    setPlayingVoice(voice.id);
    
    try {
      const sampleText = `Hello! I'm ${voice.name}, your AI voice assistant. I'm here to help bring your content to life with natural, expressive speech.`;
      console.log('Calling generateSpeech with:', { text: sampleText.substring(0, 50) + '...', voiceId: voice.id });
      
      const audioUrl = await generateSpeech(sampleText, voice.id);
      console.log('Generated audio URL:', audioUrl ? 'received' : 'null');
      
      if (audioUrl) {
        const audio = new Audio(audioUrl);
        audio.onended = () => {
          console.log('Audio playback ended');
          setPlayingVoice(null);
        };
        audio.onerror = (e) => {
          console.error('Audio playback failed:', e);
          setPlayingVoice(null);
          toast.error('Failed to play audio - audio format error');
        };
        
        console.log('Starting audio playback...');
        await audio.play();
        toast.success(`Playing ${voice.name} preview`);
      } else {
        console.error('No audio URL received');
        toast.error('No audio generated');
        setPlayingVoice(null);
      }
    } catch (error) {
      console.error('Preview failed:', error);
      toast.error(`Failed to play preview: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setPlayingVoice(null);
    }
  };

  const handleSelectVoice = (voice: VoiceModel) => {
    if (onSelectVoice) {
      onSelectVoice(voice);
      toast.success(`Selected ${voice.name} voice`);
    }
  };

  const filteredVoices = voiceModels.filter(voice => {
    if (activeTab === 'all') return true;
    return voice.gender === activeTab;
  });

  const maleVoices = voiceModels.filter(voice => voice.gender === 'male');
  const femaleVoices = voiceModels.filter(voice => voice.gender === 'female');

  const VoiceGrid = ({ voices }: { voices: VoiceModel[] }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {voices.map((voice) => {
        const isSelected = selectedVoiceId === voice.id;
        const isPlaying = playingVoice === voice.id;
        
        return (
          <Card 
            key={voice.id} 
            className={`bg-surface border-border hover:shadow-lg transition-all duration-200 hover-lift ${
              isSelected ? 'ring-2 ring-primary/50 border-primary/50' : ''
            }`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-text-primary">{voice.name}</CardTitle>
                <Badge 
                  variant={voice.gender === 'male' ? 'default' : 'secondary'}
                  className="text-xs"
                >
                  {voice.gender === 'male' ? '♂' : '♀'} {voice.gender}
                </Badge>
              </div>
              <CardDescription className="text-text-muted">
                {voice.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-xs border-primary/30 text-primary">
                  {voice.category}
                </Badge>
                {voice.accent && (
                  <Badge variant="outline" className="text-xs">
                    {voice.accent}
                  </Badge>
                )}
                {voice.age && (
                  <Badge variant="outline" className="text-xs">
                    {voice.age}
                  </Badge>
                )}
              </div>
              
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePlayPreview(voice)}
                  disabled={loading}
                  className="flex-1 border-border hover:bg-surface"
                >
                  {isPlaying ? (
                    <Volume2 className="h-3 w-3 mr-1 animate-pulse" />
                  ) : (
                    <Play className="h-3 w-3 mr-1" />
                  )}
                  {isPlaying ? 'Playing...' : 'Preview'}
                </Button>
                
                <Button
                  size="sm"
                  onClick={() => handleSelectVoice(voice)}
                  variant={isSelected ? 'default' : 'outline'}
                  className={isSelected 
                    ? "bg-gradient-primary hover:shadow-primary hover-lift" 
                    : "border-border hover:bg-surface"
                  }
                >
                  <Star className="h-3 w-3 mr-1" />
                  {isSelected ? 'Selected' : 'Select'}
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
          Premium Voice Models
        </h2>
        <p className="text-text-muted">
          Choose from our curated collection of professional AI voices
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'all' | 'male' | 'female')} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-surface border border-border">
          <TabsTrigger value="all" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            All Voices ({voiceModels.length})
          </TabsTrigger>
          <TabsTrigger value="male" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Male ({maleVoices.length})
          </TabsTrigger>
          <TabsTrigger value="female" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Female ({femaleVoices.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <VoiceGrid voices={voiceModels} />
        </TabsContent>

        <TabsContent value="male" className="mt-6">
          <VoiceGrid voices={maleVoices} />
        </TabsContent>

        <TabsContent value="female" className="mt-6">
          <VoiceGrid voices={femaleVoices} />
        </TabsContent>
      </Tabs>
    </div>
  );
};