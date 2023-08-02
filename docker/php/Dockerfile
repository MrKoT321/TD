FROM php:8.1

RUN apt-get update \
    && apt-get install -y curl git zip supervisor \ 
    && rm -rf /var/lib/apt/lists/* 

RUN docker-php-ext-install pdo mysqli pdo_mysql

COPY --from=composer /usr/bin/composer /usr/bin/composer

# RUN pecl install xdebug \
#   && docker-php-ext-enable xdebug

# COPY conf.d/* $PHP_INI_DIR/conf.d/
