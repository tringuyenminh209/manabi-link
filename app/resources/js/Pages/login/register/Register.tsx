'use client';

import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, User, Phone, Calendar, MapPin } from 'lucide-react';

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        location: '',
        password: '',
        confirmPassword: '',
        userType: 'learner', // learner or teacher
        agreeToTerms: false,
        subscribeNewsletter: false,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle registration logic here
        console.log('Registration attempt:', formData);
    };

    return (
        <div className="min-h-screen bg-off-white flex" data-oid="ao6z9um">
            {/* Left side - Illustration/Image */}
            <div
                className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-wisdom-blue to-wisdom-blue/80 items-center justify-center p-12"
                data-oid="g1_dw6:"
            >
                <div className="text-center text-white max-w-md" data-oid="ymz.3pk">
                    <div className="mb-8" data-oid="ad9kd0k">
                        <div
                            className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6"
                            data-oid="fkvdfix"
                        >
                            <div
                                className="w-20 h-20 bg-energetic-yellow rounded-full flex items-center justify-center"
                                data-oid="mvquixd"
                            >
                                <span
                                    className="text-2xl font-bold text-charcoal-gray"
                                    data-oid=".7k11qx"
                                >
                                    ML
                                </span>
                            </div>
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold mb-4 font-inter" data-oid="acm33xx">
                        Tham gia cộng đồng Manabi Link
                    </h2>
                    <p className="text-lg opacity-90 leading-relaxed mb-6" data-oid="_lhm7hh">
                        Khám phá thế giới tri thức mới, kết nối với những người thầy tuyệt vời và
                        bắt đầu hành trình học tập của bạn ngay hôm nay.
                    </p>
                    <div className="space-y-3 text-left" data-oid="ole_-v-">
                        <div className="flex items-center space-x-3" data-oid="jom1dli">
                            <div
                                className="w-6 h-6 bg-energetic-yellow rounded-full flex items-center justify-center"
                                data-oid="iiu-mzz"
                            >
                                <span
                                    className="text-xs font-bold text-charcoal-gray"
                                    data-oid="mpq-zq1"
                                >
                                    ✓
                                </span>
                            </div>
                            <span className="text-sm" data-oid="06u8mu1">
                                Truy cập hàng nghìn khóa học chất lượng
                            </span>
                        </div>
                        <div className="flex items-center space-x-3" data-oid="fikno:c">
                            <div
                                className="w-6 h-6 bg-energetic-yellow rounded-full flex items-center justify-center"
                                data-oid=":d-e3v9"
                            >
                                <span
                                    className="text-xs font-bold text-charcoal-gray"
                                    data-oid="w7i4.no"
                                >
                                    ✓
                                </span>
                            </div>
                            <span className="text-sm" data-oid="h1ftmy7">
                                Kết nối với giáo viên chuyên nghiệp
                            </span>
                        </div>
                        <div className="flex items-center space-x-3" data-oid="h:eb8pc">
                            <div
                                className="w-6 h-6 bg-energetic-yellow rounded-full flex items-center justify-center"
                                data-oid="zdjj336"
                            >
                                <span
                                    className="text-xs font-bold text-charcoal-gray"
                                    data-oid="q5bimtc"
                                >
                                    ✓
                                </span>
                            </div>
                            <span className="text-sm" data-oid="17hv_y-">
                                Học tập linh hoạt theo lịch trình riêng
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right side - Registration Form */}
            <div
                className="w-full lg:w-1/2 flex items-center justify-center p-8"
                data-oid="-ztte:z"
            >
                <div className="w-full max-w-md" data-oid="5uuolcu">
                    {/* Logo for mobile */}
                    <div className="lg:hidden text-center mb-8" data-oid="cf4o7:7">
                        <div
                            className="w-16 h-16 bg-wisdom-blue rounded-full flex items-center justify-center mx-auto mb-4"
                            data-oid=".x9jwbz"
                        >
                            <span className="text-xl font-bold text-white" data-oid="1azxw2_">
                                ML
                            </span>
                        </div>
                        <h1
                            className="text-2xl font-bold text-charcoal-gray font-inter"
                            data-oid="fbip9gn"
                        >
                            Manabi Link
                        </h1>
                    </div>

                    {/* Registration Form */}
                    <div className="manabi-card p-8" data-oid="8_6ryet">
                        <div className="text-center mb-8" data-oid="::e-3yq">
                            <h1
                                className="text-3xl font-bold text-charcoal-gray mb-2 font-inter"
                                data-oid="c277ew7"
                            >
                                Đăng ký tài khoản
                            </h1>
                            <p className="text-silver-gray" data-oid="qtibqxu">
                                Tạo tài khoản mới để bắt đầu hành trình học tập cùng Manabi Link
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6" data-oid="5kivr5q">
                            {/* User Type Selection */}
                            <div data-oid="h5a8480">
                                <label
                                    className="block text-sm font-medium text-charcoal-gray mb-3"
                                    data-oid="07qhwxy"
                                >
                                    Bạn muốn tham gia với vai trò gì?
                                </label>
                                <div className="grid grid-cols-2 gap-3" data-oid="4iw_f7c">
                                    <label
                                        className={`flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer transition-all ${
                                            formData.userType === 'learner'
                                                ? 'border-wisdom-blue bg-wisdom-blue/5 text-wisdom-blue'
                                                : 'border-input-border text-charcoal-gray hover:border-wisdom-blue/50'
                                        }`}
                                        data-oid="ed073.a"
                                    >
                                        <input
                                            type="radio"
                                            name="userType"
                                            value="learner"
                                            checked={formData.userType === 'learner'}
                                            onChange={handleInputChange}
                                            className="sr-only"
                                            data-oid="yonnmxx"
                                        />

                                        <User className="w-5 h-5 mr-2" data-oid="mzpq:4w" />
                                        <span className="font-medium" data-oid=".e2p.:m">
                                            Học viên
                                        </span>
                                    </label>
                                    <label
                                        className={`flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer transition-all ${
                                            formData.userType === 'teacher'
                                                ? 'border-wisdom-blue bg-wisdom-blue/5 text-wisdom-blue'
                                                : 'border-input-border text-charcoal-gray hover:border-wisdom-blue/50'
                                        }`}
                                        data-oid="dc:::rl"
                                    >
                                        <input
                                            type="radio"
                                            name="userType"
                                            value="teacher"
                                            checked={formData.userType === 'teacher'}
                                            onChange={handleInputChange}
                                            className="sr-only"
                                            data-oid="t49nveu"
                                        />

                                        <User className="w-5 h-5 mr-2" data-oid="dl6mah9" />
                                        <span className="font-medium" data-oid="3cbu88:">
                                            Giáo viên
                                        </span>
                                    </label>
                                </div>
                            </div>

                            {/* Full Name Field */}
                            <div data-oid="qmkp2b5">
                                <label
                                    htmlFor="fullName"
                                    className="block text-sm font-medium text-charcoal-gray mb-2"
                                    data-oid="detg4zv"
                                >
                                    Họ và tên *
                                </label>
                                <div className="relative" data-oid="v4pi5xn">
                                    <User
                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-silver-gray w-5 h-5"
                                        data-oid="4rxterw"
                                    />

                                    <input
                                        id="fullName"
                                        name="fullName"
                                        type="text"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        className="manabi-input pl-12"
                                        placeholder="Nhập họ và tên đầy đủ"
                                        required
                                        data-oid="vswr.d7"
                                    />
                                </div>
                            </div>

                            {/* Email Field */}
                            <div data-oid="g_2vk25">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-charcoal-gray mb-2"
                                    data-oid="r93j_tb"
                                >
                                    Email *
                                </label>
                                <div className="relative" data-oid="bom78b_">
                                    <Mail
                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-silver-gray w-5 h-5"
                                        data-oid="o-28woy"
                                    />

                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="manabi-input pl-12"
                                        placeholder="Nhập địa chỉ email"
                                        required
                                        data-oid="29oc4e1"
                                    />
                                </div>
                            </div>

                            {/* Phone and Date of Birth Row */}
                            <div
                                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                                data-oid="i4pmr9k"
                            >
                                <div data-oid="c.m3oqk">
                                    <label
                                        htmlFor="phone"
                                        className="block text-sm font-medium text-charcoal-gray mb-2"
                                        data-oid="ve0qgtp"
                                    >
                                        Số điện thoại
                                    </label>
                                    <div className="relative" data-oid="-qysswr">
                                        <Phone
                                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-silver-gray w-5 h-5"
                                            data-oid="0im0bhs"
                                        />

                                        <input
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="manabi-input pl-12"
                                            placeholder="0123456789"
                                            data-oid="_66b.-6"
                                        />
                                    </div>
                                </div>
                                <div data-oid="j2xb-c9">
                                    <label
                                        htmlFor="dateOfBirth"
                                        className="block text-sm font-medium text-charcoal-gray mb-2"
                                        data-oid="0dhneyp"
                                    >
                                        Ngày sinh
                                    </label>
                                    <div className="relative" data-oid="ds:w.l8">
                                        <Calendar
                                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-silver-gray w-5 h-5"
                                            data-oid="krwvfu4"
                                        />

                                        <input
                                            id="dateOfBirth"
                                            name="dateOfBirth"
                                            type="date"
                                            value={formData.dateOfBirth}
                                            onChange={handleInputChange}
                                            className="manabi-input pl-12"
                                            data-oid="ae2n5n0"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Location Field */}
                            <div data-oid="l7cxsht">
                                <label
                                    htmlFor="location"
                                    className="block text-sm font-medium text-charcoal-gray mb-2"
                                    data-oid="_p_sia1"
                                >
                                    Địa điểm
                                </label>
                                <div className="relative" data-oid="i4cji85">
                                    <MapPin
                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-silver-gray w-5 h-5"
                                        data-oid="li5c5k1"
                                    />

                                    <select
                                        id="location"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        className="manabi-input pl-12"
                                        data-oid="q0pbo0d"
                                    >
                                        <option value="" data-oid="p4n8ve9">
                                            Chọn tỉnh/thành phố
                                        </option>
                                        <option value="hanoi" data-oid="y:sr4vz">
                                            Hà Nội
                                        </option>
                                        <option value="hcm" data-oid=":ec3:n5">
                                            TP. Hồ Chí Minh
                                        </option>
                                        <option value="danang" data-oid="mm:iw0t">
                                            Đà Nẵng
                                        </option>
                                        <option value="haiphong" data-oid="246awwt">
                                            Hải Phòng
                                        </option>
                                        <option value="cantho" data-oid="zq-ow-i">
                                            Cần Thơ
                                        </option>
                                        <option value="other" data-oid="wox0oia">
                                            Khác
                                        </option>
                                    </select>
                                </div>
                            </div>

                            {/* Password Fields */}
                            <div
                                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                                data-oid="bsxogm_"
                            >
                                <div data-oid="7x.s._e">
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium text-charcoal-gray mb-2"
                                        data-oid="5zp2_br"
                                    >
                                        Mật khẩu *
                                    </label>
                                    <div className="relative" data-oid="h.feb7o">
                                        <Lock
                                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-silver-gray w-5 h-5"
                                            data-oid="l2wmjt:"
                                        />

                                        <input
                                            id="password"
                                            name="password"
                                            type={showPassword ? 'text' : 'password'}
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            className="manabi-input pl-12 pr-12"
                                            placeholder="Tối thiểu 8 ký tự"
                                            required
                                            data-oid="0uv_oh3"
                                        />

                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-silver-gray hover:text-charcoal-gray transition-colors"
                                            data-oid="1hdn5d4"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="w-5 h-5" data-oid="0hbz_3s" />
                                            ) : (
                                                <Eye className="w-5 h-5" data-oid="2n59co-" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                                <div data-oid="8bsz1d3">
                                    <label
                                        htmlFor="confirmPassword"
                                        className="block text-sm font-medium text-charcoal-gray mb-2"
                                        data-oid="gpmf-_n"
                                    >
                                        Xác nhận mật khẩu *
                                    </label>
                                    <div className="relative" data-oid="jt_y0yi">
                                        <Lock
                                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-silver-gray w-5 h-5"
                                            data-oid="8i:0fiz"
                                        />

                                        <input
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            value={formData.confirmPassword}
                                            onChange={handleInputChange}
                                            className="manabi-input pl-12 pr-12"
                                            placeholder="Nhập lại mật khẩu"
                                            required
                                            data-oid="u4zqipb"
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowConfirmPassword(!showConfirmPassword)
                                            }
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-silver-gray hover:text-charcoal-gray transition-colors"
                                            data-oid="4zm.:37"
                                        >
                                            {showConfirmPassword ? (
                                                <EyeOff className="w-5 h-5" data-oid="__xqh7a" />
                                            ) : (
                                                <Eye className="w-5 h-5" data-oid="sb5p6.q" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Terms and Newsletter */}
                            <div className="space-y-3" data-oid="3_.qegd">
                                <label className="flex items-start space-x-3" data-oid="1k_..k_">
                                    <input
                                        type="checkbox"
                                        name="agreeToTerms"
                                        checked={formData.agreeToTerms}
                                        onChange={handleInputChange}
                                        className="w-4 h-4 text-wisdom-blue border-input-border rounded focus:ring-wisdom-blue focus:ring-2 mt-1"
                                        required
                                        data-oid="j:ei86b"
                                    />

                                    <span className="text-sm text-charcoal-gray" data-oid="ac460sx">
                                        Tôi đồng ý với{' '}
                                        <a
                                            href="#"
                                            className="text-wisdom-blue hover:text-wisdom-blue/80 font-medium"
                                            data-oid="ccktuys"
                                        >
                                            Điều khoản sử dụng
                                        </a>{' '}
                                        và{' '}
                                        <a
                                            href="#"
                                            className="text-wisdom-blue hover:text-wisdom-blue/80 font-medium"
                                            data-oid="zp1t_zo"
                                        >
                                            Chính sách bảo mật
                                        </a>{' '}
                                        của Manabi Link *
                                    </span>
                                </label>
                                <label className="flex items-start space-x-3" data-oid="iczn-qw">
                                    <input
                                        type="checkbox"
                                        name="subscribeNewsletter"
                                        checked={formData.subscribeNewsletter}
                                        onChange={handleInputChange}
                                        className="w-4 h-4 text-wisdom-blue border-input-border rounded focus:ring-wisdom-blue focus:ring-2 mt-1"
                                        data-oid="rm99:gj"
                                    />

                                    <span className="text-sm text-charcoal-gray" data-oid="1k1gssg">
                                        Tôi muốn nhận thông tin về các khóa học mới và ưu đãi đặc
                                        biệt
                                    </span>
                                </label>
                            </div>

                            {/* Register Button */}
                            <button
                                type="submit"
                                className="manabi-btn-primary w-full text-lg"
                                disabled={!formData.agreeToTerms}
                                data-oid="egdyfzz"
                            >
                                Tạo tài khoản
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="my-8 flex items-center" data-oid="liz:1m.">
                            <div
                                className="flex-1 border-t border-light-border"
                                data-oid="v_a40rc"
                            ></div>
                            <span
                                className="px-4 text-sm text-silver-gray bg-white"
                                data-oid="bvq1xwg"
                            >
                                hoặc
                            </span>
                            <div
                                className="flex-1 border-t border-light-border"
                                data-oid="dpik2s3"
                            ></div>
                        </div>

                        {/* Social Registration */}
                        <div className="space-y-3" data-oid="9.xmw..">
                            <button
                                className="w-full flex items-center justify-center px-4 py-3 border border-input-border rounded-lg bg-white text-charcoal-gray font-medium hover:shadow-md transition-all duration-200"
                                data-oid="-s2xpaw"
                            >
                                <svg
                                    className="w-5 h-5 mr-3"
                                    viewBox="0 0 24 24"
                                    data-oid="4_h-kl3"
                                >
                                    <path
                                        fill="#4285F4"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        data-oid="b82-s_x"
                                    />

                                    <path
                                        fill="#34A853"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        data-oid="jinmk70"
                                    />

                                    <path
                                        fill="#FBBC05"
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        data-oid="zvsput5"
                                    />

                                    <path
                                        fill="#EA4335"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        data-oid="zd93o:e"
                                    />
                                </svg>
                                Đăng ký với Google
                            </button>

                            <button
                                className="w-full flex items-center justify-center px-4 py-3 border border-input-border rounded-lg bg-white text-charcoal-gray font-medium hover:shadow-md transition-all duration-200"
                                data-oid="iunijo."
                            >
                                <svg
                                    className="w-5 h-5 mr-3"
                                    fill="#1877F2"
                                    viewBox="0 0 24 24"
                                    data-oid="w0kb:n."
                                >
                                    <path
                                        d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                                        data-oid="v.3q550"
                                    />
                                </svg>
                                Đăng ký với Facebook
                            </button>
                        </div>

                        {/* Login Link */}
                        <div className="mt-8 text-center" data-oid="ap.a.38">
                            <p className="text-charcoal-gray" data-oid="6yxa9vc">
                                Đã có tài khoản?{' '}
                                <a
                                    href="/login"
                                    className="text-wisdom-blue font-medium hover:text-wisdom-blue/80 transition-colors"
                                    data-oid=":ep2f4t"
                                >
                                    Đăng nhập tại đây
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
