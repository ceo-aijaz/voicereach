import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface MobileOptimizedProps {
  children: ReactNode;
  className?: string;
}

export function MobileOptimized({ children, className }: MobileOptimizedProps) {
  return (
    <div className={cn(
      "w-full min-h-screen",
      // Mobile-first responsive design
      "px-4 py-6",
      "sm:px-6 sm:py-8", 
      "md:px-8 md:py-12",
      "lg:px-12 lg:py-16",
      "xl:px-16 xl:py-20",
      className
    )}>
      {children}
    </div>
  );
}

export function MobileCard({ children, className }: MobileOptimizedProps) {
  return (
    <div className={cn(
      "w-full rounded-xl p-4 sm:p-6 md:p-8",
      "bg-card border border-border",
      "shadow-lg hover:shadow-xl transition-all duration-300",
      "hover-lift",
      className
    )}>
      {children}
    </div>
  );
}

export function MobileGrid({ children, className }: MobileOptimizedProps) {
  return (
    <div className={cn(
      "grid gap-4",
      "grid-cols-1",
      "sm:grid-cols-2", 
      "lg:grid-cols-3",
      "xl:grid-cols-4",
      className
    )}>
      {children}
    </div>
  );
}

export function MobileButton({ children, className, ...props }: any) {
  return (
    <button 
      className={cn(
        "w-full sm:w-auto",
        "px-6 py-3 sm:px-8 sm:py-4",
        "text-base sm:text-lg",
        "rounded-lg",
        "transition-all duration-300",
        "hover-lift hover-scale",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}