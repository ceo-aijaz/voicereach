import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface EffectProps {
  children: ReactNode;
  className?: string;
}

export function FloatingParticles() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-primary/20 rounded-full animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${10 + Math.random() * 20}s`
          }}
        />
      ))}
    </div>
  );
}

export function GlowEffect({ children, className }: EffectProps) {
  return (
    <div className={cn("relative group", className)}>
      <div className="absolute -inset-1 bg-gradient-primary rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
      <div className="relative">{children}</div>
    </div>
  );
}

export function ShineEffect({ children, className }: EffectProps) {
  return (
    <div className={cn("relative overflow-hidden hover-shine", className)}>
      {children}
    </div>
  );
}

export function MagneticEffect({ children, className }: EffectProps) {
  return (
    <div 
      className={cn("cursor-pointer transition-transform duration-300 ease-out hover-tilt", className)}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
        e.currentTarget.style.transform = `perspective(1000px) rotateX(${-y}deg) rotateY(${x}deg) scale3d(1.05, 1.05, 1.05)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      }}
    >
      {children}
    </div>
  );
}

export function ParallaxBackground({ children, className }: EffectProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div 
        className="absolute inset-0 bg-gradient-hero opacity-10"
        style={{
          transform: 'translateZ(0)',
          willChange: 'transform'
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export function AnimatedGradient({ children, className }: EffectProps) {
  return (
    <div className={cn(
      "relative bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-gradient-x",
      className
    )}>
      {children}
    </div>
  );
}