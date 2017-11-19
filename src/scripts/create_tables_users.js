
require('dotenv').config()

var connectionstr = process.env.DATABASE_URL === undefined ? 'postgres://koperman:derbyapp123@localhost:5432/postgres' : process.env.DATABASE_URL
var knex = require('knex')({
  client: 'pg',
  connection: connectionstr,
  searchPath: 'knex,users'
});


function createInformation() {
    knex.schema.withSchema('users').createTable('information', function (table) {
    table.string('id')
    table.string('username').primary();
    table.string('first_name');
    table.string('last_name');
    table.string('email');
    //table.timestamps();
    })
    .then(result =>
        {
            console.log(result)
        })
}

function createPasswords() {
    knex.schema.withSchema('users').createTable('passwords', function (table) {
    table.string('username').primary();
    table.string('password')
    })
    .then(result =>
        {
            console.log(result)
        })
}

createInformation();
createPasswords();




