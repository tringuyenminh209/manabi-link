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
    Download,
    Upload,
    TrendingUp,
    TrendingDown,
    BarChart3,
    PieChart,
    Calendar,
    Filter,
    Search,
    ArrowUpRight,
    ArrowDownRight,
    CreditCard,
    Wallet,
    Receipt,
    Shield,
} from 'lucide-react';

type TimeRange = 'today' | 'week' | 'month' | 'quarter' | 'year';
type TransactionStatus = 'all' | 'completed' | 'pending' | 'failed' | 'refunded';

const navigation = [
    { id: 'overview', label: 'Tổng quan', icon: LayoutDashboard, href: '/admin' },
    { id: 'users', label: 'Quản lý Người dùng', icon: Users, href: '/admin/user' },
    { id: 'courses', label: 'Quản lý Khóa học', icon: BookOpen, href: '/admin/course' },
    { id: 'finance', label: 'Quản lý Tài chính', icon: DollarSign, href: '/admin/finance' },
    { id: 'categories', label: 'Quản lý Danh mục', icon: Tag, href: '/admin/category' },
    { id: 'settings', label: 'Cài đặt Hệ thống', icon: Settings, href: '/admin/settings' },
];

const mockTransactions = [
    {
        id: 1,
        course: 'Guitar đệm hát cơ bản',
        student: 'Nguyễn Thị Mai',
        instructor: 'Nguyễn Văn Minh',
        amount: 500000,
        commission: 50000,
        status: 'completed',
        date: '2024-01-25',
        paymentMethod: 'credit_card',
    },
    {
        id: 2,
        course: 'Piano cho người mới',
        student: 'Trần Văn Hùng',
        instructor: 'Trần Thị Lan',
        amount: 600000,
        commission: 60000,
        status: 'pending',
        date: '2024-01-24',
        paymentMethod: 'bank_transfer',
    },
    {
        id: 3,
        course: 'Vẽ tranh cơ bản',
        student: 'Lê Thị Hoa',
        instructor: 'Lê Văn Hùng',
        amount: 400000,
        commission: 40000,
        status: 'completed',
        date: '2024-01-23',
        paymentMethod: 'e_wallet',
    },
    {
        id: 4,
        course: 'Tiếng Anh giao tiếp',
        student: 'Phạm Văn Nam',
        instructor: 'Phạm Thị Linh',
        amount: 800000,
        commission: 80000,
        status: 'refunded',
        date: '2024-01-22',
        paymentMethod: 'credit_card',
    },
];

const mockStats = {
    totalRevenue: { value: 125500000, change: 15, trend: 'up' },
    totalCommission: { value: 15200000, change: 12, trend: 'up' },
    totalTransactions: { value: 1247, change: 8, trend: 'up' },
    averageOrder: { value: 402000, change: -3, trend: 'down' },
};

