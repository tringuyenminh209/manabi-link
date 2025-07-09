import { useState, Fragment } from 'react';
import { Bell, Search, Menu, X, Globe, User, LogOut, LayoutDashboard, Settings, BookOpen, Calendar } from 'lucide-react';
import { Menu as HeadlessMenu, Transition } from '@headlessui/react';
import { Button } from '@/Components/Button';
import { cn } from '@/lib/utils';
import { NotificationPopover } from '@/Components/NotificationPopover';
import { useAuth } from '@/hooks/useAuth';
import { useNavigation } from '@/hooks/useNavigation';
import { Link } from 'react-router-dom';

interface AuthenticatedLayoutProps {
    children: React.ReactNode;
    className?: string;
}

export default function AuthenticatedLayout({ children, className }: AuthenticatedLayoutProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [languageOpen, setLanguageOpen] = useState(false);
    const { user, isAuthenticated, logout } = useAuth();
    const { getCurrentNavigation, getUserMenuItems } = useNavigation();

    const navigation = getCurrentNavigation();
    const userMenuItems = getUserMenuItems();

    const languages = [
        { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
        { code: 'en', name: 'English', flag: '🇺🇸' },
        { code: 'ja', name: '日本語', flag: '🇯🇵' },
    ];

    const handleLogout = () => {
        logout();
        // Redirect sẽ được xử lý trong useAuth
    };

    return (
        <div className="min-h-screen bg-off-white">
            <header className={cn('bg-white shadow-sm border-b border-light-border', className)}>
                <div className="manabi-container">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <div className="flex items-center space-x-3">
                            <Link to="/" className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-wisdom-blue rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">M</span>
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-charcoal-gray">Manabi Link</h1>
                                    <p className="text-xs text-silver-gray">Học tập trực tuyến</p>
                                </div>
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-8">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className="text-charcoal-gray hover:text-wisdom-blue font-medium transition-colors"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </nav>

                        {/* Right side actions */}
                        <div className="flex items-center space-x-4">
                            {/* Search */}
                            <div className="hidden md:flex items-center relative">
                                <Search className="absolute left-3 w-4 h-4 text-silver-gray" />
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm khóa học..."
                                    className="pl-10 pr-4 py-2 border border-input-border rounded-lg text-sm focus:outline-none focus:border-wisdom-blue"
                                />
                            </div>

                            {/* Language Selector */}
                            <div className="relative">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setLanguageOpen(!languageOpen)}
                                    className="flex items-center space-x-2"
                                >
                                    <Globe className="w-4 h-4" />
                                    <span className="hidden sm:inline">Tiếng Việt</span>
                                </Button>

                                {languageOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-light-border py-2 z-50">
                                        {languages.map((lang) => (
                                            <button
                                                key={lang.code}
                                                className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-off-white transition-colors"
                                                onClick={() => setLanguageOpen(false)}
                                            >
                                                <span className="text-lg">{lang.flag}</span>
                                                <span className="text-charcoal-gray">{lang.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Notifications */}
                            <NotificationPopover />

                            {/* User Menu */}
                            <HeadlessMenu as="div" className="relative">
                                <HeadlessMenu.Button className="flex items-center space-x-2 hover:bg-off-white rounded-lg p-2 transition-colors">
                                    <div className="w-8 h-8 bg-wisdom-blue/10 rounded-full flex items-center justify-center">
                                        <User className="w-4 h-4 text-wisdom-blue" />
                                    </div>
                                    <span className="hidden sm:inline font-medium text-charcoal-gray">
                                        {user?.name || 'User'}
                                    </span>
                                    <svg className="w-4 h-4 text-silver-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </HeadlessMenu.Button>

                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <HeadlessMenu.Items className="absolute right-0 mt-2 w-56 origin-top-right bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                                        <div className="py-1">
                                            {/* User Info */}
                                            <div className="px-4 py-3 border-b border-light-border">
                                                <p className="text-sm font-medium text-charcoal-gray">{user?.name || 'User'}</p>
                                                <p className="text-xs text-silver-gray">{user?.email || 'user@example.com'}</p>
                                            </div>

                                            {/* Menu Items */}
                                            {userMenuItems.map((item) => (
                                                <HeadlessMenu.Item key={item.name}>
                                                    {({ active }) => (
                                                        item.action === 'logout' ? (
                                                            <button
                                                                onClick={handleLogout}
                                                                className={`${
                                                                    active ? 'bg-off-white' : ''
                                                                } group flex w-full items-center px-4 py-2 text-sm text-warning-red hover:bg-off-white transition-colors`}
                                                            >
                                                                <LogOut className="mr-3 h-5 w-5" />
                                                                {item.name}
                                                            </button>
                                                        ) : (
                                                            <Link
                                                                to={item.href}
                                                                className={`${
                                                                    active ? 'bg-off-white' : ''
                                                                } group flex items-center px-4 py-2 text-sm text-charcoal-gray hover:bg-off-white transition-colors`}
                                                            >
                                                                {item.name}
                                                            </Link>
                                                        )
                                                    )}
                                                </HeadlessMenu.Item>
                                            ))}
                                        </div>
                                    </HeadlessMenu.Items>
                                </Transition>
                            </HeadlessMenu>

                            {/* Mobile menu button */}
                            <Button
                                variant="ghost"
                                size="sm"
                                className="md:hidden"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            >
                                {mobileMenuOpen ? (
                                    <X className="w-5 h-5" />
                                ) : (
                                    <Menu className="w-5 h-5" />
                                )}
                            </Button>
                        </div>
                    </div>

                    {/* Mobile Navigation */}
                    {mobileMenuOpen && (
                        <div className="md:hidden border-t border-light-border py-4">
                            <nav className="space-y-2">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        className="block px-4 py-2 text-charcoal-gray hover:text-wisdom-blue hover:bg-off-white rounded-lg transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </nav>

                            {/* Mobile User Menu */}
                            <div className="mt-4 border-t border-light-border pt-4">
                                <div className="px-4 py-2">
                                    <p className="text-sm font-medium text-charcoal-gray">{user?.name || 'User'}</p>
                                    <p className="text-xs text-silver-gray">{user?.email || 'user@example.com'}</p>
                                </div>
                                {userMenuItems.map((item) => (
                                    item.action === 'logout' ? (
                                        <button
                                            key={item.name}
                                            onClick={handleLogout}
                                            className="flex items-center w-full px-4 py-2 text-warning-red hover:bg-off-white transition-colors"
                                        >
                                            <LogOut className="mr-3 h-5 w-5" />
                                            {item.name}
                                        </button>
                                    ) : (
                                        <Link
                                            key={item.name}
                                            to={item.href}
                                            className="flex items-center px-4 py-2 text-charcoal-gray hover:text-wisdom-blue hover:bg-off-white transition-colors"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                    )
                                ))}
                            </div>

                            {/* Mobile Search */}
                            <div className="mt-4 px-4">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-silver-gray" />
                                    <input
                                        type="text"
                                        placeholder="Tìm kiếm khóa học..."
                                        className="w-full pl-10 pr-4 py-2 border border-input-border rounded-lg text-sm focus:outline-none focus:border-wisdom-blue"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1">
                {children}
            </main>
        </div>
    );
}
