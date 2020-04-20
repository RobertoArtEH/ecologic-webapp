'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

/**
 * User routes
 */

/**
 * Login route
 * @middleware guest - verifies the user is not authenticated,
 *             checkUserStatus - checks if user status equals to 1.
 * @returns object with user data and bearer token.
 */
Route
  .post('login', 'UserController.login')
  .middleware(['guest', 'checkUserStatus']);

/**
 * Register route
 * @middleware guest - verifies the user is not authenticated.
 * @returns object with user data.
 */
Route
  .post('register', 'UserController.register')
  .middleware('guest');

/**
 * Logout route
 * @middleware auth - verifies the user is authenticated.
 * @returns null
 */
Route
  .get('logout', 'UserController.logout')
  .middleware('auth');

/**
 * Show all users route
 * @middleware auth - verifies the user is authenticated.
 * @returns array with all users
 */
Route
  .get('users', 'UserController.showAll')
  .middleware('auth');

/**
 * Switch status route
 * @middleware auth - verifies the user is authenticated.
 *             checkUserAdmin - checks if user role equals to 1
 * @returns object with user data
 */
Route
  .put('status', 'UserController.switchStatus')
  .middleware(['auth', 'checkUserAdmin']);

/**
 * Firebase routes
 */

Route
  .post('waterlog/register', 'FirebaseController.registerWater')
  .middleware(['auth'])

Route
  .get('waterlog', 'FirebaseController.waterlog')
  .middleware(['auth'])
