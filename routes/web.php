<?php

use App\Http\Controllers\CtfController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LeaderboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [\App\Http\Controllers\DashboardController::class, 'index'])->name('dashboard');
});

// Public Pages
Route::get('/home', function () {
    return Inertia::render('Home');
})->name('home.page');

Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

Route::get('/community', function () {
    return Inertia::render('Community');
})->name('community');

Route::get('/resources', function () {
    return Inertia::render('Resources');
})->name('resources');

// CTF Routes
Route::get('/ctf', [CtfController::class, 'index'])->name('ctf.index');
Route::get('/ctf/challenges/{challenge}', [CtfController::class, 'show'])->name('ctf.challenges.show');
Route::post('/ctf/challenges/{challenge}/submit', [CtfController::class, 'submit'])
    ->middleware('auth')
    ->name('ctf.challenges.submit');

// Leaderboard Routes
Route::get('/leaderboard', [LeaderboardController::class, 'index'])->name('leaderboard.index');

require __DIR__.'/settings.php';
