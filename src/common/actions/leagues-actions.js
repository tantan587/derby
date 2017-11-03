import fetch from 'isomorphic-fetch'

const parseResponse = response => response.json()

const logError = error => console.error(error)

const fetchThenDispatch = (dispatch, url, method, body) =>
    fetch(url, {method, body, headers: { 'Content-Type': 'application/json' }})
        .then(parseResponse)
        .then(dispatch)
        .catch(logError)

export const clickedNFL = () => dispatch =>
    fetchThenDispatch(
        dispatch,
        '/api/nfl',
        'GET',
        JSON.stringify({})
    )

