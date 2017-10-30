import { Component } from 'react'
import PropTypes from 'prop-types'
import { NavLink as Link, Redirect } from 'react-router-dom'
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

    keypress(e) {
    	if (e.key === 'Enter') { 
        	const { onLogin } = this.props
        	e.preventDefault()
        	onLogin(this.state.username, this.state.password)
    	}
    }

    render() {
    	var styles = {
		    tabLink : {
			    display:"flex",
			    alignItems:"center",
			    justifyContent:"center"
			}
		}
		if(this.props.user.loggedIn)
		{
			return (
				<Redirect to="/colormenu"/>
			)
		}
        return (
			<div onKeyPress={(event) => this.keypress(event)}>
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
         		 	<div>
         		 		{
         		 			(this.props.user.message !=="") ?
         		 			<p>{this.props.user.message}</p> :
         		 			<p></p>
         		 		}
         		 	</div>
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
