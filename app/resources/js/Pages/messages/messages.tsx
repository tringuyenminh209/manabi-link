'use client';

import React, { useState, Fragment } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    Search,
    Paperclip,
    Image as ImageIcon,
    Smile,
    Send,
    User,
    LogOut,
    Menu,
    X,
    MessageSquare,
    Users,
    BookOpen,
    Settings,
    LayoutDashboard,
    Star,
    ChevronDown,
    Phone,
    Video,
    Archive,
    MoreHorizontal,
    FileText,
    Check,
    CheckCheck,
    Eye,
    ExternalLink,
    Filter,
} from 'lucide-react';
import { Popover, Transition, Menu as HeadlessMenu } from '@headlessui/react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { EmptyState } from '@/components/ui/EmptyState';

// --- Interfaces and Dummy Data ---
const conversations = [
    {
        id: 1,
        name: '山田 太郎 (Yamada Taro)',
        avatar: '/api/placeholder/48/48?name=YT',
        online: true,
        lastMessage: 'ご連絡ありがとうございます。それでは、よろしくお願いします。',
        time: '10:25',
        unread: 2,
        pinned: true,
        course: { id: 1, name: 'Guitar cơ bản cho người mới bắt đầu' },
        profileId: 'sensei-1',
        messages: [
            {
                id: 1,
                fromMe: false,
                text: 'こんにちは！レッスンについて質問があります。',
                time: '10:00',
                date: '2025-06-24',
                status: 'read', // 'sent', 'delivered', 'read'
            },
            {
                id: 2,
                fromMe: true,
                text: 'こんにちは、山田です。どうぞ、何でも聞いてください。',
                time: '10:01',
                date: '2025-06-24',
                status: 'read',
            },
            {
                id: 3,
                fromMe: false,
                text: 'ご連絡ありがとうございます。それでは、よろしくお願いします。',
                time: '10:25',
                date: '2025-06-24',
                status: 'read',
            },
        ],
    },
    {
        id: 2,
        name: '鈴木 一郎 (Suzuki Ichiro)',
        avatar: '/api/placeholder/48/48?name=SI',
        online: false,
        lastMessage: '承知いたしました。準備しておきます。',
        time: 'Hôm qua',
        unread: 0,
        pinned: false,
        course: { id: 2, name: 'Tiếng Nhật giao tiếp hàng ngày' },
        profileId: 'sensei-2',
        messages: [
            {
                id: 1,
                fromMe: false,
                text: '明日のレッスンの資料です。',
                time: '15:30',
                date: '2025-06-23',
                status: 'read',
            },
            {
                id: 2,
                fromMe: true,
                text: '承知いたしました。準備しておきます。',
                time: '15:32',
                date: '2025-06-23',
                status: 'delivered',
            },
        ],
    },
];

const navItems = [
    { id: 'dashboard', label: 'Bảng điều khiển', icon: LayoutDashboard, href: '/user-dashboard' },
    { id: 'messages', label: 'Tin nhắn', icon: MessageSquare, href: '/messages' },
    {
        id: 'courses',
        label: 'Khóa học của tôi',
        icon: BookOpen,
        href: '/user-dashboard/my-courses',
    },
    { id: 'reviews', label: 'Đánh giá', icon: Star, href: '/user-dashboard/reviews' },
    { id: 'settings', label: 'Cài đặt', icon: Settings, href: '/user-dashboard/settings' },
];

