'use client';

import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { authAPI } from '@/api/auth';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { t } from '@/lib/i18n';

interface ResetPasswordProps {
    token: string;
    email: string;
}

interface FormData {
    token: string;
    email: string;
    password: string;
    password_confirmation: string;
}

interface FormErrors {
    password?: string;
    password_confirmation?: string;
    [key: string]: string | undefined;
}

export default function ResetPassword({ token, email }: ResetPasswordProps) {
    const [formData, setFormData] = useState<FormData>({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [errors, setErrors] = useState<FormErrors>({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    const validateForm = () => {
        const newErrors: FormErrors = {};

        if (!formData.password) {
            newErrors.password = 'Mật khẩu là bắt buộc';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Mật khẩu phải có ít nhất 8 ký tự';
        }

        if (formData.password !== formData.password_confirmation) {
            newErrors.password_confirmation = 'Mật khẩu xác nhận không khớp';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);
        setError('');

        try {
            await authAPI.resetPassword(formData);
            // Redirect to login page after successful reset
            window.location.href = '/login';
        } catch (error: any) {
            setError(error.message || 'Có lỗi xảy ra khi đặt lại mật khẩu');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-off-white flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-wisdom-blue rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-xl font-bold text-white">ML</span>
                    </div>
                    <h1 className="text-2xl font-bold text-charcoal-gray font-inter">
                        Manabi Link
                    </h1>
                </div>

                {/* Form Card */}
                <div className="manabi-card p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-charcoal-gray mb-2 font-inter">
                            Đặt lại mật khẩu
                        </h1>
                        <p className="text-silver-gray">
                            Nhập mật khẩu mới cho tài khoản của bạn
                        </p>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-sm text-red-600">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Field (Disabled) */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-charcoal-gray mb-2"
                            >
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-silver-gray w-5 h-5" />
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    className="manabi-input pl-12 bg-gray-50 cursor-not-allowed"
                                    disabled
                                />
                            </div>
                        </div>

                        {/* New Password Field */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-charcoal-gray mb-2"
                            >
                                Mật khẩu mới
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-silver-gray w-5 h-5" />
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={(e) => handleInputChange('password', e.target.value)}
                                    className={`manabi-input pl-12 pr-12 ${errors.password ? 'border-red-500' : ''}`}
                                    placeholder="Nhập mật khẩu mới"
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

                        {/* Confirm Password Field */}
                        <div>
                            <label
                                htmlFor="password_confirmation"
                                className="block text-sm font-medium text-charcoal-gray mb-2"
                            >
                                Xác nhận mật khẩu
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-silver-gray w-5 h-5" />
                                <input
                                    id="password_confirmation"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    name="password_confirmation"
                                    value={formData.password_confirmation}
                                    onChange={(e) => handleInputChange('password_confirmation', e.target.value)}
                                    className={`manabi-input pl-12 pr-12 ${errors.password_confirmation ? 'border-red-500' : ''}`}
                                    placeholder="Nhập lại mật khẩu mới"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-silver-gray hover:text-charcoal-gray transition-colors"
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                            {errors.password_confirmation && (
                                <p className="mt-1 text-sm text-red-600">{errors.password_confirmation}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="manabi-btn-primary w-full text-lg"
                            disabled={loading}
                        >
                            {loading ? 'Đang đặt lại...' : 'Đặt lại mật khẩu'}
                        </button>
                    </form>

                    {/* Back to Login */}
                    <div className="mt-8 text-center">
                        <p className="text-charcoal-gray">
                            <a
                                href="/login"
                                className="text-wisdom-blue font-medium hover:text-wisdom-blue/80 transition-colors"
                            >
                                Quay lại đăng nhập
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
