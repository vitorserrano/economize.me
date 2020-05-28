exports.up = function (knex) {
  return knex.schema.createTable('accounts', function (table) {
    table.increments();

    table.string('name').notNullable();
    table.string('type').notNullable();
    table.decimal('current_balance').notNullable();
    table.string('status', 1).notNullable();

    table.string('user_id').notNullable();

    table.foreign('user_id').references('id').inTable('users');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('accounts');
};
