'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Instructor {
    id: number;
    name: string;
    title: string;
    avatar: string;
    coverImage: string;
    rating: number;
    students: string;
    skills: string[];
    verified: boolean;
}

interface InstructorCardProps {
    instructor: Instructor;
}

export default function Page() {
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    const [selectedRating, setSelectedRating] = useState('');
    const [verifiedOnly, setVerifiedOnly] = useState(false);
    const [sortBy, setSortBy] = useState('featured');
    const [searchQuery, setSearchQuery] = useState('');
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('vi');
    const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

    const languages = [
        { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
        { code: 'en', name: 'English', flag: '🇺🇸' },
        { code: 'ja', name: '日本語', flag: '🇯🇵' },
    ];

    const skills = [
        { name: 'Guitar', count: 15 },
        { name: 'Tiếng Nhật', count: 22 },
        { name: 'Marketing Digital', count: 8 },
        { name: 'Piano', count: 12 },
        { name: 'Tiếng Anh', count: 18 },
        { name: 'Yoga', count: 7 },
    ];

    const instructors = [
        {
            id: 1,
            name: 'Nguyễn Minh Anh',
            title: 'Chuyên gia Guitar & Sáng tác',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
            coverImage:
                'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=200&fit=crop',
            rating: 4.85,
            students: '1.2K',
            skills: ['Guitar', 'Sáng tác'],
            verified: true,
        },
        {
            id: 2,
            name: 'Trần Thị Lan',
            title: 'Giảng viên Tiếng Nhật N1',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
            coverImage:
                'https://images.unsplash.com/photo-1528164344705-47542687000d?w=400&h=200&fit=crop',
            rating: 4.92,
            students: '856',
            skills: ['Tiếng Nhật', 'JLPT'],
            verified: true,
        },
        {
            id: 3,
            name: 'Lê Văn Hùng',
            title: 'Digital Marketing Specialist',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
            coverImage:
                'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop',
            rating: 4.78,
            students: '643',
            skills: ['Marketing Digital', 'SEO'],
            verified: false,
        },
        {
            id: 4,
            name: 'Phạm Thu Hà',
            title: 'Piano Teacher & Composer',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
            coverImage:
                'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=400&h=200&fit=crop',
            rating: 4.89,
            students: '924',
            skills: ['Piano', 'Sáng tác'],
            verified: true,
        },
        {
            id: 5,
            name: 'Hoàng Minh Tuấn',
            title: 'English Communication Expert',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
            coverImage:
                'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=200&fit=crop',
            rating: 4.76,
            students: '1.5K',
            skills: ['Tiếng Anh', 'IELTS'],
            verified: true,
        },
        {
            id: 6,
            name: 'Vũ Thị Mai',
            title: 'Yoga & Meditation Instructor',
            avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
            coverImage:
                'https://images.unsplash.com/photo-1506629905607-d5b94b6e4f6b?w=400&h=200&fit=crop',
            rating: 4.94,
            students: '387',
            skills: ['Yoga', 'Meditation'],
            verified: true,
        },
    ];

    const handleSkillToggle = (skill: string) => {
        setSelectedSkills((prev) =>
            prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill],
        );
    };

    const clearFilters = () => {
        setSelectedSkills([]);
        setSelectedRating('');
        setVerifiedOnly(false);
    };

    const FilterPanel = () => (
        <div className="bg-white p-6 rounded-lg border border-gray-200 h-fit" data-oid="hej-l4v">
            <h3 className="text-lg font-semibold mb-4" data-oid=".2d.wi4">
                Bộ lọc
            </h3>

            {/* Skills Filter */}
            <div className="mb-6" data-oid="w2w80bj">
                <h4 className="font-medium mb-3" data-oid="k-58fcw">
                    Chuyên môn/Kỹ năng
                </h4>
                <div className="space-y-2" data-oid="6p7ptv-">
                    {skills.map((skill) => (
                        <label
                            key={skill.name}
                            className="flex items-center cursor-pointer"
                            data-oid="j2rfmk5"
                        >
                            <input
                                type="checkbox"
                                checked={selectedSkills.includes(skill.name)}
                                onChange={() => handleSkillToggle(skill.name)}
                                className="mr-3 w-4 h-4 text-yellow-500 rounded focus:ring-yellow-500"
                                data-oid=":774fm8"
                            />

                            <span className="text-sm" data-oid="2e9tnkk">
                                {skill.name} ({skill.count})
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Rating Filter */}
            <div className="mb-6" data-oid="_9a2xdi">
                <h4 className="font-medium mb-3" data-oid="hzxqcgd">
                    Đánh giá
                </h4>
                <div className="space-y-2" data-oid="mq_571y">
                    {['4.5', '4.0', '3.0'].map((rating) => (
                        <label
                            key={rating}
                            className="flex items-center cursor-pointer"
                            data-oid=".bqh-8x"
                        >
                            <input
                                type="radio"
                                name="rating"
                                value={rating}
                                checked={selectedRating === rating}
                                onChange={(e) => setSelectedRating(e.target.value)}
                                className="mr-3 w-4 h-4 text-yellow-500 focus:ring-yellow-500"
                                data-oid="4q-zgsz"
                            />

                            <span className="text-sm flex items-center" data-oid="di7v_h5">
                                ⭐ {rating} trở lên
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Verified Filter */}
            <div className="mb-6" data-oid="yyf3s97">
                <h4 className="font-medium mb-3" data-oid="7174mk.">
                    Trạng thái
                </h4>
                <label className="flex items-center cursor-pointer" data-oid="eh0j3vw">
                    <input
                        type="checkbox"
                        checked={verifiedOnly}
                        onChange={(e) => setVerifiedOnly(e.target.checked)}
                        className="mr-3 w-4 h-4 text-yellow-500 rounded focus:ring-yellow-500"
                        data-oid="if_fezp"
                    />

                    <span className="text-sm flex items-center" data-oid="7367k3t">
                        🛡️ Chỉ hiển thị giảng viên đã xác minh
                    </span>
                </label>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2" data-oid="nnb52hv">
                <button
                    className="w-full bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition-colors"
                    data-oid="f3rtjq1"
                >
                    Áp dụng bộ lọc
                </button>
                <button
                    onClick={clearFilters}
                    className="w-full text-gray-600 hover:text-gray-800 transition-colors text-sm"
                    data-oid="a_2:x6n"
                >
                    Xóa bộ lọc
                </button>
            </div>
        </div>
    );

    const InstructorCard = ({ instructor }: InstructorCardProps) => (
        <div
            className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
            data-oid="u4gdl7c"
        >
            {/* Cover Image */}
            <div className="relative h-32" data-oid="5benlfj">
                <img
                    src={instructor.coverImage}
                    alt="Cover"
                    className="w-full h-full object-cover"
                    data-oid="k7_lwx7"
                />

                {/* Avatar */}
                <div
                    className="absolute -bottom-8 left-1/2 transform -translate-x-1/2"
                    data-oid="y0w-0bi"
                >
                    <img
                        src={instructor.avatar}
                        alt={instructor.name}
                        className="w-16 h-16 rounded-full border-4 border-white object-cover"
                        data-oid="g9jupy9"
                    />
                </div>
            </div>

            {/* Content */}
            <div className="pt-10 p-6" data-oid="_25dica">
                <div className="text-center mb-4" data-oid="lcdq2p1">
                    <h3
                        className="text-lg font-semibold flex items-center justify-center gap-2"
                        data-oid="qzfvwin"
                    >
                        {instructor.name}
                        {instructor.verified && (
                            <span className="text-blue-500" data-oid="izhr-a7">
                                🛡️
                            </span>
                        )}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1" data-oid="3:nd_03">
                        {instructor.title}
                    </p>
                </div>

                {/* Stats */}
                <div
                    className="flex justify-center items-center gap-4 mb-4 text-sm"
                    data-oid=".qljol0"
                >
                    <span className="flex items-center gap-1" data-oid="uisz:z8">
                        ⭐ {instructor.rating}
                    </span>
                    <span className="flex items-center gap-1" data-oid="o-201n5">
                        👥 {instructor.students} Học viên
                    </span>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap justify-center gap-2 mb-4" data-oid="7q32bdn">
                    {instructor.skills.map((skill) => (
                        <span
                            key={skill}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                            data-oid="wgqmd11"
                        >
                            {skill}
                        </span>
                    ))}
                </div>

                {/* Action Button */}
                <button
                    className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                    data-oid="swtr4ul"
                >
                    Xem hồ sơ
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#F8F9FA] font-['Inter']" data-oid="i182d59">
            {/* Header */}
            <nav className="bg-white shadow-sm border-b border-gray-100" data-oid="cj-:gfn">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-oid="-_:yybu">
                    <div className="flex justify-between items-center h-16" data-oid="bbxc4o.">
                        <div className="flex items-center" data-oid=".9ku4hg">
                            <div className="text-2xl font-bold text-[#2A7A8C]" data-oid="4cvvrap">
                                Manabi Link
                            </div>
                        </div>

                        <div className="hidden md:flex items-center space-x-8" data-oid="n11h3dj">
                            <a
                                href="#"
                                className="text-[#343A40] hover:text-[#2A7A8C] transition-colors"
                                data-oid="fl-rwss"
                            >
                                Trang chủ
                            </a>
                            <a
                                href="#"
                                className="text-[#343A40] hover:text-[#2A7A8C] transition-colors"
                                data-oid="jejoien"
                            >
                                Khóa học
                            </a>
                            <a
                                href="#"
                                className="text-[#343A40] hover:text-[#2A7A8C] transition-colors"
                                data-oid="azwa.k_"
                            >
                                Giảng viên
                            </a>
                            <a
                                href="#"
                                className="text-[#343A40] hover:text-[#2A7A8C] transition-colors"
                                data-oid="g-gl49l"
                            >
                                Về chúng tôi
                            </a>
                        </div>

                        <div className="flex items-center space-x-4" data-oid="ts_:_5j">
                            <button
                                className="p-2 text-[#343A40] hover:text-[#2A7A8C] transition-colors"
                                data-oid="l4_pey:"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    data-oid="p342-gu"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        data-oid="i:.h9:6"
                                    />
                                </svg>
                            </button>

                            {/* Language Selector */}

                            <div className="relative" data-oid="lg:vj79">
                                <button
                                    onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                                    className="flex items-center space-x-2 px-3 py-2 text-[#343A40] hover:text-[#2A7A8C] transition-colors border border-[#CED4DA] rounded-lg hover:border-[#2A7A8C]"
                                    data-oid="i-swos-"
                                >
                                    <span className="text-lg" data-oid="73:c7x:">
                                        {
                                            languages.find((lang) => lang.code === selectedLanguage)
                                                ?.flag
                                        }
                                    </span>
                                    <span className="text-sm font-medium" data-oid="3fei4dl">
                                        {languages
                                            .find((lang) => lang.code === selectedLanguage)
                                            ?.code.toUpperCase()}
                                    </span>
                                    <svg
                                        className={`w-4 h-4 transition-transform ${showLanguageDropdown ? 'rotate-180' : ''}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        data-oid="9jqd4id"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                            data-oid="m3rpjnm"
                                        />
                                    </svg>
                                </button>

                                {showLanguageDropdown && (
                                    <div
                                        className="absolute right-0 mt-2 w-48 bg-white border border-[#CED4DA] rounded-lg shadow-lg z-50"
                                        data-oid="d4we2.:"
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
                                                data-oid=".6dbdgk"
                                            >
                                                <span className="text-lg" data-oid="el9mfoe">
                                                    {language.flag}
                                                </span>
                                                <span
                                                    className="text-sm font-medium"
                                                    data-oid="e6z97to"
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
                                data-oid="bq1n.mx"
                            >
                                Đăng nhập
                            </button>
                            <button
                                className="bg-[#2A7A8C] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#1A5A6C] transition-all duration-200"
                                data-oid="rll9io6"
                            >
                                Đăng ký
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-8" data-oid="nw5jdig">
                <div className="flex flex-col lg:flex-row gap-8" data-oid="fdmtw6p">
                    {/* Desktop Filter Panel */}
                    <div className="hidden lg:block lg:w-1/4" data-oid="dk:wqw.">
                        <div className="sticky top-8" data-oid="8fwcora">
                            <FilterPanel data-oid="_uttup2" />
                        </div>
                    </div>

                    {/* Results Area */}
                    <div className="flex-1" data-oid="plg7c80">
                        {/* Mobile Filter Button */}
                        <div className="lg:hidden mb-4" data-oid="e.y4xw0">
                            <button
                                onClick={() => setShowMobileFilters(true)}
                                className="bg-white border border-gray-300 px-4 py-2 rounded-lg flex items-center gap-2"
                                data-oid="fukt6ya"
                            >
                                🔧 Lọc
                            </button>
                        </div>

                        {/* Sort Bar */}
                        <div
                            className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg border border-gray-200"
                            data-oid="iyrxpg5"
                        >
                            <span className="text-sm text-gray-600" data-oid="x15993z">
                                Hiển thị {instructors.length} trên tổng số 150 giảng viên
                            </span>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="border border-gray-300 rounded px-3 py-1 text-sm"
                                data-oid="ejm.ht1"
                            >
                                <option value="featured" data-oid="s5by487">
                                    Nổi bật
                                </option>
                                <option value="rating" data-oid="e9v7psb">
                                    Đánh giá cao nhất
                                </option>
                                <option value="students" data-oid=":93i:2x">
                                    Nhiều học viên nhất
                                </option>
                                <option value="newest" data-oid="u-wwyiy">
                                    Mới tham gia
                                </option>
                            </select>
                        </div>

                        {/* Instructor Grid */}
                        <div
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
                            data-oid="6ykd1wv"
                        >
                            {instructors.map((instructor) => (
                                <InstructorCard
                                    key={instructor.id}
                                    instructor={instructor}
                                    data-oid="--m_zpd"
                                />
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="flex justify-center" data-oid="1vl4qm6">
                            <div className="flex items-center gap-2" data-oid=":jl1h_b">
                                <button
                                    className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-50"
                                    data-oid="lknrz1c"
                                >
                                    ← Trước
                                </button>
                                <button
                                    className="px-3 py-2 bg-yellow-500 text-white rounded"
                                    data-oid="tqzg-sf"
                                >
                                    1
                                </button>
                                <button
                                    className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-50"
                                    data-oid="ss5y4bs"
                                >
                                    2
                                </button>
                                <button
                                    className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-50"
                                    data-oid="5fz:tms"
                                >
                                    3
                                </button>
                                <button
                                    className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-50"
                                    data-oid="z2ghkjr"
                                >
                                    Sau →
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Filter Modal */}
            {showMobileFilters && (
                <div className="fixed inset-0 bg-black bg-opacity-50 lg:hidden" data-oid="_9.epeo">
                    <div
                        className="fixed bottom-0 left-0 right-0 bg-white rounded-t-xl p-6 max-h-[80vh] overflow-y-auto"
                        data-oid="v5poudn"
                    >
                        <div className="flex justify-between items-center mb-4" data-oid="cw:jrsw">
                            <h3 className="text-lg font-semibold" data-oid="1m2xiq-">
                                Bộ lọc
                            </h3>
                            <button
                                onClick={() => setShowMobileFilters(false)}
                                className="text-gray-500 hover:text-gray-700"
                                data-oid="c87ivcs"
                            >
                                ✕
                            </button>
                        </div>
                        <FilterPanel data-oid="afjrdw1" />
                    </div>
                </div>
            )}
        </div>
    );
}
