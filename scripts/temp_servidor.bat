@echo off
cd /d "C:\Laragon\www\Laravel\lab-equipment-system"
title Lab Equipment System - Servidor
php artisan serve --host=0.0.0.0 --port=8000
