require('dotenv').config()


var knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL,
  searchPath: 'knex,users'
});

console.log(process.env.DATABASE_URL)

//going to used for transactions
//var Promise = require('bluebird')


function sayHello() {
    knex('passwords')
    .select()
    .then(result =>
    {
        console.log(result)
    })
    console.log('Hello');
}
sayHello();