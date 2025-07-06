'use client';

import { useState } from 'react';
import {
    LayoutDashboard,
    Users,
    BookOpen,
    DollarSign,
    Tag,
    Settings,
    LogOut,
    Menu,
    X,
    Bell,
    Eye,
    Edit,
    CheckCircle,
    XCircle,
    Plus,
    BarChart3,
    Download,
    Star,
} from 'lucide-react';

type CourseTab = 'pending' | 'active' | 'rejected' | 'reported' | 'all';

const navigation = [
    { id: 'overview', label: 'Tổng quan', icon: LayoutDashboard, href: '/admin' },
    { id: 'users', label: 'Quản lý Người dùng', icon: Users, href: '/admin/user' },
    { id: 'courses', label: 'Quản lý Khóa học', icon: BookOpen, href: '/admin/course' },
    { id: 'finance', label: 'Quản lý Tài chính', icon: DollarSign, href: '/admin/finance' },
    { id: 'categories', label: 'Quản lý Danh mục', icon: Tag, href: '/admin/category' },
    { id: 'settings', label: 'Cài đặt Hệ thống', icon: Settings, href: '/admin/settings' },
];

const mockCourses = [
    {
        id: 1,
        title: 'Guitar đệm hát cơ bản',
        instructor: 'Nguyễn Văn Minh',
        category: 'Âm nhạc',
        submitDate: '2024-01-25',
        status: 'pending',
        price: '500,000',
        rating: 0,
        students: 0,
    },
    {
        id: 2,
        title: 'Piano cho người mới',
        instructor: 'Trần Thị Lan',
        category: 'Âm nhạc',
        submitDate: '2024-01-24',
        status: 'pending',
        price: '600,000',
        rating: 0,
        students: 0,
    },
    {
        id: 3,
        title: 'Vẽ tranh cơ bản',
        instructor: 'Lê Văn Hùng',
        category: 'Nghệ thuật',
        submitDate: '2024-01-20',
        status: 'active',
        price: '400,000',
        rating: 4.8,
        students: 25,
    },
];

