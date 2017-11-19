import C from '../constants'


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
                message: ""
            }
        case C.SIGNUP_FAIL:
        case C.LOGIN_FAIL_USERNAME:
        case C.LOGIN_FAIL_PASSWORD:
            return {
                id: "",
                first_name: "",
                last_name: "",
                username: "",
                loggedIn: false,
                message: action.message
            }
        case C.LOGOUT:
        return {
                id: "",
                first_name: "",
                last_name: "",
                username: "",
                loggedIn: false,
                message: ""
            }
        default :
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