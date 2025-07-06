'use client';

import { useState } from 'react';
import { Music, Languages, UtensilsCrossed, Dumbbell, Palette, Laptop } from 'lucide-react';

export default function Page() {
    const [activeTab, setActiveTab] = useState('home');
    const [selectedLanguage, setSelectedLanguage] = useState('vi');
    const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

    const languages = [
        { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
        { code: 'en', name: 'English', flag: '🇺🇸' },
        { code: 'ja', name: '日本語', flag: '🇯🇵' },
    ];

    const lessonCards = [
        {
            id: 1,
            title: 'Guitar cơ bản cho người mới bắt đầu',
            instructor: 'Nguyễn Văn A',
            rating: 4.8,
            reviews: 125,
            price: '300,000đ',
            image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=225&fit=crop',
            tags: ['Online', 'Guitar', 'Beginner'],
        },
        {
            id: 2,
            title: 'Tiếng Nhật giao tiếp hàng ngày',
            instructor: 'Tanaka Yuki',
            rating: 4.9,
            reviews: 89,
            price: '450,000đ',
            image: 'https://images.unsplash.com/photo-1528164344705-47542687000d?w=400&h=225&fit=crop',
            tags: ['Online', 'Japanese', 'Conversation'],
        },
        {
            id: 3,
            title: 'Nấu ăn Việt Nam truyền thống',
            instructor: 'Trần Thị B',
            rating: 4.7,
            reviews: 67,
            price: '250,000đ',
            image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=225&fit=crop',
            tags: ['Offline', 'Cooking', 'Traditional'],
        },
    ];

    return (
        <div className="min-h-screen bg-[#F8F9FA] font-['Inter']" data-oid="gjzecjp">
            {/* Navigation */}
            <nav className="bg-white shadow-sm border-b border-gray-100" data-oid="2cukamv">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-oid="4288743">
                    <div className="flex justify-between items-center h-16" data-oid="x_c2u-.">
                        <div className="flex items-center" data-oid="cpcqw47">
                            <div className="text-2xl font-bold text-[#2A7A8C]" data-oid="4t.dk9i">
                                Manabi Link
                            </div>
                        </div>

                        <div className="hidden md:flex items-center space-x-8" data-oid="cb8zfma">
                            <a
                                href="/"
                                className="text-[#343A40] hover:text-[#2A7A8C] transition-colors"
                                data-oid="0kfttb8"
                            >
                                Trang chủ
                            </a>
                            <a
                                href="/course"
                                className="text-[#343A40] hover:text-[#2A7A8C] transition-colors"
                                data-oid="5sysq.9"
                            >
                                Khóa học
                            </a>
                            <a
                                href="/teacher"
                                className="text-[#343A40] hover:text-[#2A7A8C] transition-colors"
                                data-oid="cn_0se4"
                            >
                                Giảng viên
                            </a>
                            <a
                                href="/about"
                                className="text-[#343A40] hover:text-[#2A7A8C] transition-colors"
                                data-oid=".tb61b0"
                            >
                                Về chúng tôi
                            </a>
                        </div>

                        <div className="flex items-center space-x-4" data-oid="n91.e_.">
                            <button
                                className="p-2 text-[#343A40] hover:text-[#2A7A8C] transition-colors"
                                data-oid="ihvzvk4"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    data-oid="h3u.813"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        data-oid=":v4n688"
                                    />
                                </svg>
                            </button>

                            {/* Language Selector */}

                            <div className="relative" data-oid="b3d7j.m">
                                <button
                                    onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                                    className="flex items-center space-x-2 px-3 py-2 text-[#343A40] hover:text-[#2A7A8C] transition-colors border border-[#CED4DA] rounded-lg hover:border-[#2A7A8C]"
                                    data-oid="lss740k"
                                >
                                    <span className="text-lg" data-oid="ou0co8q">
                                        {
                                            languages.find((lang) => lang.code === selectedLanguage)
                                                ?.flag
                                        }
                                    </span>
                                    <span className="text-sm font-medium" data-oid="1zqqnsk">
                                        {languages
                                            .find((lang) => lang.code === selectedLanguage)
                                            ?.code.toUpperCase()}
                                    </span>
                                    <svg
                                        className={`w-4 h-4 transition-transform ${showLanguageDropdown ? 'rotate-180' : ''}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        data-oid="z73y59i"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                            data-oid="i2:11zk"
                                        />
                                    </svg>
                                </button>

                                {showLanguageDropdown && (
                                    <div
                                        className="absolute right-0 mt-2 w-48 bg-white border border-[#CED4DA] rounded-lg shadow-lg z-50"
                                        data-oid="ay56:vn"
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
                                                data-oid="4p:y3sw"
                                            >
                                                <span className="text-lg" data-oid="2:s3nhb">
                                                    {language.flag}
                                                </span>
                                                <span
                                                    className="text-sm font-medium"
                                                    data-oid="9oba538"
                                                >
                                                    {language.name}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <button
                                className="bg-[#FFC947] text-[#343A40] px-6 py-2 rounded-lg font-medium hover:shadow-md transition-all duration-200"
                                data-oid="ulft3.8"
                            >
                                Đăng nhập
                            </button>
                            <button
                                className="bg-[#2A7A8C] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#1A5A6C] transition-all duration-200"
                                data-oid="ldid75h"
                            >
                                Đăng ký
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="bg-white" data-oid="b58h-.p">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20" data-oid="7asovii">
                    <div className="text-center" data-oid="zk7:pke">
                        <h1
                            className="text-4xl md:text-6xl font-bold text-[#343A40] mb-6"
                            data-oid="1slumik"
                        >
                            Kết nối{' '}
                            <span className="text-[#2A7A8C]" data-oid="y__.-2b">
                                tri thức
                            </span>
                            ,<br data-oid="9vp:ytj" />
                            chia sẻ{' '}
                            <span className="text-[#FFC947]" data-oid="m.zp:0m">
                                kỹ năng
                            </span>
                        </h1>
                        <p
                            className="text-xl text-[#6C757D] max-w-3xl mx-auto mb-8"
                            data-oid="z:90awd"
                        >
                            Nền tảng học tập trực tuyến hàng đầu Việt Nam, nơi bạn có thể học hỏi từ
                            các chuyên gia và chia sẻ kiến thức của mình với cộng đồng.
                        </p>
                        
                        {/* Social Proof */}
                        <div className="mb-12">
                            <p className="text-lg text-[#6C757D] mb-4">
                                Tham gia cùng <span className="font-semibold text-[#2A7A8C]">10,000+ học viên</span> và <span className="font-semibold text-[#2A7A8C]">500+ giảng viên</span>
                            </p>
                            <div className="flex justify-center items-center space-x-8 text-sm text-[#6C757D]">
                                <div className="flex items-center space-x-2">
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3, 4].map((i) => (
                                            <div key={i} className="w-8 h-8 bg-[#2A7A8C] rounded-full border-2 border-white"></div>
                                        ))}
                                    </div>
                                    <span>Học viên đang học</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-6 h-6 bg-[#FFC947] rounded-full flex items-center justify-center">
                                        <span className="text-xs font-bold text-[#343A40]">✓</span>
                                    </div>
                                    <span>Chứng nhận chất lượng</span>
                                </div>
                            </div>
                        </div>
                        
                        <div
                            className="flex flex-col sm:flex-row gap-4 justify-center"
                            data-oid="yp5xjv:"
                        >
                            <button
                                className="bg-[#FFC947] text-[#343A40] px-8 py-4 rounded-lg font-medium text-lg hover:shadow-lg transition-all duration-200"
                                data-oid="x-w23hm"
                            >
                                Khám phá khóa học
                            </button>
                            <button
                                className="border border-[#2A7A8C] text-[#2A7A8C] px-8 py-4 rounded-lg font-medium text-lg hover:bg-[#2A7A8C] hover:bg-opacity-5 transition-all duration-200"
                                data-oid="xug2o:5"
                            >
                                Trở thành giảng viên
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-16 bg-[#F8F9FA]" data-oid="categories-section">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-oid="categories-container">
                    <h2 className="text-3xl font-bold text-[#343A40] mb-12 text-center">
                        Khám phá theo danh mục
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                        {[
                            { name: 'Âm nhạc', icon: Music, count: '156 khóa học' },
                            { name: 'Ngôn ngữ', icon: Languages, count: '89 khóa học' },
                            { name: 'Nấu ăn', icon: UtensilsCrossed, count: '67 khóa học' },
                            { name: 'Thể thao', icon: Dumbbell, count: '45 khóa học' },
                            { name: 'Nghệ thuật', icon: Palette, count: '78 khóa học' },
                            { name: 'Công nghệ', icon: Laptop, count: '123 khóa học' },
                        ].map((category, index) => {
                            const Icon = category.icon;
                            return (
                                <div
                                    key={index}
                                    className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 cursor-pointer border border-[#E9ECEF] hover:border-[#2A7A8C]"
                                >
                                    <Icon className="mx-auto mb-3 w-10 h-10 text-wisdom-blue" />
                                    <h3 className="font-semibold text-[#343A40] mb-2">{category.name}</h3>
                                    <p className="text-sm text-[#6C757D]">{category.count}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Search Section */}
            <section className="py-16" data-oid="k61tvgp">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" data-oid="clcuvv7">
                    <div className="bg-white rounded-2xl shadow-lg p-8" data-oid="y14qjsz">
                        <h2
                            className="text-2xl font-bold text-[#343A40] mb-6 text-center"
                            data-oid="0r-9856"
                        >
                            Tìm kiếm khóa học phù hợp
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4" data-oid="3u:xard">
                            <div data-oid="56t1o-5">
                                <label
                                    className="block text-sm font-medium text-[#343A40] mb-2"
                                    data-oid="1x40bpf"
                                >
                                    Kỹ năng
                                </label>
                                <input
                                    type="text"
                                    placeholder="Ví dụ: Guitar, Tiếng Nhật..."
                                    className="w-full px-4 py-3 border border-[#CED4DA] rounded-lg focus:border-[#2A7A8C] focus:border-2 outline-none transition-all"
                                    data-oid="m0qaacp"
                                />
                            </div>
                            <div data-oid="fdkmdnk">
                                <label
                                    className="block text-sm font-medium text-[#343A40] mb-2"
                                    data-oid="xuy-dus"
                                >
                                    Địa điểm
                                </label>
                                <input
                                    type="text"
                                    placeholder="Hà Nội, TP.HCM..."
                                    className="w-full px-4 py-3 border border-[#CED4DA] rounded-lg focus:border-[#2A7A8C] focus:border-2 outline-none transition-all"
                                    data-oid="7w07nj8"
                                />
                            </div>
                            <div data-oid="e5_72e.">
                                <label
                                    className="block text-sm font-medium text-[#343A40] mb-2"
                                    data-oid="0uvu_e1"
                                >
                                    Mức giá
                                </label>
                                <select
                                    className="w-full px-4 py-3 border border-[#CED4DA] rounded-lg focus:border-[#2A7A8C] focus:border-2 outline-none transition-all"
                                    data-oid="stwbvtw"
                                >
                                    <option data-oid="l:7._fn">Tất cả</option>
                                    <option data-oid="0sm5gx6">Dưới 200k</option>
                                    <option data-oid=":5h6e6u">200k - 500k</option>
                                    <option data-oid="zo3mkdf">Trên 500k</option>
                                </select>
                            </div>
                        </div>
                        <button
                            className="w-full mt-6 bg-[#FFC947] text-[#343A40] py-3 rounded-lg font-medium hover:shadow-md transition-all duration-200"
                            data-oid="rw.ttx9"
                        >
                            Tìm kiếm
                        </button>
                    </div>
                </div>
            </section>

            {/* Featured Courses */}
            <section className="py-16" data-oid="xyrz:qj">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-oid="yr7r6i8">
                    <h2
                        className="text-3xl font-bold text-[#343A40] mb-12 text-center"
                        data-oid="aftjjll"
                    >
                        Khóa học nổi bật
                    </h2>
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        data-oid="ew77iq_"
                    >
                        {lessonCards.map((lesson) => (
                            <div
                                key={lesson.id}
                                className="bg-white rounded-xl border border-[#E9ECEF] overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
                                data-oid="n9rr6pr"
                            >
                                <div className="aspect-video" data-oid="h9l7qmz">
                                    <img
                                        src={lesson.image}
                                        alt={lesson.title}
                                        className="w-full h-full object-cover"
                                        data-oid="tw80q64"
                                    />
                                </div>
                                <div className="p-6" data-oid="forsyi3">
                                    <h3
                                        className="text-lg font-bold text-[#343A40] mb-3 line-clamp-2"
                                        data-oid="ey3oy-a"
                                    >
                                        {lesson.title}
                                    </h3>

                                    <div className="flex items-center mb-3" data-oid="91n0:d3">
                                        <div
                                            className="w-8 h-8 bg-[#2A7A8C] rounded-full flex items-center justify-center text-white text-sm font-medium mr-3"
                                            data-oid="xlz.87b"
                                        >
                                            {lesson.instructor.charAt(0)}
                                        </div>
                                        <span
                                            className="text-sm font-medium text-[#343A40]"
                                            data-oid="wt-kp2."
                                        >
                                            {lesson.instructor}
                                        </span>
                                    </div>

                                    <div className="flex items-center mb-4" data-oid="j30nj8g">
                                        <div
                                            className="flex text-yellow-400 mr-2"
                                            data-oid="6-f42ok"
                                        >
                                            {[...Array(5)].map((_, i) => (
                                                <svg
                                                    key={i}
                                                    className="w-4 h-4 fill-current"
                                                    viewBox="0 0 20 20"
                                                    data-oid="fkzun-k"
                                                >
                                                    <path
                                                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                                        data-oid="9iq9rrn"
                                                    />
                                                </svg>
                                            ))}
                                        </div>
                                        <span className="text-sm text-[#6C757D]" data-oid="hidsniw">
                                            {lesson.rating} ({lesson.reviews})
                                        </span>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-4" data-oid="8nr6bed">
                                        {lesson.tags.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-[#F8F9FA] text-[#6C757D] text-xs rounded-full"
                                                data-oid="o6pg54m"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div
                                        className="flex justify-between items-center"
                                        data-oid="38qfn43"
                                    >
                                        <span
                                            className="text-lg font-semibold text-[#2A7A8C]"
                                            data-oid=":16b:a_"
                                        >
                                            {lesson.price}
                                        </span>
                                        <button
                                            className="bg-[#FFC947] text-[#343A40] px-4 py-2 rounded-lg font-medium hover:shadow-md transition-all duration-200"
                                            data-oid="5vxor1t"
                                        >
                                            Xem chi tiết
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="bg-white py-16" data-oid="yjv1zdn">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-oid="rd:q6a8">
                    <div
                        className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
                        data-oid="1k0q845"
                    >
                        <div data-oid="xpc4f06">
                            <div
                                className="text-3xl font-bold text-[#2A7A8C] mb-2"
                                data-oid="vnltky4"
                            >
                                10,000+
                            </div>
                            <div className="text-[#6C757D]" data-oid="ip.za5c">
                                Học viên
                            </div>
                        </div>
                        <div data-oid="h:oar9l">
                            <div
                                className="text-3xl font-bold text-[#2A7A8C] mb-2"
                                data-oid="dehpml0"
                            >
                                500+
                            </div>
                            <div className="text-[#6C757D]" data-oid="5os-1by">
                                Giảng viên
                            </div>
                        </div>
                        <div data-oid="jctvtqs">
                            <div
                                className="text-3xl font-bold text-[#2A7A8C] mb-2"
                                data-oid="9ukj4po"
                            >
                                1,200+
                            </div>
                            <div className="text-[#6C757D]" data-oid="l59y.8r">
                                Khóa học
                            </div>
                        </div>
                        <div data-oid="0qid8tb">
                            <div
                                className="text-3xl font-bold text-[#2A7A8C] mb-2"
                                data-oid="4lwv3ub"
                            >
                                4.8/5
                            </div>
                            <div className="text-[#6C757D]" data-oid="v03zkt1">
                                Đánh giá
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#343A40] text-white py-12" data-oid="u3-tupn">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-oid=".f4u1t3">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8" data-oid="n7w6:qo">
                        <div data-oid="khxevse">
                            <div
                                className="text-2xl font-bold text-[#FFC947] mb-4"
                                data-oid="fosygal"
                            >
                                Manabi Link
                            </div>
                            <p className="text-gray-300" data-oid="7v1246s">
                                Kết nối tri thức, chia sẻ kỹ năng cùng cộng đồng học tập Việt Nam.
                            </p>
                        </div>
                        <div data-oid="po3q1om">
                            <h3 className="font-semibold mb-4" data-oid="g1y78m.">
                                Về chúng tôi
                            </h3>
                            <ul className="space-y-2 text-gray-300" data-oid="xoq9tnv">
                                <li data-oid="1dl5jr7">
                                    <a
                                        href="/about"
                                        className="hover:text-[#FFC947] transition-colors"
                                        data-oid="mfpdm9-"
                                    >
                                        Giới thiệu
                                    </a>
                                </li>
                                <li data-oid="cc3494s">
                                    <a
                                        href="/about#contact"
                                        className="hover:text-[#FFC947] transition-colors"
                                        data-oid="3gg_hd1"
                                    >
                                        Liên hệ
                                    </a>
                                </li>
                                <li data-oid="nzy17bk">
                                    <a
                                        href="/about#jobs"
                                        className="hover:text-[#FFC947] transition-colors"
                                        data-oid="obglx0:"
                                    >
                                        Tuyển dụng
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div data-oid="ehc38nx">
                            <h3 className="font-semibold mb-4" data-oid="xtvgw8j">
                                Hỗ trợ
                            </h3>
                            <ul className="space-y-2 text-gray-300" data-oid="xpzerrr">
                                <li data-oid="uyp1.q8">
                                    <a
                                        href="/help"
                                        className="hover:text-[#FFC947] transition-colors"
                                        data-oid="1uxi643"
                                    >
                                        Trung tâm trợ giúp
                                    </a>
                                </li>
                                <li data-oid="lihywhr">
                                    <a
                                        href="/terms"
                                        className="hover:text-[#FFC947] transition-colors"
                                        data-oid="qk.kt12"
                                    >
                                        Điều khoản
                                    </a>
                                </li>
                                <li data-oid="2snrzke">
                                    <a
                                        href="/privacy"
                                        className="hover:text-[#FFC947] transition-colors"
                                        data-oid="hedcnn."
                                    >
                                        Bảo mật
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div data-oid="t8uztns">
                            <h3 className="font-semibold mb-4" data-oid="4i2ezr1">
                                Theo dõi chúng tôi
                            </h3>
                            <div className="flex space-x-4" data-oid="h-b2p2.">
                                <a
                                    href="https://facebook.com/manabilink"
                                    className="text-gray-300 hover:text-[#FFC947] transition-colors"
                                    data-oid=":tsde8p"
                                    target="_blank" rel="noopener noreferrer"
                                >
                                    Facebook
                                </a>
                                <a
                                    href="https://instagram.com/manabilink"
                                    className="text-gray-300 hover:text-[#FFC947] transition-colors"
                                    data-oid="sgxl23k"
                                    target="_blank" rel="noopener noreferrer"
                                >
                                    Instagram
                                </a>
                                <a
                                    href="https://youtube.com/@manabilink"
                                    className="text-gray-300 hover:text-[#FFC947] transition-colors"
                                    data-oid="gcqh0_n"
                                    target="_blank" rel="noopener noreferrer"
                                >
                                    YouTube
                                </a>
                            </div>
                        </div>
                    </div>
                    <div
                        className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-300"
                        data-oid="f8smvwh"
                    >
                        <p data-oid="-_a3utd">
                            &copy; 2024 Manabi Link. Tất cả quyền được bảo lưu.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
