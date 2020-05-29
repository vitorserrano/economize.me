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
}
