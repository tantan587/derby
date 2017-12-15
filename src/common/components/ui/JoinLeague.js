import { Component } from 'react'
import PropTypes from 'prop-types'
import { NavLink as Link, Redirect } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Card, CardText } from 'material-ui/Card';

const style = {
text: {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    color: 'black',
	paddingTop: '30px',
	fontSize: '50px'
  },
  board: {
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

class JoinLeague extends Component {

    constructor(props) {
        super(props)
		this.submit = this.submit.bind(this)
		this.keypress = this.keypress.bind(this)
        this.state={
        	league_name:'',
			league_password:'',
			owner_name:'',
        }
    }

    submit(e) {
        const { onJoinLeague } = this.props
        e.preventDefault()
        onJoinLeague(this.state.league_name, this.state.league_password,this.state.owner_name)
    }

    keypress(e) {
    	if (e.key === 'Enter') { 
        	const { onJoinLeague } = this.props
        	e.preventDefault()
        	onJoinLeague(this.state.league_name, this.state.league_password,this.state.owner_name)
    	}
    }

	render() 
	{
		if(this.props.activeLeague.success === true){
			return (<Redirect to={'/mainleague'}></Redirect>)
		}
		else{
        return (
		<div onKeyPress={(event) => this.keypress(event)}>
			<MuiThemeProvider>
				<div>
					<Card>
						<h1 style={style.text}>Join League</h1>
						<div style={style.board}>
			       		<TextField
			         		hintText="Enter League Name"
			         		floatingLabelText="League Name"
							errorText={this.props.user.error.league_name || ""}
			         		onChange = {(event,newValue) => this.setState({league_name:newValue})}/>
			           	<br/>
			         	<TextField
			           		hintText="Enter League Password"
			           		floatingLabelText="League Password"
							errorText={this.props.user.error.league_password || ""}
			           		onChange = {(event,newValue) => this.setState({league_password:newValue})}/>
						<br/>
						<TextField
			           		hintText="Enter Your Owner Name"
			           		floatingLabelText="Your Owner Name"
							errorText={this.props.user.error.owner_name || ""}
			           		onChange = {(event,newValue) => this.setState({owner_name:newValue})}/>
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
}


export default JoinLeague
