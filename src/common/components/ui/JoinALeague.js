import {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import { NavLink as Link} from 'react-router-dom'
import '../../../stylesheets/Menu.scss'

const style = {
  compareItem: {
    textAlign: 'center',
    marginTop: '-1000px',
    marginBottom: '50px'
  },
  propToggleHeader: {
    margin: '20px auto 10px',
  },
  heroTitle: {
    fontSize: '35px'
  },
  heroText: {
    position: 'absolute',
    top: '0px',
    left: '0px',
    height: '600px',
    width: '100%',
    textAlign: 'center',
    color: 'black',
    paddingTop: '80px'
  },
    draftText: {
    position: 'absolute',
    top: '0px',
    left: '0px',
    height: '500px',
    width: '80%',
    textAlign: 'center',
    color: 'black',
    paddingTop: '110px'
  },
    draftTitle: {
    fontSize: '15px'
  },
    divideTwo: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'left',
    flexWrap: 'wrap',
    marginTop:'400px',
    right:'160px'
  },
  placeButton: {
    position: 'absolute',
    top: '0px',
    left: '100px',
    //paddingTop: '10px'
  },
  placeButtonTwo: {
    position: 'absolute',
    top: '0px',
    right: '100px',
    //paddingTop: '10px'
  },
}

class JoinALeague extends Component {
    render() {
        return (
    <MuiThemeProvider>
    <div>
        <div style={style.heroText}>
        <h1 style={style.heroTitle}>Derby: Fantasy Wins League</h1>
        </div>
        <div style={style.draftText}>
        <h2 style={style.draftTitle}>Derby: Fantasy Wins League is a new type of league that has never been seen before. Instead of drafting players, you are drafting teams. Each team earns points based upon wins, and whoever earns the most points over the course of the season wins the race! 
Learn more about it here.</h2>
        </div>
        <div style={style.placeButton}>
        <div style={style.divideTwo}>
            <RaisedButton 
              label="Join a League" 
              primary={true} 
              //style={styles}
              containerElement={<Link to="/signup" />}/>
          </div>
          </div>
          <div style={style.placeButtonTwo}>
          <div style={style.divideTwo}>
            <RaisedButton 
              label="Create a League" 
              primary={true} 
              //style={styles}
              containerElement={<Link to="/signup" />}/>
          </div>
          </div>
    </div>
    </MuiThemeProvider>
    );
    }
}
    


export default JoinALeague