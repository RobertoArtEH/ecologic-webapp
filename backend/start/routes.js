'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

/** 
 *  👤 User routes 
 */

/**
 * Login route
 * @returns object with user data and bearer token.
 */
Route
  .post('login', 'UserController.login')
  .middleware(['guest', 'checkUserStatus']);

/**
 * Register route
 * @returns object with user data.
 */
Route
  .post('register', 'UserController.register')
  .middleware('guest');

/**
 * Logout route
 * @returns null.
 */
Route
  .get('logout', 'UserController.logout')
  .middleware('auth');

/**
 * Show all users route
 * @returns array with all users.
 */
Route
  .get('users', 'UserController.showAll')
  .middleware(['auth', 'checkUserLoggedStatus']);

/**
 * Switch status route
 * @returns object with user data.
 */
Route
  .put('status', 'UserController.switchStatus')
  .middleware(['auth', 'checkUserAdmin', 'checkUserLoggedStatus']);

/** 
 *  🔥 Firebase routes
 */

Route
  .get('sensors', 'FirebaseController.sensors')
  .middleware(['auth', 'checkUserLoggedStatus']);

Route
  .get('sensors/last', 'FirebaseController.lastSensors')
  .middleware(['auth', 'checkUserLoggedStatus']);

Route
  .get('waterlog', 'FirebaseController.waterLog')
  .middleware(['auth', 'checkUserLoggedStatus']);

Route
  .get('waterlog/last', 'FirebaseController.lastWaterLog')
  .middleware(['auth', 'checkUserLoggedStatus']);
  
Route
  .post('waterlog/register', 'FirebaseController.registerWater')
  .middleware(['auth', 'checkUserLoggedStatus']);
  
/** 
 *  🌱 Plant routes
 */

/**
 * Sends the action to water the plant
 * @returns message of success or error.
 */
Route
  .post('water', 'PlantController.water')
  .middleware(['auth', 'checkUserLoggedStatus']);

/** 
 *  ⛅ Weather routes
 */
Route
  .get('weather/nextdays', 'WeatherController.nextDays')
  .middleware(['auth', 'checkUserLoggedStatus']);