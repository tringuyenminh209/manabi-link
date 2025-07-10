import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { authAPI } from '../api/auth.js';

// Định nghĩa type cho User
interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    ekyc_status?: 'not_verified' | 'pending' | 'verified' | 'rejected';
    avatar_path?: string;
    // Thêm các field khác nếu có
}

// Định nghĩa type cho AuthContext
interface AuthContextType {
    user: User | null;
    loading: boolean;
    error: string | null;
    login: (credentials: { email: string; password: string }) => Promise<any>;
    register: (userData: any) => Promise<any>;
    logout: () => Promise<void>;
    updateProfile: (profileData: any) => Promise<any>;
    hasRole: (role: string) => boolean;
    hasAnyRole: (roles: string[]) => boolean;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Kiểm tra user đã đăng nhập
    const checkAuth = async () => {
        try {
            const token = localStorage.getItem('auth_token');
            if (token) {
                // Thử lấy user từ localStorage trước
                const savedUser = localStorage.getItem('auth_user');
                if (savedUser) {
                    setUser(JSON.parse(savedUser));
                }

                // Sau đó gọi API để lấy thông tin mới nhất
                const userData = await authAPI.me();
                setUser(userData);
                localStorage.setItem('auth_user', JSON.stringify(userData));
            }
        } catch (error) {
            console.error('Auth check failed:', error);
            localStorage.removeItem('auth_token');
            localStorage.removeItem('auth_user');
        } finally {
            setLoading(false);
        }
    };

    // Đăng ký
    const register = async (userData: any) => {
        try {
            setError(null);
            const response = await authAPI.register(userData);
            if (response.data && response.data.access_token) {
                setUser(response.data.user);
                // Redirect sau khi đăng ký thành công
                window.location.href = '/login-complete';
            }
            return response;
        } catch (error: any) {
            setError(error.message || 'Đăng ký thất bại');
            throw error;
        }
    };

    // Đăng nhập
    const login = async (credentials: { email: string; password: string }) => {
        try {
            console.log('🔐 Starting login with:', credentials.email);
            setError(null);
            const response = await authAPI.login(credentials);
            console.log('📡 API response:', response);

            if (response.data && response.data.user) {
                console.log('✅ Login successful, user:', response.data.user);
                console.log('🔑 Access token:', response.data.access_token);

                // Lưu cả user và token vào localStorage
                setUser(response.data.user);
                localStorage.setItem('auth_user', JSON.stringify(response.data.user));
                localStorage.setItem('auth_token', response.data.access_token);

                console.log('💾 Saved to localStorage:');
                console.log('  - auth_user:', localStorage.getItem('auth_user'));
                console.log('  - auth_token:', localStorage.getItem('auth_token'));

                // Redirect dựa trên role
                const userRole = response.data.user.role;
                console.log('🔄 User role:', userRole);

                // Redirect về home để HomeWrapper render HomeAuthenticated
                console.log('✅ Login successful, redirecting to home');
                console.log('🏠 HomeWrapper will render HomeAuthenticated with AuthenticatedLayout');
                window.location.href = '/';

            } else {
                console.error('❌ No user data in response:', response);
                alert('❌ Lỗi: Không có dữ liệu user trong response');
                setError('Phản hồi từ server không hợp lệ');
            }
            return response;
        } catch (error: any) {
            console.error('💥 Login error:', error);
            alert('💥 Lỗi đăng nhập: ' + error.message);
            setError(error.message || 'Đăng nhập thất bại');
            throw error;
        }
    };

    // Đăng xuất
    const logout = async () => {
        try {
            await authAPI.logout();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setUser(null);
            setError(null);
            localStorage.removeItem('auth_user');
            localStorage.removeItem('auth_token');
            // Redirect về trang chủ sau khi đăng xuất
            window.location.href = '/';
        }
    };

    // Cập nhật profile
    const updateProfile = async (profileData: any) => {
        try {
            setError(null);
            const response = await authAPI.updateProfile(profileData);
            setUser(response.user);
            return response;
        } catch (error: any) {
            setError(error.response?.data?.message || 'Cập nhật thất bại');
            throw error;
        }
    };

    // Kiểm tra quyền
    const hasRole = (role: string) => {
        return user?.role === role;
    };

    const hasAnyRole = (roles: string[]) => {
        return roles.includes(user?.role ?? '');
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const value: AuthContextType = {
        user,
        loading,
        error,
        login,
        register,
        logout,
        updateProfile,
        hasRole,
        hasAnyRole,
        isAuthenticated: !!user,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook để sử dụng AuthContext
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
