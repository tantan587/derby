require('dotenv').config()

var connectionstr = process.env.DATABASE_URL === undefined ? 'postgres://koperman:derbyapp123@localhost:5432/postgres' : process.env.DATABASE_URL
var knex = require('knex')({
  client: 'pg',
  connection: connectionstr,
  searchPath: 'knex,leagues'
});


function createNbaInfo() {
    knex.schema.withSchema('leagues').createTable('nba_info', function (table) {
    table.decimal('teamid',6,0).primary();
    table.string('key',3);
    table.string('city');
    table.string('name');
    table.string('conference');
    table.string('division');
    //table.timestamps();
    })
    .then(result =>
        {
            console.log(result)
        })
}

function createNbaStandings() {
    knex.schema.withSchema('leagues').createTable('nba_standings', function (table) {
    table.decimal('teamid',6,0).primary();
    table.smallint('wins')
    table.smallint('losses')
    table.smallint('conferencewins')
    table.smallint('conferencelosses')
    })
    .then(result =>
        {
            console.log(result)
        })
}

createNbaInfo();
createNbaStandings();




