import { connect } from 'react-redux'
import { compose } from 'redux'
import LeagueView from '../ui/LeagueView'
import JoinALeague from '../ui/JoinALeague'
import CreateLeague from '../ui/CreateLeague'
import { findById } from '../../lib/array-helpers'
import { sortColors } from '../../lib/array-helpers'
import { clickedCreateLeague} from '../../actions/leagues-actions'

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
            user : state.user
        }),
        dispatch =>
        ({
            onCreateLeague(leagueInfo) {
                dispatch(clickedCreateLeague(leagueInfo))
            }
        })
)(CreateLeague)

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


