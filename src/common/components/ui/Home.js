import PropTypes from 'prop-types'
import { NavLink as Link } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import '../../../stylesheets/Menu.scss'

const Home = () =>
	<div>
        <MuiThemeProvider>
          <div>
          	<AppBar
             	title="Welcome To Derby"/>
     			<RaisedButton 
         			label="Sign Up" 
         			primary={true} 
                 		/*style={style}*/
             		 containerElement={<Link to="/signup" />}/>
          <RaisedButton 
              label="Log In" 
              primary={true} 
                    /*style={style}*/
              containerElement={<Link to="/login" />}/>
         	</div>
     	</MuiThemeProvider>
  </div>
    /*<nav className="menu">
        <Link to="/colormenu">Login</Link>
    </nav>*/


export default Home
