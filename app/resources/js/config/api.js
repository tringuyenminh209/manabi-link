// Cấu hình API cho toàn bộ ứng dụng
export const API_CONFIG = {
    // Base URL cho API
    BASE_URL: 'http://localhost:8888/api/v1',

    // Timeout cho requests (ms)
    TIMEOUT: 10000,

    // Headers mặc định
    DEFAULT_HEADERS: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },

    // Cấu hình cho file upload
    UPLOAD_CONFIG: {
        maxFileSize: 10 * 1024 * 1024, // 10MB
        allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
    },

    // Cấu hình cho pagination
    PAGINATION: {
        defaultPageSize: 10,
        maxPageSize: 100,
    },

    // Cấu hình cho caching
    CACHE: {
        enabled: true,
        ttl: 5 * 60 * 1000, // 5 phút
    },

    // Cấu hình cho retry
    RETRY: {
        enabled: true,
        maxRetries: 3,
        retryDelay: 1000, // 1 giây
    },
};

// Các endpoint chính
export const API_ENDPOINTS = {
    // Authentication
    AUTH: {
        LOGIN: '/login',
        REGISTER: '/register',
        LOGOUT: '/logout',
        ME: '/me',
        REFRESH: '/refresh',
    },

    // User management
    USER: {
        PROFILE: '/profile',
        UPDATE_PROFILE: '/profile',
        UPDATE_PASSWORD: '/profile/password',
        EKYC: '/profile/ekyc',
        DELETE_ACCOUNT: '/profile/delete',
    },

    // Lessons
    LESSONS: {
        LIST: '/lessons',
        FEATURED: '/lessons/featured',
        DETAIL: (id) => `/lessons/${id}`,
        CREATE: '/lessons',
        UPDATE: (id) => `/lessons/${id}`,
        DELETE: (id) => `/lessons/${id}`,
        SCHEDULES: (id) => `/lessons/${id}/schedules`,
        REVIEWS: (id) => `/lessons/${id}/reviews`,
    },

    // Bookings
    BOOKINGS: {
        LIST: '/bookings',
        CREATE: '/bookings',
        DETAIL: (id) => `/bookings/${id}`,
        CANCEL: (id) => `/bookings/${id}/cancel`,
        STATS: '/bookings/stats',
    },

    // Categories
    CATEGORIES: {
        LIST: '/categories',
        DETAIL: (id) => `/categories/${id}`,
    },

    // Search
    SEARCH: {
        LESSONS: '/search',
    },

    // Payments
    PAYMENTS: {
        INTENT: '/payments/intent',
        WEBHOOK: '/webhooks/stripe',
    },

    // Reviews
    REVIEWS: {
        CREATE: '/reviews',
        LESSON_REVIEWS: (id) => `/lessons/${id}/reviews`,
        INSTRUCTOR_REVIEWS: (id) => `/instructors/${id}/reviews`,
    },

    // Subscriptions
    SUBSCRIPTIONS: {
        PLANS: '/plans',
        SUBSCRIBE: '/subscribe',
        CURRENT: '/subscription',
        WEBHOOK: '/webhooks/stripe/subscription',
    },

    // Recommendations
    RECOMMENDATIONS: {
        LIST: '/recommendations',
    },

    // Companies
    COMPANIES: {
        LIST: '/companies',
        CREATE: '/companies',
        DETAIL: (id) => `/companies/${id}`,
    },
};

// Các status code HTTP
export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    UNPROCESSABLE_ENTITY: 422,
    INTERNAL_SERVER_ERROR: 500,
};

// Các error message mặc định
export const ERROR_MESSAGES = {
    NETWORK_ERROR: 'Lỗi kết nối mạng. Vui lòng kiểm tra lại kết nối internet.',
    TIMEOUT_ERROR: 'Yêu cầu bị timeout. Vui lòng thử lại.',
    SERVER_ERROR: 'Lỗi máy chủ. Vui lòng thử lại sau.',
    UNAUTHORIZED: 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.',
    FORBIDDEN: 'Bạn không có quyền truy cập tính năng này.',
    NOT_FOUND: 'Không tìm thấy dữ liệu yêu cầu.',
    VALIDATION_ERROR: 'Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.',
    UNKNOWN_ERROR: 'Có lỗi xảy ra. Vui lòng thử lại.',
};

// Helper function để format error message
export const formatErrorMessage = (error) => {
    if (error.response?.data?.message) {
        return error.response.data.message;
    }

    if (error.code === 'NETWORK_ERROR') {
        return ERROR_MESSAGES.NETWORK_ERROR;
    }

    if (error.code === 'ECONNABORTED') {
        return ERROR_MESSAGES.TIMEOUT_ERROR;
    }

    switch (error.response?.status) {
        case HTTP_STATUS.UNAUTHORIZED:
            return ERROR_MESSAGES.UNAUTHORIZED;
        case HTTP_STATUS.FORBIDDEN:
            return ERROR_MESSAGES.FORBIDDEN;
        case HTTP_STATUS.NOT_FOUND:
            return ERROR_MESSAGES.NOT_FOUND;
        case HTTP_STATUS.UNPROCESSABLE_ENTITY:
            return ERROR_MESSAGES.VALIDATION_ERROR;
        case HTTP_STATUS.INTERNAL_SERVER_ERROR:
            return ERROR_MESSAGES.SERVER_ERROR;
        default:
            return ERROR_MESSAGES.UNKNOWN_ERROR;
    }
};
