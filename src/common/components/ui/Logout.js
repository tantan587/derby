import PropTypes from 'prop-types'
import { NavLink as Link } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import '../../../stylesheets/Menu.scss'

const Logout = ({user={}, onLogout=f=>f}) =>
	<div>
        <MuiThemeProvider>
          <div>
          	<AppBar
             	title="Do you want to Log out?"/>
     			<RaisedButton 
         			label="Yes" 
         			primary={true} 
                 		/*style={style}*/
              containerElement={<Link to="/" />}
       		    onClick={() => onLogout()}/>
          <RaisedButton 
              label= "No" 
              primary={true} 
                    /*style={style}*/
              containerElement={<Link to="/" />}/>
         	</div>
     	</MuiThemeProvider>
  </div>
    /*<nav className="menu">
        <Link to="/colormenu">Login</Link>
    </nav>*/


export default Logout
