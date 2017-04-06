'use strict';

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/galvanize-bookshelf'
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/galvanize-bookshelf'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL + '?ssl=true'
  }
};
