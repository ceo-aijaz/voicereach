import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
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
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleSignOut = () => {
    signOut();
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      {/* Logo */}
      <div className="flex items-center h-16 px-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Mic2 className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">VoiceLead</span>
        </div>
      </div>

      {/* User Info */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-semibold text-sm">
              {user?.email?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user?.email}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary" className="text-xs px-2 py-0.5">
                Free Plan
              </Badge>
            </div>
          </div>
        </div>
        <Link to="/upgrade">
          <Button size="sm" className="w-full bg-primary hover:bg-primary/90 text-white font-medium transition-colors">
            <Crown className="h-4 w-4 mr-2" />
            Upgrade Plan
          </Button>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors group',
                isActive
                  ? 'bg-primary text-white'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
              )}
              onClick={() => setIsMobileOpen(false)}
            >
              <item.icon className="h-5 w-5 mr-3" />
              <span>{item.name}</span>
              {item.name === 'Campaigns' && (
                <Badge variant="secondary" className="ml-auto text-xs">3</Badge>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Sign Out */}
      <div className="p-4 border-t border-gray-200">
        <Button
          variant="ghost"
          onClick={handleSignOut}
          className="w-full justify-start text-gray-700 hover:text-red-600 hover:bg-red-50 transition-colors"
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