import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    containerClassName?: string;
}

export const Input: React.FC<InputProps> = ({
    label,
    error,
    helperText,
    leftIcon,
    rightIcon,
    className,
    containerClassName,
    id,
    ...props
}) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    return (
        <div className={cn('space-y-2', containerClassName)} data-oid="bw3w230">
            {label && (
                <label
                    htmlFor={inputId}
                    className="block text-sm font-medium text-charcoal-gray"
                    data-oid="0tx.ank"
                >
                    {label}
                </label>
            )}
            <div className="relative" data-oid="7il7v6_">
                {leftIcon && (
                    <div
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-silver-gray"
                        data-oid="r5b6o0c"
                    >
                        {leftIcon}
                    </div>
                )}
                <input
                    id={inputId}
                    className={cn(
                        'manabi-input',
                        leftIcon && 'pl-10',
                        rightIcon && 'pr-10',
                        error &&
                            'border-warning-red focus:border-warning-red focus:ring-warning-red',
                        className,
                    )}
                    aria-invalid={error ? 'true' : 'false'}
                    aria-describedby={
                        error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
                    }
                    {...props}
                    data-oid="gqhc6o9"
                />

                {rightIcon && (
                    <div
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-silver-gray"
                        data-oid="kpujo_k"
                    >
                        {rightIcon}
                    </div>
                )}
            </div>
            {error && (
                <p
                    id={`${inputId}-error`}
                    className="text-sm text-warning-red"
                    role="alert"
                    data-oid="pb5pta4"
                >
                    {error}
                </p>
            )}
            {helperText && !error && (
                <p id={`${inputId}-helper`} className="text-sm text-silver-gray" data-oid="x11nd:o">
                    {helperText}
                </p>
            )}
        </div>
    );
};
