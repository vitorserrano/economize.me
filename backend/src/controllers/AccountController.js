const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    try {
      const { page = 1 } = request.query;
      const user_id = request.userId;

      const [count] = await connection('accounts').count();

      const accounts = await connection('accounts')
        .limit(5)
        .offset((page - 1) * 5)
        .where('user_id', user_id)
        .select('*');

      response.header('X-Total-Count', count['count(*)']);

      return response.json(accounts);
    } catch (error) {
      return response.status(400).json({ error });
    }
  },

  async create(request, response) {
    try {
      const { name, type, current_balance, status } = request.body;
      const user_id = request.userId;

      const [id] = await connection('accounts').insert({
        name,
        type,
        current_balance,
        status,
        user_id,
      });

      return response.json({ id });
    } catch (error) {
      return response.status(400).json({ error });
    }
  },

  async delete(request, response) {
    try {
      const { id } = request.params;
      const user_id = request.userId;

      const account = await connection('accounts')
        .where('id', id)
        .select('user_id')
        .first();

      if (account.user_id !== user_id) {
        return response.status(401).json({ error: 'Operation not permited.' });
      }

      await connection('accounts').where('id', id).delete();

      return response.status(204).send();
    } catch (error) {
      return response.status(400).json({ error });
    }
  },
};
