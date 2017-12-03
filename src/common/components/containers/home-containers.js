import { connect } from 'react-redux'
import { compose } from 'redux'
import ColorList from '../ui/ColorList'
import ColorDetails from '../ui/ColorDetails'
import NavAppBar from '../ui/NavAppBar'
import Login from '../ui/Login'
import Signup from '../ui/Signup'
import Home from '../ui/Home'
import Logout from '../ui/Logout'
import CreateLeague from '../ui/CreateLeague'
import AddColorForm from '../ui/AddColorForm'
import { addColor, rateColor, removeColor,clickedLogin, clickedSignup, clickedLogout} from '../../actions/auth-actions'
import { clickedStandings} from '../../actions/leagues-actions'
import { findById } from '../../lib/array-helpers'
import { sortColors } from '../../lib/array-helpers'

export const NavBar = connect(
    state =>
    ({
        user : state.user
    }),
    dispatch =>
        ({
            onClickedStandings() {
                dispatch(clickedStandings())
            }
        })
)(NavAppBar)

export const HomePage = connect(
    state =>
        ({
            user : state.user
        }),
    dispatch =>
        ({
        })
)(Home)

export const LoginPage = connect(
    state =>
        ({
            user : state.user
        }),
    dispatch =>
        ({
            onLogin(username, password) {
                dispatch(clickedLogin(username,password))
            }
        })
)(Login)

export const LogoutPage = connect(
    null,
    dispatch =>
        ({
            onLogout() {
                dispatch(clickedLogout())
            }
        })
)(Logout)

export const SignupPage = connect(
    state =>
        ({
            user : state.user
        }),
    dispatch =>
        ({
            onSignup(username,first_name,last_name,email,password) {
                dispatch(clickedSignup(username,first_name,last_name,email,password))
            }
        })
)(Signup)

export const CreateLeaguePage = connect(
    state =>
        ({
            user : state.user
        }),
    dispatch =>
    ({
        //pass in function here
    })
)(CreateLeague)

export const NewColor = connect(
    null,
    dispatch =>
        ({
            onNewColor(title, color) {
                dispatch(addColor(title, color))
            }
        })
)(AddColorForm)

export const Colors = connect(
    ({colors}, {match}) =>
        ({
            colors: sortColors(colors, match.params.sort)
        }),
    dispatch =>
        ({
            onRemove(id) {
                dispatch(removeColor(id))
            },
            onRate(id, rating) {
                dispatch(rateColor(id, rating))
            }
        })
)(ColorList)

export const Color = connect(
    ({ colors }, { match }) =>
        ({
            ...findById(colors, match.params.id)
        })
)(ColorDetails)
