'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
    Star,
    Clock,
    Users,
    BarChart,
    Share2,
    Heart,
    CheckCircle,
    Calendar,
    Video,
    ChevronDown,
    AlertTriangle,
    Copy,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

// --- Interfaces and Dummy Data ---
const lessonDetail = {
    id: '1',
    title: 'Guitar đệm hát nâng cao - Kỹ thuật và Cảm âm',
    category: 'Âm nhạc',
    rating: 4.8,
    reviewCount: 152,
    studentCount: 345,
    coverImage: 'https://images.unsplash.com/photo-1598528738936-c5cf9e17b847?w=800&h=450&fit=crop',
    introVideo: 'https://example.com/intro.mp4',
    teacher: {
        id: 'sensei-1',
        name: 'Nguyễn Văn Minh',
        avatar: '/api/placeholder/80/80?name=M',
        title: 'Nghệ sĩ Guitar & Nhà sản xuất âm nhạc',
        stats: { rating: 4.9, reviews: 320, students: '1.2k' },
    },
    description:
        'Khóa học này sẽ đưa bạn đi sâu vào các kỹ thuật đệm hát phức tạp, cách xây dựng hợp âm màu sắc và luyện tập khả năng cảm âm để bạn có thể tự tin chơi bất kỳ bài hát nào.',
    whatYoullLearn: [
        'Quy tắc hòa âm và cách áp dụng vào đệm hát.',
        'Các kỹ thuật nâng cao: fingerstyle, tapping, slapping.',
        'Tự xây dựng intro, gian tấu và outro cho bài hát.',
        'Luyện tai nghe và xác định hợp âm của một bài hát bất kỳ.',
    ],

    price: 799000,
    originalPrice: 1200000,
    duration: '12 giờ',
    level: 'Nâng cao',
    lessonCount: 24,
    language: 'Tiếng Việt',
    availableSchedules: [
        { id: 'sch_1', datetime: '2025-07-10T19:00:00', remainingSlots: 3 },
        { id: 'sch_2', datetime: '2025-07-12T20:00:00', remainingSlots: 1 },
        { id: 'sch_3', datetime: '2025-07-15T18:00:00', remainingSlots: 5 },
    ],

    reviews: [
        {
            id: 1,
            user: 'Trần Văn Hùng',
            rating: 5,
            comment:
                'Khóa học cực kỳ chất lượng. Thầy Minh dạy rất có tâm và kiến thức sâu rộng. Mình đã tiến bộ vượt bậc!',
            avatar: '/api/placeholder/48/48?name=H',
        },
        {
            id: 2,
            user: 'Lê Thị Mai',
            rating: 4,
            comment: 'Nội dung rất hay nhưng hơi khó với mình. Cần có nền tảng vững trước khi học.',
            avatar: '/api/placeholder/48/48?name=M',
        },
    ],
};

