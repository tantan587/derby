import { connect } from 'react-redux'
import { compose } from 'redux'
import LeagueView from '../ui/LeagueView'
import JoinALeague from '../ui/JoinALeague'
import JoinLeague from '../ui/JoinLeague'
import League from '../ui/League'
import CreateLeague from '../ui/CreateLeague'
import { findById } from '../../lib/array-helpers'
import { sortColors } from '../../lib/array-helpers'
import { clickedCreateLeague, clickedJoinLeague} from '../../actions/leagues-actions'

export const LeaguePage = connect(
    state =>
        ({
            teams : state.teams
        }),
    dispatch =>
    ({
    })
)(LeagueView)

export const CreateLeaguePage = connect(
    state =>
        ({
            user : state.user,
            activeLeague : state.activeLeague
        }),
        dispatch =>
        ({
            onCreateLeague(leagueInfo) {
                dispatch(clickedCreateLeague(leagueInfo))
            }
        })
)(CreateLeague)

export const JoinLeaguePage = connect(
    state =>
        ({
            user : state.user,
            activeLeague : state.activeLeague
        }),
        dispatch =>
        ({
            onJoinLeague(league_name, league_password, owner_name) {
                dispatch(clickedJoinLeague(league_name, league_password, owner_name))
            }
        })
)(JoinLeague)

export const JoinALeaguePage = connect(
    state =>
        ({
            //pass in state here
        }),
    dispatch =>
    ({
        //pass in function here
    })
)(JoinALeague)

export const MainLeaguePage = connect(
    state =>
        ({
            leagues : state.leagues,
            activeLeague : state.activeLeague
        }),
    dispatch =>
    ({
        //pass in function here
    })
)(League)


