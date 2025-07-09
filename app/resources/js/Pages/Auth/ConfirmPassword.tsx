'use client';

import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { authAPI } from '@/api/auth';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { t } from '@/lib/i18n';

interface ConfirmPasswordProps {
    status?: string;
}

export default function ConfirmPassword({ status }: ConfirmPasswordProps) {
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Gọi API để xác nhận password
            await authAPI.confirmPassword({ password });
            // Redirect sẽ được xử lý trong API hoặc component
        } catch (error: any) {
            setError(error.message || 'Có lỗi xảy ra khi xác nhận mật khẩu');
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
                            Xác nhận mật khẩu
                        </h1>
                        <p className="text-silver-gray">
                            Đây là khu vực bảo mật của ứng dụng. Vui lòng xác nhận mật khẩu của bạn trước khi tiếp tục.
                        </p>
                    </div>

                    {status && (
                        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <p className="text-sm text-blue-600">{status}</p>
                        </div>
                    )}

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-sm text-red-600">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-charcoal-gray mb-2"
                            >
                                Mật khẩu
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-silver-gray w-5 h-5" />
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="manabi-input pl-12 pr-12"
                                    placeholder="Nhập mật khẩu của bạn"
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
                        </div>

                        <button
                            type="submit"
                            className="manabi-btn-primary w-full text-lg"
                            disabled={loading}
                        >
                            {loading ? 'Đang xác nhận...' : 'Xác nhận'}
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
