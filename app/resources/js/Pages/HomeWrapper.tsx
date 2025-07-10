import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import Home from './Home';
import HomeAuthenticated from './HomeAuthenticated';
import AuthenticatedLayout from '../Layouts/AuthenticatedLayout';

export default function HomeWrapper() {
    const { isAuthenticated, user, loading } = useAuth();

    // Debug logging
    console.log('🏠 HomeWrapper render:');
    console.log('  - loading:', loading);
    console.log('  - isAuthenticated:', isAuthenticated);
    console.log('  - user:', user);
    console.log('  - localStorage auth_token:', localStorage.getItem('auth_token'));
    console.log('  - localStorage auth_user:', localStorage.getItem('auth_user'));

    // Hiển thị loading nếu đang kiểm tra auth
    if (loading) {
        return (
            <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-[#2A7A8C] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-[#6C757D]">Đang tải...</p>
                </div>
            </div>
        );
    }

    // Nếu đã đăng nhập, hiển thị HomeAuthenticated với AuthenticatedLayout
    if (isAuthenticated && user) {
        console.log('✅ Rendering HomeAuthenticated for user:', user.name);
        return (
            <AuthenticatedLayout>
                <HomeAuthenticated />
            </AuthenticatedLayout>
        );
    }

    // Nếu chưa đăng nhập, hiển thị Home thông thường (sẽ được wrap bởi PublicLayout trong app.tsx)
    console.log('❌ Rendering Home (guest)');
    return <Home />;
}
