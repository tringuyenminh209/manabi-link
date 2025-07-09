import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Home, ArrowLeft } from 'lucide-react';

export default function UnauthorizedPage() {
    return (
        <div className="min-h-screen bg-off-white flex items-center justify-center">
            <div className="max-w-md w-full text-center">
                <div className="mb-8">
                    <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Shield className="w-12 h-12 text-red-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-charcoal-gray mb-4">
                        Truy cập bị từ chối
                    </h1>
                    <p className="text-silver-gray text-lg mb-8">
                        Bạn không có quyền truy cập vào trang này. Vui lòng liên hệ quản trị viên nếu bạn nghĩ đây là lỗi.
                    </p>
                </div>

                <div className="space-y-4">
                    <Link
                        to="/"
                        className="manabi-btn-primary w-full flex items-center justify-center"
                    >
                        <Home className="w-5 h-5 mr-2" />
                        Về trang chủ
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="w-full flex items-center justify-center px-6 py-3 border border-input-border rounded-lg text-charcoal-gray hover:bg-gray-50 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Quay lại
                    </button>
                </div>

                <div className="mt-8 pt-8 border-t border-light-border">
                    <p className="text-sm text-silver-gray">
                        Mã lỗi: 403 - Forbidden
                    </p>
                </div>
            </div>
        </div>
    );
}
