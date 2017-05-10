import React from 'react';
import ReactDOM from 'react-dom';
import Datetime from 'react-datetime'
import moment from 'moment'
import FilterDropdown from './FilterDropdown'
import FilterTags from './FilterTags'


class Filter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      openFilterPopover: false,
      showSubFilter: false,
      filterObject: {},
      filterTagObject: undefined
    }
  }

  componentDidMount() {
    var filterObject = (this.props.filterObject) ? this.props.filterObject : {}
    this.setState({filterObject: filterObject})
  }

  onUpdatedFilter = (newFilter) => {

    var selectedKey = Object.keys(newFilter)[0]

    if (this.state.filterObject[selectedKey]) {
      delete this.state.filterObject[selectedKey]
    }

    this.state.filterObject[selectedKey] = newFilter[selectedKey]

    this.props.filterUpdated(this.state.filterObject)
  }

  onUpdatedFilterTag = (newFilters) => {

    var obj = {};
    newFilters.forEach(function(data){
      obj[data.columnName] = data.sort
    });

    this.props.filterTagUpdated(obj)
  }

  render () {

    var filterObject = this.state.filterObject

    const filterTabObject = Object.keys(filterObject).map(function(key, index) {
      var found = false
      var returnObject = {}
      this.props.categories.forEach(function (a) {
        if (a.columnName === key) {
          found = true
          returnObject = {"columnName": key, "sort": filterObject[key], "datatype": a.datatype, "label": a.label}
          return
        }
      })

      if (found) {
        return returnObject
      }
    }, this)

    return (
      <div>
        <FilterDropdown label={this.props.label} onUpdate={this.onUpdatedFilter} filterData={this.props.categories} />
        <FilterTags onUpdate={this.onUpdatedFilterTag} filterObject={filterTabObject} />
      </div>
    )
  }
}

module.exports = Filter
