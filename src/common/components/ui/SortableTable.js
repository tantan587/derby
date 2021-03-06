import React from 'react';
import { MuiThemeProvider} from 'material-ui';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui';
import { sortData } from '../../lib/array-helpers'

// properties of TableHeader component
let headerProps = {
  enableSelectAll: false,
  displaySelectAll: false,
  adjustForCheckbox: false
};


// our table component that can sort columns
class SortableTable extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
       sortBy: '',
       myRows: [],
       myHeaders:[]};
  }

  componentWillReceiveProps(nextProps) {
    if(this.props != nextProps) {
      this.setState({
        myRows: nextProps.myRows,
        myHeaders: nextProps.myHeaders,
        sortBy: nextProps.myHeaders.length > 0 ? nextProps.myHeaders[0].key : ''
      });
    }
  }

  renderHeaders(){
    let header= this.state.myHeaders.map( (h) => {
      return <SortableHeader 
                key={h.key}
                name={h.name}
                onClicked={()=>this.updateSortBy(h.key)} 
                isSortColumn={this.state.sortBy == h.key}/>
    });
    return <TableRow>{header}</TableRow>;
  }
                               
  updateSortBy(sortBy){
      // multiple clicks on the same column reverse the sort order
      if( sortBy == this.state.sortBy ){
        this.setState( {myRows: [...this.state.myRows.reverse()]} );
        return;
      }
            
      let myRows = sortData(this.state.myRows,sortBy)
      
      this.setState({myRows, sortBy});
    }

      
  render() {
    return (
        <MuiThemeProvider>
        <Table>
          <TableHeader {...headerProps}>
          <TableRow>
							<TableHeaderColumn colSpan={this.state.myHeaders.length} style={{textAlign: 'center'}}>
							  {this.props.title}
							</TableHeaderColumn>
            </TableRow>
              {this.renderHeaders()}
          </TableHeader>
          <TableBody
            stripedRows={true}
            displayRowCheckbox={false}
            displaySelectAll={false}
            adjustForCheckbox={false}>
            {this.state.myRows.map( (row, i) => (
            <TableRow>
              {this.state.myHeaders.map((h) => 
                <TableRowColumn style={{textAlign:'center'}}>{row[h.key]}</TableRowColumn>)}
            </TableRow> ))}
          </TableBody>
        </Table>
      </MuiThemeProvider>
    );
  }
}

  
  
function SortableHeader(props){
  let style = {
    cursor: "pointer"
  }
  if(props.isSortColumn){
    style.fontWeight = "bold";
    style.color = "black";
  }
  
  return (
    <TableHeaderColumn style={{textAlign: 'center'}}>
      <div style={style} onClick={() => props.onClicked()}>{props.name}</div>
    </TableHeaderColumn>
  );
}
  
export default SortableTable;
