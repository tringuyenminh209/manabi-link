'use client';

import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { t } from '@/lib/i18n';
import { Link } from 'react-router-dom';

type LoginErrors = {
  email?: string;
  password?: string;
};

export default function LoginPage() {
    const { login, error: authError, loading } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<LoginErrors>({});
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        remember: false,
    });

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors: LoginErrors = {};

        if (!formData.email) {
            newErrors.email = t('login.email_required');
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = t('login.email_invalid');
        }

        if (!formData.password) {
            newErrors.password = t('login.password_required');
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            await login({
                email: formData.email,
                password: formData.password,
            });
            // Redirect sẽ được xử lý trong useAuth hook
        } catch (error) {
            // Error đã được xử lý trong useAuth
        }
    };

    return (
        <div className="min-h-screen bg-off-white flex relative">
            {/* Home Button - Top Left */}
            <Link
                to="/"
                className="absolute top-6 left-6 z-10 flex items-center space-x-2 text-wisdom-blue hover:text-wisdom-blue/80 transition-colors"
            >
                <div className="w-8 h-8 bg-wisdom-blue rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">ML</span>
                </div>
                <span className="font-semibold text-charcoal-gray">Manabi Link</span>
            </Link>

            {/* Left side - Illustration/Image */}
            <div
                className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-wisdom-blue to-wisdom-blue/80 items-center justify-center p-12"
            >
                <div className="text-center text-white max-w-md">
                    <div className="mb-8">
                        <div
                            className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6"
                        >
                            <div
                                className="w-20 h-20 bg-energetic-yellow rounded-full flex items-center justify-center"
                            >
                                <span
                                    className="text-2xl font-bold text-charcoal-gray"
                                >
                                    ML
                                </span>
                            </div>
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold mb-4 font-inter">
                        {t('login.welcome')}
                    </h2>
                    <p className="text-lg opacity-90 leading-relaxed">
                        {t('login.desc')}
                    </p>
                    <div className="mt-8 flex justify-center space-x-4">
                        <div className="w-3 h-3 bg-white/40 rounded-full"></div>
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                        <div className="w-3 h-3 bg-white/40 rounded-full"></div>
                    </div>
                </div>
            </div>

            {/* Right side - Login Form */}
            <div
                className="w-full lg:w-1/2 flex items-center justify-center p-8"
            >
                <div className="w-full max-w-md">
                    {/* Logo for mobile */}
                    <div className="lg:hidden text-center mb-8">
                        <div
                            className="w-16 h-16 bg-wisdom-blue rounded-full flex items-center justify-center mx-auto mb-4"
                        >
                            <span className="text-xl font-bold text-white">
                                ML
                            </span>
                        </div>
                        <h1
                            className="text-2xl font-bold text-charcoal-gray font-inter"
                        >
                            {t('login.brand_name')}
                        </h1>
                    </div>

                    {/* Login Form */}
                    <div className="manabi-card p-8">
                        <div className="text-center mb-8">
                            <h1
                                className="text-3xl font-bold text-charcoal-gray mb-2 font-inter"
                            >
                                {t('login.login')}
                            </h1>
                            <p className="text-silver-gray">
                                {t('login.welcome_back')}
                            </p>
                        </div>

                        {/* Error Message */}
                        {authError && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-sm text-red-600">{authError}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email Field */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-charcoal-gray mb-2"
                                >
                                    {t('login.email')}
                                </label>
                                <div className="relative">
                                    <Mail
                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-silver-gray w-5 h-5"
                                    />

                                    <input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        className={`manabi-input pl-12 ${errors.email ? 'border-red-500' : ''}`}
                                        placeholder={t('login.email_placeholder')}
                                        required
                                    />
                                </div>
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                                )}
                            </div>

                            {/* Password Field */}
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-charcoal-gray mb-2"
                                >
                                    {t('login.password')}
                                </label>
                                <div className="relative">
                                    <Lock
                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-silver-gray w-5 h-5"
                                    />

                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={formData.password}
                                        onChange={(e) => handleInputChange('password', e.target.value)}
                                        className={`manabi-input pl-12 pr-12 ${errors.password ? 'border-red-500' : ''}`}
                                        placeholder={t('login.password_placeholder')}
                                        required
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-silver-gray hover:text-charcoal-gray transition-colors"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-5 h-5" />
                                        ) : (
                                            <Eye className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                                )}
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={formData.remember}
                                        onChange={(e) => handleInputChange('remember', e.target.checked)}
                                        className="w-4 h-4 text-wisdom-blue border-input-border rounded focus:ring-wisdom-blue focus:ring-2"
                                    />

                                    <span
                                        className="ml-2 text-sm text-charcoal-gray"
                                    >
                                        {t('login.remember')}
                                    </span>
                                </label>
                                <Link
                                    to="/forgot-password"
                                    className="text-sm text-wisdom-blue hover:text-wisdom-blue/80 transition-colors"
                                >
                                    {t('login.forgot')}
                                </Link>
                            </div>

                            {/* Login Button */}
                            <button
                                type="submit"
                                className="manabi-btn-primary w-full text-lg"
                                disabled={loading}
                            >
                                {loading ? t('login.logging_in') : t('login.login')}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="my-8 flex items-center">
                            <div
                                className="flex-1 border-t border-light-border"
                            ></div>
                            <span
                                className="px-4 text-sm text-silver-gray bg-white"
                            >
                                {t('login.or')}
                            </span>
                            <div
                                className="flex-1 border-t border-light-border"
                            ></div>
                        </div>

                        {/* Social Login */}
                        <div className="space-y-3">
                            <button
                                className="w-full flex items-center justify-center px-4 py-3 border border-input-border rounded-lg bg-white text-charcoal-gray font-medium hover:shadow-md transition-all duration-200"
                            >
                                <svg
                                    className="w-5 h-5 mr-3"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fill="#4285F4"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    />

                                    <path
                                        fill="#34A853"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    />

                                    <path
                                        fill="#FBBC05"
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    />

                                    <path
                                        fill="#EA4335"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    />
                                </svg>
                                {t('login.login_google')}
                            </button>

                            <button
                                className="w-full flex items-center justify-center px-4 py-3 border border-input-border rounded-lg bg-white text-charcoal-gray font-medium hover:shadow-md transition-all duration-200"
                            >
                                <svg
                                    className="w-5 h-5 mr-3"
                                    fill="#1877F2"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                                    />
                                </svg>
                                {t('login.login_facebook')}
                            </button>
                        </div>

                        {/* Sign Up Link */}
                        <div className="mt-8 text-center">
                            <p className="text-charcoal-gray">
                                {t('login.no_account')}{' '}
                                <Link
                                    to="/register"
                                    className="text-wisdom-blue font-medium hover:text-wisdom-blue/80 transition-colors"
                                >
                                    {t('login.register_here')}
                                </Link>
                            </p>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-8 text-center text-sm text-silver-gray">
                        <p>
                            {t('login.terms')}{' '}
                            <a
                                href="#"
                                className="text-wisdom-blue hover:text-wisdom-blue/80"
                            >
                                {t('login.agreement')}
                            </a>{' '}
                            {t('login.and')}{' '}
                            <a
                                href="#"
                                className="text-wisdom-blue hover:text-wisdom-blue/80"
                            >
                                {t('login.policy')}
                            </a>{' '}
                            {t('login.agree')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
