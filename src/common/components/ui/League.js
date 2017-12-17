import { Component } from 'react'
import PropTypes from 'prop-types'
import { NavLink as Link, Redirect } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Card, CardText } from 'material-ui/Card';
import {Tabs, Tab} from 'material-ui/Tabs';
import {
	Table,
	TableBody,
	TableFooter,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
  } from 'material-ui/Table';
  import SortableTable from './SortableTable'

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
	},
	headline: {
		fontSize: 24,
		paddingTop: 16,
		marginBottom: 12,
		fontWeight: 400,
	  },
}

class League extends Component {

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
				<Tabs>
					<Tab label="Standings" >
						<div>
							<SortableTable 
								myRows={this.props.activeLeague.owners} 
								myHeaders = {[
									{name: "Rank", key: "rank"},
									{name: "Owner", key: "owner_name"},
									{name: "User", key: "username"},
									{name: "Points", key: "total_points"}
									]}
								title={this.props.activeLeague.league_name}/>
								
						</div>
						</Tab>
						<Tab
						label="Tab 2"
						data-route="/home"
						//onActive={handleActive}
						>
						<div>
							<h2 style={style.headline}>Tab Three</h2>
							<p>
							This is a third example tab.
							</p>
						</div>
						</Tab>
						<Tab
						label="Tab 3"
						data-route="/home"
						//onActive={handleActive}
						>
						<div>
							<h2 style={style.headline}>Tab Three</h2>
							<p>
							This is a third example tab.
							</p>
						</div>
						</Tab>
						<Tab
						label="Tab 4"
						data-route="/home"
						//onActive={handleActive}
						>
						<div>
							<h2 style={style.headline}>Tab Three</h2>
							<p>
							This is a third example tab.
							</p>
						</div>
						</Tab>
					</Tabs>
				</div>
			</MuiThemeProvider>
		</div>
	  )
    }
}


export default League
