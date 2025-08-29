import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  MessageSquare, 
  Mic2, 
  Mail, 
  Clock, 
  Settings,
  Trash2,
  ArrowUp,
  ArrowDown,
  Copy,
  Play,
  Pause,
  Edit
} from 'lucide-react';
// DragDropContext removed for now - will implement native drag/drop later
import { useToast } from '@/hooks/use-toast';

interface Sequence {
  id: string;
  name: string;
  description?: string;
  status: string;
  sequence_order: number;
  delay_hours: number;
  steps?: SequenceStep[];
}

interface SequenceStep {
  id: string;
  step_type: 'message' | 'voice_note' | 'email' | 'follow_up' | 'delay';
  step_order: number;
  content?: string;
  voice_id?: string;
  voice_model?: string;
  delay_hours?: number;
  conditions: any;
  settings: any;
  is_active: boolean;
}

interface SequenceBuilderProps {
  campaignId?: string;
  sequences?: Sequence[];
  onCreateSequence: (sequence: Partial<Sequence>) => Promise<void>;
  onUpdateSequence: (id: string, updates: Partial<Sequence>) => Promise<void>;
  onDeleteSequence: (id: string) => Promise<void>;
}

export const SequenceBuilder: React.FC<SequenceBuilderProps> = ({
  campaignId,
  sequences = [],
  onCreateSequence,
  onUpdateSequence,
  onDeleteSequence
}) => {
  const { toast } = useToast();
  const [selectedSequence, setSelectedSequence] = useState<Sequence | null>(null);
  const [isCreatingSequence, setIsCreatingSequence] = useState(false);
  const [isEditingStep, setIsEditingStep] = useState<SequenceStep | null>(null);
  
  const [sequenceForm, setSequenceForm] = useState({
    name: '',
    description: '',
    delay_hours: 24
  });

  const [stepForm, setStepForm] = useState<{
    step_type: 'message' | 'voice_note' | 'email' | 'follow_up' | 'delay';
    content: string;
    voice_id: string;
    voice_model: string;
    delay_hours: number;
    conditions: any;
    settings: any;
  }>({
    step_type: 'message',
    content: '',
    voice_id: '',
    voice_model: 'eleven_multilingual_v2',
    delay_hours: 0,
    conditions: {},
    settings: {}
  });

  const handleCreateSequence = async () => {
    try {
      await onCreateSequence({
        ...sequenceForm,
        sequence_order: sequences.length + 1,
        status: 'draft'
      });
      setSequenceForm({ name: '', description: '', delay_hours: 24 });
      setIsCreatingSequence(false);
      toast({
        title: "Sequence Created",
        description: "Your new sequence has been created successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create sequence. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleAddStep = async (sequenceId: string) => {
    try {
      const newStep = {
        ...stepForm,
        step_order: selectedSequence?.steps?.length || 0 + 1,
        is_active: true
      };
      
      // This would call an API to add the step
      toast({
        title: "Step Added",
        description: "New step has been added to the sequence.",
      });
      setStepForm({
        step_type: 'message',
        content: '',
        voice_id: '',
        voice_model: 'eleven_multilingual_v2',
        delay_hours: 0,
        conditions: {},
        settings: {}
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add step. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getStepIcon = (stepType: string) => {
    switch (stepType) {
      case 'message': return <MessageSquare className="h-4 w-4" />;
      case 'voice_note': return <Mic2 className="h-4 w-4" />;
      case 'email': return <Mail className="h-4 w-4" />;
      case 'delay': return <Clock className="h-4 w-4" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getStepColor = (stepType: string) => {
    switch (stepType) {
      case 'message': return 'bg-primary/20 text-primary';
      case 'voice_note': return 'bg-accent/20 text-accent';
      case 'email': return 'bg-warning/20 text-warning';
      case 'delay': return 'bg-muted text-muted-foreground';
      default: return 'bg-primary/20 text-primary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Sequence Builder</h2>
          <p className="text-text-muted">Create multi-step automation sequences for your campaign</p>
        </div>
        
        <Dialog open={isCreatingSequence} onOpenChange={setIsCreatingSequence}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary hover:shadow-primary hover-lift">
              <Plus className="h-4 w-4 mr-2" />
              New Sequence
            </Button>
          </DialogTrigger>
          
          <DialogContent className="glass border-border/50">
            <DialogHeader>
              <DialogTitle>Create New Sequence</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="sequenceName">Sequence Name</Label>
                <Input
                  id="sequenceName"
                  value={sequenceForm.name}
                  onChange={(e) => setSequenceForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter sequence name"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="sequenceDescription">Description</Label>
                <Textarea
                  id="sequenceDescription"
                  value={sequenceForm.description}
                  onChange={(e) => setSequenceForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe this sequence"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="delayHours">Delay Before Starting (Hours)</Label>
                <Input
                  id="delayHours"
                  type="number"
                  value={sequenceForm.delay_hours}
                  onChange={(e) => setSequenceForm(prev => ({ ...prev, delay_hours: parseInt(e.target.value) }))}
                  className="mt-1"
                />
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreatingSequence(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateSequence} className="bg-gradient-primary">
                  Create Sequence
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Sequences Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sequences List */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-lg font-semibold text-text-primary">Sequences ({sequences.length})</h3>
          
          {sequences.map((sequence) => (
            <Card 
              key={sequence.id} 
              className={`glass border-border/50 cursor-pointer transition-all hover-lift ${
                selectedSequence?.id === sequence.id ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setSelectedSequence(sequence)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge className={
                    sequence.status === 'active' ? 'bg-accent/20 text-accent' :
                    sequence.status === 'paused' ? 'bg-warning/20 text-warning' :
                    'bg-muted text-muted-foreground'
                  }>
                    {sequence.status}
                  </Badge>
                  
                  <div className="flex items-center space-x-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle edit
                      }}
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteSequence(sequence.id);
                      }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                
                <h4 className="font-semibold text-text-primary mb-1">{sequence.name}</h4>
                <p className="text-sm text-text-muted mb-2">{sequence.description}</p>
                
                <div className="flex items-center justify-between text-xs text-text-muted">
                  <span>{sequence.steps?.length || 0} steps</span>
                  <span>Delay: {sequence.delay_hours}h</span>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {sequences.length === 0 && (
            <Card className="glass border-border/50">
              <CardContent className="p-8 text-center">
                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-text-primary mb-2">No Sequences Yet</h3>
                <p className="text-text-muted mb-4">Create your first sequence to get started</p>
                <Button 
                  onClick={() => setIsCreatingSequence(true)}
                  className="bg-gradient-primary hover:shadow-primary"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Sequence
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sequence Steps Editor */}
        <div className="lg:col-span-2">
          {selectedSequence ? (
            <Card className="glass border-border/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    <span>{selectedSequence.name}</span>
                  </CardTitle>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-gradient-primary hover:shadow-primary">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Step
                      </Button>
                    </DialogTrigger>
                    
                    <DialogContent className="glass border-border/50 max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Add New Step</DialogTitle>
                      </DialogHeader>
                      
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="stepType">Step Type</Label>
                          <Select
                            value={stepForm.step_type}
                            onValueChange={(value: any) => setStepForm(prev => ({ ...prev, step_type: value }))}
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="message">Message</SelectItem>
                              <SelectItem value="voice_note">Voice Note</SelectItem>
                              <SelectItem value="email">Email</SelectItem>
                              <SelectItem value="delay">Delay</SelectItem>
                              <SelectItem value="follow_up">Follow Up</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        {(stepForm.step_type === 'message' || stepForm.step_type === 'voice_note' || stepForm.step_type === 'email' || stepForm.step_type === 'follow_up') && (
                          <div>
                            <Label htmlFor="stepContent">Content</Label>
                            <Textarea
                              id="stepContent"
                              value={stepForm.content}
                              onChange={(e) => setStepForm(prev => ({ ...prev, content: e.target.value }))}
                              placeholder="Enter your message content. Use {firstName}, {company}, etc. for personalization"
                              className="mt-1 min-h-[120px]"
                            />
                          </div>
                        )}
                        
                        {stepForm.step_type === 'voice_note' && (
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="voiceId">Voice ID</Label>
                              <Input
                                id="voiceId"
                                value={stepForm.voice_id}
                                onChange={(e) => setStepForm(prev => ({ ...prev, voice_id: e.target.value }))}
                                placeholder="ElevenLabs Voice ID"
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <Label htmlFor="voiceModel">Voice Model</Label>
                              <Select
                                value={stepForm.voice_model}
                                onValueChange={(value) => setStepForm(prev => ({ ...prev, voice_model: value }))}
                              >
                                <SelectTrigger className="mt-1">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="eleven_multilingual_v2">Multilingual v2</SelectItem>
                                  <SelectItem value="eleven_turbo_v2_5">Turbo v2.5</SelectItem>
                                  <SelectItem value="eleven_turbo_v2">Turbo v2</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        )}
                        
                        <div>
                          <Label htmlFor="stepDelay">Delay After This Step (Hours)</Label>
                          <Input
                            id="stepDelay"
                            type="number"
                            value={stepForm.delay_hours}
                            onChange={(e) => setStepForm(prev => ({ ...prev, delay_hours: parseInt(e.target.value) }))}
                            className="mt-1"
                          />
                        </div>
                        
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline">Cancel</Button>
                          <Button 
                            onClick={() => handleAddStep(selectedSequence.id)}
                            className="bg-gradient-primary"
                          >
                            Add Step
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {selectedSequence.steps?.map((step, index) => (
                  <div key={step.id} className="flex items-center space-x-4 p-4 bg-surface rounded-lg border border-border/50">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold text-sm">
                        {index + 1}
                      </div>
                      <Badge className={getStepColor(step.step_type)}>
                        {getStepIcon(step.step_type)}
                        <span className="ml-1 capitalize">{step.step_type.replace('_', ' ')}</span>
                      </Badge>
                    </div>
                    
                    <div className="flex-1">
                      <p className="text-sm text-text-primary line-clamp-2">
                        {step.content || `${step.step_type} step`}
                      </p>
                      {step.delay_hours > 0 && (
                        <p className="text-xs text-text-muted mt-1">
                          Delay: {step.delay_hours} hours
                        </p>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="ghost">
                        <ArrowUp className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <ArrowDown className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
                
                {(!selectedSequence.steps || selectedSequence.steps.length === 0) && (
                  <div className="text-center py-8">
                    <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-text-primary mb-2">No Steps Yet</h3>
                    <p className="text-text-muted">Add your first step to build the sequence</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card className="glass border-border/50">
              <CardContent className="p-8 text-center">
                <Settings className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-text-primary mb-2">Select a Sequence</h3>
                <p className="text-text-muted">Choose a sequence from the left to edit its steps</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};