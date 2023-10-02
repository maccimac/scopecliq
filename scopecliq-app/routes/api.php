<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ClientsController;
use App\Http\Controllers\ProjectsController;
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

    Route::get('/', [ClientsController::class, 'fetchAllClients']);
    Route::get('/{client_id}', [ClientsController::class, 'fetchSingleClient']);
    Route::get('/consultant/{user_id}', [ClientsController::class, 'fetchClientsOfConsultant']);

});


// PROJECTS
Route::prefix('projects')->group(function () {

    Route::get('/', [ProjectsController::class, 'fetchAllProjects']);
    Route::get('/{project_id}', [ProjectsController::class, 'fetchSingleProject']);
    Route::get('/client/{client_id}', [ProjectsController::class, 'fetchProjectsOfClient']);
    Route::get('/consultant/{consultant_id}', [ProjectsController::class, 'fetchProjectsOfConsultant']);

});


// DELIVERABLES
Route::prefix('deliverables')->group(function () {

    Route::get('/', [DeliverablesController::class, 'getAll']);
    Route::post('/update/{id}', [DeliverablesController::class, 'update']);
    

});
