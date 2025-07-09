import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface GuestRouteProps {
    children: React.ReactNode;
    redirectTo?: string;
}

export const GuestRoute: React.FC<GuestRouteProps> = ({
    children,
    redirectTo = '/dashboard'
}) => {
    const { isAuthenticated } = useAuth();

    // Đã đăng nhập -> redirect to dashboard
    if (isAuthenticated) {
        return <Navigate to={redirectTo} replace />;
    }

    return <>{children}</>;
};
