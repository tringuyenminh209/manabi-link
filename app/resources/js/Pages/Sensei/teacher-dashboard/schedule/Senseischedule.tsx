'use client';

import React, { useState, useMemo, Fragment } from 'react';
import type { Popover as PopoverType, Transition as TransitionType } from '@headlessui/react';
import {
    ChevronLeft,
    ChevronRight,
    Calendar,
    Clock,
    User,
    BookOpen,
    Plus,
    MoreHorizontal,
    X,
    Trash2,
    Edit,
    MessageSquare,
    LogOut,
} from 'lucide-react';
import { Popover, Transition } from '@headlessui/react';

// --- Interfaces and Dummy Data ---
interface Lesson {
    id: number;
    title: string;
}

interface Booking {
    id: number;
    lessonId: number;
    start: Date;
    end: Date;
    student: string;
}

interface AvailableSlot {
    id: number;
    lessonId: number;
    start: Date;
    end: Date;
}

// 正しいstart/endのダミーデータ生成
function makeDate(dayOffset: number, hour: number, min: number = 0) {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + dayOffset);
    d.setHours(hour, min, 0, 0);
    return d;
}

const initialLessons: Lesson[] = [
    { id: 1, title: 'Guitar đệm hát cơ bản' },
    { id: 2, title: 'Piano cho người mới bắt đầu' },
    { id: 3, title: 'Tiếng Nhật giao tiếp N5' },
];

const initialBookings: Booking[] = [
    {
        id: 1,
        lessonId: 1,
        start: makeDate(1, 19, 0), // 明日19:00
        end: makeDate(1, 20, 0), // 明日20:00
        student: 'Nguyễn Thị Mai',
    },
    {
        id: 2,
        lessonId: 2,
        start: makeDate(-1, 14, 0), // 昨日14:00
        end: makeDate(-1, 15, 0), // 昨日15:00
        student: 'Trần Văn Hùng',
    },
];

const initialSlots: AvailableSlot[] = [
    {
        id: 101,
        lessonId: 3,
        start: makeDate(2, 10, 0), // 明後日10:00
        end: makeDate(2, 11, 0), // 明後日11:00
    },
];

