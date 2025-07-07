import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    loading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'md',
    loading = false,
    leftIcon,
    rightIcon,
    children,
    className,
    disabled,
    ...props
}) => {
    const baseClasses =
        'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variantClasses = {
        primary: 'manabi-btn-primary',
        secondary: 'manabi-btn-secondary',
        danger: 'manabi-btn-danger',
        ghost: 'manabi-btn-ghost',
    };

    const sizeClasses = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
    };

    const isDisabled = disabled || loading;

    return (
        <button
            className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
            disabled={isDisabled}
            aria-disabled={isDisabled}
            aria-busy={loading}
            {...props}
        >
            {loading && (
                <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />

                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                </svg>
            )}
            {!loading && leftIcon && (
                <span className="mr-2" aria-hidden="true">
                    {leftIcon}
                </span>
            )}
            <span className={loading ? 'sr-only' : ''}>{children}</span>
            {!loading && rightIcon && (
                <span className="ml-2" aria-hidden="true">
                    {rightIcon}
                </span>
            )}
        </button>
    );
};
