import { Component } from 'react'
import PropTypes from 'prop-types'
import { NavLink as Link, Redirect } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import '../../../stylesheets/Menu.scss'

const style = {
signupText: {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    color: 'black',
    paddingTop: '30px'
  },
  signupTitle: {
    fontSize: '50px'
  },
  signupBoard: {
	position: 'absolute',
  	top: '50%',
  	left: '50%',
  	margin: '-300px 0 0 -120px',
	},

  sumbitButton: {
	position: 'absolute',
  	top: '50%',
  	left: '50%',
  	margin: '70px 0 0 -50px',
	}
}

class Signup extends Component {

    constructor(props) {
        super(props)
        this.submit = this.submit.bind(this)
        this.state={
        	username:'',
        	password:'',
        	first_name:'',
        	last_name:'',
        	email:'',
        }
    }

    submit(e) {
        const { onSignup } = this.props
        e.preventDefault()
        onSignup(this.state.username,
         this.state.first_name,
          this.state.last_name,
          this.state.email, 
          this.state.password )
    }

    keypress(e) {
    	if (e.key === 'Enter') { 
        	const { onSignup } = this.props
        	e.preventDefault()
        	onSignup(this.state.username,
         		this.state.first_name,
	          	this.state.last_name,
	          	this.state.email, 
	          	this.state.password)
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
				<div style={style.signupText}>
			        <h1 style={style.signupTitle}>Sign Up</h1>
		        </div>
		        <MuiThemeProvider>
		        	<div>
			          	<div style={style.signupBoard}>
			             	<TextField
				             hintText="Enter a Username"
				             floatingLabelText="Username"
				             onChange = {(event,newValue) => this.setState({username:newValue})}
				             />
				            <br/> 
				       		<TextField
				             hintText="Enter your First Name"
				             floatingLabelText="First Name"
				             onChange = {(event,newValue) => this.setState({first_name:newValue})}
				             />
				           <br/>
				           <TextField
				             hintText="Enter your Last Name"
				             floatingLabelText="Last Name"
				             onChange = {(event,newValue) => this.setState({last_name:newValue})}
				             />
				           <br/>
				           <TextField
				             hintText="Enter your Email"
				             type="email"
				             floatingLabelText="Email"
				             onChange = {(event,newValue) => this.setState({email:newValue})}
				             />
				           <br/>
				           <TextField
				             type = "password"
				             hintText="Enter your Password"
				             floatingLabelText="Password"
				             onChange = {(event,newValue) => this.setState({password:newValue})}
				             />
				           <br/>
		           		</div>
		           		<div style={style.sumbitButton}>
			 			<RaisedButton 
			     			label="Submit" 
			     			primary={true} 
			             		/*style={style}*/
		         		 	onClick={(event) => this.submit(event)}/>
			         	</div>
         			</div>
	     		</MuiThemeProvider>
	  		</div>
	  )
    }
}

export default Signup
