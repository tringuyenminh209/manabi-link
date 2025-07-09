'use client';

import { CheckCircle, Mail, ArrowRight, Home, BookOpen, Users } from 'lucide-react';
import { router } from '@inertiajs/react';
import { t } from '@/lib/i18n';

export default function RegisterCompletePage() {
    const handleGoToLogin = () => {
        router.visit('/login');
    };

    const handleGoHome = () => {
        router.visit('/');
    };

    return (
        <div
            className="min-h-screen bg-off-white flex items-center justify-center p-4"
            data-oid="7.q3-oq"
        >
            <div className="w-full max-w-2xl" data-oid="9s9ybp9">
                {/* Success Card */}
                <div className="manabi-card p-8 md:p-12 text-center" data-oid="bmmc.is">
                    {/* Success Icon */}
                    <div className="mb-8" data-oid="wwanvht">
                        <div
                            className="w-24 h-24 bg-success-green/10 rounded-full flex items-center justify-center mx-auto mb-6"
                            data-oid="8_hstxl"
                        >
                            <CheckCircle
                                className="w-12 h-12 text-success-green"
                                data-oid="5ep04hp"
                            />
                        </div>
                    </div>

                    {/* Main Message */}
                    <div className="mb-8" data-oid="c3f_vs4">
                        <h1
                            className="text-4xl font-bold text-charcoal-gray mb-4 font-inter"
                            data-oid="vha-rg9"
                        >
                            Chúc mừng! 🎉
                        </h1>
                        <h2
                            className="text-2xl font-semibold text-wisdom-blue mb-4 font-inter"
                            data-oid="s4bog3w"
                        >
                            Tài khoản của bạn đã được tạo thành công
                        </h2>
                        <p className="text-lg text-silver-gray leading-relaxed" data-oid="7nq80xs">
                            Chào mừng bạn đến với cộng đồng Manabi Link! Hành trình học tập tuyệt
                            vời của bạn bắt đầu từ đây.
                        </p>
                    </div>

                    {/* Email Verification Notice */}
                    <div
                        className="bg-wisdom-blue/5 border border-wisdom-blue/20 rounded-lg p-6 mb-8"
                        data-oid="t4z-iqz"
                    >
                        <div className="flex items-center justify-center mb-3" data-oid="xqie:::">
                            <Mail className="w-6 h-6 text-wisdom-blue mr-2" data-oid=":8mt4k8" />
                            <h3
                                className="text-lg font-semibold text-wisdom-blue"
                                data-oid="te:h6d4"
                            >
                                Kiểm tra email của bạn
                            </h3>
                        </div>
                        <p
                            className="text-charcoal-gray text-sm leading-relaxed"
                            data-oid="ohq5.k6"
                        >
                            Chúng tôi đã gửi một email xác nhận đến địa chỉ email bạn đã đăng ký.
                            Vui lòng kiểm tra hộp thư và nhấp vào liên kết xác nhận để kích hoạt tài
                            khoản.
                        </p>
                        <p className="text-silver-gray text-xs mt-2" data-oid="j3oo8qi">
                            Không thấy email? Kiểm tra thư mục spam hoặc thư rác.
                        </p>
                    </div>

                    {/* Next Steps */}
                    <div className="mb-8" data-oid=":5nr6aj">
                        <h3
                            className="text-xl font-semibold text-charcoal-gray mb-6 font-inter"
                            data-oid="22esvj9"
                        >
                            Bước tiếp theo
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4" data-oid="bcpbb7g">
                            <div
                                className="bg-off-white border border-light-border rounded-lg p-4"
                                data-oid="6174-8e"
                            >
                                <div
                                    className="w-12 h-12 bg-energetic-yellow/20 rounded-full flex items-center justify-center mx-auto mb-3"
                                    data-oid="x.ymnur"
                                >
                                    <Mail
                                        className="w-6 h-6 text-energetic-yellow"
                                        data-oid="lfygxqc"
                                    />
                                </div>
                                <h4
                                    className="font-medium text-charcoal-gray mb-2"
                                    data-oid="dnkrt46"
                                >
                                    1. Xác nhận email
                                </h4>
                                <p className="text-sm text-silver-gray" data-oid="16g03.0">
                                    Kích hoạt tài khoản qua email
                                </p>
                            </div>
                            <div
                                className="bg-off-white border border-light-border rounded-lg p-4"
                                data-oid="2lfb38n"
                            >
                                <div
                                    className="w-12 h-12 bg-wisdom-blue/20 rounded-full flex items-center justify-center mx-auto mb-3"
                                    data-oid="91-f4pg"
                                >
                                    <Users
                                        className="w-6 h-6 text-wisdom-blue"
                                        data-oid="gvc0r4g"
                                    />
                                </div>
                                <h4
                                    className="font-medium text-charcoal-gray mb-2"
                                    data-oid="vf6qhm4"
                                >
                                    2. Hoàn thiện hồ sơ
                                </h4>
                                <p className="text-sm text-silver-gray" data-oid=":r_ts:y">
                                    Thêm thông tin cá nhân
                                </p>
                            </div>
                            <div
                                className="bg-off-white border border-light-border rounded-lg p-4"
                                data-oid="joymw-p"
                            >
                                <div
                                    className="w-12 h-12 bg-success-green/20 rounded-full flex items-center justify-center mx-auto mb-3"
                                    data-oid="fp6yx_u"
                                >
                                    <BookOpen
                                        className="w-6 h-6 text-success-green"
                                        data-oid="s3wwtci"
                                    />
                                </div>
                                <h4
                                    className="font-medium text-charcoal-gray mb-2"
                                    data-oid="lekf4cy"
                                >
                                    3. Khám phá khóa học
                                </h4>
                                <p className="text-sm text-silver-gray" data-oid="zsvo.3n">
                                    Tìm kiếm và đăng ký học
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-4" data-oid="km4ujaj">
                        <button
                            onClick={handleGoToLogin}
                            className="manabi-btn-primary w-full text-lg flex items-center justify-center"
                            data-oid="i:5:z.t"
                        >
                            Đăng nhập ngay
                            <ArrowRight className="w-5 h-5 ml-2" data-oid="-csd4z-" />
                        </button>

                        <button
                            onClick={handleGoHome}
                            className="manabi-btn-secondary w-full text-lg flex items-center justify-center"
                            data-oid="btrxq2d"
                        >
                            <Home className="w-5 h-5 mr-2" data-oid="dn_0lhm" />
                            Về trang chủ
                        </button>
                    </div>

                    {/* Additional Info */}
                    <div className="mt-8 pt-6 border-t border-light-border" data-oid="s6-86sr">
                        <p className="text-sm text-silver-gray" data-oid="rzh.l6u">
                            Cần hỗ trợ? Liên hệ với chúng tôi qua{' '}
                            <a
                                href="mailto:support@manabilink.com"
                                className="text-wisdom-blue hover:text-wisdom-blue/80 font-medium"
                                data-oid="i3hwfup"
                            >
                                support@manabilink.com
                            </a>
                        </p>
                    </div>
                </div>

                {/* Welcome Benefits */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6" data-oid="h1tb_xj">
                    <div className="manabi-card p-6" data-oid="us2jhps">
                        <div className="flex items-start space-x-4" data-oid="s82j1db">
                            <div
                                className="w-10 h-10 bg-energetic-yellow/20 rounded-full flex items-center justify-center flex-shrink-0"
                                data-oid="ufir_ok"
                            >
                                <BookOpen
                                    className="w-5 h-5 text-energetic-yellow"
                                    data-oid="wridy1h"
                                />
                            </div>
                            <div data-oid="d:rcc5u">
                                <h4
                                    className="font-semibold text-charcoal-gray mb-2"
                                    data-oid="m9x:6::"
                                >
                                    Hàng nghìn khóa học
                                </h4>
                                <p className="text-sm text-silver-gray" data-oid="g6xjyat">
                                    Từ kỹ năng cơ bản đến chuyên sâu, tất cả đều có tại Manabi Link
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="manabi-card p-6" data-oid="1._1wk2">
                        <div className="flex items-start space-x-4" data-oid="idn5ytf">
                            <div
                                className="w-10 h-10 bg-wisdom-blue/20 rounded-full flex items-center justify-center flex-shrink-0"
                                data-oid=":jfpzc1"
                            >
                                <Users className="w-5 h-5 text-wisdom-blue" data-oid="ar31rqc" />
                            </div>
                            <div data-oid="6cuf5a1">
                                <h4
                                    className="font-semibold text-charcoal-gray mb-2"
                                    data-oid="w0s_a3z"
                                >
                                    Cộng đồng học tập
                                </h4>
                                <p className="text-sm text-silver-gray" data-oid="0kaxrft">
                                    Kết nối với hàng nghìn học viên và giáo viên tài năng
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
