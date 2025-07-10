import axios from 'axios';
import { API_CONFIG, API_ENDPOINTS, formatErrorMessage } from '../config/api.js';

// Tạo axios instance với config từ API_CONFIG
const apiClient = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
    headers: API_CONFIG.DEFAULT_HEADERS,
    withCredentials: true,
});

// Interceptor để thêm token vào header
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Interceptor để xử lý response
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('auth_token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const authAPI = {
    // Đăng ký user mới
    register: async (userData) => {
        try {
            const response = await apiClient.post(API_ENDPOINTS.AUTH.REGISTER, userData);
            if (response.data.access_token) {
                localStorage.setItem('auth_token', response.data.access_token);
            }
            return response.data;
        } catch (error) {
            throw new Error(formatErrorMessage(error));
        }
    },

    // Đăng nhập
    login: async (credentials) => {
        try {
            console.log('🌐 API login call with:', credentials);
            console.log('🌐 API endpoint:', API_ENDPOINTS.AUTH.LOGIN);
            console.log('🌐 Base URL:', API_CONFIG.BASE_URL);

            const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
            console.log('🌐 Raw API response:', response);
            console.log('🌐 Response data:', response.data);

            if (response.data.access_token) {
                console.log('🔑 Saving token to localStorage:', response.data.access_token);
                localStorage.setItem('auth_token', response.data.access_token);
            } else {
                console.warn('⚠️ No access_token in response!');
            }
            return response.data;
        } catch (error) {
            console.error('🌐 API login error:', error);
            console.error('🌐 Error response:', error.response);
            console.error('🌐 Error data:', error.response?.data);
            throw new Error(formatErrorMessage(error));
        }
    },

    // Đăng xuất
    logout: async () => {
        try {
            await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            localStorage.removeItem('auth_token');
        }
    },

    // Lấy thông tin user hiện tại
    me: async () => {
        try {
            const response = await apiClient.get(API_ENDPOINTS.AUTH.ME);
            return response.data;
        } catch (error) {
            throw new Error(formatErrorMessage(error));
        }
    },

    // Lấy profile user
    getProfile: async () => {
        try {
            const response = await apiClient.get(API_ENDPOINTS.USER.PROFILE);
            return response.data;
        } catch (error) {
            throw new Error(formatErrorMessage(error));
        }
    },

    // Cập nhật profile
    updateProfile: async (profileData) => {
        try {
            const response = await apiClient.put(API_ENDPOINTS.USER.UPDATE_PROFILE, profileData);
            return response.data;
        } catch (error) {
            throw new Error(formatErrorMessage(error));
        }
    },

    // Cập nhật password
    updatePassword: async (passwordData) => {
        try {
            const response = await apiClient.put(API_ENDPOINTS.USER.UPDATE_PASSWORD, passwordData);
            return response.data;
        } catch (error) {
            throw new Error(formatErrorMessage(error));
        }
    },

    // Submit eKYC
    submitEkyc: async (ekycData) => {
        try {
            const response = await apiClient.post(API_ENDPOINTS.USER.EKYC, ekycData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            return response.data;
        } catch (error) {
            throw new Error(formatErrorMessage(error));
        }
    },

    // Refresh token
    refreshToken: async () => {
        try {
            const response = await apiClient.post(API_ENDPOINTS.AUTH.REFRESH);
            if (response.data.access_token) {
                localStorage.setItem('auth_token', response.data.access_token);
            }
            return response.data;
        } catch (error) {
            throw new Error(formatErrorMessage(error));
        }
    },

    // Gửi email forgot password
    forgotPassword: async (data) => {
        try {
            const response = await apiClient.post('/forgot-password', data);
            return response.data;
        } catch (error) {
            throw new Error(formatErrorMessage(error));
        }
    },

    // Reset password
    resetPassword: async (data) => {
        try {
            const response = await apiClient.post('/reset-password', data);
            return response.data;
        } catch (error) {
            throw new Error(formatErrorMessage(error));
        }
    }
};

export default apiClient;
