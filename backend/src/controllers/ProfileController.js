const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    try {
      const { page = 1 } = request.query;
      const user_id = request.userId;

      const accounts = await connection('accounts')
        .limit(5)
        .offset((page - 1) * 5)
        .where('user_id', user_id)
        .select('*');

      return response.json({ accounts });
    } catch (error) {
      return response.status(400).json({ error });
    }
  },
};
