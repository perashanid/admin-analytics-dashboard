'use client';

import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning';
  className?: string;
}

export function Badge({
  children,
  variant = 'default',
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors',
        {
          'bg-primary text-primary-foreground hover:bg-primary/80':
            variant === 'default',
          'bg-secondary text-secondary-foreground hover:bg-secondary/80':
            variant === 'secondary',
          'bg-destructive text-destructive-foreground hover:bg-destructive/80':
            variant === 'destructive',
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground':
            variant === 'outline',
          'bg-emerald-100 text-emerald-700 hover:bg-emerald-200':
            variant === 'success',
          'bg-amber-100 text-amber-700 hover:bg-amber-200':
            variant === 'warning',
        },
        className
      )}
    >
      {children}
    </span>
  );
}
