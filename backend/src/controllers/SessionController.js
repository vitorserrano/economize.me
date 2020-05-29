const jwt = require('jsonwebtoken');
const authorization = require('../config/configToken');
const connection = require('../database/connection');

module.exports = {
  async create(request, response) {
    try {
      const { id } = request.body;

      const user = await connection('users')
        .where('id', id)
        .select('id')
        .first();

      if (!user) {
        return response
          .status(400)
          .json({ error: 'No User found with this ID' });
      }

      return response.json({
        user,
        token: jwt.sign(
          {
            id: user.id,
          },
          authorization.secret,
          {
            expiresIn: authorization.expireIn,
          }
        ),
      });
    } catch (error) {
      return response.status(400).json({ error });
    }
  },
};
