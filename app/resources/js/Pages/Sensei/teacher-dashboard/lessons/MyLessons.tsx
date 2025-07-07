'use client';

import React, { useState, Fragment } from 'react';
import {
    Plus,
    Search,
    Filter,
    BookOpen,
    Star,
    Users,
    DollarSign,
    MoreVertical,
    Eye,
    Edit,
    Trash2,
    CheckCircle,
    Archive,
    X,
    TrendingUp,
    Calendar,
} from 'lucide-react';
import { Menu, Transition } from '@headlessui/react';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

// --- Interfaces and Dummy Data ---
interface Lesson {
    id: number;
    title: string;
    status: 'published' | 'draft' | 'pending';
    price: number;
    students: number;
    rating: number;
    revenue: number;
    coverImage: string;
}

const initialLessons: Lesson[] = [
    {
        id: 1,
        title: 'Guitar đệm hát cơ bản trong 30 ngày',
        status: 'published',
        price: 500000,
        students: 152,
        rating: 4.8,
        revenue: 76000000,
        coverImage:
            'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=225&fit=crop',
    },
    {
        id: 2,
        title: 'Piano cổ điển cho người mới bắt đầu',
        status: 'draft',
        price: 600000,
        students: 0,
        rating: 0,
        revenue: 0,
        coverImage:
            'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=400&h=225&fit=crop',
    },
    {
        id: 3,
        title: 'Luyện thi JLPT N4 cấp tốc',
        status: 'pending',
        price: 850000,
        students: 23,
        rating: 4.9,
        revenue: 19550000,
        coverImage:
            'https://images.unsplash.com/photo-1528164344705-47542687000d?w=400&h=225&fit=crop',
    },
    {
        id: 4,
        title: 'Nhiếp ảnh đường phố cùng chuyên gia',
        status: 'published',
        price: 700000,
        students: 89,
        rating: 4.7,
        revenue: 62300000,
        coverImage:
            'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=225&fit=crop',
    },
];

const statusConfig = {
    published: {
        text: 'Đang hoạt động',
        variant: 'success' as const,
        icon: CheckCircle,
    },
    draft: {
        text: 'Bản nháp',
        variant: 'neutral' as const,
        icon: Edit,
    },
    pending: {
        text: 'Chờ duyệt',
        variant: 'warning' as const,
        icon: Archive,
    },
};

const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

