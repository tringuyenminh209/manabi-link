'use client';

import { useState } from 'react';
import {
    LayoutDashboard,
    Users,
    BookOpen,
    DollarSign,
    Settings,
    LogOut,
    Search,
    Filter,
    Plus,
    MoreHorizontal,
    Eye,
    Edit,
    Lock,
    Unlock,
    RotateCcw,
    TrendingUp,
    TrendingDown,
    AlertTriangle,
    CheckCircle,
    XCircle,
    Calendar,
    Star,
    MapPin,
    Clock,
    ChevronDown,
    Download,
    Upload,
    Bell,
    Shield,
    Activity,
    BarChart3,
    PieChart,
    FileText,
    Tag,
    Menu,
    X,
} from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/Components/Button';
import { Card, CardHeader, CardBody } from '@/Components/Card';
import { Badge } from '@/Components/Badge';

type ActiveSection = 'overview' | 'users' | 'courses' | 'finance' | 'categories' | 'settings';
type CourseTab = 'pending' | 'active' | 'rejected' | 'reported' | 'all';
type UserFilter = 'all' | 'learner' | 'instructor' | 'admin';
type UserStatus = 'all' | 'active' | 'locked';
type VerificationStatus = 'all' | 'verified' | 'pending' | 'rejected';

export default function AdminOverviewPage() {
    const stats = {
        revenue: { value: '125,500,000', change: '+15%', trend: 'up' },
        newUsers: { value: '1,247', change: '+8%', trend: 'up' },
        pendingCourses: { value: '23', change: '+5', trend: 'up' },
        reports: { value: '7', change: '-2', trend: 'down' },
    };

    const recentActivities = [
        {
            id: 1,
            type: 'course_submit',
            user: 'Nguyễn Văn Minh',
            action: 'đã gửi khóa học "Guitar đệm hát cơ bản" để chờ duyệt',
            time: '5 phút trước',
            status: 'pending',
        },
        {
            id: 2,
            type: 'user_register',
            user: 'Trần Thị Lan',
            action: 'đã đăng ký tài khoản mới',
            time: '12 phút trước',
            status: 'success',
        },
        {
            id: 3,
            type: 'report',
            user: 'Lê Văn Hùng',
            action: 'đã báo cáo một bình luận',
            time: '25 phút trước',
            status: 'warning',
        },
        {
            id: 4,
            type: 'course_approve',
            user: 'System',
            action: 'đã phê duyệt khóa học "Piano cơ bản"',
            time: '1 giờ trước',
            status: 'success',
        },
    ];

    const quickActions = [
        {
            title: 'Xem báo cáo chi tiết',
            description: 'Phân tích dữ liệu doanh thu và người dùng',
            icon: BarChart3,
            href: '/admin/finance',
            variant: 'primary' as const,
        },
        {
            title: 'Duyệt khóa học',
            description: '23 khóa học đang chờ phê duyệt',
            icon: BookOpen,
            href: '/admin/course',
            variant: 'secondary' as const,
        },
        {
            title: 'Quản lý người dùng',
            description: 'Xem và quản lý tài khoản người dùng',
            icon: Users,
            href: '/admin/user',
            variant: 'secondary' as const,
        },
    ];

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'success':
                return <CheckCircle className="w-4 h-4 text-success-green" />;
            case 'warning':
                return <AlertTriangle className="w-4 h-4 text-warning-red" />;
            case 'pending':
                return <Clock className="w-4 h-4 text-silver-gray" />;
            default:
                return <Activity className="w-4 h-4 text-wisdom-blue" />;
        }
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="manabi-heading-1">Tổng quan Hệ thống</h1>
                    <p className="manabi-text-muted mt-1">
                        Theo dõi hoạt động và hiệu suất của nền tảng Manabi Link
                    </p>
                </div>
                <div className="flex space-x-3">
                    <Button variant="secondary" leftIcon={<Download className="w-4 h-4" />}>
                        Xuất báo cáo
                    </Button>
                    <Button variant="primary" leftIcon={<Activity className="w-4 h-4" />}>
                        Xem chi tiết
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                    <CardBody className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="manabi-text-muted">Doanh thu tháng</p>
                                <p className="manabi-heading-2">{stats.revenue.value} VNĐ</p>
                                <div className="flex items-center mt-2">
                                    {stats.revenue.trend === 'up' ? (
                                        <TrendingUp className="w-4 h-4 text-success-green mr-1" />
                                    ) : (
                                        <TrendingDown className="w-4 h-4 text-warning-red mr-1" />
                                    )}
                                    <span className={`text-sm font-medium ${
                                        stats.revenue.trend === 'up' ? 'text-success-green' : 'text-warning-red'
                                    }`}>
                                        {stats.revenue.change}
                                    </span>
                                </div>
                            </div>
                            <div className="w-12 h-12 bg-energetic-yellow/10 rounded-lg flex items-center justify-center">
                                <DollarSign className="w-6 h-6 text-energetic-yellow" />
                            </div>
                        </div>
                    </CardBody>
                </Card>

                <Card>
                    <CardBody className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="manabi-text-muted">Người dùng mới</p>
                                <p className="manabi-heading-2">{stats.newUsers.value}</p>
                                <div className="flex items-center mt-2">
                                    <TrendingUp className="w-4 h-4 text-success-green mr-1" />
                                    <span className="text-sm font-medium text-success-green">
                                        {stats.newUsers.change}
                                    </span>
                                </div>
                            </div>
                            <div className="w-12 h-12 bg-wisdom-blue/10 rounded-lg flex items-center justify-center">
                                <Users className="w-6 h-6 text-wisdom-blue" />
                            </div>
                        </div>
                    </CardBody>
                </Card>

                <Card>
                    <CardBody className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="manabi-text-muted">Khóa học chờ duyệt</p>
                                <p className="manabi-heading-2">{stats.pendingCourses.value}</p>
                                <div className="flex items-center mt-2">
                                    <TrendingUp className="w-4 h-4 text-warning-red mr-1" />
                                    <span className="text-sm font-medium text-warning-red">
                                        {stats.pendingCourses.change}
                                    </span>
                                </div>
                            </div>
                            <div className="w-12 h-12 bg-warning-red/10 rounded-lg flex items-center justify-center">
                                <BookOpen className="w-6 h-6 text-warning-red" />
                            </div>
                        </div>
                    </CardBody>
                </Card>

                <Card>
                    <CardBody className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="manabi-text-muted">Báo cáo mới</p>
                                <p className="manabi-heading-2">{stats.reports.value}</p>
                                <div className="flex items-center mt-2">
                                    <TrendingDown className="w-4 h-4 text-success-green mr-1" />
                                    <span className="text-sm font-medium text-success-green">
                                        {stats.reports.change}
                                    </span>
                                </div>
                            </div>
                            <div className="w-12 h-12 bg-silver-gray/10 rounded-lg flex items-center justify-center">
                                <FileText className="w-6 h-6 text-silver-gray" />
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>

            {/* Quick Actions and Recent Activities */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Quick Actions */}
                <div className="lg:col-span-1">
                    <h2 className="manabi-heading-3 mb-4">Thao tác nhanh</h2>
                    <div className="space-y-4">
                        {quickActions.map((action, index) => {
                            const Icon = action.icon;
                            return (
                                <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                                    <CardBody className="p-4">
                                        <div className="flex items-start space-x-3">
                                            <div className="w-10 h-10 bg-wisdom-blue/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <Icon className="w-5 h-5 text-wisdom-blue" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-semibold text-charcoal-gray mb-1">
                                                    {action.title}
                                                </h3>
                                                <p className="text-sm text-silver-gray mb-3">
                                                    {action.description}
                                                </p>
                                                <Button variant={action.variant} size="sm">
                                                    Xem chi tiết
                                                </Button>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            );
                        })}
                    </div>
                </div>

                {/* Recent Activities */}
                <div className="lg:col-span-2">
                    <h2 className="manabi-heading-3 mb-4">Hoạt động gần đây</h2>
                    <Card>
                        <CardBody className="p-0">
                            <div className="divide-y divide-light-border">
                                {recentActivities.map((activity) => (
                                    <div key={activity.id} className="p-4 hover:bg-off-white/50 transition-colors">
                                        <div className="flex items-start space-x-3">
                                            <div className="flex-shrink-0 mt-1">
                                                {getStatusIcon(activity.status)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm text-charcoal-gray">
                                                    <span className="font-medium">{activity.user}</span>{' '}
                                                    {activity.action}
                                                </p>
                                                <p className="text-xs text-silver-gray mt-1">
                                                    {activity.time}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
}
