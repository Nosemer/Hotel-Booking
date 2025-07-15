<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\BranchController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\RoomTypeController;
use App\Http\Controllers\DiscountController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public welcome page
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Authenticated & Verified routes
Route::middleware(['auth', 'verified'])->group(function () {

    // Dashboard page
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    // Branches page (only if user has permission)
    Route::get('/branches', function () {
        return Inertia::render('Branches');
    })->name('branches')->middleware('can:view branches');
    Route::get('/branch-data', [BranchController::class, 'index'])->name('branches.data');
    Route::post('/branch-store', [BranchController::class, 'store'])->name('branches.store');

    Route::get('/rooms', function () {
            return Inertia::render('Rooms');
        })->name('rooms')->middleware('can:view rooms');
        Route::get('/room-data', [RoomController::class, 'index']);
        Route::post('/room-store', [RoomController::class, 'store']);
        Route::delete('/room-delete/{id}', [RoomController::class, 'destroy']);
        Route::get('/room-form-data', [RoomController::class, 'formData']);
   
   Route::get('/room-types', function () {
        return Inertia::render('RoomTypes');
    })->name('roomTypes')->middleware('can:view room types');
        Route::get('/room-type-data', [RoomTypeController::class, 'index']);
        Route::post('/room-type-store', [RoomTypeController::class, 'store']);
        Route::delete('/room-type-delete/{id}', [RoomTypeController::class, 'destroy']);

    Route::get('/discount', function () {
        return Inertia::render('Discount');
    })->name('discount')->middleware('can:view discounts');
         Route::get('/discount-data', [DiscountController::class, 'index']);
        Route::post('/discount-store', [DiscountController::class, 'store']);
        Route::delete('/discount-delete/{id}', [DiscountController::class, 'destroy']);
        Route::get('/discount-room-options', [DiscountController::class, 'roomList']);
    });

// Authenticated routes (for profile settings)
Route::middleware(['auth'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
