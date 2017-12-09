require('dotenv').config()
var rp = require('request-promise');
var db_helpers = require('../db-helpers').data

var connectionstr = process.env.DATABASE_URL === undefined ? 'postgres://koperman:derbyapp123@localhost:5432/postgres' : process.env.DATABASE_URL
var knex = require('knex')({
  client: 'pg',
  connection: connectionstr,
  searchPath: 'knex,sports'
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
    const cb = sportId => {
        data.map(team => 
            {
                var teamId = db_helpers.createTeamId(sportId, team.TeamID)

                teamInfo.push({team_id: teamId, key: team.Key, city: team.City, 
                    name: team.Name, conference: team.Conference, division: team.Division})

                standings.push({team_id: teamId, wins : team.Wins, losses: team.Losses,
                    conference_wins: team.ConferenceWins, conference_losses : team.ConferenceLosses})    
            })

        db_helpers.insertIntoTable(knex, 'nba_info', teamInfo, false);
        db_helpers.insertIntoTable(knex, 'nba_standings', standings, true);

    }

    db_helpers.getSportId(knex,'NBA', cb)

  })
  .catch(function (err) {
      console.error(err)
  });
  
