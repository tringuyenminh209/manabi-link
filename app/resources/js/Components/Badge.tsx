import React from 'react';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'success' | 'warning' | 'info' | 'neutral' | 'secondary';
    className?: string;
}

export const Badge = ({ children, variant = 'neutral', className = '' }: BadgeProps) => {
    const variantStyles = {
        success: 'manabi-badge-success',
        warning: 'manabi-badge-warning',
        info: 'manabi-badge-info',
        neutral: 'manabi-badge-neutral',
        secondary: 'bg-silver-gray/10 text-silver-gray',
    };

    return (
        <span className={`manabi-badge ${variantStyles[variant]} ${className}`}>{children}</span>
    );
};
