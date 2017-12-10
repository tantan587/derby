const express = require('express');
const router = express.Router();
const authHelpers = require('../auth/_helpers');
const passport = require('../auth/local');
const knex = require('../db/connection');
import C from '../../common/constants'
import AuthError from "../../common/models/AuthError"
import { v4 } from 'uuid'

router.post('/createleague', authHelpers.loginRequired, (req, res, next)  => {
  return createLeague(req, res)
  .then((response) => { 
      getLeague(req.user.user_id, response.league_name)
  })
  .catch((err) => { 
    handleResponse(res, 500, 'error'); });
});

function handleReduxResponse(res, code, action)
{
  res.status(code).json(action);
}

function handleResponse(res, code, statusMsg) {
  res.status(code).json({status: statusMsg});
}

function createLeague(req, res) {
  return handleErrors(req)
  .then(() => {
    return knex.transaction(function (t) {
      return knex.withSchema('fantasy').table("leagues")
        .transacting(t)
        .insert({
          league_id : v4(),
          league_name: req.body.leagueInfo.league_name,
          year_starting : 2017,
          year_ending : 2018,
          max_owners : req.body.leagueInfo.max_owners, 
          league_password: req.body.leagueInfo.league_password,
          total_enrolled: 1,
          private_ind: req.body.leagueInfo.privateInd,
        })
        .returning('*')
        .then((response) => {
          return knex.withSchema('fantasy').table("owners")
            .transacting(t)
            .insert({
              league_id: response[0].league_id,
              user_id: req.user.user_id,
              owner_id: v4(),
              owner_name:  req.body.leagueInfo.owner_name,
              commissioner: true
            })
            .then(()=>{
              return response[0]})
        })
        .then((response)=>{
          t.commit
          return response})
        .catch(t.rollback)
    })
    .then((response)=>{
      return response
    })
    .catch(function (err) {
      res.status(400).json(err);
    });
  })
  .catch((err) => {
    res.status(400).json(err);
  });
}

function handleErrors(req) {
  return new Promise((resolve, reject) => {
    let authError = new AuthError();
    if (req.body.leagueInfo.league_name.length < 5) {
      //authError.addError('signup','username','Username must be longer than six characters')
    }
    if (req.body.leagueInfo.league_password.length < 5) {
      //authError.addError('signup','password','Password must be longer than six characters')
    }
     if (authError.foundError) {
      reject({
        type: C.CREATE_LEAGUE_FAIL,
        error: new AuthError()
      });
    }
     else {
      var str = "select count(*) league_name from fantasy.leagues where league_name = '" + req.body.leagueInfo.league_name + "'" 
      knex.raw(str)
      .then(result =>
        {
          if (result.rows.length !== 1)
          {
            throw err
          }
          if (result.rows[0].league_name == 1) 
          {
            let a = 1;
            //authError.addError('signup','username','Username already exists. Please choose a different one')
          }
          if (authError.foundError) {
            reject({
              type: C.SIGNUP_FAIL,
              error: new AuthError()});
          }
          else
          {
            resolve();
          }
        })
    }
  });
}

const getLeague = (user_id, league_name, res) =>{
    var str = "select count(*) from fantasy.leagues a, fantasy.users b where a.league_name = '" + league_name +
    "' and a.league_id = b.league_id and user_id = '" + user_id + "'"; 

    var str = "select aa.*, bb.username, bb.user_id from fantasy.owners aa, users.users bb where aa.league_id in (" +
    "select distinct(a.league_id) from fantasy.leagues a, fantasy.owners b where a.league_name = '" + league_name +
    "' and b.user_id = '" + user_id +
    "') and bb.user_id = '" + user_id + "'"
    knex.raw(str)
    .then(result =>
      {
        if (result.rows.count > 0) 
        {
          var owners = []
          result.rows.map(owner => owners.push(
            {
              owner_name:owner.owner_name, 
              total_points:0,
              username:owner.username,
              user_id: onwer.user_id
            }))
          return handleReduxResponse(res,400, {
            type: C.CREATE_LEAGUE_SUCCESS,
            league_name : league_name,
            owners : owners
          })
        }
        else
        {
          return handleReduxResponse(res,400, {});
        }
      })
  }

module.exports = router;