// --- Components ---
const LessonFormModal = ({
    onSave,
    onCancel,
}: {
    onSave: (data: any) => void;
    onCancel: () => void;
}) => (
    <div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        data-oid="ikwul98"
    >
        <Card className="w-full max-w-2xl" data-oid="0ca.dkf">
            <CardHeader data-oid="zslpro:">
                <div className="flex justify-between items-center" data-oid="nt:6d3q">
                    <h2 className="manabi-heading-3" data-oid="lymybwb">
                        Tạo khóa học mới
                    </h2>
                    <button
                        onClick={onCancel}
                        className="text-silver-gray hover:text-charcoal-gray transition-colors"
                        data-oid="jh7aoxk"
                    >
                        <X data-oid="wqk4kqx" />
                    </button>
                </div>
            </CardHeader>
            <CardBody data-oid="g_1lom8">
                <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-4" data-oid="jpys6u1">
                    <div data-oid="z.-12oq">
                        <label className="manabi-form-label" data-oid="qo2.f0z">
                            Tên khóa học *
                        </label>
                        <input
                            type="text"
                            className="manabi-input"
                            placeholder="Ví dụ: Guitar đệm hát cơ bản"
                            data-oid="73f03vs"
                        />
                    </div>
                    <div data-oid="qibymxh">
                        <label className="manabi-form-label" data-oid="ut4_l-i">
                            Mô tả khóa học
                        </label>
                        <textarea
                            rows={5}
                            className="manabi-textarea"
                            placeholder="Giới thiệu về nội dung, mục tiêu của khóa học..."
                            data-oid="g7bkrf7"
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-oid="70dnhxu">
                        <div data-oid="liiznwq">
                            <label className="manabi-form-label" data-oid="hd1s_a0">
                                Danh mục
                            </label>
                            <select className="manabi-select" data-oid=":v41a7z">
                                <option data-oid="jop_7ws">Âm nhạc</option>
                                <option data-oid="0m.avcr">Nghệ thuật</option>
                                <option data-oid="c8qhong">Ngoại ngữ</option>
                            </select>
                        </div>
                        <div data-oid="5gpigi_">
                            <label className="manabi-form-label" data-oid="9k.5f9-">
                                Giá (VNĐ)
                            </label>
                            <input
                                type="number"
                                className="manabi-input"
                                placeholder="500000"
                                data-oid="-9f1by_"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-oid="o:jmbbq">
                        <div data-oid=".7wjcdg">
                            <label className="manabi-form-label" data-oid="oc0hwvi">
                                Thời lượng
                            </label>
                            <input
                                type="text"
                                className="manabi-input"
                                placeholder="12 giờ"
                                data-oid="7qj34z-"
                            />
                        </div>
                        <div data-oid="sz8qu0k">
                            <label className="manabi-form-label" data-oid="tev4u3y">
                                Hình thức
                            </label>
                            <select className="manabi-select" data-oid="7yqk_dg">
                                <option data-oid="89qslhv">Online</option>
                                <option data-oid="ngj4591">Offline</option>
                                <option data-oid="2n4hm0t">Kết hợp</option>
                            </select>
                        </div>
                    </div>
                    <div data-oid="7_cp2w4">
                        <label className="manabi-form-label" data-oid="mk3k59y">
                            Ảnh bìa
                        </label>
                        <div
                            className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-light-border border-dashed rounded-md"
                            data-oid="qd6:slr"
                        >
                            <div className="space-y-1 text-center" data-oid="tk4ybpc">
                                <BookOpen
                                    className="mx-auto h-12 w-12 text-silver-gray"
                                    data-oid="zmzwe56"
                                />

                                <div className="flex text-sm text-silver-gray" data-oid="lquoxxd">
                                    <label
                                        className="relative cursor-pointer bg-white rounded-md font-medium text-wisdom-blue hover:text-wisdom-blue/80"
                                        data-oid="g7tm.m_"
                                    >
                                        <span data-oid="9b5k45j">Tải lên ảnh</span>
                                        <input type="file" className="sr-only" data-oid="ffoll:o" />
                                    </label>
                                    <p className="pl-1" data-oid="jegz024">
                                        hoặc kéo thả
                                    </p>
                                </div>
                                <p className="text-xs text-silver-gray" data-oid="1kwborm">
                                    PNG, JPG, GIF tối đa 10MB
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="flex justify-end gap-3 mt-6 pt-6 border-t border-light-border"
                    data-oid="p8-2:0."
                >
                    <Button variant="ghost" onClick={onCancel} data-oid="16q23..">
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={() => onSave({})} data-oid=".eyo27k">
                        Tạo khóa học
                    </Button>
                </div>
            </CardBody>
        </Card>
    </div>
);

