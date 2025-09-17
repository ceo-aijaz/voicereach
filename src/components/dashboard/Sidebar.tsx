import React, { createContext, useContext, useState } from 'react';
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

// Sidebar Context for collapse state
const SidebarContext = createContext<{
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}>({
  isCollapsed: false,
  setIsCollapsed: () => {}
});

export const useSidebar = () => useContext(SidebarContext);

// Sidebar Provider Component
export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  return (
    <SidebarContext.Provider value={{ isCollapsed, setIsCollapsed }}>
      {children}
    </SidebarContext.Provider>
  );
};

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
  const { isCollapsed } = useSidebar();

  const handleSignOut = () => {
    signOut();
  };

  const SidebarContent = () => (
    <div className={cn(
      "flex flex-col h-full bg-sidebar/95 backdrop-blur-xl border-r border-sidebar-border/50 glass transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Logo */}
      <div className="flex items-center h-16 px-6 border-b border-sidebar-border/30">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow hover-scale">
            <Mic2 className="h-5 w-5 text-white" />
          </div>
          {!isCollapsed && (
            <span className="text-xl font-bold font-display text-sidebar-foreground">VoiceLead</span>
          )}
        </div>
      </div>

      {/* User Info */}
      {!isCollapsed && (
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
      )}

      {/* Collapsed User Avatar */}
      {isCollapsed && (
        <div className="p-3 border-b border-sidebar-border/30 flex justify-center">
          <div className="w-10 h-10 bg-gradient-to-br from-primary via-primary-glow to-accent rounded-xl flex items-center justify-center shadow-glow ring-2 ring-primary/20 hover-scale">
            <span className="text-white font-bold text-sm">
              {user?.email?.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'flex items-center text-sm font-medium rounded-xl transition-all duration-300 hover-lift group relative overflow-hidden',
                isCollapsed ? 'px-3 py-3 justify-center' : 'px-4 py-3',
                isActive
                  ? 'bg-gradient-primary text-white shadow-glow'
                  : 'text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50'
              )}
              onClick={() => setIsMobileOpen(false)}
              title={isCollapsed ? item.name : undefined}
            >
              <item.icon className={cn(
                "h-5 w-5 transition-all duration-300",
                isCollapsed ? "" : "mr-3",
                isActive ? "text-white scale-110" : "group-hover:scale-110"
              )} />
              {!isCollapsed && (
                <>
                  <span className="relative z-10">{item.name}</span>
                  {item.name === 'Campaigns' && (
                    <Badge className="ml-auto bg-accent/20 text-accent text-xs border-accent/30 hover-scale">3</Badge>
                  )}
                </>
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
          className={cn(
            "w-full text-sidebar-foreground/70 hover:text-error hover:bg-error/10 rounded-xl transition-all duration-300 hover-lift group",
            isCollapsed ? "justify-center px-3" : "justify-start"
          )}
          title={isCollapsed ? "Sign Out" : undefined}
        >
          <LogOut className={cn(
            "h-5 w-5 group-hover:scale-110 transition-transform",
            isCollapsed ? "" : "mr-3"
          )} />
          {!isCollapsed && "Sign Out"}
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
      <div className={cn(
        "hidden lg:flex h-screen fixed left-0 top-0 z-40 transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
        className
      )}>
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