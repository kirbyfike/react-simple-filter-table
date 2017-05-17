import React from 'react';
import ReactDOM from 'react-dom';
import Popover from 'react-simple-popover'
import Datetime from 'react-datetime'
import moment from 'moment'

require('./filter-dropdown.scss');
require('./react-simple-popover.scss');


class FilterDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      showSubFilter: false,
      openFilterPopover: false,
      selectedMainFilter: "",
      selectedObject: {}
    }
  }

  componentDidMount() {
  }

  handleFiltlerPopoverClick() {
    this.setState({openFilterPopover: true});
  }

  handleFiltlerPopOverClose() {
    this.setState({openFilterPopover: false, showSubFilter: false});
  }

  handleMainFiltlerSelected() {

    var selectedObject = {}

    var filterMainName = this.refs.filterMainName.value

    if (filterMainName !== "") {
      this.props.filterData.forEach(function (a) {
        if (filterMainName === a.label) {
          selectedObject = a;
        }
      })

      this.setState({selectedObject: selectedObject, showSubFilter: true, selectedMainFilter: this.refs.filterMainName.value})
    }
  }

  buildMainFilters() {

    var inputData = this.props.filterData.map(function(a) {
      return(<option key={a.label} value={a.label}>{a.label}</option>)
    });

    return inputData
  }

  showSubFilterInputs() {
    var inputs = undefined

    const selectedMainFilter = this.state.selectedMainFilter

    var subFilter = {}

    var selectedObject = this.state.selectedObject

    if (selectedObject.datatype === "multiselect") {

      var selectData = selectedObject.values.map(function(d) {
        return(
          <div className="checkbox">
            <label><input type="checkbox" className={`${selectedObject.columnName}-selected`} value={d.value} />{d.label}</label>
          </div>
        )
      });

      inputs = (
        <div style={{marginTop: "10px"}}>
          <label>Select Your Filter:</label>
          {selectData}
        </div>
      )

    } else if (selectedObject.datatype === "date") {

      inputs = (
        <div style={{marginTop: "10px"}}>
          <label>Date is less than:</label>
          <Datetime inputProps={{id:"lessThanDate"}} inputFormat="MM/DD/YY" timeFormat={false} open={false} closeOnSelect={true}/>

          <label>Date is greater than:</label>
          <Datetime inputProps={{id:"greaterThanDate"}} timeFormat={false} open={false} closeOnSelect={true}/>
        </div>
      )

    } else if (selectedObject.datatype === "number") {
      inputs = (
        <div style={{marginTop: "10px"}}>
          <label>Amount is less than:</label>
          <input type="text" className={`form-control`} id={`${selectedObject.columnName}-lessThanAmount`} />

          <label>Amount is greater than:</label>
          <input type="text" className={`form-control`} id={`${selectedObject.columnName}-greaterThanAmount`} />
        </div>
      )
    }

    return inputs
  }

  handleAddFilter() {
    var selectedObject = this.state.selectedObject

    var newObject = {}

    if (selectedObject.datatype === "multiselect") {
      newObject[selectedObject.columnName] = {"$in":[]}

      var elems = document.getElementsByClassName(`${selectedObject.columnName}-selected`);

      for (var elem of elems) {
        if (elem.checked) {
          newObject[selectedObject.columnName]["$in"].push(elem.value)
        }
      }

    } else if (selectedObject.datatype === "date") {
      var lessThanDate = document.getElementById("lessThanDate").value
      var greaterThanDate = document.getElementById("greaterThanDate").value

      newObject[selectedObject.columnName] = {}

      if(lessThanDate) {
        newObject[selectedObject.columnName]["$lt"] = Date.parse(lessThanDate)
      }

      if(greaterThanDate) {
        newObject[selectedObject.columnName]["$gt"] = Date.parse(greaterThanDate)
      }

    } else if (selectedObject.datatype === "number") {
      var lessThanAmount = document.getElementById(`${selectedObject.columnName}-lessThanAmount`).value
      var greaterThanAmount = document.getElementById(`${selectedObject.columnName}-greaterThanAmount`).value

      newObject[selectedObject.columnName] = {}

      if(lessThanAmount) {
        newObject[selectedObject.columnName]["$lt"] = lessThanAmount
      }

      if(greaterThanAmount) {
        newObject[selectedObject.columnName]["$gt"] = greaterThanAmount
      }
    }

    this.props.onUpdate(newObject);
  }

  handleClose(e) {
    this.setState({openFilterPopover: false});
  }

  render () {

    return (
      <div>
        <button
          className="btn btn-default filter-opportunities"
          onClick={() => this.handleFiltlerPopoverClick()}>{this.props.label} <span className="caret"></span></button>

        <Popover
          placement="bottom"
          containerStyle={{zIndex: '10000'}}
          className="popover"
          container={this}
          show={this.state.openFilterPopover}
          onHide={() => this.handleFiltlerPopOverClose()} >
          <p>Filter Opportunities:</p>

          <form>
            <select ref="filterMainName" onChange={() => this.handleMainFiltlerSelected()} className="form-control">
              <option value="">Select a Filter...</option>
              {this.buildMainFilters()}
            </select>


            { this.state.selectedMainFilter.length > 0 ?
              this.showSubFilterInputs()

            : null }

            <button className="btn btn-default" onClick={() => this.handleAddFilter()} style={{marginTop: "10px"}} type="button">Add Filter</button>
          </form>

        </Popover>
      </div>
    )
  }
}

module.exports = FilterDropdown
