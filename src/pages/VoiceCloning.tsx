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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { VoiceRecorder } from '@/components/voice/VoiceRecorder';

import { VoiceModels } from '@/components/voice/VoiceModels';
import { VoiceOutreach } from '@/components/voice/VoiceOutreach';
import { useElevenLabs, Voice } from '@/hooks/useElevenLabs';
import { 
  Mic2, 
  Play, 
  Download,
  Plus,
  Radio,
  Volume2,
  Trash2,
  Zap,
  Settings
} from 'lucide-react';
import { toast } from 'sonner';

const VoiceCloning = () => {
  const [selectedVoice, setSelectedVoice] = useState<Voice | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioBase64, setAudioBase64] = useState<string>('');
  const [voiceName, setVoiceName] = useState('');
  const [voiceDescription, setVoiceDescription] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [testText, setTestText] = useState('');
  const [selectedVoiceId, setSelectedVoiceId] = useState<string | null>(null);
  const [generatedAudioUrl, setGeneratedAudioUrl] = useState<string | null>(null);
  
  const { voices, loading, cloneVoice, generateSpeech, deleteVoice, fetchVoices } = useElevenLabs();

  useEffect(() => {
    fetchVoices();
  }, [fetchVoices]);

  const handleAudioReady = (blob: Blob, base64: string) => {
    setAudioBlob(blob);
    setAudioBase64(base64);
  };

  const handleCreateVoice = async () => {
    if (!voiceName || !audioBase64) {
      toast.error('Please provide a voice name and record/upload audio');
      return;
    }

    const result = await cloneVoice(voiceName, audioBase64, voiceDescription);
    if (result) {
      setIsCreateDialogOpen(false);
      setVoiceName('');
      setVoiceDescription('');
      setAudioBlob(null);
      setAudioBase64('');
    }
  };

  const handleGenerateTest = async () => {
    const voiceId = selectedVoiceId || selectedVoice?.voice_id;
    if (!voiceId || !testText) {
      toast.error('Please select a voice and enter test text');
      return;
    }

    const audioUrl = await generateSpeech(testText, voiceId);
    if (audioUrl) {
      if (generatedAudioUrl) {
        URL.revokeObjectURL(generatedAudioUrl);
      }
      setGeneratedAudioUrl(audioUrl);
    }
  };

  const playGeneratedAudio = () => {
    if (generatedAudioUrl) {
      const audio = new Audio(generatedAudioUrl);
      audio.play();
    }
  };

  const handleDeleteVoice = async (voiceId: string) => {
    if (window.confirm('Are you sure you want to delete this voice?')) {
      await deleteVoice(voiceId);
    }
  };


  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background flex w-full">
        <AppSidebar />
        <main className="flex-1 p-8">
          {/* Content here */}
        </main>
      </div>
    </SidebarProvider>
  );
      
      <div className="lg:ml-64">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8 animate-fade-up">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold font-display text-text-primary">AI Voice Studio</h1>
                <p className="text-text-muted">Create, clone, and generate professional AI voices with ElevenLabs</p>
              </div>
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-primary hover:shadow-primary hover-lift">
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Voice
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Create New Voice Clone</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="voice-name" className="text-text-primary">Voice Name</Label>
                          <Input
                            id="voice-name"
                            value={voiceName}
                            onChange={(e) => setVoiceName(e.target.value)}
                            placeholder="e.g., My Sales Voice"
                            className="bg-surface border-border"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label className="text-text-primary">Description</Label>
                          <Textarea
                            value={voiceDescription}
                            onChange={(e) => setVoiceDescription(e.target.value)}
                            placeholder="Describe the tone and use case for this voice..."
                            className="bg-surface border-border min-h-[80px]"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <VoiceRecorder
                          onAudioReady={handleAudioReady}
                          onReset={() => {
                            setAudioBlob(null);
                            setAudioBase64('');
                          }}
                        />
                      </div>
                    </div>
                    
                    <Button
                      onClick={handleCreateVoice}
                      disabled={loading || !voiceName || !audioBase64}
                      className="w-full bg-gradient-primary hover:shadow-primary"
                    >
                      <Zap className="h-4 w-4 mr-2" />
                      {loading ? 'Creating Voice...' : 'Create Voice Clone'}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <Tabs defaultValue="models" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="models">Voice Models</TabsTrigger>
              <TabsTrigger value="clone">My Voices</TabsTrigger>
              <TabsTrigger value="outreach">Voice Outreach</TabsTrigger>
            </TabsList>

            <TabsContent value="models">
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <VoiceModels 
                    onSelectVoice={(voice) => setSelectedVoiceId(voice.id)}
                    selectedVoiceId={selectedVoiceId || undefined}
                  />
                </div>
                
                <div className="space-y-6">
                  <Card className="glass border-border/50">
                    <CardHeader>
                      <CardTitle className="text-text-primary">Test Voice</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {selectedVoiceId ? (
                        <>
                          <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                            <div className="flex items-center space-x-2 mb-1">
                              <Volume2 className="h-4 w-4 text-primary" />
                              <span className="text-sm font-medium text-text-primary">Selected Voice</span>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label className="text-text-primary">Test Text</Label>
                            <Textarea
                              value={testText}
                              onChange={(e) => setTestText(e.target.value)}
                              placeholder="Enter text to generate speech..."
                              className="bg-surface border-border min-h-[100px]"
                            />
                          </div>
                          
                          <Button
                            onClick={handleGenerateTest}
                            disabled={loading || !testText}
                            className="w-full bg-gradient-primary hover:shadow-primary"
                          >
                            <Volume2 className="h-4 w-4 mr-2" />
                            {loading ? 'Generating...' : 'Generate Speech'}
                          </Button>
                          
                          {generatedAudioUrl && (
                            <div className="flex items-center space-x-2">
                              <Button
                                onClick={playGeneratedAudio}
                                variant="outline"
                                className="flex-1 border-border hover:bg-surface"
                              >
                                <Play className="h-4 w-4 mr-2" />
                                Play Audio
                              </Button>
                              <Button
                                onClick={() => {
                                  const a = document.createElement('a');
                                  a.href = generatedAudioUrl;
                                  a.download = `generated-voice.mp3`;
                                  a.click();
                                }}
                                variant="outline"
                                size="sm"
                                className="border-border hover:bg-surface"
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="text-center py-8">
                          <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
                            <Volume2 className="h-6 w-6 text-muted-foreground" />
                          </div>
                          <p className="text-text-muted">Select a voice model to test speech generation</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="clone">
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <Card className="glass border-border/50">
                    <CardHeader>
                      <CardTitle className="text-text-primary flex items-center justify-between">
                        Your Voice Library
                        <Badge variant="outline" className="border-primary/30 text-primary">
                          {voices.length} voices
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {loading ? (
                        <div className="text-center py-12">
                          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                            <Radio className="h-8 w-8 text-primary" />
                          </div>
                          <p className="text-text-muted">Loading your voices...</p>
                        </div>
                      ) : voices.length === 0 ? (
                        <div className="text-center py-12">
                          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Mic2 className="h-8 w-8 text-primary" />
                          </div>
                          <h3 className="text-lg font-semibold text-text-primary mb-2">No voice clones yet</h3>
                          <p className="text-text-muted mb-4">Get started by creating your first AI voice clone</p>
                          <Button 
                            onClick={() => setIsCreateDialogOpen(true)}
                            className="bg-gradient-primary hover:shadow-primary hover-lift"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Create Your First Voice
                          </Button>
                        </div>
                      ) : (
                        <div className="grid gap-4">
                          {voices.map((voice) => (
                            <Card key={voice.voice_id} className={`border transition-all hover:border-primary/30 ${
                              selectedVoice?.voice_id === voice.voice_id ? 'ring-2 ring-primary/20 border-primary/50' : 'border-border/50'
                            }`}>
                              <CardContent className="p-4">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-3 mb-2">
                                      <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                                        <Volume2 className="h-5 w-5 text-primary" />
                                      </div>
                                      <div>
                                        <h4 className="font-medium text-text-primary">{voice.name}</h4>
                                        {voice.description && (
                                          <p className="text-sm text-text-muted">{voice.description}</p>
                                        )}
                                      </div>
                                    </div>
                                    
                                    <div className="flex items-center space-x-2 mt-3">
                                      <Button
                                        onClick={() => setSelectedVoice(voice)}
                                        variant={selectedVoice?.voice_id === voice.voice_id ? "default" : "outline"}
                                        size="sm"
                                        className={selectedVoice?.voice_id === voice.voice_id ? 
                                          "bg-gradient-primary hover:shadow-primary" : 
                                          "border-border hover:bg-surface"
                                        }
                                      >
                                        {selectedVoice?.voice_id === voice.voice_id ? 'Selected' : 'Select'}
                                      </Button>
                                      
                                      <Button
                                        onClick={() => handleDeleteVoice(voice.voice_id)}
                                        variant="outline"
                                        size="sm"
                                        className="border-border hover:bg-surface text-destructive hover:text-destructive"
                                      >
                                        <Trash2 className="h-3 w-3" />
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card className="glass border-border/50">
                    <CardHeader>
                      <CardTitle className="text-text-primary">Test Voice</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {selectedVoice ? (
                        <>
                          <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                            <div className="flex items-center space-x-2 mb-1">
                              <Volume2 className="h-4 w-4 text-primary" />
                              <span className="text-sm font-medium text-text-primary">{selectedVoice.name}</span>
                            </div>
                            {selectedVoice.description && (
                              <p className="text-xs text-text-muted">{selectedVoice.description}</p>
                            )}
                          </div>
                          
                          <div className="space-y-2">
                            <Label className="text-text-primary">Test Text</Label>
                            <Textarea
                              value={testText}
                              onChange={(e) => setTestText(e.target.value)}
                              placeholder="Enter text to generate speech..."
                              className="bg-surface border-border min-h-[100px]"
                            />
                          </div>
                          
                          <Button
                            onClick={handleGenerateTest}
                            disabled={loading || !testText}
                            className="w-full bg-gradient-primary hover:shadow-primary"
                          >
                            <Volume2 className="h-4 w-4 mr-2" />
                            {loading ? 'Generating...' : 'Generate Speech'}
                          </Button>
                          
                          {generatedAudioUrl && (
                            <div className="flex items-center space-x-2">
                              <Button
                                onClick={playGeneratedAudio}
                                variant="outline"
                                className="flex-1 border-border hover:bg-surface"
                              >
                                <Play className="h-4 w-4 mr-2" />
                                Play Generated Audio
                              </Button>
                              <Button
                                onClick={() => {
                                  const a = document.createElement('a');
                                  a.href = generatedAudioUrl;
                                  a.download = `${selectedVoice.name}-generated.mp3`;
                                  a.click();
                                }}
                                variant="outline"
                                size="sm"
                                className="border-border hover:bg-surface"
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="text-center py-8">
                          <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
                            <Volume2 className="h-6 w-6 text-muted-foreground" />
                          </div>
                          <p className="text-text-muted">Select a voice to test speech generation</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="outreach">
              <VoiceOutreach 
                selectedVoiceId={selectedVoiceId || selectedVoice?.voice_id}
                selectedVoiceName={selectedVoice?.name}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default VoiceCloning;