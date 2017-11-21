require('dotenv').config()
var db_helpers = require('../db-helpers').data

var connectionstr = process.env.DATABASE_URL === undefined ? 'postgres://koperman:derbyapp123@localhost:5432/postgres' : process.env.DATABASE_URL
var knex = require('knex')({
  client: 'pg',
  connection: connectionstr,
  searchPath: 'knex,sports'
});

function createSportsTable() {
    knex.schema.withSchema('sports').createTable('sport_leagues', function (table) {
    
    table.string('sport');
    table.decimal('sport_id',3,0).primary();
    table.string('type');
    //table.timestamps();
    })
    .then(result =>
    {
        console.log(result)
    })
    .catch(function(error) { 
        console.error(error)

    });
}

function createNbaInfo() {
    knex.schema.withSchema('sports').createTable('nba_info', function (table) {
    table.decimal('team_id',6,0).primary();
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
    .catch(function(error) { 
        console.error(error)

    });
}

function createNbaStandings() {
    knex.schema.withSchema('sports').createTable('nba_standings', function (table) {
    table.decimal('team_id',6,0).primary();
    table.smallint('wins')
    table.smallint('losses')
    table.smallint('conference_wins')
    table.smallint('conference_losses')
    })
    .then(result =>
    {
        console.log(result)
        process.exit()

    })
    .catch(function(error) { 
        console.error(error)
        process.exit()
    });
}

createSportsTable()
createNbaInfo()
createNbaStandings()







