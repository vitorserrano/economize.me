const crypto = require('crypto');
const connection = require('../database/connection');
const isColumnUnique = require('../utils/isColumnUnique');

module.exports = {
  async index(request, response) {
    try {
      const users = await connection('users').select('*');

      return response.json(users);
    } catch (error) {
      return response.status(400).json({ error });
    }
  },

  async create(request, response) {
    try {
      const { name, email, phone, city, uf } = request.body;

      await isColumnUnique('users', 'email', email);
      await isColumnUnique('users', 'phone', phone);

      const id = crypto.randomBytes(4).toString('HEX');

      await connection('users').insert({
        id,
        name,
        email,
        phone,
        city,
        uf,
      });

      return response.json({ id });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  },

  async update(request, response) {
    try {
      const { id } = request.params;
      const { name, email, phone, city, uf } = request.body;

      const user = await connection('users')
        .where('id', id)
        .select('id')
        .first();

      if (user.id !== id) {
        return response.status(401).json({ error: 'Operation not permited.' });
      }

      await isColumnUnique('users', 'email', email, id);
      await isColumnUnique('users', 'phone', phone, id);

      await connection('users')
        .update({ name, email, phone, city, uf })
        .where('id', id);

      return response.status(204).send();
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  },
};
