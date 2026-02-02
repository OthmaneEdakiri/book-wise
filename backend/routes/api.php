<?php

use App\Http\Controllers\BookController;
use App\Http\Controllers\BorrowRequestController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\UserController;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->group(static function () {
    Route::get('/user', function (Request $request) {
        return response()->json(
            UserResource::make($request->user())->resolve()
        );
    });

    // Book Routes
    Route::get('/books', [BookController::class, 'index']);
    Route::get('/books/{book}', [BookController::class, 'show']);

    // Borrow Request Routes
    Route::post("/borrow-requests", [BorrowRequestController::class, "store"]);
    Route::get("/borrow-requests/my", [BorrowRequestController::class, "userRequests"]);

});

Route::middleware(['auth:sanctum', 'ability:admin'])->prefix('admin')->group(static function () {
    // Book Routes
    Route::post('/books', [BookController::class, 'store']);
    Route::delete('/books/{book}', [BookController::class, 'destroy']);
    Route::put('/books/{book}', [BookController::class, 'update']);

    // User Routes
    Route::get("/users", [UserController::class, "index"]);
    Route::delete("/users/{id}", [UserController::class, "destroy"]);
    Route::patch("/users/{id}/status", [UserController::class, "updateStatus"]);

    // Borrow Request Routes
    Route::get("/borrow-requests", [BorrowRequestController::class, "index"]);
    Route::patch('/borrow-requests/{borrowRequest}/status', [BorrowRequestController::class, 'updateStatus']);

    // Dashboard Routes
    Route::get('/dashboard/stats', [DashboardController::class, 'stats']);
});
