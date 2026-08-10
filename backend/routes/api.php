<?php
use App\Http\Controllers\Api\AuthController;use App\Http\Controllers\Api\EventController;use App\Http\Controllers\Api\MemberController;use Illuminate\Support\Facades\Route;
Route::post('/register',[AuthController::class,'register']);Route::post('/login',[AuthController::class,'login']);
Route::get('/events',[EventController::class,'index']);
Route::middleware('auth:sanctum')->group(function(){Route::get('/me',[AuthController::class,'me']);Route::post('/logout',[AuthController::class,'logout']);Route::get('/members',[MemberController::class,'index']);});
