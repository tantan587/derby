import { Component } from 'react'
import PropTypes from 'prop-types'
import { NavLink as Link } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import '../../../stylesheets/Menu.scss'

class Login extends Component {

    constructor(props) {
        super(props)
        this.submit = this.submit.bind(this)
        this.state={
        	username:'',
        	password:''
        }
    }

    submit(e) {
        const { onLogin } = this.props
        e.preventDefault()
        onLogin(this.state.username, this.state.password)
    }

    render() {
    	var styles = {
		    tabLink : {
			    display:"flex",
			    alignItems:"center",
			    justifyContent:"center"
			}
		}
        return (
			<div>
		        <MuiThemeProvider>
		          <div>
		          	<AppBar
		             	title="Login"/>
		       		<TextField
		         		hintText="Enter your Username"
		         		floatingLabelText="Username"
		         		/*style={styles.tabLink}*/
		         		onChange = {(event,newValue) => this.setState({username:newValue})}/>
		           	<br/>
		         	<TextField
		           		type="password"
		           		hintText="Enter your Password"
		           		floatingLabelText="Password"
		           		onChange = {(event,newValue) => this.setState({password:newValue})}/>
		         	<br/>
		 			<RaisedButton 
		     			label="Submit" 
		     			primary={true} 
		             		/*style={style}*/
	         		 	onClick={(event) => this.submit(event)}/>
		         	</div>
		     	</MuiThemeProvider>
		  </div>
	  )
    }
}
    /*<nav className="menu">
        <Link to="/colormenu">Login</Link>
    </nav>*/


export default Login
