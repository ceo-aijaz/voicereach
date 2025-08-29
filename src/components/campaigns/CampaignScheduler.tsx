import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Play, Pause, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Campaign {
  id?: string;
  schedule_settings?: any;
  status?: string;
}

interface CampaignSchedulerProps {
  campaign?: Campaign;
  onUpdateSchedule: (settings: any) => void;
}

export const CampaignScheduler: React.FC<CampaignSchedulerProps> = ({
  campaign,
  onUpdateSchedule
}) => {
  const { toast } = useToast();
  
  const [scheduleSettings, setScheduleSettings] = useState({
    enabled: false,
    start_date: '',
    end_date: '',
    start_time: '09:00',
    end_time: '17:00',
    timezone: 'UTC',
    days_of_week: [1, 2, 3, 4, 5], // Monday to Friday
    max_daily_sends: 50,
    max_hourly_sends: 10,
    delay_between_sends: 5, // minutes
    auto_pause_on_errors: true,
    pause_on_weekends: true,
    respect_recipient_timezone: false,
    ...campaign?.schedule_settings
  });

  const handleUpdateSettings = (key: string, value: any) => {
    const newSettings = { ...scheduleSettings, [key]: value };
    setScheduleSettings(newSettings);
    onUpdateSchedule(newSettings);
  };

  const handleDayToggle = (day: number) => {
    const currentDays = scheduleSettings.days_of_week;
    const newDays = currentDays.includes(day)
      ? currentDays.filter(d => d !== day)
      : [...currentDays, day].sort();
    
    handleUpdateSettings('days_of_week', newDays);
  };

  const getDayName = (day: number) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[day];
  };

  const getScheduleStatus = () => {
    if (!scheduleSettings.enabled) return 'disabled';
    if (campaign?.status === 'active') return 'running';
    if (campaign?.status === 'paused') return 'paused';
    return 'scheduled';
  };

  const scheduleStatus = getScheduleStatus();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Campaign Scheduler</h2>
          <p className="text-text-muted">Configure when and how your campaign runs</p>
        </div>
        
        <Badge className={
          scheduleStatus === 'running' ? 'bg-accent/20 text-accent' :
          scheduleStatus === 'paused' ? 'bg-warning/20 text-warning' :
          scheduleStatus === 'scheduled' ? 'bg-primary/20 text-primary' :
          'bg-muted text-muted-foreground'
        }>
          <Clock className="h-3 w-3 mr-1" />
          {scheduleStatus.charAt(0).toUpperCase() + scheduleStatus.slice(1)}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Schedule Configuration */}
        <div className="space-y-6">
          {/* Basic Schedule Settings */}
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-primary" />
                <span>Schedule Settings</span>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="schedule-enabled" className="text-base font-medium">
                    Enable Scheduling
                  </Label>
                  <p className="text-sm text-text-muted">
                    Control when your campaign runs automatically
                  </p>
                </div>
                <Switch
                  id="schedule-enabled"
                  checked={scheduleSettings.enabled}
                  onCheckedChange={(checked) => handleUpdateSettings('enabled', checked)}
                />
              </div>
              
              {scheduleSettings.enabled && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="start-date">Start Date</Label>
                      <Input
                        id="start-date"
                        type="date"
                        value={scheduleSettings.start_date}
                        onChange={(e) => handleUpdateSettings('start_date', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="end-date">End Date (Optional)</Label>
                      <Input
                        id="end-date"
                        type="date"
                        value={scheduleSettings.end_date}
                        onChange={(e) => handleUpdateSettings('end_date', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="start-time">Start Time</Label>
                      <Input
                        id="start-time"
                        type="time"
                        value={scheduleSettings.start_time}
                        onChange={(e) => handleUpdateSettings('start_time', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="end-time">End Time</Label>
                      <Input
                        id="end-time"
                        type="time"
                        value={scheduleSettings.end_time}
                        onChange={(e) => handleUpdateSettings('end_time', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select
                      value={scheduleSettings.timezone}
                      onValueChange={(value) => handleUpdateSettings('timezone', value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UTC">UTC</SelectItem>
                        <SelectItem value="America/New_York">Eastern Time</SelectItem>
                        <SelectItem value="America/Chicago">Central Time</SelectItem>
                        <SelectItem value="America/Denver">Mountain Time</SelectItem>
                        <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                        <SelectItem value="Europe/London">London</SelectItem>
                        <SelectItem value="Europe/Paris">Paris</SelectItem>
                        <SelectItem value="Asia/Tokyo">Tokyo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Days of Week */}
          {scheduleSettings.enabled && (
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle>Active Days</CardTitle>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-7 gap-2">
                  {[0, 1, 2, 3, 4, 5, 6].map((day) => (
                    <Button
                      key={day}
                      variant={scheduleSettings.days_of_week.includes(day) ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleDayToggle(day)}
                      className={`text-xs ${
                        scheduleSettings.days_of_week.includes(day)
                          ? 'bg-gradient-primary hover:shadow-primary'
                          : ''
                      }`}
                    >
                      {getDayName(day).slice(0, 3)}
                    </Button>
                  ))}
                </div>
                <p className="text-sm text-text-muted mt-2 text-center">
                  Campaign will run on selected days only
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Rate Limiting & Advanced Settings */}
        <div className="space-y-6">
          {/* Rate Limiting */}
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5 text-primary" />
                <span>Rate Limiting</span>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="max-daily">Maximum Daily Sends</Label>
                <Input
                  id="max-daily"
                  type="number"
                  value={scheduleSettings.max_daily_sends}
                  onChange={(e) => handleUpdateSettings('max_daily_sends', parseInt(e.target.value))}
                  className="mt-1"
                />
                <p className="text-xs text-text-muted mt-1">
                  Total messages per day across all sequences
                </p>
              </div>
              
              <div>
                <Label htmlFor="max-hourly">Maximum Hourly Sends</Label>
                <Input
                  id="max-hourly"
                  type="number"
                  value={scheduleSettings.max_hourly_sends}
                  onChange={(e) => handleUpdateSettings('max_hourly_sends', parseInt(e.target.value))}
                  className="mt-1"
                />
                <p className="text-xs text-text-muted mt-1">
                  Messages per hour to avoid spam detection
                </p>
              </div>
              
              <div>
                <Label htmlFor="delay-sends">Delay Between Sends (minutes)</Label>
                <Input
                  id="delay-sends"
                  type="number"
                  value={scheduleSettings.delay_between_sends}
                  onChange={(e) => handleUpdateSettings('delay_between_sends', parseInt(e.target.value))}
                  className="mt-1"
                />
                <p className="text-xs text-text-muted mt-1">
                  Minimum time between individual messages
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Advanced Options */}
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle>Advanced Options</CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-pause" className="text-base font-medium">
                    Auto-pause on Errors
                  </Label>
                  <p className="text-sm text-text-muted">
                    Automatically pause if too many errors occur
                  </p>
                </div>
                <Switch
                  id="auto-pause"
                  checked={scheduleSettings.auto_pause_on_errors}
                  onCheckedChange={(checked) => handleUpdateSettings('auto_pause_on_errors', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="pause-weekends" className="text-base font-medium">
                    Pause on Weekends
                  </Label>
                  <p className="text-sm text-text-muted">
                    Automatically pause during weekends
                  </p>
                </div>
                <Switch
                  id="pause-weekends"
                  checked={scheduleSettings.pause_on_weekends}
                  onCheckedChange={(checked) => handleUpdateSettings('pause_on_weekends', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="recipient-timezone" className="text-base font-medium">
                    Respect Recipient Timezone
                  </Label>
                  <p className="text-sm text-text-muted">
                    Send messages based on recipient's timezone
                  </p>
                </div>
                <Switch
                  id="recipient-timezone"
                  checked={scheduleSettings.respect_recipient_timezone}
                  onCheckedChange={(checked) => handleUpdateSettings('respect_recipient_timezone', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Schedule Preview */}
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle>Schedule Preview</CardTitle>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-muted">Status:</span>
                  <Badge className={
                    scheduleStatus === 'running' ? 'bg-accent/20 text-accent' :
                    scheduleStatus === 'scheduled' ? 'bg-primary/20 text-primary' :
                    'bg-muted text-muted-foreground'
                  }>
                    {scheduleStatus.charAt(0).toUpperCase() + scheduleStatus.slice(1)}
                  </Badge>
                </div>
                
                {scheduleSettings.enabled && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-text-muted">Active Hours:</span>
                      <span className="text-text-primary">
                        {scheduleSettings.start_time} - {scheduleSettings.end_time}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-text-muted">Active Days:</span>
                      <span className="text-text-primary">
                        {scheduleSettings.days_of_week.map(day => getDayName(day).slice(0, 3)).join(', ')}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-text-muted">Daily Limit:</span>
                      <span className="text-text-primary">{scheduleSettings.max_daily_sends} messages</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-text-muted">Hourly Limit:</span>
                      <span className="text-text-primary">{scheduleSettings.max_hourly_sends} messages</span>
                    </div>
                  </>
                )}
                
                {!scheduleSettings.enabled && (
                  <div className="text-center py-4">
                    <p className="text-text-muted">Scheduling is disabled</p>
                    <p className="text-xs text-text-muted mt-1">
                      Campaign will run manually when launched
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};