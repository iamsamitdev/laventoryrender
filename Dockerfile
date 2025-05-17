# ใช้ base image ที่มี PHP และ Node.js
FROM php:8.2-fpm

# ติดตั้ง dependencies และ tools ที่จำเป็น
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    && docker-php-ext-install pdo pdo_mysql mbstring exif pcntl bcmath gd xml \
    && docker-php-ext-enable pdo_mysql mbstring exif pcntl bcmath gd xml

# ติดตั้ง Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# ติดตั้ง Node.js และ npm
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs

# ตั้งค่า working directory
WORKDIR /var/www

# คัดลอกไฟล์โปรเจกต์
COPY . .

# ติดตั้ง PHP dependencies
RUN composer install --optimize-autoloader --no-dev --ignore-platform-reqs

# ติดตั้ง Node.js dependencies และ build frontend assets
RUN npm install && npm run build

# ตั้งค่า permissions
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

# รัน migration (ถ้ามี)
# หมายเหตุ: ถ้าคุณยังไม่ได้ตั้งค่า database, ให้คอมเมนต์บรรทัดนี้ก่อน
# RUN php artisan migrate --force

# เปิด port
EXPOSE 10000

# คำสั่ง start
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=10000"]