'use client';

import { useState } from 'react';
import {
    LayoutDashboard,
    Users,
    BookOpen,
    DollarSign,
    Settings,
    LogOut,
    Bell,
    Menu,
    X,
    Tag,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface AdminLayoutProps {
    children: React.ReactNode;
}

const navigation = [
    { id: 'overview', label: 'Tổng quan', icon: LayoutDashboard, href: '/admin' },
    { id: 'users', label: 'Quản lý Người dùng', icon: Users, href: '/admin/user' },
    { id: 'courses', label: 'Quản lý Khóa học', icon: BookOpen, href: '/admin/course' },
    { id: 'finance', label: 'Quản lý Tài chính', icon: DollarSign, href: '/admin/finance' },
    { id: 'categories', label: 'Quản lý Danh mục', icon: Tag, href: '/admin/category' },
    { id: 'settings', label: 'Cài đặt Hệ thống', icon: Settings, href: '/admin/settings' },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const adminData = {
        name: 'Admin System',
        avatar: '/api/placeholder/60/60',
        role: 'Quản trị viên',
    };

    return (
        <div className="min-h-screen bg-off-white">
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div
                className={cn(
                    'fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0',
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                )}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-light-border">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-wisdom-blue rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">M</span>
                            </div>
                            <div>
                                <h1 className="text-lg font-bold text-charcoal-gray">Manabi Link</h1>
                                <p className="text-xs text-silver-gray">Admin Panel</p>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="lg:hidden"
                            onClick={() => setSidebarOpen(false)}
                        >
                            <X className="w-5 h-5" />
                        </Button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-2">
                        {navigation.map((item) => {
                            const Icon = item.icon;
                            return (
                                <a
                                    key={item.id}
                                    href={item.href}
                                    className="manabi-nav-item"
                                >
                                    <Icon className="w-5 h-5" />
                                    <span>{item.label}</span>
                                </a>
                            );
                        })}
                    </nav>

                    {/* Footer */}
                    <div className="p-4 border-t border-light-border">
                        <div className="flex items-center space-x-3 p-3 rounded-lg bg-light-border/50">
                            <img
                                src={adminData.avatar}
                                alt={adminData.name}
                                className="w-10 h-10 rounded-full"
                            />
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-charcoal-gray truncate">
                                    {adminData.name}
                                </p>
                                <p className="text-xs text-silver-gray">{adminData.role}</p>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="w-full mt-3 justify-start"
                            leftIcon={<LogOut className="w-4 h-4" />}
                        >
                            Đăng xuất
                        </Button>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="lg:ml-64">
                {/* Top bar */}
                <header className="bg-white shadow-sm border-b border-light-border">
                    <div className="flex items-center justify-between px-6 py-4">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="lg:hidden"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <Menu className="w-5 h-5" />
                        </Button>

                        <div className="flex items-center space-x-4">
                            <Button variant="ghost" size="sm" className="relative">
                                <Bell className="w-5 h-5" />
                                <span className="absolute -top-1 -right-1 w-3 h-3 bg-warning-red rounded-full"></span>
                            </Button>
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="p-6">
                    {children}
                </main>
            </div>
        </div>
    );
} 