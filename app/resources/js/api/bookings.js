import apiClient from './auth.js';

export const bookingsAPI = {
    // Lấy danh sách bookings của user
    getBookings: async (params = {}) => {
        const response = await apiClient.get('/bookings', { params });
        return response.data;
    },

    // Tạo booking mới
    createBooking: async (bookingData) => {
        const response = await apiClient.post('/bookings', bookingData);
        return response.data;
    },

    // Lấy chi tiết booking
    getBooking: async (bookingId) => {
        const response = await apiClient.get(`/bookings/${bookingId}`);
        return response.data;
    },

    // Hủy booking
    cancelBooking: async (bookingId, reason = '') => {
        const response = await apiClient.put(`/bookings/${bookingId}/cancel`, { reason });
        return response.data;
    },

    // Lấy thống kê bookings
    getBookingStats: async () => {
        const response = await apiClient.get('/bookings/stats');
        return response.data;
    }
};
