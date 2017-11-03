import { Router } from 'express'
import C from '../common/constants'
import { v4 } from 'uuid'
require('dotenv').config()
import Team from '../common/models/team'
var bcrypt = require('bcrypt-nodejs');

var knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL,
  searchPath: 'knex,leagues'
});

//going to used for transactions
//var Promise = require('bluebird')


const router = Router()

const dispatchAndRespond = (req, res, action) => {
    //req.store.dispatch(action)
    res.status(200).json(action)
}

router.get("/nfl", (req, res) =>
    {
        knex('nfl')
        .select()
        .then(result =>
        {
            var teamsInLeague = []
            result.map(x => teamsInLeague.push(new Team(x.team_id, x.team, x.wins, x.losses, x.ties)))
            dispatchAndRespond(req, res, {type: C.GET_TEAMS, teams: teamsInLeague})
        })
    }
)

export default router
