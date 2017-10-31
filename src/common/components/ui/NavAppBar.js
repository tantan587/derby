import { Component } from 'react'
import PropTypes from 'prop-types'
import { NavLink as Link, Redirect, IndexLink } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import { List, ListItem } from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import '../../../stylesheets/Menu.scss'

const style = {
  title: {
    cursor: 'pointer'
  }
};

export default class NavAppBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleTitleTouchTap = this.handleTitleTouchTap.bind(this);
  }

  handleToggle() {
    this.setState({ open: !this.state.open });
  }

  handleTitleTouchTap() {
      return (
        <Redirect to="/"/>
      ) // Navigate home
  }

  render() {
    return (
    <div>
        <MuiThemeProvider>
          <div>
          	<AppBar
              onLeftIconButtonTouchTap={this.handleToggle}
             	title={<span style={style.title}>Derby</span>}
              onTitleTouchTap={this.handleTitleTouchTap}/>

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

