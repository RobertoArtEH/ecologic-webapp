'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class CheckUserLoggedStatus {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, response, auth }, next) {
    // call next to advance the request
    try {
      const user = await auth.getUser();

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

module.exports = CheckUserLoggedStatus
