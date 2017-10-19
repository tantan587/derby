import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import fs from 'fs'
import { Provider } from 'react-redux'
import { compose } from 'redux'
import { StaticRouter } from 'react-router-dom'
import { renderToString } from 'react-dom/server'
import api from './derby-api'
import App from '../common/components/App'
import storeFactory from '../common/store'
import initialState from '../data/initialState.json'

const staticCSS = fs.readFileSync(path.join(__dirname, '../../assets/bundle.css'))
const fileAssets = express.static(path.join(__dirname, '../../assets'))

const serverStore = storeFactory(true, initialState)


serverStore.subscribe(() =>
    fs.writeFile(
        path.join(__dirname, '../data/initialState.json'),
        JSON.stringify(serverStore.getState()),
        error => (error) ? console.log("Error saving state!", error) : null
    )
)

const buildHTMLPage = ({html, state, css}) => `
<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="minimum-scale=1.0, width=device-width, maximum-scale=1.0, user-scalable=no" />
        <meta charset="utf-8">
        <link rel="icon" href="./favicon.ico" type="image/x-icon" />
        <title>Derby</title>
        <style>${staticCSS}</style>
    </head>
    <body>
        <div id="react-container">${html}</div>
        <script>
            window.__INITIAL_STATE__ = ${JSON.stringify(state)}
        </script>
        <script src="/bundle.js"></script>
    </body>
</html>
`

const renderComponentsToHTML = ({url, store}) =>
    ({
        state: store.getState(),
        html: renderToString(
            <Provider store={store}>
                <StaticRouter location={url} context={{}}>
                    <App />
                </StaticRouter>
            </Provider>
        )
    })

const makeClientStoreFrom = store => url =>
    ({
        url,
        store: storeFactory(false, store.getState())
    })

const htmlResponse = compose(
    buildHTMLPage,
    renderComponentsToHTML,
    makeClientStoreFrom(serverStore)
)

const respond = ({url}, res) =>
    res.status(200).send(
      htmlResponse(url)
    )

const logger = (req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`)
    next()
}

const addStoreToRequestPipeline = (req, res, next) => {
    req.store = serverStore
    next()
}

export default express()
    .use(bodyParser.json())
    .use(logger)
    .use(fileAssets)
    .use(addStoreToRequestPipeline)
    .use('/api', api)
    .use(respond)