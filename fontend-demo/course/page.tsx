'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    Search,
    Filter,
    Grid,
    List,
    Star,
    Clock,
    Users,
    MapPin,
    ChevronDown,
    ChevronUp,
    Heart,
    BookOpen,
    Music,
    Palette,
    Code,
    Camera,
    Utensils,
    Globe,
    Target,
    TrendingUp,
} from 'lucide-react';

export default function CoursesPage() {
    const [selectedLanguage, setSelectedLanguage] = useState('vi');
    const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedLevel, setSelectedLevel] = useState('all');
    const [selectedPrice, setSelectedPrice] = useState('all');
    const [selectedLocation, setSelectedLocation] = useState('all');
    const [showFilters, setShowFilters] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState('popular');

    const languages = [
        { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
        { code: 'en', name: 'English', flag: '🇺🇸' },
        { code: 'ja', name: '日本語', flag: '🇯🇵' },
    ];

    const categories = [
        { id: 'all', name: 'Tất cả danh mục', icon: BookOpen },
        { id: 'music', name: 'Âm nhạc', icon: Music },
        { id: 'art', name: 'Nghệ thuật', icon: Palette },
        { id: 'tech', name: 'Công nghệ', icon: Code },
        { id: 'photography', name: 'Nhiếp ảnh', icon: Camera },
        { id: 'cooking', name: 'Nấu ăn', icon: Utensils },
        { id: 'language', name: 'Ngoại ngữ', icon: Globe },
        { id: 'business', name: 'Kinh doanh', icon: Target },
        { id: 'fitness', name: 'Thể thao', icon: TrendingUp },
    ];

    const levels = [
        { id: 'all', name: 'Tất cả cấp độ' },
        { id: 'beginner', name: 'Người mới bắt đầu' },
        { id: 'intermediate', name: 'Trung cấp' },
        { id: 'advanced', name: 'Nâng cao' },
    ];

    const priceRanges = [
        { id: 'all', name: 'Tất cả mức giá' },
        { id: 'free', name: 'Miễn phí' },
        { id: 'under-200k', name: 'Dưới 200k' },
        { id: '200k-500k', name: '200k - 500k' },
        { id: '500k-1m', name: '500k - 1 triệu' },
        { id: 'over-1m', name: 'Trên 1 triệu' },
    ];

    const locations = [
        { id: 'all', name: 'Tất cả địa điểm' },
        { id: 'online', name: 'Trực tuyến' },
        { id: 'hanoi', name: 'Hà Nội' },
        { id: 'hcm', name: 'TP.HCM' },
        { id: 'danang', name: 'Đà Nẵng' },
        { id: 'cantho', name: 'Cần Thơ' },
    ];

    const sortOptions = [
        { id: 'popular', name: 'Phổ biến nhất' },
        { id: 'newest', name: 'Mới nhất' },
        { id: 'rating', name: 'Đánh giá cao nhất' },
        { id: 'price-low', name: 'Giá thấp đến cao' },
        { id: 'price-high', name: 'Giá cao đến thấp' },
    ];

    // Mock data cho khóa học
    const allCourses = [
        {
            id: 1,
            title: 'Guitar cơ bản cho người mới bắt đầu',
            instructor: 'Nguyễn Văn An',
            rating: 4.8,
            reviews: 125,
            price: 300000,
            originalPrice: 400000,
            image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=225&fit=crop',
            category: 'music',
            level: 'beginner',
            location: 'online',
            duration: '8 tuần',
            students: 245,
            tags: ['Guitar', 'Nhạc lý', 'Thực hành'],
            description:
                'Khóa học guitar cơ bản dành cho người mới bắt đầu, từ nhạc lý đến thực hành.',
            isFeatured: true,
            isNew: false,
            discount: 25,
        },
        {
            id: 2,
            title: 'Tiếng Nhật giao tiếp hàng ngày',
            instructor: 'Tanaka Yuki',
            rating: 4.9,
            reviews: 89,
            price: 450000,
            originalPrice: 600000,
            image: 'https://images.unsplash.com/photo-1528164344705-47542687000d?w=400&h=225&fit=crop',
            category: 'language',
            level: 'beginner',
            location: 'online',
            duration: '12 tuần',
            students: 189,
            tags: ['Tiếng Nhật', 'Giao tiếp', 'Văn hóa'],
            description: 'Học tiếng Nhật giao tiếp cơ bản với giáo viên bản xứ.',
            isFeatured: true,
            isNew: true,
            discount: 25,
        },
        {
            id: 3,
            title: 'Nấu ăn Việt Nam truyền thống',
            instructor: 'Trần Thị Bình',
            rating: 4.7,
            reviews: 67,
            price: 250000,
            originalPrice: 350000,
            image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=225&fit=crop',
            category: 'cooking',
            level: 'intermediate',
            location: 'hcm',
            duration: '6 tuần',
            students: 156,
            tags: ['Nấu ăn', 'Việt Nam', 'Truyền thống'],
            description: 'Khám phá ẩm thực Việt Nam với các món ăn truyền thống.',
            isFeatured: false,
            isNew: false,
            discount: 29,
        },
        {
            id: 4,
            title: 'React.js từ cơ bản đến nâng cao',
            instructor: 'Lê Văn Cường',
            rating: 4.9,
            reviews: 234,
            price: 800000,
            originalPrice: 1000000,
            image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop',
            category: 'tech',
            level: 'intermediate',
            location: 'online',
            duration: '16 tuần',
            students: 567,
            tags: ['React', 'JavaScript', 'Frontend'],
            description: 'Khóa học React.js toàn diện từ cơ bản đến nâng cao.',
            isFeatured: true,
            isNew: false,
            discount: 20,
        },
        {
            id: 5,
            title: 'Nhiếp ảnh cơ bản',
            instructor: 'Phạm Thị Dung',
            rating: 4.6,
            reviews: 98,
            price: 350000,
            originalPrice: 450000,
            image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=225&fit=crop',
            category: 'photography',
            level: 'beginner',
            location: 'hanoi',
            duration: '10 tuần',
            students: 234,
            tags: ['Nhiếp ảnh', 'Composition', 'Lighting'],
            description: 'Học nhiếp ảnh cơ bản với các kỹ thuật chụp ảnh.',
            isFeatured: false,
            isNew: true,
            discount: 22,
        },
        {
            id: 6,
            title: 'Vẽ tranh kỹ thuật số',
            instructor: 'Hoàng Văn E',
            rating: 4.8,
            reviews: 145,
            price: 600000,
            originalPrice: 750000,
            image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=225&fit=crop',
            category: 'art',
            level: 'advanced',
            location: 'online',
            duration: '14 tuần',
            students: 189,
            tags: ['Digital Art', 'Photoshop', 'Illustration'],
            description: 'Khóa học vẽ tranh kỹ thuật số chuyên nghiệp.',
            isFeatured: true,
            isNew: false,
            discount: 20,
        },
        {
            id: 7,
            title: 'Yoga cho người mới bắt đầu',
            instructor: 'Nguyễn Thị F',
            rating: 4.7,
            reviews: 78,
            price: 200000,
            originalPrice: 300000,
            image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=225&fit=crop',
            category: 'fitness',
            level: 'beginner',
            location: 'online',
            duration: '8 tuần',
            students: 345,
            tags: ['Yoga', 'Thiền', 'Sức khỏe'],
            description: 'Khóa học yoga cơ bản cho người mới bắt đầu.',
            isFeatured: false,
            isNew: false,
            discount: 33,
        },
        {
            id: 8,
            title: 'Marketing số cho doanh nghiệp',
            instructor: 'Trần Văn G',
            rating: 4.9,
            reviews: 167,
            price: 900000,
            originalPrice: 1200000,
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=225&fit=crop',
            category: 'business',
            level: 'intermediate',
            location: 'hcm',
            duration: '12 tuần',
            students: 234,
            tags: ['Marketing', 'Digital', 'Business'],
            description: 'Chiến lược marketing số hiệu quả cho doanh nghiệp.',
            isFeatured: true,
            isNew: false,
            discount: 25,
        },
    ];

    // Filter courses based on selected criteria
    const filteredCourses = allCourses.filter((course) => {
        const matchesSearch =
            course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
        const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
        const matchesLocation = selectedLocation === 'all' || course.location === selectedLocation;

        let matchesPrice = true;
        if (selectedPrice === 'free') matchesPrice = course.price === 0;
        else if (selectedPrice === 'under-200k') matchesPrice = course.price < 200000;
        else if (selectedPrice === '200k-500k')
            matchesPrice = course.price >= 200000 && course.price <= 500000;
        else if (selectedPrice === '500k-1m')
            matchesPrice = course.price > 500000 && course.price <= 1000000;
        else if (selectedPrice === 'over-1m') matchesPrice = course.price > 1000000;

        return matchesSearch && matchesCategory && matchesLevel && matchesLocation && matchesPrice;
    });

    // Sort courses
    const sortedCourses = [...filteredCourses].sort((a, b) => {
        switch (sortBy) {
            case 'newest':
                return b.id - a.id;
            case 'rating':
                return b.rating - a.rating;
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            default: // popular
                return b.students - a.students;
        }
    });

    // Pagination
    const coursesPerPage = 8;
    const totalPages = Math.ceil(sortedCourses.length / coursesPerPage);
    const startIndex = (currentPage - 1) * coursesPerPage;
    const endIndex = startIndex + coursesPerPage;
    const currentCourses = sortedCourses.slice(startIndex, endIndex);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(price);
    };

    const getCategoryIcon = (categoryId: string) => {
        const category = categories.find((cat) => cat.id === categoryId);
        return category?.icon || BookOpen;
    };

    return (
        <div className="min-h-screen bg-[#F8F9FA] font-['Inter'] h-[2106px]" data-oid="d5e4m5j">
            {/* Navigation */}
            <nav className="bg-white shadow-sm border-b border-gray-100" data-oid="y.nylt.">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-oid="59w7rul">
                    <div className="flex justify-between items-center h-16" data-oid="3hmnw7a">
                        <div className="flex items-center" data-oid="ypfayi0">
                            <Link
                                href="/"
                                className="text-2xl font-bold text-[#2A7A8C]"
                                data-oid="7c0334-"
                            >
                                Manabi Link
                            </Link>
                        </div>

                        <div className="hidden md:flex items-center space-x-8" data-oid="d5bzwzo">
                            <Link
                                href="/"
                                className="text-[#343A40] hover:text-[#2A7A8C] transition-colors"
                                data-oid="_krf:3y"
                            >
                                Trang chủ
                            </Link>
                            <Link
                                href="/course"
                                className="text-[#2A7A8C] font-medium"
                                data-oid="xd29-gw"
                            >
                                Khóa học
                            </Link>
                            <Link
                                href="/teacher"
                                className="text-[#343A40] hover:text-[#2A7A8C] transition-colors"
                                data-oid="ifroo3i"
                            >
                                Giảng viên
                            </Link>
                            <Link
                                href="/about"
                                className="text-[#343A40] hover:text-[#2A7A8C] transition-colors"
                                data-oid="xd38mqy"
                            >
                                Về chúng tôi
                            </Link>
                        </div>

                        <div className="flex items-center space-x-4" data-oid="r:7tca5">
                            <button
                                className="p-2 text-[#343A40] hover:text-[#2A7A8C] transition-colors"
                                data-oid="gbobov4"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    data-oid="vbb67dk"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        data-oid=":ab4mvl"
                                    />
                                </svg>
                            </button>

                            {/* Language Selector */}
                            <div className="relative" data-oid="5b2zr.p">
                                <button
                                    onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                                    className="flex items-center space-x-2 px-3 py-2 text-[#343A40] hover:text-[#2A7A8C] transition-colors border border-[#CED4DA] rounded-lg hover:border-[#2A7A8C]"
                                    data-oid="8l9g6bn"
                                >
                                    <span className="text-lg" data-oid="6yryb8k">
                                        {
                                            languages.find((lang) => lang.code === selectedLanguage)
                                                ?.flag
                                        }
                                    </span>
                                    <span className="text-sm font-medium" data-oid="1g9i300">
                                        {languages
                                            .find((lang) => lang.code === selectedLanguage)
                                            ?.code.toUpperCase()}
                                    </span>
                                    <svg
                                        className={`w-4 h-4 transition-transform ${showLanguageDropdown ? 'rotate-180' : ''}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        data-oid="aa1uzwn"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                            data-oid="le-4q9."
                                        />
                                    </svg>
                                </button>

                                {showLanguageDropdown && (
                                    <div
                                        className="absolute right-0 mt-2 w-48 bg-white border border-[#CED4DA] rounded-lg shadow-lg z-50"
                                        data-oid="qj4rrae"
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
                                                data-oid="a950c5a"
                                            >
                                                <span className="text-lg" data-oid="8_a-8.6">
                                                    {language.flag}
                                                </span>
                                                <span
                                                    className="text-sm font-medium"
                                                    data-oid="ae.6oxl"
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
                                data-oid="f9ljakp"
                            >
                                Đăng nhập
                            </Link>
                            <Link
                                href="/register"
                                className="bg-[#2A7A8C] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#1A5A6C] transition-all duration-200"
                                data-oid="_hwbo_9"
                            >
                                Đăng ký
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="bg-white py-12" data-oid=":n2masr">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-oid="hvp1.k3">
                    <div className="text-center" data-oid="00c.l18">
                        <h1 className="text-4xl font-bold text-[#343A40] mb-4" data-oid="s5:z1lw">
                            Khám phá khóa học
                        </h1>
                        <p className="text-[#6C757D] max-w-2xl mx-auto" data-oid="9laniby">
                            Tìm kiếm và đăng ký các khóa học chất lượng cao từ các chuyên gia hàng
                            đầu
                        </p>
                    </div>
                </div>
            </section>

            {/* Search and Filter Section */}
            <section className="py-8" data-oid="hkavhel">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-oid="wyu8f0q">
                    <div className="bg-white rounded-xl shadow-sm p-6" data-oid="xnw-q0e">
                        {/* Search Bar */}
                        <div className="flex flex-col lg:flex-row gap-4 mb-6" data-oid="p7b-vp.">
                            <div className="flex-1 relative" data-oid="h7-ubap">
                                <Search
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#6C757D]"
                                    data-oid="35vl.8b"
                                />

                                <input
                                    type="text"
                                    placeholder="Tìm kiếm khóa học, giảng viên..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-[#E9ECEF] rounded-lg focus:border-[#2A7A8C] focus:ring-2 focus:ring-[#2A7A8C]/20 outline-none transition-all"
                                    data-oid="oqbkj4g"
                                />
                            </div>
                            <div className="flex gap-3" data-oid="m:62xzu">
                                <button
                                    onClick={() => setShowFilters(!showFilters)}
                                    className="flex items-center space-x-2 px-4 py-3 border border-[#E9ECEF] rounded-lg hover:border-[#2A7A8C] transition-colors"
                                    data-oid="2o3ekhn"
                                >
                                    <Filter className="w-4 h-4" data-oid="7v:52c:" />
                                    <span data-oid="_o-3fbh">Bộ lọc</span>
                                    {showFilters ? (
                                        <ChevronUp className="w-4 h-4" data-oid="e42aynn" />
                                    ) : (
                                        <ChevronDown className="w-4 h-4" data-oid="bht5bmv" />
                                    )}
                                </button>
                                <div
                                    className="flex border border-[#E9ECEF] rounded-lg overflow-hidden"
                                    data-oid="4_za74b"
                                >
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={`p-3 ${viewMode === 'grid' ? 'bg-[#2A7A8C] text-white' : 'bg-white text-[#6C757D] hover:text-[#2A7A8C]'}`}
                                        data-oid="zn5q_36"
                                    >
                                        <Grid className="w-4 h-4" data-oid="hv_p1m9" />
                                    </button>
                                    <button
                                        onClick={() => setViewMode('list')}
                                        className={`p-3 ${viewMode === 'list' ? 'bg-[#2A7A8C] text-white' : 'bg-white text-[#6C757D] hover:text-[#2A7A8C]'}`}
                                        data-oid="4hgs_aa"
                                    >
                                        <List className="w-4 h-4" data-oid="bhltk25" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Filters */}
                        {showFilters && (
                            <div
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 pt-6 border-t border-[#E9ECEF]"
                                data-oid="lu34ia1"
                            >
                                <div data-oid="_:h3s45">
                                    <label
                                        className="block text-sm font-medium text-[#343A40] mb-2"
                                        data-oid="jqrh.6i"
                                    >
                                        Danh mục
                                    </label>
                                    <select
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                        className="w-full px-3 py-2 border border-[#E9ECEF] rounded-lg focus:border-[#2A7A8C] outline-none"
                                        data-oid="2tss-d0"
                                    >
                                        {categories.map((category) => (
                                            <option
                                                key={category.id}
                                                value={category.id}
                                                data-oid="bj6_92c"
                                            >
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div data-oid="w42amrn">
                                    <label
                                        className="block text-sm font-medium text-[#343A40] mb-2"
                                        data-oid="5b.uwhr"
                                    >
                                        Cấp độ
                                    </label>
                                    <select
                                        value={selectedLevel}
                                        onChange={(e) => setSelectedLevel(e.target.value)}
                                        className="w-full px-3 py-2 border border-[#E9ECEF] rounded-lg focus:border-[#2A7A8C] outline-none"
                                        data-oid="yc0wh6h"
                                    >
                                        {levels.map((level) => (
                                            <option
                                                key={level.id}
                                                value={level.id}
                                                data-oid="h:25v2-"
                                            >
                                                {level.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div data-oid="s2a.:_m">
                                    <label
                                        className="block text-sm font-medium text-[#343A40] mb-2"
                                        data-oid="wv6vacn"
                                    >
                                        Mức giá
                                    </label>
                                    <select
                                        value={selectedPrice}
                                        onChange={(e) => setSelectedPrice(e.target.value)}
                                        className="w-full px-3 py-2 border border-[#E9ECEF] rounded-lg focus:border-[#2A7A8C] outline-none"
                                        data-oid="307bbi:"
                                    >
                                        {priceRanges.map((price) => (
                                            <option
                                                key={price.id}
                                                value={price.id}
                                                data-oid="p4jd40-"
                                            >
                                                {price.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div data-oid="nhj4a:q">
                                    <label
                                        className="block text-sm font-medium text-[#343A40] mb-2"
                                        data-oid="0kppepw"
                                    >
                                        Địa điểm
                                    </label>
                                    <select
                                        value={selectedLocation}
                                        onChange={(e) => setSelectedLocation(e.target.value)}
                                        className="w-full px-3 py-2 border border-[#E9ECEF] rounded-lg focus:border-[#2A7A8C] outline-none"
                                        data-oid="lycng7o"
                                    >
                                        {locations.map((location) => (
                                            <option
                                                key={location.id}
                                                value={location.id}
                                                data-oid="e_ubrlu"
                                            >
                                                {location.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div data-oid="ue7y3-z">
                                    <label
                                        className="block text-sm font-medium text-[#343A40] mb-2"
                                        data-oid="cm7r5bw"
                                    >
                                        Sắp xếp
                                    </label>
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="w-full px-3 py-2 border border-[#E9ECEF] rounded-lg focus:border-[#2A7A8C] outline-none"
                                        data-oid="ae0gsaz"
                                    >
                                        {sortOptions.map((option) => (
                                            <option
                                                key={option.id}
                                                value={option.id}
                                                data-oid="c4bum17"
                                            >
                                                {option.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Results Section */}
            <section className="py-8" data-oid="4n3913m">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-oid="nvm3dl.">
                    {/* Results Info */}
                    <div className="flex justify-between items-center mb-6" data-oid="7e7_pwg">
                        <p className="text-[#6C757D]" data-oid="ulr5:-7">
                            Hiển thị {currentCourses.length} trong tổng số {sortedCourses.length}{' '}
                            khóa học
                        </p>
                    </div>

                    {/* Courses Grid/List */}
                    {viewMode === 'grid' ? (
                        <div
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                            data-oid="v6dvilp"
                        >
                            {currentCourses.map((course) => (
                                <div
                                    key={course.id}
                                    className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
                                    data-oid="3:x38w1"
                                >
                                    <div className="relative" data-oid="u2xao_c">
                                        <img
                                            src={course.image}
                                            alt={course.title}
                                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                            data-oid="4s27s3y"
                                        />

                                        {course.isFeatured && (
                                            <div
                                                className="absolute top-3 left-3 bg-[#FFC947] text-[#343A40] px-2 py-1 rounded-full text-xs font-medium"
                                                data-oid="sd7z560"
                                            >
                                                Nổi bật
                                            </div>
                                        )}
                                        {course.isNew && (
                                            <div
                                                className="absolute top-3 right-3 bg-[#28A745] text-white px-2 py-1 rounded-full text-xs font-medium"
                                                data-oid="ok5_bw0"
                                            >
                                                Mới
                                            </div>
                                        )}
                                        {course.discount > 0 && (
                                            <div
                                                className="absolute top-3 right-3 bg-[#DC3545] text-white px-2 py-1 rounded-full text-xs font-medium"
                                                data-oid="mysnvt-"
                                            >
                                                -{course.discount}%
                                            </div>
                                        )}
                                        <button
                                            className="absolute top-3 right-3 bg-white/80 hover:bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                            data-oid="-x6q3x3"
                                        >
                                            <Heart
                                                className="w-4 h-4 text-[#6C757D]"
                                                data-oid="6.ui0p7"
                                            />
                                        </button>
                                    </div>
                                    <div className="p-4" data-oid="wo1l:kz">
                                        <div className="flex items-center mb-2" data-oid="jaq3eek">
                                            {(() => {
                                                const IconComponent = getCategoryIcon(
                                                    course.category,
                                                );
                                                return (
                                                    <IconComponent
                                                        className="w-4 h-4 text-[#2A7A8C] mr-2"
                                                        data-oid="53tmf8z"
                                                    />
                                                );
                                            })()}

                                            <span
                                                className="text-xs text-[#6C757D]"
                                                data-oid="0e-liwp"
                                            >
                                                {
                                                    categories.find(
                                                        (cat) => cat.id === course.category,
                                                    )?.name
                                                }
                                            </span>
                                        </div>
                                        <h3
                                            className="font-semibold text-[#343A40] mb-2 line-clamp-2 group-hover:text-[#2A7A8C] transition-colors"
                                            data-oid="9u2bysf"
                                        >
                                            {course.title}
                                        </h3>
                                        <p
                                            className="text-sm text-[#6C757D] mb-3 line-clamp-2"
                                            data-oid="iywt85v"
                                        >
                                            {course.description}
                                        </p>
                                        <div className="flex items-center mb-3" data-oid="cf29lu8">
                                            <div
                                                className="w-6 h-6 bg-[#2A7A8C] rounded-full flex items-center justify-center text-white text-xs font-medium mr-2"
                                                data-oid="5s4iqfy"
                                            >
                                                {course.instructor.charAt(0)}
                                            </div>
                                            <span
                                                className="text-sm text-[#343A40]"
                                                data-oid=".49m5fq"
                                            >
                                                {course.instructor}
                                            </span>
                                        </div>
                                        <div
                                            className="flex items-center justify-between mb-3"
                                            data-oid="qmt4tmz"
                                        >
                                            <div className="flex items-center" data-oid="8f3qgza">
                                                <Star
                                                    className="w-4 h-4 text-yellow-400 fill-current"
                                                    data-oid="mm.nzuq"
                                                />

                                                <span
                                                    className="text-sm text-[#6C757D] ml-1"
                                                    data-oid="hh_r0tf"
                                                >
                                                    {course.rating}
                                                </span>
                                                <span
                                                    className="text-sm text-[#6C757D] ml-1"
                                                    data-oid="zot:c_b"
                                                >
                                                    ({course.reviews})
                                                </span>
                                            </div>
                                            <div
                                                className="flex items-center text-sm text-[#6C757D]"
                                                data-oid=":m9fdtk"
                                            >
                                                <Users
                                                    className="w-4 h-4 mr-1"
                                                    data-oid="bfucsgf"
                                                />

                                                {course.students}
                                            </div>
                                        </div>
                                        <div
                                            className="flex items-center justify-between mb-4"
                                            data-oid="yl0_sy0"
                                        >
                                            <div
                                                className="flex items-center text-sm text-[#6C757D]"
                                                data-oid="3946lnq"
                                            >
                                                <Clock
                                                    className="w-4 h-4 mr-1"
                                                    data-oid="-s9h2e8"
                                                />

                                                {course.duration}
                                            </div>
                                            <div
                                                className="flex items-center text-sm text-[#6C757D]"
                                                data-oid="cbjr9pp"
                                            >
                                                <MapPin
                                                    className="w-4 h-4 mr-1"
                                                    data-oid="qiwyjal"
                                                />

                                                {
                                                    locations.find(
                                                        (loc) => loc.id === course.location,
                                                    )?.name
                                                }
                                            </div>
                                        </div>
                                        <div
                                            className="flex items-center justify-between"
                                            data-oid="0x98ydb"
                                        >
                                            <div data-oid="bilb7r8">
                                                {course.discount > 0 && (
                                                    <span
                                                        className="text-sm text-[#6C757D] line-through mr-2"
                                                        data-oid="tne1mz:"
                                                    >
                                                        {formatPrice(course.originalPrice)}
                                                    </span>
                                                )}
                                                <span
                                                    className="text-lg font-semibold text-[#2A7A8C]"
                                                    data-oid="3.70izm"
                                                >
                                                    {formatPrice(course.price)}
                                                </span>
                                            </div>
                                            <Link
                                                href={`/course/${course.id}`}
                                                className="bg-[#FFC947] text-[#343A40] px-4 py-2 rounded-lg font-medium hover:shadow-md transition-all duration-200"
                                                data-oid="ularn3c"
                                            >
                                                Xem chi tiết
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-4" data-oid="r6ag0jt">
                            {currentCourses.map((course) => (
                                <div
                                    key={course.id}
                                    className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-6"
                                    data-oid="4fmpxq2"
                                >
                                    <div className="flex gap-6" data-oid="w-b7lv7">
                                        <div className="relative flex-shrink-0" data-oid="vmrsxlo">
                                            <img
                                                src={course.image}
                                                alt={course.title}
                                                className="w-48 h-32 object-cover rounded-lg"
                                                data-oid="gnv:oo2"
                                            />

                                            {course.isFeatured && (
                                                <div
                                                    className="absolute top-2 left-2 bg-[#FFC947] text-[#343A40] px-2 py-1 rounded-full text-xs font-medium"
                                                    data-oid="p6pqc4y"
                                                >
                                                    Nổi bật
                                                </div>
                                            )}
                                            {course.isNew && (
                                                <div
                                                    className="absolute top-2 right-2 bg-[#28A745] text-white px-2 py-1 rounded-full text-xs font-medium"
                                                    data-oid="ndass6-"
                                                >
                                                    Mới
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1" data-oid="fz1uez_">
                                            <div
                                                className="flex items-center mb-2"
                                                data-oid="pvsas9:"
                                            >
                                                {(() => {
                                                    const IconComponent = getCategoryIcon(
                                                        course.category,
                                                    );
                                                    return (
                                                        <IconComponent
                                                            className="w-4 h-4 text-[#2A7A8C] mr-2"
                                                            data-oid="s0wdhvy"
                                                        />
                                                    );
                                                })()}

                                                <span
                                                    className="text-sm text-[#6C757D]"
                                                    data-oid="pq1k_u:"
                                                >
                                                    {
                                                        categories.find(
                                                            (cat) => cat.id === course.category,
                                                        )?.name
                                                    }
                                                </span>
                                            </div>
                                            <h3
                                                className="text-xl font-semibold text-[#343A40] mb-2 hover:text-[#2A7A8C] transition-colors"
                                                data-oid=".ukzk3g"
                                            >
                                                {course.title}
                                            </h3>
                                            <p className="text-[#6C757D] mb-3" data-oid="ywpet_p">
                                                {course.description}
                                            </p>
                                            <div
                                                className="flex items-center mb-3"
                                                data-oid="dy6eemo"
                                            >
                                                <div
                                                    className="w-8 h-8 bg-[#2A7A8C] rounded-full flex items-center justify-center text-white text-sm font-medium mr-3"
                                                    data-oid="pxe7zjv"
                                                >
                                                    {course.instructor.charAt(0)}
                                                </div>
                                                <span className="text-[#343A40]" data-oid="h-3q14c">
                                                    {course.instructor}
                                                </span>
                                            </div>
                                            <div
                                                className="flex items-center gap-6 mb-4"
                                                data-oid="-yoyvbe"
                                            >
                                                <div
                                                    className="flex items-center"
                                                    data-oid="j1zw9ye"
                                                >
                                                    <Star
                                                        className="w-4 h-4 text-yellow-400 fill-current"
                                                        data-oid="8xq9ee4"
                                                    />

                                                    <span
                                                        className="text-sm text-[#6C757D] ml-1"
                                                        data-oid="w7.cn28"
                                                    >
                                                        {course.rating}
                                                    </span>
                                                    <span
                                                        className="text-sm text-[#6C757D] ml-1"
                                                        data-oid="tql..dg"
                                                    >
                                                        ({course.reviews})
                                                    </span>
                                                </div>
                                                <div
                                                    className="flex items-center text-sm text-[#6C757D]"
                                                    data-oid="edxq8vx"
                                                >
                                                    <Users
                                                        className="w-4 h-4 mr-1"
                                                        data-oid="zs480pf"
                                                    />
                                                    {course.students} học viên
                                                </div>
                                                <div
                                                    className="flex items-center text-sm text-[#6C757D]"
                                                    data-oid="k1d0caf"
                                                >
                                                    <Clock
                                                        className="w-4 h-4 mr-1"
                                                        data-oid="uz1jyl2"
                                                    />

                                                    {course.duration}
                                                </div>
                                                <div
                                                    className="flex items-center text-sm text-[#6C757D]"
                                                    data-oid="f3y6rn_"
                                                >
                                                    <MapPin
                                                        className="w-4 h-4 mr-1"
                                                        data-oid="tc1p9pb"
                                                    />

                                                    {
                                                        locations.find(
                                                            (loc) => loc.id === course.location,
                                                        )?.name
                                                    }
                                                </div>
                                            </div>
                                            <div
                                                className="flex items-center justify-between"
                                                data-oid=":dmapzf"
                                            >
                                                <div data-oid=":kjedvm">
                                                    {course.discount > 0 && (
                                                        <span
                                                            className="text-sm text-[#6C757D] line-through mr-2"
                                                            data-oid="r999k95"
                                                        >
                                                            {formatPrice(course.originalPrice)}
                                                        </span>
                                                    )}
                                                    <span
                                                        className="text-xl font-semibold text-[#2A7A8C]"
                                                        data-oid="w247l2w"
                                                    >
                                                        {formatPrice(course.price)}
                                                    </span>
                                                </div>
                                                <Link
                                                    href={`/course/${course.id}`}
                                                    className="bg-[#FFC947] text-[#343A40] px-6 py-2 rounded-lg font-medium hover:shadow-md transition-all duration-200"
                                                    data-oid="yx1yzgx"
                                                >
                                                    Xem chi tiết
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center mt-8" data-oid="bqs8.g1">
                            <div className="flex items-center space-x-2" data-oid="0d4rnpn">
                                <button
                                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                    disabled={currentPage === 1}
                                    className="px-3 py-2 border border-[#E9ECEF] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:border-[#2A7A8C] transition-colors"
                                    data-oid="i:byc:o"
                                >
                                    Trước
                                </button>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`px-3 py-2 rounded-lg transition-colors ${
                                            currentPage === page
                                                ? 'bg-[#2A7A8C] text-white'
                                                : 'border border-[#E9ECEF] hover:border-[#2A7A8C]'
                                        }`}
                                        data-oid="ag7jnf7"
                                    >
                                        {page}
                                    </button>
                                ))}
                                <button
                                    onClick={() =>
                                        setCurrentPage(Math.min(totalPages, currentPage + 1))
                                    }
                                    disabled={currentPage === totalPages}
                                    className="px-3 py-2 border border-[#E9ECEF] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:border-[#2A7A8C] transition-colors"
                                    data-oid="12otwpq"
                                >
                                    Sau
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#343A40] text-white py-12 mt-16" data-oid="me09y4f">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-oid="8-60:18">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8" data-oid="pmt0yt9">
                        <div data-oid="lnlpk7m">
                            <div
                                className="text-2xl font-bold text-[#FFC947] mb-4"
                                data-oid="lcvi014"
                            >
                                Manabi Link
                            </div>
                            <p className="text-gray-300" data-oid="m8k7_9_">
                                Kết nối tri thức, chia sẻ kỹ năng cùng cộng đồng học tập Việt Nam.
                            </p>
                        </div>
                        <div data-oid="4aszt4d">
                            <h3 className="font-semibold mb-4" data-oid="ry1hkvx">
                                Về chúng tôi
                            </h3>
                            <ul className="space-y-2 text-gray-300" data-oid="1lu_q1:">
                                <li data-oid="gg-2d2l">
                                    <a
                                        href="#"
                                        className="hover:text-[#FFC947] transition-colors"
                                        data-oid="7zhm:u6"
                                    >
                                        Giới thiệu
                                    </a>
                                </li>
                                <li data-oid="78z9bro">
                                    <a
                                        href="#"
                                        className="hover:text-[#FFC947] transition-colors"
                                        data-oid=".4m4yay"
                                    >
                                        Liên hệ
                                    </a>
                                </li>
                                <li data-oid="d7-2m7e">
                                    <a
                                        href="#"
                                        className="hover:text-[#FFC947] transition-colors"
                                        data-oid="lxp2..1"
                                    >
                                        Tuyển dụng
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div data-oid="9vtx-eq">
                            <h3 className="font-semibold mb-4" data-oid="7:kgca.">
                                Hỗ trợ
                            </h3>
                            <ul className="space-y-2 text-gray-300" data-oid="szof8s8">
                                <li data-oid="94jc-00">
                                    <a
                                        href="#"
                                        className="hover:text-[#FFC947] transition-colors"
                                        data-oid="6ok4a9n"
                                    >
                                        Trung tâm trợ giúp
                                    </a>
                                </li>
                                <li data-oid="2x75pd1">
                                    <a
                                        href="#"
                                        className="hover:text-[#FFC947] transition-colors"
                                        data-oid="vd.6tbv"
                                    >
                                        Điều khoản
                                    </a>
                                </li>
                                <li data-oid="k6gf2qt">
                                    <a
                                        href="#"
                                        className="hover:text-[#FFC947] transition-colors"
                                        data-oid="0-eckzm"
                                    >
                                        Bảo mật
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div data-oid="4g8ln5a">
                            <h3 className="font-semibold mb-4" data-oid="cmyz5te">
                                Theo dõi chúng tôi
                            </h3>
                            <div className="flex space-x-4" data-oid=".kg0n:3">
                                <a
                                    href="#"
                                    className="text-gray-300 hover:text-[#FFC947] transition-colors"
                                    data-oid="0.382i0"
                                >
                                    Facebook
                                </a>
                                <a
                                    href="#"
                                    className="text-gray-300 hover:text-[#FFC947] transition-colors"
                                    data-oid=":np312r"
                                >
                                    Instagram
                                </a>
                                <a
                                    href="#"
                                    className="text-gray-300 hover:text-[#FFC947] transition-colors"
                                    data-oid="z5l9tl8"
                                >
                                    YouTube
                                </a>
                            </div>
                        </div>
                    </div>
                    <div
                        className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-300"
                        data-oid="fx4h4zc"
                    >
                        <p data-oid="i5u4:1w">
                            &copy; 2024 Manabi Link. Tất cả quyền được bảo lưu.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
