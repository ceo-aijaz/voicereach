import React from 'react';
import { useLocation } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/dashboard/Sidebar';
import { cn } from '@/lib/utils';

interface AppLayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
  className?: string;
}

const protectedRoutes = [
  '/dashboard',
  '/analytics',
  '/leads',
  '/instagram',
  '/campaigns',
  '/voice',
  '/settings',
  '/upgrade',
  '/onboarding'
];

export const AppLayout = ({ children, showSidebar, className }: AppLayoutProps) => {
  const location = useLocation();
  const isProtectedRoute = protectedRoutes.includes(location.pathname);
  const shouldShowSidebar = showSidebar ?? isProtectedRoute;

  if (!shouldShowSidebar) {
    return (
      <div className={cn("min-h-screen bg-background", className)}>
        {children}
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gradient-to-br from-background via-surface/20 to-primary/5 animate-gradient-xy flex w-full">
        <AppSidebar />
        
        <div className={cn(
          "flex-1 min-h-screen safe-area-top safe-area-bottom transition-all duration-300",
          className
        )}>
          {children}
        </div>
      </div>
    </SidebarProvider>
  );
};