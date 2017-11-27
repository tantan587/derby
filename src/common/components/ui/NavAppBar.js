import { Component } from 'react'
import PropTypes from 'prop-types'
import { NavLink as Link, Redirect, IndexLink } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {cyan500} from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import { List, ListItem } from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import '../../../stylesheets/Menu.scss'

const style = {
  title: {
    cursor: 'pointer'
  },
  barbuttons: {
    marginTop: '4px'
  }
};

const muiTheme = getMuiTheme({
  palette: {
    primaryTextColor: 'white'
  },
  appBar: {
    height: 50,
  },
});


export default class NavAppBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleTitleTouchTap = this.handleTitleTouchTap.bind(this);
    this.handleStandingsClick = this.handleStandingsClick.bind(this);
  }

  handleToggle() {
    this.setState({ open: !this.state.open });
  }

  handleStandingsClick() {
    const { onClickedStandings } = this.props
    this.handleToggle()
    onClickedStandings()
  }

  handleTitleTouchTap() {
      return (
        <Redirect to="/"/>
      ) // Navigate home
  }

  render() {
    return (
    <div>
        <MuiThemeProvider muiTheme={muiTheme}>
          <div>
          	<AppBar
              onLeftIconButtonTouchTap={this.handleToggle}
             	title={<span style={style.title}>Derby</span>}
              onTitleTouchTap={this.handleTitleTouchTap}
              iconElementRight={
              <div style={style.barbuttons}>
                <FlatButton 
                primary={true} 
                label="Sign Up"
                style={{color:'white'}}
                containerElement={<Link to="/signup" />}/>
                <FlatButton
                 primary={true} 
                 label={this.props.user.loggedIn ? "Log Out" : "Log In"} 
                 style={{color:'white'}}
                containerElement={<Link to={this.props.user.loggedIn ? "/logout" : "/login"} />}/>
              </div>
            }/>

          <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({ open })}>
          <List>
            <ListItem
              containerElement={<Link to="/" />}
              onClick={this.handleToggle}
              primaryText="Derby Home"/>
            <ListItem
              //containerElement={<Link to="/about" />}
              //onClick={this.handleToggle}
              primaryText="My Leagues"
              initiallyOpen={true}
              open={true}
              primaryTogglesNestedList={false}
              nestedItems={[
                <ListItem
                key={1}
                containerElement={<Link to="/joinleague" />}
                onClick={this.handleToggle}
                primaryText="Join A League"
              />]}/>  
            <ListItem
              containerElement={<Link to="/about" />}
              onClick={this.handleToggle}
              primaryText="About"/>
            <ListItem
              containerElement={<Link to="/faq" />}
              onClick={this.handleToggle}
              primaryText="FAQ"/>
            <ListItem
              containerElement={<Link to="/bug" />}
              onClick={this.handleToggle}
              primaryText="Report a Bug"/>
            <ListItem
              containerElement={<Link to="/contact" />}
              onClick={this.handleToggle}
              primaryText="Contact"/>
              <ListItem
              containerElement={<Link to="/standings/nba" />}
              onClick={this.handleStandingsClick}
              primaryText="Standings"/>
              <ListItem
              containerElement={<Link to="/joinleague" />}
              onClick={this.handleToggle}
              primaryText="Join A League"/>
          </List>
        </Drawer>
       	</div>
     	</MuiThemeProvider>
    </div>
    )
  }
}
    /*<nav className="menu">
        <Link to="/colormenu">Login</Link>
    </nav>*/

