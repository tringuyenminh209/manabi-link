import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
    children: React.ReactNode;
    roles?: string[];
    redirectTo?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    children,
    roles = [],
    redirectTo = '/login'
}) => {
    const { user, isAuthenticated, hasRole } = useAuth();

    // Chưa đăng nhập -> redirect to login
    if (!isAuthenticated) {
        return <Navigate to={redirectTo} replace />;
    }

    // Kiểm tra role nếu có yêu cầu
    if (roles.length > 0 && !roles.some(role => hasRole(role))) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <>{children}</>;
};
