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
    bash

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

# Cài Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set thư mục làm việc
WORKDIR /var/www/html
