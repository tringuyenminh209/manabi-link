'use client';

import { useState } from 'react';
import { Music, Languages, UtensilsCrossed, Dumbbell, Palette, Laptop, BookOpen, Calendar, Star, TrendingUp } from 'lucide-react';
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

    const lessonCards = featuredLessons || fallbackLessons;

    const categories = [
        { name: t('home.categories.music'), icon: Music, count: '156' },
        { name: t('home.categories.languages'), icon: Languages, count: '89' },
        { name: t('home.categories.cooking'), icon: UtensilsCrossed, count: '67' },
        { name: t('home.categories.sports'), icon: Dumbbell, count: '45' },
        { name: t('home.categories.arts'), icon: Palette, count: '78' },
        { name: t('home.categories.technology'), icon: Laptop, count: '123' },
    ];

    return (
        <div className="min-h-screen bg-[#F8F9FA] font-['Inter']">
            {/* Welcome Section for Authenticated Users */}
            <section className="bg-gradient-to-r from-[#2A7A8C] to-[#1A5A6C] text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Chào mừng trở lại, {user?.name}! 👋
                        </h1>
                        <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
                            Tiếp tục hành trình học tập của bạn với những khóa học mới nhất
                        </p>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                            <div className="bg-white bg-opacity-10 rounded-lg p-6">
                                <div className="flex items-center justify-center mb-2">
                                    <BookOpen className="w-8 h-8 text-yellow-300" />
                                </div>
                                <div className="text-2xl font-bold">12</div>
                                <div className="text-blue-100">Khóa học đã học</div>
                            </div>
                            <div className="bg-white bg-opacity-10 rounded-lg p-6">
                                <div className="flex items-center justify-center mb-2">
                                    <Calendar className="w-8 h-8 text-green-300" />
                                </div>
                                <div className="text-2xl font-bold">3</div>
                                <div className="text-blue-100">Lịch học hôm nay</div>
                            </div>
                            <div className="bg-white bg-opacity-10 rounded-lg p-6">
                                <div className="flex items-center justify-center mb-2">
                                    <Star className="w-8 h-8 text-yellow-300" />
                                </div>
                                <div className="text-2xl font-bold">4.8</div>
                                <div className="text-blue-100">Điểm trung bình</div>
                            </div>
                            <div className="bg-white bg-opacity-10 rounded-lg p-6">
                                <div className="flex items-center justify-center mb-2">
                                    <TrendingUp className="w-8 h-8 text-green-300" />
                                </div>
                                <div className="text-2xl font-bold">85%</div>
                                <div className="text-blue-100">Tiến độ học tập</div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/dashboard"
                                className="bg-[#FFC947] text-[#343A40] px-8 py-4 rounded-lg font-medium text-lg hover:shadow-lg transition-all duration-200"
                            >
                                Vào Dashboard
                            </Link>
                            <Link
                                to="/course"
                                className="border border-white text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-white hover:text-[#2A7A8C] transition-all duration-200"
                            >
                                Tìm khóa học mới
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Recommended Courses Section */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-[#343A40] mb-12 text-center">
                        Khóa học được đề xuất cho bạn
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {lessonCards.slice(0, 3).map((lesson) => (
                            <div
                                key={lesson.id}
                                className="bg-white rounded-xl border border-[#E9ECEF] overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
                            >
                                <div className="aspect-video">
                                    <img
                                        src={lesson.image}
                                        alt={lesson.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-lg font-bold text-[#343A40] mb-3 line-clamp-2">
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
                                            {lesson.rating} ({lesson.reviews})
                                        </span>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {lesson.tags.map((tag, index) => (
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
                                        <button className="bg-[#FFC947] text-[#343A40] px-4 py-2 rounded-lg font-medium hover:shadow-md transition-all duration-200">
                                            Xem chi tiết
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-16 bg-[#F8F9FA]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-[#343A40] mb-12 text-center">
                        Khám phá theo danh mục
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                        {categories.map((category, index) => {
                            const Icon = category.icon;
                            return (
                                <div
                                    key={index}
                                    className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 cursor-pointer border border-[#E9ECEF] hover:border-[#2A7A8C]"
                                >
                                    <Icon className="mx-auto mb-3 w-10 h-10 text-[#2A7A8C]" />
                                    <h3 className="font-semibold text-[#343A40] mb-2">{category.name}</h3>
                                    <p className="text-sm text-[#6C757D]">{category.count} khóa học</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Quick Actions */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-[#343A40] mb-12 text-center">
                        Thao tác nhanh
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Link
                            to="/my-bookings"
                            className="bg-white rounded-xl p-8 text-center hover:shadow-lg transition-all duration-300 border border-[#E9ECEF] hover:border-[#2A7A8C]"
                        >
                            <Calendar className="mx-auto mb-4 w-12 h-12 text-[#2A7A8C]" />
                            <h3 className="text-xl font-bold text-[#343A40] mb-2">Lịch học của tôi</h3>
                            <p className="text-[#6C757D]">Xem và quản lý lịch học</p>
                        </Link>
                        <Link
                            to="/messages"
                            className="bg-white rounded-xl p-8 text-center hover:shadow-lg transition-all duration-300 border border-[#E9ECEF] hover:border-[#2A7A8C]"
                        >
                            <div className="mx-auto mb-4 w-12 h-12 bg-[#2A7A8C] rounded-full flex items-center justify-center">
                                <span className="text-white font-bold">💬</span>
                            </div>
                            <h3 className="text-xl font-bold text-[#343A40] mb-2">Tin nhắn</h3>
                            <p className="text-[#6C757D]">Liên lạc với giáo viên</p>
                        </Link>
                        <Link
                            to="/settings"
                            className="bg-white rounded-xl p-8 text-center hover:shadow-lg transition-all duration-300 border border-[#E9ECEF] hover:border-[#2A7A8C]"
                        >
                            <div className="mx-auto mb-4 w-12 h-12 bg-[#FFC947] rounded-full flex items-center justify-center">
                                <span className="text-[#343A40] font-bold">⚙️</span>
                            </div>
                            <h3 className="text-xl font-bold text-[#343A40] mb-2">Cài đặt</h3>
                            <p className="text-[#6C757D]">Quản lý tài khoản</p>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
