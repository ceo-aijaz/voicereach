import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Clock,
  Activity,
  Server,
  Database,
  Zap,
  Globe,
  Shield,
  Bell
} from 'lucide-react';

const Status = () => {
  const services = [
    {
      name: "Voice Processing API",
      status: "operational",
      uptime: "99.99%",
      responseTime: "127ms",
      icon: Zap,
      description: "AI voice cloning and processing"
    },
    {
      name: "Authentication Service",
      status: "operational", 
      uptime: "99.98%",
      responseTime: "89ms",
      icon: Shield,
      description: "User login and security"
    },
    {
      name: "Database",
      status: "operational",
      uptime: "99.97%",
      responseTime: "45ms", 
      icon: Database,
      description: "Data storage and retrieval"
    },
    {
      name: "API Gateway",
      status: "maintenance",
      uptime: "99.95%",
      responseTime: "156ms",
      icon: Server,
      description: "API routing and management"
    },
    {
      name: "Email Service",
      status: "operational",
      uptime: "99.92%",
      responseTime: "234ms",
      icon: Globe,
      description: "Notification delivery"
    },
    {
      name: "Analytics Engine",
      status: "operational",
      uptime: "99.89%",
      responseTime: "78ms",
      icon: Activity,
      description: "Campaign metrics and reporting"
    }
  ];

  const incidents = [
    {
      id: 1,
      title: "Scheduled API Gateway Maintenance",
      status: "investigating",
      severity: "medium",
      startTime: "2024-01-15 14:30 UTC",
      description: "We are performing scheduled maintenance on our API gateway to improve performance and reliability.",
      updates: [
        {
          time: "14:45 UTC",
          message: "Maintenance is proceeding as planned. Some users may experience slightly slower response times."
        },
        {
          time: "14:30 UTC", 
          message: "Scheduled maintenance has begun."
        }
      ]
    },
    {
      id: 2,
      title: "Voice Processing Latency Resolved",
      status: "resolved",
      severity: "low",
      startTime: "2024-01-14 09:15 UTC",
      description: "Some users experienced increased latency in voice processing. This has been resolved.",
      updates: [
        {
          time: "10:30 UTC",
          message: "Issue has been fully resolved. Voice processing is back to normal speeds."
        },
        {
          time: "09:45 UTC",
          message: "We have identified the cause and are implementing a fix."
        },
        {
          time: "09:15 UTC",
          message: "We are investigating reports of slower voice processing times."
        }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'bg-accent/20 text-accent';
      case 'maintenance': return 'bg-warning/20 text-warning';
      case 'degraded': return 'bg-error/20 text-error';
      case 'outage': return 'bg-error text-error-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational': return <CheckCircle className="h-4 w-4" />;
      case 'maintenance': return <Clock className="h-4 w-4" />;
      case 'degraded': return <AlertTriangle className="h-4 w-4" />;
      case 'outage': return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-accent/20 text-accent';
      case 'medium': return 'bg-warning/20 text-warning';
      case 'high': return 'bg-error/20 text-error';
      case 'critical': return 'bg-error text-error-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const overallStatus = services.every(s => s.status === 'operational') ? 'operational' : 'issues';

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-background/95"></div>
        <div className="relative z-10 section-padding py-16">
          <div className="max-w-7xl mx-auto">
            <Link to="/" className="inline-flex items-center text-primary hover-scale mb-8">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
            
            <div className="text-center animate-fade-up">
              <Badge className={`mb-6 px-4 py-2 ${getStatusColor(overallStatus)} border-0`}>
                {getStatusIcon(overallStatus)}
                <span className="ml-2">
                  {overallStatus === 'operational' ? 'All Systems Operational' : 'Some Issues Detected'}
                </span>
              </Badge>
              <h1 className="text-5xl font-bold font-display text-text-primary mb-6">
                System Status
              </h1>
              <p className="text-xl text-text-muted max-w-3xl mx-auto">
                Real-time status and performance metrics for all VoiceLead services
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="section-padding py-16">
        <div className="max-w-7xl mx-auto">
          {/* Overall Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <Card className="glass border-border/50 animate-fade-up">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="h-6 w-6 text-accent" />
                </div>
                <p className="text-2xl font-bold text-text-primary">99.97%</p>
                <p className="text-sm text-text-muted">Overall Uptime</p>
              </CardContent>
            </Card>

            <Card className="glass border-border/50 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Activity className="h-6 w-6 text-primary" />
                </div>
                <p className="text-2xl font-bold text-text-primary">124ms</p>
                <p className="text-sm text-text-muted">Avg Response Time</p>
              </CardContent>
            </Card>

            <Card className="glass border-border/50 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-warning/20 to-warning/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Zap className="h-6 w-6 text-warning" />
                </div>
                <p className="text-2xl font-bold text-text-primary">1.2M</p>
                <p className="text-sm text-text-muted">Requests/Hour</p>
              </CardContent>
            </Card>

            <Card className="glass border-border/50 animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-error/20 to-error/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Globe className="h-6 w-6 text-error" />
                </div>
                <p className="text-2xl font-bold text-text-primary">0</p>
                <p className="text-sm text-text-muted">Active Incidents</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Service Status */}
            <div className="lg:col-span-2">
              <Card className="glass border-border/50 animate-fade-up">
                <CardHeader>
                  <CardTitle className="text-text-primary">Service Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {services.map((service, index) => (
                    <div key={service.name} className="flex items-center justify-between p-4 rounded-lg bg-surface/30 border border-border/50">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                          <service.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-text-primary">{service.name}</h4>
                          <p className="text-sm text-text-muted">{service.description}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="text-sm font-medium text-text-primary">{service.uptime}</p>
                          <p className="text-xs text-text-muted">Uptime</p>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-sm font-medium text-text-primary">{service.responseTime}</p>
                          <p className="text-xs text-text-muted">Response</p>
                        </div>
                        
                        <Badge className={`${getStatusColor(service.status)} border-0`}>
                          {getStatusIcon(service.status)}
                          <span className="ml-1 capitalize">{service.status}</span>
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Incident Timeline */}
            <div className="space-y-6">
              <Card className="glass border-border/50 animate-fade-up">
                <CardHeader>
                  <CardTitle className="flex items-center text-text-primary">
                    <AlertTriangle className="h-5 w-5 mr-2 text-warning" />
                    Recent Incidents
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {incidents.map((incident) => (
                    <div key={incident.id} className="p-4 rounded-lg bg-surface/30 border border-border/50">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-semibold text-text-primary text-sm">{incident.title}</h4>
                        <Badge className={`${getSeverityColor(incident.severity)} border-0 text-xs`}>
                          {incident.severity}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-text-muted mb-3">{incident.description}</p>
                      
                      <div className="space-y-2">
                        {incident.updates.slice(0, 2).map((update, index) => (
                          <div key={index} className="text-xs">
                            <span className="text-text-muted">{update.time}</span>
                            <p className="text-text-primary mt-1">{update.message}</p>
                          </div>
                        ))}
                      </div>
                      
                      <Badge className={`mt-3 ${incident.status === 'resolved' ? 'bg-accent/20 text-accent' : 'bg-warning/20 text-warning'} border-0 text-xs`}>
                        {incident.status === 'resolved' ? <CheckCircle className="h-3 w-3 mr-1" /> : <Clock className="h-3 w-3 mr-1" />}
                        {incident.status}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Notifications */}
              <Card className="glass border-border/50 animate-fade-up">
                <CardHeader>
                  <CardTitle className="text-text-primary">Get Updates</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-text-muted mb-4">
                    Subscribe to status updates and incident notifications.
                  </p>
                  <Button className="w-full bg-gradient-primary hover:shadow-primary hover-lift">
                    <Bell className="h-4 w-4 mr-2" />
                    Subscribe to Updates
                  </Button>
                  
                  <div className="mt-4 space-y-2 text-xs text-text-muted">
                    <p>• Real-time incident notifications</p>
                    <p>• Maintenance schedule alerts</p>
                    <p>• Performance updates</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Historical Data */}
          <Card className="glass border-border/50 mt-12 animate-fade-up">
            <CardHeader>
              <CardTitle className="text-text-primary">90-Day Uptime History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-90 gap-1 mb-4">
                {Array.from({ length: 90 }, (_, i) => (
                  <div key={i} className={`h-4 rounded-sm ${Math.random() > 0.05 ? 'bg-accent' : 'bg-error'}`} />
                ))}
              </div>
              <div className="flex items-center justify-between text-sm text-text-muted">
                <span>90 days ago</span>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-accent rounded-sm mr-2" />
                    <span>Operational</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-warning rounded-sm mr-2" />
                    <span>Issues</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-error rounded-sm mr-2" />
                    <span>Outage</span>
                  </div>
                </div>
                <span>Today</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Status;