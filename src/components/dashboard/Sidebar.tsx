import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useRealTimeData } from '@/hooks/useRealTimeData';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  LayoutDashboard, 
  Users, 
  Facebook, 
  MessageSquare, 
  Mic2, 
  Settings, 
  Crown,
  TrendingUp,
  LogOut,
  Menu,
  X,
  Sparkles
} from 'lucide-react';
import { useState } from 'react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Leads', href: '/leads', icon: Users },
  { name: 'Facebook Accounts', href: '/facebook', icon: Facebook },
  { name: 'Campaigns', href: '/campaigns', icon: MessageSquare },
  { name: 'Voice Cloning', href: '/voice', icon: Mic2 },
  { name: 'Analytics', href: '/analytics', icon: TrendingUp },
  { name: 'Settings', href: '/settings', icon: Settings },
];

interface SidebarProps {
  className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
  const location = useLocation();
  const { signOut, user } = useAuth();
  const { campaigns } = useRealTimeData();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleSignOut = () => {
    signOut();
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-sidebar/95 backdrop-blur-xl border-r border-sidebar-border/50 glass">
      {/* Logo */}
      <div className="flex items-center h-16 px-6 border-b border-sidebar-border/30">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow hover-scale">
            <Mic2 className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold font-display text-sidebar-foreground">VoiceLead</span>
        </div>
      </div>

      {/* User Info */}
      <div className="p-6 border-b border-sidebar-border/30">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary via-primary-glow to-accent rounded-xl flex items-center justify-center shadow-glow ring-2 ring-primary/20 hover-scale">
            <span className="text-white font-bold text-lg">
              {user?.email?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-sidebar-foreground truncate">
              {user?.email}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <Badge className="text-xs bg-warning/20 text-warning border-warning/30 px-2 py-0.5">
                Free Plan
              </Badge>
            </div>
          </div>
        </div>
        <Link to="/upgrade">
          <Button size="sm" className="w-full bg-gradient-primary hover:shadow-premium text-white font-semibold hover-lift transition-all duration-300 rounded-xl">
            <Crown className="h-4 w-4 mr-2" />
            Upgrade Plan
            <Sparkles className="h-4 w-4 ml-2" />
          </Button>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 hover-lift group relative overflow-hidden',
                isActive
                  ? 'bg-gradient-primary text-white shadow-glow'
                  : 'text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50'
              )}
              onClick={() => setIsMobileOpen(false)}
            >
              <item.icon className={cn(
                "h-5 w-5 mr-3 transition-all duration-300",
                isActive ? "text-white scale-110" : "group-hover:scale-110"
              )} />
              <span className="relative z-10">{item.name}</span>
              {item.name === 'Campaigns' && campaigns.length > 0 && (
                <Badge className="ml-auto bg-accent/20 text-accent text-xs border-accent/30 hover-scale">{campaigns.length}</Badge>
              )}
              {!isActive && (
                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Sign Out */}
      <div className="p-4 border-t border-sidebar-border/30">
        <Button
          variant="ghost"
          onClick={handleSignOut}
          className="w-full justify-start text-sidebar-foreground/70 hover:text-error hover:bg-error/10 rounded-xl transition-all duration-300 hover-lift group"
        >
          <LogOut className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
          Sign Out
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "lg:hidden fixed top-4 left-4 z-50 glass border border-border/50 shadow-glow hover-lift transition-all duration-300",
          isMobileOpen && "rotate-90"
        )}
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? (
          <X className="h-5 w-5 text-error" />
        ) : (
          <Menu className="h-5 w-5 text-primary" />
        )}
      </Button>

      {/* Desktop Sidebar */}
      <div className={cn("hidden lg:flex w-64 h-screen fixed left-0 top-0 z-40", className)}>
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      {isMobileOpen && (
        <>
          <div 
            className="lg:hidden fixed inset-0 z-40 bg-background/60 backdrop-blur-md animate-fade-in" 
            onClick={() => setIsMobileOpen(false)} 
          />
          <div className="lg:hidden fixed left-0 top-0 z-50 w-72 h-screen animate-slide-in-left">
            <SidebarContent />
          </div>
        </>
      )}
    </>
  );
};