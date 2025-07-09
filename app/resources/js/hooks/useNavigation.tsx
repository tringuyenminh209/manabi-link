import { useAuth } from './useAuth';

interface MenuItem {
    name: string;
    href: string;
    action?: string;
}

export const useNavigation = () => {
    const { user, isAuthenticated, hasRole } = useAuth();

    const getPublicNavigation = (): MenuItem[] => [
        { name: 'Trang chủ', href: '/', action: undefined },
        { name: 'Khóa học', href: '/courses', action: undefined },
        { name: 'Giảng viên', href: '/teachers', action: undefined },
        { name: 'Về chúng tôi', href: '/about', action: undefined },
    ];

    const getLearnerNavigation = (): MenuItem[] => [
        { name: 'Dashboard', href: '/dashboard', action: undefined },
        { name: 'Khóa học của tôi', href: '/my-courses', action: undefined },
        { name: 'Lịch học', href: '/my-schedule', action: undefined },
        { name: 'Đặt lịch', href: '/my-bookings', action: undefined },
        { name: 'Đánh giá', href: '/my-reviews', action: undefined },
        { name: 'Cài đặt', href: '/learner/settings', action: undefined },
    ];

    const getTeacherNavigation = (): MenuItem[] => [
        { name: 'Dashboard', href: '/teacher/dashboard', action: undefined },
        { name: 'Khóa học của tôi', href: '/teacher/lessons', action: undefined },
        { name: 'Lịch dạy', href: '/teacher/schedule', action: undefined },
        { name: 'Học viên', href: '/teacher/students', action: undefined },
        { name: 'Thanh toán', href: '/teacher/payouts', action: undefined },
        { name: 'Hồ sơ', href: '/teacher/profile', action: undefined },
    ];

    const getAdminNavigation = (): MenuItem[] => [
        { name: 'Dashboard', href: '/admin', action: undefined },
        { name: 'Quản lý người dùng', href: '/admin/users', action: undefined },
        { name: 'Quản lý danh mục', href: '/admin/categories', action: undefined },
        { name: 'Quản lý khóa học', href: '/admin/courses', action: undefined },
        { name: 'Tài chính', href: '/admin/finance', action: undefined },
        { name: 'Báo cáo', href: '/admin/reports', action: undefined },
        { name: 'Cài đặt', href: '/admin/settings', action: undefined },
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
                { name: 'Đăng nhập', href: '/login', action: undefined },
                { name: 'Đăng ký', href: '/register', action: undefined },
            ];
        }

        const baseItems: MenuItem[] = [
            { name: 'Hồ sơ', href: '/profile', action: undefined },
            { name: 'Cài đặt', href: '/settings', action: undefined },
        ];

        if (hasRole('admin')) {
            baseItems.unshift({ name: 'Admin Panel', href: '/admin', action: undefined });
        }

        baseItems.push({ name: 'Đăng xuất', href: '/logout', action: 'logout' });

        return baseItems;
    };

    return {
        getCurrentNavigation,
        getUserMenuItems,
        isAuthenticated,
        user,
    };
};
