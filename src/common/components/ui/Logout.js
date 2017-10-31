import PropTypes from 'prop-types'
import { NavLink as Link } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import '../../../stylesheets/Menu.scss'

const style = {
  loginText: {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    color: 'black',
    paddingTop: '-100px'
  },
  loginTitle: {
    fontSize: '50px'
  },
  divideTwo: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
    textAlign: 'center',
    marginTop: '120px',
  },
  compareItemLeft: {
    marginLeft: '120px',
  },
  compareItemRight: {
    marginRight: '120px',
  }
}

const Logout = ({user={}, onLogout=f=>f}) =>
    <div>
      <div style={style.loginText}>
          <h1 style={style.loginTitle}>Log out?</h1>
      </div >
      <MuiThemeProvider>
        <div style={style.divideTwo}>
          <div style={style.compareItemLeft}>
       			<RaisedButton 
           			label="Yes" 
           			primary={true} 
                   		/*style={style}*/
                containerElement={<Link to="/" />}
         		    onClick={() => onLogout()}/>
          </div>
          <div style={style.compareItemRight}>
            <RaisedButton 
                label= "No" 
                primary={true} 
                      /*style={style}*/
                containerElement={<Link to="/" />}/>
          </div>
       	</div>
   	</MuiThemeProvider>
  </div>
    /*<nav className="menu">
        <Link to="/colormenu">Login</Link>
    </nav>*/


export default Logout
