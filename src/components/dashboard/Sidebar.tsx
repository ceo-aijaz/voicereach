import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  Instagram, 
  MessageSquare, 
  Mic2, 
  Settings, 
  Crown,
  TrendingUp,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Leads', href: '/leads', icon: Users },
  { name: 'Instagram Accounts', href: '/instagram', icon: Instagram },
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
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleSignOut = () => {
    signOut();
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-sidebar border-r border-sidebar-border">
      {/* Logo */}
      <div className="flex items-center h-16 px-6 border-b border-sidebar-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Mic2 className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold font-display text-sidebar-foreground">VoiceLead</span>
        </div>
      </div>

      {/* User Info */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
            <span className="text-white font-semibold">
              {user?.email?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">
              {user?.email}
            </p>
            <p className="text-xs text-sidebar-foreground/60">Free Plan</p>
          </div>
        </div>
        <Link to="/upgrade">
          <Button size="sm" className="w-full bg-gradient-primary hover:shadow-primary">
            <Crown className="h-4 w-4 mr-2" />
            Upgrade Plan
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
                'flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all hover-scale',
                isActive
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground shadow-sm'
                  : 'text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50'
              )}
              onClick={() => setIsMobileOpen(false)}
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.name}
              {item.name === 'Campaigns' && (
                <Badge className="ml-auto bg-accent/20 text-accent text-xs">3</Badge>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Sign Out */}
      <div className="p-4 border-t border-sidebar-border">
        <Button
          variant="ghost"
          onClick={handleSignOut}
          className="w-full justify-start text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
        >
          <LogOut className="h-5 w-5 mr-3" />
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
        className="lg:hidden fixed top-4 left-4 z-50 bg-background/80 backdrop-blur-sm"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Desktop Sidebar */}
      <div className={cn("hidden lg:flex w-64 h-screen fixed left-0 top-0 z-40", className)}>
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      {isMobileOpen && (
        <>
          <div className="lg:hidden fixed inset-0 z-40 bg-background/80 backdrop-blur-sm" onClick={() => setIsMobileOpen(false)} />
          <div className="lg:hidden fixed left-0 top-0 z-50 w-64 h-screen">
            <SidebarContent />
          </div>
        </>
      )}
    </>
  );
};