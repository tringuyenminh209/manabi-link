# Hướng dẫn tích hợp Backend Laravel và Frontend React

## Tổng quan

Dự án Manabi Link sử dụng kiến trúc:
- **Backend**: Laravel 11 với API RESTful
- **Frontend**: React + Inertia.js + Tailwind CSS
- **Authentication**: Laravel Sanctum
- **Database**: MySQL

## Cấu trúc API

### Base URL
```
Development: /api/v1
Production: https://your-domain.com/api/v1
```

### Authentication Flow
1. User đăng nhập → nhận token từ `/api/v1/login`
2. Token được lưu trong localStorage
3. Mọi request sau đó sẽ include token trong header: `Authorization: Bearer {token}`
4. Token tự động refresh khi hết hạn

## Các API Endpoints chính

### Authentication
```javascript
POST /api/v1/register     // Đăng ký
POST /api/v1/login        // Đăng nhập
POST /api/v1/logout       // Đăng xuất
GET  /api/v1/me          // Thông tin user hiện tại
```

### Lessons
```javascript
GET    /api/v1/lessons                    // Danh sách lessons
GET    /api/v1/lessons/featured          // Featured lessons
GET    /api/v1/lessons/{id}              // Chi tiết lesson
POST   /api/v1/lessons                   // Tạo lesson (instructor)
PUT    /api/v1/lessons/{id}              // Cập nhật lesson
DELETE /api/v1/lessons/{id}              // Xóa lesson
GET    /api/v1/lessons/{id}/schedules    // Lịch học của lesson
GET    /api/v1/lessons/{id}/reviews      // Reviews của lesson
```

### Bookings
```javascript
GET    /api/v1/bookings           // Danh sách bookings
POST   /api/v1/bookings           // Tạo booking
GET    /api/v1/bookings/{id}      // Chi tiết booking
PUT    /api/v1/bookings/{id}/cancel // Hủy booking
GET    /api/v1/bookings/stats     // Thống kê bookings
```

## Cách sử dụng trong Frontend

### 1. Setup API Client

```javascript
// resources/js/api/auth.js
import { authAPI } from './auth.js';

// Đăng nhập
const login = async (credentials) => {
    try {
        const response = await authAPI.login(credentials);
        // Handle success
    } catch (error) {
        // Handle error
    }
};
```

### 2. Sử dụng Custom Hooks

```javascript
// resources/js/hooks/useAuth.js
import { useAuth } from '@/hooks/useAuth';

const MyComponent = () => {
    const { user, login, logout, isAuthenticated } = useAuth();
    
    return (
        <div>
            {isAuthenticated ? (
                <p>Xin chào, {user.name}</p>
            ) : (
                <button onClick={() => login(credentials)}>Đăng nhập</button>
            )}
        </div>
    );
};
```

### 3. Fetch Data với useFetch

```javascript
// resources/js/hooks/useFetch.js
import { useFetch } from '@/hooks/useFetch';
import { lessonsAPI } from '@/api/lessons';

const LessonsList = () => {
    const { data: lessons, loading, error, refetch } = useFetch(
        () => lessonsAPI.getLessons(),
        []
    );

    if (loading) return <div>Đang tải...</div>;
    if (error) return <div>Lỗi: {error}</div>;

    return (
        <div>
            {lessons.map(lesson => (
                <div key={lesson.id}>{lesson.title}</div>
            ))}
        </div>
    );
};
```

### 4. Mutations với useMutation

```javascript
import { useMutation } from '@/hooks/useFetch';
import { bookingsAPI } from '@/api/bookings';

const BookingForm = () => {
    const { mutate: createBooking, loading, error } = useMutation(
        (bookingData) => bookingsAPI.createBooking(bookingData)
    );

    const handleSubmit = async (formData) => {
        try {
            await createBooking(formData);
            // Handle success
        } catch (error) {
            // Handle error
        }
    };
};
```

## Cấu hình Environment

