'use client';

import React, { useState } from 'react';
import {
    LayoutDashboard,
    BookOpen,
    Calendar,
    Users,
    DollarSign,
    MessageSquare,
    Star,
    Settings,
    TrendingUp,
    TrendingDown,
    Plus,
    Eye,
    Edit,
    Clock,
    MapPin,
    CheckCircle,
    AlertTriangle,
} from 'lucide-react';
import { Button } from '@/Components/Button';
import { Card, CardHeader, CardBody } from '@/Components/Card';
import { Badge } from '@/Components/Badge';
import { EmptyState } from '@/Components/EmptyState';

type ActiveSection = 'overview' | 'courses' | 'schedule' | 'students' | 'earnings' | 'messages' | 'reviews';

export default function TeacherDashboard() {
    const [activeSection, setActiveSection] = useState<ActiveSection>('overview');

    // Mock data
    const teacherData = {
        name: 'Nguyễn Văn Minh',
        avatar: '/api/placeholder/80/80',
        role: 'Giảng viên',
        totalStudents: 156,
        totalCourses: 12,
        totalEarnings: '15,500,000',
        rating: 4.8,
    };

    const stats = {
        revenue: { value: '15,500,000', change: '+12%', trend: 'up' },
        bookings: { value: '24', change: '+8%', trend: 'up' },
        rating: { value: '4.8', change: '+0.2', trend: 'up' },
        response: { value: '95%', change: '-2%', trend: 'down' },
    };

    const recentBookings = [
        {
            id: 1,
            student: 'Trần Thị Lan',
            course: 'Guitar đệm hát cơ bản',
            date: '2024-01-15',
            time: '19:00',
            status: 'confirmed',
        },
        {
            id: 2,
            student: 'Lê Văn Hùng',
            course: 'Piano cơ bản',
            date: '2024-01-16',
            time: '20:00',
            status: 'pending',
        },
    ];

    const navigation = [
        { id: 'overview', label: 'Tổng quan', icon: LayoutDashboard },
        { id: 'courses', label: 'Quản lý khóa học', icon: BookOpen },
        { id: 'schedule', label: 'Quản lý lịch dạy', icon: Calendar },
        { id: 'students', label: 'Quản lý học viên', icon: Users },
        { id: 'earnings', label: 'Doanh thu & Thanh toán', icon: DollarSign },
        { id: 'messages', label: 'Tin nhắn', icon: MessageSquare },
        { id: 'reviews', label: 'Đánh giá', icon: Star },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'confirmed':
                return 'bg-success-green/10 text-success-green border-success-green/20';
            case 'pending':
                return 'bg-warning-red/10 text-warning-red border-warning-red/20';
            case 'cancelled':
                return 'bg-silver-gray/10 text-silver-gray border-silver-gray/20';
            default:
                return 'bg-silver-gray/10 text-silver-gray border-silver-gray/20';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'confirmed':
                return 'Đã xác nhận';
            case 'pending':
                return 'Chờ xác nhận';
            case 'cancelled':
                return 'Đã hủy';
            default:
                return 'Không xác định';
        }
    };

    const renderOverview = () => (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Object.entries(stats).map(([key, stat]) => (
                    <Card key={key}>
                        <CardBody className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-12 h-12 bg-${key === 'revenue' ? 'success-green' : key === 'bookings' ? 'wisdom-blue' : key === 'rating' ? 'energetic-yellow' : 'warning-red'}/10 rounded-lg flex items-center justify-center`}>
                                    {key === 'revenue' && <DollarSign className="w-6 h-6 text-success-green" />}
                                    {key === 'bookings' && <Calendar className="w-6 h-6 text-wisdom-blue" />}
                                    {key === 'rating' && <Star className="w-6 h-6 text-energetic-yellow" />}
                                    {key === 'response' && <MessageSquare className="w-6 h-6 text-warning-red" />}
                                </div>
                                <div className={`flex items-center text-sm ${stat.trend === 'up' ? 'text-success-green' : 'text-warning-red'}`}>
                                    {stat.trend === 'up' ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                                    {stat.change}
                                </div>
                            </div>
                            <div className="text-2xl font-bold text-charcoal-gray mb-1">
                                {stat.value}
                            </div>
                            <div className="text-sm text-silver-gray">
                                {key === 'revenue' && 'Doanh thu tháng'}
                                {key === 'bookings' && 'Lịch học mới'}
                                {key === 'rating' && 'Đánh giá trung bình'}
                                {key === 'response' && 'Tỷ lệ phản hồi'}
                            </div>
                        </CardBody>
                    </Card>
                ))}
            </div>

            {/* Recent Bookings */}
            <Card>
                <CardHeader className="p-6 border-b border-light-border">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-charcoal-gray">Lịch học gần đây</h3>
                        <Button variant="secondary" size="sm">
                            Xem tất cả
                        </Button>
                    </div>
                </CardHeader>
                <CardBody className="p-6">
                    {recentBookings.length === 0 ? (
                        <EmptyState
                            Icon={Calendar}
                            title="Chưa có lịch học"
                            description="Bạn chưa có lịch học nào được đặt"
                            actionText="Tạo lịch học"
                            onActionClick={() => setActiveSection('schedule')}
                        />
                    ) : (
                        <div className="space-y-4">
                            {recentBookings.map((booking) => (
                                <div key={booking.id} className="flex items-center justify-between p-4 border border-light-border rounded-lg">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-10 h-10 bg-wisdom-blue/10 rounded-full flex items-center justify-center">
                                            <Users className="w-5 h-5 text-wisdom-blue" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-charcoal-gray">{booking.student}</h4>
                                            <p className="text-sm text-silver-gray">{booking.course}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <div className="text-right">
                                            <p className="text-sm font-medium text-charcoal-gray">{booking.date}</p>
                                            <p className="text-sm text-silver-gray">{booking.time}</p>
                                        </div>
                                        <Badge variant={booking.status === 'confirmed' ? 'success' : booking.status === 'pending' ? 'warning' : 'neutral'}>
                                            {getStatusLabel(booking.status)}
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardBody>
            </Card>
        </div>
    );

    const renderContent = () => {
        switch (activeSection) {
            case 'overview':
                return renderOverview();
            default:
                return (
                    <EmptyState
                        Icon={LayoutDashboard}
                        title="Tính năng đang phát triển"
                        description="Tính năng này đang được phát triển và sẽ sẵn sàng sớm"
                        actionText="Quay lại tổng quan"
                        onActionClick={() => setActiveSection('overview')}
                    />
                );
        }
    };

    return (
        <div className="min-h-screen bg-off-white">
            {/* Header */}
            <div className="bg-white border-b border-light-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-wisdom-blue rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-sm">ML</span>
                            </div>
                            <h1 className="text-xl font-semibold text-charcoal-gray">Teacher Dashboard</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Button variant="ghost" size="sm">
                                <Settings className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex">
                    {/* Sidebar */}
                    <div className="w-64 bg-white border-r border-light-border min-h-screen">
                        <div className="p-6">
                            {/* Teacher Profile */}
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="w-12 h-12 bg-wisdom-blue rounded-full flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">NM</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-charcoal-gray">{teacherData.name}</h3>
                                    <p className="text-sm text-silver-gray">{teacherData.role}</p>
                                </div>
                            </div>

                            {/* Navigation */}
                            <nav className="space-y-2">
                                {navigation.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveSection(item.id as ActiveSection)}
                                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                                            activeSection === item.id
                                                ? 'bg-wisdom-blue text-white'
                                                : 'text-charcoal-gray hover:bg-off-white'
                                        }`}
                                    >
                                        <item.icon className="w-5 h-5" />
                                        <span className="font-medium">{item.label}</span>
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 ml-8">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
}
