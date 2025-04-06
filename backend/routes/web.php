<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/log-test', function () {
    Log::info('This is a test log message.');
    return 'Log message written!';
});

