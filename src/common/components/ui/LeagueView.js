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

const tableData = [
  {
    name: 'John Smith',
    status: 'Employed',
  },
  {
    name: 'Randal White',
    status: 'Unemployed',
  },
  {
    name: 'Stephanie Sanders',
    status: 'Employed',
  },
  {
    name: 'Steve Brown',
    status: 'Employed',
  },
  {
    name: 'Joyce Whitten',
    status: 'Employed',
  },
  {
    name: 'Samuel Roberts',
    status: 'Employed',
  },
  {
    name: 'Adam Moore',
    status: 'Employed',
  },
];

/**
 * A more complex example, allowing the table height to be set, and key boolean properties to be toggled.
 */
class LeagueView extends Component {

    constructor(props) {
        super(props)
        this.handleToggle = this.handleToggle.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.state = {
            fixedHeader: true,
            fixedFooter: true,
            stripedRows: false,
            showRowHover: false,
            selectable: true,
            multiSelectable: false,
            enableSelectAll: false,
            deselectOnClickaway: true,
            showCheckboxes: true,
            height: '300px',
            teams: this.props.teams
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
    console.log(this.props.teams)
    return (
        <MuiThemeProvider>
      <div>
        <Table
          height={this.state.height}
          fixedHeader={this.state.fixedHeader}
          fixedFooter={this.state.fixedFooter}
          selectable={this.state.selectable}
          multiSelectable={this.state.multiSelectable}
        >
          <TableHeader
            displaySelectAll={this.state.showCheckboxes}
            adjustForCheckbox={this.state.showCheckboxes}
            enableSelectAll={this.state.enableSelectAll}
          >
            <TableRow>
              <TableHeaderColumn colSpan="3" tooltip="Super Header" style={{textAlign: 'center'}}>
                Super Header
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn tooltip="The ID">Team Name</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Name">Wins</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Status">Losses</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Status">Ties</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={this.state.showCheckboxes}
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >
            {this.props.teams.map( (row, index) => (
              <TableRow key={index}>
                <TableRowColumn>{row._team}</TableRowColumn>
                <TableRowColumn>{row._wins}</TableRowColumn>
                <TableRowColumn>{row._losses}</TableRowColumn>
                <TableRowColumn>{row._ties}</TableRowColumn>
              </TableRow>
              ))}
          </TableBody>
        </Table>

        <div style={styles.propContainer}>
          <h3>Table Properties</h3>
          <TextField
            floatingLabelText="Table Body Height"
            defaultValue={this.state.height}
            onChange={(event) => this.handleToggle(event)}
          />
          <Toggle
            name="fixedHeader"
            label="Fixed Header"
            onToggle= {(event,toggled) => this.handleToggle(event, toggled)}
            defaultToggled={this.state.fixedHeader}
          />
          <Toggle
            name="fixedFooter"
            label="Fixed Footer"
            onToggle={(event,toggled) => this.handleToggle(event, toggled)}
            defaultToggled={this.state.fixedFooter}
          />
          <Toggle
            name="selectable"
            label="Selectable"
            onToggle={(event,toggled) => this.handleToggle(event, toggled)}
            defaultToggled={this.state.selectable}
          />
          <Toggle
            name="multiSelectable"
            label="Multi-Selectable"
            onToggle={(event,toggled) => this.handleToggle(event, toggled)}
            defaultToggled={this.state.multiSelectable}
          />
          <Toggle
            name="enableSelectAll"
            label="Enable Select All"
            onToggle={(event,toggled) => this.handleToggle(event, toggled)}
            defaultToggled={this.state.enableSelectAll}
          />
          <h3 style={styles.propToggleHeader}>TableBody Properties</h3>
          <Toggle
            name="deselectOnClickaway"
            label="Deselect On Clickaway"
            onToggle={(event,toggled) => this.handleToggle(event, toggled)}
            defaultToggled={this.state.deselectOnClickaway}
          />
          <Toggle
            name="stripedRows"
            label="Stripe Rows"
            onToggle={(event,toggled) => this.handleToggle(event, toggled)}
            defaultToggled={this.state.stripedRows}
          />
          <Toggle
            name="showRowHover"
            label="Show Row Hover"
            onToggle={(event,toggled) => this.handleToggle(event, toggled)}
            defaultToggled={this.state.showRowHover}
          />
          <h3 style={styles.propToggleHeader}>Multiple Properties</h3>
          <Toggle
            name="showCheckboxes"
            label="Show Checkboxes"
            onToggle={(event,toggled) => this.handleToggle(event, toggled)}
            defaultToggled={this.state.showCheckboxes}
          />
        </div>
      </div>
      </MuiThemeProvider>
    );
  }
}

LeagueView.propTypes = {
  teams: PropTypes.array
}

export default LeagueView