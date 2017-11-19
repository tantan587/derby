import { connect } from 'react-redux'
import { compose } from 'redux'
import LeagueView from '../ui/LeagueView'
import JoinALeague from '../ui/JoinALeague'
import { findById } from '../../lib/array-helpers'
import { sortColors } from '../../lib/array-helpers'

export const LeaguePage = connect(
    state =>
        ({
            teams : state.teams
        }),
    dispatch =>
    ({
    })
)(LeagueView)

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


