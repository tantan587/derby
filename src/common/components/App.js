import { Route, Switch } from 'react-router-dom'
import Menu from './ui/Menu'
import Whoops404 from './ui/Whoops404'
import { NavBar, HomePage, SignupPage, LoginPage, LogoutPage, Colors, Color, NewColor, CreateLeaguePage } from './containers/home-containers'
import { LeaguePage, JoinALeaguePage } from './containers/leagues-containers'
import { connect } from 'react-redux'
import { userIsAuthenticatedRedir, userIsNotAuthenticatedRedir, userIsAdminRedir,
         userIsAuthenticated, userIsNotAuthenticated } from '../auth'

const Login = userIsNotAuthenticatedRedir(LoginPage)
const CreateLeague = userIsAuthenticatedRedir(CreateLeaguePage)
const Logout = userIsAuthenticatedRedir(LogoutPage)

const App = () => 
        <div>
        <NavBar/>
        <Switch>
            <Route exact path="/" component={HomePage}/>
            <Route path="/login/" component={Login}/>
            <Route path="/logout/" component={Logout}/>
            <Route path="/signup/" component={SignupPage}/>
            <Route path="/standings/nba/" component={LeaguePage}/>
            <Route path="/joinleague/" component={JoinALeaguePage}/>
            <Route path="/createleague/" component={CreateLeaguePage}/>
            <Route exact path="/colormenu/:id" component={Color} />
            <Route path="/colormenu/"
                component={({match, location}) => (
                    <div className="app">
                        <Menu sort={location.pathname.replace('/colormenu/sort/', '')} />
                        <NewColor />
                        <Switch>
                            <Route exact path="/colormenu/" component={Colors} />
                            <Route path="/colormenu/sort/:sort" component={Colors} />
                        </Switch>
                    </div>
                )} />
            <Route component={Whoops404} />
        </Switch>
        </div>


export default App
