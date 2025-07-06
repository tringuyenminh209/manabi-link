'use client';

import React, { useState } from 'react';
import {
    User,
    Shield,
    Lock,
    Bell,
    CreditCard,
    UploadCloud,
    Image as ImageIcon,
    X,
    CheckCircle,
    AlertTriangle,
    LogOut,
} from 'lucide-react';

const isTeacher = true; // Dummy data: Chuyển thành false để xem giao diện của Học viên

// --- Main Component ---
const SettingsPage = () => {
    const [activeTab, setActiveTab] = useState<
        'profile' | 'security' | 'notifications' | 'payment'
    >('profile');

    // ナビゲーション項目
    const navItems = [
        { label: 'Trang chủ', href: '/', key: 'home' },
        { label: 'Khóa học', href: '/course', key: 'course' },
        { label: 'Giảng viên', href: '/teacher/list', key: 'teacher' },
        { label: 'Về chúng tôi', href: '/about', key: 'about' },
        { label: 'Trang cá nhân', href: '/user-dashboard/settings', key: 'profile' },
        { label: 'Đổi mật khẩu', href: '/user-dashboard/settings', key: 'password' },
        { label: 'Tin nhắn', href: '/messages', key: 'messages' },
    ];

    const handleLogout = () => {
        alert('Đăng xuất thành công!');
        window.location.href = '/login';
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'profile':
                return <ProfileSettings data-oid="e98mzi_" />;
            case 'security':
                return <SecuritySettings data-oid="g9a_cq4" />;
            case 'notifications':
                return <NotificationSettings data-oid="x4yf2ue" />;
            case 'payment':
                return isTeacher ? <PaymentSettings data-oid="t_mng7h" /> : null;
            default:
                return <ProfileSettings data-oid="id_rg-v" />;
        }
    };

    const tabs = [
        { id: 'profile', label: 'Hồ sơ công khai', icon: User },
        { id: 'security', label: 'Tài khoản & Bảo mật', icon: Shield },
        { id: 'notifications', label: 'Thông báo', icon: Bell },
        ...(isTeacher ? [{ id: 'payment', label: 'Thanh toán', icon: CreditCard }] : []),
    ];

    return (
        <div className="min-h-screen bg-off-white font-['Inter']" data-oid=":zhd8u_">
            {/* ヘッダー */}
            <nav
                className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-30"
                data-oid="37d_rl2"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-oid="aj0_a4u">
                    <div className="flex justify-between items-center h-16" data-oid="lsfheyd">
                        <a
                            href="/"
                            className="text-2xl font-bold text-[#2A7A8C]"
                            data-oid="doyewzh"
                        >
                            Manabi Link
                        </a>
                        <div className="flex items-center space-x-6" data-oid="p53c7f-">
                            {navItems.map((item) => (
                                <a
                                    key={item.key}
                                    href={item.href}
                                    className={`text-[#343A40] hover:text-[#2A7A8C] ${item.key === 'profile' ? 'font-bold underline' : ''}`}
                                    data-oid="fyzp06b"
                                >
                                    {item.label}
                                </a>
                            ))}
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-1 px-3 py-2 text-warning-red hover:bg-warning-red/10 rounded-lg transition-colors"
                                data-oid="5s--mfz"
                            >
                                <LogOut className="w-5 h-5" data-oid="fvs7pwk" /> Đăng xuất
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-5xl mx-auto p-4 sm:p-8 font-inter" data-oid="fxvcqnq">
                <header className="mb-8" data-oid="clzf4x3">
                    <h1 className="text-3xl font-bold text-charcoal-gray" data-oid="_vc8ayp">
                        Hồ sơ & Cài đặt
                    </h1>
                    <p className="text-silver-gray mt-1" data-oid="c6zs75k">
                        Quản lý thông tin cá nhân và cài đặt hệ thống của bạn.
                    </p>
                </header>

                <div className="flex flex-col lg:flex-row gap-8" data-oid="0q6k.8t">
                    {/* Tabs Navigation */}
                    <aside className="lg:w-1/4" data-oid="0dk0iw.">
                        <nav className="space-y-2" data-oid="kli-25-">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as any)}
                                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                                        activeTab === tab.id
                                            ? 'bg-wisdom-blue text-white font-semibold'
                                            : 'text-charcoal-gray hover:bg-light-border'
                                    }`}
                                    data-oid="znh1hbu"
                                >
                                    <tab.icon className="w-5 h-5" data-oid="1x9bo2k" />
                                    <span data-oid="d3_xubn">{tab.label}</span>
                                </button>
                            ))}
                        </nav>
                    </aside>

                    {/* Tab Content */}
                    <main className="flex-1" data-oid="fws5hgs">
                        {renderContent()}
                    </main>
                </div>
            </div>
        </div>
    );
};

// --- Profile Settings Component ---
type EkycStatus = 'not_verified' | 'pending' | 'verified' | 'rejected';

const EkycStatusBadge = ({ status }: { status: EkycStatus }) => {
    switch (status) {
        case 'verified':
            return (
                <div
                    className="flex items-center gap-2 text-success-green bg-success-green/10 p-4 rounded-lg"
                    data-oid="d6005.1"
                >
                    <CheckCircle className="w-6 h-6" data-oid="vccx_ni" />
                    <div data-oid="tm9oj7q">
                        <p className="font-semibold" data-oid="e:ahhya">
                            Đã xác minh danh tính
                        </p>
                        <p className="text-sm" data-oid="vubsb:n">
                            Tài khoản của bạn đã được xác minh thành công.
                        </p>
                    </div>
                </div>
            );

        case 'pending':
            return (
                <div
                    className="flex items-center gap-2 text-energetic-yellow bg-energetic-yellow/10 p-4 rounded-lg"
                    data-oid="-phhjhs"
                >
                    <AlertTriangle className="w-6 h-6" data-oid="ql8ieac" />
                    <div data-oid="gz8wr25">
                        <p className="font-semibold" data-oid="a84pbqg">
                            Đang chờ duyệt
                        </p>
                        <p className="text-sm" data-oid="7oq03eg">
                            Hồ sơ của bạn đang được xem xét. Quá trình này mất khoảng 1-2 ngày làm
                            việc.
                        </p>
                    </div>
                </div>
            );

        case 'not_verified':
        case 'rejected':
        default:
            return (
                <div
                    className="flex items-center gap-2 text-silver-gray bg-light-border p-4 rounded-lg"
                    data-oid="qfg1.ap"
                >
                    <AlertTriangle className="w-6 h-6" data-oid="5c3qrkr" />
                    <div data-oid="qqy7q9f">
                        <p className="font-semibold" data-oid="2fygnmh">
                            Chưa xác minh danh tính
                        </p>
                        <p className="text-sm" data-oid="td9:knx">
                            Vui lòng tải lên giấy tờ để tăng độ tin cậy và mở khóa các tính năng.
                        </p>
                        <button
                            className="manabi-btn-secondary text-xs px-3 py-1 mt-2"
                            data-oid="b2-hwel"
                        >
                            Bắt đầu xác minh
                        </button>
                    </div>
                </div>
            );
    }
};

const ProfileSettings = () => {
    const [avatarPreview, setAvatarPreview] = useState('/api/placeholder/128/128?name=YT');
    const [skills, setSkills] = useState(['Guitar', 'Piano', 'Sáng tác nhạc']);
    const [skillInput, setSkillInput] = useState('');
    const ekycStatus: EkycStatus = 'verified';

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setAvatarPreview(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleSkillKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && skillInput.trim() !== '') {
            e.preventDefault();
            if (!skills.includes(skillInput.trim())) {
                setSkills([...skills, skillInput.trim()]);
            }
            setSkillInput('');
        }
    };

    const removeSkill = (skillToRemove: string) => {
        setSkills(skills.filter((skill) => skill !== skillToRemove));
    };

    return (
        <div className="manabi-card p-6 sm:p-8 space-y-8" data-oid="yiqeuyx">
            <div data-oid="prfltkl">
                <h2 className="text-xl font-bold text-charcoal-gray" data-oid="m3cr.05">
                    Thông tin cá nhân
                </h2>
                <p className="text-silver-gray mt-1" data-oid="fvr26br">
                    Thông tin này sẽ được hiển thị công khai trên hồ sơ của bạn.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center" data-oid="s391fjm">
                <label
                    className="md:col-span-1 text-sm font-medium text-charcoal-gray"
                    data-oid="u_pi-40"
                >
                    Ảnh đại diện
                </label>
                <div className="md:col-span-2 flex items-center gap-4" data-oid="zx742ea">
                    <img
                        src={avatarPreview}
                        alt="Avatar"
                        className="w-16 h-16 rounded-full object-cover"
                        data-oid="4.:9f7r"
                    />

                    <input
                        type="file"
                        id="avatar-upload"
                        className="hidden"
                        onChange={handleAvatarChange}
                        data-oid="kx_j-zz"
                    />

                    <div className="flex gap-2" data-oid="2nj.ycg">
                        <label
                            htmlFor="avatar-upload"
                            className="manabi-btn-secondary px-4 py-2 text-sm cursor-pointer"
                            data-oid="me1i_:e"
                        >
                            Thay đổi
                        </label>
                        <button
                            onClick={() => setAvatarPreview('/api/placeholder/128/128')}
                            className="text-sm text-silver-gray hover:text-warning-red px-3 py-2"
                            data-oid="9th-ruk"
                        >
                            Xóa
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center" data-oid="vw35kpj">
                <label
                    htmlFor="fullName"
                    className="md:col-span-1 text-sm font-medium text-charcoal-gray"
                    data-oid="oasepmr"
                >
                    Họ và tên
                </label>
                <div className="md:col-span-2" data-oid="f:kedbf">
                    <input
                        id="fullName"
                        type="text"
                        className="manabi-input"
                        defaultValue="山田 太郎"
                        data-oid="hulngo:"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start" data-oid="vrxoxgv">
                <label
                    htmlFor="bio"
                    className="md:col-span-1 text-sm font-medium text-charcoal-gray pt-2"
                    data-oid="lmck:u_"
                >
                    Giới thiệu
                </label>
                <div className="md:col-span-2" data-oid="u_86oid">
                    <textarea
                        id="bio"
                        rows={4}
                        className="manabi-input"
                        defaultValue="音楽講師として10年の経験があります。ギターとピアノを専門に教えています。"
                        data-oid="spb6rtv"
                    ></textarea>
                </div>
            </div>

            {isTeacher && (
                <>
                    <div
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start"
                        data-oid="e0y.wd3"
                    >
                        <label
                            htmlFor="skills"
                            className="md:col-span-1 text-sm font-medium text-charcoal-gray pt-2"
                            data-oid="43m_2mq"
                        >
                            Kỹ năng
                        </label>
                        <div className="md:col-span-2" data-oid="neg65oi">
                            <div
                                className="manabi-input flex flex-wrap items-center gap-2"
                                data-oid="q85rnws"
                            >
                                {skills.map((skill) => (
                                    <div
                                        key={skill}
                                        className="flex items-center gap-1 bg-wisdom-blue/10 text-wisdom-blue text-sm font-medium px-2 py-1 rounded"
                                        data-oid="hbr13jm"
                                    >
                                        <span data-oid="8or71-5">{skill}</span>
                                        <button
                                            onClick={() => removeSkill(skill)}
                                            data-oid="68gzsf2"
                                        >
                                            <X className="w-3 h-3" data-oid="aw3.sir" />
                                        </button>
                                    </div>
                                ))}
                                <input
                                    type="text"
                                    value={skillInput}
                                    onChange={(e) => setSkillInput(e.target.value)}
                                    onKeyDown={handleSkillKeyDown}
                                    placeholder="Thêm kỹ năng..."
                                    className="flex-1 bg-transparent focus:outline-none"
                                    data-oid="2nk7ujj"
                                />
                            </div>
                            <p className="text-xs text-silver-gray mt-2" data-oid=".ofqebq">
                                Nhập một kỹ năng và nhấn Enter để thêm.
                            </p>
                        </div>
                    </div>

                    <div
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start"
                        data-oid="c1owbtz"
                    >
                        <label
                            className="md:col-span-1 text-sm font-medium text-charcoal-gray pt-2"
                            data-oid="w6xafeq"
                        >
                            Xác minh danh tính (eKYC)
                        </label>
                        <div className="md:col-span-2" data-oid="hvz92nw">
                            <EkycStatusBadge status={ekycStatus} data-oid="9q1kzal" />
                        </div>
                    </div>
                </>
            )}

            <div className="flex justify-end pt-6 border-t border-light-border" data-oid="3lr76ci">
                <button className="manabi-btn-primary" data-oid="7wzhyv2">
                    Lưu thay đổi
                </button>
            </div>
        </div>
    );
};

// --- Security Settings Component ---
const SecuritySettings = () => {
    return (
        <div className="manabi-card p-6 sm:p-8 space-y-8" data-oid="fyh625:">
            <div data-oid="8p85qpx">
                <h2 className="text-xl font-bold text-charcoal-gray" data-oid="6x-88.d">
                    Tài khoản & Bảo mật
                </h2>
                <p className="text-silver-gray mt-1" data-oid="_7u6uaa">
                    Quản lý thông tin đăng nhập và bảo mật tài khoản của bạn.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center" data-oid="3o:vs41">
                <label
                    htmlFor="email"
                    className="md:col-span-1 text-sm font-medium text-charcoal-gray"
                    data-oid="oumzuyo"
                >
                    Email
                </label>
                <div className="md:col-span-2 flex items-center justify-between" data-oid="99-79sj">
                    <p className="text-charcoal-gray" data-oid="mub8evt">
                        yamada.taro@example.com
                    </p>
                    <button className="manabi-btn-secondary px-4 py-2 text-sm" data-oid="tg_bd0b">
                        Thay đổi
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start" data-oid="b8bhqw3">
                <label
                    className="md:col-span-1 text-sm font-medium text-charcoal-gray pt-2"
                    data-oid="gxmgqom"
                >
                    Mật khẩu
                </label>
                <div className="md:col-span-2 space-y-4" data-oid="wdf9fog">
                    <div data-oid="5aa:d1j">
                        <label className="block text-sm text-silver-gray mb-1" data-oid="jpq3.gv">
                            Mật khẩu hiện tại
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="manabi-input"
                            data-oid="c0kornz"
                        />
                    </div>
                    <div data-oid="j589re2">
                        <label className="block text-sm text-silver-gray mb-1" data-oid="us.x.3_">
                            Mật khẩu mới
                        </label>
                        <input
                            type="password"
                            placeholder="Ít nhất 8 ký tự"
                            className="manabi-input"
                            data-oid="elb5ac7"
                        />
                    </div>
                    <div data-oid=".5ly:vs">
                        <label className="block text-sm text-silver-gray mb-1" data-oid="kpfdl.k">
                            Xác nhận mật khẩu mới
                        </label>
                        <input
                            type="password"
                            placeholder="Nhập lại mật khẩu mới"
                            className="manabi-input"
                            data-oid="_-cjwmt"
                        />
                    </div>
                </div>
            </div>

            <div className="flex justify-end pt-6 border-t border-light-border" data-oid="920abai">
                <button className="manabi-btn-primary" data-oid="jgg:.x9">
                    Đổi mật khẩu
                </button>
            </div>
        </div>
    );
};

// --- Notification Settings Component ---
const NotificationToggle = ({ id, title, description, checked, onChange }: any) => (
    <div className="flex items-start justify-between" data-oid="0hnn:f4">
        <div className="flex-1" data-oid="-qt-fwv">
            <label htmlFor={id} className="font-medium text-charcoal-gray" data-oid=":1tb4y-">
                {title}
            </label>
            <p className="text-sm text-silver-gray" data-oid="d5j8yn4">
                {description}
            </p>
        </div>
        <div
            className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in"
            data-oid="27t1h29"
        >
            <input
                type="checkbox"
                name={id}
                id={id}
                checked={checked}
                onChange={onChange}
                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                data-oid="817a1g0"
            />

            <label
                htmlFor={id}
                className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                data-oid="rre4ix7"
            ></label>
        </div>
        <style jsx data-oid="a2l99q4">{`
            .toggle-checkbox:checked {
                right: 0;
                border-color: #2a7a8c;
            }
            .toggle-checkbox:checked + .toggle-label {
                background-color: #2a7a8c;
            }
        `}</style>
    </div>
);

const NotificationSettings = () => {
    const [notifications, setNotifications] = useState({
        messages: true,
        bookings: true,
        platform: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNotifications({ ...notifications, [e.target.name]: e.target.checked });
    };

    return (
        <div className="manabi-card p-6 sm:p-8 space-y-6" data-oid="tbmggsr">
            <div data-oid="pp1h68h">
                <h2 className="text-xl font-bold text-charcoal-gray" data-oid="dklph:d">
                    Cài đặt thông báo
                </h2>
                <p className="text-silver-gray mt-1" data-oid="7w9j:i5">
                    Chọn những thông báo bạn muốn nhận qua email.
                </p>
            </div>

            <div className="space-y-6" data-oid="o:_e_6j">
                <NotificationToggle
                    id="messages"
                    title="Tin nhắn mới"
                    description="Nhận thông báo khi có người nhắn tin cho bạn."
                    checked={notifications.messages}
                    onChange={handleChange}
                    data-oid="123sqs4"
                />

                <NotificationToggle
                    id="bookings"
                    title="Cập nhật Lịch học"
                    description="Nhận thông báo về lịch học mới, thay đổi hoặc hủy bỏ."
                    checked={notifications.bookings}
                    onChange={handleChange}
                    data-oid="o7iaqwl"
                />

                <NotificationToggle
                    id="platform"
                    title="Tin tức từ Manabi Link"
                    description="Nhận thông tin về các tính năng mới và ưu đãi đặc biệt."
                    checked={notifications.platform}
                    onChange={handleChange}
                    data-oid="ef6zmk7"
                />
            </div>
            <div className="flex justify-end pt-6 border-t border-light-border" data-oid=".zoggho">
                <button className="manabi-btn-primary" data-oid="jfod0gs">
                    Lưu thay đổi
                </button>
            </div>
        </div>
    );
};

// --- Payment Settings Component ---
const PaymentSettings = () => {
    return (
        <div className="manabi-card p-6 sm:p-8 space-y-8" data-oid="gl3f.oi">
            <div data-oid="ufcqotq">
                <h2 className="text-xl font-bold text-charcoal-gray" data-oid="g_lwd3x">
                    Cài đặt thanh toán
                </h2>
                <p className="text-silver-gray mt-1" data-oid=":fyv7u3">
                    Quản lý thông tin tài khoản ngân hàng để nhận thanh toán từ Manabi Link.
                </p>
            </div>

            <div
                className="bg-wisdom-blue/5 p-4 rounded-lg text-sm text-wisdom-blue border border-wisdom-blue/20"
                data-oid="vb:dmg2"
            >
                <p data-oid="_af_mx.">
                    Thanh toán sẽ được xử lý và gửi vào tài khoản của bạn vào ngày 15 hàng tháng.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center" data-oid="7l:mzha">
                <label
                    htmlFor="bankName"
                    className="md:col-span-1 text-sm font-medium text-charcoal-gray"
                    data-oid="7bt.8rl"
                >
                    Tên ngân hàng
                </label>
                <div className="md:col-span-2" data-oid="ece9vqd">
                    <input
                        id="bankName"
                        type="text"
                        className="manabi-input"
                        placeholder="Ví dụ: Techcombank"
                        data-oid="_-i7clu"
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center" data-oid="53un5-g">
                <label
                    htmlFor="branchName"
                    className="md:col-span-1 text-sm font-medium text-charcoal-gray"
                    data-oid="lvdnyyv"
                >
                    Chi nhánh
                </label>
                <div className="md:col-span-2" data-oid="5at8rzf">
                    <input
                        id="branchName"
                        type="text"
                        className="manabi-input"
                        placeholder="Ví dụ: Hội sở chính"
                        data-oid="_hhu.9-"
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center" data-oid="qq9q6g.">
                <label
                    htmlFor="accountNumber"
                    className="md:col-span-1 text-sm font-medium text-charcoal-gray"
                    data-oid="ejwo5sd"
                >
                    Số tài khoản
                </label>
                <div className="md:col-span-2" data-oid=".1pcs94">
                    <input
                        id="accountNumber"
                        type="text"
                        className="manabi-input"
                        placeholder="Nhập số tài khoản của bạn"
                        data-oid="25mw-8q"
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center" data-oid="ct8bp3c">
                <label
                    htmlFor="accountName"
                    className="md:col-span-1 text-sm font-medium text-charcoal-gray"
                    data-oid="o1.80js"
                >
                    Tên chủ tài khoản
                </label>
                <div className="md:col-span-2" data-oid="m5x4ceb">
                    <input
                        id="accountName"
                        type="text"
                        className="manabi-input"
                        placeholder="Tên trên thẻ, không dấu"
                        data-oid="q4a3vr."
                    />
                </div>
            </div>

            <div className="flex justify-end pt-6 border-t border-light-border" data-oid="98_df8j">
                <button className="manabi-btn-primary" data-oid="84_uz6s">
                    Lưu thông tin thanh toán
                </button>
            </div>
        </div>
    );
};

export default SettingsPage;
