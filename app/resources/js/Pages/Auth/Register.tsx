'use client';

import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, User, Phone, Calendar, MapPin, Globe } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { t } from '@/lib/i18n';
import { Link } from 'react-router-dom';

// Định nghĩa interface cho form data
interface FormData {
    fullName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    country: string;
    location: string;
    address: string;
    password: string;
    confirmPassword: string;
    userType: 'learner' | 'teacher';
    agreeToTerms: boolean;
    subscribeNewsletter: boolean;
}

// Định nghĩa interface cho errors
interface FormErrors {
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    agreeToTerms?: string;
    [key: string]: string | undefined;
}

// Danh sách quốc gia với addressPlaceholderKey
const countries = [
    { code: 'VN', nameKey: 'register_page.country_vn', addressPlaceholderKey: 'register_page.address_placeholder_vn' },
    { code: 'JP', nameKey: 'register_page.country_jp', addressPlaceholderKey: 'register_page.address_placeholder_jp' },
    { code: 'US', nameKey: 'register_page.country_us', addressPlaceholderKey: 'register_page.address_placeholder_us' },
    { code: 'KR', nameKey: 'register_page.country_kr', addressPlaceholderKey: 'register_page.address_placeholder_kr' },
    { code: 'CN', nameKey: 'register_page.country_cn', addressPlaceholderKey: 'register_page.address_placeholder_cn' },
    { code: 'TH', nameKey: 'register_page.country_th', addressPlaceholderKey: 'register_page.address_placeholder_th' },
    { code: 'SG', nameKey: 'register_page.country_sg', addressPlaceholderKey: 'register_page.address_placeholder_sg' },
    { code: 'MY', nameKey: 'register_page.country_my', addressPlaceholderKey: 'register_page.address_placeholder_my' },
    { code: 'ID', nameKey: 'register_page.country_id', addressPlaceholderKey: 'register_page.address_placeholder_id' },
    { code: 'PH', nameKey: 'register_page.country_ph', addressPlaceholderKey: 'register_page.address_placeholder_ph' },
    { code: 'AU', nameKey: 'register_page.country_au', addressPlaceholderKey: 'register_page.address_placeholder_au' },
    { code: 'CA', nameKey: 'register_page.country_ca', addressPlaceholderKey: 'register_page.address_placeholder_ca' },
    { code: 'GB', nameKey: 'register_page.country_gb', addressPlaceholderKey: 'register_page.address_placeholder_gb' },
    { code: 'DE', nameKey: 'register_page.country_de', addressPlaceholderKey: 'register_page.address_placeholder_de' },
    { code: 'FR', nameKey: 'register_page.country_fr', addressPlaceholderKey: 'register_page.address_placeholder_fr' },
    { code: 'IT', nameKey: 'register_page.country_it', addressPlaceholderKey: 'register_page.address_placeholder_it' },
    { code: 'ES', nameKey: 'register_page.country_es', addressPlaceholderKey: 'register_page.address_placeholder_es' },
    { code: 'NL', nameKey: 'register_page.country_nl', addressPlaceholderKey: 'register_page.address_placeholder_nl' },
    { code: 'SE', nameKey: 'register_page.country_se', addressPlaceholderKey: 'register_page.address_placeholder_se' },
    { code: 'NO', nameKey: 'register_page.country_no', addressPlaceholderKey: 'register_page.address_placeholder_no' },
    { code: 'DK', nameKey: 'register_page.country_dk', addressPlaceholderKey: 'register_page.address_placeholder_dk' },
    { code: 'FI', nameKey: 'register_page.country_fi', addressPlaceholderKey: 'register_page.address_placeholder_fi' },
    { code: 'CH', nameKey: 'register_page.country_ch', addressPlaceholderKey: 'register_page.address_placeholder_ch' },
    { code: 'AT', nameKey: 'register_page.country_at', addressPlaceholderKey: 'register_page.address_placeholder_at' },
    { code: 'BE', nameKey: 'register_page.country_be', addressPlaceholderKey: 'register_page.address_placeholder_be' },
    { code: 'IE', nameKey: 'register_page.country_ie', addressPlaceholderKey: 'register_page.address_placeholder_ie' },
    { code: 'PT', nameKey: 'register_page.country_pt', addressPlaceholderKey: 'register_page.address_placeholder_pt' },
    { code: 'GR', nameKey: 'register_page.country_gr', addressPlaceholderKey: 'register_page.address_placeholder_gr' },
    { code: 'PL', nameKey: 'register_page.country_pl', addressPlaceholderKey: 'register_page.address_placeholder_pl' },
    { code: 'CZ', nameKey: 'register_page.country_cz', addressPlaceholderKey: 'register_page.address_placeholder_cz' },
    { code: 'HU', nameKey: 'register_page.country_hu', addressPlaceholderKey: 'register_page.address_placeholder_hu' },
    { code: 'RO', nameKey: 'register_page.country_ro', addressPlaceholderKey: 'register_page.address_placeholder_ro' },
    { code: 'BG', nameKey: 'register_page.country_bg', addressPlaceholderKey: 'register_page.address_placeholder_bg' },
    { code: 'HR', nameKey: 'register_page.country_hr', addressPlaceholderKey: 'register_page.address_placeholder_hr' },
    { code: 'SI', nameKey: 'register_page.country_si', addressPlaceholderKey: 'register_page.address_placeholder_si' },
    { code: 'SK', nameKey: 'register_page.country_sk', addressPlaceholderKey: 'register_page.address_placeholder_sk' },
    { code: 'LT', nameKey: 'register_page.country_lt', addressPlaceholderKey: 'register_page.address_placeholder_lt' },
    { code: 'LV', nameKey: 'register_page.country_lv', addressPlaceholderKey: 'register_page.address_placeholder_lv' },
    { code: 'EE', nameKey: 'register_page.country_ee', addressPlaceholderKey: 'register_page.address_placeholder_ee' },
    { code: 'MT', nameKey: 'register_page.country_mt', addressPlaceholderKey: 'register_page.address_placeholder_mt' },
    { code: 'CY', nameKey: 'register_page.country_cy', addressPlaceholderKey: 'register_page.address_placeholder_cy' },
    { code: 'LU', nameKey: 'register_page.country_lu', addressPlaceholderKey: 'register_page.address_placeholder_lu' },
    { code: 'IS', nameKey: 'register_page.country_is', addressPlaceholderKey: 'register_page.address_placeholder_is' },
    { code: 'AD', nameKey: 'register_page.country_ad', addressPlaceholderKey: 'register_page.address_placeholder_ad' },
    { code: 'MC', nameKey: 'register_page.country_mc', addressPlaceholderKey: 'register_page.address_placeholder_mc' },
    { code: 'LI', nameKey: 'register_page.country_li', addressPlaceholderKey: 'register_page.address_placeholder_li' },
    { code: 'SM', nameKey: 'register_page.country_sm', addressPlaceholderKey: 'register_page.address_placeholder_sm' },
    { code: 'VA', nameKey: 'register_page.country_va', addressPlaceholderKey: 'register_page.address_placeholder_va' },
    { code: 'OTHER', nameKey: 'register_page.country_other', addressPlaceholderKey: 'register_page.address_placeholder' },
];

