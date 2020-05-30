const connection = require('../database/connection');
const isColumnUnique = require('../utils/isColumnUnique');

module.exports = {
  async create(request, response) {
    try {
      const { name } = request.body;
      const user_id = request.userId;

      await isColumnUnique('categories', 'name', name);

      const [id] = await connection('categories').insert({
        name,
        user_id,
      });

      return response.json({ id });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  },
};
