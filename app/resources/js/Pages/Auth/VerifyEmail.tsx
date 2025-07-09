'use client';

import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { authAPI } from '@/api/auth';
import { Mail, RefreshCw, CheckCircle } from 'lucide-react';
import { t } from '@/lib/i18n';

interface VerifyEmailProps {
    status?: string;
}

export default function VerifyEmail({ status }: VerifyEmailProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleResendEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await authAPI.resendVerificationEmail();
            setSuccess(true);
        } catch (error: any) {
            setError(error.message || 'Có lỗi xảy ra khi gửi email xác nhận');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await authAPI.logout();
            window.location.href = '/login';
        } catch (error: any) {
            console.error('Logout error:', error);
            window.location.href = '/login';
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
                        <div className="w-16 h-16 bg-wisdom-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Mail className="w-8 h-8 text-wisdom-blue" />
                        </div>
                        <h1 className="text-3xl font-bold text-charcoal-gray mb-2 font-inter">
                            Xác nhận email
                        </h1>
                        <p className="text-silver-gray">
                            Cảm ơn bạn đã đăng ký! Trước khi bắt đầu, bạn có thể xác nhận địa chỉ email của mình bằng cách nhấp vào liên kết mà chúng tôi vừa gửi cho bạn qua email.
                        </p>
                    </div>

                    {status && (
                        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <p className="text-sm text-blue-600">{status}</p>
                        </div>
                    )}

                    {success && (
                        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                            <div className="flex items-center">
                                <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                                <p className="text-sm text-green-600">
                                    Email xác nhận đã được gửi lại thành công!
                                </p>
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-sm text-red-600">{error}</p>
                        </div>
                    )}

                    {/* Email Verification Info */}
                    <div className="bg-wisdom-blue/5 border border-wisdom-blue/20 rounded-lg p-6 mb-6">
                        <div className="flex items-center mb-3">
                            <Mail className="w-5 h-5 text-wisdom-blue mr-2" />
                            <h3 className="text-lg font-semibold text-wisdom-blue">
                                Kiểm tra email của bạn
                            </h3>
                        </div>
                        <p className="text-charcoal-gray text-sm leading-relaxed">
                            Chúng tôi đã gửi một email xác nhận đến địa chỉ email bạn đã đăng ký.
                            Vui lòng kiểm tra hộp thư và nhấp vào liên kết xác nhận để kích hoạt tài khoản.
                        </p>
                        <p className="text-silver-gray text-xs mt-2">
                            Không thấy email? Kiểm tra thư mục spam hoặc thư rác.
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-4">
                        <form onSubmit={handleResendEmail}>
                            <button
                                type="submit"
                                className="manabi-btn-primary w-full text-lg flex items-center justify-center"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                                        Đang gửi...
                                    </>
                                ) : (
                                    <>
                                        <Mail className="w-5 h-5 mr-2" />
                                        Gửi lại email xác nhận
                                    </>
                                )}
                            </button>
                        </form>

                        <button
                            onClick={handleLogout}
                            className="manabi-btn-secondary w-full text-lg"
                        >
                            Đăng xuất
                        </button>
                    </div>

                    {/* Additional Info */}
                    <div className="mt-8 pt-6 border-t border-light-border">
                        <p className="text-sm text-silver-gray text-center">
                            Cần hỗ trợ? Liên hệ với chúng tôi qua{' '}
                            <a
                                href="mailto:support@manabilink.com"
                                className="text-wisdom-blue hover:text-wisdom-blue/80 font-medium"
                            >
                                support@manabilink.com
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
