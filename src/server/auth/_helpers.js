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

function handleErrors(req) {
  return new Promise((resolve, reject) => {
    if (req.body.username.length < 6) {
      reject({
        type: C.SIGNUP_FAIL,
        error: new AuthError("signup", "username","Username must be loner than six characters")
      });
    }
    else if (req.body.password.length < 6) {
      reject({
        type: C.SIGNUP_FAIL,
        error: new AuthError("signup", "password",'Password must be longer than 6 characters')
      });
    } else {
      resolve();
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