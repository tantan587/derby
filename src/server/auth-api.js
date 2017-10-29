import { Router } from 'express'
import C from '../common/constants'
import { v4 } from 'uuid'
require('dotenv').config()
var bcrypt = require('bcrypt-nodejs');

var knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL,
  searchPath: 'knex,users'
});

//going to used for transactions
//var Promise = require('bluebird')


const router = Router()

const dispatchAndRespond = (req, res, action) => {
    req.store.dispatch(action)
    res.status(200).json(action)
}

const generateHash = password =>
{
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

const validPassword = (password,hash) =>
{
    return bcrypt.compareSync(password, hash);
}

router.post("/signup", (req, res) =>
    {
        knex('passwords')
        .select()
        .where('username', req.body.username)
        .then(result =>
        {
            if (result.length > 0) 
            {
                dispatchAndRespond(req, res, {
                type: C.SIGNUP_FAIL,
                id: v4(),
                lastName : req.body.lastname,
                firstName : req.body.firstname,
                userName : req.body.username
                })
            }
            else
            {
                knex('passwords')
                .insert({username: req.body.username, password: generateHash(req.body.password)})
                .then(insertResult =>
                {
                    dispatchAndRespond(req, res, {
                    type: C.SIGNUP_SUCCESS,
                    id: v4(),
                    lastName : req.body.lastname,
                    firstName : req.body.firstname,
                    userName : req.body.username
                    })
                })
            }
        })
    }
)

router.post("/login", (req, res) =>
    {
        knex('passwords')
        .select('password')
        .where('username', req.body.username)
        .then(result =>
        {
            if (result.length !== 1) 
            {
                dispatchAndRespond(req, res, {
                type: C.LOGIN_FAIL_USERNAME
                })
            }
            else
            {
                if(validPassword(req.body.password, result[0].password))
                {
                    dispatchAndRespond(req, res, {
                    type: C.LOGIN_SUCCESS
                    })
                }
                else
                {
                   dispatchAndRespond(req, res, {
                    type: C.LOGIN_FAIL_PASSWORD
                    }) 
                }
                
            }
        })
    }
)

/*router.post("/signup", (req, res) =>
    dispatchAndRespond(req, res, {
        type: C.SIGNUP_SUCCESS,
        id: v4(),
        lastName : req.body.lastName,
        firstName : req.body.firstName,
        userName : req.body.userName
    })
)*/

export default router