### Backend (.env)
```env
APP_NAME=Laravel
APP_ENV=local
APP_KEY=base64:ZYko8Naq+Iou0co2ON96gomXHxLhaOpGvUBY73ldjcs=
APP_DEBUG=true
APP_URL=http://localhost

LOG_CHANNEL=stack
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=manabi_link
DB_USERNAME=manabi
DB_PASSWORD=123qwecc

BROADCAST_DRIVER=pusher
CACHE_DRIVER=file
FILESYSTEM_DISK=local
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120

PUSHER_APP_ID=app-id
PUSHER_APP_KEY=key
PUSHER_APP_SECRET=secret
PUSHER_HOST=
PUSHER_PORT=443
PUSHER_SCHEME=https

SCOUT_DRIVER=database
ALGOLIA_APP_ID=xx
ALGOLIA_SECRET=xx
MEMCACHED_HOST=127.0.0.1

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=smtp
MAIL_HOST=mailpit
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="${APP_NAME}"

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=
AWS_USE_PATH_STYLE_ENDPOINT=false

PUSHER_APP_ID=
PUSHER_APP_KEY=
PUSHER_APP_SECRET=
PUSHER_HOST=
PUSHER_PORT=443
PUSHER_SCHEME=https
PUSHER_APP_CLUSTER=mt1

VITE_APP_NAME="${APP_NAME}"
VITE_PUSHER_APP_KEY="${PUSHER_APP_KEY}"
VITE_PUSHER_HOST="${PUSHER_HOST}"
VITE_PUSHER_PORT="${PUSHER_PORT}"
VITE_PUSHER_SCHEME="${PUSHER_SCHEME}"
VITE_PUSHER_APP_CLUSTER="${PUSHER_APP_CLUSTER}"

```

### Frontend (vite.config.js)
```javascript
export default defineConfig({
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:8000',
                changeOrigin: true,
            },
        },
    },
});
```

## Error Handling

### Backend Response Format
```json
{
    "success": true,
    "data": { ... },
    "message": "Success message"
}
```

### Error Response Format
```json
{
    "success": false,
    "message": "Error message",
    "errors": {
        "field": ["Error message"]
    }
}
```

### Frontend Error Handling
```javascript
try {
    const response = await apiCall();
    // Handle success
} catch (error) {
    const message = formatErrorMessage(error);
    // Show error to user
}
```

## Authentication Middleware

### Backend Middleware
```php
// app/Http/Middleware/Authenticate.php
Route::middleware('auth:sanctum')->group(function () {
    // Protected routes
});
```

### Frontend Route Protection
```javascript
// resources/js/Components/ProtectedRoute.jsx
import { useAuth } from '@/hooks/useAuth';

const ProtectedRoute = ({ children, roles = [] }) => {
    const { user, isAuthenticated, hasRole } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (roles.length > 0 && !roles.some(role => hasRole(role))) {
        return <Navigate to="/unauthorized" />;
    }

    return children;
};
```

## Performance Optimization

### 1. Caching
```javascript
// resources/js/config/api.js
CACHE: {
    enabled: true,
    ttl: 5 * 60 * 1000, // 5 phút
}
```

### 2. Pagination
```javascript
const { data, loading, hasMore, fetchMore } = useInfiniteFetch(
    (params) => lessonsAPI.getLessons(params),
    10
);
```

### 3. Optimistic Updates
```javascript
const { mutate: updateLesson } = useMutation(
    (data) => lessonsAPI.updateLesson(id, data),
    {
        onMutate: async (newData) => {
            // Optimistically update UI
        },
        onError: (error, variables, context) => {
            // Rollback on error
        },
    }
);
```

## Testing

### Backend Tests
```bash
php artisan test
```

### Frontend Tests
```bash
npm run test
```

## Deployment

### Backend Deployment
1. Set environment variables
2. Run migrations: `php artisan migrate`
3. Clear cache: `php artisan config:cache`
4. Set up web server (Nginx/Apache)

### Frontend Deployment
1. Build assets: `npm run build`
2. Deploy to CDN or static hosting
3. Update API base URL in production

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Check `config/cors.php` configuration
   - Verify `SANCTUM_STATEFUL_DOMAINS` in `.env`

2. **Authentication Issues**
   - Check token expiration
   - Verify Sanctum configuration
   - Check session domain settings

3. **API 404 Errors**
   - Verify route definitions in `routes/api.php`
   - Check API versioning (`/api/v1/`)

4. **Database Connection**
   - Verify database credentials
   - Check migration status

## Best Practices

1. **Security**
   - Always validate input data
   - Use HTTPS in production
   - Implement rate limiting
   - Sanitize user inputs

2. **Performance**
   - Use pagination for large datasets
   - Implement caching strategies
   - Optimize database queries
   - Use lazy loading for images

3. **Code Quality**
   - Follow PSR-12 coding standards
   - Write unit tests
   - Use TypeScript for better type safety
   - Document API endpoints

4. **User Experience**
   - Show loading states
   - Handle errors gracefully
   - Provide meaningful feedback
   - Implement offline support where possible 
