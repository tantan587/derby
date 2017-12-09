import { Component } from 'react'
import PropTypes from 'prop-types'
import { NavLink as Link, Redirect } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Card, CardText } from 'material-ui/Card';

const style = {
loginText: {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    color: 'black',
	paddingTop: '30px',
	fontSize: '50px'
  },
  loginBoard: {
	position: 'absolute',
  	top: '50%',
  	left: '50%',
  	margin: '-300px 0 0 -120px',
	},

  submitButton: {
	position: 'absolute',
  	left: '50%',
  	margin: '0px 0 0 -50px',
	}
}

class Login extends Component {

    constructor(props) {
        super(props)
		this.submit = this.submit.bind(this)
		this.keypress = this.keypress.bind(this)
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
        return (
		<div onKeyPress={(event) => this.keypress(event)}>
			<MuiThemeProvider>
				<div>
					<Card>
						<h1 style={style.loginText}>Log In</h1>
						<div style={style.loginBoard}>
			       		<TextField
			         		hintText="Enter your Username"
			         		floatingLabelText="Username"
							errorText={this.props.user.error.login.username || ""}
			         		onChange = {(event,newValue) => this.setState({username:newValue})}/>
			           	<br/>
			         	<TextField
			           		type="password"
			           		hintText="Enter your Password"
			           		floatingLabelText="Password"
							errorText={this.props.user.error.login.password || ""}
			           		onChange = {(event,newValue) => this.setState({password:newValue})}/>
						<CardText>Don't have an account? <Link to={'/signup'}>Sign up</Link></CardText>
						<br/>
						 <RaisedButton 
			     			label="Submit"
							style={style.submitButton} 
			     			primary={true} 
		         		 	onClick={(event) => this.submit(event)}/>
						</div>
					</Card>
				</div>
			</MuiThemeProvider>
		</div>
	  )
    }
}


export default Login