// Danh sách location theo quốc gia
const locationsByCountry = {
    VN: [
        { code: 'hanoi', name: 'Hà Nội' },
        { code: 'hcm', name: 'TP. Hồ Chí Minh' },
        { code: 'danang', name: 'Đà Nẵng' },
        { code: 'haiphong', name: 'Hải Phòng' },
        { code: 'cantho', name: 'Cần Thơ' },
        { code: 'binhduong', name: 'Bình Dương' },
        { code: 'dongnai', name: 'Đồng Nai' },
        { code: 'longan', name: 'Long An' },
        { code: 'quangnam', name: 'Quảng Nam' },
        { code: 'baia-vungtau', name: 'Bà Rịa - Vũng Tàu' },
        { code: 'other', name: 'Khác' },
    ],
    JP: [
        { code: 'tokyo', name: 'Tokyo (東京都)' },
        { code: 'osaka', name: 'Osaka (大阪府)' },
        { code: 'kyoto', name: 'Kyoto (京都府)' },
        { code: 'yokohama', name: 'Yokohama (横浜市)' },
        { code: 'nagoya', name: 'Nagoya (名古屋市)' },
        { code: 'sapporo', name: 'Sapporo (札幌市)' },
        { code: 'kobe', name: 'Kobe (神戸市)' },
        { code: 'fukuoka', name: 'Fukuoka (福岡市)' },
        { code: 'kawasaki', name: 'Kawasaki (川崎市)' },
        { code: 'saitama', name: 'Saitama (さいたま市)' },
        { code: 'hiroshima', name: 'Hiroshima (広島市)' },
        { code: 'sendai', name: 'Sendai (仙台市)' },
        { code: 'chiba', name: 'Chiba (千葉市)' },
        { code: 'other', name: 'その他' },
    ],
    US: [
        { code: 'california', name: 'California' },
        { code: 'texas', name: 'Texas' },
        { code: 'florida', name: 'Florida' },
        { code: 'newyork', name: 'New York' },
        { code: 'illinois', name: 'Illinois' },
        { code: 'pennsylvania', name: 'Pennsylvania' },
        { code: 'ohio', name: 'Ohio' },
        { code: 'georgia', name: 'Georgia' },
        { code: 'northcarolina', name: 'North Carolina' },
        { code: 'michigan', name: 'Michigan' },
        { code: 'newjersey', name: 'New Jersey' },
        { code: 'virginia', name: 'Virginia' },
        { code: 'washington', name: 'Washington' },
        { code: 'arizona', name: 'Arizona' },
        { code: 'massachusetts', name: 'Massachusetts' },
        { code: 'other', name: 'Other' },
    ],
    KR: [
        { code: 'seoul', name: 'Seoul (서울특별시)' },
        { code: 'busan', name: 'Busan (부산광역시)' },
        { code: 'incheon', name: 'Incheon (인천광역시)' },
        { code: 'daegu', name: 'Daegu (대구광역시)' },
        { code: 'daejeon', name: 'Daejeon (대전광역시)' },
        { code: 'gwangju', name: 'Gwangju (광주광역시)' },
        { code: 'suwon', name: 'Suwon (수원시)' },
        { code: 'ulsan', name: 'Ulsan (울산광역시)' },
        { code: 'changwon', name: 'Changwon (창원시)' },
        { code: 'seongnam', name: 'Seongnam (성남시)' },
        { code: 'bucheon', name: 'Bucheon (부천시)' },
        { code: 'ansan', name: 'Ansan (안산시)' },
        { code: 'jeonju', name: 'Jeonju (전주시)' },
        { code: 'anyang', name: 'Anyang (안양시)' },
        { code: 'other', name: '기타' },
    ],
    CN: [
        { code: 'beijing', name: 'Beijing (北京市)' },
        { code: 'shanghai', name: 'Shanghai (上海市)' },
        { code: 'guangzhou', name: 'Guangzhou (广州市)' },
        { code: 'shenzhen', name: 'Shenzhen (深圳市)' },
        { code: 'tianjin', name: 'Tianjin (天津市)' },
        { code: 'chongqing', name: 'Chongqing (重庆市)' },
        { code: 'chengdu', name: 'Chengdu (成都市)' },
        { code: 'hangzhou', name: 'Hangzhou (杭州市)' },
        { code: 'wuhan', name: 'Wuhan (武汉市)' },
        { code: 'xian', name: 'Xi\'an (西安市)' },
        { code: 'nanjing', name: 'Nanjing (南京市)' },
        { code: 'qingdao', name: 'Qingdao (青岛市)' },
        { code: 'dalian', name: 'Dalian (大连市)' },
        { code: 'suzhou', name: 'Suzhou (苏州市)' },
        { code: 'other', name: '其他' },
    ],
    TH: [
        { code: 'bangkok', name: 'Bangkok (กรุงเทพฯ)' },
        { code: 'chiangmai', name: 'Chiang Mai (เชียงใหม่)' },
        { code: 'pattaya', name: 'Pattaya (พัทยา)' },
        { code: 'phuket', name: 'Phuket (ภูเก็ต)' },
        { code: 'hatyai', name: 'Hat Yai (หาดใหญ่)' },
        { code: 'nakhonratchasima', name: 'Nakhon Ratchasima (นครราชสีมา)' },
        { code: 'udonthani', name: 'Udon Thani (อุดรธานี)' },
        { code: 'khonkaen', name: 'Khon Kaen (ขอนแก่น)' },
        { code: 'nakhonsi', name: 'Nakhon Si Thammarat (นครศรีธรรมราช)' },
        { code: 'songkhla', name: 'Songkhla (สงขลา)' },
        { code: 'other', name: 'อื่นๆ' },
    ],
    SG: [
        { code: 'central', name: 'Central Region' },
        { code: 'east', name: 'East Region' },
        { code: 'north', name: 'North Region' },
        { code: 'northeast', name: 'North-East Region' },
        { code: 'west', name: 'West Region' },
        { code: 'other', name: 'Other' },
    ],
    MY: [
        { code: 'kualalumpur', name: 'Kuala Lumpur' },
        { code: 'selangor', name: 'Selangor' },
        { code: 'johor', name: 'Johor' },
        { code: 'penang', name: 'Penang' },
        { code: 'perak', name: 'Perak' },
        { code: 'kedah', name: 'Kedah' },
        { code: 'kelantan', name: 'Kelantan' },
        { code: 'terengganu', name: 'Terengganu' },
        { code: 'pahang', name: 'Pahang' },
        { code: 'negerisembilan', name: 'Negeri Sembilan' },
        { code: 'melaka', name: 'Melaka' },
        { code: 'perlis', name: 'Perlis' },
        { code: 'sabah', name: 'Sabah' },
        { code: 'sarawak', name: 'Sarawak' },
        { code: 'other', name: 'Other' },
    ],
    ID: [
        { code: 'jakarta', name: 'Jakarta' },
        { code: 'surabaya', name: 'Surabaya' },
        { code: 'bandung', name: 'Bandung' },
        { code: 'medan', name: 'Medan' },
        { code: 'semarang', name: 'Semarang' },
        { code: 'makassar', name: 'Makassar' },
        { code: 'palembang', name: 'Palembang' },
        { code: 'tangerang', name: 'Tangerang' },
        { code: 'depok', name: 'Depok' },
        { code: 'bekasi', name: 'Bekasi' },
        { code: 'bogor', name: 'Bogor' },
        { code: 'malang', name: 'Malang' },
        { code: 'other', name: 'Lainnya' },
    ],
    PH: [
        { code: 'manila', name: 'Manila' },
        { code: 'quezoncity', name: 'Quezon City' },
        { code: 'caloocan', name: 'Caloocan' },
        { code: 'davaocity', name: 'Davao City' },
        { code: 'cebucity', name: 'Cebu City' },
        { code: 'antipolo', name: 'Antipolo' },
        { code: 'pasig', name: 'Pasig' },
        { code: 'taguig', name: 'Taguig' },
        { code: 'valenzuela', name: 'Valenzuela' },
        { code: 'cagayandeoro', name: 'Cagayan de Oro' },
        { code: 'paranaque', name: 'Parañaque' },
        { code: 'other', name: 'Other' },
    ],
    AU: [
        { code: 'nsw', name: 'New South Wales' },
        { code: 'vic', name: 'Victoria' },
        { code: 'qld', name: 'Queensland' },
        { code: 'wa', name: 'Western Australia' },
        { code: 'sa', name: 'South Australia' },
        { code: 'tas', name: 'Tasmania' },
        { code: 'act', name: 'Australian Capital Territory' },
        { code: 'nt', name: 'Northern Territory' },
        { code: 'other', name: 'Other' },
    ],
    CA: [
        { code: 'on', name: 'Ontario' },
        { code: 'qc', name: 'Quebec' },
        { code: 'bc', name: 'British Columbia' },
        { code: 'ab', name: 'Alberta' },
        { code: 'mb', name: 'Manitoba' },
        { code: 'sk', name: 'Saskatchewan' },
        { code: 'ns', name: 'Nova Scotia' },
        { code: 'nb', name: 'New Brunswick' },
        { code: 'nl', name: 'Newfoundland and Labrador' },
        { code: 'pe', name: 'Prince Edward Island' },
        { code: 'nt', name: 'Northwest Territories' },
        { code: 'nu', name: 'Nunavut' },
        { code: 'yt', name: 'Yukon' },
        { code: 'other', name: 'Other' },
    ],
    GB: [
        { code: 'england', name: 'England' },
        { code: 'scotland', name: 'Scotland' },
        { code: 'wales', name: 'Wales' },
        { code: 'northernireland', name: 'Northern Ireland' },
        { code: 'other', name: 'Other' },
    ],
    OTHER: [
        { code: 'other', name: 'Other' },
    ],
};

