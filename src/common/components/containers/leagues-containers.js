import { connect } from 'react-redux'
import { compose } from 'redux'
import LeagueView from '../ui/LeagueView'
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


