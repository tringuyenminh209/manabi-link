import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
}

interface CardHeaderProps {
    children: React.ReactNode;
    className?: string;
}

interface CardBodyProps {
    children: React.ReactNode;
    className?: string;
}

interface CardFooterProps {
    children: React.ReactNode;
    className?: string;
}

export const Card = ({ children, className = '' }: CardProps) => {
    return <div className={`manabi-card ${className}`}>{children}</div>;
};

export const CardHeader = ({ children, className = '' }: CardHeaderProps) => {
    return <div className={`manabi-card-header ${className}`}>{children}</div>;
};

export const CardBody = ({ children, className = '' }: CardBodyProps) => {
    return <div className={`manabi-card-body ${className}`}>{children}</div>;
};

export const CardFooter = ({ children, className = '' }: CardFooterProps) => {
    return <div className={`manabi-card-footer ${className}`}>{children}</div>;
};
