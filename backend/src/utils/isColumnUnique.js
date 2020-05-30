const connection = require('../database/connection');

module.exports = async function isColumnUnique(
  table,
  column,
  field,
  fieldId,
  id
) {
  let result = {};

  if (id) {
    result = await connection(table)
      .select('*')
      .where(column, field)
      .whereNot(fieldId, id)
      .first();
  } else {
    result = await connection(table).select('*').where(column, field).first();
  }

  if (result) {
    throw new Error(`${field} já está sendo utilizado.`);
  }
};
