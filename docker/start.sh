#!/bin/bash

echo "🚀 Starting Manabi Link with performance optimizations..."

# Create necessary directories
mkdir -p docker/data/mysql
mkdir -p docker/data/redis
mkdir -p docker/logs/nginx
mkdir -p docker/logs/php
mkdir -p docker/logs/mysql

# Set permissions
chmod -R 755 docker/data
chmod -R 755 docker/logs

# Build and start services
echo "📦 Building Docker images..."
docker-compose build --no-cache

echo "🔄 Starting services..."
docker-compose up -d

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 10

# Check service status
echo "🔍 Checking service status..."
docker-compose ps

# Run Laravel optimizations
echo "⚡ Running Laravel optimizations..."
docker-compose exec php composer install --optimize-autoloader --no-dev
docker-compose exec php php artisan config:cache
docker-compose exec php php artisan route:cache
docker-compose exec php php artisan view:cache
docker-compose exec php php artisan storage:link

# Set proper permissions
echo "🔐 Setting permissions..."
docker-compose exec php chown -R www:www /var/www/html
docker-compose exec php chmod -R 755 /var/www/html/storage
docker-compose exec php chmod -R 755 /var/www/html/bootstrap/cache

# Install and build frontend assets
echo "🎨 Building frontend assets..."
docker-compose exec npm npm install
docker-compose exec npm npm run build

echo "✅ Manabi Link is ready!"
echo "🌐 Access your application at: http://localhost:8888"
echo "📊 PHPMyAdmin: http://localhost:8008"
echo "🔧 Redis: localhost:6379"
echo "🗄️  MySQL: localhost:33061" 