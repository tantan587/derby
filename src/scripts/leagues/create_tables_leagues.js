require('dotenv').config()
var db_helpers = require('../db-helpers').data

var connectionstr = process.env.DATABASE_URL === undefined ? 'postgres://koperman:derbyapp123@localhost:5432/postgres' : process.env.DATABASE_URL
var knex = require('knex')({
  client: 'pg',
  connection: connectionstr,
  searchPath: 'knex,leagues'
});

function createLeagueTable() {
    knex.schema.withSchema('leagues').createTable('leagues', function (table) {
    
    table.string('league_id').primary();
    table.string('league_name');
    table.decimal('year_start',4,0)
    table.decimal('year_end',4,0)
    table.timestamps();
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

function createSportUsage() {
    knex.schema.withSchema('leagues').createTable('sport_usage', function (table) {
    table.string('league_id')
    table.decimal('sport_id',3,0);
    table.smallint('number')
    table.bool('conference_strict');
    table.primary(['league_id', 'sport_id'])
    })
    .then(result =>
    {
        console.log(result)
    })
    .catch(function(error) { 
        console.error(error)

    });
}

function createLeagueUsers() {
    knex.schema.withSchema('leagues').createTable('users', function (table) {
    table.string('league_id')
    table.string('user_id')
    table.string('team_id')
    table.string('team_name')
    table.decimal('total_points',8,2);
    table.bool('commissioner');
    table.primary(['league_id', 'user_id'])
    })
    .then(result =>
    {
        console.log(result)
    })
    .catch(function(error) { 
        console.error(error)

    });
}

function createRosters() {
    knex.schema.withSchema('leagues').createTable('rosters', function (table) {
    table.string('league_id')
    table.string('user_id')
    table.decimal('team_id',6,0);
    table.decimal('total_points',8,2);
    table.primary(['league_id', 'user_id', 'team_id'])
    })
    .then(result =>
    {
        console.log(result)
    })
    .catch(function(error) { 
        console.error(error)

    });
}

function createSportPoints() {
    knex.schema.withSchema('leagues').createTable('sport_points', function (table) {
    table.string('league_id').primary()
    table.decimal('win_points',5,2);
    table.decimal('tie_points',5,2);
    table.decimal('loss_points',5,2);
    table.decimal('playoffs_1',5,2);
    table.decimal('playoffs_2',5,2);
    table.decimal('playoffs_3',5,2);
    table.decimal('mvp',5,2);
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

createLeagueTable()
createSportUsage()
createRosters()
createLeagueUsers()
createRosters()
createSportPoints()







