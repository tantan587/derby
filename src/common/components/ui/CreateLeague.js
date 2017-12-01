import { Component } from 'react'
import PropTypes from 'prop-types'
import { NavLink as Link, Redirect } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import '../../../stylesheets/Menu.scss'
import Divider from 'material-ui/Divider'

const style = {
loginText: {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    color: 'black',
    paddingTop: '30px'
  },
  loginTitle: {
    fontSize: '50px'
  },
  loginBoard: {
	position: 'absolute',
  	top: '50%',
  	left: '50%',
  	margin: '-300px 0 0 -120px',
	},

  sumbitButton: {
	position: 'absolute',
  	top: '50%',
  	left: '50%',
  	margin: '260px 0 0 -70px',
	},
  block: {
		maxWidth: 250,
	  },
	checkbox: {
		marginTop: 30,
		marginBottom: 15
	  },
	checkbox2: {
		marginBottom: 16,
		width: 'auto'
	  },
}

class CreateLeague extends Component {

    constructor(props) {
        super(props)
		this.pressSubmit = this.pressSubmit.bind(this)
		this.keypress = this.keypress.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.onNumPlayersChange = this.onNumPlayersChange.bind(this)
		this.updateEPLCheck = this.updateEPLCheck.bind(this)
        this.state={
        	leauge_name:'',
			leauge_password:'',
			EPL:false,
			numPlayers:0,
			numPlayerError:false
        }
	}

	onNumPlayersChange(e){
		const n = e.target.value 
		if ((n > 7 && n < 16) || n === "") {
		   this.setState({numPlayers: e.target.value})
		}
		else {this.setState({numPlayers: 0})}
	 }
	
	updateEPLCheck() {
			this.setState({ EPL: !this.state.EPL });
		  }

	handleSubmit(e)
	{
		if(this.state.numPlayers > 7 && this.state.numPlayers < 16)
		{
			this.setState({ numPlayerError:false })
			const { onLogin } = this.props
			e.preventDefault()
			alert("Good")
			//onLogin(this.state.leauge_name, this.state.leauge_password)
		}
		else
		{	
			this.setState({ numPlayerError:true })
		}
	}

    pressSubmit(e) {
        this.handleSubmit(e)
	}

    keypress(e) {
    	if (e.key === 'Enter') { 
        	handleSubmit(e)
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
		// if(this.props.user.loggedIn)
		// {
		// 	return (
		// 		<Redirect to="/colormenu"/>
		// 	)
		// }
        return (
		<div onKeyPress={(event) => this.keypress(event)}>
			<div style={style.loginText}>
			        <h1 style={style.loginTitle}>Create A League</h1>
	        </div>
	        <MuiThemeProvider>
	          	<div>
		          	<div style={style.loginBoard}>
			       		<TextField
			         		hintText="Enter League Name"
			         		floatingLabelText="League Name"
							 hintStyle={{textAlign: 'center' }}
			         		/*style={styles.tabLink}*/
			         		onChange = {(event,newValue) => this.setState({username:newValue})}/>
			           	<br/>
			         	<TextField
			           		hintText="Enter League Password"
			           		floatingLabelText="League Password"
			           		onChange = {(event,newValue) => this.setState({password:newValue})}/>
						<br/>
						<TextField
			           		hintText="(8-15)"
			           		floatingLabelText="Number of Players"
							errorText={this.state.numPlayerError ? "League Size can only be from 8 to 15" : ""}
			           		onChange = {this.onNumPlayersChange}/>
						<br/>
						<Checkbox
							label="Include English Premier League?"
							checked={this.state.EPL}
							onCheck={this.updateEPLCheck}
							style={style.checkbox}
							/>
						<TextField
							floatingLabelText="(Optional) Emails for your Friends To Join this League"
							hintText="Enter with Comma Seperated"
							multiLine={true}
							rows={2}
							rowsMax={5}
    					/><br />
						<TextField
							hintText="Player Name"
							multiLine={true}
							rows={2}
							rowsMax={5}
    					/>
						<RaisedButton 
			     			label="Submit"
							style={style.sumbitButton} 
			     			primary={true} 
			             		/*style={style}*/
		         		 	onClick={(event) => this.pressSubmit(event)}/>
		         	</div>
         		 	{/* <div>
         		 		{
         		 			(this.props.user.message !=="") ?
         		 			<p>{this.props.user.message}</p> :
         		 			<p></p>
         		 		}
         		 	</div> */}
	         	</div>
	     	</MuiThemeProvider>
	  	</div>
	  )
    }
}
    /*<nav className="menu">
        <Link to="/colormenu">Login</Link>
    </nav>*/


export default CreateLeague