const LessonCard = ({ lesson }: { lesson: Lesson }) => {
    const config = statusConfig[lesson.status];

    return (
        <Card className="group hover:shadow-lg transition-shadow duration-300" data-oid="sg-7_72">
            <div className="relative" data-oid="wzedp_j">
                <img
                    src={lesson.coverImage}
                    alt={lesson.title}
                    className="w-full h-48 object-cover rounded-t-xl"
                    data-oid="79tzns-"
                />

                <div className="absolute top-3 right-3" data-oid="au1uoc5">
                    <Badge variant={config.variant} data-oid=".zh6blh">
                        <config.icon className="w-3 h-3 mr-1" data-oid="e4d8eqg" />
                        {config.text}
                    </Badge>
                </div>
                <div className="absolute top-3 left-3" data-oid="jcqy60y">
                    <Menu as="div" className="relative" data-oid="2oea-zh">
                        <Menu.Button
                            className="p-1 bg-white/80 backdrop-blur-sm rounded-full text-silver-gray hover:text-charcoal-gray transition-colors"
                            data-oid="3jc28oh"
                        >
                            <MoreVertical className="w-4 h-4" data-oid="w_.v5q4" />
                        </Menu.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                            data-oid="95x:p5y"
                        >
                            <Menu.Items
                                className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-light-border py-1 z-10"
                                data-oid="512_0_h"
                            >
                                <Menu.Item data-oid="1twkcmb">
                                    {({ active }) => (
                                        <button
                                            className={`${
                                                active ? 'bg-light-border' : ''
                                            } flex items-center gap-2 w-full px-4 py-2 text-sm text-charcoal-gray`}
                                            data-oid="ffboi8b"
                                        >
                                            <Eye className="w-4 h-4" data-oid="taiya3." />
                                            Xem chi tiết
                                        </button>
                                    )}
                                </Menu.Item>
                                <Menu.Item data-oid="_b72cp1">
                                    {({ active }) => (
                                        <button
                                            className={`${
                                                active ? 'bg-light-border' : ''
                                            } flex items-center gap-2 w-full px-4 py-2 text-sm text-charcoal-gray`}
                                            data-oid="3tn2x4j"
                                        >
                                            <Edit className="w-4 h-4" data-oid="tpmjv:7" />
                                            Chỉnh sửa
                                        </button>
                                    )}
                                </Menu.Item>
                                <Menu.Item data-oid="3ik:gzt">
                                    {({ active }) => (
                                        <button
                                            className={`${
                                                active ? 'bg-light-border' : ''
                                            } flex items-center gap-2 w-full px-4 py-2 text-sm text-warning-red`}
                                            data-oid="dku1c_."
                                        >
                                            <Trash2 className="w-4 h-4" data-oid="51gq:su" />
                                            Xóa
                                        </button>
                                    )}
                                </Menu.Item>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>
            </div>
            <CardBody className="p-4" data-oid="ig6ivw4">
                <h3
                    className="font-semibold text-charcoal-gray mb-2 line-clamp-2"
                    data-oid="infddx."
                >
                    {lesson.title}
                </h3>
                <div className="flex items-center justify-between mb-3" data-oid="hjce5uc">
                    <span className="text-lg font-bold text-wisdom-blue" data-oid="qs0cwz1">
                        {formatCurrency(lesson.price)}
                    </span>
                    <div className="flex items-center gap-1" data-oid="4m7ps22">
                        <Star
                            className="w-4 h-4 text-energetic-yellow fill-current"
                            data-oid="l0r1ym7"
                        />

                        <span className="text-sm font-medium" data-oid="m4ff9la">
                            {lesson.rating}
                        </span>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm" data-oid="6v5gs4q">
                    <div className="flex items-center gap-2" data-oid="0xjd:qw">
                        <Users className="w-4 h-4 text-silver-gray" data-oid="xai17_q" />
                        <span className="text-silver-gray" data-oid="3.9uw0:">
                            {lesson.students} học viên
                        </span>
                    </div>
                    <div className="flex items-center gap-2" data-oid="k6fg2rf">
                        <DollarSign className="w-4 h-4 text-silver-gray" data-oid="noszg5l" />
                        <span className="text-silver-gray" data-oid="0ehdanw">
                            {formatCurrency(lesson.revenue)}
                        </span>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};

// --- Main Component ---
export default function LessonsPage() {
    const [lessons, setLessons] = useState<Lesson[]>(initialLessons);
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft' | 'pending'>(
        'all',
    );
    const [sortBy, setSortBy] = useState<'newest' | 'students' | 'revenue'>('newest');

    const handleAddLesson = (data: any) => {
        // Add new lesson logic
        setShowModal(false);
    };

    const filteredLessons = lessons
        .filter(
            (lesson) =>
                lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
                (statusFilter === 'all' || lesson.status === statusFilter),
        )
        .sort((a, b) => {
            switch (sortBy) {
                case 'students':
                    return b.students - a.students;
                case 'revenue':
                    return b.revenue - a.revenue;
                default:
                    return b.id - a.id;
            }
        });

    const stats = {
        totalCourses: lessons.length,
        totalRevenue: lessons.reduce((sum, lesson) => sum + lesson.revenue, 0),
        totalStudents: lessons.reduce((sum, lesson) => sum + lesson.students, 0),
        averageRating:
            lessons.filter((l) => l.rating > 0).reduce((sum, lesson) => sum + lesson.rating, 0) /
                lessons.filter((l) => l.rating > 0).length || 0,
    };

    return (
        <div className="manabi-section" data-oid="9a8hq95">
            {/* Header */}
            <div className="flex justify-between items-center" data-oid="2y0g416">
                <div data-oid="e-bpupf">
                    <h1 className="manabi-heading-1" data-oid="_6o-_5p">
                        Quản lý khóa học
                    </h1>
                    <p className="manabi-text-muted mt-1" data-oid="bf5y3od">
                        Tạo và quản lý các khóa học của bạn
                    </p>
                </div>
                <Button variant="primary" onClick={() => setShowModal(true)} data-oid="4-00:5w">
                    <Plus className="w-4 h-4 mr-2" data-oid="bsn_21c" />
                    Tạo khóa học mới
                </Button>
            </div>

            {/* Stats Cards */}
            <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                data-oid="msaz40m"
            >
                <Card data-oid="bxsd6ax">
                    <CardBody className="p-6" data-oid="kopr-ca">
                        <div className="flex items-center justify-between" data-oid="fjy9nm0">
                            <div data-oid="q_5m7om">
                                <p className="text-sm text-silver-gray" data-oid="kalz-ro">
                                    Tổng số khóa học
                                </p>
                                <p
                                    className="text-2xl font-bold text-charcoal-gray"
                                    data-oid="c4p0u61"
                                >
                                    {stats.totalCourses}
                                </p>
                            </div>
                            <div
                                className="w-12 h-12 bg-wisdom-blue/10 rounded-lg flex items-center justify-center"
                                data-oid="k21:w8c"
                            >
                                <BookOpen className="w-6 h-6 text-wisdom-blue" data-oid="ksikc_w" />
                            </div>
                        </div>
                    </CardBody>
                </Card>
                <Card data-oid="x0kt1mn">
                    <CardBody className="p-6" data-oid="36revk.">
                        <div className="flex items-center justify-between" data-oid="4q0ewz4">
                            <div data-oid=".wo2ca6">
                                <p className="text-sm text-silver-gray" data-oid="4n81pra">
                                    Tổng doanh thu
                                </p>
                                <p
                                    className="text-2xl font-bold text-charcoal-gray"
                                    data-oid="tb7u7.2"
                                >
                                    {formatCurrency(stats.totalRevenue)}
                                </p>
                            </div>
                            <div
                                className="w-12 h-12 bg-success-green/10 rounded-lg flex items-center justify-center"
                                data-oid="_8tm7n:"
                            >
                                <DollarSign
                                    className="w-6 h-6 text-success-green"
                                    data-oid="g2qbenl"
                                />
                            </div>
                        </div>
                    </CardBody>
                </Card>
                <Card data-oid="tb87_kl">
                    <CardBody className="p-6" data-oid="hkru3zx">
                        <div className="flex items-center justify-between" data-oid="zkxaung">
                            <div data-oid="58e1zq4">
                                <p className="text-sm text-silver-gray" data-oid="3dndug-">
                                    Học viên mới tháng này
                                </p>
                                <p
                                    className="text-2xl font-bold text-charcoal-gray"
                                    data-oid="ubtxg20"
                                >
                                    +{Math.floor(stats.totalStudents * 0.15)}
                                </p>
                            </div>
                            <div
                                className="w-12 h-12 bg-energetic-yellow/10 rounded-lg flex items-center justify-center"
                                data-oid="31c7.iw"
                            >
                                <TrendingUp
                                    className="w-6 h-6 text-energetic-yellow"
                                    data-oid="qfijffd"
                                />
                            </div>
                        </div>
                    </CardBody>
                </Card>
                <Card data-oid="5aj34k1">
                    <CardBody className="p-6" data-oid="fj8bq_4">
                        <div className="flex items-center justify-between" data-oid="p8tehmm">
                            <div data-oid="8l-.ojk">
                                <p className="text-sm text-silver-gray" data-oid="mcnovk.">
                                    Đánh giá trung bình
                                </p>
                                <p
                                    className="text-2xl font-bold text-charcoal-gray"
                                    data-oid="nrmr0n4"
                                >
                                    {stats.averageRating.toFixed(1)}
                                </p>
                            </div>
                            <div
                                className="w-12 h-12 bg-warning-red/10 rounded-lg flex items-center justify-center"
                                data-oid="ye64p4y"
                            >
                                <Star className="w-6 h-6 text-warning-red" data-oid="uu6.gex" />
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>

            {/* Filters */}
            <Card data-oid="5z2.j-3">
                <CardBody className="p-6" data-oid="6flbr9p">
                    <div className="flex flex-col sm:flex-row gap-4" data-oid=":q5dh8.">
                        <div className="flex-1 relative" data-oid="rzq10ad">
                            <Search
                                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-silver-gray"
                                data-oid="3tvfa2r"
                            />

                            <input
                                type="text"
                                placeholder="Tìm kiếm khóa học..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="manabi-input pl-10"
                                data-oid="_1zz9ho"
                            />
                        </div>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value as any)}
                            className="manabi-select w-full sm:w-48"
                            data-oid="ki6frd1"
                        >
                            <option value="all" data-oid="d:23p_e">
                                Tất cả trạng thái
                            </option>
                            <option value="published" data-oid="32v2nsd">
                                Đang hoạt động
                            </option>
                            <option value="draft" data-oid="gzkieh0">
                                Bản nháp
                            </option>
                            <option value="pending" data-oid="0hm37rb">
                                Chờ duyệt
                            </option>
                        </select>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as any)}
                            className="manabi-select w-full sm:w-48"
                            data-oid="2p1gu.7"
                        >
                            <option value="newest" data-oid="yft7y2r">
                                Mới nhất
                            </option>
                            <option value="students" data-oid="qt72u2e">
                                Nhiều học viên nhất
                            </option>
                            <option value="revenue" data-oid="aadhvhc">
                                Doanh thu cao nhất
                            </option>
                        </select>
                    </div>
                </CardBody>
            </Card>

            {/* Lessons Grid */}
            <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                data-oid="33vmtck"
            >
                {filteredLessons.map((lesson) => (
                    <LessonCard key={lesson.id} lesson={lesson} data-oid="msw7dzj" />
                ))}
            </div>

            {/* Empty State */}
            {filteredLessons.length === 0 && (
                <Card data-oid="_3ds0m.">
                    <CardBody className="text-center py-12" data-oid="2kzch6m">
                        <BookOpen
                            className="w-16 h-16 mx-auto text-silver-gray mb-4"
                            data-oid="s4cox_z"
                        />

                        <h3
                            className="text-lg font-semibold text-charcoal-gray mb-2"
                            data-oid="seh1he9"
                        >
                            Không tìm thấy khóa học
                        </h3>
                        <p className="text-silver-gray mb-6" data-oid="lo2:2l-">
                            Thử thay đổi bộ lọc hoặc tạo khóa học mới
                        </p>
                        <Button
                            variant="primary"
                            onClick={() => setShowModal(true)}
                            data-oid="24:a.f6"
                        >
                            <Plus className="w-4 h-4 mr-2" data-oid="ir0nz4c" />
                            Tạo khóa học đầu tiên
                        </Button>
                    </CardBody>
                </Card>
            )}

            {/* Modal */}
            {showModal && (
                <LessonFormModal
                    onSave={handleAddLesson}
                    onCancel={() => setShowModal(false)}
                    data-oid="f65qb-:"
                />
            )}
        </div>
    );
}
