import type { ReactNode } from 'react';

type BadgeVariant = 'default' | 'primary' | 'accent' | 'success' | 'warning';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variants: Record<BadgeVariant, string> = {
  default: 'bg-white/90 text-surface-700 backdrop-blur-sm',
  primary: 'bg-primary-100 text-primary-700 border border-primary-200',
  accent: 'bg-accent-100 text-accent-700 border border-accent-200',
  success: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
  warning: 'bg-amber-100 text-amber-700 border border-amber-200',
};

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center px-2.5 py-1 
        text-xs font-semibold rounded-xl
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
