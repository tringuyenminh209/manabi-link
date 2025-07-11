import { useAuth } from './useAuth';

interface MenuItem {
    key: string;
    name: string;
    href: string;
    action?: string;
}

export const useNavigation = () => {
    const { user, isAuthenticated, hasRole } = useAuth();

    const getPublicNavigation = (): MenuItem[] => [
        { key: 'home', name: 'Trang chủ', href: '/', action: undefined },
        { key: 'courses', name: 'Khóa học', href: '/courses', action: undefined },
        { key: 'teachers', name: 'Giảng viên', href: '/teachers', action: undefined },
        { key: 'about', name: 'Về chúng tôi', href: '/about', action: undefined },
    ];

    const getLearnerNavigation = (): MenuItem[] => [
        { key: 'dashboard', name: 'Dashboard', href: '/dashboard', action: undefined },
        { key: 'my-courses', name: 'Khóa học của tôi', href: '/my-courses', action: undefined },
        { key: 'schedule', name: 'Lịch học', href: '/my-schedule', action: undefined },
        { key: 'bookings', name: 'Đặt lịch', href: '/my-bookings', action: undefined },
        { key: 'reviews', name: 'Đánh giá', href: '/my-reviews', action: undefined },
        { key: 'settings', name: 'Cài đặt', href: '/learner/settings', action: undefined },
    ];

    const getTeacherNavigation = (): MenuItem[] => [
        { key: 'dashboard', name: 'Dashboard', href: '/teacher/dashboard', action: undefined },
        { key: 'lessons', name: 'Khóa học của tôi', href: '/teacher/lessons', action: undefined },
        { key: 'schedule', name: 'Lịch dạy', href: '/teacher/schedule', action: undefined },
        { key: 'students', name: 'Học viên', href: '/teacher/students', action: undefined },
        { key: 'payouts', name: 'Thanh toán', href: '/teacher/payouts', action: undefined },
        { key: 'profile', name: 'Hồ sơ', href: '/teacher/profile', action: undefined },
    ];

    const getAdminNavigation = (): MenuItem[] => [
        { key: 'dashboard', name: 'Dashboard', href: '/admin', action: undefined },
        { key: 'users', name: 'Quản lý người dùng', href: '/admin/users', action: undefined },
        { key: 'categories', name: 'Quản lý danh mục', href: '/admin/categories', action: undefined },
        { key: 'courses', name: 'Quản lý khóa học', href: '/admin/courses', action: undefined },
        { key: 'finance', name: 'Tài chính', href: '/admin/finance', action: undefined },
        { key: 'reports', name: 'Báo cáo', href: '/admin/reports', action: undefined },
        { key: 'settings', name: 'Cài đặt', href: '/admin/settings', action: undefined },
    ];

    const getCurrentNavigation = (): MenuItem[] => {
        if (!isAuthenticated) {
            return getPublicNavigation();
        }

        if (hasRole('admin')) {
            return getAdminNavigation();
        }

        if (hasRole('teacher')) {
            return getTeacherNavigation();
        }

        if (hasRole('learner')) {
            return getLearnerNavigation();
        }

        return getPublicNavigation();
    };

    const getUserMenuItems = (): MenuItem[] => {
        if (!isAuthenticated) {
            return [
                { key: 'login', name: 'Đăng nhập', href: '/login', action: undefined },
                { key: 'register', name: 'Đăng ký', href: '/register', action: undefined },
            ];
        }

        const baseItems: MenuItem[] = [
            { key: 'profile', name: 'Hồ sơ', href: '/profile', action: undefined },
            { key: 'settings', name: 'Cài đặt', href: '/settings', action: undefined },
        ];

        if (hasRole('admin')) {
            baseItems.unshift({ key: 'admin', name: 'Admin Panel', href: '/admin', action: undefined });
        }

        baseItems.push({ key: 'logout', name: 'Đăng xuất', href: '/logout', action: 'logout' });

        return baseItems;
    };

    return {
        getCurrentNavigation,
        getUserMenuItems,
        isAuthenticated,
        user,
    };
};
