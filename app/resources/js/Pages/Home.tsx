'use client';

import { useState, useEffect } from 'react';
import { Music, Languages, UtensilsCrossed, Dumbbell, Palette, Laptop } from 'lucide-react';
import { lessonsAPI } from '@/api/lessons';
import { useFetch } from '@/hooks/useFetch';
import { useAuth } from '@/hooks/useAuth';
import { t, getCurrentLocale, setLocale, SUPPORTED_LOCALES } from '@/lib/i18n';
import { Link } from 'react-router-dom';

export default function Home() {
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
            {/* Hero Section */}
            <section className="bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-bold text-[#343A40] mb-6">
                            {t('home.hero.title', {
                                knowledge: t('home.hero.knowledge'),
                                skills: t('home.hero.skills')
                            })}
                        </h1>
                        <p className="text-xl text-[#6C757D] max-w-3xl mx-auto mb-8">
                            {t('home.hero.subtitle')}
                        </p>

                        {/* Social Proof */}
                        <div className="mb-12">
                            <p className="text-lg text-[#6C757D] mb-4">
                                {t('home.hero.social_proof', {
                                    students: t('home.hero.students'),
                                    teachers: t('home.hero.teachers')
                                })}
                            </p>
                            <div className="flex justify-center items-center space-x-8 text-sm text-[#6C757D]">
                                <div className="flex items-center space-x-2">
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3, 4].map((i) => (
                                            <div key={i} className="w-8 h-8 bg-[#2A7A8C] rounded-full border-2 border-white"></div>
                                        ))}
                                    </div>
                                    <span>{t('home.hero.active_students')}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-6 h-6 bg-[#FFC947] rounded-full flex items-center justify-center">
                                        <span className="text-xs font-bold text-[#343A40]">✓</span>
                                    </div>
                                    <span>{t('home.hero.quality_certified')}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            {isAuthenticated ? (
                                // Người dùng đã đăng nhập - hiển thị dashboard link
                                <Link
                                    to="/dashboard"
                                    className="bg-[#FFC947] text-[#343A40] px-8 py-4 rounded-lg font-medium text-lg hover:shadow-lg transition-all duration-200"
                                >
                                    Vào Dashboard
                                </Link>
                            ) : (
                                // Người dùng chưa đăng nhập - hiển thị CTA buttons
                                <>
                                    <Link
                                        to="/course"
                                        className="bg-[#FFC947] text-[#343A40] px-8 py-4 rounded-lg font-medium text-lg hover:shadow-lg transition-all duration-200"
                                    >
                                        {t('home.hero.explore_courses')}
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="border border-[#2A7A8C] text-[#2A7A8C] px-8 py-4 rounded-lg font-medium text-lg hover:bg-[#2A7A8C] hover:bg-opacity-5 transition-all duration-200"
                                    >
                                        {t('home.hero.become_teacher')}
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-16 bg-[#F8F9FA]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-[#343A40] mb-12 text-center">
                        {t('home.categories.title')}
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                        {(Array.isArray(categories) ? categories : []).map((category, index) => {
                            const Icon = category.icon;
                            return (
                                <div
                                    key={index}
                                    className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 cursor-pointer border border-[#E9ECEF] hover:border-[#2A7A8C]"
                                >
                                    <Icon className="mx-auto mb-3 w-10 h-10 text-wisdom-blue" />
                                    <h3 className="font-semibold text-[#343A40] mb-2">{category.name}</h3>
                                    <p className="text-sm text-[#6C757D]">{t('home.categories.courses_count', { count: category.count })}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Search Section */}
            <section className="py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h2 className="text-2xl font-bold text-[#343A40] mb-6 text-center">
                            {t('home.search.title')}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-[#343A40] mb-2">
                                    {t('home.search.skill')}
                                </label>
                                <input
                                    type="text"
                                    placeholder={t('home.search.skill_placeholder')}
                                    className="w-full px-4 py-3 border border-[#CED4DA] rounded-lg focus:border-[#2A7A8C] focus:border-2 outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#343A40] mb-2">
                                    {t('home.search.location')}
                                </label>
                                <input
                                    type="text"
                                    placeholder={t('home.search.location_placeholder')}
                                    className="w-full px-4 py-3 border border-[#CED4DA] rounded-lg focus:border-[#2A7A8C] focus:border-2 outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#343A40] mb-2">
                                    {t('home.search.price')}
                                </label>
                                <select className="w-full px-4 py-3 border border-[#CED4DA] rounded-lg focus:border-[#2A7A8C] focus:border-2 outline-none transition-all">
                                    <option>{t('home.search.all_prices')}</option>
                                    <option>{t('home.search.under_200k')}</option>
                                    <option>{t('home.search.200k_500k')}</option>
                                    <option>{t('home.search.over_500k')}</option>
                                </select>
                            </div>
                        </div>
                        <button className="w-full mt-6 bg-[#FFC947] text-[#343A40] py-3 rounded-lg font-medium hover:shadow-md transition-all duration-200">
                            {t('home.search.search')}
                        </button>
                    </div>
                </div>
            </section>

            {/* Featured Courses */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-[#343A40] mb-12 text-center">
                        {t('home.featured.title')}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {(Array.isArray(lessonCards) ? lessonCards : []).map((lesson) => (
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
                                        <button className="bg-[#FFC947] text-[#343A40] px-4 py-2 rounded-lg font-medium hover:shadow-md transition-all duration-200">
                                            {t('home.featured.view_details')}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="bg-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-3xl font-bold text-[#2A7A8C] mb-2">
                                10,000+
                            </div>
                            <div className="text-[#6C757D]">
                                {t('home.stats.students')}
                            </div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-[#2A7A8C] mb-2">
                                500+
                            </div>
                            <div className="text-[#6C757D]">
                                {t('home.stats.teachers')}
                            </div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-[#2A7A8C] mb-2">
                                1,200+
                            </div>
                            <div className="text-[#6C757D]">
                                {t('home.stats.courses')}
                            </div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-[#2A7A8C] mb-2">
                                4.8/5
                            </div>
                            <div className="text-[#6C757D]">
                                {t('home.stats.rating')}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
