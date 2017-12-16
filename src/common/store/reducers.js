import C from '../constants'
import ErrorText from '../models/ErrorText'


export const user = (state = {}, action={ type: null }) => {
    switch(action.type)
    {
        case C.SIGNUP_SUCCESS:
        case C.LOGIN_SUCCESS:
        return {
                id: action.id,
                first_name: action.first_name,
                last_name: action.last_name,
                username: action.username,
                loggedIn: true,
                error: new ErrorText()
            }
        case C.SIGNUP_FAIL:
        case C.LOGIN_FAIL:
            return {
                id: "",
                first_name: "",
                last_name: "",
                username: "",
                loggedIn: false,
                error: action.error
            }
        case C.LOGOUT:
        return {
                id: "",
                first_name: "",
                last_name: "",
                username: "",
                loggedIn: false,
                error: new ErrorText()
            }
        case C.CREATE_LEAGUE_FAIL:
        case C.JOIN_LEAGUE_FAIL:
        return {
            ...state,
            error : action.error
        }
        default :
            return state    
    }
}

export const leagues = (state = [], action={ type: null }) => {
    switch (action.type){
        case C.CREATE_LEAGUE_SUCCESS:
        case C.JOIN_LEAGUE_SUCCESS:
            return [
                ...state,
                simpleLeague(action)
            ]
        case C.LOGIN_SUCCESS:
            return action.leagues
        default :
            return state;
    }
}

export const simpleLeague = (action) => {
    return {
        league_id : action.league_id,
        league_name : action.league_name
    }
}

export const activeLeague = (state = {}, action={ type: null }) => {
    switch (action.type){
        case C.CREATE_LEAGUE_SUCCESS:
        case C.JOIN_LEAGUE_SUCCESS:
        case C.CLICKED_LEAGUE:
            return {
                success : true,
                league_id : action.league_id,
                league_name : action.league_name,
                total_players : action.owners.length,
                max_owners : action.max_owners,
                owners : action.owners
            }
        case C.LOGOUT:
            return {
                success : false,
            }
        default:
                return state

    }  
}

export const teams = (state = [], action={ type: null }) => {
    switch(action.type)
    {
        case C.GET_TEAMS:
            console.log(action.teams)
            var rtnTeams = [];
            action.teams.map(x => rtnTeams.push({
                team: x.team,
                wins: x.wins,
                losses: x.losses,
                ties: x.ties
                }))
            return rtnTeams
        default :
            return state 
    }
}

export const color = (state = {}, action={ type: null }) => {
    switch (action.type) {
        case C.ADD_COLOR:
            return {
                id: action.id,
                title: action.title,
                color: action.color,
                timestamp: action.timestamp,
                rating: 0
            }
        case C.RATE_COLOR:
            return (state.id !== action.id) ? state :
            {
                ...state,
                rating: action.rating
            }
        default :
            return state
    }
}

export const colors = (state = [], action={ type: null }) => {
    switch (action.type) {
        case C.ADD_COLOR :
            return [
                ...state,
                color({}, action)
            ]
        case C.RATE_COLOR :
            return state.map(
                c => color(c, action)
            )
        case C.REMOVE_COLOR :
            return state.filter(
                c => c.id !== action.id
            )
        default:
            return state
    }
}