import type { ReactNode } from 'react';

type BadgeVariant = 'default' | 'primary' | 'accent' | 'success' | 'warning';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variants: Record<BadgeVariant, string> = {
  default: 'bg-dark-600/80 text-dark-100',
  primary: 'bg-primary-600/20 text-primary-300 border border-primary-500/30',
  accent: 'bg-accent-600/20 text-accent-300 border border-accent-500/30',
  success: 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30',
  warning: 'bg-amber-600/20 text-amber-300 border border-amber-500/30',
};

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center px-2.5 py-1 
        text-xs font-medium rounded-full
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}

