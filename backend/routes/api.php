<?php

use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\admin\DashboardController;
use App\Http\Controllers\admin\ServiceController;
use App\Http\Controllers\admin\TempImageController;
use App\Http\Controllers\admin\ProjectController as AdminProjectController;
use App\Http\Controllers\admin\MemberController as AdminMemberController;
use App\Http\Controllers\front\ProjectController as FrontProjectController;
use App\Http\Controllers\front\ServiceController as FrontServiceController;
use App\Http\Controllers\front\MemberController as FrontMemberController;
use App\Http\Controllers\ContactController;
use Illuminate\Support\Facades\Route;

// Authentication Routes
Route::post('authenticate', [AuthenticationController::class, 'authenticate']);

// Password Management Routes
Route::post('/send-reset-email', [AuthenticationController::class, 'sendPasswordResetEmail']);

Route::post('/reset-password', [AuthenticationController::class, 'resetPassword']);

Route::post('/change-password', [AuthenticationController::class, 'changePassword'])->middleware('auth:sanctum');

// Contact Route

Route::post('/send-email', [ContactController::class, 'sendEmail']);



// Public Routes for services
Route::get('get-services', [FrontServiceController::class, 'index']);
Route::get('get-latest-services', [FrontServiceController::class, 'latestServices']);
Route::get('get-service/{id}', [FrontServiceController::class, 'service']);

// Public Routes for Projects
Route::get('get-projects', [FrontProjectController::class, 'index']);
Route::get('get-latest-projects', [FrontProjectController::class, 'latestProjects']);
Route::get('get-project/{id}', [FrontProjectController::class, 'project']);

// Public Routes for Members
Route::get('get-members', [FrontMemberController::class, 'index']);
Route::get('get-latest-members', [FrontMemberController::class, 'latestMembers']);
Route::get('get-member/{id}', [FrontMemberController::class, 'member']);

// Protected Routes
Route::group(['middleware' => ['auth:sanctum']], function () {
    // Dashboard Routes
    Route::get('dashboard', [DashboardController::class, 'index']);
    Route::post('logout', [AuthenticationController::class, 'logout']);

    // Service Routes
    Route::post('services', [ServiceController::class, 'store']);
    Route::get('services', [ServiceController::class, 'index']);
    Route::put('services/{id}', [ServiceController::class, 'update']);
    Route::get('services/{id}', [ServiceController::class, 'show']);
    Route::delete('services/{id}', [ServiceController::class, 'destroy']);

    // Project Routes
    Route::post('projects', [AdminProjectController::class, 'store']);
    Route::get('projects', [AdminProjectController::class, 'index']);
    Route::put('projects/{id}', [AdminProjectController::class, 'update']);
    Route::get('projects/{id}', [AdminProjectController::class, 'show']);
    Route::delete('projects/{id}', [AdminProjectController::class, 'destroy']);

    // Member Routes
    Route::post('members', [AdminMemberController::class, 'store']);
    Route::get('members', [AdminMemberController::class, 'index']);
    Route::put('members/{id}', [AdminMemberController::class, 'update']);
    Route::get('members/{id}', [AdminMemberController::class, 'show']);
    Route::delete('members/{id}', [AdminMemberController::class, 'destroy']);

    // Temporary Image Routes
    Route::post('temp-images', [TempImageController::class, 'store']);
});

