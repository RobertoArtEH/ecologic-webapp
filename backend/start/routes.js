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

Route
  .post('login', 'UserController.login')
  .middleware(['guest', 'checkUserStatus']);

Route
  .post('register', 'UserController.register')
  .middleware('guest');

Route
  .get('logout', 'UserController.logout')
  .middleware('auth');

Route
  .get('users', 'UserController.showAll')
  // .middleware('auth');

Route
  .put('status', 'UserController.switchStatus')
  // .middleware('auth');