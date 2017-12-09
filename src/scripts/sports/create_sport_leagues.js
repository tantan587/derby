require('dotenv').config()
var rp = require('request-promise');
var db_helpers = require('../db-helpers').data


var connectionstr = process.env.DATABASE_URL === undefined ? 'postgres://koperman:derbyapp123@localhost:5432/postgres' : process.env.DATABASE_URL
var knex = require('knex')({
  client: 'pg',
  connection: connectionstr,
  searchPath: 'knex,sports'
});

const allSports = [{sport: 'NBA', sport_id : 101, type : "Basketball"}]
db_helpers.insertIntoTable(knex, 'sport_leagues', allSports, true)


