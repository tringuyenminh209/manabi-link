'use client';

import { useState } from 'react';
import { Music, Languages, UtensilsCrossed, Dumbbell, Palette, Laptop, BookOpen, Calendar, Star, TrendingUp, Clock, Award, Target, Users, LayoutDashboard, Settings } from 'lucide-react';
import { lessonsAPI } from '@/api/lessons';
import { useFetch } from '@/hooks/useFetch';
import { useAuth } from '@/hooks/useAuth';
import { t, getCurrentLocale, setLocale, SUPPORTED_LOCALES } from '@/lib/i18n';
import { Link } from 'react-router-dom';

export default function HomeAuthenticated() {
    const { user, isAuthenticated } = useAuth();
    const [selectedLanguage, setSelectedLanguage] = useState(getCurrentLocale());
    const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

    // Fetch featured lessons
    const { data: featuredLessons, loading: lessonsLoading, error: lessonsError } = useFetch(
        () => lessonsAPI.getFeaturedLessons(),
        []
    );

    // Handle language change
    const handleLanguageChange = (locale: keyof typeof SUPPORTED_LOCALES) => {
        setSelectedLanguage(locale);
        setLocale(locale);
        setShowLanguageDropdown(false);
    };

    // Fallback data nếu API chưa sẵn sàng
    const fallbackLessons = [
        {
            id: 1,
            title: 'Guitar nâng cao - Kỹ thuật fingerpicking',
            instructor: 'Nguyễn Văn A',
            rating: 4.8,
            reviews: 125,
            price: '300,000đ',
            image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=225&fit=crop',
            tags: ['Online', 'Guitar', 'Advanced'],
            progress: 0,
            isRecommended: true
        },
        {
            id: 2,
            title: 'Tiếng Nhật Business - JLPT N2',
            instructor: 'Tanaka Yuki',
            rating: 4.9,
            reviews: 89,
            price: '450,000đ',
            image: 'https://images.unsplash.com/photo-1528164344705-47542687000d?w=400&h=225&fit=crop',
            tags: ['Online', 'Japanese', 'Business'],
            progress: 0,
            isRecommended: true
        },
        {
            id: 3,
            title: 'Nấu ăn Nhật Bản - Sushi & Ramen',
            instructor: 'Trần Thị B',
            rating: 4.7,
            reviews: 67,
            price: '250,000đ',
            image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=225&fit=crop',
            tags: ['Offline', 'Cooking', 'Japanese'],
            progress: 0,
            isRecommended: true
        },
    ];

    const lessonCards = featuredLessons || fallbackLessons;

    const categories = [
        { name: t('home.categories.music'), icon: Music, count: '156' },
        { name: t('home.categories.languages'), icon: Languages, count: '89' },
        { name: t('home.categories.cooking'), icon: UtensilsCrossed, count: '67' },
        { name: t('home.categories.sports'), icon: Dumbbell, count: '45' },
        { name: t('home.categories.arts'), icon: Palette, count: '78' },
        { name: t('home.categories.technology'), icon: Laptop, count: '123' },
    ];

    // Lấy tên viết tắt từ tên user
    const getUserInitials = (name: string) => {
        return name
            .split(' ')
            .map(word => word.charAt(0))
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <div className="min-h-screen bg-[#F8F9FA] font-['Inter']">
            {/* Personal Welcome Section */}
            <section className="bg-gradient-to-br from-[#2A7A8C] via-[#1A5A6C] to-[#0F3A4A] text-white relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent transform -skew-y-12"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
                    {/* Personal Greeting */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center space-x-4">
                            {/* User Avatar */}
                            <div className="w-16 h-16 bg-gradient-to-br from-[#FFC947] to-[#FFB627] rounded-full flex items-center justify-center shadow-lg">
                                {user?.avatar_path ? (
                                    <img
                                        src={user.avatar_path}
                                        alt={user.name}
                                        className="w-full h-full rounded-full object-cover"
                                    />
                                ) : (
                                    <span className="text-[#343A40] font-bold text-xl">
                                        {getUserInitials(user?.name || 'User')}
                                    </span>
                                )}
                            </div>
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold mb-1">
                                    Chào mừng trở lại, {user?.name}! 👋
                                </h1>
                                <p className="text-blue-100 text-sm">
                                    Hôm nay là một ngày tuyệt vời để học thêm điều gì đó mới
                                </p>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="hidden md:flex space-x-3">
                            <Link
                                to="/dashboard"
                                className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2"
                            >
                                <LayoutDashboard className="w-4 h-4" />
                                <span>Dashboard</span>
                            </Link>
                            <Link
                                to="/my-bookings"
                                className="bg-[#FFC947] text-[#343A40] px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
                            >
                                <Calendar className="w-4 h-4" />
                                <span>Lịch học</span>
                            </Link>
                        </div>
                    </div>

                    {/* Enhanced Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <div className="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-4 hover:bg-opacity-20 transition-all duration-200">
                            <div className="flex items-center justify-between mb-2">
                                <BookOpen className="w-6 h-6 text-yellow-300" />
                                <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">+2</span>
                            </div>
                            <div className="text-2xl font-bold">12</div>
                            <div className="text-blue-100 text-sm">Khóa học đã học</div>
                            <div className="w-full bg-white bg-opacity-20 rounded-full h-1 mt-2">
                                <div className="bg-yellow-300 h-1 rounded-full w-3/4"></div>
                            </div>
                        </div>

                        <div className="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-4 hover:bg-opacity-20 transition-all duration-200">
                            <div className="flex items-center justify-between mb-2">
                                <Clock className="w-6 h-6 text-green-300" />
                                <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">Hôm nay</span>
                            </div>
                            <div className="text-2xl font-bold">3</div>
                            <div className="text-blue-100 text-sm">Lịch học hôm nay</div>
                            <div className="text-xs text-green-300 mt-1">14:00 • 16:00 • 19:00</div>
                        </div>

                        <div className="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-4 hover:bg-opacity-20 transition-all duration-200">
                            <div className="flex items-center justify-between mb-2">
                                <Award className="w-6 h-6 text-yellow-300" />
                                <Star className="w-4 h-4 text-yellow-300" />
                            </div>
                            <div className="text-2xl font-bold">4.8</div>
                            <div className="text-blue-100 text-sm">Điểm trung bình</div>
                            <div className="text-xs text-yellow-300 mt-1">Xuất sắc!</div>
                        </div>

                        <div className="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-4 hover:bg-opacity-20 transition-all duration-200">
                            <div className="flex items-center justify-between mb-2">
                                <Target className="w-6 h-6 text-green-300" />
                                <TrendingUp className="w-4 h-4 text-green-300" />
                            </div>
                            <div className="text-2xl font-bold">85%</div>
                            <div className="text-blue-100 text-sm">Tiến độ học tập</div>
                            <div className="w-full bg-white bg-opacity-20 rounded-full h-1 mt-2">
                                <div className="bg-green-300 h-1 rounded-full w-4/5"></div>
                            </div>
                        </div>
                    </div>

                    {/* Learning Goals */}
                    <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6">
                        <h3 className="text-lg font-semibold mb-4 flex items-center">
                            <Target className="w-5 h-5 mr-2 text-yellow-300" />
                            Mục tiêu học tập tuần này
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                    <span className="text-white text-xs font-bold">✓</span>
                                </div>
                                <span className="text-sm">Hoàn thành 2 bài học Guitar</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                                    <span className="text-white text-xs font-bold">2/3</span>
                                </div>
                                <span className="text-sm">Luyện tập 50 từ vựng tiếng Nhật</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                                    <span className="text-white text-xs font-bold">0/1</span>
                                </div>
                                <span className="text-sm">Thực hành nấu 1 món mới</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Personalized Recommendations */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-bold text-[#343A40]">
                            Khóa học được đề xuất riêng cho bạn
                        </h2>
                        <Link
                            to="/course"
                            className="text-[#2A7A8C] hover:text-[#1A5A6C] font-medium flex items-center space-x-1"
                        >
                            <span>Xem tất cả</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {(Array.isArray(lessonCards) ? lessonCards.slice(0, 3) : []).map((lesson) => (
                            <div
                                key={lesson.id}
                                className="bg-white rounded-xl border border-[#E9ECEF] overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
                            >
                                <div className="relative aspect-video">
                                    <img
                                        src={lesson.image}
                                        alt={lesson.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    {lesson.isRecommended && (
                                        <div className="absolute top-3 left-3 bg-[#FFC947] text-[#343A40] px-3 py-1 rounded-full text-xs font-bold">
                                            Đề xuất cho bạn
                                        </div>
                                    )}
                                    <div className="absolute top-3 right-3 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                                        Mới
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-lg font-bold text-[#343A40] mb-3 line-clamp-2 group-hover:text-[#2A7A8C] transition-colors">
                                        {lesson.title}
                                    </h3>

                                    <div className="flex items-center mb-3">
                                        <div className="w-8 h-8 bg-[#2A7A8C] rounded-full flex items-center justify-center text-white text-sm font-medium mr-3">
                                            {lesson.instructor.charAt(0)}
                                        </div>
                                        <span className="text-sm font-medium text-[#343A40]">
                                            {lesson.instructor}
                                        </span>
                                    </div>

                                    <div className="flex items-center mb-4">
                                        <div className="flex text-yellow-400 mr-2">
                                            {[...Array(5)].map((_, i) => (
                                                <svg
                                                    key={i}
                                                    className="w-4 h-4 fill-current"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>
                                        <span className="text-sm text-[#6C757D]">
                                            {lesson.rating} ({lesson.reviews} đánh giá)
                                        </span>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {(Array.isArray(lesson.tags) ? lesson.tags : []).map((tag, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-[#F8F9FA] text-[#6C757D] text-xs rounded-full"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-semibold text-[#2A7A8C]">
                                            {lesson.price}
                                        </span>
                                        <button className="bg-[#FFC947] text-[#343A40] px-6 py-2 rounded-lg font-medium hover:shadow-md hover:bg-[#FFB627] transition-all duration-200">
                                            Đăng ký ngay
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Enhanced Categories Section */}
            <section className="py-16 bg-gradient-to-br from-[#F8F9FA] to-[#E9ECEF]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-[#343A40] mb-4">
                            Khám phá theo sở thích của bạn
                        </h2>
                        <p className="text-[#6C757D] max-w-2xl mx-auto">
                            Dựa trên lịch sử học tập, chúng tôi đề xuất những danh mục phù hợp nhất với bạn
                        </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        {(Array.isArray(categories) ? categories : []).map((category, index) => {
                            const Icon = category.icon;
                            const isRecommended = index < 3; // 3 danh mục đầu được đề xuất
                            return (
                                <div
                                    key={index}
                                    className={`bg-white rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 cursor-pointer border-2 group ${
                                        isRecommended
                                            ? 'border-[#FFC947] bg-gradient-to-br from-white to-[#FFC947]/5'
                                            : 'border-[#E9ECEF] hover:border-[#2A7A8C]'
                                    }`}
                                >
                                    {isRecommended && (
                                        <div className="absolute -top-2 -right-2 bg-[#FFC947] text-[#343A40] rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                                            ★
                                        </div>
                                    )}
                                    <div className="relative">
                                        <Icon className={`mx-auto mb-3 w-10 h-10 transition-colors ${
                                            isRecommended ? 'text-[#FFC947]' : 'text-[#2A7A8C] group-hover:text-[#FFC947]'
                                        }`} />
                                        <h3 className="font-semibold text-[#343A40] mb-2">{category.name}</h3>
                                        <p className="text-sm text-[#6C757D]">{category.count} khóa học</p>
                                        {isRecommended && (
                                            <p className="text-xs text-[#FFC947] font-medium mt-1">Phù hợp với bạn</p>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Enhanced Quick Actions */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-[#343A40] mb-12 text-center">
                        Quản lý học tập của bạn
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Link
                            to="/my-bookings"
                            className="bg-white rounded-xl p-8 text-center hover:shadow-lg transition-all duration-300 border border-[#E9ECEF] hover:border-[#2A7A8C] group"
                        >
                            <div className="w-16 h-16 bg-gradient-to-br from-[#2A7A8C] to-[#1A5A6C] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                <Calendar className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-[#343A40] mb-2">Lịch học của tôi</h3>
                            <p className="text-[#6C757D] mb-4">Xem và quản lý lịch học</p>
                            <div className="text-sm text-[#2A7A8C] font-medium">
                                3 lịch học hôm nay →
                            </div>
                        </Link>

                        <Link
                            to="/messages"
                            className="bg-white rounded-xl p-8 text-center hover:shadow-lg transition-all duration-300 border border-[#E9ECEF] hover:border-[#2A7A8C] group"
                        >
                            <div className="w-16 h-16 bg-gradient-to-br from-[#FFC947] to-[#FFB627] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                <Users className="w-8 h-8 text-[#343A40]" />
                            </div>
                            <h3 className="text-xl font-bold text-[#343A40] mb-2">Tin nhắn</h3>
                            <p className="text-[#6C757D] mb-4">Liên lạc với giáo viên</p>
                            <div className="text-sm text-[#FFC947] font-medium">
                                2 tin nhắn mới →
                            </div>
                        </Link>

                        <Link
                            to="/dashboard"
                            className="bg-white rounded-xl p-8 text-center hover:shadow-lg transition-all duration-300 border border-[#E9ECEF] hover:border-[#2A7A8C] group"
                        >
                            <div className="w-16 h-16 bg-gradient-to-br from-[#28A745] to-[#20C997] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                <TrendingUp className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-[#343A40] mb-2">Tiến độ học tập</h3>
                            <p className="text-[#6C757D] mb-4">Theo dõi kết quả học tập</p>
                            <div className="text-sm text-[#28A745] font-medium">
                                85% hoàn thành →
                            </div>
                        </Link>

                        <Link
                            to="/settings"
                            className="bg-white rounded-xl p-8 text-center hover:shadow-lg transition-all duration-300 border border-[#E9ECEF] hover:border-[#2A7A8C] group"
                        >
                            <div className="w-16 h-16 bg-gradient-to-br from-[#6C757D] to-[#495057] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                <Settings className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-[#343A40] mb-2">Cài đặt</h3>
                            <p className="text-[#6C757D] mb-4">Quản lý tài khoản</p>
                            <div className="text-sm text-[#6C757D] font-medium">
                                Tùy chỉnh profile →
                            </div>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