// --- Component ---
export default function TeacherSchedulePage() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [view, setView] = useState<'week' | 'month' | 'agenda'>('week');
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState<Partial<AvailableSlot>>({});

    // Mock data state
    const [lessons] = useState<Lesson[]>(initialLessons);
    const [bookings, setBookings] = useState<Booking[]>(initialBookings);
    const [availableSlots, setAvailableSlots] = useState<AvailableSlot[]>(initialSlots);

    // --- モーダル入力値の状態管理 ---
    const [modalLessonId, setModalLessonId] = useState<number>(lessons[0].id);
    const [modalDate, setModalDate] = useState<string>('');
    const [modalTime, setModalTime] = useState<string>('');
    const [modalRepeat, setModalRepeat] = useState<boolean>(false);

    const weekDates = useMemo(() => {
        const start = new Date(currentDate);
        start.setDate(start.getDate() - start.getDay() + (start.getDay() === 0 ? -6 : 1)); // Monday start
        return Array.from({ length: 7 }, (_, i) => {
            const d = new Date(start);
            d.setDate(start.getDate() + i);
            return d;
        });
    }, [currentDate]);

    const timeSlots = Array.from({ length: 16 }, (_, i) => `${i + 7}:00`); // 7 AM to 10 PM

    const handlePrevWeek = () => {
        setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 7)));
    };

    const handleNextWeek = () => {
        setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 7)));
    };

    const handleToday = () => {
        setCurrentDate(new Date());
    };

    // モーダルを開くときに初期値をセット
    const openAddModal = (date?: Date, hour?: number) => {
        let initialDate = '';
        let initialTime = '';
        if (date && hour !== undefined) {
            const d = new Date(date);
            d.setHours(hour, 0, 0, 0);
            initialDate = d.toISOString().split('T')[0];
            initialTime = d.toTimeString().slice(0, 5);
        }
        setModalLessonId(lessons[0].id);
        setModalDate(initialDate);
        setModalTime(initialTime);
        setModalRepeat(false);
        setShowModal(true);
    };

    // スロット追加
    const handleAddSlot = () => {
        if (!modalDate || !modalTime) return;
        const [h, m] = modalTime.split(':').map(Number);
        const start = new Date(modalDate);
        start.setHours(h, m, 0, 0);
        const end = new Date(start);
        end.setHours(start.getHours() + 1); // 1時間枠
        setAvailableSlots([
            ...availableSlots,
            {
                id: Date.now(),
                lessonId: modalLessonId,
                start,
                end,
            },
        ]);
        setShowModal(false);
    };

    const EventComponent = ({ event }: { event: Booking | AvailableSlot }) => {
        const isBooking = 'student' in event;
        const lesson = lessons.find((l) => l.id === event.lessonId);

        return (
            <Popover className="relative h-full" data-oid="50-_6ok">
                {(popoverProps: any) => (
                    <>
                        <Popover.Button
                            className={`w-full h-full text-left p-2 rounded-lg text-white text-xs ${isBooking ? 'bg-wisdom-blue' : 'bg-success-green/80'}`}
                            data-oid="ac7_oov"
                        >
                            <p className="font-semibold" data-oid="lxrk.xb">
                                {lesson?.title}
                            </p>
                            {isBooking && (
                                <p className="opacity-80" data-oid="9d8kjic">
                                    với {event.student}
                                </p>
                            )}
                            <p className="opacity-80 mt-1" data-oid="d89h9f8">
                                {event.start.toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                            </p>
                        </Popover.Button>

                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                            data-oid="c.3.6qp"
                        >
                            <Popover.Panel
                                className="absolute z-10 w-64 p-4 mt-2 bg-white rounded-lg shadow-lg border border-light-border"
                                data-oid="7monmu3"
                            >
                                <div className="space-y-3" data-oid="ppbk7wm">
                                    <h4
                                        className="font-semibold text-charcoal-gray"
                                        data-oid="6xbn-f0"
                                    >
                                        {lesson?.title}
                                    </h4>
                                    <p
                                        className="text-sm text-silver-gray flex items-center"
                                        data-oid="eii5g-:"
                                    >
                                        <Clock className="w-4 h-4 mr-2" data-oid="iadg02w" />{' '}
                                        {event.start.toLocaleString()}
                                    </p>
                                    {isBooking && (
                                        <p
                                            className="text-sm text-silver-gray flex items-center"
                                            data-oid="k-tep2p"
                                        >
                                            <User className="w-4 h-4 mr-2" data-oid="-y1k09r" />{' '}
                                            {event.student}
                                        </p>
                                    )}
                                    <div
                                        className="flex space-x-2 pt-2 border-t border-light-border"
                                        data-oid="q2uqc2h"
                                    >
                                        {isBooking ? (
                                            <button
                                                className="manabi-btn-secondary text-xs px-3 py-1.5 flex-1"
                                                data-oid="o-qxh_1"
                                            >
                                                Nhắn tin
                                            </button>
                                        ) : (
                                            <button
                                                className="manabi-btn-secondary text-xs px-3 py-1.5 flex-1"
                                                data-oid="i9ncyjc"
                                            >
                                                Sửa
                                            </button>
                                        )}
                                        <button
                                            className="text-warning-red hover:bg-warning-red/10 p-2 rounded-lg"
                                            data-oid="j-pvnou"
                                        >
                                            <Trash2 className="w-4 h-4" data-oid="eg73wvh" />
                                        </button>
                                    </div>
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </>
                )}
            </Popover>
        );
    };

    // ナビゲーション項目
    const navItems = [
        { label: 'Trang chủ', href: '/', key: 'home' },
        { label: 'Khóa học', href: '/course', key: 'course' },
        { label: 'Giảng viên', href: '/teacher/list', key: 'teacher' },
        { label: 'Về chúng tôi', href: '/about', key: 'about' },
        { label: 'Trang cá nhân', href: '/user-dashboard/settings', key: 'profile' },
        { label: 'Đổi mật khẩu', href: '/user-dashboard/settings', key: 'password' },
        { label: 'Tin nhắn', href: '/messages', key: 'messages' },
    ];

    const handleLogout = () => {
        alert('Đăng xuất thành công!');
        window.location.href = '/login';
    };

    return (
        <div className="min-h-screen bg-off-white font-['Inter']" data-oid="1o9g9e8">
            {/* ヘッダー */}
            <nav
                className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-30"
                data-oid="gprsmci"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-oid="l-7_3kp">
                    <div className="flex justify-between items-center h-16" data-oid="0yg066x">
                        <a
                            href="/"
                            className="text-2xl font-bold text-[#2A7A8C]"
                            data-oid="ib9l9x6"
                        >
                            Manabi Link
                        </a>
                        <div className="flex items-center space-x-6" data-oid="e1w8c-2">
                            {navItems.map((item) => (
                                <a
                                    key={item.key}
                                    href={item.href}
                                    className={`text-[#343A40] hover:text-[#2A7A8C] ${item.key === 'messages' ? 'font-bold underline' : ''}`}
                                    data-oid="clz371l"
                                >
                                    {item.label}
                                </a>
                            ))}
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-1 px-3 py-2 text-warning-red hover:bg-warning-red/10 rounded-lg transition-colors"
                                data-oid="4pb3f9r"
                            >
                                <LogOut className="w-5 h-5" data-oid="t8.4-aq" /> Đăng xuất
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="max-w-7xl mx-auto p-8" data-oid="wm02y4b">
                {/* Header */}
                <div
                    className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8"
                    data-oid="7.gi1ff"
                >
                    <div data-oid="y65ulne">
                        <h1 className="text-3xl font-bold text-charcoal-gray" data-oid="a8tmxz1">
                            Quản lý Lịch dạy
                        </h1>
                        <p className="text-silver-gray mt-1" data-oid="6r.t-bf">
                            Thiết lập lịch trống, theo dõi các buổi học đã được đặt.
                        </p>
                    </div>
                    <div className="flex items-center space-x-3 mt-4 md:mt-0" data-oid="f.q2dnt">
                        <button
                            onClick={() => openAddModal()}
                            className="manabi-btn-primary flex items-center space-x-2"
                            data-oid="5h6yuvl"
                        >
                            <Plus className="w-4 h-4" data-oid="u3381j5" />
                            <span data-oid="hq8n-fs">Thêm lịch trống</span>
                        </button>
                    </div>
                </div>

                {/* Calendar Controls */}
                <div className="manabi-card p-4 mb-6" data-oid="5f86r_5">
                    <div
                        className="flex flex-col md:flex-row items-center justify-between"
                        data-oid="tj8f:uy"
                    >
                        <div className="flex items-center space-x-2" data-oid="9wx1ucc">
                            <button
                                onClick={handlePrevWeek}
                                className="p-2 rounded-lg hover:bg-light-border text-silver-gray"
                                data-oid="8jx26nl"
                            >
                                <ChevronLeft data-oid="dubm7:i" />
                            </button>
                            <button
                                onClick={handleNextWeek}
                                className="p-2 rounded-lg hover:bg-light-border text-silver-gray"
                                data-oid="580b.:r"
                            >
                                <ChevronRight data-oid=".i5hjbn" />
                            </button>
                            <button
                                onClick={handleToday}
                                className="manabi-btn-secondary text-sm px-4 py-2"
                                data-oid="a4v2_p4"
                            >
                                Hôm nay
                            </button>
                            <h2
                                className="text-lg font-semibold text-charcoal-gray ml-4"
                                data-oid="u3y0:6h"
                            >
                                {new Intl.DateTimeFormat('vi-VN', {
                                    month: 'long',
                                    year: 'numeric',
                                }).format(weekDates[0])}
                            </h2>
                        </div>
                        <div
                            className="flex space-x-1 bg-light-border p-1 rounded-lg mt-4 md:mt-0"
                            data-oid="izv22m9"
                        >
                            {['week', 'month', 'agenda'].map((v) => (
                                <button
                                    key={v}
                                    onClick={() => setView(v as any)}
                                    className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${view === v ? 'bg-white text-wisdom-blue shadow-sm' : 'text-silver-gray hover:text-charcoal-gray'}`}
                                    data-oid="u92vr9r"
                                >
                                    {v === 'week' ? 'Tuần' : v === 'month' ? 'Tháng' : 'Lịch trình'}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Week View Grid */}
                {view === 'week' && (
                    <div className="grid grid-cols-1 md:grid-cols-8 -ml-8" data-oid="7kck3ti">
                        {/* Time Column */}
                        <div className="md:col-span-1 text-right pr-4" data-oid="zzji_8k">
                            {timeSlots.map((time) => (
                                <div
                                    key={time}
                                    className="h-16 flex items-center justify-end"
                                    data-oid="r-8x30:"
                                >
                                    <span className="text-xs text-silver-gray" data-oid="_k3y0jt">
                                        {time}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Day Columns */}
                        <div
                            className="col-span-1 md:col-span-7 grid grid-cols-1 md:grid-cols-7 border-l border-light-border"
                            data-oid="cx90qh5"
                        >
                            {weekDates.map((day, dayIndex) => (
                                <div
                                    key={dayIndex}
                                    className="relative border-r border-light-border"
                                    data-oid="kulplr6"
                                >
                                    <div
                                        className="text-center py-2 border-b border-light-border sticky top-0 bg-off-white z-10"
                                        data-oid="x:izbwh"
                                    >
                                        <p
                                            className="font-semibold text-charcoal-gray"
                                            data-oid="pu3u75k"
                                        >
                                            {
                                                ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'][
                                                    day.getDay()
                                                ]
                                            }
                                        </p>
                                        <p
                                            className={`text-2xl font-bold ${new Date().toDateString() === day.toDateString() ? 'text-energetic-yellow' : 'text-charcoal-gray'}`}
                                            data-oid="e6x2h.p"
                                        >
                                            {day.getDate()}
                                        </p>
                                    </div>
                                    <div className="relative" data-oid="cpsco0-">
                                        {timeSlots.map((time, timeIndex) => (
                                            <div
                                                key={timeIndex}
                                                className="h-16 border-b border-dashed border-light-border"
                                                onClick={() => openAddModal(day, timeIndex + 7)}
                                                data-oid="71juewj"
                                            ></div>
                                        ))}
                                        {/* Render Bookings */}
                                        {bookings
                                            .filter(
                                                (b) =>
                                                    b.start.toDateString() === day.toDateString(),
                                            )
                                            .map((booking) => (
                                                <div
                                                    key={booking.id}
                                                    className="absolute w-full px-1"
                                                    style={{
                                                        top: `${(booking.start.getHours() - 7 + booking.start.getMinutes() / 60) * 4}rem`,
                                                        height: `${((booking.end.getTime() - booking.start.getTime()) / (1000 * 60 * 60)) * 4}rem`,
                                                    }}
                                                    data-oid="6h8n27k"
                                                >
                                                    <EventComponent
                                                        event={booking}
                                                        data-oid="76_i4ao"
                                                    />
                                                </div>
                                            ))}
                                        {/* Render Available Slots */}
                                        {availableSlots
                                            .filter(
                                                (s) =>
                                                    s.start.toDateString() === day.toDateString(),
                                            )
                                            .map((slot) => (
                                                <div
                                                    key={slot.id}
                                                    className="absolute w-full px-1"
                                                    style={{
                                                        top: `${(slot.start.getHours() - 7 + slot.start.getMinutes() / 60) * 4}rem`,
                                                        height: `${((slot.end.getTime() - slot.start.getTime()) / (1000 * 60 * 60)) * 4}rem`,
                                                    }}
                                                    data-oid="em_zcaq"
                                                >
                                                    <EventComponent
                                                        event={slot}
                                                        data-oid="qhdjb:h"
                                                    />
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {/* Placeholder for other views */}
                {view !== 'week' && (
                    <div className="manabi-card p-16 text-center" data-oid="-1qyb0t">
                        <h3 className="text-xl text-charcoal-gray font-semibold" data-oid=".1n7c.6">
                            Chế độ xem {view === 'month' ? 'Tháng' : 'Lịch trình'}
                        </h3>
                        <p className="text-silver-gray mt-2" data-oid="l943bf5">
                            Chức năng này sẽ được triển khai trong các phiên bản sau.
                        </p>
                    </div>
                )}
            </div>

            {/* Add/Edit Slot Modal */}
            {showModal && (
                <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                    data-oid="xuq_5f1"
                >
                    <div className="manabi-card w-full max-w-md p-6" data-oid="cw6l9av">
                        <div className="flex justify-between items-center mb-4" data-oid="mctmr2.">
                            <h2 className="text-xl font-bold text-charcoal-gray" data-oid="lxf9.b1">
                                Thêm lịch trống
                            </h2>
                            <button
                                onClick={() => setShowModal(false)}
                                className="text-silver-gray hover:text-charcoal-gray"
                                data-oid="g8r10aa"
                            >
                                <X data-oid="cmjk.9j" />
                            </button>
                        </div>
                        <div className="space-y-4" data-oid="gxj2-8c">
                            <div data-oid="w3i3l1s">
                                <label
                                    className="block text-sm font-medium text-charcoal-gray mb-1"
                                    data-oid="jlah1qd"
                                >
                                    Chọn lớp học
                                </label>
                                <select
                                    className="manabi-input"
                                    value={modalLessonId}
                                    onChange={(e) => setModalLessonId(Number(e.target.value))}
                                    data-oid="13h6bh9"
                                >
                                    {lessons.map((l) => (
                                        <option key={l.id} value={l.id} data-oid="znvag3d">
                                            {l.title}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4" data-oid="uf.0kj:">
                                <div data-oid="fqc39gh">
                                    <label
                                        className="block text-sm font-medium text-charcoal-gray mb-1"
                                        data-oid=":p-bxtl"
                                    >
                                        Ngày
                                    </label>
                                    <input
                                        type="date"
                                        className="manabi-input"
                                        value={modalDate}
                                        onChange={(e) => setModalDate(e.target.value)}
                                        data-oid="-99qv1l"
                                    />
                                </div>
                                <div data-oid="av0a8p9">
                                    <label
                                        className="block text-sm font-medium text-charcoal-gray mb-1"
                                        data-oid="v49h-it"
                                    >
                                        Thời gian
                                    </label>
                                    <input
                                        type="time"
                                        className="manabi-input"
                                        value={modalTime}
                                        onChange={(e) => setModalTime(e.target.value)}
                                        data-oid="6sqath-"
                                    />
                                </div>
                            </div>
                            <div data-oid="dynpkip">
                                <label className="flex items-center space-x-2" data-oid="ui9v7tj">
                                    <input
                                        type="checkbox"
                                        className="rounded text-wisdom-blue focus:ring-wisdom-blue"
                                        checked={modalRepeat}
                                        onChange={(e) => setModalRepeat(e.target.checked)}
                                        data-oid="km2zt-y"
                                    />

                                    <span className="text-sm text-charcoal-gray" data-oid="a_967lf">
                                        Lặp lại hàng tuần
                                    </span>
                                </label>
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 mt-6" data-oid=".yt1uz7">
                            <button
                                onClick={() => setShowModal(false)}
                                className="manabi-btn-secondary px-4 py-2 text-sm"
                                data-oid="3n._:11"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handleAddSlot}
                                className="manabi-btn-primary px-4 py-2 text-sm"
                                data-oid="69dl2vz"
                            >
                                Lưu
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
