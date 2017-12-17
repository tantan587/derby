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
						<Table
							height={this.state.height}
							fixedHeader={true}
							fixedFooter={true}
						>
						<TableHeader displaySelectAll={false}
						displayRowCheckbox={false}
						adjustForCheckbox={false}>
						  <TableRow>
							<TableHeaderColumn colSpan="4" tooltip="Standings" style={{textAlign: 'center'}}>
							  Standings
							</TableHeaderColumn>
						  </TableRow>
						  <TableRow style={{cursor: 'pointer'}}>
							<TableHeaderColumn tooltip="The ID">Rank</TableHeaderColumn>
							<TableHeaderColumn tooltip="Owner">Owner</TableHeaderColumn>
							<TableHeaderColumn tooltip="Username">Username</TableHeaderColumn>
							<TableHeaderColumn tooltip="Points">Points</TableHeaderColumn>
						  </TableRow>
						</TableHeader>
						<TableBody
						  stripedRows={true}
						  displayRowCheckbox={false}
						  displaySelectAll={false}
						  adjustForCheckbox={false}
						>
						  {this.props.activeLeague.success ? this.props.activeLeague.owners.map((row, index) => (
							<TableRow key={index}>
							  <TableRowColumn>{index+1}</TableRowColumn>
							  <TableRowColumn>{row.owner_name}</TableRowColumn>
							  <TableRowColumn>{row.username}</TableRowColumn>
							  <TableRowColumn>{row.total_points}</TableRowColumn>
							</TableRow>
							)) : <div></div>}
						</TableBody>
					  </Table>
						</div>
						</Tab>
						<Tab label="Item Two" >
						<div>
							<SortableTable 
								myRows={this.props.activeLeague.owners} 
								myHeaders = {[
									{name: "Rank", key: "rank"},
									{name: "Owner", key: "owner_name"},
									{name: "User", key: "username"},
									{name: "Points", key: "total_points"}
									]}
								title='Standings'/>
								
						</div>
						</Tab>
						<Tab
						label="onActive"
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
