'use client';

import { useState } from 'react';
import { Music, Languages, UtensilsCrossed, Dumbbell, Palette, Laptop, BookOpen, Calendar, Star, TrendingUp, Clock, Award, Target, Users, Settings } from 'lucide-react';
import { lessonsAPI } from '@/api/lessons';
import { useFetch } from '@/hooks/useFetch';
import { useAuth } from '@/hooks/useAuth';
import { t } from '@/lib/i18n';
import { Link } from 'react-router-dom';
import { useLocale } from '@/lib/i18n/useLocale';

export default function HomeAuthenticated() {
    useLocale(); // Đảm bảo re-render khi đổi ngôn ngữ
    const { user } = useAuth();
    // Fetch featured lessons
    const { data: featuredLessons } = useFetch(() => lessonsAPI.getFeaturedLessons(), []);

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

    const lessonCards = (featuredLessons && featuredLessons.length > 0) ? featuredLessons : fallbackLessons;

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
        <div className="min-h-screen bg-off-white font-['Inter']">
            {/* Section chào mừng */}
            <section className="bg-white rounded-xl shadow-sm max-w-7xl mx-auto mt-8 px-6 py-8 flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12">
                {/* Avatar user */}
                <div className="flex-shrink-0">
                    <div className="w-20 h-20 md:w-28 md:h-28 bg-wisdom-blue rounded-full flex items-center justify-center text-white text-3xl font-bold border-4 border-wisdom-blue/20">
                        {user?.avatar_path ? (
                            <img
                                src={user.avatar_path}
                                alt={user.name}
                                className="w-full h-full rounded-full object-cover"
                            />
                        ) : (
                            getUserInitials(user?.name || 'User')
                        )}
                    </div>
                </div>
                {/* Lời chào và mục tiêu */}
                <div className="flex-1">
                    <h1 className="text-2xl md:text-3xl font-bold text-charcoal-gray mb-2">
                        {t('home.welcome', { name: user?.name })} <span className="inline-block">👋</span>
                    </h1>
                    <p className="text-silver-gray mb-4">{t('home.today_is_great')}</p>
                    {/* Mục tiêu học tập tuần này */}
                    <div className="bg-off-white rounded-lg p-4 flex flex-col md:flex-row gap-4">
                        <div className="flex items-center gap-2">
                            <span className="w-7 h-7 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">✓</span>
                            <span className="text-sm text-charcoal-gray">{t('home.goals.guitar')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-7 h-7 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xs font-bold">2/3</span>
                            <span className="text-sm text-charcoal-gray">{t('home.goals.vocab')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-7 h-7 bg-silver-gray rounded-full flex items-center justify-center text-white text-xs font-bold">0/1</span>
                            <span className="text-sm text-charcoal-gray">{t('home.goals.cooking')}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats grid */}
            <section className="max-w-7xl mx-auto mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-4 flex flex-col items-start shadow-sm border border-light-border">
                    <div className="flex items-center gap-2 mb-2">
                        <BookOpen className="w-5 h-5 text-wisdom-blue" />
                        <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">+2</span>
                    </div>
                    <div className="text-2xl font-bold text-charcoal-gray">12</div>
                    <div className="text-silver-gray text-sm">{t('home.stats.courses')}</div>
                </div>
                <div className="bg-white rounded-xl p-4 flex flex-col items-start shadow-sm border border-light-border">
                    <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-5 h-5 text-green-500" />
                        <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full">Hôm nay</span>
                    </div>
                    <div className="text-2xl font-bold text-charcoal-gray">3</div>
                    <div className="text-silver-gray text-sm">{t('home.stats.today_schedule')}</div>
                </div>
                <div className="bg-white rounded-xl p-4 flex flex-col items-start shadow-sm border border-light-border">
                    <div className="flex items-center gap-2 mb-2">
                        <Award className="w-5 h-5 text-yellow-400" />
                        <Star className="w-4 h-4 text-yellow-400" />
                    </div>
                    <div className="text-2xl font-bold text-charcoal-gray">4.8</div>
                    <div className="text-silver-gray text-sm">{t('home.stats.avg_score')}</div>
                </div>
                <div className="bg-white rounded-xl p-4 flex flex-col items-start shadow-sm border border-light-border">
                    <div className="flex items-center gap-2 mb-2">
                        <Target className="w-5 h-5 text-green-500" />
                        <TrendingUp className="w-4 h-4 text-green-500" />
                    </div>
                    <div className="text-2xl font-bold text-charcoal-gray">85%</div>
                    <div className="text-silver-gray text-sm">{t('home.stats.progress')}</div>
                </div>
            </section>

            {/* Khóa học đề xuất */}
            <section className="max-w-7xl mx-auto mt-12">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-charcoal-gray">{t('home.recommend.title')}</h2>
                    <Link to="/course" className="text-wisdom-blue hover:underline text-sm font-medium">{t('home.recommend.see_all')}</Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {(Array.isArray(lessonCards) ? lessonCards.slice(0, 3) : []).map((lesson) => (
                        <div
                            key={lesson.id}
                            className="bg-white rounded-xl border border-light-border overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
                        >
                            <div className="relative aspect-video">
                                <img
                                    src={lesson.image}
                                    alt={lesson.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                {lesson.isRecommended && (
                                    <div className="absolute top-3 left-3 bg-yellow-400 text-charcoal-gray px-3 py-1 rounded-full text-xs font-bold">
                                        {t('home.recommend.suggested')}
                                    </div>
                                )}
                            </div>
                            <div className="p-5">
                                <h3 className="text-lg font-bold text-charcoal-gray mb-2 line-clamp-2 group-hover:text-wisdom-blue transition-colors">
                                    {lesson.title}
                                </h3>
                                <div className="flex items-center mb-2">
                                    <div className="w-8 h-8 bg-wisdom-blue rounded-full flex items-center justify-center text-white text-sm font-medium mr-2">
                                        {lesson.instructor.charAt(0)}
                                    </div>
                                    <span className="text-sm font-medium text-charcoal-gray">{lesson.instructor}</span>
                                </div>
                                <div className="flex items-center mb-2">
                                    <div className="flex text-yellow-400 mr-2">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-current" />
                                        ))}
                                    </div>
                                    <span className="text-sm text-silver-gray">{lesson.rating} ({lesson.reviews} đánh giá)</span>
                                </div>
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {(Array.isArray(lesson.tags) ? lesson.tags : []).map((tag, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-off-white text-silver-gray text-xs rounded-full"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex justify-between items-center mt-2">
                                    <span className="text-lg font-semibold text-wisdom-blue">{lesson.price}</span>
                                    <button className="bg-yellow-400 text-charcoal-gray px-5 py-2 rounded-lg font-medium hover:shadow-md hover:bg-yellow-300 transition-all duration-200">
                                        Đăng ký ngay
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Danh mục gợi ý */}
            <section className="max-w-7xl mx-auto mt-12">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-charcoal-gray mb-2">{t('home.categories.title')}</h2>
                    <p className="text-silver-gray">{t('home.categories.desc')}</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {(Array.isArray(categories) ? categories : []).map((category, index) => {
                        const Icon = category.icon;
                        const isRecommended = index < 3;
                        return (
                            <div
                                key={index}
                                className={`bg-white rounded-xl p-5 text-center border-2 group transition-all duration-300 cursor-pointer ${
                                    isRecommended
                                        ? 'border-yellow-400 bg-gradient-to-br from-white to-yellow-100'
                                        : 'border-light-border hover:border-wisdom-blue'
                                }`}
                            >
                                <Icon className={`mx-auto mb-2 w-8 h-8 ${isRecommended ? 'text-yellow-400' : 'text-wisdom-blue group-hover:text-yellow-400'}`} />
                                <h3 className="font-semibold text-charcoal-gray mb-1">{category.name}</h3>
                                <p className="text-sm text-silver-gray">{category.count} khóa học</p>
                                {isRecommended && (
                                    <p className="text-xs text-yellow-400 font-medium mt-1">{t('home.categories.recommended')}</p>
                                )}
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Quản lý học tập */}
            <section className="max-w-7xl mx-auto mt-12 mb-16">
                <h2 className="text-2xl font-bold text-charcoal-gray mb-8 text-center">{t('home.manage.title')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Link
                        to="/my-bookings"
                        className="bg-white rounded-xl p-6 text-center border border-light-border hover:border-wisdom-blue group transition-all duration-300"
                    >
                        <div className="w-14 h-14 bg-wisdom-blue rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                            <Calendar className="w-7 h-7 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-charcoal-gray mb-1">{t('home.manage.my_schedule')}</h3>
                        <p className="text-silver-gray mb-2">{t('home.manage.my_schedule_desc')}</p>
                        <div className="text-sm text-wisdom-blue font-medium">{t('home.manage.today_count')}</div>
                    </Link>
                    <Link
                        to="/messages"
                        className="bg-white rounded-xl p-6 text-center border border-light-border hover:border-wisdom-blue group transition-all duration-300"
                    >
                        <div className="w-14 h-14 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                            <Users className="w-7 h-7 text-charcoal-gray" />
                        </div>
                        <h3 className="text-lg font-bold text-charcoal-gray mb-1">{t('home.manage.messages')}</h3>
                        <p className="text-silver-gray mb-2">{t('home.manage.messages_desc')}</p>
                        <div className="text-sm text-yellow-400 font-medium">{t('home.manage.new_messages')}</div>
                    </Link>
                    <Link
                        to="/dashboard"
                        className="bg-white rounded-xl p-6 text-center border border-light-border hover:border-wisdom-blue group transition-all duration-300"
                    >
                        <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                            <TrendingUp className="w-7 h-7 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-charcoal-gray mb-1">{t('home.manage.progress')}</h3>
                        <p className="text-silver-gray mb-2">{t('home.manage.progress_desc')}</p>
                        <div className="text-sm text-green-500 font-medium">{t('home.manage.progress_percent')}</div>
                    </Link>
                    <Link
                        to="/settings"
                        className="bg-white rounded-xl p-6 text-center border border-light-border hover:border-wisdom-blue group transition-all duration-300"
                    >
                        <div className="w-14 h-14 bg-silver-gray rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                            <Settings className="w-7 h-7 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-charcoal-gray mb-1">{t('home.manage.settings')}</h3>
                        <p className="text-silver-gray mb-2">{t('home.manage.settings_desc')}</p>
                        <div className="text-sm text-silver-gray font-medium">{t('home.manage.profile_customize')}</div>
                    </Link>
                </div>
            </section>
        </div>
    );
}
