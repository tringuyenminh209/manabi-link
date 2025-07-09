import apiClient from './auth.js';

export const lessonsAPI = {
    // Lấy danh sách lessons (public)
    getLessons: async (params = {}) => {
        const response = await apiClient.get('/lessons', { params });
        return response.data;
    },

    // Lấy featured lessons
    getFeaturedLessons: async () => {
        const response = await apiClient.get('/lessons/featured');
        return response.data;
    },

    // Lấy chi tiết lesson
    getLesson: async (lessonId) => {
        const response = await apiClient.get(`/lessons/${lessonId}`);
        return response.data;
    },

    // Lấy schedules của lesson
    getLessonSchedules: async (lessonId) => {
        const response = await apiClient.get(`/lessons/${lessonId}/schedules`);
        return response.data;
    },

    // Lấy reviews của lesson
    getLessonReviews: async (lessonId) => {
        const response = await apiClient.get(`/lessons/${lessonId}/reviews`);
        return response.data;
    },

    // Tạo lesson mới (instructor only)
    createLesson: async (lessonData) => {
        const response = await apiClient.post('/lessons', lessonData);
        return response.data;
    },

    // Cập nhật lesson (instructor only)
    updateLesson: async (lessonId, lessonData) => {
        const response = await apiClient.put(`/lessons/${lessonId}`, lessonData);
        return response.data;
    },

    // Xóa lesson (instructor only)
    deleteLesson: async (lessonId) => {
        const response = await apiClient.delete(`/lessons/${lessonId}`);
        return response.data;
    },

    // Search lessons
    searchLessons: async (query, params = {}) => {
        const response = await apiClient.get('/search', {
            params: { q: query, ...params }
        });
        return response.data;
    }
};
