import React, { useState } from 'react';
import { Upload, Camera, FileText, AlertCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { authAPI } from '@/api/auth';
import { t } from '@/lib/i18n';

interface EkycUploadProps {
    onSuccess?: () => void;
}

export default function EkycUpload({ onSuccess }: EkycUploadProps) {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<any>({});
    const [formData, setFormData] = useState({
        document_type: 'national_id',
        document_number: '',
        document_front: null as File | null,
        document_back: null as File | null,
        selfie: null as File | null,
    });

    const handleFileChange = (field: string, file: File | null) => {
        setFormData(prev => ({ ...prev, [field]: file }));
        setErrors((prev: any) => ({ ...prev, [field]: undefined }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        const data = new FormData();
        data.append('document_type', formData.document_type);
        data.append('document_number', formData.document_number);
        if (formData.document_front) data.append('document_front', formData.document_front);
        if (formData.document_back) data.append('document_back', formData.document_back);
        if (formData.selfie) data.append('selfie', formData.selfie);

        try {
            await authAPI.submitEkyc(data);
            onSuccess?.();
        } catch (error: any) {
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            }
        } finally {
            setLoading(false);
        }
    };

    // Hiển thị trạng thái hiện tại
    if (user?.ekyc_status === 'pending') {
        return (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
                <AlertCircle className="w-12 h-12 text-yellow-600 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-yellow-800 mb-2">Đang chờ xác thực</h3>
                <p className="text-yellow-700">Hồ sơ eKYC của bạn đang được xem xét. Chúng tôi sẽ thông báo kết quả sớm nhất.</p>
            </div>
        );
    }

    if (user?.ekyc_status === 'verified') {
        return (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">✓</span>
                </div>
                <h3 className="text-lg font-semibold text-green-800 mb-2">Đã xác thực</h3>
                <p className="text-green-700">Tài khoản của bạn đã được xác thực thành công.</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                    Vui lòng cung cấp giấy tờ tùy thân và ảnh selfie để xác thực tài khoản giáo viên.
                </p>
            </div>

            {/* Loại giấy tờ */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Loại giấy tờ</label>
                <select
                    value={formData.document_type}
                    onChange={(e) => setFormData(prev => ({ ...prev, document_type: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="national_id">CMND/CCCD</option>
                    <option value="passport">Hộ chiếu</option>
                    <option value="driver_license">Bằng lái xe</option>
                </select>
            </div>

            {/* Số giấy tờ */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Số giấy tờ</label>
                <input
                    type="text"
                    value={formData.document_number}
                    onChange={(e) => setFormData(prev => ({ ...prev, document_number: e.target.value }))}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.document_number ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Nhập số giấy tờ"
                />
                {errors.document_number && (
                    <p className="mt-1 text-sm text-red-600">{errors.document_number[0]}</p>
                )}
            </div>

            {/* Upload ảnh mặt trước */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ảnh mặt trước giấy tờ
                </label>
                <div className={`border-2 border-dashed rounded-lg p-6 text-center ${
                    errors.document_front ? 'border-red-500' : 'border-gray-300'
                }`}>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange('document_front', e.target.files?.[0] || null)}
                        className="hidden"
                        id="document_front"
                    />
                    <label htmlFor="document_front" className="cursor-pointer">
                        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-sm text-gray-600">
                            {formData.document_front ? formData.document_front.name : 'Nhấn để chọn ảnh'}
                        </p>
                    </label>
                </div>
                {errors.document_front && (
                    <p className="mt-1 text-sm text-red-600">{errors.document_front[0]}</p>
                )}
            </div>

            {/* Upload ảnh mặt sau (tùy chọn) */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ảnh mặt sau giấy tờ (nếu có)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange('document_back', e.target.files?.[0] || null)}
                        className="hidden"
                        id="document_back"
                    />
                    <label htmlFor="document_back" className="cursor-pointer">
                        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-sm text-gray-600">
                            {formData.document_back ? formData.document_back.name : 'Nhấn để chọn ảnh'}
                        </p>
                    </label>
                </div>
            </div>

            {/* Upload ảnh selfie */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ảnh selfie cầm giấy tờ
                </label>
                <div className={`border-2 border-dashed rounded-lg p-6 text-center ${
                    errors.selfie ? 'border-red-500' : 'border-gray-300'
                }`}>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange('selfie', e.target.files?.[0] || null)}
                        className="hidden"
                        id="selfie"
                    />
                    <label htmlFor="selfie" className="cursor-pointer">
                        <Camera className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-sm text-gray-600">
                            {formData.selfie ? formData.selfie.name : 'Nhấn để chọn ảnh'}
                        </p>
                    </label>
                </div>
                {errors.selfie && (
                    <p className="mt-1 text-sm text-red-600">{errors.selfie[0]}</p>
                )}
            </div>

            {/* Submit button */}
            <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                {loading ? 'Đang gửi...' : 'Gửi xác thực'}
            </button>
        </form>
    );
}
