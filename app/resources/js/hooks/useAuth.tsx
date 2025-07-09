import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { authAPI } from '../api/auth.js';

// Định nghĩa type cho User
interface User {
    id: number;
    name: string;
    email: string;
    role: string;
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
                const userData = await authAPI.me();
                setUser(userData);
            }
        } catch (error) {
            console.error('Auth check failed:', error);
            localStorage.removeItem('auth_token');
        } finally {
            setLoading(false);
        }
    };

    // Đăng nhập
    const login = async (credentials: { email: string; password: string }) => {
        try {
            setError(null);
            const response = await authAPI.login(credentials);
            setUser(response.user);
            return response;
        } catch (error: any) {
            setError(error.response?.data?.message || 'Đăng nhập thất bại');
            throw error;
        }
    };

    // Đăng ký
    const register = async (userData: any) => {
        try {
            setError(null);
            const response = await authAPI.register(userData);
            if (response.token) {
                setUser(response.user);
            }
            return response;
        } catch (error: any) {
            setError(error.response?.data?.message || 'Đăng ký thất bại');
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
