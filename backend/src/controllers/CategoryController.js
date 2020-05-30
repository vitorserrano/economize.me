const connection = require('../database/connection');
const isColumnUnique = require('../utils/isColumnUnique');

module.exports = {
  async index(request, response) {
    try {
      const { page = 1 } = request.query;
      const user_id = request.userId;

      const [count] = await connection('categories').count();

      const categories = await connection('categories')
        .limit(5)
        .offset((page - 1) * 5)
        .where('user_id', user_id)
        .select('*');

      response.header('X-Total-Count', count['count(*)']);

      return response.json(categories);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  },

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
