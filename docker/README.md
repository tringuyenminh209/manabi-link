# 🐳 Docker Performance Optimizations

## 📋 Tổng quan

Hệ thống Docker đã được tối ưu hóa để cải thiện tốc độ load trang web với các tính năng sau:

### 🚀 Performance Features

1. **Nginx Optimizations**
   - Gzip compression
   - Browser caching cho static assets
   - FastCGI optimizations
   - Security headers
   - Rate limiting

2. **PHP-FPM Optimizations**
   - OPcache enabled
   - Redis extension
   - Optimized process management
   - Memory and execution time limits

3. **MySQL Optimizations**
   - InnoDB buffer pool tuning
   - Query optimization
   - Connection pooling
   - Slow query logging

4. **Redis Cache**
   - Memory management
   - Persistence configuration
   - Performance tuning

## 🛠️ Cách sử dụng

### Khởi động hệ thống
```bash
# Chạy script khởi động tối ưu
chmod +x docker/start.sh
./docker/start.sh
```

### Hoặc chạy thủ công
```bash
# Build và start services
docker-compose build --no-cache
docker-compose up -d

# Chạy Laravel optimizations
docker-compose exec php composer install --optimize-autoloader --no-dev
docker-compose exec php php artisan config:cache
docker-compose exec php php artisan route:cache
docker-compose exec php php artisan view:cache
docker-compose exec php php artisan storage:link

# Build frontend assets
docker-compose exec npm npm install
docker-compose exec npm npm run build
```

## 📊 Monitoring

### Kiểm tra performance
```bash
# Xem logs
docker-compose logs nginx
docker-compose logs php
docker-compose logs mysql
docker-compose logs redis

# Kiểm tra resource usage
docker stats

# Health check
curl http://localhost:8888/health
```

### Performance metrics
- **Nginx**: Gzip compression, static file caching
- **PHP**: OPcache hit rate, memory usage
- **MySQL**: Query performance, connection count
- **Redis**: Memory usage, hit rate

## 🔧 Troubleshooting

### Nếu trang load chậm
1. Kiểm tra OPcache status: `docker-compose exec php php -r "var_dump(opcache_get_status());"`
2. Kiểm tra Redis: `docker-compose exec redis redis-cli info memory`
3. Kiểm tra MySQL slow queries: `docker-compose exec mysql tail -f /var/log/mysql/slow.log`

### Reset cache
```bash
docker-compose exec php php artisan cache:clear
docker-compose exec php php artisan config:clear
docker-compose exec php php artisan route:clear
docker-compose exec php php artisan view:clear
```

## 📈 Expected Performance Improvements

- **Static assets**: 60-80% faster loading với browser caching
- **PHP execution**: 30-50% faster với OPcache
- **Database queries**: 20-40% faster với MySQL optimizations
- **Overall page load**: 40-60% improvement

## 🔒 Security Features

- Rate limiting cho API và login
- Security headers (XSS, CSRF protection)
- File access restrictions
- SSL/TLS ready configuration

## 📁 File Structure

```
docker/
├── nginx/
│   ├── nginx.conf          # Main Nginx config
│   └── default.conf        # Server config
├── php/
│   ├── Dockerfile          # PHP image
│   └── start.sh           # PHP startup script
├── mysql/
│   └── my.cnf             # MySQL optimizations
├── redis/
│   └── redis.conf         # Redis configuration
├── data/                  # Persistent data
└── start.sh              # Main startup script
``` 