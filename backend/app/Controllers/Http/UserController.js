'use strict'

const User = use('App/Models/User');

class UserController {
  async register({request, response}) {
    const { name, last_name, email, password } = request.all();
    
    let user = new User();
    user.name = name;
    user.last_name = last_name;
    user.email = email;
    user.password = password;

    try {
      let save = await user.save();

      if(save) {
        return response.status(201).json(user);
      }

      return response.status(401).json({ error: 'Ha ocurrido un error al registrar el usuario.' });
    } catch(error) {
      return response.status(401).json(error.message);
    }
  }

  async login({ request, response, auth }) {
    const { email, password } = request.all();
    
    try {
      const token = await auth.attempt(email, password);
      const user = await User.query().where('email', email).first();
      
      if(token) {
        return response.status(201).json({ user, token });
      }

      return response.status(401).json({ error: 'Credenciales incorrectas.' });
    } catch(error) {
      return response.status(401).json(error.message);
    }
  }

  async logout({ response, auth }) {
    let user = auth.user;
    
    await auth
      .authenticator('api')
      .revokeTokensForUser(user);

    return response.status(204).send(null);
  }

  async showAll({ request, response }) {
    return response.status(200).json(await User.all());
  }
}

module.exports = UserController
