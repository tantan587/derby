var bcrypt = require('bcrypt-nodejs');
const knex = require('../db/connection');
import AuthError from "../../common/models/AuthError"
import C from '../../common/constants'
import { v4 } from 'uuid'

function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

function createUser(req, res) {
  return handleErrors(req)
  .then(() => {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(req.body.password, salt);
    return knex.withSchema('users').table('users')
    .insert({
      user_id : v4(),
      username: req.body.username,
      password: hash,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      admin: false
    })
    .returning('*');
  })
  .catch((err) => {
    res.status(400).json(err);
  });
}

function loginRequired(req, res, next) {
  if (!req.user) return res.status(401).json({status: 'Please log in'});
  return next();
}

// function adminRequired(req, res, next) {
//   if (!req.user) res.status(401).json({status: 'Please log in'});
//   return knex('users').where({username: req.user.username}).first()
//   .then((user) => {
//     if (!user.admin) res.status(401).json({status: 'You are not authorized'});
//     return next();
//   })
//   .catch((err) => {
//     res.status(500).json({status: 'Something bad happened'});
//   });
// }

function loginRedirect(req, res, next) {
  if (req.user) return res.status(401).json(
    {status: 'You are already logged in'});
  return next();
}

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function handleErrors(req) {
  return new Promise((resolve, reject) => {
    let foundError = false;
    let authError = new AuthError();
    if (req.body.username.length < 6) {
      authError.addError('signup','username','Username must be longer than six characters')
    }
    if (req.body.password.length < 6) {
      authError.addError('signup','password','Password must be longer than six characters')
    }
    if (validateEmail(req.body.email)=== false) {
      authError.addError('signup','email','Not proper email format')
    }
     if (authError.foundError) {
      reject({
        type: C.SIGNUP_FAIL,
        error: authError
      });
    }
     else {
      var str = "select (select count(*) from users.users where username = '" + req.body.username + "') username, " +
      "(select count(*) from users.users where email = '" + req.body.email +"') email"
      knex.raw(str)
      .then(result =>
        {
          if (result.rows.length !== 1)
          {
            throw err
          }
          if (result.rows[0].username == 1) 
          {
            authError.addError('signup','username','Username already exists. Please choose a different one')
          }
          if (result.rows[0].email == 1) 
          {
            authError.addError('signup','email','Email has already be registered. Please choose a different one')
          }
          if (authError.foundError) {
            reject({
              type: C.SIGNUP_FAIL,
              error: authError});
          }
          else
          {
            resolve();
          }
        })
    }
  });
}

module.exports = {
  comparePass,
  createUser,
  loginRequired,
  //adminRequired,
  loginRedirect
};