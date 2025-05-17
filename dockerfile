# Use official PHP image with FPM
FROM php:8.2-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    nodejs \
    npm \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions needed for Laravel
RUN docker-php-ext-install pdo pdo_mysql mbstring exif pcntl bcmath gd xml

# Install Composer globally
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory inside container
WORKDIR /var/www/html

# Copy existing application files
COPY . .

# Install PHP dependencies without dev packages, optimize autoloader
RUN composer install --no-dev --optimize-autoloader

# Install Node packages and build assets
RUN npm install && npm run build

# Run migrations (optional: you can run migrations manually in your deploy pipeline)
# RUN php artisan migrate --force

# Change permissions for Laravel storage and cache (adjust as needed)
RUN chown -R www-data:www-data storage bootstrap/cache

# Expose port 8080 for Laravel's built-in web server
EXPOSE 8080

# Start Laravel development server
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8080"]