export default function AdminFinancePage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [timeRange, setTimeRange] = useState<TimeRange>('month');
    const [transactionStatus, setTransactionStatus] = useState<TransactionStatus>('all');
    const [search, setSearch] = useState('');

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(amount);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
                return 'bg-[#28A745]/10 text-[#28A745]';
            case 'pending':
                return 'bg-[#FFC947]/10 text-[#FFC947]';
            case 'failed':
                return 'bg-[#DC3545]/10 text-[#DC3545]';
            case 'refunded':
                return 'bg-[#6C757D]/10 text-[#6C757D]';
            default:
                return 'bg-[#6C757D]/10 text-[#6C757D]';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'completed':
                return 'Thành công';
            case 'pending':
                return 'Đang xử lý';
            case 'failed':
                return 'Thất bại';
            case 'refunded':
                return 'Hoàn tiền';
            default:
                return status;
        }
    };

    const getPaymentMethodIcon = (method: string) => {
        switch (method) {
            case 'credit_card':
                return <CreditCard className="w-4 h-4" data-oid="9pe4p5y" />;
            case 'bank_transfer':
                return <Wallet className="w-4 h-4" data-oid="2s6-ggq" />;
            case 'e_wallet':
                return <Receipt className="w-4 h-4" data-oid="mh:x76x" />;
            default:
                return <CreditCard className="w-4 h-4" data-oid="5egmbrw" />;
        }
    };

    return (
        <div className="min-h-screen bg-[#F8F9FA] font-['Inter'] flex" data-oid="qfk2ro.">
            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:flex-shrink-0`}
                data-oid="wr4hlig"
            >
                <div className="flex flex-col h-full" data-oid="m_n-lpw">
                    {/* Logo */}
                    <div
                        className="flex items-center justify-between p-6 border-b border-[#E9ECEF]"
                        data-oid="p0j6n-0"
                    >
                        <div className="flex items-center space-x-3" data-oid="514s-b3">
                            <div
                                className="w-8 h-8 bg-[#2A7A8C] rounded-lg flex items-center justify-center"
                                data-oid="jiq5.n3"
                            >
                                <DollarSign className="w-5 h-5 text-white" data-oid="imxtlyd" />
                            </div>
                            <span className="text-xl font-bold text-[#2A7A8C]" data-oid="nawapr6">
                                Admin Panel
                            </span>
                        </div>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="lg:hidden p-2 text-[#6C757D] hover:text-[#343A40]"
                            data-oid="m_59jsw"
                        >
                            <X className="w-5 h-5" data-oid="qs8w:sm" />
                        </button>
                    </div>
                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-2" data-oid="wi0ga-k">
                        {navigation.map((item) => (
                            <a
                                key={item.id}
                                href={item.href}
                                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${item.id === 'finance' ? 'bg-[#2A7A8C] text-white' : 'text-[#6C757D] hover:bg-[#F8F9FA] hover:text-[#343A40]'}`}
                                data-oid="k3otqjh"
                            >
                                <item.icon className="w-5 h-5" data-oid="gbd:oj9" />
                                <span className="font-medium" data-oid="v-jb:e-">
                                    {item.label}
                                </span>
                            </a>
                        ))}
                    </nav>
                    {/* Logout */}
                    <div className="p-4 border-t border-[#E9ECEF]" data-oid=":q5hft3">
                        <button
                            className="w-full flex items-center space-x-3 px-4 py-3 text-[#DC3545] hover:bg-[#DC3545]/10 rounded-lg transition-colors"
                            data-oid="zc:1vc-"
                        >
                            <LogOut className="w-5 h-5" data-oid="s4isc0k" />
                            <span className="font-medium" data-oid="mupawyo">
                                Đăng xuất
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen" data-oid="wmtl0t2">
                {/* Top Bar */}
                <div
                    className="bg-white shadow-sm border-b border-[#E9ECEF] sticky top-0 z-30"
                    data-oid="-qeu-8w"
                >
                    <div className="flex items-center justify-between px-6 py-4" data-oid="cd624a0">
                        <div className="flex items-center space-x-4" data-oid="teh174d">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="lg:hidden p-2 text-[#6C757D] hover:text-[#343A40]"
                                data-oid="yy9_6w_"
                            >
                                <Menu className="w-5 h-5" data-oid="uh9lf9i" />
                            </button>
                            <h1 className="text-xl font-semibold text-[#343A40]" data-oid=".g7qbw6">
                                Quản lý Tài chính
                            </h1>
                        </div>
                        <div className="flex items-center space-x-4" data-oid="8ijaody">
                            <button
                                className="p-2 text-[#6C757D] hover:text-[#343A40] relative"
                                data-oid="p7a3nv3"
                            >
                                <Bell className="w-5 h-5" data-oid="fig-3u:" />
                                <span
                                    className="absolute -top-1 -right-1 w-3 h-3 bg-[#DC3545] rounded-full"
                                    data-oid="w8.9jp1"
                                ></span>
                            </button>
                            <div
                                className="w-8 h-8 bg-[#2A7A8C]/10 rounded-full flex items-center justify-center"
                                data-oid="9n67tao"
                            >
                                <Users className="w-4 h-4 text-[#2A7A8C]" data-oid="th1.q9l" />
                            </div>
                        </div>
                    </div>
                </div>
                {/* Page Content */}
                <div className="p-6 flex-1" data-oid="09t:5ai">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6" data-oid="w:8-z1a">
                        <div data-oid="n_ngvq6">
                            <h1 className="text-3xl font-bold text-[#343A40]" data-oid="4n62scd">
                                Quản lý Tài chính
                            </h1>
                            <p className="text-[#6C757D] mt-1" data-oid="xb:r1y5">
                                Theo dõi doanh thu và giao dịch
                            </p>
                        </div>
                        <div className="flex space-x-3" data-oid="uwuk8f6">
                            <button
                                className="manabi-btn-secondary flex items-center space-x-2"
                                data-oid="l5hko8b"
                            >
                                <Download className="w-4 h-4" data-oid="n:mv3g_" />
                                <span data-oid="ej05u6f">Xuất báo cáo</span>
                            </button>
                            <button
                                className="manabi-btn-primary flex items-center space-x-2"
                                data-oid="y.itg73"
                            >
                                <BarChart3 className="w-4 h-4" data-oid="vm9fwzd" />
                                <span data-oid="s_alrld">Xem chi tiết</span>
                            </button>
                        </div>
                    </div>

                    {/* Time Range Selector */}
                    <div className="manabi-card p-6 mb-6" data-oid=".0xuyu4">
                        <div className="flex items-center justify-between" data-oid="pe0w8h9">
                            <h2 className="text-xl font-semibold text-[#343A40]" data-oid="2830zsr">
                                Thống kê tài chính
                            </h2>
                            <div
                                className="flex space-x-1 bg-[#F8F9FA] p-1 rounded-lg"
                                data-oid="yrt27nx"
                            >
                                {[
                                    { id: 'today', label: 'Hôm nay' },
                                    { id: 'week', label: 'Tuần này' },
                                    { id: 'month', label: 'Tháng này' },
                                    { id: 'quarter', label: 'Quý này' },
                                    { id: 'year', label: 'Năm nay' },
                                ].map((range) => (
                                    <button
                                        key={range.id}
                                        onClick={() => setTimeRange(range.id as TimeRange)}
                                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${timeRange === range.id ? 'bg-white text-[#2A7A8C] shadow-sm' : 'text-[#6C757D] hover:text-[#343A40]'}`}
                                        data-oid="_760axw"
                                    >
                                        {range.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
                        data-oid=".5ldvgq"
                    >
                        <div
                            className="manabi-card p-6 flex flex-col items-center hover:shadow-lg transition-shadow group cursor-pointer"
                            data-oid="2l4l0wu"
                        >
                            <div
                                className="w-14 h-14 flex items-center justify-center rounded-full bg-[#2A7A8C]/10 mb-3 group-hover:scale-105 transition-transform"
                                data-oid="-410qy:"
                            >
                                <DollarSign className="w-7 h-7 text-[#2A7A8C]" data-oid="e7d92ne" />
                            </div>
                            <div className="flex items-center space-x-2 mb-1" data-oid="7:io5d7">
                                <span
                                    className="text-3xl font-extrabold text-[#2A7A8C]"
                                    data-oid="x9vp6br"
                                >
                                    {formatCurrency(mockStats.totalRevenue.value)}
                                </span>
                                <span
                                    className={`text-xs font-semibold flex items-center ${mockStats.totalRevenue.trend === 'up' ? 'text-[#28A745]' : 'text-[#DC3545]'}`}
                                    data-oid="uwb7x9q"
                                >
                                    {mockStats.totalRevenue.trend === 'up' ? (
                                        <ArrowUpRight className="w-3 h-3" data-oid="1hzi6gs" />
                                    ) : (
                                        <ArrowDownRight className="w-3 h-3" data-oid=":_78qdk" />
                                    )}
                                    {mockStats.totalRevenue.change}%
                                </span>
                            </div>
                            <span className="text-sm text-[#6C757D]" data-oid="gkj.869">
                                Tổng doanh thu
                            </span>
                        </div>

                        <div
                            className="manabi-card p-6 flex flex-col items-center hover:shadow-lg transition-shadow group cursor-pointer"
                            data-oid="5h.:nmf"
                        >
                            <div
                                className="w-14 h-14 flex items-center justify-center rounded-full bg-[#28A745]/10 mb-3 group-hover:scale-105 transition-transform"
                                data-oid="9zbdhhq"
                            >
                                <TrendingUp className="w-7 h-7 text-[#28A745]" data-oid="8ruri6a" />
                            </div>
                            <div className="flex items-center space-x-2 mb-1" data-oid="eje3dgm">
                                <span
                                    className="text-3xl font-extrabold text-[#343A40]"
                                    data-oid="djvrgo:"
                                >
                                    {formatCurrency(mockStats.totalCommission.value)}
                                </span>
                                <span
                                    className={`text-xs font-semibold flex items-center ${mockStats.totalCommission.trend === 'up' ? 'text-[#28A745]' : 'text-[#DC3545]'}`}
                                    data-oid="60:h9fy"
                                >
                                    {mockStats.totalCommission.trend === 'up' ? (
                                        <ArrowUpRight className="w-3 h-3" data-oid="3l3:vn2" />
                                    ) : (
                                        <ArrowDownRight className="w-3 h-3" data-oid=".kdvi56" />
                                    )}
                                    {mockStats.totalCommission.change}%
                                </span>
                            </div>
                            <span className="text-sm text-[#6C757D]" data-oid=".cnxq4u">
                                Tổng hoa hồng
                            </span>
                        </div>

                        <div
                            className="manabi-card p-6 flex flex-col items-center hover:shadow-lg transition-shadow group cursor-pointer"
                            data-oid="ac_v4s."
                        >
                            <div
                                className="w-14 h-14 flex items-center justify-center rounded-full bg-[#FFC947]/20 mb-3 group-hover:scale-105 transition-transform"
                                data-oid="vdvlxa2"
                            >
                                <BarChart3 className="w-7 h-7 text-[#FFC947]" data-oid="pk6ss3q" />
                            </div>
                            <div className="flex items-center space-x-2 mb-1" data-oid="9t14lm2">
                                <span
                                    className="text-3xl font-extrabold text-[#343A40]"
                                    data-oid="c6gfgg5"
                                >
                                    {mockStats.totalTransactions.value.toLocaleString()}
                                </span>
                                <span
                                    className={`text-xs font-semibold flex items-center ${mockStats.totalTransactions.trend === 'up' ? 'text-[#28A745]' : 'text-[#DC3545]'}`}
                                    data-oid="yh6-1tc"
                                >
                                    {mockStats.totalTransactions.trend === 'up' ? (
                                        <ArrowUpRight className="w-3 h-3" data-oid="xaphgf9" />
                                    ) : (
                                        <ArrowDownRight className="w-3 h-3" data-oid="9kvo-8x" />
                                    )}
                                    {mockStats.totalTransactions.change}%
                                </span>
                            </div>
                            <span className="text-sm text-[#6C757D]" data-oid="q2.0pgo">
                                Tổng giao dịch
                            </span>
                        </div>

                        <div
                            className="manabi-card p-6 flex flex-col items-center hover:shadow-lg transition-shadow group cursor-pointer"
                            data-oid="9gug3t7"
                        >
                            <div
                                className="w-14 h-14 flex items-center justify-center rounded-full bg-[#DC3545]/10 mb-3 group-hover:scale-105 transition-transform"
                                data-oid="h7l6huu"
                            >
                                <TrendingDown
                                    className="w-7 h-7 text-[#DC3545]"
                                    data-oid="-77uf77"
                                />
                            </div>
                            <div className="flex items-center space-x-2 mb-1" data-oid="92:d-fh">
                                <span
                                    className="text-3xl font-extrabold text-[#343A40]"
                                    data-oid="b4rs9eb"
                                >
                                    {formatCurrency(mockStats.averageOrder.value)}
                                </span>
                                <span
                                    className={`text-xs font-semibold flex items-center ${mockStats.averageOrder.trend === 'up' ? 'text-[#28A745]' : 'text-[#DC3545]'}`}
                                    data-oid="d2d.p1e"
                                >
                                    {mockStats.averageOrder.trend === 'up' ? (
                                        <ArrowUpRight className="w-3 h-3" data-oid="3nnyp3o" />
                                    ) : (
                                        <ArrowDownRight className="w-3 h-3" data-oid=":z2t3o9" />
                                    )}
                                    {mockStats.averageOrder.change}%
                                </span>
                            </div>
                            <span className="text-sm text-[#6C757D]" data-oid="mfgaly.">
                                Đơn hàng trung bình
                            </span>
                        </div>
                    </div>

                    {/* Charts Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8" data-oid="pbf_h1y">
                        {/* Revenue Chart */}
                        <div className="manabi-card p-6" data-oid="hdnq3y7">
                            <div
                                className="flex items-center justify-between mb-4"
                                data-oid="737wwpd"
                            >
                                <h3
                                    className="text-lg font-semibold text-[#343A40]"
                                    data-oid="v_yjr57"
                                >
                                    Biểu đồ doanh thu
                                </h3>
                                <div className="flex space-x-2" data-oid="wz9qmde">
                                    <button
                                        className="p-2 text-[#2A7A8C] hover:bg-[#2A7A8C]/10 rounded-lg"
                                        data-oid="4x-9jd_"
                                    >
                                        <BarChart3 className="w-4 h-4" data-oid="a40-kbj" />
                                    </button>
                                    <button
                                        className="p-2 text-[#2A7A8C] hover:bg-[#2A7A8C]/10 rounded-lg"
                                        data-oid="bq--guc"
                                    >
                                        <PieChart className="w-4 h-4" data-oid="237prto" />
                                    </button>
                                </div>
                            </div>
                            <div
                                className="h-64 bg-[#F8F9FA] rounded-lg flex items-center justify-center"
                                data-oid=":u9wsn-"
                            >
                                <div className="text-center" data-oid="qh:edmm">
                                    <BarChart3
                                        className="w-12 h-12 text-[#6C757D] mx-auto mb-2"
                                        data-oid="5_5mn4:"
                                    />

                                    <p className="text-[#6C757D]" data-oid="3bc78wa">
                                        Biểu đồ doanh thu
                                    </p>
                                    <p className="text-sm text-[#6C757D]" data-oid="o..3ubk">
                                        Dữ liệu sẽ được hiển thị ở đây
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Payment Methods Chart */}
                        <div className="manabi-card p-6" data-oid="oamxikv">
                            <div
                                className="flex items-center justify-between mb-4"
                                data-oid=":h0dd6-"
                            >
                                <h3
                                    className="text-lg font-semibold text-[#343A40]"
                                    data-oid="dk.-9_v"
                                >
                                    Phương thức thanh toán
                                </h3>
                                <button
                                    className="p-2 text-[#2A7A8C] hover:bg-[#2A7A8C]/10 rounded-lg"
                                    data-oid="o_wtz79"
                                >
                                    <PieChart className="w-4 h-4" data-oid="0fbsr96" />
                                </button>
                            </div>
                            <div
                                className="h-64 bg-[#F8F9FA] rounded-lg flex items-center justify-center"
                                data-oid="9tnkkr7"
                            >
                                <div className="text-center" data-oid="3mfg5:k">
                                    <PieChart
                                        className="w-12 h-12 text-[#6C757D] mx-auto mb-2"
                                        data-oid="d6v-mjd"
                                    />

                                    <p className="text-[#6C757D]" data-oid="ql40m3z">
                                        Biểu đồ phương thức thanh toán
                                    </p>
                                    <p className="text-sm text-[#6C757D]" data-oid="z6azzvp">
                                        Dữ liệu sẽ được hiển thị ở đây
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Transactions Section */}
                    <div className="manabi-card p-6" data-oid="3xx_4xg">
                        <div className="flex items-center justify-between mb-6" data-oid="0:qu-1h">
                            <h2 className="text-xl font-semibold text-[#343A40]" data-oid="hl9:vm4">
                                Giao dịch gần đây
                            </h2>
                            <div className="flex space-x-2" data-oid="abkzt2b">
                                <button
                                    className="manabi-btn-secondary flex items-center space-x-2"
                                    data-oid="c4eqxi4"
                                >
                                    <Download className="w-4 h-4" data-oid=".792qtq" />
                                    <span data-oid=":rm1qwp">Xuất CSV</span>
                                </button>
                            </div>
                        </div>

                        {/* Filters */}
                        <div className="flex flex-col lg:flex-row gap-4 mb-6" data-oid="db7tho5">
                            <div className="flex-1" data-oid="dxk2iaq">
                                <div className="relative" data-oid="od6rmvc">
                                    <Search
                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6C757D]"
                                        data-oid="w49q-j-"
                                    />

                                    <input
                                        type="text"
                                        placeholder="Tìm kiếm giao dịch..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="manabi-input pl-10"
                                        data-oid="7g8a3ix"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-3" data-oid="jody-8_">
                                <select
                                    value={transactionStatus}
                                    onChange={(e) =>
                                        setTransactionStatus(e.target.value as TransactionStatus)
                                    }
                                    className="manabi-input"
                                    data-oid=".a0t4ch"
                                >
                                    <option value="all" data-oid="au:k8n5">
                                        Tất cả trạng thái
                                    </option>
                                    <option value="completed" data-oid=":7i2jrx">
                                        Thành công
                                    </option>
                                    <option value="pending" data-oid="94cubmh">
                                        Đang xử lý
                                    </option>
                                    <option value="failed" data-oid="o9po:ft">
                                        Thất bại
                                    </option>
                                    <option value="refunded" data-oid="tvvl3lq">
                                        Hoàn tiền
                                    </option>
                                </select>
                                <button
                                    className="manabi-btn-secondary flex items-center space-x-2"
                                    data-oid="o0x6k.j"
                                >
                                    <Filter className="w-4 h-4" data-oid="jfjhukz" />
                                    <span data-oid="jq6_t37">Lọc</span>
                                </button>
                            </div>
                        </div>

                        {/* Transactions Table */}
                        <div className="overflow-x-auto" data-oid="8hbl8se">
                            <table className="w-full" data-oid="2opnjwb">
                                <thead className="bg-[#F8F9FA]" data-oid="asf.70l">
                                    <tr data-oid="r0gtt04">
                                        <th
                                            className="px-6 py-4 text-left text-sm font-medium text-[#343A40]"
                                            data-oid="dvi7b1t"
                                        >
                                            Khóa học
                                        </th>
                                        <th
                                            className="px-6 py-4 text-left text-sm font-medium text-[#343A40]"
                                            data-oid="azx-1hr"
                                        >
                                            Học viên
                                        </th>
                                        <th
                                            className="px-6 py-4 text-left text-sm font-medium text-[#343A40]"
                                            data-oid="a6f68he"
                                        >
                                            Giảng viên
                                        </th>
                                        <th
                                            className="px-6 py-4 text-left text-sm font-medium text-[#343A40]"
                                            data-oid="9yfeiht"
                                        >
                                            Số tiền
                                        </th>
                                        <th
                                            className="px-6 py-4 text-left text-sm font-medium text-[#343A40]"
                                            data-oid="c54_zu."
                                        >
                                            Hoa hồng
                                        </th>
                                        <th
                                            className="px-6 py-4 text-left text-sm font-medium text-[#343A40]"
                                            data-oid=":4s9lg1"
                                        >
                                            Phương thức
                                        </th>
                                        <th
                                            className="px-6 py-4 text-left text-sm font-medium text-[#343A40]"
                                            data-oid="z5nfb7:"
                                        >
                                            Trạng thái
                                        </th>
                                        <th
                                            className="px-6 py-4 text-left text-sm font-medium text-[#343A40]"
                                            data-oid="zpt8wf."
                                        >
                                            Ngày
                                        </th>
                                        <th
                                            className="px-6 py-4 text-left text-sm font-medium text-[#343A40]"
                                            data-oid="85dvet4"
                                        >
                                            Thao tác
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#E9ECEF]" data-oid="96xfrmz">
                                    {mockTransactions
                                        .filter(
                                            (t) =>
                                                (transactionStatus === 'all' ||
                                                    t.status === transactionStatus) &&
                                                (search === '' ||
                                                    t.course
                                                        .toLowerCase()
                                                        .includes(search.toLowerCase()) ||
                                                    t.student
                                                        .toLowerCase()
                                                        .includes(search.toLowerCase()) ||
                                                    t.instructor
                                                        .toLowerCase()
                                                        .includes(search.toLowerCase())),
                                        )
                                        .map((transaction) => (
                                            <tr
                                                key={transaction.id}
                                                className="hover:bg-[#F8F9FA]"
                                                data-oid="vuo36ot"
                                            >
                                                <td className="px-6 py-4" data-oid="5w2:9yf">
                                                    <div
                                                        className="flex items-center space-x-3"
                                                        data-oid="04l:67a"
                                                    >
                                                        <div
                                                            className="w-10 h-10 bg-[#2A7A8C]/10 rounded-lg flex items-center justify-center"
                                                            data-oid="dif-eos"
                                                        >
                                                            <BookOpen
                                                                className="w-5 h-5 text-[#2A7A8C]"
                                                                data-oid="y3g:791"
                                                            />
                                                        </div>
                                                        <div data-oid="_400a1y">
                                                            <p
                                                                className="font-medium text-[#343A40]"
                                                                data-oid="xr._v2b"
                                                            >
                                                                {transaction.course}
                                                            </p>
                                                            <p
                                                                className="text-sm text-[#6C757D]"
                                                                data-oid="lcpshg:"
                                                            >
                                                                ID: #{transaction.id}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4" data-oid="82bcvl2">
                                                    <p
                                                        className="text-[#343A40]"
                                                        data-oid="xow23tu"
                                                    >
                                                        {transaction.student}
                                                    </p>
                                                </td>
                                                <td className="px-6 py-4" data-oid="eow47qy">
                                                    <p
                                                        className="text-[#343A40]"
                                                        data-oid="lecc:fl"
                                                    >
                                                        {transaction.instructor}
                                                    </p>
                                                </td>
                                                <td className="px-6 py-4" data-oid="-46rms-">
                                                    <p
                                                        className="font-medium text-[#343A40]"
                                                        data-oid="g90d4ss"
                                                    >
                                                        {formatCurrency(transaction.amount)}
                                                    </p>
                                                </td>
                                                <td className="px-6 py-4" data-oid="c4dkoqu">
                                                    <p
                                                        className="font-medium text-[#28A745]"
                                                        data-oid="y203h2v"
                                                    >
                                                        {formatCurrency(transaction.commission)}
                                                    </p>
                                                </td>
                                                <td className="px-6 py-4" data-oid="scj:ha9">
                                                    <div
                                                        className="flex items-center space-x-2"
                                                        data-oid=".lvi8ux"
                                                    >
                                                        {getPaymentMethodIcon(
                                                            transaction.paymentMethod,
                                                        )}
                                                        <span
                                                            className="text-[#6C757D] text-sm"
                                                            data-oid="ljvqoup"
                                                        >
                                                            {transaction.paymentMethod ===
                                                            'credit_card'
                                                                ? 'Thẻ tín dụng'
                                                                : transaction.paymentMethod ===
                                                                    'bank_transfer'
                                                                  ? 'Chuyển khoản'
                                                                  : transaction.paymentMethod ===
                                                                      'e_wallet'
                                                                    ? 'Ví điện tử'
                                                                    : 'Khác'}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4" data-oid="jmdjw_5">
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}
                                                        data-oid="bk_:dp3"
                                                    >
                                                        {getStatusText(transaction.status)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4" data-oid="s-zk6vh">
                                                    <p
                                                        className="text-sm text-[#6C757D]"
                                                        data-oid="tijnjks"
                                                    >
                                                        {transaction.date}
                                                    </p>
                                                </td>
                                                <td className="px-6 py-4" data-oid="58yt-o-">
                                                    <div
                                                        className="flex items-center space-x-2"
                                                        data-oid="b47hh87"
                                                    >
                                                        <button
                                                            className="p-2 text-[#2A7A8C] hover:bg-[#2A7A8C]/10 rounded-lg"
                                                            data-oid="eceflb2"
                                                        >
                                                            <Eye
                                                                className="w-4 h-4"
                                                                data-oid="ctwfzxy"
                                                            />
                                                        </button>
                                                        <button
                                                            className="p-2 text-[#FFC947] hover:bg-[#FFC947]/10 rounded-lg"
                                                            data-oid="1kh4e_m"
                                                        >
                                                            <Edit
                                                                className="w-4 h-4"
                                                                data-oid="2vosc2."
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