const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('vi-VN', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

// --- Main Component ---
const LessonDetailPage = () => {
    const [activeTab, setActiveTab] = useState<'about' | 'content' | 'reviews'>('about');
    const [selectedSchedule, setSelectedSchedule] = useState<string | null>(null);

    const handleCopyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        // You can add a toast notification here
    };

    return (
        <div className="bg-off-white font-inter" data-oid="o0zph9o">
            {/* Header */}
            <nav className="bg-white shadow-sm border-b border-light-border" data-oid="3f2olid">
                <div
                    className="manabi-container h-16 flex items-center justify-between"
                    data-oid="vc4z7-l"
                >
                    <Link
                        href="/"
                        className="text-2xl font-bold text-wisdom-blue"
                        data-oid="xvdg7nz"
                    >
                        Manabi Link
                    </Link>
                    <div className="flex items-center gap-4" data-oid=":um0s.7">
                        <Button variant="ghost" size="sm" data-oid="8:9ysnx">
                            <Share2 className="w-4 h-4 mr-2" data-oid=".hspf6w" />
                            Chia sẻ
                        </Button>
                        <Button variant="ghost" size="sm" data-oid="jdab22h">
                            <Heart className="w-4 h-4 mr-2" data-oid="zjfx37o" />
                            Yêu thích
                        </Button>
                    </div>
                </div>
            </nav>

            <main className="manabi-container p-4 sm:p-8" data-oid="gtj9u_k">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" data-oid="u_lfwgl">
                    {/* Left Column: Course Content */}
                    <div className="lg:col-span-2" data-oid="aa934q.">
                        {/* Hero section */}
                        <div className="mb-6" data-oid="ntery_z">
                            <nav className="text-sm text-silver-gray mb-2" data-oid="6ib9frr">
                                <Link
                                    href="/course"
                                    className="hover:text-wisdom-blue"
                                    data-oid="u2obsys"
                                >
                                    Khóa học
                                </Link>
                                <span className="mx-2" data-oid="3rft1o_">
                                    /
                                </span>
                                <span className="text-charcoal-gray" data-oid="fqo_l73">
                                    {lessonDetail.category}
                                </span>
                            </nav>
                            <h1 className="manabi-heading-1" data-oid="gkrgka0">
                                {lessonDetail.title}
                            </h1>
                            <div
                                className="flex items-center gap-4 mt-3 text-sm text-silver-gray"
                                data-oid="l-690uz"
                            >
                                <div className="flex items-center gap-1.5" data-oid="9ht-12i">
                                    <Star
                                        className="w-5 h-5 text-energetic-yellow fill-current"
                                        data-oid="fl1pu1g"
                                    />

                                    <span
                                        className="font-semibold text-charcoal-gray"
                                        data-oid="ee93opv"
                                    >
                                        {lessonDetail.rating}
                                    </span>
                                    <span data-oid="3behz:f">
                                        ({lessonDetail.reviewCount} đánh giá)
                                    </span>
                                </div>
                                <div className="flex items-center gap-1.5" data-oid="w-fjkmq">
                                    <Users
                                        className="w-5 h-5 text-wisdom-blue"
                                        data-oid=":19fg25"
                                    />

                                    <span data-oid="t6h465a">
                                        {lessonDetail.studentCount} học viên
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Image/Video */}
                        <div
                            className="mb-8 rounded-xl overflow-hidden shadow-lg"
                            data-oid="x:xvlza"
                        >
                            <img
                                src={lessonDetail.coverImage}
                                alt={lessonDetail.title}
                                className="w-full h-auto object-cover"
                                data-oid="ojteqg-"
                            />
                        </div>

                        {/* Tabs */}
                        <div className="border-b border-light-border mb-8" data-oid="a_khdj0">
                            <div className="flex space-x-8" data-oid="yl6qxuc">
                                <button
                                    onClick={() => setActiveTab('about')}
                                    className={`manabi-tab ${activeTab === 'about' ? 'manabi-tab-active' : 'manabi-tab-inactive'}`}
                                    data-oid="-fbtctr"
                                >
                                    Giới thiệu
                                </button>
                                <button
                                    onClick={() => setActiveTab('content')}
                                    className={`manabi-tab ${activeTab === 'content' ? 'manabi-tab-active' : 'manabi-tab-inactive'}`}
                                    data-oid="ntsyiz-"
                                >
                                    Nội dung khóa học
                                </button>
                                <button
                                    onClick={() => setActiveTab('reviews')}
                                    className={`manabi-tab ${activeTab === 'reviews' ? 'manabi-tab-active' : 'manabi-tab-inactive'}`}
                                    data-oid="7697wr3"
                                >
                                    Đánh giá
                                </button>
                            </div>
                        </div>

                        {/* Tab Content */}
                        <Card data-oid="s8:pj:x">
                            <CardBody className="p-6 sm:p-8" data-oid="2bhobee">
                                {activeTab === 'about' && (
                                    <div className="prose max-w-none" data-oid="ts724rb">
                                        <h2 className="manabi-heading-3 mb-4" data-oid="gbmcyz1">
                                            Mô tả khóa học
                                        </h2>
                                        <p className="manabi-text-body" data-oid="d4674t1">
                                            {lessonDetail.description}
                                        </p>

                                        <h2
                                            className="manabi-heading-3 mt-8 mb-4"
                                            data-oid="54kc1k:"
                                        >
                                            Bạn sẽ học được gì?
                                        </h2>
                                        <ul className="space-y-3" data-oid="1gcn.ox">
                                            {lessonDetail.whatYoullLearn.map((item, index) => (
                                                <li
                                                    key={index}
                                                    className="flex items-start gap-3"
                                                    data-oid="ggh29ok"
                                                >
                                                    <CheckCircle
                                                        className="w-5 h-5 text-success-green mt-1 flex-shrink-0"
                                                        data-oid="kkko8nj"
                                                    />

                                                    <span
                                                        className="manabi-text-body"
                                                        data-oid="2c0e:vl"
                                                    >
                                                        {item}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>

                                        <h2
                                            className="manabi-heading-3 mt-8 mb-4"
                                            data-oid="hpc12i6"
                                        >
                                            Giảng viên
                                        </h2>
                                        <div
                                            className="flex items-center gap-4 bg-off-white p-4 rounded-lg"
                                            data-oid="1azfhvh"
                                        >
                                            <img
                                                src={lessonDetail.teacher.avatar}
                                                alt={lessonDetail.teacher.name}
                                                className="w-20 h-20 rounded-full object-cover"
                                                data-oid="kihu7_s"
                                            />

                                            <div data-oid="jv7-5.w">
                                                <Link
                                                    href={`/teacher/profile/${lessonDetail.teacher.id}`}
                                                    className="font-bold text-wisdom-blue hover:underline"
                                                    data-oid=".nv2lyr"
                                                >
                                                    {lessonDetail.teacher.name}
                                                </Link>
                                                <p className="manabi-text-muted" data-oid="fanjvp3">
                                                    {lessonDetail.teacher.title}
                                                </p>
                                                <div
                                                    className="flex items-center gap-4 mt-2 text-sm"
                                                    data-oid="vmj--f3"
                                                >
                                                    <div
                                                        className="flex items-center gap-1"
                                                        data-oid="b4y01q4"
                                                    >
                                                        <Star
                                                            className="w-4 h-4 text-energetic-yellow fill-current"
                                                            data-oid="l09eg9h"
                                                        />

                                                        <span data-oid="s5-_v3f">
                                                            {lessonDetail.teacher.stats.rating}
                                                        </span>
                                                    </div>
                                                    <div
                                                        className="flex items-center gap-1"
                                                        data-oid="n.eyon8"
                                                    >
                                                        <Users
                                                            className="w-4 h-4 text-wisdom-blue"
                                                            data-oid="28k9mnz"
                                                        />

                                                        <span data-oid="vh8sdrw">
                                                            {lessonDetail.teacher.stats.students}{' '}
                                                            học viên
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {activeTab === 'reviews' && (
                                    <div data-oid="8azo.0t">
                                        <h2 className="manabi-heading-3 mb-6" data-oid=".zs_3n_">
                                            Đánh giá từ học viên
                                        </h2>
                                        {lessonDetail.reviews.map((review) => (
                                            <div
                                                key={review.id}
                                                className="border-b border-light-border py-6 last:border-b-0"
                                                data-oid="4hmscxh"
                                            >
                                                <div
                                                    className="flex items-start gap-4"
                                                    data-oid="cetnpu-"
                                                >
                                                    <img
                                                        src={review.avatar}
                                                        alt={review.user}
                                                        className="w-12 h-12 rounded-full"
                                                        data-oid="eie4fch"
                                                    />

                                                    <div className="flex-1" data-oid="9m1zb.2">
                                                        <div
                                                            className="flex items-center justify-between"
                                                            data-oid="tc5t1m_"
                                                        >
                                                            <p
                                                                className="font-semibold text-charcoal-gray"
                                                                data-oid="-xi_bu3"
                                                            >
                                                                {review.user}
                                                            </p>
                                                            <div
                                                                className="flex text-energetic-yellow"
                                                                data-oid="qtbkg5x"
                                                            >
                                                                {[...Array(5)].map((_, i) => (
                                                                    <Star
                                                                        key={i}
                                                                        className={`w-4 h-4 ${i < review.rating ? 'fill-current' : ''}`}
                                                                        data-oid="cn5rrsx"
                                                                    />
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <p
                                                            className="manabi-text-muted mt-2"
                                                            data-oid="e08.1fu"
                                                        >
                                                            {review.comment}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardBody>
                        </Card>
                    </div>

                    {/* Right Column: Sticky Booking Card */}
                    <aside className="lg:col-span-1" data-oid="2x1yv:r">
                        <div className="manabi-card p-6 sticky top-8" data-oid="k9-9p3m">
                            <div
                                className="text-3xl font-bold text-wisdom-blue mb-2"
                                data-oid="n-0aw93"
                            >
                                {formatCurrency(lessonDetail.price)}
                                <span
                                    className="text-lg text-silver-gray line-through ml-2 font-normal"
                                    data-oid="o6q-hb6"
                                >
                                    {formatCurrency(lessonDetail.originalPrice)}
                                </span>
                            </div>

                            {/* Urgency notification */}
                            {lessonDetail.availableSchedules.some((s) => s.remainingSlots <= 2) && (
                                <div
                                    className="mb-4 p-3 bg-warning-red/10 border border-warning-red/20 rounded-lg"
                                    data-oid="mrk-03q"
                                >
                                    <div
                                        className="flex items-center gap-2 text-warning-red"
                                        data-oid="nzewanl"
                                    >
                                        <AlertTriangle className="w-4 h-4" data-oid="4cf2279" />
                                        <span className="text-sm font-medium" data-oid="s3z4rc-">
                                            Chỉ còn{' '}
                                            {
                                                lessonDetail.availableSchedules.find(
                                                    (s) => s.remainingSlots <= 2,
                                                )?.remainingSlots
                                            }{' '}
                                            suất!
                                        </span>
                                    </div>
                                </div>
                            )}

                            <div className="mb-6" data-oid="5f0yerp">
                                <h3
                                    className="font-semibold text-charcoal-gray mb-4"
                                    data-oid="ozbyly0"
                                >
                                    Chọn lịch học phù hợp:
                                </h3>
                                <div
                                    className="space-y-3 max-h-60 overflow-y-auto pr-2"
                                    data-oid="3531.ni"
                                >
                                    {lessonDetail.availableSchedules.map((schedule) => (
                                        <label
                                            key={schedule.id}
                                            className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all ${
                                                selectedSchedule === schedule.id
                                                    ? 'border-wisdom-blue bg-wisdom-blue/5'
                                                    : 'border-light-border hover:border-silver-gray'
                                            }`}
                                            data-oid=".m2r.kj"
                                        >
                                            <input
                                                type="radio"
                                                name="schedule"
                                                value={schedule.id}
                                                onChange={(e) =>
                                                    setSelectedSchedule(e.target.value)
                                                }
                                                className="w-4 h-4 text-wisdom-blue focus:ring-wisdom-blue mr-3"
                                                data-oid="onb-2-t"
                                            />

                                            <div className="flex-1" data-oid="hew946g">
                                                <span
                                                    className="font-medium text-charcoal-gray"
                                                    data-oid="zo8o2.-"
                                                >
                                                    {formatDate(schedule.datetime)}
                                                </span>
                                                <div
                                                    className="flex items-center justify-between mt-1"
                                                    data-oid=".ff3ta."
                                                >
                                                    <span
                                                        className="text-sm text-silver-gray"
                                                        data-oid="y12k23b"
                                                    >
                                                        Còn {schedule.remainingSlots} chỗ
                                                    </span>
                                                    {schedule.remainingSlots <= 2 && (
                                                        <Badge
                                                            variant="warning"
                                                            className="text-xs"
                                                            data-oid="ukulgag"
                                                        >
                                                            Sắp hết
                                                        </Badge>
                                                    )}
                                                </div>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <Button
                                variant="primary"
                                className="w-full"
                                disabled={!selectedSchedule}
                                onClick={() => {
                                    if (selectedSchedule) {
                                        window.location.href = `/booking/${selectedSchedule}`;
                                    }
                                }}
                                data-oid="klgv4so"
                            >
                                {selectedSchedule ? 'Đặt lịch ngay' : 'Vui lòng chọn lịch học'}
                            </Button>

                            {/* Security badge */}
                            <div className="mt-4 text-center" data-oid="w8df4ee">
                                <p className="text-xs text-silver-gray" data-oid="tq2rs14">
                                    🔒 Thanh toán an toàn 100%
                                </p>
                            </div>

                            {/* Course info */}
                            <div
                                className="mt-6 pt-6 border-t border-light-border"
                                data-oid="8p-ql0n"
                            >
                                <div className="space-y-3 text-sm" data-oid="r6xwumw">
                                    <div className="flex justify-between" data-oid="tnuypz9">
                                        <span className="text-silver-gray" data-oid="7290q4u">
                                            Thời lượng:
                                        </span>
                                        <span className="font-medium" data-oid="uu89x5q">
                                            {lessonDetail.duration}
                                        </span>
                                    </div>
                                    <div className="flex justify-between" data-oid="fezpis9">
                                        <span className="text-silver-gray" data-oid="bwfkd9b">
                                            Trình độ:
                                        </span>
                                        <Badge variant="info" data-oid="t-9-koq">
                                            {lessonDetail.level}
                                        </Badge>
                                    </div>
                                    <div className="flex justify-between" data-oid="9bur760">
                                        <span className="text-silver-gray" data-oid="3g6.enz">
                                            Số bài học:
                                        </span>
                                        <span className="font-medium" data-oid="p9_zcl7">
                                            {lessonDetail.lessonCount}
                                        </span>
                                    </div>
                                    <div className="flex justify-between" data-oid="46rx6jd">
                                        <span className="text-silver-gray" data-oid="05grk05">
                                            Ngôn ngữ:
                                        </span>
                                        <span className="font-medium" data-oid="fm3o627">
                                            {lessonDetail.language}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
};

export default LessonDetailPage;
