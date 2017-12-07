// Update with your config settings.

module.exports = {
  development: {
    client: 'postgresql',
    connection: `postgres://koperman:derbyapp123@localhost:5432/derby`,
    migrations: {
      directory: __dirname + '/src/server/db/migrations'
    },
    seeds: {
      directory: __dirname + '/src/server/db/seeds'
    }
  }
};

