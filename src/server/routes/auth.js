const express = require('express');
const router = express.Router();
const authHelpers = require('../auth/_helpers');
const passport = require('../auth/local');
import C from '../../common/constants'
import ErrorText from "../../common/models/ErrorText"

router.post('/signup', authHelpers.loginRedirect, (req, res, next)  => {
  return authHelpers.createUser(req, res)
  .then((response) => {
    //need to check to make sure there is a reponse, else there was an error
    if (response)
    {
      passport.authenticate('local', (err, user, info) => {
        if (err || !user) { 
          handleResponse(res, 500, err); }
        if (user) { 
          req.login(user, function (err) {
            if (err) { handleResponse(res, 500, 'error'); }
            handleReduxResponse(res, 200, {
              type: C.SIGNUP_SUCCESS,
              id: user.user_id,
              last_name : user.last_name,
              first_name : user.first_name,
              username : user.username
              }); 
          });
        }
      })(req, res, next);
    }
  })
  .catch((err) => { 
    handleResponse(res, 500, 'error'); });
});

router.post('/login', authHelpers.loginRedirect, (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) { handleResponse(res, 500, 'error'); }
    if (!user) { 
      var errorText = new ErrorText();
      errorText.addError('login_password','Username / Password does not match')
      handleReduxResponse(res, 404, {
      type: C.LOGIN_FAIL,
      error: errorText
    }); }
    if (user) {
      req.login(user, function (err) {
        if (err) { handleResponse(res, 500, 'error'); }
        else{
          authHelpers.getUserLeagues(user, (user1,leagues) =>
          handleReduxResponse(res, 200, {
            type: C.LOGIN_SUCCESS,
            id: user1.user_id,
            last_name : user1.last_name,
            first_name : user1.first_name,
            username : user1.username,
            leagues : leagues
        })
      )
        }
      });
    }
  })(req, res, next);
});

router.post('/logout', authHelpers.loginRequired, (req, res, next) => {
  req.logout();
  handleReduxResponse(res, 200, {
    type: C.LOGOUT  });
});

// *** helpers *** //

function handleLogin(req, user) {
  return new Promise((resolve, reject) => {
    req.login(user, (err) => {
      if (err) reject(err);
      resolve();
    });
  });
}

function handleResponse(res, code, statusMsg) {
  res.status(code).json({status: statusMsg});
}

function handleReduxResponse(res, code, action)
{
  res.status(code).json(action);
}

module.exports = router;