// --- Main Component ---
export default function MessagesPage() {
    const [selectedId, setSelectedId] = useState(conversations[0].id);
    const [input, setInput] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [filter, setFilter] = useState<'all' | 'unread' | 'pinned'>('all');
    const [searchQuery, setSearchQuery] = useState('');

    const selectedConv = conversations.find((c) => c.id === selectedId)!;

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
        console.log('Sending message:', input);
        setInput('');
    };

    const filteredConversations = conversations.filter((c) => {
        const matchesFilter =
            filter === 'unread' ? c.unread > 0 : filter === 'pinned' ? c.pinned : true;

        const matchesSearch = searchQuery
            ? c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
            : true;

        return matchesFilter && matchesSearch;
    });

    const MessageBubble = ({ msg, fromMe }: { msg: any; fromMe: boolean }) => {
        const getStatusIcon = (status: string) => {
            switch (status) {
                case 'sent':
                    return <Check className="w-3 h-3" data-oid="21b:z1:" />;
                case 'delivered':
                    return <CheckCheck className="w-3 h-3" data-oid="-f572b2" />;
                case 'read':
                    return <Eye className="w-3 h-3" data-oid="verbfne" />;
                default:
                    return null;
            }
        };

        return (
            <div
                className={`flex items-end gap-2 ${fromMe ? 'justify-end' : 'justify-start'}`}
                data-oid="mswzd19"
            >
                {!fromMe && (
                    <img
                        src={selectedConv.avatar}
                        alt={selectedConv.name}
                        className="w-8 h-8 rounded-full"
                        data-oid="oby5:2j"
                    />
                )}
                <div
                    className={`manabi-message-bubble ${fromMe ? 'manabi-message-sent' : 'manabi-message-received'}`}
                    data-oid="9_yeofn"
                >
                    <p data-oid="n30838u">{msg.text}</p>
                    <div className="flex items-center justify-end gap-1 mt-1" data-oid="gpm5rk6">
                        <span className="text-xs opacity-70" data-oid="7mb99sn">
                            {msg.time}
                        </span>
                        {fromMe && getStatusIcon(msg.status)}
                    </div>
                </div>
            </div>
        );
    };

    const DateSeparator = ({ date }: { date: string }) => (
        <div className="flex items-center my-4" data-oid="tylgac7">
            <div className="flex-grow border-t border-light-border" data-oid="43._ls4"></div>
            <span className="flex-shrink mx-4 text-xs text-silver-gray" data-oid="ercbk1l">
                {new Date(date).toLocaleDateString('vi-VN', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                })}
            </span>
            <div className="flex-grow border-t border-light-border" data-oid="nlb7mr6"></div>
        </div>
    );

    return (
        <div className="h-screen w-full flex bg-off-white font-['Inter']" data-oid="i7vyw6b">
            {/* Mobile Navigation Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                    data-oid="3b95q.-"
                />
            )}

            {/* Sidebar Navigation */}
            <aside
                className={`fixed lg:relative inset-y-0 left-0 z-50 w-64 bg-white border-r border-light-border flex-col transform transition-transform duration-300 ease-in-out ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                }`}
                data-oid="p2tc-14"
            >
                <div
                    className="h-16 flex items-center justify-between px-6 border-b border-light-border"
                    data-oid="0ltq81j"
                >
                    <Link
                        href="/"
                        className="text-2xl font-bold text-wisdom-blue"
                        data-oid="k1d24ng"
                    >
                        Manabi Link
                    </Link>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden p-2 text-silver-gray hover:text-charcoal-gray"
                        data-oid="jmakku-"
                    >
                        <X className="w-5 h-5" data-oid="gvw3s.." />
                    </button>
                </div>
                <nav className="flex-1 p-4 space-y-2" data-oid="t_kkgua">
                    {navItems.map((item) => (
                        <Link
                            key={item.id}
                            href={item.href}
                            className={`manabi-nav-item ${item.id === 'messages' ? 'manabi-nav-item-active' : ''}`}
                            onClick={() => setSidebarOpen(false)}
                            data-oid="5nhkwss"
                        >
                            <item.icon className="w-5 h-5" data-oid="e_v24l_" />
                            <span data-oid="o4.fcpd">{item.label}</span>
                        </Link>
                    ))}
                </nav>
                <div className="p-4 border-t border-light-border" data-oid="9xil:-h">
                    <button
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-warning-red hover:bg-warning-red/10 transition-colors"
                        data-oid="7hxb4q9"
                    >
                        <LogOut className="w-5 h-5" data-oid="x256poa" />
                        <span data-oid="wxlx_8_">Đăng xuất</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-screen" data-oid="3:qe2fy">
                {/* Mobile Header */}
                <div
                    className="lg:hidden h-16 flex items-center justify-between px-4 border-b border-light-border bg-white"
                    data-oid="6mv2sk3"
                >
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-2 text-silver-gray hover:text-charcoal-gray"
                        data-oid="xk4pxs8"
                    >
                        <Menu className="w-5 h-5" data-oid="5za9jl2" />
                    </button>
                    <h1 className="text-lg font-semibold text-charcoal-gray" data-oid="42pjxkh">
                        Tin nhắn
                    </h1>
                    <div className="w-10" data-oid="mw7ajcw" /> {/* Spacer for centering */}
                </div>

                <div className="flex-1 flex overflow-hidden" data-oid=".g8-2v.">
                    {/* Conversations List */}
                    <div
                        className={`w-full lg:w-96 bg-white border-r border-light-border flex flex-col ${
                            selectedId ? 'hidden lg:flex' : 'flex'
                        }`}
                        data-oid="1hddx4e"
                    >
                        <div className="p-4 border-b border-light-border" data-oid=":e:.:mu">
                            <h1
                                className="manabi-heading-2 mb-4 lg:block hidden"
                                data-oid="fxikzgo"
                            >
                                Tin nhắn
                            </h1>
                            <Input
                                placeholder="Tìm kiếm tin nhắn..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                leftIcon={<Search className="w-4 h-4" data-oid="1be4h87" />}
                                data-oid="ji6srnw"
                            />
                        </div>
                        <div className="border-b border-light-border px-4 py-2" data-oid=".n:v3j_">
                            <div className="flex space-x-1" data-oid="27u.vtu">
                                <button
                                    onClick={() => setFilter('all')}
                                    className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                                        filter === 'all'
                                            ? 'bg-wisdom-blue/10 text-wisdom-blue font-medium'
                                            : 'text-silver-gray hover:text-charcoal-gray'
                                    }`}
                                    data-oid="kqq67lr"
                                >
                                    Tất cả
                                </button>
                                <button
                                    onClick={() => setFilter('unread')}
                                    className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                                        filter === 'unread'
                                            ? 'bg-wisdom-blue/10 text-wisdom-blue font-medium'
                                            : 'text-silver-gray hover:text-charcoal-gray'
                                    }`}
                                    data-oid="htpzp5t"
                                >
                                    Chưa đọc
                                </button>
                                <button
                                    onClick={() => setFilter('pinned')}
                                    className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                                        filter === 'pinned'
                                            ? 'bg-wisdom-blue/10 text-wisdom-blue font-medium'
                                            : 'text-silver-gray hover:text-charcoal-gray'
                                    }`}
                                    data-oid="98wxka_"
                                >
                                    Đã ghim
                                </button>
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto" data-oid="-ush:q.">
                            {filteredConversations.length === 0 ? (
                                <EmptyState
                                    Icon={MessageSquare}
                                    title={searchQuery ? "Không tìm thấy tin nhắn" : "Chưa có tin nhắn"}
                                    description={searchQuery 
                                        ? "Thử tìm kiếm với từ khóa khác" 
                                        : "Bắt đầu cuộc trò chuyện bằng cách đặt một khóa học."
                                    }
                                    actionText={searchQuery ? undefined : "Khám phá khóa học"}
                                    onActionClick={searchQuery ? undefined : () => window.location.href = '/course'}
                                    variant="compact"
                                />
                            ) : (
                                filteredConversations.map((conv) => (
                                    <div
                                        key={conv.id}
                                        onClick={() => {
                                            setSelectedId(conv.id);
                                            // Close sidebar on mobile when selecting a conversation
                                            if (window.innerWidth < 1024) {
                                                setSidebarOpen(false);
                                            }
                                        }}
                                        className={`flex items-start p-4 gap-3 cursor-pointer border-l-4 transition-all duration-200 ${
                                            selectedId === conv.id
                                                ? 'bg-wisdom-blue/5 border-wisdom-blue'
                                                : 'border-transparent hover:bg-light-border/50'
                                        }`}
                                        data-oid="5315av4"
                                    >
                                        <img
                                            src={conv.avatar}
                                            alt={conv.name}
                                            className="w-12 h-12 rounded-full"
                                            data-oid="uso-vte"
                                        />

                                        <div className="flex-1 truncate" data-oid="u.la0is">
                                            <div
                                                className="flex justify-between items-center"
                                                data-oid="phhmw8c"
                                            >
                                                <p
                                                    className="font-semibold text-charcoal-gray truncate"
                                                    data-oid="y1sqgh6"
                                                >
                                                    {conv.name}
                                                </p>
                                                <p
                                                    className="text-xs text-silver-gray flex-shrink-0 ml-2"
                                                    data-oid="e8e4lcp"
                                                >
                                                    {conv.time}
                                                </p>
                                            </div>
                                            <div
                                                className="flex justify-between items-center mt-1"
                                                data-oid="hp6dtez"
                                            >
                                                <p
                                                    className="text-sm text-silver-gray truncate"
                                                    data-oid="orwl2qh"
                                                >
                                                    {conv.lastMessage}
                                                </p>
                                                {conv.unread > 0 && (
                                                    <Badge
                                                        variant="info"
                                                        className="ml-2"
                                                        data-oid="6vwlqpo"
                                                    >
                                                        {conv.unread}
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Chat Window */}
                    <div
                        className={`flex-1 flex flex-col bg-off-white ${!selectedId ? 'hidden lg:flex' : 'flex'}`}
                        data-oid=":4deslk"
                    >
                        <header
                            className="h-16 flex items-center justify-between px-4 lg:px-6 border-b border-light-border bg-white"
                            data-oid="_znfk7."
                        >
                            <div className="flex items-center gap-3" data-oid="_bdp2yp">
                                <button
                                    onClick={() => setSelectedId(0)}
                                    className="lg:hidden p-2 text-silver-gray hover:text-charcoal-gray"
                                    data-oid="_d935dg"
                                >
                                    <ChevronDown className="w-5 h-5 rotate-90" data-oid="dzz.4en" />
                                </button>
                                <div className="relative" data-oid="s552dci">
                                    <img
                                        src={selectedConv.avatar}
                                        alt={selectedConv.name}
                                        className="w-10 h-10 rounded-full"
                                        data-oid="y1jh0fw"
                                    />

                                    <span
                                        className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                                            selectedConv.online
                                                ? 'bg-success-green'
                                                : 'bg-silver-gray'
                                        }`}
                                        data-oid="sqkazo."
                                    ></span>
                                </div>
                                <div data-oid="z4njq-w">
                                    <div className="flex items-center gap-2" data-oid="l2qpnod">
                                        <h2
                                            className="font-semibold text-charcoal-gray"
                                            data-oid="dldu.h4"
                                        >
                                            {selectedConv.name}
                                        </h2>
                                        <Link
                                            href={`/teacher/profile/${selectedConv.profileId}`}
                                            className="p-1 text-silver-gray hover:text-wisdom-blue transition-colors"
                                            title="Xem hồ sơ"
                                            data-oid="7iue38v"
                                        >
                                            <ExternalLink className="w-4 h-4" data-oid="1k4b:jb" />
                                        </Link>
                                    </div>
                                    <p className="text-sm text-silver-gray" data-oid="as_l30o">
                                        {selectedConv.course.name}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2" data-oid="pn56rbe">
                                <button
                                    className="p-2 text-silver-gray hover:text-wisdom-blue transition-colors"
                                    title="Gọi thoại"
                                    data-oid="s.33j8z"
                                >
                                    <Phone className="w-5 h-5" data-oid="j-3axk4" />
                                </button>
                                <button
                                    className="p-2 text-silver-gray hover:text-wisdom-blue transition-colors"
                                    title="Gọi video"
                                    data-oid="-sk48oo"
                                >
                                    <Video className="w-5 h-5" data-oid="4z67w3d" />
                                </button>
                                <button
                                    className="p-2 text-silver-gray hover:text-wisdom-blue transition-colors"
                                    title="Thêm tùy chọn"
                                    data-oid="3fs6gw5"
                                >
                                    <MoreHorizontal className="w-5 h-5" data-oid="gswl-nt" />
                                </button>
                            </div>
                        </header>

                        {/* Messages Area */}
                        <div
                            className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4"
                            data-oid="jjaqbe6"
                        >
                            {selectedConv.messages.map((msg, index) => (
                                <Fragment key={msg.id}>
                                    {index === 0 ||
                                    selectedConv.messages[index - 1].date !== msg.date ? (
                                        <DateSeparator date={msg.date} data-oid="kb_ugdq" />
                                    ) : null}
                                    <MessageBubble
                                        msg={msg}
                                        fromMe={msg.fromMe}
                                        data-oid="_l23_j3"
                                    />
                                </Fragment>
                            ))}
                        </div>

                        {/* Message Input */}
                        <div
                            className="p-4 border-t border-light-border bg-white"
                            data-oid="j:e.b.n"
                        >
                            <form
                                onSubmit={handleSend}
                                className="flex items-end gap-3"
                                data-oid="hr7zcwf"
                            >
                                <div className="flex-1" data-oid="x2y_urg">
                                    <textarea
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder="Nhập tin nhắn..."
                                        className="manabi-textarea resize-none"
                                        rows={1}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && !e.shiftKey) {
                                                e.preventDefault();
                                                handleSend(e);
                                            }
                                        }}
                                        data-oid="cftx7l2"
                                    />
                                </div>
                                <div className="flex items-center gap-2" data-oid="pn9aqjy">
                                    <button
                                        type="button"
                                        className="p-2 text-silver-gray hover:text-wisdom-blue transition-colors"
                                        title="Đính kèm file"
                                        data-oid="3v.j.ao"
                                    >
                                        <Paperclip className="w-5 h-5" data-oid="mtln1py" />
                                    </button>
                                    <button
                                        type="button"
                                        className="p-2 text-silver-gray hover:text-wisdom-blue transition-colors"
                                        title="Gửi ảnh"
                                        data-oid="hw7m_m-"
                                    >
                                        <ImageIcon className="w-5 h-5" data-oid="njsihus" />
                                    </button>
                                    <button
                                        type="button"
                                        className="p-2 text-silver-gray hover:text-wisdom-blue transition-colors"
                                        title="Emoji"
                                        data-oid=".5hd950"
                                    >
                                        <Smile className="w-5 h-5" data-oid="0xr:mj6" />
                                    </button>
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        size="sm"
                                        disabled={!input.trim()}
                                        leftIcon={<Send className="w-4 h-4" data-oid="cx94s-e" />}
                                        data-oid="y350hcs"
                                    >
                                        Gửi
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
