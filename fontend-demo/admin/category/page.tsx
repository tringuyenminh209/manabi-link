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
    Plus,
    Edit,
    Trash2,
    Search,
    Filter,
    Shield,
    X,
    Menu,
    Bell,
} from 'lucide-react';
import Link from 'next/link';

const mockCategories = [
    { id: 1, name: 'Âm nhạc', description: 'Các khóa học về nhạc lý, nhạc cụ...', courses: 12 },
    { id: 2, name: 'Ngoại ngữ', description: 'Tiếng Anh, Nhật, Hàn, Trung...', courses: 8 },
    {
        id: 3,
        name: 'Kỹ năng sống',
        description: 'Giao tiếp, thuyết trình, quản lý thời gian...',
        courses: 5,
    },
    { id: 4, name: 'Công nghệ', description: 'Lập trình, tin học văn phòng...', courses: 7 },
];

const navigation = [
    { id: 'overview', label: 'Tổng quan', icon: LayoutDashboard, href: '/admin' },
    { id: 'users', label: 'Quản lý Người dùng', icon: Users, href: '/admin/user' },
    { id: 'courses', label: 'Quản lý Khóa học', icon: BookOpen, href: '/admin/course' },
    { id: 'finance', label: 'Quản lý Tài chính', icon: DollarSign, href: '/admin/finance' },
    { id: 'categories', label: 'Quản lý Danh mục', icon: Tag, href: '/admin/category' },
    { id: 'settings', label: 'Cài đặt Hệ thống', icon: Settings, href: '/admin/settings' },
];

const adminData = {
    name: 'Nguyễn Admin',
    role: 'Quản trị viên',
};

