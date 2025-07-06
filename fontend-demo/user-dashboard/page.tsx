'use client';

import { useState } from 'react';
import {
    LayoutDashboard,
    Calendar,
    BookMarked,
    MessageSquare,
    Star,
    BookOpen,
    CalendarDays,
    Users,
    DollarSign,
    Settings,
    LogOut,
    ChevronRight,
    Clock,
    MapPin,
    TrendingUp,
    TrendingDown,
    Plus,
    Edit,
    Eye,
    EyeOff,
    User,
    Bell,
    CreditCard,
    Shield,
    Download,
    Search,
    Filter,
    MoreHorizontal,
    XCircle,
    FileText,
    Trophy,
    Award,
    Target,
    Zap,
    Crown,
    Medal,
    Flame,
    Heart,
    CheckCircle,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressCard } from '@/components/ui/ProgressCard';
import { EmptyState } from '@/components/ui/EmptyState';

type UserRole = 'learner' | 'instructor';
type ActiveSection =
    | 'overview'
    | 'schedule'
    | 'saved-courses'
    | 'messages'
    | 'reviews'
    | 'courses'
    | 'students'
    | 'earnings'
    | 'settings'
    | 'achievements';

type StudentFilter = 'all' | 'active' | 'completed' | 'cancelled';
type StudentSort = 'name' | 'joinDate' | 'progress' | 'lastActivity';

