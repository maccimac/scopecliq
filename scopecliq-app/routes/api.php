<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ClientsController;
use App\Http\Controllers\DeliverablesController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// CLIENTS
Route::prefix('clients')->group(function () {

    Route::get('/', [ClientsController::class, 'getAll']);

});


// CLIENTS
Route::prefix('deliverables')->group(function () {

    Route::get('/', [DeliverablesController::class, 'getAll']);
    Route::post('/update/{id}', [DeliverablesController::class, 'update']);

});
