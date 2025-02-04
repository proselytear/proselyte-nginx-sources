# Установка и запуск NGINX и серверного приложения с помощью Docker

## Содержание

1. [Предварительные условия](#предварительные-условия)
2. [Установка и настройка](#установка-и-настройка)
    1. [1. Установка Docker](#1-установка-docker)
    2. [2. Запуск NGINX](#2-запуск-nginx)
    3. [3. Управление Контейнерами NGINX](#3-управление-контейнерами-nginx)
    4. [4. Сборка Docker-образа](#4-сборка-docker-образа)
    5. [5. Создание Docker-сети](#5-создание-docker-сети)
    6. [6. Запуск Backend Приложений](#6-запуск-backend-приложений)
    7. [7. Запуск Второго Контейнера NGINX](#7-запуск-второго-контейнера-nginx)
3. [Дополнительные Рекомендации](#дополнительные-рекомендации)
4. [Заключение](#заключение)

## Предварительные условия

- **Docker**: Убедитесь, что Docker установлен на вашей машине. Если нет, следуйте
  официальной [инструкции по установке Docker](https://docs.docker.com/get-docker/).

## Установка и настройка

### 1. Установка Docker

Если Docker ещё не установлен, скачайте и установите его, следуя инструкциям
на [официальном сайте Docker](https://docs.docker.com/get-docker/).

### 2. Запуск NGINX

Запустите контейнер NGINX с пробросом порта 80 на локальный порт 8070:

```bash
docker run --name nginx-server -p 8070:80 -d nginx:latest
```

### 3. Управление контейнерами NGINX

Проверьте запущенные контейнеры:

```bash
docker ps
```

Если необходимо удалить существующий контейнер NGINX:

```bash
docker rm -f nginx-server
```

Запустите новый контейнер NGINX с монтированием локальной директории для сервера:

```bash
docker run --name nginx-server -p 8070:80 \
-v /Users/proselyte/Documents/@proselyte/nginxcourse/proselyte-nginx-sources/html:/usr/share/nginx/html \
-d nginx
```

### 4. Сборка Docker-образа

Создайте Docker-образ для вашего backend приложения. Убедитесь, что в текущей директории находится Dockerfile.

```bash
docker build --tag=backendapp:latest .
```

### 5. Создание Docker-сети

Создайте собственную Docker-сеть для связи контейнеров backend приложений:

```bash
docker network create proselyte-backend-network
```

### 6. Запуск Backend Приложений

Запустите пять экземпляров вашего backend приложения, подключённых к созданной сети:

```bash
docker run --network=proselyte-backend-network --name backendapp1 -p 8091:8090 --hostname=backendapp1 -d backendapp
docker run --network=proselyte-backend-network --name backendapp2 -p 8092:8090 --hostname=backendapp2 -d backendapp
docker run --network=proselyte-backend-network --name backendapp3 -p 8093:8090 --hostname=backendapp3 -d backendapp
docker run --network=proselyte-backend-network --name backendapp4 -p 8094:8090 --hostname=backendapp4 -d backendapp
docker run --network=proselyte-backend-network --name backendapp5 -p 8095:8090 --hostname=backendapp5 -d backendapp
```

### 7. Запуск Второго Контейнера NGINX

Запустите дополнительный контейнер NGINX, который будет использовать собственный конфигурационный файл и подключён к
той же сети:

```bash
docker run --network=proselyte-backend-network --name nginx-server-2 -p 8060:8080 \
-v /Users/proselyte/Documents/@proselyte/nginxcourse/proselyte-nginx-sources/nginx.conf:/etc/nginx/nginx.conf \
-d nginx
```

## Дополнительные Рекомендации

Проверка Конфигурации NGINX: После запуска контейнеров убедитесь, что NGINX корректно обрабатывает запросы к backend
приложениям. Проверьте логи NGINX для выявления возможных ошибок:

```bash
docker logs nginx-server
docker logs nginx-server-2
```

1. Автоматизация с Docker Compose: Для упрощения управления несколькими контейнерами рассмотрите использование Docker
   Compose. Создайте файл docker-compose.yml с описанием всех сервисов и сетей.

2. Мониторинг и Логирование: Настройте системы мониторинга и логирования для отслеживания состояния контейнеров и
   производительности приложений.

3. Безопасность: Убедитесь, что доступ к вашим сервисам ограничен необходимыми правами и что конфигурационные файлы
   защищены от несанкционированного доступа.

## Заключение

Следуя этому руководству, вы настроили среду с NGINX и несколькими backend приложениями, работающими в изолированной
Docker-сети. Такая архитектура обеспечивает масштабируемость и удобство управления вашими сервисами. Для дальнейшего
улучшения рекомендуем изучить дополнительные возможности Docker и NGINX, такие как балансировка нагрузки, кэширование и
автоматическое масштабирование.

## Если у вас возникли вопросы или предложения, не стесняйтесь обращаться!

```bash
proselytear@gmail.com
```
