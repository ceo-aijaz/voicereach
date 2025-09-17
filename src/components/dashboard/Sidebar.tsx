import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  SidebarProvider,
  useSidebar,
} from '@/components/ui/sidebar';
import { useAuth } from '@/contexts/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  MessageSquare, 
  Mail, 
  Star, 
  Settings, 
  Crown,
  LogOut,
  Sparkles,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Campaigns', href: '/campaigns', icon: MessageSquare },
  { name: 'Inbox', href: '/inbox', icon: Mail },
  { name: 'Leads', href: '/leads', icon: Users },
  { name: 'Team', href: '/team', icon: Users },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export const AppSidebar = () => {
  const location = useLocation();
  const { signOut, user } = useAuth();
  const { open, setOpen } = useSidebar();
  
  const handleSignOut = () => {
    signOut();
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar className={cn("border-r", open ? "w-60" : "w-14")} collapsible="icon">
      <SidebarContent className="bg-background">
        {/* Header with collapsible logo */}
        <div className={cn("flex items-center h-16 px-4 border-b", !open ? "justify-center" : "justify-between")}>
          {open && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">Dripify</span>
            </div>
          )}
          <SidebarTrigger />
        </div>

        {/* Navigation */}
        <SidebarGroup className="flex-1 p-2">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigation.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild className={cn(
                    "w-full justify-start rounded-lg transition-colors hover:bg-accent/50",
                    isActive(item.href) ? "bg-primary text-primary-foreground hover:bg-primary/90" : "text-muted-foreground hover:text-foreground"
                  )}>
                    <Link to={item.href} className="flex items-center">
                      <item.icon className={cn("h-5 w-5", !open ? "" : "mr-3")} />
                      {open && <span>{item.name}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* User section and upgrade */}
        <div className="border-t">
          {open && (
            <div className="p-4">
              <div className="text-sm text-muted-foreground mb-2">Finish set-up</div>
              <div className="text-xs text-muted-foreground mb-4">3/5 completed</div>
              
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {user?.email?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {user?.email?.split('@')[0]} — The Lea...
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-xs text-muted-foreground mb-2">Free trial</div>
                <div className="text-sm font-medium mb-2">Expires Sep 24, 2025</div>
                <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent flex items-center justify-center text-xs font-bold">
                  7d
                </div>
              </div>
              
              <Button className="w-full bg-primary hover:bg-primary/90 rounded-lg">
                Upgrade
              </Button>

              <div className="mt-4 pt-4 border-t">
                <div className="text-xs text-muted-foreground">What's new</div>
              </div>
            </div>
          )}
          
          {!open && (
            <div className="p-2 flex flex-col items-center space-y-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-xs">
                  {user?.email?.charAt(0).toUpperCase()}
                </span>
              </div>
              <Button size="sm" className="w-8 h-8 p-0 bg-primary hover:bg-primary/90">
                <Crown className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </SidebarContent>
    </Sidebar>
  );
};