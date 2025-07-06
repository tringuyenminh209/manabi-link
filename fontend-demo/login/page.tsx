'use client';

import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle login logic here
        console.log('Login attempt:', { email, password });
    };

    return (
        <div className="min-h-screen bg-off-white flex" data-oid="-1fy4rx">
            {/* Left side - Illustration/Image */}
            <div
                className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-wisdom-blue to-wisdom-blue/80 items-center justify-center p-12"
                data-oid="cgtaa3q"
            >
                <div className="text-center text-white max-w-md" data-oid="tg_g3wd">
                    <div className="mb-8" data-oid="wa6vy-1">
                        <div
                            className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6"
                            data-oid="_xn1.8z"
                        >
                            <div
                                className="w-20 h-20 bg-energetic-yellow rounded-full flex items-center justify-center"
                                data-oid="spgp74q"
                            >
                                <span
                                    className="text-2xl font-bold text-charcoal-gray"
                                    data-oid="t28czh1"
                                >
                                    ML
                                </span>
                            </div>
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold mb-4 font-inter" data-oid="2x-dsx6">
                        Manabi Linkへようこそ
                    </h2>
                    <p className="text-lg opacity-90 leading-relaxed" data-oid=":-vly_8">
                        生徒と教師をつなぐプラットフォーム。知識を共有し、共に成長する場所です。
                    </p>
                    <div className="mt-8 flex justify-center space-x-4" data-oid="rjkmbvv">
                        <div className="w-3 h-3 bg-white/40 rounded-full" data-oid="njmvrs8"></div>
                        <div className="w-3 h-3 bg-white rounded-full" data-oid="x2uzr8o"></div>
                        <div className="w-3 h-3 bg-white/40 rounded-full" data-oid="6:4wiw-"></div>
                    </div>
                </div>
            </div>

            {/* Right side - Login Form */}
            <div
                className="w-full lg:w-1/2 flex items-center justify-center p-8"
                data-oid="su:5hyw"
            >
                <div className="w-full max-w-md" data-oid="-ypdg6s">
                    {/* Logo for mobile */}
                    <div className="lg:hidden text-center mb-8" data-oid=".z_5hk3">
                        <div
                            className="w-16 h-16 bg-wisdom-blue rounded-full flex items-center justify-center mx-auto mb-4"
                            data-oid="zib_.x6"
                        >
                            <span className="text-xl font-bold text-white" data-oid="o_pr6kq">
                                ML
                            </span>
                        </div>
                        <h1
                            className="text-2xl font-bold text-charcoal-gray font-inter"
                            data-oid="tpgi2mr"
                        >
                            Manabi Link
                        </h1>
                    </div>

                    {/* Login Form */}
                    <div className="manabi-card p-8" data-oid="xwe5hdz">
                        <div className="text-center mb-8" data-oid="rqqj4kq">
                            <h1
                                className="text-3xl font-bold text-charcoal-gray mb-2 font-inter"
                                data-oid="hc2j5m9"
                            >
                                ログイン
                            </h1>
                            <p className="text-silver-gray" data-oid="2wc9vu7">
                                おかえりなさい！アカウントにログインしてください。
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6" data-oid="0uxjw3c">
                            {/* Email Field */}
                            <div data-oid="cyw-57h">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-charcoal-gray mb-2"
                                    data-oid="kmcceao"
                                >
                                    メールアドレス
                                </label>
                                <div className="relative" data-oid="-u1dl:5">
                                    <Mail
                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-silver-gray w-5 h-5"
                                        data-oid="w52:c-2"
                                    />

                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="manabi-input pl-12"
                                        placeholder="メールアドレスを入力してください"
                                        required
                                        data-oid="e4qj-je"
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div data-oid="5q2a1c5">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-charcoal-gray mb-2"
                                    data-oid="dibds_z"
                                >
                                    パスワード
                                </label>
                                <div className="relative" data-oid="qfykg0z">
                                    <Lock
                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-silver-gray w-5 h-5"
                                        data-oid="j1-5p37"
                                    />

                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="manabi-input pl-12 pr-12"
                                        placeholder="パスワードを入力してください"
                                        required
                                        data-oid="l__0vqv"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-silver-gray hover:text-charcoal-gray transition-colors"
                                        data-oid="r677eph"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-5 h-5" data-oid="jqufdk1" />
                                        ) : (
                                            <Eye className="w-5 h-5" data-oid="_vb2val" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between" data-oid="7s_f6ee">
                                <label className="flex items-center" data-oid="khaybjy">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 text-wisdom-blue border-input-border rounded focus:ring-wisdom-blue focus:ring-2"
                                        data-oid="l1fpzn8"
                                    />

                                    <span
                                        className="ml-2 text-sm text-charcoal-gray"
                                        data-oid="pb82qis"
                                    >
                                        ログイン状態を保持
                                    </span>
                                </label>
                                <a
                                    href="#"
                                    className="text-sm text-wisdom-blue hover:text-wisdom-blue/80 transition-colors"
                                    data-oid="0hiad9y"
                                >
                                    パスワードを忘れた方
                                </a>
                            </div>

                            {/* Login Button */}
                            <button
                                type="submit"
                                className="manabi-btn-primary w-full text-lg"
                                data-oid="rg59b92"
                            >
                                ログイン
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="my-8 flex items-center" data-oid="ineucoj">
                            <div
                                className="flex-1 border-t border-light-border"
                                data-oid="uwr9pu2"
                            ></div>
                            <span
                                className="px-4 text-sm text-silver-gray bg-white"
                                data-oid="aiwpjqq"
                            >
                                または
                            </span>
                            <div
                                className="flex-1 border-t border-light-border"
                                data-oid="c9dwwd3"
                            ></div>
                        </div>

                        {/* Social Login */}
                        <div className="space-y-3" data-oid="b:ikj_9">
                            <button
                                className="w-full flex items-center justify-center px-4 py-3 border border-input-border rounded-lg bg-white text-charcoal-gray font-medium hover:shadow-md transition-all duration-200"
                                data-oid="oo49ae7"
                            >
                                <svg
                                    className="w-5 h-5 mr-3"
                                    viewBox="0 0 24 24"
                                    data-oid="9ga38xj"
                                >
                                    <path
                                        fill="#4285F4"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        data-oid="5-j56vi"
                                    />

                                    <path
                                        fill="#34A853"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        data-oid="a0g_55_"
                                    />

                                    <path
                                        fill="#FBBC05"
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        data-oid="v33j_2:"
                                    />

                                    <path
                                        fill="#EA4335"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        data-oid="psgww3h"
                                    />
                                </svg>
                                Googleでログイン
                            </button>

                            <button
                                className="w-full flex items-center justify-center px-4 py-3 border border-input-border rounded-lg bg-white text-charcoal-gray font-medium hover:shadow-md transition-all duration-200"
                                data-oid="j4k1uh0"
                            >
                                <svg
                                    className="w-5 h-5 mr-3"
                                    fill="#1877F2"
                                    viewBox="0 0 24 24"
                                    data-oid="lse:2dp"
                                >
                                    <path
                                        d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                                        data-oid="w35s6eq"
                                    />
                                </svg>
                                Facebookでログイン
                            </button>
                        </div>

                        {/* Sign Up Link */}
                        <div className="mt-8 text-center" data-oid="xnta.zr">
                            <p className="text-charcoal-gray" data-oid="y57b2_e">
                                アカウントをお持ちでない方？{' '}
                                <a
                                    href="/register"
                                    className="text-wisdom-blue font-medium hover:text-wisdom-blue/80 transition-colors"
                                    data-oid="ycq01dt"
                                >
                                    こちらで登録
                                </a>
                            </p>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-8 text-center text-sm text-silver-gray" data-oid="7.rl9_j">
                        <p data-oid="neldpx4">
                            ログインすることで、当社の{' '}
                            <a
                                href="#"
                                className="text-wisdom-blue hover:text-wisdom-blue/80"
                                data-oid="dawd3ta"
                            >
                                利用規約
                            </a>{' '}
                            と{' '}
                            <a
                                href="#"
                                className="text-wisdom-blue hover:text-wisdom-blue/80"
                                data-oid="-fgr2zk"
                            >
                                プライバシーポリシー
                            </a>{' '}
                            に同意したことになります。
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
