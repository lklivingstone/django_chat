"""
Django settings for chatapp project.

Generated by 'django-admin startproject' using Django 4.2.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.2/ref/settings/
"""

from pathlib import Path
from datetime import timedelta
import os

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-7uo1esbzgzkqp&1_w91d8$l@8#)ssy_^zy5b_kxj25ebn%w@d4'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

ALLOWED_HOSTS = ['*']


# Application definition

INSTALLED_APPS = [
    'channels',
    'chat',
    'accounts',
    'daphne',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders'
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
]

CORS_ORIGIN_ALLOW_ALL=True

ROOT_URLCONF = 'chatapp.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

ASGI_APPLICATION = "chatapp.asgi.application"
WSGI_APPLICATION = 'chatapp.wsgi.application'

CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels_redis.core.RedisChannelLayer",
        "CONFIG": {
            "hosts": [("redis://default:BiT14wkkAaYn9YHTFlfsRvksf0enZQgm@redis-15616.c301.ap-south-1-1.ec2.cloud.redislabs.com:15616")]
        },
    },
}

# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': str(BASE_DIR / 'db.sqlite3'),
    }
}

# DATABASES = {
#     'default': {
#         'CONN_MAX_AGE': 0,
#         'ENGINE': 'django.db.backends.postgresql',
#         'NAME': os.environ.get('NAME'),
#         'USER': os.environ.get('USER'),
#         'PASSWORD': os.environ.get('PASSWORD'),
#         'HOST': os.environ.get('HOST'),
#         'PORT': os.environ.get('PORT')
#     }
# }


# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(days=30),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=30),
    'AUTH_HEADER_TYPES': ('Bearer',),
}

AUTH_USER_MODEL = 'accounts.CustomUser'

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


# sudo apt-get update

# sudo apt-get install python3-pip python3-dev libpq-dev nginx

# sudo -H pip3 install --upgrade pip

# sudo -H pip3 install virtualenv

# virtualenv env

# source env/bin/activate

# pip install django gunicorn psycopg2-binary


# gunicorn --bind 0.0.0.0:8000 chatapp.wsgi


# [Unit]
# Description=gunicorn daemon
# After=network.target
# [Service]
# User=lk
# Group=www-data
# WorkingDirectory=/home/lk/django_chat
# ExecStart=/home/lk/django_chat/env/bin/gunicorn --access-logfile - --workers 3 --bind unix:/home/lk/django_chat.sock chatapp.wsgi:application
# [Install]
# WantedBy=multi-user.target


# upstream channels-backend {
#  server localhost:8001;
# }
# server {
#     listen 80;
#     server_name server_domain_or_IP;
#     location = /favicon.ico { access_log off; log_not_found off; }
#     location /static/ {
#         root /home/lk/django_chat;
#     }
#     location /media/ {
#         root /home/lk/django_chat;
#     }
# location / {
#         include proxy_params;
#         proxy_pass http://unix:/home/lk/django_chat.sock;
#     }
# location /ws/ {
#         proxy_http_version 1.1;
#         proxy_set_header Upgrade $http_upgrade;
#         proxy_set_header Connection "upgrade";
#         proxy_redirect off;
#         proxy_pass http://127.0.0.1:8001;
#         proxy_set_header Host $host;
#         proxy_set_header X-Real-IP $remote_addr;
#         proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
#         proxy_set_header X-Forwarded-Host $server_name;
#     }
# }

# [Unit]
# Description=WebSocket Daphne Service
# After=network.target

# [Service]
# Type=simple
# User=lk
# WorkingDirectory=/home/lk/django_chat
# ExecStart=/home/lk/django_chat/env/bin/python /home/lk/django_chat/env/bin/daphne -b 0.0.0.0 -p 8001 chatapp.asgi:application
# Restart=on-failure

# [Install]
# WantedBy=multi-user.target