import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
    label?: string;
    error?: string;
    helperText?: string;
    options: SelectOption[];
    placeholder?: string;
    onChange?: (value: string) => void;
    containerClassName?: string;
}

export const Select: React.FC<SelectProps> = ({
    label,
    error,
    helperText,
    options,
    placeholder,
    onChange,
    className,
    containerClassName,
    id,
    value,
    ...props
}) => {
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (onChange) {
            onChange(e.target.value);
        }
    };

    return (
        <div className={cn('space-y-2', containerClassName)}>
            {label && (
                <label htmlFor={selectId} className="block text-sm font-medium text-charcoal-gray">
                    {label}
                </label>
            )}
            <div className="relative">
                <select
                    id={selectId}
                    className={cn(
                        'manabi-select appearance-none pr-10',
                        error &&
                            'border-warning-red focus:border-warning-red focus:ring-warning-red',
                        className,
                    )}
                    value={value}
                    onChange={handleChange}
                    aria-invalid={error ? 'true' : 'false'}
                    aria-describedby={
                        error ? `${selectId}-error` : helperText ? `${selectId}-helper` : undefined
                    }
                    {...props}
                >
                    {placeholder && (
                        <option value="" disabled>
                            {placeholder}
                        </option>
                    )}
                    {options.map((option) => (
                        <option key={option.value} value={option.value} disabled={option.disabled}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <ChevronDown className="w-4 h-4 text-silver-gray" />
                </div>
            </div>
            {error && (
                <p id={`${selectId}-error`} className="text-sm text-warning-red" role="alert">
                    {error}
                </p>
            )}
            {helperText && !error && (
                <p id={`${selectId}-helper`} className="text-sm text-silver-gray">
                    {helperText}
                </p>
            )}
        </div>
    );
};
