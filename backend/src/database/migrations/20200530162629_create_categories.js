exports.up = function (knex) {
  return knex.schema.createTable('categories', function (table) {
    table.increments();

    table.string('name').unique().notNullable();

    table.string('user_id').notNullable();
    table.foreign('user_id').references('id').inTable('users');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('categories');
};
