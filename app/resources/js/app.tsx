import './bootstrap';
import '../css/app.css';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import { ProtectedRoute } from './Components/ProtectedRoute';
import { GuestRoute } from './Components/GuestRoute';
import PublicLayout from './Layouts/PublicLayout';

// Import các page chính
import HomeWrapper from './Pages/HomeWrapper';
import LoginPage from './Pages/Auth/Login';
import RegisterPage from './Pages/Auth/Register';
import ForgotPasswordPage from './Pages/Auth/ForgotPassword';
import ResetPasswordPage from './Pages/Auth/ResetPassword';
import ConfirmPasswordPage from './Pages/Auth/ConfirmPassword';
import VerifyEmailPage from './Pages/Auth/VerifyEmail';
import LoginCompletePage from './Pages/Auth/LoginComplete';
import UnauthorizedPage from './Pages/Unauthorized';

// Import các page cho người dùng đã đăng nhập
import DashboardPage from './Pages/Learner/Dashboard';
import MyBookingsPage from './Pages/Learner/MyBookings';
import LearnerSettingsPage from './Pages/Learner/settings/LearnerSettings';

// Import các page cho giáo viên
import TeacherDashboardPage from './Pages/Sensei/teacher-dashboard/Dashboard';
// import MyLessonsPage from './Pages/Sensei/teacher-dashboard/lessons/MyLessons';
// import TeacherSchedulePage from './Pages/Sensei/teacher-dashboard/schedule/Senseischedule';
// import TeacherProfilePage from './Pages/Sensei/profile/SenseiProfile';
// import PayoutsPage from './Pages/Sensei/Payouts';

// Import các page cho admin
import AdminDashboardPage from './Pages/Admin/Dashboard';
import UserManagementPage from './Pages/Admin/user/UserManagement';
// import CategoryManagementPage from './Pages/Admin/category/category';
// import CourseManagementPage from './Pages/Admin/course/course';
// import FinancePage from './Pages/Admin/finance/finace';
// import AdminSettingsPage from './Pages/Admin/settings/settings';

const root = createRoot(document.getElementById('root'));

root.render(
    <AuthProvider>
        <BrowserRouter>
            <Routes>
                {/* Public Routes - Không cần đăng nhập */}
                <Route path="/" element={
                    <PublicLayout>
                        <HomeWrapper />
                    </PublicLayout>
                } />

                {/* Guest Routes - Chỉ cho người chưa đăng nhập */}
                <Route path="/login" element={
                    <GuestRoute>
                        <LoginPage />
                    </GuestRoute>
                } />
                <Route path="/register" element={
                    <GuestRoute>
                        <RegisterPage />
                    </GuestRoute>
                } />
                <Route path="/forgot-password" element={
                    <GuestRoute>
                        <ForgotPasswordPage />
                    </GuestRoute>
                } />
                <Route path="/reset-password" element={
                    <GuestRoute>
                        <ResetPasswordPage token="" email="" />
                    </GuestRoute>
                } />
                <Route path="/confirm-password" element={
                    <GuestRoute>
                        <ConfirmPasswordPage />
                    </GuestRoute>
                } />
                <Route path="/verify-email" element={
                    <GuestRoute>
                        <VerifyEmailPage />
                    </GuestRoute>
                } />
                <Route path="/login-complete" element={
                    <GuestRoute>
                        <LoginCompletePage />
                    </GuestRoute>
                } />

                {/* Error Routes */}
                <Route path="/unauthorized" element={<UnauthorizedPage />} />

                {/* Protected Routes - Cần đăng nhập */}

                {/* Learner Routes */}
                <Route path="/dashboard" element={
                    <ProtectedRoute>
                        <DashboardPage />
                    </ProtectedRoute>
                } />
                <Route path="/my-bookings" element={
                    <ProtectedRoute>
                        <MyBookingsPage />
                    </ProtectedRoute>
                } />
                <Route path="/learner/settings" element={
                    <ProtectedRoute>
                        <LearnerSettingsPage />
                    </ProtectedRoute>
                } />

                {/* Teacher Routes */}
                <Route path="/teacher" element={
                    <ProtectedRoute roles={['teacher']}>
                        <TeacherDashboardPage />
                    </ProtectedRoute>
                } />

                {/* Admin Routes */}
                <Route path="/admin" element={
                    <ProtectedRoute roles={['admin']}>
                        <AdminDashboardPage />
                    </ProtectedRoute>
                } />
                <Route path="/admin/user" element={
                    <ProtectedRoute roles={['admin']}>
                        <UserManagementPage />
                    </ProtectedRoute>
                } />

                {/* Fallback route */}
                <Route path="*" element={
                    <PublicLayout>
                        <div className="flex items-center justify-center min-h-screen">
                            <div className="text-center">
                                <h1 className="text-4xl font-bold text-charcoal-gray mb-4">404</h1>
                                <p className="text-silver-gray mb-8">Trang không tồn tại</p>
                                <Link to="/" className="manabi-btn-primary">
                                    Về trang chủ
                                </Link>
                            </div>
                        </div>
                    </PublicLayout>
                } />
            </Routes>
        </BrowserRouter>
    </AuthProvider>
);
