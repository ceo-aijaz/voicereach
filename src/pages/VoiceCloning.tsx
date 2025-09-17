import React, { useState, useEffect } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/dashboard/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { VoiceModels } from '@/components/voice/VoiceModels';
import { VoiceRecorder } from '@/components/voice/VoiceRecorder';
import { VoiceOutreach } from '@/components/voice/VoiceOutreach';
import { useVoiceGeneration } from '@/hooks/useVoiceGeneration';
import { useElevenLabs } from '@/hooks/useElevenLabs';
import { 
  Mic2,
  Users,
  TrendingUp,
  X
} from 'lucide-react';

const VoiceCloning = () => {
  const [selectedVoice, setSelectedVoice] = useState<any>(null);
  const [selectedVoiceId, setSelectedVoiceId] = useState<string>('');
  const [showRecorder, setShowRecorder] = useState(false);
  
  const { deleteVoice } = useElevenLabs();

  useEffect(() => {
    if (selectedVoice?.voice_id) {
      setSelectedVoiceId(selectedVoice.voice_id);
    }
  }, [selectedVoice]);

  const voiceStats = [
    { title: 'Voice Models', value: '3', icon: Mic2, color: 'text-primary' },
    { title: 'Messages Sent', value: '1,247', icon: Users, color: 'text-accent' },
    { title: 'Success Rate', value: '94.2%', icon: TrendingUp, color: 'text-warning' }
  ];

  const handleDeleteVoice = async (voiceId: string) => {
    if (window.confirm('Are you sure you want to delete this voice?')) {
      await deleteVoice(voiceId);
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background flex w-full">
        <AppSidebar />
        <main className="flex-1">
          <div className="p-8">
            {/* Header */}
            <div className="mb-8 animate-fade-up">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold font-display text-text-primary">Voice Cloning Studio</h1>
                  <p className="text-text-muted">Create and manage your AI voice models for personalized outreach</p>
                </div>
                <Button 
                  className="bg-gradient-primary hover:shadow-primary hover-lift"
                  onClick={() => setShowRecorder(true)}
                >
                  <Mic2 className="h-4 w-4 mr-2" />
                  Record New Voice
                </Button>
              </div>
            </div>

            {/* Voice Models Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {voiceStats.map((stat, index) => (
                <Card key={index} className="glass border-border/50 hover:border-primary/20 transition-all hover-lift animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <stat.icon className={`h-5 w-5 ${stat.color}`} />
                    </div>
                    <div className="text-2xl font-bold text-text-primary mb-1">{stat.value}</div>
                    <div className="text-sm text-text-muted">{stat.title}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Tabs defaultValue="models" className="space-y-6">
              <TabsList className="bg-surface border border-border">
                <TabsTrigger value="models">Voice Models</TabsTrigger>
                <TabsTrigger value="recorder">Voice Recorder</TabsTrigger>
                <TabsTrigger value="outreach">Voice Outreach</TabsTrigger>
              </TabsList>

              <TabsContent value="models">
                <VoiceModels 
                  selectedVoiceId={selectedVoice?.voice_id}
                />
              </TabsContent>

              <TabsContent value="recorder">
                <VoiceRecorder onAudioReady={() => {}} />
              </TabsContent>

              <TabsContent value="outreach">
                <VoiceOutreach 
                  selectedVoiceId={selectedVoiceId || selectedVoice?.voice_id}
                  selectedVoiceName={selectedVoice?.name}
                />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default VoiceCloning;