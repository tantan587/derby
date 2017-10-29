import { Component } from 'react'
import PropTypes from 'prop-types'
import { NavLink as Link } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import '../../../stylesheets/Menu.scss'

class Signup extends Component {

    constructor(props) {
        super(props)
        this.submit = this.submit.bind(this)
        this.state={
        	username:'',
        	password:'',
        	firstname:'',
        	lastname:'',
        	email:'',
        }
    }

    submit(e) {
        const { onSignup } = this.props
        e.preventDefault()
        onSignup(this.state.username,
         this.state.firstname,
          this.state.lastname,
          this.state.email, 
          this.state.password )
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
		             	title="Signup"/>
	             	<TextField
		             hintText="Enter a Username"
		             floatingLabelText="Username"
		             onChange = {(event,newValue) => this.setState({username:newValue})}
		             />
		            <br/> 
		       		<TextField
		             hintText="Enter your First Name"
		             floatingLabelText="First Name"
		             onChange = {(event,newValue) => this.setState({firstname:newValue})}
		             />
		           <br/>
		           <TextField
		             hintText="Enter your Last Name"
		             floatingLabelText="Last Name"
		             onChange = {(event,newValue) => this.setState({lastname:newValue})}
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

export default Signup
