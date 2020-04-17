'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class CheckUserAdmin {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, response, auth }, next) {
    try {
      const user = await auth.getUser();
      
      if(user.isAdmin()) {
        await next(request);
      } else {
        return response.status(401).json({ error: 'Se necesitan permisos de administrador.' });
      }
    } catch (error) {
      return response.status(400).json(error.message);
    }
  }
}

module.exports = CheckUserAdmin
