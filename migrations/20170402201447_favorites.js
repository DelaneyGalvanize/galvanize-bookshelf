'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('favorites', (table) => {
    table.increments('id').primary();
    table.integer('book_id').references('id').inTable('books').notNullable().onDelete('CASCADE');
    table.integer('user_id').references('id').inTable('users').notNullable().onDelete('CASCADE');
    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
    table.timestamp('updated_at').notNullable().defaultTo(knex.raw('now()'));
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('favorites');
};
