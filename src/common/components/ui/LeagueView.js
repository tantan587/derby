import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const styles = {
  propContainer: {
    width: 200,
    overflow: 'hidden',
    margin: '20px auto 0',
  },
  propToggleHeader: {
    margin: '20px auto 10px',
  },
};

/**
 * A more complex example, allowing the table height to be set, and key boolean properties to be toggled.
 */
class LeagueView extends Component {

    constructor(props) {
        super(props)
        this.handleToggle = this.handleToggle.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.state = {
            height: '10000px'
          };
    }

  handleToggle(event, toggled) {
    this.setState({
      [event.target.name]: toggled,
    });
  };

  handleChange(event) {
    this.setState({height: event.target.value});
  };

  render() {
    return (
        <MuiThemeProvider>
      <div>
        <Table
          height={this.state.height}
          fixedHeader={true}
          fixedFooter={true}
        >
          <TableHeader displaySelectAll={false}
          adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn colSpan="4" tooltip="Standings" style={{textAlign: 'center'}}>
                Standings
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn tooltip="The ID">Team Name</TableHeaderColumn>
              <TableHeaderColumn tooltip="Wins">Wins</TableHeaderColumn>
              <TableHeaderColumn tooltip="Losses">Losses</TableHeaderColumn>
              <TableHeaderColumn tooltip="Ties">Ties</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            stripedRows={true}
            displayRowCheckbox={false}
            displaySelectAll={false}
            adjustForCheckbox={false}
          >
            {this.props.teams.map((row, index) => (
              <TableRow key={index}>
                <TableRowColumn>{row.team}</TableRowColumn>
                <TableRowColumn>{row.wins}</TableRowColumn>
                <TableRowColumn>{row.losses}</TableRowColumn>
                <TableRowColumn>{row.ties}</TableRowColumn>
              </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      </MuiThemeProvider>
    );
  }
}

LeagueView.propTypes = {
  teams: PropTypes.array
}

export default LeagueView