export default function UserDashboard() {
    const [userRole, setUserRole] = useState<UserRole>('learner');
    const [activeSection, setActiveSection] = useState<ActiveSection>('overview');
    const [scheduleTab, setScheduleTab] = useState<'upcoming' | 'history' | 'cancelled'>(
        'upcoming',
    );
    const [activityTab, setActivityTab] = useState<'upcoming' | 'requests' | 'reviews'>('upcoming');
    const [selectedLanguage, setSelectedLanguage] = useState('vi');
    const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

    // Student management states
    const [searchQuery, setSearchQuery] = useState('');
    const [studentFilter, setStudentFilter] = useState<StudentFilter>('all');
    const [studentSort, setStudentSort] = useState<StudentSort>('name');
    const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
    const [selectedStudent, setSelectedStudent] = useState<any>(null);
    const [showStudentModal, setShowStudentModal] = useState(false);

    const languages = [
        { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
        { code: 'en', name: 'English', flag: '🇺🇸' },
        { code: 'ja', name: '日本語', flag: '🇯🇵' },
    ];

    // Mock data
    const userData = {
        name: 'Nguyễn Thị Mai',
        avatar: '/api/placeholder/80/80',
        role: userRole === 'learner' ? 'Học viên' : 'Giảng viên',
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
        revenue: { value: '15,500,000', change: '+12%', trend: 'up' },
        bookings: { value: '24', change: '+8%', trend: 'up' },
        rating: { value: '4.8', change: '+0.2', trend: 'up' },
        response: { value: '95%', change: '-2%', trend: 'down' },
        coursesCompleted: 12,
        totalStudyTime: 156,
        currentStreak: 7,
        averageScore: 92,
    };

    // Mock data for badges
    const userBadges = [
        {
            id: '1',
            name: 'Học viên chăm chỉ',
            description: '7 ngày học liên tiếp',
            icon: 'flame' as const,
            color: 'text-warning-red',
            unlocked: true
        },
        {
            id: '2',
            name: 'Hoàn thành 10 khóa học',
            description: 'Đã hoàn thành 10 khóa học',
            icon: 'trophy' as const,
            color: 'text-energetic-yellow',
            unlocked: true
        },
        {
            id: '3',
            name: 'Đánh giá 5 sao',
            description: 'Nhận được 50 đánh giá 5 sao',
            icon: 'star' as const,
            color: 'text-wisdom-blue',
            unlocked: false
        },
        {
            id: '4',
            name: 'Level Master',
            description: 'Đạt level 20',
            icon: 'medal' as const,
            color: 'text-success-green',
            unlocked: false
        }
    ];

    const learnerNavigation = [
        { id: 'overview', label: 'Tổng quan', icon: LayoutDashboard },
        { id: 'schedule', label: 'Lịch học của tôi', icon: Calendar },
        { id: 'saved-courses', label: 'Khóa học đã lưu', icon: BookMarked },
        { id: 'messages', label: 'Tin nhắn', icon: MessageSquare },
        { id: 'reviews', label: 'Đánh giá của tôi', icon: Star },
    ];

    const instructorNavigation = [
        { id: 'overview', label: 'Tổng quan', icon: LayoutDashboard },
        { id: 'courses', label: 'Quản lý khóa học', icon: BookOpen },
        { id: 'schedule', label: 'Quản lý lịch dạy', icon: CalendarDays },
        { id: 'students', label: 'Quản lý học viên', icon: Users },
        { id: 'earnings', label: 'Doanh thu & Thanh toán', icon: DollarSign },
        { id: 'messages', label: 'Tin nhắn', icon: MessageSquare },
        { id: 'reviews', label: 'Đánh giá', icon: Star },
    ];

    const navigation = userRole === 'learner' ? learnerNavigation : instructorNavigation;

    // Mock data for student management
    const studentStats = {
        total: { value: '156', label: 'Tổng học viên', color: 'wisdom-blue', icon: Users },
        active: { value: '142', label: 'Đang học', color: 'success-green', icon: TrendingUp },
        completed: { value: '89', label: 'Hoàn thành', color: 'warning-red', icon: Star },
        new: { value: '23', label: 'Mới tháng này', color: 'sunshine-yellow', icon: Plus },
    };

    const filteredStudents: any[] = []; // Mock data - will be implemented later

    const handleSelectAll = () => {
        // Implementation for select all functionality
    };
    const handleStudentSelect = (studentId: string) => {
        // Implementation for student selection
    };
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active':
                return 'bg-success-green/10 text-success-green border-success-green/20';
            case 'completed':
                return 'bg-wisdom-blue/10 text-wisdom-blue border-wisdom-blue/20';
            case 'cancelled':
                return 'bg-warning-red/10 text-warning-red border-warning-red/20';
            default:
                return 'bg-silver-gray/10 text-silver-gray border-silver-gray/20';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'active':
                return 'Đang học';
            case 'completed':
                return 'Hoàn thành';
            case 'cancelled':
                return 'Đã hủy';
            default:
                return 'Không xác định';
        }
    };

    const getAchievementIcon = (type: string) => {
        switch (type) {
            case 'xp':
                return <Zap className="w-5 h-5 text-energetic-yellow" />;
            case 'badge':
                return <Award className="w-5 h-5 text-wisdom-blue" />;
            case 'streak':
                return <Flame className="w-5 h-5 text-warning-red" />;
            default:
                return <Star className="w-5 h-5 text-silver-gray" />;
        }
    };

    const renderStudentManagement = () => (
        <div className="space-y-6" data-oid="cof3o.b">
            {/* Header */}
            <div className="flex items-center justify-between" data-oid="cfe5q-d">
                <div data-oid="37aszwf">
                    <h1 className="text-3xl font-bold text-charcoal-gray" data-oid="e5f_pkm">
                        Quản lý Học viên
                    </h1>
                    <p className="text-silver-gray mt-1" data-oid="mj627g7">
                        Theo dõi và quản lý tất cả học viên của bạn
                    </p>
                </div>
                <div className="flex space-x-3" data-oid="lattgs3">
                    <button
                        className="manabi-btn-secondary flex items-center space-x-2"
                        data-oid="ic71tib"
                    >
                        <Download className="w-4 h-4" data-oid="y:9544x" />
                        <span data-oid="j7557_6">Xuất danh sách</span>
                    </button>
                    <button
                        className="manabi-btn-primary flex items-center space-x-2"
                        data-oid="hvk49do"
                    >
                        <Plus className="w-4 h-4" data-oid="doiq6lu" />
                        <span data-oid="xy9-kq0">Thêm học viên</span>
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                data-oid="3p8._ol"
            >
                {Object.entries(studentStats).map(([key, stat]) => (
                    <div key={key} className="manabi-card p-6" data-oid="ae:_1k5">
                        <div className="flex items-center justify-between mb-4" data-oid="z6j9377">
                            <div
                                className={`w-12 h-12 bg-${stat.color}/10 rounded-lg flex items-center justify-center`}
                                data-oid="n-siyis"
                            >
                                <stat.icon
                                    className={`w-6 h-6 text-${stat.color}`}
                                    data-oid="_ir8vtb"
                                />
                            </div>
                        </div>
                        <div
                            className="text-2xl font-bold text-charcoal-gray mb-1"
                            data-oid="wioh2k4"
                        >
                            {stat.value}
                        </div>
                        <div className="text-sm text-silver-gray" data-oid="i:hr9nd">
                            {stat.label}
                        </div>
                    </div>
                ))}
            </div>

            {/* Filters and Search */}
            <div className="manabi-card p-6" data-oid="b9obqs9">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4" data-oid="vr7dl04">
                    <div className="relative" data-oid="bn:fgy3">
                        <Search
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-silver-gray w-4 h-4"
                            data-oid="w61-rez"
                        />

                        <input
                            type="text"
                            placeholder="Tìm kiếm học viên..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="manabi-input pl-10"
                            data-oid="1b31gah"
                        />
                    </div>
                    <select
                        value={studentFilter}
                        onChange={(e) => setStudentFilter(e.target.value as StudentFilter)}
                        className="manabi-input"
                        data-oid="-ct4lw7"
                    >
                        <option value="all" data-oid="m8qnta.">
                            Tất cả trạng thái
                        </option>
                        <option value="active" data-oid="01t-j0g">
                            Đang học
                        </option>
                        <option value="completed" data-oid="s4.elpz">
                            Hoàn thành
                        </option>
                        <option value="cancelled" data-oid="tlmd-nz">
                            Đã hủy
                        </option>
                    </select>
                    <select
                        value={studentSort}
                        onChange={(e) => setStudentSort(e.target.value as StudentSort)}
                        className="manabi-input"
                        data-oid="yh3qaon"
                    >
                        <option value="name" data-oid="jh3j2wh">
                            Sắp xếp theo tên
                        </option>
                        <option value="joinDate" data-oid="ovfab20">
                            Ngày tham gia
                        </option>
                        <option value="progress" data-oid="dk1p:i1">
                            Tiến độ
                        </option>
                        <option value="lastActivity" data-oid="n9cilng">
                            Hoạt động gần nhất
                        </option>
                    </select>
                    <div className="flex space-x-2" data-oid="6g8-m2o">
                        <button
                            className="manabi-btn-secondary flex items-center space-x-2 flex-1"
                            data-oid=":wtyu7-"
                        >
                            <Filter className="w-4 h-4" data-oid="banwnfo" />
                            <span data-oid="p8pzd3y">Lọc nâng cao</span>
                        </button>
                    </div>
                </div>

                {/* Bulk Actions */}
                {selectedStudents.length > 0 && (
                    <div
                        className="bg-wisdom-blue/5 border border-wisdom-blue/20 rounded-lg p-4 mb-4"
                        data-oid="kly:-3u"
                    >
                        <div className="flex items-center justify-between" data-oid="n8u08i6">
                            <span className="text-sm text-charcoal-gray" data-oid="l2j0.g-">
                                Đã chọn {selectedStudents.length} học viên
                            </span>
                            <div className="flex space-x-2" data-oid="8t8c1be">
                                <button
                                    className="text-sm text-wisdom-blue hover:text-wisdom-blue/80 px-3 py-1 border border-wisdom-blue rounded-lg"
                                    data-oid="i4i-kuj"
                                >
                                    Gửi tin nhắn
                                </button>
                                <button
                                    className="text-sm text-success-green hover:text-success-green/80 px-3 py-1 border border-success-green rounded-lg"
                                    data-oid="opw2z:u"
                                >
                                    Xuất danh sách
                                </button>
                                <button
                                    className="text-sm text-warning-red hover:text-warning-red/80 px-3 py-1 border border-warning-red rounded-lg"
                                    data-oid="3ud4xoz"
                                >
                                    Xóa
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Students Table */}
            <div className="manabi-card overflow-hidden" data-oid="eo-xcbo">
                <div className="overflow-x-auto" data-oid="5:6cc1i">
                    <table className="w-full" data-oid="qspo_ss">
                        <thead
                            className="bg-off-white border-b border-light-border"
                            data-oid="aw9ooah"
                        >
                            <tr data-oid="34.k393">
                                <th className="text-left p-4" data-oid="2vu:b_i">
                                    <input
                                        type="checkbox"
                                        checked={
                                            selectedStudents.length === filteredStudents.length &&
                                            filteredStudents.length > 0
                                        }
                                        onChange={handleSelectAll}
                                        className="rounded"
                                        data-oid="-wxpw4m"
                                    />
                                </th>
                                <th
                                    className="text-left p-4 font-medium text-charcoal-gray"
                                    data-oid="gvl79v-"
                                >
                                    Học viên
                                </th>
                                <th
                                    className="text-left p-4 font-medium text-charcoal-gray"
                                    data-oid="nhnghey"
                                >
                                    Khóa học
                                </th>
                                <th
                                    className="text-left p-4 font-medium text-charcoal-gray"
                                    data-oid="ok1vi0v"
                                >
                                    Tiến độ
                                </th>
                                <th
                                    className="text-left p-4 font-medium text-charcoal-gray"
                                    data-oid="wxisk:5"
                                >
                                    Trạng thái
                                </th>
                                <th
                                    className="text-left p-4 font-medium text-charcoal-gray"
                                    data-oid="qz32b0."
                                >
                                    Hoạt động gần nhất
                                </th>
                                <th
                                    className="text-left p-4 font-medium text-charcoal-gray"
                                    data-oid="ur6m9m5"
                                >
                                    Đánh giá
                                </th>
                                <th
                                    className="text-left p-4 font-medium text-charcoal-gray"
                                    data-oid="lwaiucw"
                                >
                                    Hành động
                                </th>
                            </tr>
                        </thead>
                        <tbody data-oid="bd-o0jc">
                            {filteredStudents.map((student) => (
                                <tr
                                    key={student.id}
                                    className="border-b border-light-border hover:bg-off-white"
                                    data-oid="v9m7l.f"
                                >
                                    <td className="p-4" data-oid="hll_3kg">
                                        <input
                                            type="checkbox"
                                            checked={selectedStudents.includes(student.id)}
                                            onChange={() => handleStudentSelect(student.id)}
                                            className="rounded"
                                            data-oid="gq-v_vk"
                                        />
                                    </td>
                                    <td className="p-4" data-oid="usn_4nq">
                                        <div
                                            className="flex items-center space-x-3"
                                            data-oid="t_s4ggv"
                                        >
                                            <Image
                                                src={student.avatar}
                                                alt={student.name}
                                                width={40}
                                                height={40}
                                                className="rounded-full"
                                                data-oid="lrmuw_:"
                                            />

                                            <div data-oid="n4ezm78">
                                                <h4
                                                    className="font-medium text-charcoal-gray"
                                                    data-oid="86kuba0"
                                                >
                                                    {student.name}
                                                </h4>
                                                <p
                                                    className="text-sm text-silver-gray"
                                                    data-oid="gnt:h32"
                                                >
                                                    {student.email}
                                                </p>
                                                <p
                                                    className="text-xs text-silver-gray"
                                                    data-oid="nhv7.he"
                                                >
                                                    Tham gia: {student.joinDate}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4" data-oid="9wy8tur">
                                        <div data-oid="76lu.py">
                                            <h5
                                                className="font-medium text-charcoal-gray"
                                                data-oid="_pd:o6w"
                                            >
                                                {student.course}
                                            </h5>
                                            <p
                                                className="text-sm text-silver-gray"
                                                data-oid="ikujkx_"
                                            >
                                                {student.completedLessons}/{student.totalLessons}{' '}
                                                buổi học
                                            </p>
                                        </div>
                                    </td>
                                    <td className="p-4" data-oid="4jcakxd">
                                        <div className="w-full" data-oid="wccezdw">
                                            <div
                                                className="flex items-center justify-between mb-1"
                                                data-oid="wvezcz9"
                                            >
                                                <span
                                                    className="text-sm text-charcoal-gray"
                                                    data-oid="k08_atx"
                                                >
                                                    {student.progress}%
                                                </span>
                                            </div>
                                            <div
                                                className="w-full bg-light-border rounded-full h-2"
                                                data-oid="wfno4t-"
                                            >
                                                <div
                                                    className="bg-wisdom-blue h-2 rounded-full transition-all duration-300"
                                                    style={{ width: `${student.progress}%` }}
                                                    data-oid="n8tlyns"
                                                ></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4" data-oid="7q0wg8q">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(student.status)}`}
                                            data-oid="4rbe699"
                                        >
                                            {getStatusLabel(student.status)}
                                        </span>
                                    </td>
                                    <td
                                        className="p-4 text-charcoal-gray text-sm"
                                        data-oid="r-esy.n"
                                    >
                                        {student.lastActivity}
                                    </td>
                                    <td className="p-4" data-oid="emu5xvy">
                                        <div
                                            className="flex items-center space-x-1"
                                            data-oid="lsxcbzk"
                                        >
                                            <Star
                                                className="w-4 h-4 text-energetic-yellow fill-current"
                                                data-oid=".8ou3ot"
                                            />

                                            <span
                                                className="text-sm text-charcoal-gray"
                                                data-oid="a7ekt36"
                                            >
                                                {student.rating}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="p-4" data-oid="535504z">
                                        <div
                                            className="flex items-center space-x-2"
                                            data-oid="4jl.rg8"
                                        >
                                            <button
                                                onClick={() => {
                                                    setSelectedStudent(student);
                                                    setShowStudentModal(true);
                                                }}
                                                className="p-2 hover:bg-light-border rounded-lg"
                                                title="Xem chi tiết"
                                                data-oid="igdi6dy"
                                            >
                                                <Eye
                                                    className="w-4 h-4 text-silver-gray"
                                                    data-oid="9qihsi6"
                                                />
                                            </button>
                                            <button
                                                className="p-2 hover:bg-light-border rounded-lg"
                                                title="Gửi tin nhắn"
                                                data-oid="5qi6:oo"
                                            >
                                                <MessageSquare
                                                    className="w-4 h-4 text-silver-gray"
                                                    data-oid="3.wh7c."
                                                />
                                            </button>
                                            <button
                                                className="p-2 hover:bg-light-border rounded-lg"
                                                data-oid="n357we0"
                                            >
                                                <MoreHorizontal
                                                    className="w-4 h-4 text-silver-gray"
                                                    data-oid="r63_fiy"
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

            {/* Student Detail Modal */}
            {showStudentModal && selectedStudent && (
                <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                    data-oid="jbjjv86"
                >
                    <div
                        className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                        data-oid="l3427lt"
                    >
                        <div className="p-6 border-b border-light-border" data-oid="9-omvxa">
                            <div className="flex items-center justify-between" data-oid="i_740x.">
                                <h3
                                    className="text-xl font-semibold text-charcoal-gray"
                                    data-oid="1qqr1i7"
                                >
                                    Chi tiết Học viên
                                </h3>
                                <button
                                    onClick={() => setShowStudentModal(false)}
                                    className="text-silver-gray hover:text-charcoal-gray"
                                    data-oid="lfy35nx"
                                >
                                    <XCircle className="w-6 h-6" data-oid="ca0qtao" />
                                </button>
                            </div>
                        </div>

                        <div className="p-6" data-oid="x4jo52h">
                            <div
                                className="grid grid-cols-1 lg:grid-cols-3 gap-6"
                                data-oid="ieu2q-9"
                            >
                                {/* Student Info */}
                                <div className="lg:col-span-2 space-y-6" data-oid="dqqi2q1">
                                    <div className="flex items-start space-x-4" data-oid=":__m9o:">
                                        <Image
                                            src={selectedStudent.avatar}
                                            alt={selectedStudent.name}
                                            width={80}
                                            height={80}
                                            className="rounded-full"
                                            data-oid="9-_y4:z"
                                        />

                                        <div className="flex-1" data-oid="3d8kmcv">
                                            <h4
                                                className="text-xl font-semibold text-charcoal-gray mb-2"
                                                data-oid="y.xmvsg"
                                            >
                                                {selectedStudent.name}
                                            </h4>
                                            <div
                                                className="grid grid-cols-2 gap-4 text-sm"
                                                data-oid="ceovqo6"
                                            >
                                                <div data-oid="6fv5k32">
                                                    <span
                                                        className="text-silver-gray"
                                                        data-oid="q3_cyyr"
                                                    >
                                                        Email:
                                                    </span>
                                                    <p
                                                        className="text-charcoal-gray"
                                                        data-oid="z.w836q"
                                                    >
                                                        {selectedStudent.email}
                                                    </p>
                                                </div>
                                                <div data-oid="j3i5xum">
                                                    <span
                                                        className="text-silver-gray"
                                                        data-oid="l5eml35"
                                                    >
                                                        Điện thoại:
                                                    </span>
                                                    <p
                                                        className="text-charcoal-gray"
                                                        data-oid="4jvug78"
                                                    >
                                                        {selectedStudent.phone}
                                                    </p>
                                                </div>
                                                <div data-oid="5:j46gz">
                                                    <span
                                                        className="text-silver-gray"
                                                        data-oid="r15tmq7"
                                                    >
                                                        Ngày tham gia:
                                                    </span>
                                                    <p
                                                        className="text-charcoal-gray"
                                                        data-oid="fgh758b"
                                                    >
                                                        {selectedStudent.joinDate}
                                                    </p>
                                                </div>
                                                <div data-oid="zvu1pof">
                                                    <span
                                                        className="text-silver-gray"
                                                        data-oid=":6g9ns7"
                                                    >
                                                        Tổng chi tiêu:
                                                    </span>
                                                    <p
                                                        className="text-charcoal-gray"
                                                        data-oid="yvkruo:"
                                                    >
                                                        {selectedStudent.totalSpent.toLocaleString()}{' '}
                                                        VNĐ
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Course Progress */}
                                    <div className="manabi-card p-4" data-oid="cjvn.:p">
                                        <h5
                                            className="font-semibold text-charcoal-gray mb-4"
                                            data-oid="a9nq0cr"
                                        >
                                            Tiến độ Khóa học
                                        </h5>
                                        <div className="space-y-4" data-oid="1oedi_8">
                                            <div data-oid="06yk:36">
                                                <div
                                                    className="flex items-center justify-between mb-2"
                                                    data-oid="v_v9mq_"
                                                >
                                                    <span
                                                        className="font-medium text-charcoal-gray"
                                                        data-oid="ei:g20s"
                                                    >
                                                        {selectedStudent.course}
                                                    </span>
                                                    <span
                                                        className="text-sm text-silver-gray"
                                                        data-oid="yj65nr:"
                                                    >
                                                        {selectedStudent.completedLessons}/
                                                        {selectedStudent.totalLessons} buổi học
                                                    </span>
                                                </div>
                                                <div
                                                    className="w-full bg-light-border rounded-full h-3"
                                                    data-oid="8_450c7"
                                                >
                                                    <div
                                                        className="bg-wisdom-blue h-3 rounded-full"
                                                        style={{
                                                            width: `${selectedStudent.progress}%`,
                                                        }}
                                                        data-oid="g7_8bwa"
                                                    ></div>
                                                </div>
                                                <div
                                                    className="flex justify-between text-sm text-silver-gray mt-1"
                                                    data-oid="t0ijliz"
                                                >
                                                    <span data-oid="ww98e5x">
                                                        Tiến độ: {selectedStudent.progress}%
                                                    </span>
                                                    {selectedStudent.nextLesson && (
                                                        <span data-oid="lvjnnti">
                                                            Buổi tiếp theo:{' '}
                                                            {selectedStudent.nextLesson}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="space-y-4" data-oid="jpkrjtl">
                                    <div className="manabi-card p-4" data-oid="r9qx877">
                                        <h5
                                            className="font-semibold text-charcoal-gray mb-4"
                                            data-oid="xmpk6:3"
                                        >
                                            Hành động
                                        </h5>
                                        <div className="space-y-3" data-oid="h32blh0">
                                            <button
                                                className="w-full manabi-btn-primary flex items-center justify-center space-x-2"
                                                data-oid="q-.-13c"
                                            >
                                                <MessageSquare
                                                    className="w-4 h-4"
                                                    data-oid="eql_gd1"
                                                />

                                                <span data-oid=":y.rn9o">Gửi tin nhắn</span>
                                            </button>
                                            <button
                                                className="w-full manabi-btn-secondary flex items-center justify-center space-x-2"
                                                data-oid="o26v0m-"
                                            >
                                                <Calendar className="w-4 h-4" data-oid="p:dze:g" />

                                                <span data-oid="3w:9h61">Đặt lịch học</span>
                                            </button>
                                            <button
                                                className="w-full manabi-btn-secondary flex items-center justify-center space-x-2"
                                                data-oid="uqk2cg8"
                                            >
                                                <FileText className="w-4 h-4" data-oid="pqq69kz" />
                                                <span data-oid="rddwwvc">Xem báo cáo</span>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="manabi-card p-4" data-oid="c3jooc-">
                                        <h5
                                            className="font-semibold text-charcoal-gray mb-4"
                                            data-oid="eg_-:v2"
                                        >
                                            Thống kê
                                        </h5>
                                        <div className="space-y-3 text-sm" data-oid="k1_zn1i">
                                            <div
                                                className="flex justify-between"
                                                data-oid="57gaxgk"
                                            >
                                                <span
                                                    className="text-silver-gray"
                                                    data-oid="brxnr5r"
                                                >
                                                    Đánh giá:
                                                </span>
                                                <div
                                                    className="flex items-center space-x-1"
                                                    data-oid="a2vvzl1"
                                                >
                                                    <Star
                                                        className="w-4 h-4 text-energetic-yellow fill-current"
                                                        data-oid="z_60vfd"
                                                    />

                                                    <span
                                                        className="text-charcoal-gray"
                                                        data-oid="u5zk4fo"
                                                    >
                                                        {selectedStudent.rating}
                                                    </span>
                                                </div>
                                            </div>
                                            <div
                                                className="flex justify-between"
                                                data-oid="-87j9k2"
                                            >
                                                <span
                                                    className="text-silver-gray"
                                                    data-oid="7wspxhj"
                                                >
                                                    Trạng thái:
                                                </span>
                                                <span
                                                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedStudent.status)}`}
                                                    data-oid="zx3cd12"
                                                >
                                                    {getStatusLabel(selectedStudent.status)}
                                                </span>
                                            </div>
                                            <div
                                                className="flex justify-between"
                                                data-oid="yi9ynfc"
                                            >
                                                <span
                                                    className="text-silver-gray"
                                                    data-oid="oflc.i3"
                                                >
                                                    Hoạt động gần nhất:
                                                </span>
                                                <span
                                                    className="text-charcoal-gray"
                                                    data-oid="x5ga_--"
                                                >
                                                    {selectedStudent.lastActivity}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

    const renderLearnerOverview = () => (
        <div className="space-y-8" data-oid="38g0qpa">
            {/* Welcome Banner */}
            <div
                className="bg-gradient-to-r from-wisdom-blue to-wisdom-blue/80 rounded-xl p-8 text-white"
                data-oid="g6hw68b"
            >
                <h1 className="text-3xl font-bold mb-2" data-oid="exy4st1">
                    Chào mừng trở lại, {userData.name}!
                </h1>
                <p className="text-white/90" data-oid=".hidyun">
                    Chuỗi ngày học của bạn là {userData.streak} ngày. Cố lên nào!
                </p>
            </div>

            {/* Progress Card - Gamification */}
            <ProgressCard
                level={userData.level}
                xp={userData.xp}
                xpToNextLevel={userData.xpToNextLevel}
                badges={userBadges}
                streak={userData.streak}
                totalCourses={stats.coursesCompleted}
            />

            {/* Next Lesson Card */}
            <div className="manabi-card p-6" data-oid="1_7mj:a">
                <h2 className="text-xl font-semibold text-charcoal-gray mb-4" data-oid="-2_ma07">
                    Buổi học sắp diễn ra
                </h2>
                <div
                    className="bg-energetic-yellow/10 border border-energetic-yellow/20 rounded-lg p-6"
                    data-oid="t1eybo0"
                >
                    <div className="flex items-start justify-between mb-4" data-oid="u2vp1ou">
                        <div data-oid="vy1zrak">
                            <h3
                                className="text-lg font-semibold text-charcoal-gray mb-2"
                                data-oid="7i4ktss"
                            >
                                {upcomingLesson.title}
                            </h3>
                            <p className="text-silver-gray mb-1" data-oid="n.dyedi">
                                bởi {upcomingLesson.instructor}
                            </p>
                            <div
                                className="flex items-center space-x-4 text-sm text-silver-gray"
                                data-oid="1fuf0fc"
                            >
                                <div className="flex items-center space-x-1" data-oid="01377ne">
                                    <Calendar className="w-4 h-4" data-oid="r304jio" />
                                    <span data-oid="55ro0d8">
                                        {upcomingLesson.date}, {upcomingLesson.time}
                                    </span>
                                </div>
                                <div className="flex items-center space-x-1" data-oid="7rb1g0r">
                                    <MapPin className="w-4 h-4" data-oid="e:kf9ro" />
                                    <span data-oid="8j99-bl">{upcomingLesson.location}</span>
                                </div>
                            </div>
                        </div>
                        <div className="text-right" data-oid="zgmr_:y">
                            <div className="text-sm text-silver-gray mb-1" data-oid="cpk-ut7">
                                Bắt đầu sau:
                            </div>
                            <div
                                className="text-lg font-semibold text-wisdom-blue"
                                data-oid="5u.eooy"
                            >
                                {upcomingLesson.countdown}
                            </div>
                        </div>
                    </div>
                    <div className="flex space-x-3" data-oid="wicgimk">
                        <button className="manabi-btn-primary" data-oid="k:7k-ti">
                            {upcomingLesson.type === 'online' ? 'Vào lớp học' : 'Xem địa điểm'}
                        </button>
                        <button className="manabi-btn-secondary" data-oid="81qddq0">
                            Hủy lịch
                        </button>
                    </div>
                </div>
            </div>

            {/* Schedule Tabs */}
            <div className="manabi-card p-6" data-oid="9oy2b3t">
                <h2 className="text-xl font-semibold text-charcoal-gray mb-4" data-oid="qziypc6">
                    Lịch học của tôi
                </h2>
                <div className="border-b border-light-border mb-6" data-oid="d0xh8d7">
                    <div className="flex space-x-8" data-oid="70bbn0j">
                        {[
                            { id: 'upcoming', label: 'Sắp diễn ra' },
                            { id: 'history', label: 'Lịch sử học tập' },
                            { id: 'cancelled', label: 'Đã hủy' },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setScheduleTab(tab.id as any)}
                                className={`pb-4 px-1 border-b-2 font-medium transition-colors ${
                                    scheduleTab === tab.id
                                        ? 'border-wisdom-blue text-wisdom-blue'
                                        : 'border-transparent text-silver-gray hover:text-charcoal-gray'
                                }`}
                                data-oid="72jw3ep"
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-4" data-oid="3db0_kd">
                    {[1, 2, 3].map((item) => (
                        <div
                            key={item}
                            className="flex items-center justify-between p-4 border border-light-border rounded-lg"
                            data-oid="8v5fqwl"
                        >
                            <div className="flex items-center space-x-4" data-oid=".69jpr4">
                                <Image
                                    src="/api/placeholder/50/50"
                                    alt="Course"
                                    width={50}
                                    height={50}
                                    className="rounded-lg"
                                    data-oid="ixx:508"
                                />

                                <div data-oid="kj4jslq">
                                    <h4
                                        className="font-medium text-charcoal-gray"
                                        data-oid="_m1z_wi"
                                    >
                                        Guitar đệm hát cơ bản
                                    </h4>
                                    <p className="text-sm text-silver-gray" data-oid="w9tz1cm">
                                        với Nguyễn Văn Minh
                                    </p>
                                    <p className="text-sm text-silver-gray" data-oid="gt5s0xf">
                                        Thứ 7, 20/06 - 19:00
                                    </p>
                                </div>
                            </div>
                            <div className="flex space-x-2" data-oid="7d216xb">
                                {scheduleTab === 'upcoming' && (
                                    <button
                                        className="text-sm text-warning-red hover:text-warning-red/80"
                                        data-oid="jufnohn"
                                    >
                                        Hủy lịch
                                    </button>
                                )}
                                {scheduleTab === 'history' && (
                                    <button
                                        className="text-sm text-wisdom-blue hover:text-wisdom-blue/80"
                                        data-oid="7q5dp24"
                                    >
                                        Viết đánh giá
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recommendations */}
            <div className="manabi-card p-6" data-oid="u6xp.ic">
                <h2 className="text-xl font-semibold text-charcoal-gray mb-4" data-oid="vtnq9cd">
                    Dựa trên sở thích của bạn
                </h2>
                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    data-oid="7w19y4b"
                >
                    {[1, 2, 3].map((item) => (
                        <div
                            key={item}
                            className="border border-light-border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                            data-oid="m_551a_"
                        >
                            <Image
                                src="/api/placeholder/300/200"
                                alt="Course"
                                width={300}
                                height={200}
                                className="w-full h-40 object-cover"
                                data-oid="icai-bb"
                            />

                            <div className="p-4" data-oid="lk.vhf7">
                                <h4
                                    className="font-medium text-charcoal-gray mb-2"
                                    data-oid="xaq8kaz"
                                >
                                    Piano cơ bản cho người mới
                                </h4>
                                <p className="text-sm text-silver-gray mb-2" data-oid="jlk3zwb">
                                    bởi Trần Thị Lan
                                </p>
                                <div
                                    className="flex items-center justify-between"
                                    data-oid="s7698ey"
                                >
                                    <div className="flex items-center space-x-1" data-oid="fdyoxek">
                                        <Star
                                            className="w-4 h-4 text-energetic-yellow fill-current"
                                            data-oid="znaq:js"
                                        />

                                        <span
                                            className="text-sm text-charcoal-gray"
                                            data-oid="bnpez91"
                                        >
                                            4.9
                                        </span>
                                    </div>
                                    <span
                                        className="text-sm font-semibold text-wisdom-blue"
                                        data-oid="bx:gb3h"
                                    >
                                        600.000 VNĐ
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderInstructorOverview = () => (
        <div className="space-y-8" data-oid="5i-6yd9">
            {/* Welcome Banner */}
            <div
                className="bg-gradient-to-r from-wisdom-blue to-wisdom-blue/80 rounded-xl p-8 text-white"
                data-oid="kuarzw5"
            >
                <h1 className="text-3xl font-bold mb-2" data-oid="2mr.5x:">
                    Chào mừng trở lại, {userData.name}!
                </h1>
                <p className="text-white/90" data-oid="3rn4ww.">
                    Quản lý hoạt động giảng dạy của bạn
                </p>
            </div>

            {/* Performance Stats */}
            <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                data-oid="06zx3xl"
            >
                {[
                    {
                        label: 'Doanh thu tháng này',
                        value: stats.revenue.value + ' VNĐ',
                        change: stats.revenue.change,
                        trend: stats.revenue.trend,
                    },
                    {
                        label: 'Lượt đặt lịch mới',
                        value: stats.bookings.value,
                        change: stats.bookings.change,
                        trend: stats.bookings.trend,
                    },
                    {
                        label: 'Đánh giá trung bình',
                        value: stats.rating.value,
                        change: stats.rating.change,
                        trend: stats.rating.trend,
                    },
                    {
                        label: 'Tỷ lệ phản hồi',
                        value: stats.response.value,
                        change: stats.response.change,
                        trend: stats.response.trend,
                    },
                ].map((stat, index) => (
                    <div key={index} className="manabi-card p-6" data-oid="2:g__4g">
                        <div className="flex items-center justify-between mb-2" data-oid="xj2lflj">
                            <h3 className="text-sm text-silver-gray" data-oid="uf2bbvb">
                                {stat.label}
                            </h3>
                            <div
                                className={`flex items-center space-x-1 text-xs ${
                                    stat.trend === 'up' ? 'text-success-green' : 'text-warning-red'
                                }`}
                                data-oid="lp9ocwx"
                            >
                                {stat.trend === 'up' ? (
                                    <TrendingUp className="w-3 h-3" data-oid="wu37.ds" />
                                ) : (
                                    <TrendingDown className="w-3 h-3" data-oid="2i125hf" />
                                )}
                                <span data-oid="64t_kc6">{stat.change}</span>
                            </div>
                        </div>
                        <div className="text-2xl font-bold text-charcoal-gray" data-oid="hjgv0ic">
                            {stat.value}
                        </div>
                    </div>
                ))}
            </div>

            {/* Revenue Chart */}
            <div className="manabi-card p-6" data-oid="9nw_v_j">
                <h2 className="text-xl font-semibold text-charcoal-gray mb-4" data-oid="6.15eka">
                    Biểu đồ Doanh thu (30 ngày qua)
                </h2>
                <div
                    className="h-64 bg-light-border rounded-lg flex items-center justify-center"
                    data-oid="76es:h7"
                >
                    <span className="text-silver-gray" data-oid=":v1l9tr">
                        Biểu đồ doanh thu sẽ được hiển thị tại đây
                    </span>
                </div>
            </div>

            {/* Activity Tabs */}
            <div className="manabi-card p-6" data-oid="l7ormx:">
                <h2 className="text-xl font-semibold text-charcoal-gray mb-4" data-oid="33fqg0c">
                    Hoạt động gần đây & Việc cần làm
                </h2>
                <div className="border-b border-light-border mb-6" data-oid="xoa.ne1">
                    <div className="flex space-x-8" data-oid="im994s3">
                        {[
                            { id: 'upcoming', label: 'Lịch dạy sắp tới' },
                            { id: 'requests', label: 'Yêu cầu mới' },
                            { id: 'reviews', label: 'Đánh giá mới' },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActivityTab(tab.id as any)}
                                className={`pb-4 px-1 border-b-2 font-medium transition-colors ${
                                    activityTab === tab.id
                                        ? 'border-wisdom-blue text-wisdom-blue'
                                        : 'border-transparent text-silver-gray hover:text-charcoal-gray'
                                }`}
                                data-oid="l9fc6b8"
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-4" data-oid="x1o0a6t">
                    {[1, 2, 3].map((item) => (
                        <div
                            key={item}
                            className="flex items-center justify-between p-4 border border-light-border rounded-lg"
                            data-oid="1dcf70g"
                        >
                            <div className="flex items-center space-x-4" data-oid="xi-h_dd">
                                <Image
                                    src="/api/placeholder/40/40"
                                    alt="Student"
                                    width={40}
                                    height={40}
                                    className="rounded-full"
                                    data-oid="0fdjye6"
                                />

                                <div data-oid="osfwnt:">
                                    <h4
                                        className="font-medium text-charcoal-gray"
                                        data-oid="59nnko."
                                    >
                                        Guitar đệm hát cơ bản
                                    </h4>
                                    <p className="text-sm text-silver-gray" data-oid="353i_4c">
                                        với Nguyễn Thị Lan
                                    </p>
                                    <p className="text-sm text-silver-gray" data-oid="9zwaafj">
                                        Thứ 7, 20/06 - 19:00
                                    </p>
                                </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-silver-gray" data-oid="baa-c7:" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-oid="ckc0boz">
                <button className="manabi-btn-primary p-6 text-left" data-oid="2m.6a85">
                    <div className="flex items-center space-x-3" data-oid="fs14wp9">
                        <Plus className="w-6 h-6" data-oid="rj6nrxb" />
                        <div data-oid="0f-6fp5">
                            <div className="font-semibold" data-oid="5_r99nl">
                                Tạo khóa học mới
                            </div>
                            <div className="text-sm opacity-80" data-oid="1ixjrvj">
                                Thêm khóa học vào danh sách của bạn
                            </div>
                        </div>
                    </div>
                </button>
                <button className="manabi-btn-secondary p-6 text-left" data-oid="b_kgi2_">
                    <div className="flex items-center space-x-3" data-oid="njdlb0a">
                        <Calendar className="w-6 h-6" data-oid="uvq9:np" />
                        <div data-oid="upsj2gi">
                            <div className="font-semibold" data-oid="c:qdx61">
                                Cập nhật lịch trống
                            </div>
                            <div className="text-sm opacity-80" data-oid="0za7wg.">
                                Quản lý thời gian có thể dạy
                            </div>
                        </div>
                    </div>
                </button>
            </div>
        </div>
    );

    const renderContent = () => {
        if (activeSection === 'overview') {
            return userRole === 'learner' ? renderLearnerOverview() : renderInstructorOverview();
        }

        // Placeholder for other sections
        return (
            <div className="manabi-card p-8 text-center" data-oid="z2:pjub">
                <h2 className="text-2xl font-semibold text-charcoal-gray mb-4" data-oid=":a:le-b">
                    {navigation.find((nav) => nav.id === activeSection)?.label}
                </h2>
                <p className="text-silver-gray" data-oid="7mq7k0i">
                    Nội dung cho mục này sẽ được phát triển
                </p>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-[#F8F9FA] font-['Inter']" data-oid="brbb:2x">
            {/* Header Navigation */}
            <nav className="bg-white shadow-sm border-b border-gray-100" data-oid="zbpck7o">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-oid="xay3_vg">
                    <div className="flex justify-between items-center h-16" data-oid="0bmnwy_">
                        <div className="flex items-center" data-oid="b3rsav8">
                            <Link
                                href="/"
                                className="text-2xl font-bold text-[#2A7A8C]"
                                data-oid="hsc11ps"
                            >
                                Manabi Link
                            </Link>
                        </div>

                        <div className="hidden md:flex items-center space-x-8" data-oid="n-su_33">
                            <Link
                                href="/"
                                className="text-[#343A40] hover:text-[#2A7A8C] transition-colors"
                                data-oid="0cyo--8"
                            >
                                Trang chủ
                            </Link>
                            <Link
                                href="/course"
                                className="text-[#343A40] hover:text-[#2A7A8C] transition-colors"
                                data-oid="q14sei6"
                            >
                                Khóa học
                            </Link>
                            <Link
                                href="/teacher/list"
                                className="text-[#343A40] hover:text-[#2A7A8C] transition-colors"
                                data-oid="iz--zhj"
                            >
                                Giảng viên
                            </Link>
                            <Link
                                href="#"
                                className="text-[#343A40] hover:text-[#2A7A8C] transition-colors"
                                data-oid="c9nvyi7"
                            >
                                Về chúng tôi
                            </Link>
                        </div>

                        <div className="flex items-center space-x-4" data-oid=":gaib67">
                            <button
                                className="p-2 text-[#343A40] hover:text-[#2A7A8C] transition-colors"
                                data-oid="lj62rt2"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    data-oid="o-gb_tu"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        data-oid="71.nil6"
                                    />
                                </svg>
                            </button>

                            {/* Language Selector */}
                            <div className="relative" data-oid="pb31oax">
                                <button
                                    onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                                    className="flex items-center space-x-2 px-3 py-2 text-[#343A40] hover:text-[#2A7A8C] transition-colors border border-[#CED4DA] rounded-lg hover:border-[#2A7A8C]"
                                    data-oid="25ysm5q"
                                >
                                    <span className="text-lg" data-oid="5r8-an5">
                                        {
                                            languages.find((lang) => lang.code === selectedLanguage)
                                                ?.flag
                                        }
                                    </span>
                                    <span className="text-sm font-medium" data-oid="77hcrxj">
                                        {languages
                                            .find((lang) => lang.code === selectedLanguage)
                                            ?.code.toUpperCase()}
                                    </span>
                                    <svg
                                        className={`w-4 h-4 transition-transform ${showLanguageDropdown ? 'rotate-180' : ''}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        data-oid="okd83ti"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                            data-oid="t8ed3x1"
                                        />
                                    </svg>
                                </button>

                                {showLanguageDropdown && (
                                    <div
                                        className="absolute right-0 mt-2 w-48 bg-white border border-[#CED4DA] rounded-lg shadow-lg z-50"
                                        data-oid=".9gkjti"
                                    >
                                        {languages.map((language) => (
                                            <button
                                                key={language.code}
                                                onClick={() => {
                                                    setSelectedLanguage(language.code);
                                                    setShowLanguageDropdown(false);
                                                }}
                                                className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-[#F8F9FA] transition-colors ${
                                                    selectedLanguage === language.code
                                                        ? 'bg-[#F8F9FA] text-[#2A7A8C]'
                                                        : 'text-[#343A40]'
                                                }`}
                                                data-oid="a0ld57s"
                                            >
                                                <span className="text-lg" data-oid="949w012">
                                                    {language.flag}
                                                </span>
                                                <span
                                                    className="text-sm font-medium"
                                                    data-oid="gmtr:5l"
                                                >
                                                    {language.code.toUpperCase()}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Dashboard Content */}
            <div className="flex" data-oid="udxu:rf">
                {/* Sidebar */}
                <div
                    className="w-80 bg-white border-r border-light-border flex flex-col"
                    data-oid="._:1p8l"
                >
                    {/* User Profile */}
                    <div className="p-6 border-b border-light-border" data-oid="vhyay_5">
                        <div className="flex items-center space-x-4 mb-4" data-oid="5bz2gae">
                            <Image
                                src={userData.avatar}
                                alt={userData.name}
                                width={60}
                                height={60}
                                className="rounded-full"
                                data-oid="8hq0duo"
                            />

                            <div data-oid="8uk98e-">
                                <h3 className="font-semibold text-charcoal-gray" data-oid="k:vm02z">
                                    {userData.name}
                                </h3>
                                <p className="text-sm text-silver-gray" data-oid="hr9u6ai">
                                    {userData.role}
                                </p>
                            </div>
                        </div>

                        {/* Role Switcher */}
                        <button
                            onClick={() =>
                                setUserRole(userRole === 'learner' ? 'instructor' : 'learner')
                            }
                            className="w-full text-sm text-wisdom-blue hover:text-wisdom-blue/80 transition-colors"
                            data-oid="fbtp0-t"
                        >
                            Chuyển sang giao diện{' '}
                            {userRole === 'learner' ? 'Giảng viên' : 'Học viên'}
                        </button>
                    </div>

                    {/* Navigation */}
                    <div className="flex-1 p-4" data-oid="sh2imii">
                        <nav className="space-y-2" data-oid="4f1os8v">
                            {navigation.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveSection(item.id as ActiveSection)}
                                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                                            activeSection === item.id
                                                ? 'bg-wisdom-blue text-white'
                                                : 'text-charcoal-gray hover:bg-light-border'
                                        }`}
                                        data-oid="e3jaua9"
                                    >
                                        <Icon className="w-5 h-5" data-oid="wz7r5d5" />
                                        <span data-oid="68o04v7">{item.label}</span>
                                    </button>
                                );
                            })}
                        </nav>
                    </div>

                    {/* Bottom Actions */}
                    <div className="p-4 border-t border-light-border space-y-2" data-oid="7qzd16y">
                        <button
                            onClick={() => setActiveSection('settings')}
                            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-charcoal-gray hover:bg-light-border transition-colors"
                            data-oid="67u.lpb"
                        >
                            <Settings className="w-5 h-5" data-oid="fx.v48y" />
                            <span data-oid="qe0:vpf">Hồ sơ & Cài đặt</span>
                        </button>
                        <button
                            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-warning-red hover:bg-warning-red/5 transition-colors"
                            data-oid="fprs6c6"
                        >
                            <LogOut className="w-5 h-5" data-oid="7lruih_" />
                            <span data-oid="hgx7g5o">Đăng xuất</span>
                        </button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-8" data-oid="sto6zc8">
                    {activeSection === 'students' ? renderStudentManagement() : renderContent()}
                </div>
            </div>
        </div>
    );
}
