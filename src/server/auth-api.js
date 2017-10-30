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
    //req.store.dispatch(action)
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

router.post("/logout", (req, res) =>
    dispatchAndRespond(req, res, {
        type: C.LOGOUT
    })
)

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
                message: "Username already exists, choose another one"
                })
            }
            else
            {
                var id = v4();
                knex('passwords')
                .insert({username: req.body.username, password: generateHash(req.body.password)})
                .then(insert1Result =>
                {
                    knex('information')
                    .insert({
                        id: id,
                        username: req.body.username,
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        email: req.body.email})
                    .then(insert2Result =>
                    {
                        dispatchAndRespond(req, res, {
                        type: C.SIGNUP_SUCCESS,
                        id: id,
                        last_name : req.body.last_name,
                        first_name : req.body.first_name,
                        username : req.body.username
                        })
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
                type: C.LOGIN_FAIL_USERNAME,
                message: "Can not find your username"
                })
            }
            else
            {
                if(validPassword(req.body.password, result[0].password))
                {
                    knex('information')
                    .select()
                    .where('username', req.body.username)
                    .then(infoResult =>
                    {
                        dispatchAndRespond(req, res, {
                            type: C.LOGIN_SUCCESS,
                            id: infoResult[0].id,
                            last_name : infoResult[0].last_name,
                            first_name : infoResult[0].first_name,
                            userName : infoResult[0].username
                        })
                    })
                }
                else
                {
                   dispatchAndRespond(req, res, {
                    type: C.LOGIN_FAIL_PASSWORD,
                    message: "Username / Password does not match"
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
        last_name : req.body.last_name,
        first_name : req.body.first_name,
        userName : req.body.userName
    })
)*/

export default router