export default function AdminCoursePage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [courseTab, setCourseTab] = useState<CourseTab>('pending');
    const [search, setSearch] = useState('');

    return (
        <div className="min-h-screen bg-[#F8F9FA] font-['Inter'] flex" data-oid="a9zyiaa">
            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:flex-shrink-0`}
                data-oid="0_1p-2e"
            >
                <div className="flex flex-col h-full" data-oid="ym2q:xk">
                    {/* Logo */}
                    <div
                        className="flex items-center justify-between p-6 border-b border-[#E9ECEF]"
                        data-oid="4tnkgpm"
                    >
                        <div className="flex items-center space-x-3" data-oid="jyeblyu">
                            <div
                                className="w-8 h-8 bg-[#2A7A8C] rounded-lg flex items-center justify-center"
                                data-oid="fbrtlrq"
                            >
                                <BookOpen className="w-5 h-5 text-white" data-oid="r_hg51y" />
                            </div>
                            <span className="text-xl font-bold text-[#2A7A8C]" data-oid="73ax3oh">
                                Admin Panel
                            </span>
                        </div>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="lg:hidden p-2 text-[#6C757D] hover:text-[#343A40]"
                            data-oid="-xhqn5w"
                        >
                            <X className="w-5 h-5" data-oid=".m5dkz7" />
                        </button>
                    </div>
                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-2" data-oid="tfijr7b">
                        {navigation.map((item) => (
                            <a
                                key={item.id}
                                href={item.href}
                                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${item.id === 'courses' ? 'bg-[#2A7A8C] text-white' : 'text-[#6C757D] hover:bg-[#F8F9FA] hover:text-[#343A40]'}`}
                                data-oid="umu1z2t"
                            >
                                <item.icon className="w-5 h-5" data-oid="aehw_n2" />
                                <span className="font-medium" data-oid="bd3sgp4">
                                    {item.label}
                                </span>
                            </a>
                        ))}
                    </nav>
                    {/* Logout */}
                    <div className="p-4 border-t border-[#E9ECEF]" data-oid="_q7q2q:">
                        <button
                            className="w-full flex items-center space-x-3 px-4 py-3 text-[#DC3545] hover:bg-[#DC3545]/10 rounded-lg transition-colors"
                            data-oid=".3nq77i"
                        >
                            <LogOut className="w-5 h-5" data-oid="7go8ya." />
                            <span className="font-medium" data-oid=".k6f0-u">
                                Đăng xuất
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen" data-oid="rxzubkf">
                {/* Top Bar */}
                <div
                    className="bg-white shadow-sm border-b border-[#E9ECEF] sticky top-0 z-30"
                    data-oid="1adoiy9"
                >
                    <div className="flex items-center justify-between px-6 py-4" data-oid="m3-xfm8">
                        <div className="flex items-center space-x-4" data-oid="yc0gs6j">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="lg:hidden p-2 text-[#6C757D] hover:text-[#343A40]"
                                data-oid="72ujafm"
                            >
                                <Menu className="w-5 h-5" data-oid="y3hv211" />
                            </button>
                            <h1 className="text-xl font-semibold text-[#343A40]" data-oid="dc7xupk">
                                Quản lý Khóa học
                            </h1>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="inkjt_n">
                            <button
                                className="p-2 text-[#6C757D] hover:text-[#343A40] relative"
                                data-oid="4qpi-9b"
                            >
                                <Bell className="w-5 h-5" data-oid="3_g-s9t" />
                                <span
                                    className="absolute -top-1 -right-1 w-3 h-3 bg-[#DC3545] rounded-full"
                                    data-oid="bclzr72"
                                ></span>
                            </button>
                            <div
                                className="w-8 h-8 bg-[#2A7A8C]/10 rounded-full flex items-center justify-center"
                                data-oid="7mhfwor"
                            >
                                <Users className="w-4 h-4 text-[#2A7A8C]" data-oid="d_om01f" />
                            </div>
                        </div>
                    </div>
                </div>
                {/* Page Content */}
                <div className="p-6 flex-1" data-oid="rs89rcr">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6" data-oid="5.69bsz">
                        <div data-oid="4o_h0dm">
                            <h1 className="text-3xl font-bold text-[#343A40]" data-oid="3fg6ewg">
                                Quản lý Khóa học
                            </h1>
                            <p className="text-[#6C757D] mt-1" data-oid="1g7rhf5">
                                Duyệt và quản lý khóa học trên nền tảng
                            </p>
                        </div>
                        <button
                            className="manabi-btn-primary flex items-center space-x-2"
                            data-oid="s_07g5j"
                        >
                            <Plus className="w-4 h-4" data-oid="ptgjc9h" />
                            <span data-oid="5wjg.fz">Thêm khóa học</span>
                        </button>
                    </div>
                    {/* Tabs */}
                    <div
                        className="flex space-x-1 bg-[#F8F9FA] p-1 rounded-lg mb-6"
                        data-oid="toovtu."
                    >
                        {[
                            { id: 'pending', label: 'Chờ duyệt', count: 23 },
                            { id: 'active', label: 'Đang hoạt động', count: 156 },
                            { id: 'rejected', label: 'Từ chối', count: 8 },
                            { id: 'reported', label: 'Báo cáo', count: 3 },
                            { id: 'all', label: 'Tất cả', count: 190 },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setCourseTab(tab.id as CourseTab)}
                                className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${courseTab === tab.id ? 'bg-white text-[#2A7A8C] shadow-sm' : 'text-[#6C757D] hover:text-[#343A40]'}`}
                                data-oid="nqj8j.j"
                            >
                                {tab.label} ({tab.count})
                            </button>
                        ))}
                    </div>
                    {/* Filters */}
                    <div className="manabi-card p-6 mb-6" data-oid="at6566q">
                        <div className="flex flex-col lg:flex-row gap-4" data-oid="39l12wa">
                            <div className="flex-1" data-oid="6r45v-v">
                                <div className="relative" data-oid="s4ahg8n">
                                    <input
                                        type="text"
                                        placeholder="Tìm kiếm khóa học..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="manabi-input pl-10"
                                        data-oid="0t.3xzy"
                                    />

                                    <span
                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6C757D]"
                                        data-oid="9qdj9xb"
                                    >
                                        <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            data-oid="n-x6.w9"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                                data-oid="l0idqmv"
                                            />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                            <div className="flex gap-3" data-oid="fgzlwq7">
                                <select className="manabi-input" data-oid="9bt:q-i">
                                    <option data-oid="l:8dobi">Tất cả danh mục</option>
                                    <option data-oid="bswp:u9">Âm nhạc</option>
                                    <option data-oid="i-n:zf.">Nghệ thuật</option>
                                    <option data-oid="d1j0j8h">Ngôn ngữ</option>
                                </select>
                                <select className="manabi-input" data-oid="f6v51ud">
                                    <option data-oid="tecx-ub">Tất cả giảng viên</option>
                                    <option data-oid="17_fwd.">Nguyễn Văn Minh</option>
                                    <option data-oid=":-kwwoi">Trần Thị Lan</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    {/* Courses Table */}
                    <div className="manabi-card overflow-hidden" data-oid="m1cq297">
                        <div className="overflow-x-auto" data-oid="7:h28ln">
                            <table className="w-full" data-oid="sb-649c">
                                <thead className="bg-[#F8F9FA]" data-oid="7klhq9k">
                                    <tr data-oid="d9cw-nq">
                                        <th
                                            className="px-6 py-4 text-left text-sm font-medium text-[#343A40]"
                                            data-oid="rw42z:g"
                                        >
                                            Khóa học
                                        </th>
                                        <th
                                            className="px-6 py-4 text-left text-sm font-medium text-[#343A40]"
                                            data-oid="mu33t53"
                                        >
                                            Giảng viên
                                        </th>
                                        <th
                                            className="px-6 py-4 text-left text-sm font-medium text-[#343A40]"
                                            data-oid="dfd3nh8"
                                        >
                                            Danh mục
                                        </th>
                                        <th
                                            className="px-6 py-4 text-left text-sm font-medium text-[#343A40]"
                                            data-oid="ghl9e82"
                                        >
                                            Giá
                                        </th>
                                        <th
                                            className="px-6 py-4 text-left text-sm font-medium text-[#343A40]"
                                            data-oid="k7mfy4h"
                                        >
                                            Đánh giá
                                        </th>
                                        <th
                                            className="px-6 py-4 text-left text-sm font-medium text-[#343A40]"
                                            data-oid="0:bos3-"
                                        >
                                            Học viên
                                        </th>
                                        <th
                                            className="px-6 py-4 text-left text-sm font-medium text-[#343A40]"
                                            data-oid="pedjkao"
                                        >
                                            Trạng thái
                                        </th>
                                        <th
                                            className="px-6 py-4 text-left text-sm font-medium text-[#343A40]"
                                            data-oid="hnoy4u."
                                        >
                                            Thao tác
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#E9ECEF]" data-oid=".:2wjke">
                                    {mockCourses.map((course) => (
                                        <tr
                                            key={course.id}
                                            className="hover:bg-[#F8F9FA]"
                                            data-oid="7_05zti"
                                        >
                                            <td className="px-6 py-4" data-oid="46960k3">
                                                <div
                                                    className="flex items-center space-x-3"
                                                    data-oid="t9ky0r-"
                                                >
                                                    <div
                                                        className="w-12 h-12 bg-[#2A7A8C]/10 rounded-lg flex items-center justify-center"
                                                        data-oid="c9utoy2"
                                                    >
                                                        <BookOpen
                                                            className="w-6 h-6 text-[#2A7A8C]"
                                                            data-oid="6xcgk42"
                                                        />
                                                    </div>
                                                    <div data-oid="cfjtrgf">
                                                        <p
                                                            className="font-medium text-[#343A40]"
                                                            data-oid="u5pah4p"
                                                        >
                                                            {course.title}
                                                        </p>
                                                        <p
                                                            className="text-sm text-[#6C757D]"
                                                            data-oid="8k7zqt0"
                                                        >
                                                            Ngày gửi: {course.submitDate}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4" data-oid="ut:mg92">
                                                {course.instructor}
                                            </td>
                                            <td className="px-6 py-4" data-oid="ucxvpw8">
                                                <span
                                                    className="px-3 py-1 bg-[#F8F9FA] text-[#6C757D] rounded-full text-xs"
                                                    data-oid="hjhsdwk"
                                                >
                                                    {course.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4" data-oid="q_gc.u3">
                                                <p
                                                    className="font-medium text-[#343A40]"
                                                    data-oid="5aq_1e."
                                                >
                                                    {course.price}đ
                                                </p>
                                            </td>
                                            <td className="px-6 py-4" data-oid="tumf3pb">
                                                <div
                                                    className="flex items-center space-x-1"
                                                    data-oid="zwulbp3"
                                                >
                                                    <Star
                                                        className="w-4 h-4 text-[#FFC947] fill-current"
                                                        data-oid="gvdpve3"
                                                    />

                                                    <span
                                                        className="text-[#343A40]"
                                                        data-oid="2xz.w4n"
                                                    >
                                                        {course.rating}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4" data-oid="ujqdiw.">
                                                {course.students}
                                            </td>
                                            <td className="px-6 py-4" data-oid="y-irwwr">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                        course.status === 'active'
                                                            ? 'bg-[#28A745]/10 text-[#28A745]'
                                                            : course.status === 'pending'
                                                              ? 'bg-[#FFC947]/10 text-[#FFC947]'
                                                              : 'bg-[#DC3545]/10 text-[#DC3545]'
                                                    }`}
                                                    data-oid=":uxhc.3"
                                                >
                                                    {course.status === 'active'
                                                        ? 'Hoạt động'
                                                        : course.status === 'pending'
                                                          ? 'Chờ duyệt'
                                                          : 'Từ chối'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4" data-oid="eng9lh0">
                                                <div
                                                    className="flex items-center space-x-2"
                                                    data-oid=":60_6vz"
                                                >
                                                    <button
                                                        className="p-2 text-[#2A7A8C] hover:bg-[#2A7A8C]/10 rounded-lg"
                                                        data-oid="-.__ze6"
                                                    >
                                                        <Eye
                                                            className="w-4 h-4"
                                                            data-oid="c3tya:s"
                                                        />
                                                    </button>
                                                    <button
                                                        className="p-2 text-[#28A745] hover:bg-[#28A745]/10 rounded-lg"
                                                        data-oid="u.lh41y"
                                                    >
                                                        <CheckCircle
                                                            className="w-4 h-4"
                                                            data-oid="d91le3k"
                                                        />
                                                    </button>
                                                    <button
                                                        className="p-2 text-[#DC3545] hover:bg-[#DC3545]/10 rounded-lg"
                                                        data-oid="lo0ny1i"
                                                    >
                                                        <XCircle
                                                            className="w-4 h-4"
                                                            data-oid="yiy5xxs"
                                                        />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
