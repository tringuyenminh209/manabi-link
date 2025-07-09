import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import Home from './Home';
import HomeAuthenticated from './HomeAuthenticated';
import AuthenticatedLayout from '../Layouts/AuthenticatedLayout';

export default function HomeWrapper() {
    const { isAuthenticated } = useAuth();

    // Nếu đã đăng nhập, hiển thị HomeAuthenticated với AuthenticatedLayout
    if (isAuthenticated) {
        return (
            <AuthenticatedLayout>
                <HomeAuthenticated />
            </AuthenticatedLayout>
        );
    }

    // Nếu chưa đăng nhập, hiển thị Home thông thường (sẽ được wrap bởi PublicLayout trong app.tsx)
    return <Home />;
}
