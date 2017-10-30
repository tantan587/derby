import { Route, Switch } from 'react-router-dom'
import Menu from './ui/Menu'
import Whoops404 from './ui/Whoops404'
import { HomePage, SignupPage, LoginPage, LogoutPage, Colors, Color, NewColor } from './containers'
import '../../stylesheets/APP.scss'

const App = () =>
    <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route path="/login/" component={LoginPage}/>
        <Route path="/logout/" component={LogoutPage}/>
        <Route path="/signup/" component={SignupPage}/>
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

export default App
