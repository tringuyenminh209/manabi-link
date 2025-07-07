'use client';

import { useState } from 'react';
import { Bell, MessageSquare, Star, Calendar, CheckCircle, X } from 'lucide-react';
import { Button } from '@/Components/Button';
import { Badge } from '@/Components/Badge';
import { cn } from '@/lib/utils';

interface Notification {
    id: number;
    type: 'booking' | 'review' | 'course' | 'system';
    title: string;
    message: string;
    time: string;
    read: boolean;
    action?: {
        label: string;
        href: string;
    };
}

interface NotificationPopoverProps {
    className?: string;
}

export function NotificationPopover({ className }: NotificationPopoverProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState<Notification[]>([
        {
            id: 1,
            type: 'booking',
            title: 'Lịch học mới',
            message: 'Bạn có một lịch học mới với thầy Nguyễn Văn Minh vào ngày mai',
            time: '5 phút trước',
            read: false,
            action: {
                label: 'Xem chi tiết',
                href: '/user-dashboard/my-bookings',
            },
        },
        {
            id: 2,
            type: 'review',
            title: 'Đánh giá mới',
            message: 'Học viên Trần Thị Lan đã gửi đánh giá 5 sao cho khóa học của bạn',
            time: '1 giờ trước',
            read: false,
            action: {
                label: 'Xem đánh giá',
                href: '/teacher-dashboard/reviews',
            },
        },
        {
            id: 3,
            type: 'course',
            title: 'Khóa học được duyệt',
            message: 'Khóa học "Guitar đệm hát cơ bản" đã được phê duyệt và xuất bản',
            time: '2 giờ trước',
            read: true,
            action: {
                label: 'Xem khóa học',
                href: '/course/123',
            },
        },
        {
            id: 4,
            type: 'system',
            title: 'Cập nhật hệ thống',
            message: 'Hệ thống đã được cập nhật với các tính năng mới',
            time: '1 ngày trước',
            read: true,
        },
    ]);

    const unreadCount = notifications.filter(n => !n.read).length;

    const getNotificationIcon = (type: string) => {
        switch (type) {
            case 'booking':
                return <Calendar className="w-5 h-5 text-wisdom-blue" />;
            case 'review':
                return <Star className="w-5 h-5 text-energetic-yellow" />;
            case 'course':
                return <CheckCircle className="w-5 h-5 text-success-green" />;
            case 'system':
                return <Bell className="w-5 h-5 text-silver-gray" />;
            default:
                return <Bell className="w-5 h-5 text-silver-gray" />;
        }
    };

    const getNotificationBadge = (type: string) => {
        switch (type) {
            case 'booking':
                return <Badge variant="info">Lịch học</Badge>;
            case 'review':
                return <Badge variant="success">Đánh giá</Badge>;
            case 'course':
                return <Badge variant="warning">Khóa học</Badge>;
            case 'system':
                return <Badge variant="neutral">Hệ thống</Badge>;
            default:
                return null;
        }
    };

    const markAsRead = (id: number) => {
        setNotifications(prev =>
            prev.map(notification =>
                notification.id === id ? { ...notification, read: true } : notification
            )
        );
    };

    const markAllAsRead = () => {
        setNotifications(prev =>
            prev.map(notification => ({ ...notification, read: true }))
        );
    };

    return (
        <div className="relative">
            <Button
                variant="ghost"
                size="sm"
                className="relative"
                onClick={() => setIsOpen(!isOpen)}
            >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-warning-red rounded-full"></span>
                )}
            </Button>

            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Popover */}
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-light-border z-50">
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-light-border">
                            <h3 className="font-semibold text-charcoal-gray">Thông báo</h3>
                            <div className="flex items-center space-x-2">
                                {unreadCount > 0 && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={markAllAsRead}
                                        className="text-xs"
                                    >
                                        Đánh dấu đã đọc
                                    </Button>
                                )}
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>

                        {/* Notifications List */}
                        <div className="max-h-96 overflow-y-auto">
                            {notifications.length === 0 ? (
                                <div className="p-6 text-center text-silver-gray">
                                    <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                    <p>Không có thông báo mới</p>
                                </div>
                            ) : (
                                <div className="divide-y divide-light-border">
                                    {notifications.map((notification) => (
                                        <div
                                            key={notification.id}
                                            className={cn(
                                                'p-4 hover:bg-off-white transition-colors cursor-pointer',
                                                !notification.read && 'bg-energetic-yellow/5'
                                            )}
                                            onClick={() => markAsRead(notification.id)}
                                        >
                                            <div className="flex items-start space-x-3">
                                                <div className="flex-shrink-0 mt-1">
                                                    {getNotificationIcon(notification.type)}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between mb-1">
                                                        <h4 className="font-medium text-charcoal-gray text-sm">
                                                            {notification.title}
                                                        </h4>
                                                        {getNotificationBadge(notification.type)}
                                                    </div>
                                                    <p className="text-sm text-silver-gray mb-2">
                                                        {notification.message}
                                                    </p>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-xs text-silver-gray">
                                                            {notification.time}
                                                        </span>
                                                        {notification.action && (
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                className="text-xs h-auto p-1"
                                                            >
                                                                {notification.action.label}
                                                            </Button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {notifications.length > 0 && (
                            <div className="p-4 border-t border-light-border">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="w-full text-center"
                                >
                                    Xem tất cả thông báo
                                </Button>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
