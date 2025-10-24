FROM php:8.3-fpm

# Instalar dependencias del sistema y extensiones PHP necesarias
RUN apt-get update && apt-get install -y \
    git unzip sqlite3 libsqlite3-dev libpng-dev libjpeg-dev libfreetype6-dev \
    libzip-dev zip curl && \
    docker-php-ext-install pdo pdo_sqlite gd zip

WORKDIR /app

COPY . .

# Instalar Composer y dependencias de Laravel
RUN curl -sS https://getcomposer.org/installer | php \
    && php composer.phar install --no-dev --optimize-autoloader --no-interaction --prefer-dist

# Dar permisos al almacenamiento y cache de Laravel
RUN chmod -R 777 storage bootstrap/cache

# Exponer el puerto 8000
EXPOSE 8000

# Comando por defecto
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
