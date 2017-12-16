import { Component } from 'react'
import PropTypes from 'prop-types'
import { NavLink as Link, Redirect } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import '../../../stylesheets/Menu.scss'
import Divider from 'material-ui/Divider'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {
  Table,
  TableBody,
  TableRow,
	TableRowColumn,
	TableHeaderColumn,
	TableHeader,
} from 'material-ui/Table';

const style = {
	titleText: {
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
			margin: '-300px 0 0 0',
		},
  submitButton: {
	position: 'absolute',
  	left: '50%',
  	margin: '0px 0 0 -90px',
	},
	tableText: {
		textAlign: 'center',
		fontSize: '16px',
		whiteSpace: "normal",
		wordWrap: "break-word"
	}
}

class CreateLeague extends Component {

    constructor(props) {
        super(props)
		this.pressSubmit = this.pressSubmit.bind(this)
		this.keypress = this.keypress.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.updateEPLCheck = this.updateEPLCheck.bind(this)
        this.state={
					league_name:'',
					league_password:'',
					EPL:false,
					max_owners:8,
					privateInd:true,
					owner_name:""
        }
	}	

	updateEPLCheck() {
			this.setState({ EPL: !this.state.EPL });
		  }

	handleSubmit(e)
	{
			const {onCreateLeague} = this.props
			this.setState({ numPlayerError:false })
			const { onLogin } = this.props
			e.preventDefault()
			onCreateLeague(this.state)	
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
			if(this.props.activeLeague.success === true){
				return (<Redirect to={'/mainleague'}></Redirect>)
			}
			else{
					return (
			<div onKeyPress={(event) => this.keypress(event)}>
				<MuiThemeProvider>
					<div>
						<Card>
							<h1 style={style.titleText}>Create League</h1>
						<div style={style.board}>
						<CardText style={{textAlign:'center'}} >Time to create your own league! Our default league
						contains NBA, NFL, MLB, NHL, College Football, and NCAA Basketball.
						You draft one team per conference in the professional sports,
						and 3 teams from 3 different conferences in each college sport.
						Have questions? Learn more about it here.
						</CardText>
					<Table>
					<TableBody
					displayRowCheckbox={false}
					stripedRows={true}>
						<TableRow>
							<TableRowColumn style={style.tableText}>League Name</TableRowColumn>
							<TableRowColumn style={style.tableText}>
							<TextField inputStyle={{textAlign: 'center'}} id="1"
							errorText={this.props.user.error.create_league_name || ""}
							onChange = {(event,newValue) => this.setState({league_name:newValue})}/>
							</TableRowColumn>
						</TableRow>
						<TableRow>
							<TableRowColumn style={style.tableText}>League Password</TableRowColumn>
							<TableRowColumn style={style.tableText}>
							<TextField 
							inputStyle={{textAlign: 'center'}} 
								id="2"
								errorText={this.props.user.error.create_password || ""}
								onChange = {(event,newValue) => this.setState({league_password:newValue})}/>
							</TableRowColumn>
						</TableRow>
						<TableRow>
							<TableRowColumn style={style.tableText}>Upload Image</TableRowColumn>
							<TableRowColumn style={style.tableText}>
							DOES NOT WORK YET
							</TableRowColumn>
						</TableRow>
						<TableRow>
							<TableRowColumn style={style.tableText}>Number of Teams</TableRowColumn>
							<TableRowColumn style={style.tableText}>
							<DropDownMenu value={this.state.max_owners} onChange={(event, index, value) => this.setState({max_owners:value})}>
							<MenuItem value={8} primaryText="8 Teams" />
							<MenuItem value={9} primaryText="9 Teams" />
							<MenuItem value={10} primaryText="10 Teams" />
							<MenuItem value={11} primaryText="11 Teams" />
							<MenuItem value={12} primaryText="12 Teams" />
							<MenuItem value={13} primaryText="13 Teams" />
							<MenuItem value={14} primaryText="14Teams" />
							<MenuItem value={15} primaryText="15 Teams" />
						</DropDownMenu>
							</TableRowColumn>
						</TableRow>
					<TableRow>
							<TableRowColumn style={style.tableText}>Include the English Premier League?</TableRowColumn>
							<TableRowColumn style={style.tableText}>
							<Checkbox
								label="Yes"
								checked={this.state.EPL}
								onCheck={this.updateEPLCheck}
								style={{marginLeft:'37%'}}
							/>
							</TableRowColumn>
						</TableRow>
						<TableRow>
							<TableRowColumn style={style.tableText}>Public Or Private League?</TableRowColumn>
							<TableRowColumn style={style.tableText}>
							<RadioButtonGroup name="shipSpeed"
							defaultSelected="Private"
								style={{marginLeft:'37%'}}
								onChange={(event, value) => this.setState({privateInd:value})}
								value={this.state.numPlayers}>
							<RadioButton
								value={true}
								label="Private"
							/>
							<RadioButton
								value={false}
								label="Public"
							/>
							</RadioButtonGroup>
							</TableRowColumn>
						</TableRow>
						<TableRow>
							<TableRowColumn style={style.tableText}>Your Owner Name</TableRowColumn>
						<TableRowColumn style={style.tableText}>
							<TextField inputStyle={{textAlign: 'center'}} id="3"
							errorText={this.props.user.error.create_owner_name || ""}
								onChange = {(event,newValue) => this.setState({owner_name:newValue})}/>
							</TableRowColumn>
						</TableRow>									
					</TableBody>
				</Table>
				<br/>
				<RaisedButton
				label="Create A League!"
				style={style.submitButton}
				primary={true}
				onClick={(event) => this.pressSubmit(event)}/>
				
				</div>
				</Card>
			</div>
	 </MuiThemeProvider>
</div>
			)
    }
}
}
    /*<nav className="menu">
        <Link to="/colormenu">Login</Link>
    </nav>*/


export default CreateLeague
