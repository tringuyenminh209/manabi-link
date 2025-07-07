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
    Plus,
    Eye,
    Edit,
    Lock,
    Unlock,
    Tag,
    Shield,
    X,
    Menu,
} from 'lucide-react';

const mockUsers = [
    {
        id: 1,
        name: 'Nguyễn Thị Mai',
        email: 'mai@example.com',
        role: 'learner',
        status: 'active',
        verification: 'verified',
        joinDate: '2024-01-15',
        avatar: '/api/placeholder/40/40',
    },
    {
        id: 2,
        name: 'Trần Văn Minh',
        email: 'minh@example.com',
        role: 'instructor',
        status: 'active',
        verification: 'verified',
        joinDate: '2024-01-10',
        avatar: '/api/placeholder/40/40',
    },
    {
        id: 3,
        name: 'Lê Thị Hoa',
        email: 'hoa@example.com',
        role: 'learner',
        status: 'locked',
        verification: 'pending',
        joinDate: '2024-01-20',
        avatar: '/api/placeholder/40/40',
    },
];

const navigation = [
    { id: 'overview', label: 'Tổng quan', icon: LayoutDashboard, href: '/admin' },
    { id: 'users', label: 'Quản lý Người dùng', icon: Users, href: '/admin/user' },
    { id: 'courses', label: 'Quản lý Khóa học', icon: BookOpen, href: '/admin/course' },
    { id: 'finance', label: 'Quản lý Tài chính', icon: DollarSign, href: '/admin/finance' },
    { id: 'categories', label: 'Quản lý Danh mục', icon: Tag, href: '/admin/category' },
    { id: 'settings', label: 'Cài đặt Hệ thống', icon: Settings, href: '/admin/settings' },
];

