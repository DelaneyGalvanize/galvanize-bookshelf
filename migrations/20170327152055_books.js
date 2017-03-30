// exports.up = function(knex) {
//   return knex.schema.createTable('books', table => {
//     // table.serial primary key('id');
//     table.increments('id').primary();
//     table.string('title').notNullable().defaultTo('');
//     table.string('author').notNullable().defaultTo('');
//     table.string('genre').notNullable().defaultTo('');
//     table.text('description').notNullable().defaultTo('');
//     table.text('cover_url').notNullable().defaultTo('');
//     table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
//     table.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable();
//   });
// };
//
// exports.down = function(knex) {
//   return knex.schema.dropTable('books');
// };

exports.up = function(knex) {
  return knex.schema.createTable('books', table => {
    table.increments()
    table.string('title').notNullable().defaultTo('');
    table.string('author').notNullable().defaultTo('');
    table.string('genre').notNullable().defaultTo('');
    table.text('description').notNullable().defaultTo('');
    table.text('cover_url').notNullable().defaultTo('');
    table.timestamps(true, true);
  })
};

exports.down = function(knex) {
return knex.schema.dropTable('books');
};