export default function RegisterPage() {
    const { register, error: authError, loading } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({});
    const [formData, setFormData] = useState<FormData>({
        fullName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        country: '',
        location: '',
        address: '',
        password: '',
        confirmPassword: '',
        userType: 'learner', // learner or teacher
        agreeToTerms: false,
        subscribeNewsletter: false,
    });

    // Lấy placeholder địa chỉ theo quốc gia
    const getAddressPlaceholder = () => {
        const selectedCountry = countries.find(c => c.code === formData.country);
        return selectedCountry
            ? t(selectedCountry.addressPlaceholderKey)
            : t('register_page.address_placeholder');
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        // Nếu thay đổi country, reset location
        if (name === 'country') {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
                location: '', // Reset location khi đổi quốc gia
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
            }));
        }

        // Clear field error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const validateForm = () => {
        const newErrors: FormErrors = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Họ và tên là bắt buộc';
        }

        if (!formData.email) {
            newErrors.email = 'Email là bắt buộc';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email không hợp lệ';
        }

        if (!formData.country) {
            newErrors.country = 'Vui lòng chọn quốc gia';
        }

        if (!formData.password) {
            newErrors.password = 'Mật khẩu là bắt buộc';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Mật khẩu phải có ít nhất 8 ký tự';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
        }

        if (!formData.agreeToTerms) {
            newErrors.agreeToTerms = 'Bạn phải đồng ý với điều khoản sử dụng';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            const userData = {
                name: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                date_of_birth: formData.dateOfBirth,
                country: formData.country,
                location: formData.location,
                address: formData.address,
                password: formData.password,
                password_confirmation: formData.confirmPassword,
                role: formData.userType,
                subscribe_newsletter: formData.subscribeNewsletter,
            };

            await register(userData);
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
                        {t('register_page.join_community')}
                    </h2>
                    <p className="text-lg opacity-90 leading-relaxed mb-6" data-oid="_lhm7hh">
                        {t('register_page.join_desc')}
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
                                {t('register_page.feature_courses')}
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
                                {t('register_page.feature_teachers')}
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
                                {t('register_page.feature_flexible')}
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
                                {t('register_page.register_title')}
                            </h1>
                            <p className="text-silver-gray" data-oid="qtibqxu">
                                {t('register_page.register_desc')}
                            </p>
                        </div>

                        {/* Error Message */}
                        {authError && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-sm text-red-600">{authError}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6" data-oid="5kivr5q">
                            {/* User Type Selection */}
                            <div data-oid="h5a8480">
                                <label
                                    className="block text-sm font-medium text-charcoal-gray mb-3"
                                    data-oid="07qhwxy"
                                >
                                    {t('register_page.role_question')}
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
                                            {t('register_page.role_learner')}
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
                                            {t('register_page.role_teacher')}
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
                                    {t('register_page.full_name')}
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
                                        className={`manabi-input pl-12 ${errors.fullName ? 'border-red-500' : ''}`}
                                        placeholder={t('register_page.full_name_placeholder')}
                                        required
                                        data-oid="vswr.d7"
                                    />
                                </div>
                                {errors.fullName && (
                                    <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
                                )}
                            </div>

                            {/* Email Field */}
                            <div data-oid="g_2vk25">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-charcoal-gray mb-2"
                                    data-oid="r93j_tb"
                                >
                                    {t('register_page.email')}
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
                                        className={`manabi-input pl-12 ${errors.email ? 'border-red-500' : ''}`}
                                        placeholder={t('register_page.email_placeholder')}
                                        required
                                        data-oid="29oc4e1"
                                    />
                                </div>
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                                )}
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
                                        {t('register_page.phone')}
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
                                            placeholder={t('register_page.phone_placeholder')}
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
                                        {t('register_page.dob')}
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



                            {/* Country and Location Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label
                                        htmlFor="country"
                                        className="block text-sm font-medium text-charcoal-gray mb-2"
                                    >
                                        {t('register_page.country')}
                                    </label>
                                    <div className="relative">
                                        <Globe
                                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-silver-gray w-5 h-5"
                                        />

                                        <select
                                            id="country"
                                            name="country"
                                            value={formData.country}
                                            onChange={handleInputChange}
                                            className={`manabi-input pl-12 ${errors.country ? 'border-red-500' : ''}`}
                                        >
                                            <option value="">
                                                {t('register_page.country_placeholder')}
                                            </option>
                                            {(Array.isArray(countries) ? countries : []).map((country) => {
                                                const label = t(country.nameKey);
                                                return (
                                                    <option key={country.code} value={country.code}>
                                                        {label === country.nameKey ? country.code : label}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                    {errors.country && (
                                        <p className="mt-1 text-sm text-red-600">{errors.country}</p>
                                    )}
                                </div>
                                <div>
                                    <label
                                        htmlFor="location"
                                        className="block text-sm font-medium text-charcoal-gray mb-2"
                                    >
                                        {t('register_page.location')}
                                    </label>
                                    <div className="relative">
                                        <MapPin
                                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-silver-gray w-5 h-5"
                                        />

                                        <select
                                            id="location"
                                            name="location"
                                            value={formData.location}
                                            onChange={handleInputChange}
                                            className="manabi-input pl-12"
                                            disabled={!formData.country}
                                        >
                                            <option value="">
                                                {formData.country
                                                    ? t('register_page.location_placeholder')
                                                    : 'Vui lòng chọn quốc gia trước'
                                                }
                                            </option>
                                            {formData.country && locationsByCountry[formData.country as keyof typeof locationsByCountry] && Array.isArray(locationsByCountry[formData.country as keyof typeof locationsByCountry]) && locationsByCountry[formData.country as keyof typeof locationsByCountry].map((loc) => (
                                                <option key={loc.code} value={loc.code}>
                                                    {loc.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Address Row */}
                            <div>
                                <label
                                    htmlFor="address"
                                    className="block text-sm font-medium text-charcoal-gray mb-2"
                                >
                                    {t('register_page.address')}
                                </label>
                                <div className="relative">
                                    <MapPin
                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-silver-gray w-5 h-5"
                                    />

                                    <input
                                        id="address"
                                        name="address"
                                        type="text"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        className="manabi-input pl-12"
                                        placeholder={getAddressPlaceholder()}
                                    />
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
                                        {t('register_page.password')}
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
                                            className={`manabi-input pl-12 pr-12 ${errors.password ? 'border-red-500' : ''}`}
                                            placeholder={t('register_page.password_placeholder')}
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
                                    {errors.password && (
                                        <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                                    )}
                                </div>
                                <div data-oid="8bsz1d3">
                                    <label
                                        htmlFor="confirmPassword"
                                        className="block text-sm font-medium text-charcoal-gray mb-2"
                                        data-oid="gpmf-_n"
                                    >
                                        {t('register_page.confirm_password')}
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
                                            className={`manabi-input pl-12 pr-12 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                                            placeholder={t('register_page.confirm_password_placeholder')}
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
                                    {errors.confirmPassword && (
                                        <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                                    )}
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
                                        {t('register_page.agree_terms', { terms: t('register_page.terms'), policy: t('register_page.policy') })}
                                    </span>
                                </label>
                                {errors.agreeToTerms && (
                                    <p className="text-sm text-red-600">{errors.agreeToTerms}</p>
                                )}
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
                                        {t('register_page.subscribe_newsletter')}
                                    </span>
                                </label>
                            </div>

                            {/* Register Button */}
                            <button
                                type="submit"
                                className="manabi-btn-primary w-full text-lg"
                                disabled={!formData.agreeToTerms || loading}
                                data-oid="egdyfzz"
                            >
                                {loading ? t('register_page.registering') : t('register_page.register_btn')}
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
                                {t('register_page.or')}
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
                                {t('register_page.register_google')}
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
                                {t('register_page.register_facebook')}
                            </button>
                        </div>

                        {/* Login Link */}
                        <div className="mt-8 text-center">
                            <p className="text-charcoal-gray">
                                {t('register_page.already_have_account')}{' '}
                                <Link
                                    to="/login"
                                    className="text-wisdom-blue font-medium hover:text-wisdom-blue/80 transition-colors"
                                >
                                    {t('register_page.login_here')}
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
