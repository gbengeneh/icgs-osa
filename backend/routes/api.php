<?php
use App\Http\Controllers\Api\GalleryController;
use App\Http\Controllers\Api\NewsController;
use App\Http\Controllers\Api\DueController;
use App\Http\Controllers\Api\AuthController;use App\Http\Controllers\Api\EventController;use App\Http\Controllers\Api\ExcoController;use App\Http\Controllers\Api\MemberController;use App\Http\Controllers\Api\SetAdministratorController;use App\Http\Controllers\Api\SetController;use App\Http\Controllers\Api\SetMemberController;use Illuminate\Support\Facades\Route;

Route::post('/register',[AuthController::class,'register']);
Route::post('/login',[AuthController::class,'login']);
Route::get('/events',[EventController::class,'index']);
Route::get('/events/featured',[EventController::class,'featured']);
Route::get('/excos',[ExcoController::class,'index']);
Route::get('/sets',[SetController::class,'publicIndex']);
Route::get('/gallery',[GalleryController::class,'index']);
Route::get('/news',[NewsController::class,'index']);
Route::get('/news/{article:slug}',[NewsController::class,'show']);

Route::middleware('auth:sanctum')->group(function(){
    Route::get('/me',[AuthController::class,'me']);
    Route::post('/logout',[AuthController::class,'logout']);
    Route::get('/members',[MemberController::class,'index']);
    Route::get('/profile',[MemberController::class,'profile']);
    Route::patch('/profile',[MemberController::class,'updateProfile']);
    Route::post('/profile',[MemberController::class,'updateProfile']);
    Route::get('/dues',[DueController::class,'memberIndex']);
    Route::post('/dues/{due}/payments',[DueController::class,'submit']);

    Route::middleware('role:coordinator,super_admin')->prefix('set-management')->group(function(){
        Route::get('/dues',[DueController::class,'manage']);
        Route::post('/dues',function(\Illuminate\Http\Request $request,DueController $controller){$request->merge(['type'=>'set']);return $controller->store($request);});
        Route::get('/dues/{due}/payments',[DueController::class,'payments']);
        Route::post('/due-payments/{payment}/verify',[DueController::class,'verify']);
        Route::post('/due-payments/{payment}/reject',[DueController::class,'reject']);
        Route::get('/administrators',[SetAdministratorController::class,'index']);
        Route::get('/administrator-candidates',[SetAdministratorController::class,'candidates']);
        Route::post('/administrators',[SetAdministratorController::class,'store']);
        Route::delete('/administrators/{administrator}',[SetAdministratorController::class,'destroy']);
        Route::get('/pending-members',[SetMemberController::class,'pending']);
        Route::post('/members/{member}/approve',[SetMemberController::class,'approve']);
        Route::post('/members/{member}/reject',[SetMemberController::class,'reject']);
        Route::patch('/members/{member}',[SetMemberController::class,'update']);
    });

    Route::middleware('role:super_admin')->prefix('admin')->group(function(){
        Route::get('/dues',[DueController::class,'manage']);
        Route::post('/dues',[DueController::class,'store']);
        Route::get('/dues/{due}/payments',[DueController::class,'payments']);
        Route::post('/due-payments/{payment}/verify',[DueController::class,'verify']);
        Route::post('/due-payments/{payment}/reject',[DueController::class,'reject']);
        Route::get('/news',[NewsController::class,'adminIndex']);
        Route::post('/news',[NewsController::class,'store']);
        Route::post('/news/{article}',[NewsController::class,'update']);
        Route::delete('/news/{article}',[NewsController::class,'destroy']);
        Route::get('/events',[EventController::class,'adminIndex']);
        Route::post('/events',[EventController::class,'store']);
        Route::post('/events/{event}',[EventController::class,'update']);
        Route::delete('/events/{event}',[EventController::class,'destroy']);
        Route::get('/gallery',[GalleryController::class,'adminIndex']);
        Route::post('/events/{event}/photos',[GalleryController::class,'upload']);
        Route::patch('/photos/{photo}',[GalleryController::class,'update']);
        Route::delete('/photos/{photo}',[GalleryController::class,'destroy']);
        Route::get('/sets',[SetController::class,'index']);
        Route::post('/sets',[SetController::class,'store']);
        Route::patch('/sets/{set}',[SetController::class,'update']);
        Route::put('/sets/{set}/coordinator',[SetController::class,'assignCoordinator']);
        Route::get('/excos',[ExcoController::class,'adminIndex']);
        Route::post('/excos',[ExcoController::class,'store']);
        Route::post('/excos/{exco}',[ExcoController::class,'update']);
        Route::patch('/excos/{exco}',[ExcoController::class,'update']);
        Route::delete('/excos/{exco}',[ExcoController::class,'destroy']);
    });
});
