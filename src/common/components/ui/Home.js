import { Component } from 'react'
import PropTypes from 'prop-types'
import { NavLink as Link} from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import '../../../stylesheets/Menu.scss'
import heroImage from '../../../images/derbyhome.png';

const style = {
  hero: {
    backgroundImage: `url("/src/images/derbyhome.png")`,
    //backgroundImage: url("/src/images/derbyhome.png"),
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    minHeight: '600px',
    backgroundPosition: 'center',
    backgroundSize: 'cover'
  },
  heroText: {
    position: 'absolute',
    top: '0px',
    left: '0px',
    height: '600px',
    width: '100%',
    textAlign: 'center',
    color: 'white',
    paddingTop: '280px'
  },
  heroTitle: {
    fontSize: '50px'
  },
  divideTwo: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  compareItem: {
    textAlign: 'center',
    marginTop: '-1000px',
    marginBottom: '50px'
  },

}
//style={{width: 500, height: 200}}
//<img src='/src/images/derbyhome.png'/>
const Home = ({user={}}) =>
  <MuiThemeProvider>
    <div>
      <div style={style.hero}>
      </div>
      <div style={style.heroText}>
        <h1 style={style.heroTitle}>Derby</h1>
        <h2>Wins Fantasy League for all Sports</h2>
      </div>
      <div style={style.divideTwo}>
          <div style={style.compareItem}>
            <RaisedButton 
              label="Sign Up" 
              primary={true} 
              //style={styles}
              containerElement={<Link to="/signup" />}/>
          </div>
          <div style={style.compareItem}>
            <RaisedButton 
              label= {user.loggedIn ? "Log Out" : "Log In"} 
              primary={true} 
              //style={styles}
              containerElement={<Link to={user.loggedIn ? "/logout" : "/login"} />}/>
          </div>
        </div>
    </div>
  </MuiThemeProvider>
    
    /*<nav className="menu">
        <Link to="/colormenu">Login</Link>
    </nav>*/
export default Home

