const connection = require('../database/connection');

module.exports = async function isColumnUnique(table, column, field) {
  const result =  await connection(table)
    .select('*')
    .where(column, field)
    .first();

    if (result) {
      throw new Error(`Esse ${column} já está sendo utilizado`);
    }
}
