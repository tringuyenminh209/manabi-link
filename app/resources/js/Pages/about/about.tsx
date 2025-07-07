'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    Users,
    Target,
    Award,
    Heart,
    Globe,
    BookOpen,
    Star,
    CheckCircle,
    ArrowRight,
    Play,
    Mail,
    Phone,
    MapPin,
    Facebook,
    Instagram,
    Youtube,
    Linkedin,
} from 'lucide-react';

export default function AboutPage() {
    const [selectedLanguage, setSelectedLanguage] = useState('vi');
    const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

    const languages = [
        { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
        { code: 'en', name: 'English', flag: '🇺🇸' },
        { code: 'ja', name: '日本語', flag: '🇯🇵' },
    ];

    const teamMembers = [
        {
            id: 1,
            name: 'Nguyễn Văn An',
            position: 'CEO & Founder',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
            description: 'Chuyên gia công nghệ giáo dục với 10+ năm kinh nghiệm',
            social: {
                linkedin: '#',
                twitter: '#',
                email: 'an.nguyen@manabilink.com',
            },
        },
        {
            id: 2,
            name: 'Trần Thị Bình',
            position: 'CTO',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face',
            description: 'Kỹ sư phần mềm với chuyên môn về AI và Machine Learning',
            social: {
                linkedin: '#',
                twitter: '#',
                email: 'binh.tran@manabilink.com',
            },
        },
        {
            id: 3,
            name: 'Lê Văn Cường',
            position: 'Head of Education',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
            description: 'Chuyên gia giáo dục với kinh nghiệm 15+ năm trong lĩnh vực EdTech',
            social: {
                linkedin: '#',
                twitter: '#',
                email: 'cuong.le@manabilink.com',
            },
        },
        {
            id: 4,
            name: 'Phạm Thị Dung',
            position: 'Head of Marketing',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
            description: 'Chuyên gia marketing số với kinh nghiệm xây dựng thương hiệu',
            social: {
                linkedin: '#',
                twitter: '#',
                email: 'dung.pham@manabilink.com',
            },
        },
    ];

    const achievements = [
        {
            id: 1,
            icon: Users,
            number: '10,000+',
            label: 'Học viên đã tham gia',
            description: 'Số lượng học viên đã đăng ký và hoàn thành khóa học',
        },
        {
            id: 2,
            icon: BookOpen,
            number: '1,200+',
            label: 'Khóa học chất lượng',
            description: 'Các khóa học được thiết kế bởi chuyên gia hàng đầu',
        },
        {
            id: 3,
            icon: Star,
            number: '4.8/5',
            label: 'Đánh giá trung bình',
            description: 'Điểm đánh giá từ học viên về chất lượng khóa học',
        },
        {
            id: 4,
            icon: Award,
            number: '50+',
            label: 'Giải thưởng',
            description: 'Các giải thưởng và chứng nhận về chất lượng giáo dục',
        },
    ];

    const values = [
        {
            id: 1,
            icon: Heart,
            title: 'Tận tâm',
            description:
                'Chúng tôi luôn đặt lợi ích của học viên lên hàng đầu, cam kết mang đến trải nghiệm học tập tốt nhất.',
        },
        {
            id: 2,
            icon: Target,
            title: 'Chất lượng',
            description:
                'Mọi khóa học đều được kiểm soát chất lượng nghiêm ngặt, đảm bảo giá trị thực tế cho người học.',
        },
        {
            id: 3,
            icon: Globe,
            title: 'Kết nối',
            description:
                'Tạo môi trường học tập kết nối, nơi mọi người có thể chia sẻ kiến thức và kinh nghiệm.',
        },
        {
            id: 4,
            icon: Users,
            title: 'Cộng đồng',
            description:
                'Xây dựng cộng đồng học tập sôi động, hỗ trợ lẫn nhau trong hành trình phát triển.',
        },
    ];

    const timeline = [
        {
            year: '2020',
            title: 'Thành lập Manabi Link',
            description:
                'Khởi đầu với tầm nhìn tạo ra nền tảng học tập trực tuyến hàng đầu Việt Nam',
        },
        {
            year: '2021',
            title: 'Ra mắt phiên bản beta',
            description: 'Triển khai thử nghiệm với 100 khóa học đầu tiên và 1,000 học viên',
        },
        {
            year: '2022',
            title: 'Mở rộng quy mô',
            description: 'Đạt 5,000 học viên và 500 khóa học, nhận giải thưởng EdTech Startup',
        },
        {
            year: '2023',
            title: 'Phát triển toàn diện',
            description: 'Ra mắt ứng dụng mobile, tích hợp AI và đạt 10,000+ học viên',
        },
        {
            year: '2024',
            title: 'Lãnh đạo thị trường',
            description: 'Trở thành nền tảng học tập trực tuyến hàng đầu với 1,200+ khóa học',
        },
    ];

    return (
        <div className="min-h-screen bg-[#F8F9FA] font-['Inter']" data-oid="pqilncr">
            {/* Navigation */}
            <nav className="bg-white shadow-sm border-b border-gray-100" data-oid="ggie.lh">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-oid="1tldohd">
                    <div className="flex justify-between items-center h-16" data-oid="407dapq">
                        <div className="flex items-center" data-oid="6e-m5hu">
                            <Link
                                href="/"
                                className="text-2xl font-bold text-[#2A7A8C]"
                                data-oid="dsomcp8"
                            >
                                Manabi Link
                            </Link>
                        </div>

                        <div className="hidden md:flex items-center space-x-8" data-oid="0-ly:mv">
                            <Link
                                href="/"
                                className="text-[#343A40] hover:text-[#2A7A8C] transition-colors"
                                data-oid="f-ils1m"
                            >
                                Trang chủ
                            </Link>
                            <Link
                                href="/course"
                                className="text-[#343A40] hover:text-[#2A7A8C] transition-colors"
                                data-oid="ybxz4so"
                            >
                                Khóa học
                            </Link>
                            <Link
                                href="/teacher"
                                className="text-[#343A40] hover:text-[#2A7A8C] transition-colors"
                                data-oid="mgqzxfn"
                            >
                                Giảng viên
                            </Link>
                            <Link
                                href="/about"
                                className="text-[#2A7A8C] font-medium"
                                data-oid="-ja:9sy"
                            >
                                Về chúng tôi
                            </Link>
                        </div>

                        <div className="flex items-center space-x-4" data-oid="84gyybv">
                            <button
                                className="p-2 text-[#343A40] hover:text-[#2A7A8C] transition-colors"
                                data-oid="690ux9n"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    data-oid="q0ap1d8"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        data-oid="u.eim.7"
                                    />
                                </svg>
                            </button>

                            {/* Language Selector */}
                            <div className="relative" data-oid="7yo:v8f">
                                <button
                                    onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                                    className="flex items-center space-x-2 px-3 py-2 text-[#343A40] hover:text-[#2A7A8C] transition-colors border border-[#CED4DA] rounded-lg hover:border-[#2A7A8C]"
                                    data-oid="5vuwp_n"
                                >
                                    <span className="text-lg" data-oid="csunngr">
                                        {
                                            languages.find((lang) => lang.code === selectedLanguage)
                                                ?.flag
                                        }
                                    </span>
                                    <span className="text-sm font-medium" data-oid="f01vztr">
                                        {languages
                                            .find((lang) => lang.code === selectedLanguage)
                                            ?.code.toUpperCase()}
                                    </span>
                                    <svg
                                        className={`w-4 h-4 transition-transform ${showLanguageDropdown ? 'rotate-180' : ''}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        data-oid="ftxq2h5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                            data-oid="hxxgj9k"
                                        />
                                    </svg>
                                </button>

                                {showLanguageDropdown && (
                                    <div
                                        className="absolute right-0 mt-2 w-48 bg-white border border-[#CED4DA] rounded-lg shadow-lg z-50"
                                        data-oid="arik4a9"
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
                                                data-oid="ki2dq3y"
                                            >
                                                <span className="text-lg" data-oid="iov:sn.">
                                                    {language.flag}
                                                </span>
                                                <span
                                                    className="text-sm font-medium"
                                                    data-oid="rpw11uq"
                                                >
                                                    {language.name}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <Link
                                href="/login"
                                className="bg-[#FFC947] text-[#343A40] px-6 py-2 rounded-lg font-medium hover:shadow-md transition-all duration-200"
                                data-oid="y:c1fld"
                            >
                                Đăng nhập
                            </Link>
                            <Link
                                href="/register"
                                className="bg-[#2A7A8C] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#1A5A6C] transition-all duration-200"
                                data-oid="bymhzmc"
                            >
                                Đăng ký
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="bg-white py-20" data-oid="lfz:q_i">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-oid="00_l0_l">
                    <div className="text-center" data-oid="p.-uqui">
                        <h1
                            className="text-4xl md:text-6xl font-bold text-[#343A40] mb-6"
                            data-oid="r8:8:ll"
                        >
                            Về{' '}
                            <span className="text-[#2A7A8C]" data-oid="6cy9l_t">
                                Manabi Link
                            </span>
                        </h1>
                        <p
                            className="text-xl text-[#6C757D] max-w-3xl mx-auto mb-8"
                            data-oid="q5:_6l2"
                        >
                            Chúng tôi là nền tảng học tập trực tuyến hàng đầu Việt Nam, kết nối
                            người học với các chuyên gia và tạo ra môi trường học tập chất lượng cao
                            cho mọi người.
                        </p>
                        <div className="flex justify-center" data-oid="hmax.u_">
                            <button
                                className="bg-[#FFC947] text-[#343A40] px-8 py-4 rounded-lg font-medium text-lg hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
                                data-oid="ekr:acf"
                            >
                                <Play className="w-5 h-5" data-oid="2bemivk" />
                                <span data-oid="cyoiikp">Xem video giới thiệu</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-20" data-oid="51.shxq">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-oid="ck8zu7l">
                    <div
                        className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
                        data-oid="msuyfvw"
                    >
                        <div data-oid="_ra2zbw">
                            <h2
                                className="text-3xl font-bold text-[#343A40] mb-6"
                                data-oid="68wi4:x"
                            >
                                Sứ mệnh & Tầm nhìn
                            </h2>
                            <div className="space-y-8" data-oid="ogp.vr_">
                                <div data-oid="nph14l:">
                                    <h3
                                        className="text-xl font-semibold text-[#2A7A8C] mb-3 flex items-center"
                                        data-oid="7.po38y"
                                    >
                                        <Target className="w-6 h-6 mr-3" data-oid="s4z91yx" />
                                        Sứ mệnh
                                    </h3>
                                    <p
                                        className="text-[#6C757D] leading-relaxed"
                                        data-oid="51070bv"
                                    >
                                        Chúng tôi cam kết mang đến cơ hội học tập chất lượng cao cho
                                        mọi người, bất kể họ ở đâu. Thông qua công nghệ tiên tiến và
                                        nội dung giáo dục xuất sắc, chúng tôi giúp mọi người phát
                                        triển kỹ năng và đạt được mục tiêu của mình.
                                    </p>
                                </div>
                                <div data-oid="hak0j4c">
                                    <h3
                                        className="text-xl font-semibold text-[#2A7A8C] mb-3 flex items-center"
                                        data-oid="6a73w2c"
                                    >
                                        <Globe className="w-6 h-6 mr-3" data-oid="kx5.x:r" />
                                        Tầm nhìn
                                    </h3>
                                    <p
                                        className="text-[#6C757D] leading-relaxed"
                                        data-oid="amlixhl"
                                    >
                                        Trở thành nền tảng học tập trực tuyến hàng đầu Đông Nam Á,
                                        tạo ra một cộng đồng học tập toàn cầu nơi mọi người có thể
                                        chia sẻ kiến thức và phát triển cùng nhau.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="relative" data-oid="9jk:zq8">
                            <img
                                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop"
                                alt="Team working"
                                className="rounded-2xl shadow-lg"
                                data-oid="1t1tjnw"
                            />

                            <div
                                className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg"
                                data-oid="c:ta484"
                            >
                                <div
                                    className="text-3xl font-bold text-[#2A7A8C]"
                                    data-oid="_:aa4s-"
                                >
                                    5+
                                </div>
                                <div className="text-[#6C757D]" data-oid="phfv668">
                                    Năm kinh nghiệm
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="bg-white py-20" data-oid="hanixr4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-oid="3z59ga:">
                    <div className="text-center mb-16" data-oid="_9ojekf">
                        <h2 className="text-3xl font-bold text-[#343A40] mb-4" data-oid=":exz5:h">
                            Giá trị cốt lõi
                        </h2>
                        <p className="text-[#6C757D] max-w-2xl mx-auto" data-oid="5n:0o7f">
                            Những giá trị định hướng mọi hoạt động và quyết định của chúng tôi
                        </p>
                    </div>
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                        data-oid="_ayry31"
                    >
                        {values.map((value) => (
                            <div
                                key={value.id}
                                className="text-center p-6 rounded-xl hover:shadow-lg transition-all duration-300"
                                data-oid="qxaos9o"
                            >
                                <div
                                    className="w-16 h-16 bg-[#2A7A8C]/10 rounded-full flex items-center justify-center mx-auto mb-4"
                                    data-oid="n296.ug"
                                >
                                    <value.icon
                                        className="w-8 h-8 text-[#2A7A8C]"
                                        data-oid="gt:o.rb"
                                    />
                                </div>
                                <h3
                                    className="text-xl font-semibold text-[#343A40] mb-3"
                                    data-oid="r2yevih"
                                >
                                    {value.title}
                                </h3>
                                <p className="text-[#6C757D] leading-relaxed" data-oid="adja__4">
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Achievements */}
            <section className="py-20" data-oid="m0rguhd">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-oid="mgza3qx">
                    <div className="text-center mb-16" data-oid="-:wo-d4">
                        <h2 className="text-3xl font-bold text-[#343A40] mb-4" data-oid="i8qnbhu">
                            Thành tựu của chúng tôi
                        </h2>
                        <p className="text-[#6C757D] max-w-2xl mx-auto" data-oid="as31xms">
                            Những con số ấn tượng phản ánh sự tin tưởng và ủng hộ của cộng đồng
                        </p>
                    </div>
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                        data-oid="fjbix09"
                    >
                        {achievements.map((achievement) => (
                            <div
                                key={achievement.id}
                                className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300"
                                data-oid="wphgg04"
                            >
                                <div
                                    className="w-16 h-16 bg-[#FFC947]/10 rounded-full flex items-center justify-center mx-auto mb-4"
                                    data-oid="yhn1l41"
                                >
                                    <achievement.icon
                                        className="w-8 h-8 text-[#FFC947]"
                                        data-oid="0979quo"
                                    />
                                </div>
                                <div
                                    className="text-3xl font-bold text-[#2A7A8C] mb-2"
                                    data-oid="6p35h3y"
                                >
                                    {achievement.number}
                                </div>
                                <h3
                                    className="text-lg font-semibold text-[#343A40] mb-2"
                                    data-oid="bb_4o_l"
                                >
                                    {achievement.label}
                                </h3>
                                <p className="text-[#6C757D] text-sm" data-oid="rlpwqbs">
                                    {achievement.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="bg-white py-20" data-oid="kikoi4i">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-oid="tg0.3_:">
                    <div className="text-center mb-16" data-oid="-9ptzdg">
                        <h2 className="text-3xl font-bold text-[#343A40] mb-4" data-oid="yj5h_ui">
                            Hành trình phát triển
                        </h2>
                        <p className="text-[#6C757D] max-w-2xl mx-auto" data-oid="83b8hea">
                            Những cột mốc quan trọng trong quá trình xây dựng và phát triển Manabi
                            Link
                        </p>
                    </div>
                    <div className="relative" data-oid=".b7vls9">
                        <div
                            className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-[#E9ECEF] h-full"
                            data-oid="xec0cyv"
                        ></div>
                        <div className="space-y-12" data-oid="gsy8ed0">
                            {timeline.map((item, index) => (
                                <div
                                    key={index}
                                    className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                                    data-oid="zz39__k"
                                >
                                    <div className="w-1/2 px-8" data-oid="meolloy">
                                        <div
                                            className={`bg-white p-6 rounded-xl shadow-sm ${index % 2 === 0 ? 'text-right' : 'text-left'}`}
                                            data-oid="834x9:x"
                                        >
                                            <div
                                                className="text-2xl font-bold text-[#2A7A8C] mb-2"
                                                data-oid="0095-3j"
                                            >
                                                {item.year}
                                            </div>
                                            <h3
                                                className="text-xl font-semibold text-[#343A40] mb-2"
                                                data-oid="wxcsbg4"
                                            >
                                                {item.title}
                                            </h3>
                                            <p className="text-[#6C757D]" data-oid="e8.l-yy">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        className="w-4 h-4 bg-[#2A7A8C] rounded-full border-4 border-white shadow-lg relative z-10"
                                        data-oid=":4_fy.z"
                                    ></div>
                                    <div className="w-1/2 px-8" data-oid=".3kjf8k"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="py-20" data-oid="aa0sr2a">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-oid="wsh27wy">
                    <div className="text-center mb-16" data-oid="pl:_rf.">
                        <h2 className="text-3xl font-bold text-[#343A40] mb-4" data-oid="zhyey3o">
                            Đội ngũ lãnh đạo
                        </h2>
                        <p className="text-[#6C757D] max-w-2xl mx-auto" data-oid="3l-727t">
                            Những con người tài năng và tâm huyết đang xây dựng tương lai của giáo
                            dục
                        </p>
                    </div>
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                        data-oid="7rjdky0"
                    >
                        {teamMembers.map((member) => (
                            <div
                                key={member.id}
                                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
                                data-oid="w5zu3n."
                            >
                                <div className="aspect-square" data-oid="kenppwz">
                                    <img
                                        src={member.avatar}
                                        alt={member.name}
                                        className="w-full h-full object-cover"
                                        data-oid="s8:_z57"
                                    />
                                </div>
                                <div className="p-6" data-oid="zsl2afg">
                                    <h3
                                        className="text-xl font-semibold text-[#343A40] mb-1"
                                        data-oid="w0euc.2"
                                    >
                                        {member.name}
                                    </h3>
                                    <p
                                        className="text-[#2A7A8C] font-medium mb-3"
                                        data-oid="32liyph"
                                    >
                                        {member.position}
                                    </p>
                                    <p className="text-[#6C757D] text-sm mb-4" data-oid="xn0wk3z">
                                        {member.description}
                                    </p>
                                    <div className="flex space-x-3" data-oid="ighwccy">
                                        <a
                                            href={member.social.linkedin}
                                            className="text-[#6C757D] hover:text-[#2A7A8C] transition-colors"
                                            data-oid="87koxqz"
                                        >
                                            <Linkedin className="w-5 h-5" data-oid="7wvo66." />
                                        </a>
                                        <a
                                            href={`mailto:${member.social.email}`}
                                            className="text-[#6C757D] hover:text-[#2A7A8C] transition-colors"
                                            data-oid="d3_kq.m"
                                        >
                                            <Mail className="w-5 h-5" data-oid="qsa0vk0" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-[#2A7A8C] py-20" data-oid="doikg3n">
                <div
                    className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
                    data-oid="2x6t9ns"
                >
                    <h2 className="text-3xl font-bold text-white mb-6" data-oid="g.u15wf">
                        Sẵn sàng bắt đầu hành trình học tập?
                    </h2>
                    <p className="text-white/80 max-w-2xl mx-auto mb-8" data-oid="m:8eeoz">
                        Tham gia cùng chúng tôi và khám phá thế giới tri thức vô tận. Hãy để Manabi
                        Link đồng hành cùng bạn trên con đường phát triển.
                    </p>
                    <div
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                        data-oid=":r0wnxt"
                    >
                        <Link
                            href="/register"
                            className="bg-[#FFC947] text-[#343A40] px-8 py-4 rounded-lg font-medium text-lg hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
                            data-oid="17nhqxm"
                        >
                            <span data-oid="dmhbt_o">Đăng ký ngay</span>
                            <ArrowRight className="w-5 h-5" data-oid="91lwz_w" />
                        </Link>
                        <Link
                            href="/course"
                            className="border border-white text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-white hover:text-[#2A7A8C] transition-all duration-200"
                            data-oid="h.-0_rn"
                        >
                            Khám phá khóa học
                        </Link>
                    </div>
                </div>
            </section>

            {/* Contact Info */}
            <section className="bg-white py-16" data-oid=":klb.:1">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-oid="9y62-ur">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8" data-oid="52q_bt2">
                        <div className="text-center" data-oid="vp_f5je">
                            <div
                                className="w-16 h-16 bg-[#2A7A8C]/10 rounded-full flex items-center justify-center mx-auto mb-4"
                                data-oid="i-r96uk"
                            >
                                <Mail className="w-8 h-8 text-[#2A7A8C]" data-oid="p:tyxbw" />
                            </div>
                            <h3
                                className="text-xl font-semibold text-[#343A40] mb-2"
                                data-oid="798_5g3"
                            >
                                Email
                            </h3>
                            <p className="text-[#6C757D]" data-oid="6bk7d90">
                                contact@manabilink.com
                            </p>
                        </div>
                        <div className="text-center" data-oid="zvahyl5">
                            <div
                                className="w-16 h-16 bg-[#2A7A8C]/10 rounded-full flex items-center justify-center mx-auto mb-4"
                                data-oid="0j0w-3c"
                            >
                                <Phone className="w-8 h-8 text-[#2A7A8C]" data-oid="neqktxw" />
                            </div>
                            <h3
                                className="text-xl font-semibold text-[#343A40] mb-2"
                                data-oid="n.ss93_"
                            >
                                Điện thoại
                            </h3>
                            <p className="text-[#6C757D]" data-oid="zxh1rv-">
                                +84 28 7300 9999
                            </p>
                        </div>
                        <div className="text-center" data-oid="ksrbjq5">
                            <div
                                className="w-16 h-16 bg-[#2A7A8C]/10 rounded-full flex items-center justify-center mx-auto mb-4"
                                data-oid="u:jba7h"
                            >
                                <MapPin className="w-8 h-8 text-[#2A7A8C]" data-oid="0ixa-:c" />
                            </div>
                            <h3
                                className="text-xl font-semibold text-[#343A40] mb-2"
                                data-oid="pn_083s"
                            >
                                Địa chỉ
                            </h3>
                            <p className="text-[#6C757D]" data-oid="sk9zpe2">
                                123 Nguyễn Huệ, Q.1, TP.HCM
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#343A40] text-white py-12" data-oid="btltu6f">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-oid="ryg:nft">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8" data-oid="e:0crz-">
                        <div data-oid="zp0:ouy">
                            <div
                                className="text-2xl font-bold text-[#FFC947] mb-4"
                                data-oid="xczuww3"
                            >
                                Manabi Link
                            </div>
                            <p className="text-gray-300 mb-4" data-oid="viu6-xd">
                                Kết nối tri thức, chia sẻ kỹ năng cùng cộng đồng học tập Việt Nam.
                            </p>
                            <div className="flex space-x-4" data-oid="ywhg580">
                                <a
                                    href="#"
                                    className="text-gray-300 hover:text-[#FFC947] transition-colors"
                                    data-oid="ihqqijf"
                                >
                                    <Facebook className="w-5 h-5" data-oid="sk:se7e" />
                                </a>
                                <a
                                    href="#"
                                    className="text-gray-300 hover:text-[#FFC947] transition-colors"
                                    data-oid="omvp-u4"
                                >
                                    <Instagram className="w-5 h-5" data-oid="3v8v7:g" />
                                </a>
                                <a
                                    href="#"
                                    className="text-gray-300 hover:text-[#FFC947] transition-colors"
                                    data-oid=":.1gfve"
                                >
                                    <Youtube className="w-5 h-5" data-oid="35s1wg6" />
                                </a>
                                <a
                                    href="#"
                                    className="text-gray-300 hover:text-[#FFC947] transition-colors"
                                    data-oid="b9rplnn"
                                >
                                    <Linkedin className="w-5 h-5" data-oid="c:d4m4-" />
                                </a>
                            </div>
                        </div>
                        <div data-oid=".42xvlq">
                            <h3 className="font-semibold mb-4" data-oid="ggiw8np">
                                Về chúng tôi
                            </h3>
                            <ul className="space-y-2 text-gray-300" data-oid="4a-xq-l">
                                <li data-oid="zd22e18">
                                    <a
                                        href="#"
                                        className="hover:text-[#FFC947] transition-colors"
                                        data-oid="jqc3y__"
                                    >
                                        Giới thiệu
                                    </a>
                                </li>
                                <li data-oid="r_ejlat">
                                    <a
                                        href="#"
                                        className="hover:text-[#FFC947] transition-colors"
                                        data-oid="pvw23nx"
                                    >
                                        Liên hệ
                                    </a>
                                </li>
                                <li data-oid="q00ucc9">
                                    <a
                                        href="#"
                                        className="hover:text-[#FFC947] transition-colors"
                                        data-oid="8galp.l"
                                    >
                                        Tuyển dụng
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div data-oid="6m8:5y5">
                            <h3 className="font-semibold mb-4" data-oid="a8_pt1i">
                                Hỗ trợ
                            </h3>
                            <ul className="space-y-2 text-gray-300" data-oid="otjk8tm">
                                <li data-oid=".qkkuyr">
                                    <a
                                        href="#"
                                        className="hover:text-[#FFC947] transition-colors"
                                        data-oid="scapcah"
                                    >
                                        Trung tâm trợ giúp
                                    </a>
                                </li>
                                <li data-oid="2dfk9uu">
                                    <a
                                        href="#"
                                        className="hover:text-[#FFC947] transition-colors"
                                        data-oid=":r90xh8"
                                    >
                                        Điều khoản
                                    </a>
                                </li>
                                <li data-oid="bhds1zq">
                                    <a
                                        href="#"
                                        className="hover:text-[#FFC947] transition-colors"
                                        data-oid="nwd7tzx"
                                    >
                                        Bảo mật
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div data-oid="arofafc">
                            <h3 className="font-semibold mb-4" data-oid="b93e8tx">
                                Theo dõi chúng tôi
                            </h3>
                            <div className="flex space-x-4" data-oid="gl-utex">
                                <a
                                    href="#"
                                    className="text-gray-300 hover:text-[#FFC947] transition-colors"
                                    data-oid="_-ouk8-"
                                >
                                    Facebook
                                </a>
                                <a
                                    href="#"
                                    className="text-gray-300 hover:text-[#FFC947] transition-colors"
                                    data-oid="v0vl.vh"
                                >
                                    Instagram
                                </a>
                                <a
                                    href="#"
                                    className="text-gray-300 hover:text-[#FFC947] transition-colors"
                                    data-oid="ljhxq:f"
                                >
                                    YouTube
                                </a>
                            </div>
                        </div>
                    </div>
                    <div
                        className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-300"
                        data-oid="3i3o0p."
                    >
                        <p data-oid="fh129g.">
                            &copy; 2024 Manabi Link. Tất cả quyền được bảo lưu.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
