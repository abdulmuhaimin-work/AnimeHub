import { forwardRef, type SelectHTMLAttributes, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  placeholder?: string;
  leftIcon?: ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, placeholder, leftIcon, className = '', ...props }, ref) => {
    return (
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-400 pointer-events-none">
            {leftIcon}
          </div>
        )}
        <select
          ref={ref}
          className={`
            input appearance-none cursor-pointer
            ${leftIcon ? 'pl-12' : ''}
            pr-12
            ${className}
          `}
          {...props}
        >
          {placeholder && (
            <option value="">{placeholder}</option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown 
          size={20} 
          className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-400 pointer-events-none" 
        />
      </div>
    );
  }
);

Select.displayName = 'Select';