export default function AdminCategoryPage() {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('all');
    const [categories, setCategories] = useState(mockCategories);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#F8F9FA] font-['Inter'] flex" data-oid="jarvivg">
            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } lg:relative lg:flex-shrink-0`}
                data-oid="4oxx:4l"
            >
                <div className="flex flex-col h-full" data-oid=":.5j6i-">
                    {/* Logo */}
                    <div
                        className="flex items-center justify-between p-6 border-b border-[#E9ECEF]"
                        data-oid="2c.jq-h"
                    >
                        <div className="flex items-center space-x-3" data-oid=".9fzj3.">
                            <div
                                className="w-8 h-8 bg-[#2A7A8C] rounded-lg flex items-center justify-center"
                                data-oid="_66yc_9"
                            >
                                <Shield className="w-5 h-5 text-white" data-oid="fm7_vz3" />
                            </div>
                            <span className="text-xl font-bold text-[#2A7A8C]" data-oid="ts2o78h">
                                Admin Panel
                            </span>
                        </div>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="lg:hidden p-2 text-[#6C757D] hover:text-[#343A40]"
                            data-oid="bgpi4j_"
                        >
                            <X className="w-5 h-5" data-oid="p7adh6b" />
                        </button>
                    </div>
                    {/* Admin Info */}
                    <div className="p-6 border-b border-[#E9ECEF]" data-oid="ga.ixl5">
                        <div className="flex items-center space-x-3" data-oid="40.nucb">
                            <div
                                className="w-10 h-10 bg-[#2A7A8C]/10 rounded-full flex items-center justify-center"
                                data-oid="si4bqny"
                            >
                                <Users className="w-5 h-5 text-[#2A7A8C]" data-oid="vuuhvme" />
                            </div>
                            <div data-oid="9pnjzmz">
                                <p className="font-medium text-[#343A40]" data-oid="ii3bigo">
                                    {adminData.name}
                                </p>
                                <p className="text-sm text-[#6C757D]" data-oid="5vnzji1">
                                    {adminData.role}
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-2" data-oid="yfbjuo0">
                        {navigation.map((item) => (
                            <Link
                                key={item.id}
                                href={item.href}
                                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                                    item.id === 'categories'
                                        ? 'bg-[#2A7A8C] text-white'
                                        : 'text-[#6C757D] hover:bg-[#F8F9FA] hover:text-[#343A40]'
                                }`}
                                data-oid="hjzc7_p"
                            >
                                <item.icon className="w-5 h-5" data-oid="4hyqcpx" />
                                <span className="font-medium" data-oid="bc5_qcl">
                                    {item.label}
                                </span>
                            </Link>
                        ))}
                    </nav>
                    {/* Logout */}
                    <div className="p-4 border-t border-[#E9ECEF]" data-oid="mfsxplc">
                        <button
                            className="w-full flex items-center space-x-3 px-4 py-3 text-[#DC3545] hover:bg-[#DC3545]/10 rounded-lg transition-colors"
                            data-oid="x7ofjuc"
                        >
                            <LogOut className="w-5 h-5" data-oid="l.o3g2s" />
                            <span className="font-medium" data-oid="p_-j-jo">
                                Đăng xuất
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen" data-oid="_55jk9g">
                {/* Top Bar */}
                <div
                    className="bg-white shadow-sm border-b border-[#E9ECEF] sticky top-0 z-30"
                    data-oid="aqam28e"
                >
                    <div className="flex items-center justify-between px-6 py-4" data-oid="0ip2a_t">
                        <div className="flex items-center space-x-4" data-oid="-y4-1af">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="lg:hidden p-2 text-[#6C757D] hover:text-[#343A40]"
                                data-oid="7_m0v9k"
                            >
                                <Menu className="w-5 h-5" data-oid="e68i0n-" />
                            </button>
                            <h1 className="text-xl font-semibold text-[#343A40]" data-oid="p43yrj5">
                                Quản lý Danh mục
                            </h1>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="-fal4vr">
                            <button
                                className="p-2 text-[#6C757D] hover:text-[#343A40] relative"
                                data-oid="k4eubeq"
                            >
                                <Bell className="w-5 h-5" data-oid="cli3vpp" />
                                <span
                                    className="absolute -top-1 -right-1 w-3 h-3 bg-[#DC3545] rounded-full"
                                    data-oid="wn_g30r"
                                ></span>
                            </button>
                            <div
                                className="w-8 h-8 bg-[#2A7A8C]/10 rounded-full flex items-center justify-center"
                                data-oid="jikvmkz"
                            >
                                <Users className="w-4 h-4 text-[#2A7A8C]" data-oid="ge5b3pd" />
                            </div>
                        </div>
                    </div>
                </div>
                {/* Page Content */}
                <div className="p-6 flex-1" data-oid="4s-9uts">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8" data-oid="pdktfkl">
                        <div data-oid="wgobo7d">
                            <h1 className="text-3xl font-bold text-[#343A40]" data-oid="3mjnp.m">
                                Quản lý Danh mục
                            </h1>
                            <p className="text-[#6C757D] mt-1" data-oid="q6yts8r">
                                Tạo, chỉnh sửa và quản lý các danh mục khóa học trên hệ thống.
                            </p>
                        </div>
                        <button
                            className="manabi-btn-primary flex items-center space-x-2"
                            data-oid="ykx77xk"
                        >
                            <Plus className="w-4 h-4" data-oid="s0o2mg:" />
                            <span data-oid="kpdg47e">Thêm danh mục</span>
                        </button>
                    </div>
                    {/* Filter & Search */}
                    <div className="manabi-card p-6 mb-6" data-oid="lsh1r0m">
                        <div className="flex flex-col lg:flex-row gap-4" data-oid=":h28axo">
                            <div className="flex-1" data-oid="dimb5x1">
                                <div className="relative" data-oid="w4d2d1p">
                                    <Search
                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6C757D]"
                                        data-oid="7-n.n5y"
                                    />

                                    <input
                                        type="text"
                                        placeholder="Tìm kiếm danh mục..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="manabi-input pl-10"
                                        data-oid="7_5-c4a"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-3" data-oid="0m0r348">
                                <select
                                    value={filter}
                                    onChange={(e) => setFilter(e.target.value)}
                                    className="manabi-input"
                                    data-oid="yvm5vt."
                                >
                                    <option value="all" data-oid="k-g2003">
                                        Tất cả
                                    </option>
                                    <option value="active" data-oid="fld--94">
                                        Đang sử dụng
                                    </option>
                                    <option value="inactive" data-oid="q1lfr2i">
                                        Ngừng sử dụng
                                    </option>
                                </select>
                                <button
                                    className="manabi-btn-secondary flex items-center space-x-2"
                                    data-oid="jbc1nig"
                                >
                                    <Filter className="w-4 h-4" data-oid="::kqg1s" />
                                    <span data-oid="-.qi90c">Lọc nâng cao</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Table */}
                    <div className="manabi-card overflow-hidden" data-oid=":.s4:dp">
                        <div className="overflow-x-auto" data-oid="r56hbbg">
                            <table className="w-full" data-oid="y3z22so">
                                <thead className="bg-[#F8F9FA]" data-oid="y2mn11i">
                                    <tr data-oid="8x1jliy">
                                        <th
                                            className="px-6 py-4 text-left text-sm font-medium text-[#343A40]"
                                            data-oid="zeyjivn"
                                        >
                                            Tên danh mục
                                        </th>
                                        <th
                                            className="px-6 py-4 text-left text-sm font-medium text-[#343A40]"
                                            data-oid="upky3sl"
                                        >
                                            Mô tả
                                        </th>
                                        <th
                                            className="px-6 py-4 text-left text-sm font-medium text-[#343A40]"
                                            data-oid="8-eu6st"
                                        >
                                            Số khóa học
                                        </th>
                                        <th
                                            className="px-6 py-4 text-left text-sm font-medium text-[#343A40]"
                                            data-oid="ff_bgj8"
                                        >
                                            Hành động
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#E9ECEF]" data-oid="df2-3-9">
                                    {categories
                                        .filter((cat) =>
                                            cat.name.toLowerCase().includes(search.toLowerCase()),
                                        )
                                        .map((cat) => (
                                            <tr
                                                key={cat.id}
                                                className="hover:bg-[#F8F9FA]"
                                                data-oid=":nmp15e"
                                            >
                                                <td className="px-6 py-4" data-oid="2wlm72h">
                                                    <div
                                                        className="flex items-center space-x-3"
                                                        data-oid=".baiwjw"
                                                    >
                                                        <div
                                                            className="w-10 h-10 bg-[#2A7A8C]/10 rounded-lg flex items-center justify-center"
                                                            data-oid="7b.i1hk"
                                                        >
                                                            <Tag
                                                                className="w-5 h-5 text-[#2A7A8C]"
                                                                data-oid="rvni:05"
                                                            />
                                                        </div>
                                                        <div data-oid="vdl7qhz">
                                                            <p
                                                                className="font-medium text-[#343A40]"
                                                                data-oid="j43jhpl"
                                                            >
                                                                {cat.name}
                                                            </p>
                                                            <p
                                                                className="text-sm text-[#6C757D]"
                                                                data-oid="qkcerr6"
                                                            >
                                                                ID: {cat.id}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4" data-oid="wbhwen.">
                                                    <p
                                                        className="text-[#6C757D] max-w-xs truncate"
                                                        data-oid="e7mc2y."
                                                    >
                                                        {cat.description}
                                                    </p>
                                                </td>
                                                <td className="px-6 py-4" data-oid="gm9s.9i">
                                                    <span
                                                        className="px-3 py-1 bg-[#28A745]/10 text-[#28A745] rounded-full text-xs font-medium"
                                                        data-oid="4uyukx8"
                                                    >
                                                        {cat.courses} khóa học
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4" data-oid="6e4eg5n">
                                                    <div
                                                        className="flex items-center space-x-2"
                                                        data-oid="9:k.203"
                                                    >
                                                        <button
                                                            className="p-2 text-[#2A7A8C] hover:bg-[#2A7A8C]/10 rounded-lg"
                                                            data-oid="4o50wd1"
                                                        >
                                                            <Edit
                                                                className="w-4 h-4"
                                                                data-oid="x_cr.1b"
                                                            />
                                                        </button>
                                                        <button
                                                            className="p-2 text-[#DC3545] hover:bg-[#DC3545]/10 rounded-lg"
                                                            data-oid="b2vn.-c"
                                                        >
                                                            <Trash2
                                                                className="w-4 h-4"
                                                                data-oid="ps7mnmb"
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

// CSS phụ trợ cho sidebar-link (bạn có thể thêm vào globals.css hoặc dùng tailwind class trực tiếp)
// .sidebar-link { @apply flex items-center space-x-3 px-4 py-3 rounded-lg text-charcoal-gray hover:bg-light-border transition-colors; }
// .sidebar-link-active { @apply bg-light-border font-semibold text-wisdom-blue; }
