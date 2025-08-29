import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Send, 
  Download, 
  Play, 
  Pause, 
  Volume2, 
  MessageCircle,
  Phone,
  Mail
} from 'lucide-react';
import { useElevenLabs } from '@/hooks/useElevenLabs';
import { toast } from 'sonner';

interface VoiceOutreachProps {
  selectedVoiceId?: string;
  selectedVoiceName?: string;
}

export const VoiceOutreach: React.FC<VoiceOutreachProps> = ({ 
  selectedVoiceId, 
  selectedVoiceName 
}) => {
  const [message, setMessage] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [generatedAudio, setGeneratedAudio] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioRef, setAudioRef] = useState<HTMLAudioElement | null>(null);
  
  const { generateSpeech, loading } = useElevenLabs();

  const generateVoiceMessage = async () => {
    if (!selectedVoiceId) {
      toast.error('Please select a voice first');
      return;
    }
    
    if (!message.trim()) {
      toast.error('Please enter a message');
      return;
    }

    try {
      // Create personalized message
      let personalizedMessage = message;
      if (recipientName) {
        personalizedMessage = personalizedMessage.replace('{name}', recipientName);
      }
      if (companyName) {
        personalizedMessage = personalizedMessage.replace('{company}', companyName);
      }

      const audioBase64 = await generateSpeech(personalizedMessage, selectedVoiceId);
      
      if (audioBase64) {
        setGeneratedAudio(audioBase64);
        toast.success('Voice message generated successfully!');
      }
    } catch (error) {
      console.error('Failed to generate voice message:', error);
      toast.error('Failed to generate voice message');
    }
  };

  const playAudio = () => {
    if (!generatedAudio) return;
    
    if (audioRef) {
      audioRef.pause();
      setAudioRef(null);
    }

    const audio = new Audio(`data:audio/mp3;base64,${generatedAudio}`);
    audio.onended = () => setIsPlaying(false);
    audio.onplay = () => setIsPlaying(true);
    
    setAudioRef(audio);
    audio.play();
  };

  const pauseAudio = () => {
    if (audioRef) {
      audioRef.pause();
      setIsPlaying(false);
    }
  };

  const downloadAudio = () => {
    if (!generatedAudio) return;
    
    const link = document.createElement('a');
    link.href = `data:audio/mp3;base64,${generatedAudio}`;
    link.download = `voice-message-${Date.now()}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('Audio file downloaded!');
  };

  const messageTemplates = [
    {
      title: 'Cold Sales Outreach',
      content: `Hi {name}, I hope you're doing well. I'm reaching out because I noticed {company} could benefit from our solutions. I'd love to schedule a quick 10-minute call to discuss how we can help you increase your ROI. Are you available this week?`
    },
    {
      title: 'Follow-up Message',
      content: `Hi {name}, I wanted to follow up on our previous conversation about {company}'s growth goals. I have some exciting updates that could really impact your business. When would be a good time for a brief call?`
    },
    {
      title: 'Partnership Proposal',
      content: `Hello {name}, I've been following {company}'s impressive growth and would love to explore a potential partnership opportunity. I believe our services could complement your offerings perfectly. Could we schedule a call this week?`
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-surface border-border">
        <CardHeader>
          <CardTitle className="text-xl text-text-primary flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-primary" />
            Voice Outreach Generator
          </CardTitle>
          <CardDescription className="text-text-muted">
            Create personalized voice messages for cold outreach automation
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {selectedVoiceId && (
            <div className="flex items-center gap-2 p-3 bg-primary/10 rounded-lg border border-primary/20">
              <Volume2 className="h-4 w-4 text-primary" />
              <span className="text-sm text-text-primary">
                Selected Voice: <strong>{selectedVoiceName}</strong>
              </span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="recipient">Recipient Name (Optional)</Label>
              <Input
                id="recipient"
                placeholder="John Doe"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                className="bg-background border-border"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="company">Company Name (Optional)</Label>
              <Input
                id="company"
                placeholder="ABC Corp"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="bg-background border-border"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Voice Message</Label>
            <Textarea
              id="message"
              placeholder="Enter your personalized message here... Use {name} and {company} for dynamic replacement."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[120px] bg-background border-border"
            />
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium text-text-primary">Quick Templates:</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {messageTemplates.map((template, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => setMessage(template.content)}
                  className="h-auto p-3 text-left border-border hover:bg-surface"
                >
                  <div>
                    <div className="font-medium text-xs text-primary">{template.title}</div>
                    <div className="text-xs text-text-muted mt-1 line-clamp-2">
                      {template.content.substring(0, 80)}...
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          <Button
            onClick={generateVoiceMessage}
            disabled={loading || !selectedVoiceId || !message.trim()}
            className="w-full bg-gradient-primary hover:shadow-primary hover-lift"
          >
            <Send className="h-4 w-4 mr-2" />
            {loading ? 'Generating Voice Message...' : 'Generate Voice Message'}
          </Button>
        </CardContent>
      </Card>

      {generatedAudio && (
        <Card className="bg-surface border-border">
          <CardHeader>
            <CardTitle className="text-lg text-text-primary">Generated Voice Message</CardTitle>
            <CardDescription className="text-text-muted">
              Your personalized voice message is ready for outreach
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="flex items-center justify-center space-x-4">
              <Button
                onClick={isPlaying ? pauseAudio : playAudio}
                className="bg-gradient-primary hover:shadow-primary"
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4 mr-2" />
                ) : (
                  <Play className="h-4 w-4 mr-2" />
                )}
                {isPlaying ? 'Pause' : 'Play'}
              </Button>
              
              <Button
                onClick={downloadAudio}
                variant="outline"
                className="border-border hover:bg-surface"
              >
                <Download className="h-4 w-4 mr-2" />
                Download MP3
              </Button>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-4 text-sm text-text-muted">
                <div className="flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  Perfect for cold calling
                </div>
                <div className="flex items-center gap-1">
                  <Mail className="h-3 w-3" />
                  Email voice attachments
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="h-3 w-3" />
                  Social media outreach
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};