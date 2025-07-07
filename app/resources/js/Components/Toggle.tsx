import React from 'react';
import { cn } from '@/lib/utils';

interface ToggleProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    label?: string;
    description?: string;
    error?: string;
    onChange?: (checked: boolean) => void;
    containerClassName?: string;
}

export const Toggle: React.FC<ToggleProps> = ({
    label,
    description,
    error,
    onChange,
    className,
    containerClassName,
    id,
    checked,
    disabled,
    ...props
}) => {
    const toggleId = id || `toggle-${Math.random().toString(36).substr(2, 9)}`;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(e.target.checked);
        }
    };

    return (
        <div className={cn('space-y-2', containerClassName)}>
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    {label && (
                        <label
                            htmlFor={toggleId}
                            className="block text-sm font-medium text-charcoal-gray"
                        >
                            {label}
                        </label>
                    )}
                    {description && <p className="text-sm text-silver-gray mt-1">{description}</p>}
                </div>
                <div className="ml-4">
                    <label className="manabi-toggle">
                        <input
                            id={toggleId}
                            type="checkbox"
                            className="manabi-toggle-input sr-only"
                            checked={checked}
                            onChange={handleChange}
                            disabled={disabled}
                            aria-invalid={error ? 'true' : 'false'}
                            aria-describedby={error ? `${toggleId}-error` : undefined}
                            {...props}
                        />

                        <div
                            className={cn(
                                'manabi-toggle-slider',
                                disabled && 'opacity-50 cursor-not-allowed',
                            )}
                            aria-hidden="true"
                        />
                    </label>
                </div>
            </div>
            {error && (
                <p id={`${toggleId}-error`} className="text-sm text-warning-red" role="alert">
                    {error}
                </p>
            )}
        </div>
    );
};
