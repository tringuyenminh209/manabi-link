'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
    CreditCard,
    Landmark,
    ShieldCheck,
    ArrowLeft,
    Calendar,
    User,
    Clock,
    CheckCircle,
    Copy,
    AlertTriangle,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

// --- Interfaces and Dummy Data ---
const bookingData = {
    courseId: 'guitar-101',
    courseTitle: 'Guitar cơ bản cho người mới bắt đầu',
    coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop',
    teacher: {
        name: 'Nguyễn Văn Minh',
        avatar: '/api/placeholder/40/40?name=M',
    },
    schedule: 'Thứ Ba, 25 tháng 6, 2025 - 19:00',
    price: 500000,
    platform_fee: 0,
};

const paymentMethods = [
    {
        id: 'stripe',
        label: 'Thẻ tín dụng/Ghi nợ',
        icon: CreditCard,
        description: 'Thanh toán an toàn qua Stripe',
    },
    {
        id: 'bank',
        label: 'Chuyển khoản ngân hàng',
        icon: Landmark,
        description: 'Chuyển khoản trực tiếp',
    },
];

const bankInfo = {
    bankName: 'Ngân hàng TMCP Kỹ thương Việt Nam (Techcombank)',
    accountNumber: '1903xxxxxxxx',
    accountName: 'CONG TY TNHH MANABI LINK',
    content: `TT12345 ${bookingData.courseTitle}`,
};

