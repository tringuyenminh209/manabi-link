<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route cho React SPA - tất cả sẽ được xử lý bởi React Router
Route::get('/login', function () {
    return view('app');
})->name('login');

Route::get('/register', function () {
    return view('app');
});

Route::get('/dashboard', function () {
    return view('app');
});

Route::get('/admin', function () {
    return view('app');
});

Route::get('/teacher', function () {
    return view('app');
});

require __DIR__.'/auth.php';

// Fallback route cho React SPA
Route::get('/{any}', function () {
    return view('app'); // Đảm bảo file resources/views/app.blade.php tồn tại
})->where('any', '.*');
