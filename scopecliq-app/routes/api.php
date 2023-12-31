<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\OrganizationsController;
use App\Http\Controllers\ProjectsController;
use App\Http\Controllers\MilestonesController;
use App\Http\Controllers\DeliverablesController;
use App\Http\Controllers\InvoicesController;
use App\Http\Controllers\NotificationsController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AnalyticsController;

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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

// USERS
Route::prefix('user')->group(function () {
    Route::post('/login', [UserController::class, 'login']);
    Route::post('/register', [UserController::class, 'register']);
    Route::post('/validate', [UserController::class, 'validateRegistration']);
});

// ORGANIZATIONS
Route::prefix('organizations')->group(function () {
    Route::get('/', [OrganizationsController::class, 'fetchAllOrganizations']);
    Route::get('/{organization_id}', [OrganizationsController::class, 'fetchOrganizationById']);
    Route::get('/consultant/{user_id}', [OrganizationsController::class, 'fetchOrganizationByConsultantId']);
    Route::post('/add/{user_id}', [OrganizationsController::class, 'addOrganization']);
    Route::post('/update/{organization_id}', [OrganizationsController::class, 'updateOrganizationById']);
    Route::post('/update-logo/{organization_id}', [OrganizationsController::class, 'updateOrganizationLogoById']);
});


// PROJECTS
Route::prefix('projects')->group(function () {
    Route::get('/', [ProjectsController::class, 'fetchAllProjects']);
    Route::get('/consultant-user-id/{user_id}', [ProjectsController::class, 'fetchAllProjectsByConsultantUserId']);
    Route::get('/{project_id}', [ProjectsController::class, 'fetchById']);
    Route::get('/portal/{portal}', [ProjectsController::class, 'fetchByPortal']);
    Route::get('/organization/{organization_id}', [ProjectsController::class, 'fetchProjectsByOrganization']);
    Route::get('/consultant/{consultant_id}', [ProjectsController::class, 'fetchProjectsByConsultant']);
    Route::post('/add/{organization_id}', [ProjectsController::class, 'addProject']);
});

// MILESTONES
Route::prefix('milestones')->group(function () {
    Route::get('/{milestone_id}', [MilestonesController::class, 'fetchMilestoneById']);
    Route::get('/project/{project_id}', [MilestonesController::class, 'fetchMilestonesByProject']);
    Route::get('/last-position/{project_id}', [MilestonesController::class, 'getLastPositionByProject']);
    Route::post('/add/{project_id}', [MilestonesController::class, 'addMilestoneToProject']);
    Route::post('/update/{milestone_id}', [MilestonesController::class, 'updateMilestoneById']);
    Route::post('/update-position/{milestone_id}/{position_id}', [MilestonesController::class, 'updateMilestonePositionById']);
    Route::post('/update-status/{milestone_id}/{status}', [MilestonesController::class, 'updateMilestoneStatusById']);
    Route::post('/delete/{milestone_id}', [MilestonesController::class, 'deleteMilestoneById']);    
});


// DELIVERABLES
Route::prefix('deliverables')->group(function () {
    Route::get('/{id}', [DeliverablesController::class, 'fetchDeliverableById']);
    Route::get('/project/{project_id}', [DeliverablesController::class, 'fetchDeliverablesByProject']);
    Route::get('/milestone/{milestone_id}', [DeliverablesController::class, 'fetchDeliverablesByMilestone']);
    Route::post('/update/{id}/status/{status}', [DeliverablesController::class, 'updateDeliverableStatus']);
    Route::post('/update/{id}/position/{position}', [DeliverablesController::class, 'updateDeliverablePosition']);
    Route::post('/add/milestone/{milestone_id}', [DeliverablesController::class, 'addDeliverableToMilestone']);
    Route::post('/edit/{id}', [DeliverablesController::class, 'editDeliverableById']);
    Route::post('/delete/{id}', [DeliverablesController::class, 'deleteDeliverableById']);   
});

// INVOICES
Route::prefix('invoices')->group(function () {
    Route::get('/{id}', [InvoicesController::class, 'fetchInvoiceByInvoiceId']);
    Route::post('/milestone/{milestone_id}', [InvoicesController::class, 'fetchInvoiceByMilestoneIdFull']);
    Route::get('/project/{project_id}', [InvoicesController::class, 'fetchInvoicesByProject']);
    Route::post('/mark-paid/{id}', [InvoicesController::class, 'markInvoicePaid']);
    Route::post('/pay/{id}', [InvoicesController::class, 'payInvoice']);
    Route::post('/create', [InvoicesController::class, 'createInvoiceOfMilestone']);    
});

// NOTIFICATIONS
Route::prefix('notifications')->group(function () {
    Route::get('/{id}', [NotificationsController::class, 'fetchNotificationById']);
    Route::get('/project/{project_id}', [NotificationsController::class, 'fetchNotificationsByProject']);
    Route::post('/project/{project_id}/add', [NotificationsController::class, 'addNotificationToProject']);
    Route::post('/read/{id}', [NotificationsController::class, 'markNotificationAsRead']);
});

// ANALYTICS
Route::prefix('analytics')->group(function () {
    Route::get('/project/{project_id}/progress', [AnalyticsController::class, 'fetchProgressPercentByProject']);
    Route::get('/milestone/{milestone_id}/progress', [AnalyticsController::class, 'fetchProgressPercentByMilestone']);
    Route::get('/{user_id}/projects', [AnalyticsController::class, 'fetchProjectsAnalytics']);
    Route::get('/{user_id}/milestones', [AnalyticsController::class, 'fetchMilestonesAnalytics']);
    Route::get('/{user_id}/invoices', [AnalyticsController::class, 'fetchInvoicesAnalytics']);
    Route::get('/{user_id}/match-milestone-to-invoice', [AnalyticsController::class, 'matchMilestonesToInvoice']);
});
