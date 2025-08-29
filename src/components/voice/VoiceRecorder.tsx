import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Mic2, 
  Square, 
  Play, 
  Pause, 
  Trash2,
  Upload,
  Volume2 
} from 'lucide-react';
import { toast } from 'sonner';

interface VoiceRecorderProps {
  onAudioReady: (audioBlob: Blob, base64: string) => void;
  onReset?: () => void;
}

export const VoiceRecorder: React.FC<VoiceRecorderProps> = ({ 
  onAudioReady, 
  onReset 
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100,
        }
      });

      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });
      
      chunksRef.current = [];
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm;codecs=opus' });
        const url = URL.createObjectURL(blob);
        setAudioBlob(blob);
        setAudioUrl(url);
        
        // Convert to base64 for API
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64 = reader.result as string;
          const base64Data = base64.split(',')[1]; // Remove data:audio/webm;base64, prefix
          onAudioReady(blob, base64Data);
        };
        reader.readAsDataURL(blob);
        
        // Clean up stream
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      intervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
      toast.success('Recording started');
    } catch (error) {
      console.error('Failed to start recording:', error);
      toast.error('Failed to access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      
      toast.success('Recording stopped');
    }
  };

  const playAudio = () => {
    if (audioUrl) {
      if (audioRef.current) {
        audioRef.current.play();
        setIsPlaying(true);
      } else {
        audioRef.current = new Audio(audioUrl);
        audioRef.current.onended = () => setIsPlaying(false);
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const resetRecording = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    
    setAudioBlob(null);
    setAudioUrl(null);
    setIsPlaying(false);
    setRecordingTime(0);
    
    if (onReset) {
      onReset();
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('audio/')) {
        toast.error('Please select an audio file');
        return;
      }

      const url = URL.createObjectURL(file);
      setAudioBlob(file);
      setAudioUrl(url);
      
      // Convert to base64 for API
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        const base64Data = base64.split(',')[1]; // Remove data prefix
        onAudioReady(file, base64Data);
      };
      reader.readAsDataURL(file);
      
      toast.success('Audio file uploaded successfully');
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (audioBlob) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-center space-x-3">
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
            onClick={resetRecording}
            variant="outline"
            className="border-border hover:bg-surface"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
        
        <div className="text-center">
          <p className="text-sm text-text-muted">
            Duration: {formatTime(recordingTime)}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-center p-8 border-2 border-dashed border-border rounded-lg">
        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mic2 className="h-8 w-8 text-primary" />
        </div>
        
        {isRecording ? (
          <div className="space-y-3">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-3 h-3 bg-destructive rounded-full animate-pulse"></div>
              <span className="text-text-primary">Recording: {formatTime(recordingTime)}</span>
            </div>
            
            <Progress value={(recordingTime / 300) * 100} className="max-w-xs mx-auto" />
            
            <Button
              onClick={stopRecording}
              className="bg-destructive hover:bg-destructive/90"
            >
              <Square className="h-4 w-4 mr-2" />
              Stop Recording
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <Button
              onClick={startRecording}
              className="bg-gradient-primary hover:shadow-primary hover-lift"
            >
              <Mic2 className="h-4 w-4 mr-2" />
              Start Recording
            </Button>
            
            <div className="text-xs text-text-muted">
              Or upload an audio file
            </div>
            
            <Button 
              variant="outline" 
              className="border-border hover:bg-surface"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Audio
            </Button>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="audio/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        )}
      </div>
      
      <div className="text-xs text-text-muted p-3 bg-primary/10 rounded-lg border border-primary/20">
        💡 For best results, record 2-5 minutes of clear speech in a quiet environment. Read naturally and vary your tone.
      </div>
    </div>
  );
};