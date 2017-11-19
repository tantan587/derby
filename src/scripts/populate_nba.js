require('dotenv').config()
var rp = require('request-promise');

var connectionstr = process.env.DATABASE_URL === undefined ? 'postgres://koperman:derbyapp123@localhost:5432/postgres' : process.env.DATABASE_URL
var knex = require('knex')({
  client: 'pg',
  connection: connectionstr,
  searchPath: 'knex,leagues'
});

var options = {
    url: 'https://api.fantasydata.net/v3/nba/scores/JSON/Standings/2018?',
    headers: {
      'User-Agent': 'request',
      'Ocp-Apim-Subscription-Key':'76f8aeb6059440e99dd1ecfcc662ddde'
    },
    json: true
  };

rp(options)
  .then(function (data) {
    var teamInfo = []
    var standings = []

    data.map(team => 
        {
            teamInfo.push({teamid: team.TeamID, key: team.Key, city: team.City, 
                name: team.Name, conference: team.Conference, division: team.Division})

            standings.push({teamid: team.TeamID, wins : team.Wins, losses: team.Losses,
                conferencewins: team.ConferenceWins, conferencelosses : team.ConferenceLosses})    
        })

    insertIntoTable('nba_info', teamInfo);
    insertIntoTable('nba_standings', standings);
  })
  .catch(function (err) {
      console.error(err)
  });

function insertIntoTable(tableName, table) {
    knex.insert(table)
    .into(tableName)
    .then(result =>
    {
        console.log(result)
    })
}

