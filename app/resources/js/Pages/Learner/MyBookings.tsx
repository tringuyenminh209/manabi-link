'use client';

import React, { useState } from 'react';
import {
    Calendar,
    Clock,
    User,
    Video,
    MapPin,
    Star,
    Check,
    AlertTriangle,
    BookOpen,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

// --- Interfaces and Dummy Data ---
interface Booking {
    id: number;
    lessonTitle: string;
    lessonImage: string;
    teacherName: string;
    teacherAvatar: string;
    date: string;
    time: string;
    type: 'online' | 'offline';
    location: string;
    reviewed?: boolean;
}

const bookingsData = {
    upcoming: [
        {
            id: 1,
            lessonTitle: 'Guitar đệm hát cơ bản trong 30 ngày',
            lessonImage:
                'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=225&fit=crop',
            teacherName: 'Nguyễn Văn Minh',
            teacherAvatar: '/api/placeholder/40/40?name=M',
            date: '2025-06-28',
            time: '19:00 - 20:30',
            type: 'online',
            location: 'Zoom Meeting',
        },
        {
            id: 2,
            lessonTitle: 'Nấu ăn món Việt truyền thống',
            lessonImage:
                'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=225&fit=crop',
            teacherName: 'Trần Thị Lan',
            teacherAvatar: '/api/placeholder/40/40?name=L',
            date: '2025-07-02',
            time: '18:00 - 20:00',
            type: 'offline',
            location: 'Studio Harmony, Q1',
        },
    ],

    history: [
        {
            id: 3,
            lessonTitle: 'Luyện thi JLPT N4 cấp tốc',
            lessonImage:
                'https://images.unsplash.com/photo-1528164344705-47542687000d?w=400&h=225&fit=crop',
            teacherName: 'Tanaka Yuki',
            teacherAvatar: '/api/placeholder/40/40?name=Y',
            date: '2025-06-01',
            time: '18:00 - 19:30',
            type: 'online',
            location: 'Google Meet',
            reviewed: false,
        },
        {
            id: 4,
            lessonTitle: 'Guitar đệm hát cơ bản trong 30 ngày',
            lessonImage:
                'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=225&fit=crop',
            teacherName: 'Nguyễn Văn Minh',
            teacherAvatar: '/api/placeholder/40/40?name=M',
            date: '2025-05-28',
            time: '19:00 - 20:30',
            type: 'online',
            location: 'Zoom Meeting',
            reviewed: true,
        },
    ],

    cancelled: [
        {
            id: 5,
            lessonTitle: 'Piano cổ điển cho người mới bắt đầu',
            lessonImage:
                'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=400&h=225&fit=crop',
            teacherName: 'Lê Hoàng Anh',
            teacherAvatar: '/api/placeholder/40/40?name=A',
            date: '2025-05-25',
            time: '20:00 - 21:00',
            type: 'offline',
            location: 'Piano House, Q3',
        },
    ],
};

const TABS = [
    { key: 'upcoming', label: 'Sắp diễn ra', icon: Calendar },
    { key: 'history', label: 'Lịch sử', icon: Clock },
    { key: 'cancelled', label: 'Đã hủy', icon: AlertTriangle },
];

type TabKey = 'upcoming' | 'history' | 'cancelled';

// --- Components ---
const BookingCard = ({ booking, status }: { booking: Booking; status: TabKey }) => {
    const renderActions = () => {
        switch (status) {
            case 'upcoming':
                return (
                    <div className="flex items-center gap-3" data-oid="zw79jpd">
                        <Button variant="secondary" size="sm" className="flex-1" data-oid="wys7rva">
                            Hủy lịch
                        </Button>
                        <Button variant="primary" size="sm" className="flex-1" data-oid="50hvwut">
                            {booking.type === 'online' ? (
                                <Video className="w-4 h-4 mr-2" data-oid="24dr.5x" />
                            ) : (
                                <MapPin className="w-4 h-4 mr-2" data-oid="0w-7x.t" />
                            )}
                            {booking.type === 'online' ? 'Vào lớp học' : 'Xem địa điểm'}
                        </Button>
                    </div>
                );

            case 'history':
                return booking.reviewed ? (
                    <div
                        className="flex items-center justify-end gap-2 text-success-green font-medium"
                        data-oid="ths2_hm"
                    >
                        <Check className="w-5 h-5" data-oid="d-2-:vg" />
                        <span data-oid="44ih83y">Đã gửi đánh giá</span>
                    </div>
                ) : (
                    <Button variant="primary" size="sm" className="w-full" data-oid="z0vgadk">
                        <Star className="w-4 h-4 mr-2" data-oid="mg03e.k" />
                        Viết đánh giá
                    </Button>
                );

            case 'cancelled':
                return (
                    <p className="text-center text-warning-red font-semibold" data-oid="_0y5o_2">
                        Buổi học đã bị hủy
                    </p>
                );

            default:
                return null;
        }
    };

    return (
        <Card
            className="flex flex-col md:flex-row overflow-hidden hover:shadow-lg transition-shadow duration-300"
            data-oid="jq6nd8v"
        >
            <img
                src={booking.lessonImage}
                alt={booking.lessonTitle}
                className="w-full md:w-1/3 h-48 md:h-auto object-cover"
                data-oid="j:rd7rn"
            />

            <CardBody className="p-6 flex flex-col justify-between flex-1" data-oid="1tt_-vd">
                <div data-oid="1eow4l:">
                    <h3 className="manabi-heading-3 mb-2" data-oid="go4cwy_">
                        {booking.lessonTitle}
                    </h3>
                    <div
                        className="flex items-center gap-3 mb-4 text-sm text-silver-gray"
                        data-oid="sneh:si"
                    >
                        <img
                            src={booking.teacherAvatar}
                            alt={booking.teacherName}
                            className="w-8 h-8 rounded-full"
                            data-oid=":5:l-r0"
                        />

                        <span data-oid="pk1f.bg">
                            Giảng viên:{' '}
                            <span className="font-semibold text-charcoal-gray" data-oid="3nbrigr">
                                {booking.teacherName}
                            </span>
                        </span>
                    </div>
                    <div
                        className="space-y-3 text-sm text-charcoal-gray border-t border-light-border pt-4"
                        data-oid="nq2m3zc"
                    >
                        <div className="flex items-center gap-3" data-oid="c4ud6tr">
                            <Calendar className="w-4 h-4 text-wisdom-blue" data-oid="5ppqe7d" />
                            <span data-oid="ko9owy7">
                                {new Date(booking.date).toLocaleDateString('vi-VN', {
                                    weekday: 'long',
                                    day: '2-digit',
                                    month: 'long',
                                    year: 'numeric',
                                })}
                            </span>
                        </div>
                        <div className="flex items-center gap-3" data-oid="mh43-4k">
                            <Clock className="w-4 h-4 text-wisdom-blue" data-oid="5odpbts" />
                            <span data-oid="j593gy4">{booking.time}</span>
                        </div>
                        <div className="flex items-center gap-3" data-oid="y6jtfso">
                            {booking.type === 'online' ? (
                                <Video className="w-4 h-4 text-wisdom-blue" data-oid="g0js73a" />
                            ) : (
                                <MapPin className="w-4 h-4 text-wisdom-blue" data-oid="9w:k09v" />
                            )}
                            <span data-oid="6nwnze6">{booking.location}</span>
                        </div>
                    </div>
                </div>

                <div className="mt-6 pt-4 border-t border-light-border" data-oid="cmt6xnm">
                    {renderActions()}
                </div>
            </CardBody>
        </Card>
    );
};

const EmptyState = ({ tab }: { tab: TabKey }) => {
    const getEmptyStateContent = () => {
        switch (tab) {
            case 'upcoming':
                return {
                    icon: Calendar,
                    title: 'Chưa có lịch học nào sắp diễn ra',
                    description: 'Hãy khám phá các khóa học thú vị và đặt lịch học ngay!',
                    action: 'Khám phá khóa học',
                };
            case 'history':
                return {
                    icon: Clock,
                    title: 'Chưa có lịch sử học tập',
                    description: 'Các buổi học đã hoàn thành sẽ xuất hiện ở đây.',
                    action: 'Xem lịch sử',
                };
            case 'cancelled':
                return {
                    icon: AlertTriangle,
                    title: 'Chưa có lịch học nào bị hủy',
                    description: 'Đây là điều tốt! Bạn đã tham gia tất cả các buổi học.',
                    action: 'Xem lịch học',
                };
        }
    };

    const content = getEmptyStateContent();

    return (
        <Card data-oid="9.j0s6t">
            <CardBody className="text-center py-12" data-oid="u1cn.kl">
                <content.icon
                    className="w-16 h-16 mx-auto text-silver-gray mb-4"
                    data-oid="jgra:6a"
                />

                <h3 className="manabi-heading-3 mb-2" data-oid="a3vv3tj">
                    {content.title}
                </h3>
                <p className="manabi-text-muted mb-6" data-oid="0irn387">
                    {content.description}
                </p>
                <Button variant="primary" data-oid="g0gvd2k">
                    {content.action}
                </Button>
            </CardBody>
        </Card>
    );
};

// --- Main Component ---
const MyBookingsPage = () => {
    const [activeTab, setActiveTab] = useState<TabKey>('upcoming');

    const currentBookings = bookingsData[activeTab];

    return (
        <div className="manabi-section" data-oid="pkktuon">
            {/* Header */}
            <div data-oid="p5yeo:a">
                <h1 className="manabi-heading-1" data-oid="dkk5h8n">
                    Lịch học của tôi
                </h1>
                <p className="manabi-text-muted mt-1" data-oid=":..u1iq">
                    Quản lý và theo dõi các buổi học của bạn
                </p>
            </div>

            {/* Tabs */}
            <div className="border-b border-light-border" data-oid="yarz::v">
                <div className="flex space-x-8" data-oid="bcvb280">
                    {TABS.map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key as TabKey)}
                            className={`manabi-tab ${
                                activeTab === tab.key ? 'manabi-tab-active' : 'manabi-tab-inactive'
                            }`}
                            data-oid="fcg0oyo"
                        >
                            <tab.icon className="w-5 h-5" data-oid="7d2wsp-" />
                            <span data-oid="oughtjt">{tab.label}</span>
                            {bookingsData[tab.key as TabKey].length > 0 && (
                                <Badge variant="info" className="ml-2" data-oid="oybiln5">
                                    {bookingsData[tab.key as TabKey].length}
                                </Badge>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="mt-8" data-oid="y9s82h8">
                {currentBookings.length > 0 ? (
                    <div className="space-y-6" data-oid="k.j2v7r">
                        {currentBookings.map((booking) => (
                            <BookingCard
                                key={booking.id}
                                booking={booking}
                                status={activeTab}
                                data-oid="kc:wde4"
                            />
                        ))}
                    </div>
                ) : (
                    <EmptyState tab={activeTab} data-oid="-1hu_j8" />
                )}
            </div>
        </div>
    );
};

export default MyBookingsPage;
