'use client';

import React, { useState } from 'react';
import {
    LayoutDashboard,
    Calendar,
    BookMarked,
    MessageSquare,
    Star,
    BookOpen,
    Users,
    DollarSign,
    Settings,
    TrendingUp,
    TrendingDown,
    Plus,
    Clock,
    MapPin,
    CheckCircle,
    AlertTriangle,
} from 'lucide-react';
import { Button } from '@/Components/Button';
import { Card, CardHeader, CardBody } from '@/Components/Card';
import { Badge } from '@/Components/Badge';
import { EmptyState } from '@/Components/EmptyState';

type ActiveSection = 'overview' | 'schedule' | 'saved-courses' | 'messages' | 'reviews';

export default function LearnerDashboard() {
    const [activeSection, setActiveSection] = useState<ActiveSection>('overview');

    // Mock data
    const userData = {
        name: 'Nguyễn Thị Mai',
        avatar: '/api/placeholder/80/80',
        role: 'Học viên',
        level: 15,
        xp: 2847,
        xpToNextLevel: 3000,
        totalXP: 15420,
        rank: 'Gold',
        rankPosition: 3,
        streak: 7,
    };

    const upcomingLesson = {
        title: 'Guitar đệm hát cơ bản',
        instructor: 'Nguyễn Văn Minh',
        date: 'Thứ Ba, 18/06',
        time: '19:00',
        countdown: '2 giờ 15 phút',
        type: 'offline',
        location: 'Studio Harmony, Q1',
    };

    const stats = {
        coursesCompleted: 12,
        totalStudyTime: 156,
        currentStreak: 7,
        averageScore: 92,
    };

    const navigation = [
        { id: 'overview', label: 'Tổng quan', icon: LayoutDashboard },
        { id: 'schedule', label: 'Lịch học của tôi', icon: Calendar },
        { id: 'saved-courses', label: 'Khóa học đã lưu', icon: BookMarked },
        { id: 'messages', label: 'Tin nhắn', icon: MessageSquare },
        { id: 'reviews', label: 'Đánh giá của tôi', icon: Star },
    ];

    const renderOverview = () => (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                    <CardBody className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-success-green/10 rounded-lg flex items-center justify-center">
                                <BookOpen className="w-6 h-6 text-success-green" />
                            </div>
                        </div>
                        <div className="text-2xl font-bold text-charcoal-gray mb-1">
                            {stats.coursesCompleted}
                        </div>
                        <div className="text-sm text-silver-gray">Khóa học đã hoàn thành</div>
                    </CardBody>
                </Card>

                <Card>
                    <CardBody className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-wisdom-blue/10 rounded-lg flex items-center justify-center">
                                <Clock className="w-6 h-6 text-wisdom-blue" />
                            </div>
                        </div>
                        <div className="text-2xl font-bold text-charcoal-gray mb-1">
                            {stats.totalStudyTime}h
                        </div>
                        <div className="text-sm text-silver-gray">Tổng thời gian học</div>
                    </CardBody>
                </Card>

                <Card>
                    <CardBody className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-energetic-yellow/10 rounded-lg flex items-center justify-center">
                                <Star className="w-6 h-6 text-energetic-yellow" />
                            </div>
                        </div>
                        <div className="text-2xl font-bold text-charcoal-gray mb-1">
                            {stats.averageScore}%
                        </div>
                        <div className="text-sm text-silver-gray">Điểm trung bình</div>
                    </CardBody>
                </Card>

                <Card>
                    <CardBody className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-warning-red/10 rounded-lg flex items-center justify-center">
                                <TrendingUp className="w-6 h-6 text-warning-red" />
                            </div>
                        </div>
                        <div className="text-2xl font-bold text-charcoal-gray mb-1">
                            {stats.currentStreak}
                        </div>
                        <div className="text-sm text-silver-gray">Ngày học liên tiếp</div>
                    </CardBody>
                </Card>
            </div>

            {/* Upcoming Lesson */}
            <Card>
                <CardHeader className="p-6 border-b border-light-border">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-charcoal-gray">Lịch học sắp tới</h3>
                        <Button variant="secondary" size="sm">
                            Xem tất cả
                        </Button>
                    </div>
                </CardHeader>
                <CardBody className="p-6">
                    <div className="flex items-center justify-between p-4 border border-light-border rounded-lg">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-wisdom-blue/10 rounded-full flex items-center justify-center">
                                <Calendar className="w-6 h-6 text-wisdom-blue" />
                            </div>
                            <div>
                                <h4 className="font-medium text-charcoal-gray">{upcomingLesson.title}</h4>
                                <p className="text-sm text-silver-gray">Giảng viên: {upcomingLesson.instructor}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-medium text-charcoal-gray">{upcomingLesson.date}</p>
                            <p className="text-sm text-silver-gray">{upcomingLesson.time}</p>
                            <Badge variant="info">{upcomingLesson.type}</Badge>
                        </div>
                    </div>
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
                            <h1 className="text-xl font-semibold text-charcoal-gray">Learner Dashboard</h1>
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
                            {/* User Profile */}
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="w-12 h-12 bg-wisdom-blue rounded-full flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">NM</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-charcoal-gray">{userData.name}</h3>
                                    <p className="text-sm text-silver-gray">{userData.role}</p>
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