// --- Main Component ---
const BookingPage = () => {
    const [step, setStep] = useState<'confirm' | 'success'>('confirm');
    const [selectedPayment, setSelectedPayment] = useState(paymentMethods[0].id);

    const formatCurrency = (amount: number) =>
        new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

    const handleCopyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        // Optional: Show a toast notification "Copied!"
    };

    if (step === 'success') {
        return (
            <div
                className="min-h-screen bg-off-white flex items-center justify-center p-4"
                data-oid="sktw24n"
            >
                <Card className="text-center max-w-lg w-full p-8 md:p-12" data-oid=".1qq_bh">
                    <div
                        className="w-24 h-24 bg-success-green/10 rounded-full flex items-center justify-center mx-auto mb-6"
                        data-oid="9x6bc9l"
                    >
                        <CheckCircle className="w-12 h-12 text-success-green" data-oid="2btktc8" />
                    </div>
                    <h1 className="manabi-heading-1 mb-4" data-oid="dpghq9:">
                        Đặt lịch thành công!
                    </h1>
                    <p className="manabi-text-muted mb-8" data-oid="b0w.sqr">
                        Cảm ơn bạn đã tin tưởng Manabi Link. Một email xác nhận đã được gửi đến bạn.
                    </p>
                    <div className="space-y-3" data-oid="fhkg4it">
                        <Link href="/user-dashboard/my-bookings" data-oid="ncoklnf">
                            <Button variant="primary" className="w-full" data-oid="zhyd-e6">
                                Xem lại lịch học
                            </Button>
                        </Link>
                        <Link href="/course" data-oid=".:2rrk:">
                            <Button variant="secondary" className="w-full" data-oid="vq34zop">
                                Khám phá khóa học khác
                            </Button>
                        </Link>
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-off-white font-inter" data-oid="9nnygxz">
            <div className="manabi-container p-4 sm:p-8" data-oid="z18338m">
                {/* Progress Bar */}
                <div className="mb-8" data-oid="zi_38gp">
                    <div className="flex items-center justify-between mb-4" data-oid="9c5o_91">
                        <div className="flex items-center gap-2" data-oid="r3p-8qs">
                            <div
                                className="w-8 h-8 bg-wisdom-blue text-white rounded-full flex items-center justify-center text-sm font-bold"
                                data-oid="h7wj0xc"
                            >
                                1
                            </div>
                            <span className="font-medium text-charcoal-gray" data-oid="5j43fox">
                                Xác nhận
                            </span>
                        </div>
                        <div className="flex-1 h-0.5 bg-light-border mx-4" data-oid=":0n_hq1"></div>
                        <div className="flex items-center gap-2" data-oid="65g2cey">
                            <div
                                className="w-8 h-8 bg-light-border text-silver-gray rounded-full flex items-center justify-center text-sm font-bold"
                                data-oid="h8__-of"
                            >
                                2
                            </div>
                            <span className="font-medium text-silver-gray" data-oid="6_tz-2v">
                                Thanh toán
                            </span>
                        </div>
                        <div className="flex-1 h-0.5 bg-light-border mx-4" data-oid="5:4mem5"></div>
                        <div className="flex items-center gap-2" data-oid="d4o97-h">
                            <div
                                className="w-8 h-8 bg-light-border text-silver-gray rounded-full flex items-center justify-center text-sm font-bold"
                                data-oid="mp-zn1r"
                            >
                                3
                            </div>
                            <span className="font-medium text-silver-gray" data-oid="3yuv8k5">
                                Hoàn tất
                            </span>
                        </div>
                    </div>
                </div>

                {/* Breadcrumbs */}
                <nav className="text-sm text-silver-gray mb-6 flex items-center" data-oid="fmmqoq3">
                    <Link href="/" className="hover:text-wisdom-blue" data-oid="lz73wpb">
                        Trang chủ
                    </Link>
                    <span className="mx-2" data-oid="lyye9w:">
                        /
                    </span>
                    <Link href="/course" className="hover:text-wisdom-blue" data-oid="sv_n.s.">
                        Khóa học
                    </Link>
                    <span className="mx-2" data-oid="ox0ow3q">
                        /
                    </span>
                    <span className="text-charcoal-gray font-medium" data-oid="9q5lz4-">
                        Thanh toán
                    </span>
                </nav>

                <div className="flex flex-col lg:flex-row gap-8" data-oid=":q0rqfw">
                    {/* Left Panel: Payment Details */}
                    <div className="lg:w-2/3" data-oid="xu64db_">
                        <Card data-oid="nv98hcc">
                            <CardHeader data-oid="b5i8em4">
                                <h1 className="manabi-heading-2" data-oid="wz.jcbj">
                                    Xác nhận và Thanh toán
                                </h1>
                            </CardHeader>
                            <CardBody className="space-y-8" data-oid="dhelw-l">
                                {/* Payment Method Selection */}
                                <div data-oid="1hmhs7:">
                                    <h2 className="manabi-heading-3 mb-4" data-oid="t.izkrw">
                                        Chọn phương thức thanh toán
                                    </h2>
                                    <div className="grid sm:grid-cols-2 gap-4" data-oid="h.0vn:s">
                                        {paymentMethods.map((method) => (
                                            <div
                                                key={method.id}
                                                onClick={() => setSelectedPayment(method.id)}
                                                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                                    selectedPayment === method.id
                                                        ? 'border-wisdom-blue bg-wisdom-blue/5'
                                                        : 'border-light-border hover:border-silver-gray'
                                                }`}
                                                data-oid="sm.l8np"
                                            >
                                                <div
                                                    className="flex items-center justify-between"
                                                    data-oid="vr-1n7s"
                                                >
                                                    <div
                                                        className="flex items-center gap-3"
                                                        data-oid="wu96_up"
                                                    >
                                                        <method.icon
                                                            className="w-6 h-6 text-wisdom-blue"
                                                            data-oid="nw43y35"
                                                        />

                                                        <div data-oid="8z32:cm">
                                                            <span
                                                                className="font-semibold text-charcoal-gray"
                                                                data-oid="_ihkk_0"
                                                            >
                                                                {method.label}
                                                            </span>
                                                            <p
                                                                className="text-sm text-silver-gray mt-1"
                                                                data-oid="shhttnr"
                                                            >
                                                                {method.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                                            selectedPayment === method.id
                                                                ? 'border-wisdom-blue'
                                                                : 'border-silver-gray'
                                                        }`}
                                                        data-oid="6d79s7j"
                                                    >
                                                        {selectedPayment === method.id && (
                                                            <div
                                                                className="w-2.5 h-2.5 rounded-full bg-wisdom-blue"
                                                                data-oid="-29cup8"
                                                            ></div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Payment Forms */}
                                {selectedPayment === 'stripe' && (
                                    <div className="space-y-4" data-oid="asusxhe">
                                        <h3
                                            className="font-semibold text-charcoal-gray"
                                            data-oid="fwslbk5"
                                        >
                                            Thông tin thẻ
                                        </h3>
                                        <div className="space-y-4" data-oid="o1dqvvk">
                                            <input
                                                type="text"
                                                placeholder="Số thẻ"
                                                className="manabi-input"
                                                data-oid="je62ye1"
                                            />

                                            <div
                                                className="grid grid-cols-2 gap-4"
                                                data-oid="j2sl.ln"
                                            >
                                                <input
                                                    type="text"
                                                    placeholder="MM/YY"
                                                    className="manabi-input"
                                                    data-oid="dnh5l:o"
                                                />

                                                <input
                                                    type="text"
                                                    placeholder="CVC"
                                                    className="manabi-input"
                                                    data-oid="f_xsxz9"
                                                />
                                            </div>
                                            <input
                                                type="text"
                                                placeholder="Tên chủ thẻ"
                                                className="manabi-input"
                                                data-oid="pfwa-ji"
                                            />
                                        </div>
                                    </div>
                                )}

                                {selectedPayment === 'bank' && (
                                    <div className="space-y-4" data-oid="f:z0:i5">
                                        <h3
                                            className="font-semibold text-charcoal-gray"
                                            data-oid="khj9iog"
                                        >
                                            Thông tin chuyển khoản
                                        </h3>
                                        <div
                                            className="bg-off-white p-4 rounded-lg space-y-3"
                                            data-oid="9c6zsp1"
                                        >
                                            <div
                                                className="flex items-center justify-between"
                                                data-oid="9kh57av"
                                            >
                                                <span
                                                    className="text-silver-gray"
                                                    data-oid="ef3x-43"
                                                >
                                                    Ngân hàng:
                                                </span>
                                                <div
                                                    className="flex items-center gap-2"
                                                    data-oid="qvx:sse"
                                                >
                                                    <span
                                                        className="font-medium"
                                                        data-oid="8l27zzh"
                                                    >
                                                        {bankInfo.bankName}
                                                    </span>
                                                </div>
                                            </div>
                                            <div
                                                className="flex items-center justify-between"
                                                data-oid="4ajs996"
                                            >
                                                <span
                                                    className="text-silver-gray"
                                                    data-oid=".um_wph"
                                                >
                                                    Số tài khoản:
                                                </span>
                                                <div
                                                    className="flex items-center gap-2"
                                                    data-oid="rjh5-yu"
                                                >
                                                    <span
                                                        className="font-medium font-mono"
                                                        data-oid="7c6_mxa"
                                                    >
                                                        {bankInfo.accountNumber}
                                                    </span>
                                                    <button
                                                        onClick={() =>
                                                            handleCopyToClipboard(
                                                                bankInfo.accountNumber,
                                                            )
                                                        }
                                                        className="p-1 text-silver-gray hover:text-wisdom-blue transition-colors"
                                                        title="Sao chép"
                                                        data-oid="x7oyxr9"
                                                    >
                                                        <Copy
                                                            className="w-4 h-4"
                                                            data-oid="m2:-khn"
                                                        />
                                                    </button>
                                                </div>
                                            </div>
                                            <div
                                                className="flex items-center justify-between"
                                                data-oid="xzlo:py"
                                            >
                                                <span
                                                    className="text-silver-gray"
                                                    data-oid="rdwq8ax"
                                                >
                                                    Tên tài khoản:
                                                </span>
                                                <div
                                                    className="flex items-center gap-2"
                                                    data-oid="enzylm:"
                                                >
                                                    <span
                                                        className="font-medium"
                                                        data-oid="c7m12zh"
                                                    >
                                                        {bankInfo.accountName}
                                                    </span>
                                                </div>
                                            </div>
                                            <div
                                                className="flex items-center justify-between"
                                                data-oid="jrjae.8"
                                            >
                                                <span
                                                    className="text-silver-gray"
                                                    data-oid="fmbwfed"
                                                >
                                                    Nội dung:
                                                </span>
                                                <div
                                                    className="flex items-center gap-2"
                                                    data-oid=".ywhlop"
                                                >
                                                    <span
                                                        className="font-medium font-mono text-sm"
                                                        data-oid="viao0.c"
                                                    >
                                                        {bankInfo.content}
                                                    </span>
                                                    <button
                                                        onClick={() =>
                                                            handleCopyToClipboard(bankInfo.content)
                                                        }
                                                        className="p-1 text-silver-gray hover:text-wisdom-blue transition-colors"
                                                        title="Sao chép"
                                                        data-oid="og1ts5s"
                                                    >
                                                        <Copy
                                                            className="w-4 h-4"
                                                            data-oid="x.mq1i."
                                                        />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className="bg-warning-red/10 border border-warning-red/20 rounded-lg p-4"
                                            data-oid="t49qda0"
                                        >
                                            <div
                                                className="flex items-start gap-3"
                                                data-oid="_d08p_v"
                                            >
                                                <AlertTriangle
                                                    className="w-5 h-5 text-warning-red mt-0.5 flex-shrink-0"
                                                    data-oid="ju4phgr"
                                                />

                                                <div data-oid="lg85n.z">
                                                    <p
                                                        className="font-medium text-warning-red mb-1"
                                                        data-oid="h67rnky"
                                                    >
                                                        Lưu ý quan trọng
                                                    </p>
                                                    <p
                                                        className="text-sm text-warning-red"
                                                        data-oid=":zq8z8b"
                                                    >
                                                        Vui lòng chuyển khoản chính xác số tiền và
                                                        nội dung để đảm bảo giao dịch được xử lý
                                                        nhanh chóng.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </CardBody>
                        </Card>
                    </div>

                    {/* Right Panel: Order Summary */}
                    <div className="lg:w-1/3" data-oid=".gbeyxl">
                        <Card className="sticky top-8" data-oid="g:r0-4v">
                            <CardHeader data-oid="koc4dba">
                                <h2 className="manabi-heading-3" data-oid="ng54x4s">
                                    Tóm tắt đơn hàng
                                </h2>
                            </CardHeader>
                            <CardBody className="space-y-6" data-oid="3x0zx-g">
                                {/* Course Info */}
                                <div className="flex gap-4" data-oid="zbrg0zs">
                                    <img
                                        src={bookingData.coverImage}
                                        alt={bookingData.courseTitle}
                                        className="w-20 h-20 rounded-lg object-cover"
                                        data-oid="1zzv1:z"
                                    />

                                    <div className="flex-1" data-oid="u4m8e2p">
                                        <h3
                                            className="font-semibold text-charcoal-gray text-sm leading-tight"
                                            data-oid="xv33xi0"
                                        >
                                            {bookingData.courseTitle}
                                        </h3>
                                        <div
                                            className="flex items-center gap-2 mt-2"
                                            data-oid="d:mz_3x"
                                        >
                                            <img
                                                src={bookingData.teacher.avatar}
                                                alt={bookingData.teacher.name}
                                                className="w-6 h-6 rounded-full"
                                                data-oid="m58n2o."
                                            />

                                            <span
                                                className="text-sm text-silver-gray"
                                                data-oid="horp33v"
                                            >
                                                {bookingData.teacher.name}
                                            </span>
                                        </div>
                                        <div
                                            className="flex items-center gap-2 mt-2 text-sm text-silver-gray"
                                            data-oid="hpyy8w4"
                                        >
                                            <Calendar className="w-4 h-4" data-oid="r18u4ku" />
                                            <span data-oid="6cdma1e">{bookingData.schedule}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Price Breakdown */}
                                <div
                                    className="border-t border-light-border pt-4 space-y-3"
                                    data-oid="299rlpn"
                                >
                                    <div
                                        className="flex justify-between text-sm"
                                        data-oid="f0h8o42"
                                    >
                                        <span className="text-silver-gray" data-oid="afxa-dg">
                                            Giá khóa học:
                                        </span>
                                        <span className="font-medium" data-oid="po-u7in">
                                            {formatCurrency(bookingData.price)}
                                        </span>
                                    </div>
                                    <div
                                        className="flex justify-between text-sm"
                                        data-oid="xpi0qev"
                                    >
                                        <span className="text-silver-gray" data-oid="msorcge">
                                            Phí nền tảng:
                                        </span>
                                        <span className="font-medium" data-oid="z_di94h">
                                            {formatCurrency(bookingData.platform_fee)}
                                        </span>
                                    </div>
                                    <div
                                        className="border-t border-light-border pt-3"
                                        data-oid="q2tx29q"
                                    >
                                        <div className="flex justify-between" data-oid="7eu2e0l">
                                            <span
                                                className="font-semibold text-charcoal-gray"
                                                data-oid="xxxs18e"
                                            >
                                                Tổng cộng:
                                            </span>
                                            <span
                                                className="font-bold text-lg text-wisdom-blue"
                                                data-oid="u58ib9."
                                            >
                                                {formatCurrency(
                                                    bookingData.price + bookingData.platform_fee,
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Security Badge */}
                                <div className="text-center" data-oid="gv:y::d">
                                    <p className="text-xs text-silver-gray" data-oid="rers609">
                                        🔒 Thanh toán an toàn 100%
                                    </p>
                                </div>

                                {/* Payment Button */}
                                <Button
                                    variant="primary"
                                    className="w-full"
                                    onClick={() => setStep('success')}
                                    data-oid="if_0t-j"
                                >
                                    {selectedPayment === 'stripe'
                                        ? 'Thanh toán ngay'
                                        : 'Xác nhận chuyển khoản'}
                                </Button>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingPage;