export default function UserManagementPage() {
    const [search, setSearch] = useState('');
    const [role, setRole] = useState('all');
    const [status, setStatus] = useState('all');
    const [verification, setVerification] = useState('all');
    const [selected, setSelected] = useState<number[]>([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const adminData = {
        name: 'Admin System',
        avatar: '/api/placeholder/60/60',
        role: 'Quản trị viên',
    };
    return (
        <div className="min-h-screen bg-[#F8F9FA] font-['Inter'] flex" data-oid="qm:zs_q">
            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } lg:relative lg:flex-shrink-0`}
                data-oid="vi7k98."
            >
                <div className="flex flex-col h-full" data-oid="jcyz7oh">
                    {/* Logo */}
                    <div
                        className="flex items-center justify-between p-6 border-b border-[#E9ECEF]"
                        data-oid="gcgdyjp"
                    >
                        <div className="flex items-center space-x-3" data-oid="9n-www2">
                            <div
                                className="w-8 h-8 bg-[#2A7A8C] rounded-lg flex items-center justify-center"
                                data-oid="kcxhxu9"
                            >
                                <Shield className="w-5 h-5 text-white" data-oid="2cv76sv" />
                            </div>
                            <span className="text-xl font-bold text-[#2A7A8C]" data-oid="wh16p.l">
                                Admin Panel
                            </span>
                        </div>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="lg:hidden p-2 text-[#6C757D] hover:text-[#343A40]"
                            data-oid="b4raf4y"
                        >
                            <X className="w-5 h-5" data-oid="cnsk28v" />
                        </button>
                    </div>
                    {/* Admin Info */}
                    <div className="p-6 border-b border-[#E9ECEF]" data-oid="89xx:at">
                        <div className="flex items-center space-x-3" data-oid="7t.i2u2">
                            <div
                                className="w-10 h-10 bg-[#2A7A8C]/10 rounded-full flex items-center justify-center"
                                data-oid="gakpvu0"
                            >
                                <Users className="w-5 h-5 text-[#2A7A8C]" data-oid="sulh6dv" />
                            </div>
                            <div data-oid="dnp0xk3">
                                <p className="font-medium text-[#343A40]" data-oid="_q2tu:0">
                                    {adminData.name}
                                </p>
                                <p className="text-sm text-[#6C757D]" data-oid="gmo_vna">
                                    {adminData.role}
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-2" data-oid="jdcm94h">
                        {navigation.map((item) => (
                            <a
                                key={item.id}
                                href={item.href}
                                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                                    item.id === 'users'
                                        ? 'bg-[#2A7A8C] text-white'
                                        : 'text-[#6C757D] hover:bg-[#F8F9FA] hover:text-[#343A40]'
                                }`}
                                data-oid="bd8ul46"
                            >
                                <item.icon className="w-5 h-5" data-oid="kp90r:j" />
                                <span className="font-medium" data-oid="iv89x8c">
                                    {item.label}
                                </span>
                            </a>
                        ))}
                    </nav>
                    {/* Logout */}
                    <div className="p-4 border-t border-[#E9ECEF]" data-oid="np.nws2">
                        <button
                            className="w-full flex items-center space-x-3 px-4 py-3 text-[#DC3545] hover:bg-[#DC3545]/10 rounded-lg transition-colors"
                            data-oid="c.vf5_a"
                        >
                            <LogOut className="w-5 h-5" data-oid="vja0z.u" />
                            <span className="font-medium" data-oid="qm58n1l">
                                Đăng xuất
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen" data-oid="0yhyn1w">
                {/* Top Bar */}
                <div
                    className="bg-white shadow-sm border-b border-[#E9ECEF] sticky top-0 z-30"
                    data-oid="gb4vsrk"
                >
                    <div className="flex items-center justify-between px-6 py-4" data-oid="q1yh34y">
                        <div className="flex items-center space-x-4" data-oid="lu3wq1l">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="lg:hidden p-2 text-[#6C757D] hover:text-[#343A40]"
                                data-oid="oatzzwx"
                            >
                                <Menu className="w-5 h-5" data-oid="x0dix9d" />
                            </button>
                            <h1 className="text-xl font-semibold text-[#343A40]" data-oid="6qot8sz">
                                Quản lý Người dùng
                            </h1>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="9hunwti">
                            <div
                                className="w-8 h-8 bg-[#2A7A8C]/10 rounded-full flex items-center justify-center"
                                data-oid="0yr5uyc"
                            >
                                <Users className="w-4 h-4 text-[#2A7A8C]" data-oid="jimq5ee" />
                            </div>
                        </div>
                    </div>
                </div>
                {/* Page Content */}
                <div className="p-6 flex-1" data-oid="w1corzb">
                    {/* Header */}
                    <div className="flex items-center justify-between" data-oid="mo:7.v8">
                        <div data-oid="jti.uq3">
                            <h1 className="text-3xl font-bold text-[#343A40]" data-oid="4f.jooc">
                                Quản lý Người dùng
                            </h1>
                            <p className="text-[#6C757D] mt-1" data-oid="3zjo:su">
                                Quản lý tài khoản người dùng và phân quyền
                            </p>
                        </div>
                        <button
                            className="manabi-btn-primary flex items-center space-x-2"
                            data-oid="4.y9cs1"
                        >
                            <Plus className="w-4 h-4" data-oid="wovijep" />
                            <span data-oid="ciei.w2">Thêm người dùng</span>
                        </button>
                    </div>
                    {/* Toolbar */}
                    <div
                        className="manabi-card p-6 flex flex-col md:flex-row gap-4 mt-6"
                        data-oid="wq1arex"
                    >
                        <div className="flex-1 relative" data-oid="0luhyk6">
                            <Search
                                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6C757D]"
                                data-oid="xgdlcna"
                            />

                            <input
                                type="text"
                                placeholder="Tìm kiếm người dùng..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="manabi-input pl-10"
                                data-oid=":qs5so6"
                            />
                        </div>
                        <div className="flex gap-3" data-oid=".qawckq">
                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="manabi-input"
                                data-oid="kdmcmnu"
                            >
                                <option value="all" data-oid="3sw.5z9">
                                    Tất cả vai trò
                                </option>
                                <option value="learner" data-oid="_bskm19">
                                    Học viên
                                </option>
                                <option value="instructor" data-oid="whnix4h">
                                    Giảng viên
                                </option>
                                <option value="admin" data-oid="rkuy0m4">
                                    Quản trị viên
                                </option>
                            </select>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="manabi-input"
                                data-oid="irr_iu2"
                            >
                                <option value="all" data-oid="91tofmi">
                                    Tất cả trạng thái
                                </option>
                                <option value="active" data-oid=":j6z5eu">
                                    Hoạt động
                                </option>
                                <option value="locked" data-oid="813gdc_">
                                    Đã khóa
                                </option>
                            </select>
                            <select
                                value={verification}
                                onChange={(e) => setVerification(e.target.value)}
                                className="manabi-input"
                                data-oid="3qqo45z"
                            >
                                <option value="all" data-oid="nj3u:-d">
                                    Tất cả xác thực
                                </option>
                                <option value="verified" data-oid="1mt-v_e">
                                    Đã xác thực
                                </option>
                                <option value="pending" data-oid="s43r-xt">
                                    Chờ xác thực
                                </option>
                                <option value="rejected" data-oid="_2p7hfm">
                                    Từ chối
                                </option>
                            </select>
                        </div>
                    </div>
                    {/* User Table */}
                    <div className="manabi-card overflow-hidden mt-6" data-oid="abyb72w">
                        <div className="overflow-x-auto" data-oid="oa7d:e-">
                            <table className="w-full" data-oid="t45issf">
                                <thead className="bg-[#F8F9FA]" data-oid="grxlqct">
                                    <tr data-oid="ninj6.p">
                                        <th
                                            className="px-6 py-4 text-left text-sm font-medium text-[#343A40]"
                                            data-oid="hgc8kl8"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={selected.length === mockUsers.length}
                                                onChange={(e) =>
                                                    setSelected(
                                                        e.target.checked
                                                            ? mockUsers.map((u) => u.id)
                                                            : [],
                                                    )
                                                }
                                                className="rounded border-[#CED4DA] text-[#2A7A8C] focus:ring-[#2A7A8C]"
                                                data-oid="fyd5.sa"
                                            />
                                        </th>
                                        <th
                                            className="px-6 py-4 text-left text-sm font-medium text-[#343A40]"
                                            data-oid="q-bx90h"
                                        >
                                            Người dùng
                                        </th>
                                        <th
                                            className="px-6 py-4 text-left text-sm font-medium text-[#343A40]"
                                            data-oid="ftgm8gz"
                                        >
                                            Vai trò
                                        </th>
                                        <th
                                            className="px-6 py-4 text-left text-sm font-medium text-[#343A40]"
                                            data-oid="yy0uoow"
                                        >
                                            Trạng thái
                                        </th>
                                        <th
                                            className="px-6 py-4 text-left text-sm font-medium text-[#343A40]"
                                            data-oid="gy1t8si"
                                        >
                                            Xác thực
                                        </th>
                                        <th
                                            className="px-6 py-4 text-left text-sm font-medium text-[#343A40]"
                                            data-oid="2h-lgjw"
                                        >
                                            Ngày tham gia
                                        </th>
                                        <th
                                            className="px-6 py-4 text-left text-sm font-medium text-[#343A40]"
                                            data-oid="j_vbvvg"
                                        >
                                            Thao tác
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#E9ECEF]" data-oid="yoq9eh_">
                                    {mockUsers
                                        .filter(
                                            (u) =>
                                                (role === 'all' || u.role === role) &&
                                                (status === 'all' || u.status === status) &&
                                                (verification === 'all' ||
                                                    u.verification === verification) &&
                                                (u.name
                                                    .toLowerCase()
                                                    .includes(search.toLowerCase()) ||
                                                    u.email
                                                        .toLowerCase()
                                                        .includes(search.toLowerCase())),
                                        )
                                        .map((user) => (
                                            <tr
                                                key={user.id}
                                                className="hover:bg-[#F8F9FA]"
                                                data-oid=".:u32m9"
                                            >
                                                <td className="px-6 py-4" data-oid=".ufgrpw">
                                                    <input
                                                        type="checkbox"
                                                        checked={selected.includes(user.id)}
                                                        onChange={(e) => {
                                                            if (e.target.checked)
                                                                setSelected([...selected, user.id]);
                                                            else
                                                                setSelected(
                                                                    selected.filter(
                                                                        (id) => id !== user.id,
                                                                    ),
                                                                );
                                                        }}
                                                        className="rounded border-[#CED4DA] text-[#2A7A8C] focus:ring-[#2A7A8C]"
                                                        data-oid="eqwm6jt"
                                                    />
                                                </td>
                                                <td className="px-6 py-4" data-oid="8hf65jr">
                                                    <div
                                                        className="flex items-center space-x-3"
                                                        data-oid="isj20e:"
                                                    >
                                                        <div
                                                            className="w-10 h-10 bg-[#2A7A8C]/10 rounded-full flex items-center justify-center"
                                                            data-oid="8zf3q7k"
                                                        >
                                                            <Users
                                                                className="w-5 h-5 text-[#2A7A8C]"
                                                                data-oid="u8t3jpv"
                                                            />
                                                        </div>
                                                        <div data-oid="kgxs00i">
                                                            <p
                                                                className="font-medium text-[#343A40]"
                                                                data-oid="un7-0y3"
                                                            >
                                                                {user.name}
                                                            </p>
                                                            <p
                                                                className="text-sm text-[#6C757D]"
                                                                data-oid="sr2bj3m"
                                                            >
                                                                {user.email}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4" data-oid="xfslo29">
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                            user.role === 'instructor'
                                                                ? 'bg-[#FFC947]/10 text-[#FFC947]'
                                                                : user.role === 'admin'
                                                                  ? 'bg-[#DC3545]/10 text-[#DC3545]'
                                                                  : 'bg-[#2A7A8C]/10 text-[#2A7A8C]'
                                                        }`}
                                                        data-oid="11lzm.-"
                                                    >
                                                        {user.role === 'learner'
                                                            ? 'Học viên'
                                                            : user.role === 'instructor'
                                                              ? 'Giảng viên'
                                                              : 'Quản trị viên'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4" data-oid="onrvi_v">
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                            user.status === 'active'
                                                                ? 'bg-[#28A745]/10 text-[#28A745]'
                                                                : 'bg-[#DC3545]/10 text-[#DC3545]'
                                                        }`}
                                                        data-oid="6_s4mm-"
                                                    >
                                                        {user.status === 'active'
                                                            ? 'Hoạt động'
                                                            : 'Đã khóa'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4" data-oid="mc_upqm">
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                            user.verification === 'verified'
                                                                ? 'bg-[#28A745]/10 text-[#28A745]'
                                                                : user.verification === 'pending'
                                                                  ? 'bg-[#FFC947]/10 text-[#FFC947]'
                                                                  : 'bg-[#DC3545]/10 text-[#DC3545]'
                                                        }`}
                                                        data-oid="l_::-.0"
                                                    >
                                                        {user.verification === 'verified'
                                                            ? 'Đã xác thực'
                                                            : user.verification === 'pending'
                                                              ? 'Chờ xác thực'
                                                              : 'Từ chối'}
                                                    </span>
                                                </td>
                                                <td
                                                    className="px-6 py-4 text-sm text-[#6C757D]"
                                                    data-oid="wq.y6y."
                                                >
                                                    {user.joinDate}
                                                </td>
                                                <td className="px-6 py-4" data-oid="7x235f9">
                                                    <div
                                                        className="flex items-center space-x-2"
                                                        data-oid="-_orxea"
                                                    >
                                                        <button
                                                            className="p-2 text-[#2A7A8C] hover:bg-[#2A7A8C]/10 rounded-lg"
                                                            data-oid="fh3bwaf"
                                                        >
                                                            <Eye
                                                                className="w-4 h-4"
                                                                data-oid="9:_6cxr"
                                                            />
                                                        </button>
                                                        <button
                                                            className="p-2 text-[#FFC947] hover:bg-[#FFC947]/10 rounded-lg"
                                                            data-oid="dotnp1b"
                                                        >
                                                            <Edit
                                                                className="w-4 h-4"
                                                                data-oid="cd.ocbv"
                                                            />
                                                        </button>
                                                        <button
                                                            className="p-2 text-[#DC3545] hover:bg-[#DC3545]/10 rounded-lg"
                                                            data-oid="mq1tefd"
                                                        >
                                                            {user.status === 'active' ? (
                                                                <Lock
                                                                    className="w-4 h-4"
                                                                    data-oid="xbjul3o"
                                                                />
                                                            ) : (
                                                                <Unlock
                                                                    className="w-4 h-4"
                                                                    data-oid="50.2m_g"
                                                                />
                                                            )}
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
