FROM php:8.3-fpm-alpine

# Cài system packages
RUN apk add --no-cache \
    build-base \
    mysql-client \
    libzip-dev \
    zip \
    curl \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    oniguruma-dev \
    libxml2-dev \
    bash \
    redis \
    supervisor \
    autoconf \
    pkgconfig

# PHP extensions cần thiết cho Laravel + Vite
RUN docker-php-ext-install \
    pdo \
    pdo_mysql \
    mbstring \
    bcmath \
    zip \
    exif \
    pcntl \
    opcache

# GD extension (nếu xử lý ảnh)
RUN docker-php-ext-configure gd --with-freetype --with-jpeg && \
    docker-php-ext-install gd

# Cài Redis extension
RUN pecl install redis && docker-php-ext-enable redis

# Cài Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Tối ưu PHP configuration
RUN echo "opcache.enable=1" >> /usr/local/etc/php/conf.d/opcache.ini && \
    echo "opcache.enable_cli=1" >> /usr/local/etc/php/conf.d/opcache.ini && \
    echo "opcache.memory_consumption=128" >> /usr/local/etc/php/conf.d/opcache.ini && \
    echo "opcache.interned_strings_buffer=8" >> /usr/local/etc/php/conf.d/opcache.ini && \
    echo "opcache.max_accelerated_files=4000" >> /usr/local/etc/php/conf.d/opcache.ini && \
    echo "opcache.revalidate_freq=2" >> /usr/local/etc/php/conf.d/opcache.ini && \
    echo "opcache.fast_shutdown=1" >> /usr/local/etc/php/conf.d/opcache.ini && \
    echo "opcache.validate_timestamps=0" >> /usr/local/etc/php/conf.d/opcache.ini && \
    echo "opcache.save_comments=1" >> /usr/local/etc/php/conf.d/opcache.ini

# Tối ưu PHP-FPM configuration
RUN echo "pm = dynamic" >> /usr/local/etc/php-fpm.d/www.conf && \
    echo "pm.max_children = 50" >> /usr/local/etc/php-fpm.d/www.conf && \
    echo "pm.start_servers = 5" >> /usr/local/etc/php-fpm.d/www.conf && \
    echo "pm.min_spare_servers = 5" >> /usr/local/etc/php-fpm.d/www.conf && \
    echo "pm.max_spare_servers = 35" >> /usr/local/etc/php-fpm.d/www.conf && \
    echo "pm.max_requests = 500" >> /usr/local/etc/php-fpm.d/www.conf && \
    echo "request_terminate_timeout = 300" >> /usr/local/etc/php-fpm.d/www.conf

# Tối ưu PHP settings
RUN echo "memory_limit = 512M" >> /usr/local/etc/php/conf.d/custom.ini && \
    echo "max_execution_time = 300" >> /usr/local/etc/php/conf.d/custom.ini && \
    echo "upload_max_filesize = 20M" >> /usr/local/etc/php/conf.d/custom.ini && \
    echo "post_max_size = 20M" >> /usr/local/etc/php/conf.d/custom.ini && \
    echo "max_input_vars = 3000" >> /usr/local/etc/php/conf.d/custom.ini && \
    echo "realpath_cache_size = 4096K" >> /usr/local/etc/php/conf.d/custom.ini && \
    echo "realpath_cache_ttl = 600" >> /usr/local/etc/php/conf.d/custom.ini

# Set thư mục làm việc
WORKDIR /var/www/html

# Tạo user cho Laravel
RUN addgroup -g 1000 www && \
    adduser -u 1000 -G www -s /bin/sh -D www

# Set permissions
RUN chown -R www:www /var/www/html

# Copy startup script
COPY docker/php/start.sh /start.sh
RUN chmod +x /start.sh

EXPOSE 9000

CMD ["/start.sh"]
