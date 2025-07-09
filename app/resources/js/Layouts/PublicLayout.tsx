import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { t, getCurrentLocale, setLocale, SUPPORTED_LOCALES } from '@/lib/i18n';
import { useAuth } from '@/hooks/useAuth';

interface PublicLayoutProps {
    children: React.ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
    const { user, isAuthenticated } = useAuth();
    const [selectedLanguage, setSelectedLanguage] = useState(getCurrentLocale());
    const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

    // Handle language change
    const handleLanguageChange = (locale: keyof typeof SUPPORTED_LOCALES) => {
        setSelectedLanguage(locale);
        setLocale(locale);
        setShowLanguageDropdown(false);
    };

    return (
        <div className="min-h-screen bg-[#F8F9FA] font-['Inter']">
            {/* Navigation */}
            <nav className="bg-white shadow-sm border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <div className="text-2xl font-bold text-[#2A7A8C]">
                                Manabi Link
                            </div>
                        </div>

                        <div className="hidden md:flex items-center space-x-8">
                            <Link
                                to="/"
                                className="text-[#343A40] hover:text-[#2A7A8C] transition-colors"
                            >
                                {t('home.nav.home')}
                            </Link>
                            <Link
                                to="/course"
                                className="text-[#343A40] hover:text-[#2A7A8C] transition-colors"
                            >
                                {t('home.nav.courses')}
                            </Link>
                            <Link
                                to="/teacher"
                                className="text-[#343A40] hover:text-[#2A7A8C] transition-colors"
                            >
                                {t('home.nav.teachers')}
                            </Link>
                            <Link
                                to="/about"
                                className="text-[#343A40] hover:text-[#2A7A8C] transition-colors"
                            >
                                {t('home.nav.about')}
                            </Link>
                        </div>

                        <div className="flex items-center space-x-4">
                            <button className="p-2 text-[#343A40] hover:text-[#2A7A8C] transition-colors">
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </button>

                            {/* Language Selector */}
                            <div className="relative">
                                <button
                                    onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                                    className="flex items-center space-x-2 px-3 py-2 text-[#343A40] hover:text-[#2A7A8C] transition-colors border border-[#CED4DA] rounded-lg hover:border-[#2A7A8C]"
                                >
                                    <span className="text-lg">
                                        {SUPPORTED_LOCALES[selectedLanguage as keyof typeof SUPPORTED_LOCALES]?.flag}
                                    </span>
                                    <span className="text-sm font-medium">
                                        {selectedLanguage.toUpperCase()}
                                    </span>
                                    <svg
                                        className={`w-4 h-4 transition-transform ${showLanguageDropdown ? 'rotate-180' : ''}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </button>

                                {showLanguageDropdown && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white border border-[#CED4DA] rounded-lg shadow-lg z-50">
                                        {Object.entries(SUPPORTED_LOCALES).map(([code, lang]) => (
                                            <button
                                                key={code}
                                                onClick={() => handleLanguageChange(code as keyof typeof SUPPORTED_LOCALES)}
                                                className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-[#F8F9FA] transition-colors ${
                                                    selectedLanguage === code
                                                        ? 'bg-[#F8F9FA] text-[#2A7A8C]'
                                                        : 'text-[#343A40]'
                                                }`}
                                            >
                                                <span className="text-lg">
                                                    {lang.flag}
                                                </span>
                                                <span className="text-sm font-medium">
                                                    {lang.name}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {isAuthenticated ? (
                                <div className="flex items-center space-x-4">
                                    <span className="text-sm text-gray-600">
                                        {t('home.nav.hello')}, {user?.name}
                                    </span>
                                    <Link
                                        to="/dashboard"
                                        className="bg-[#2A7A8C] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#1A5A6C] transition-all duration-200"
                                    >
                                        Dashboard
                                    </Link>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-4">
                                    <Link
                                        to="/login"
                                        className="bg-[#FFC947] text-[#343A40] px-6 py-2 rounded-lg font-medium hover:shadow-md transition-all duration-200"
                                    >
                                        {t('home.nav.login')}
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="bg-[#2A7A8C] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#1A5A6C] transition-all duration-200"
                                    >
                                        {t('home.nav.register')}
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main>
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-[#343A40] text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <div className="text-2xl font-bold text-[#FFC947] mb-4">
                                Manabi Link
                            </div>
                            <p className="text-gray-300">
                                {t('home.footer.description')}
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">
                                {t('home.footer.about')}
                            </h3>
                            <ul className="space-y-2 text-gray-300">
                                <li>
                                    <Link
                                        to="/about"
                                        className="hover:text-[#FFC947] transition-colors"
                                    >
                                        {t('home.footer.introduction')}
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/about#contact"
                                        className="hover:text-[#FFC947] transition-colors"
                                    >
                                        {t('home.footer.contact')}
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/about#jobs"
                                        className="hover:text-[#FFC947] transition-colors"
                                    >
                                        {t('home.footer.jobs')}
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">
                                {t('home.footer.support')}
                            </h3>
                            <ul className="space-y-2 text-gray-300">
                                <li>
                                    <Link
                                        to="/help"
                                        className="hover:text-[#FFC947] transition-colors"
                                    >
                                        {t('home.footer.help_center')}
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/terms"
                                        className="hover:text-[#FFC947] transition-colors"
                                    >
                                        {t('home.footer.terms')}
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/privacy"
                                        className="hover:text-[#FFC947] transition-colors"
                                    >
                                        {t('home.footer.privacy')}
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">
                                {t('home.footer.follow_us')}
                            </h3>
                            <div className="flex space-x-4">
                                <a
                                    href="https://facebook.com/manabilink"
                                    className="text-gray-300 hover:text-[#FFC947] transition-colors"
                                    target="_blank" rel="noopener noreferrer"
                                >
                                    Facebook
                                </a>
                                <a
                                    href="https://instagram.com/manabilink"
                                    className="text-gray-300 hover:text-[#FFC947] transition-colors"
                                    target="_blank" rel="noopener noreferrer"
                                >
                                    Instagram
                                </a>
                                <a
                                    href="https://youtube.com/@manabilink"
                                    className="text-gray-300 hover:text-[#FFC947] transition-colors"
                                    target="_blank" rel="noopener noreferrer"
                                >
                                    YouTube
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-300">
                        <p>
                            {t('home.footer.copyright')}
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
