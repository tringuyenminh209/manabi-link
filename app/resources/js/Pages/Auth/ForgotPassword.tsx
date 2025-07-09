import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { authAPI } from '@/api/auth';
import { Mail } from 'lucide-react';
import { t } from '@/lib/i18n';

interface ForgotPasswordProps {
    status?: string;
}

export default function ForgotPassword({ status }: ForgotPasswordProps) {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Gọi API để gửi email reset password
            await authAPI.forgotPassword({ email });
            setSuccess(true);
        } catch (error: any) {
            setError(error.message || 'Có lỗi xảy ra khi gửi email reset password');
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
                            Quên mật khẩu
                        </h1>
                        <p className="text-silver-gray">
                            Nhập email để nhận liên kết đặt lại mật khẩu
                        </p>
                    </div>

                    {status && (
                        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                            <p className="text-sm text-green-600">{status}</p>
                        </div>
                    )}

                    {success && (
                        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                            <p className="text-sm text-green-600">
                                Email đặt lại mật khẩu đã được gửi đến địa chỉ email bạn cung cấp.
                            </p>
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
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="manabi-input pl-12"
                                    placeholder="Nhập địa chỉ email"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="manabi-btn-primary w-full text-lg"
                            disabled={loading}
                        >
                            {loading ? 'Đang gửi...' : 'Gửi liên kết đặt lại mật khẩu'}
                        </button>
                    </form>

                    {/* Back to Login */}
                    <div className="mt-8 text-center">
                        <p className="text-charcoal-gray">
                            Nhớ mật khẩu?{' '}
                            <a
                                href="/login"
                                className="text-wisdom-blue font-medium hover:text-wisdom-blue/80 transition-colors"
                            >
                                Đăng nhập tại đây
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
