FROM php:8-fpm

# CMD php -f src/Server/Server.php && php -f src/Server/GameServer.php
# RUN php -f app/src/Server/Server.php \
#     && php -f src/Server/GameServer.php 

RUN apt-get update \
    && apt-get install -y curl git zip supervisor \ 
    && rm -rf /var/lib/apt/lists/* 

RUN docker-php-ext-install pdo mysqli pdo_mysql

# RUN rm -v ${PWD}:/app/ php:8 php /app/src/Server/Server.php 
# RUN rm -v ${PWD}:/app/ php:8 php /app/src/Server/GameServer.php 

COPY --from=composer /usr/bin/composer /usr/bin/composer

RUN pecl install xdebug \
  && docker-php-ext-enable xdebug

COPY conf.d/* $PHP_INI_DIR/conf.d/
