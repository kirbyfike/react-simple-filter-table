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

  buildFilterTags() {
    var filterObjects = Object.keys(this.props.filterObject)

    var inputData = filterObjects.map(function(a) {

      var returnObject = {}
      this.props.categories.forEach(function (b) {

        if (b.columnName === a) {
          var valuesObject = this.props.filterObject[a]
          if (b.datatype === "multiselect") {

            var validList = b.values.filter((item) => valuesObject["$in"].includes(item.value))
            .map((item) => {
              return item.label
            })

            returnObject = {key: a, label: `${b.label}: ${validList.toString()}`}
          } else if (b.datatype === "date" || b.datatype === "number") {

            var ltValue = ""
            var gtValue = ""

            if (b.datatype === "date") {
              ltValue = moment(valuesObject["$lt"]).format("MM/DD/YYYY")
              gtValue = moment(valuesObject["$gt"]).format("MM/DD/YYYY")
            } else {
              var formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2,
              });

              ltValue = formatter.format(valuesObject["$lt"])
              gtValue = formatter.format(valuesObject["$gt"])
            }


            var language = ""

            if (valuesObject["$gt"] && (valuesObject["$lt"])) {
              language += `${gtValue} - ${ltValue}`
            } else if (a.sort["$gt"]) {
              language += `Greater than: ${gtValue}`
            } else if (a.sort["$lt"]) {
              language += `Less than: ${ltValue}`
            }

            returnObject = {key: a, label: `${b.label}: ${language}`}
          }

        }
      }, this)

      return returnObject
    }, this);

    return inputData
  }

  removeFilterTag = (removedKey) => {

    if (this.state.filterObject[removedKey]) {
      delete this.state.filterObject[removedKey]
    }

    this.props.filterTagUpdated(this.state.filterObject)
  }

  render () {

    var filterObject = this.state.filterObject
    const filterTagObjects = this.buildFilterTags()

    return (
      <div>
        <FilterDropdown label={this.props.label} onUpdate={this.onUpdatedFilter} filterData={this.props.categories} />
        <FilterTags removeFilterTag={this.removeFilterTag} filterTagObjects={filterTagObjects} />
      </div>
    )
  }
}

module.exports = Filter
