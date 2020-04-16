'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const User = use('App/Models/User');

class CheckUserStatus {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, response, auth }, next) {
    // call next to advance the request
    try {
      const { email } = request.all();
      const user = await User.query().where('email', email).first();

      if(user.isActive()) {
        await next(request);
      } else {
        return response.status(401).json({ error: 'Usuario bloqueado.' });
      }
    } catch (error) {
      return response.status(400).json(error.message);
    }
  }
}

module.exports = CheckUserStatus
