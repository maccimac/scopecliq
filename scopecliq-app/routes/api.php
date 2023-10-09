<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ClientsController;
use App\Http\Controllers\ProjectsController;
use App\Http\Controllers\MilestonesController;
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
    Route::get('/{client_id}', [ClientsController::class, 'fetchClientById']);
    Route::get('/consultant/{user_id}', [ClientsController::class, 'fetchClientsByConsultant']);

});


// PROJECTS
Route::prefix('projects')->group(function () {

    Route::get('/', [ProjectsController::class, 'fetchAllProjects']);
    Route::get('/{project_id}', [ProjectsController::class, 'fetchById']);
    Route::get('/client/{client_id}', [ProjectsController::class, 'fetchProjectsByClient']);
    Route::get('/consultant/{consultant_id}', [ProjectsController::class, 'fetchProjectsByConsultant']);

});

// MILESTONES
Route::prefix('milestones')->group(function () {

    Route::get('/{milestone_id}', [MilestonesController::class, 'fetchMilestoneById']);
    Route::get('/project/{project_id}', [MilestonesController::class, 'fetchMilestonesByProject']);
    Route::get('/last-position/{project_id}', [MilestonesController::class, 'getLastPositionByProject']);
    Route::post('/add/{project_id}', [MilestonesController::class, 'addMilestoneToProject']);
});


// DELIVERABLES
Route::prefix('deliverables')->group(function () {

    Route::get('/{id}', [DeliverablesController::class, 'fetchDeliverableById']);
    Route::get('/project/{project_id}', [DeliverablesController::class, 'fetchDeliverablesByProject']);
    // Route::get('/milestone/{milestone_id}', [DeliverablesController::class, 'fetchDeliverablesByMilestone']);
    Route::post('/update/{id}/status/{status}', [DeliverablesController::class, 'updateDeliverableStatus']);
    Route::post('/add/milestone/{milestone_id}', [DeliverablesController::class, 'addDeliverableToMilestone']);
    Route::post('/edit/{id}', [DeliverablesController::class, 'editDeliverableById']);
    
});
