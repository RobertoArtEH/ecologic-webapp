'use strict'

const User = use('App/Models/User');

class UserController {
  async register({request, response}) {
    const { username, email, password } = request.all();
    
    let user = new User();
    user.username = username;
    user.email = email;
    user.password = password;

    try {
      let save = await user.save();

      if(save)
        return response.status(201).json(user);

      return response.status(401).json({ error: 'Ha ocurrido un error.' });
    } catch(error) {
      return response.status(401).json(error.message);
    }
  }

  async login({ request, response, auth }) {
    const { email, password } = request.all();
    
    try {
      const token = await auth.attempt(email, password);

      if(token)
        return response.status(201).json(token);

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

  show({ auth, params }) {
    if(auth.user.id !== Number(params.id)) {
      return 'You cannot see someone else\'s profile';
    }

    return auth.user;
  }

  async showAll({ request, response }) {
    return response.status(200).json(await User.all());
  }
}

module.exports = UserController
