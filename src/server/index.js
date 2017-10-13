'use strict';
const express = require('express');
const path = require('path');
const generatePassword = require('password-generator');
var {Pool, Client} = require('pg');
var dotenv = require('dotenv');
import React from 'react'
import { renderToString} from 'react-dom/server'
import Menu from '../common/components/Menu'
import data from '../assets/recipes.json'

dotenv.load();
global.React = React

const html = renderToString(<Menu recipes={data}/>)

const logger = (req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`)
    next()
}

const sendHTMLPage = (req, res) =>
    res.status(200).send(`
<!DOCTYPE html>
<html>
    <head>
        <title>React Recipes App</title>
    </head>
    <body>
        <div id="react-container">${html}</div>
        <script>
            window.__DATA__ = ${JSON.stringify(data)}
        </script>
        <script src="bundle.js"></script>
    </body>
</html>
    `)

const app = express()
    .use(logger)
    .use(express.static('./assets'))
    .use(sendHTMLPage)

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Password generator listening on ${port}`);