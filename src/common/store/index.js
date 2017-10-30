import { createStore, combineReducers, applyMiddleware } from 'redux'
import { colors, user } from './reducers'
import thunk from 'redux-thunk'

const clientLogger = store => next => action => {
    if (action.type) {
        let result
        console.groupCollapsed("dispatching", action.type)
        console.log('prev state', store.getState())
        console.log('action', action)
        result = next(action)
        console.log('next state', store.getState())
        console.groupEnd()
        return result
    } else {
        return next(action)
    }
}

const serverLogger = store => next => action => {
    console.log('\n  dispatching server action\n')
    console.log(action)
    console.log('\n')
    //console.log('next state', store.getState())
    return next(action)
}

const middleware = server => [
    (server) ? serverLogger : clientLogger,
    thunk
]

const storeFactory = (server = false, initialState = {}) =>
    {
        return applyMiddleware(...middleware(server))(createStore)(
        combineReducers({colors, user}),
        initialState
        )
    }

export default storeFactory
