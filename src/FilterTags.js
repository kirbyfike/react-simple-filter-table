import React from 'react';
import ReactDOM from 'react-dom';
import Popover from 'react-simple-popover'
import Datetime from 'react-datetime'
import moment from 'moment'


class FilterTags extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
  }

  buildNewFilterTags() {

    var filterObject = this.props.filterObject

    // {"mode":{"sort":{"$in":["pcg","broker"]},"label":"Channel"}}

    var inputData = this.props.filterObject.map(function(a) {
      if (a.datatype === "multiselect") {

        return (<button className="btn btn-default tag-filter" onClick={() => this.removeFilter(a.columnName)} type="submit">{a.label}: {a.sort["$in"].toString()} X</button>)

      } else if (a.datatype === "date") {
        var dateLanguage = ""

        var ltValue = moment(a.sort["$lt"]).format("MM/DD/YYYY")
        var gtValue = moment(a.sort["$gt"]).format("MM/DD/YYYY")

        if (a.sort["$gt"] && (a.sort["$lt"])) {
          dateLanguage += `${gtValue} - ${ltValue}`
        } else if (a.sort["$gt"]) {
          dateLanguage += `Greater than: ${gtValue}`
        } else if (a.sort["$lt"]) {
          dateLanguage += `Less than: ${ltValue}`
        }

        return (<button className="btn btn-default tag-filter" onClick={() => this.removeFilter(a.columnName)} type="submit">{a.label}: {dateLanguage} X</button>)

      } else if (a.datatype === "number") {
        var amountLanguage = ""

        var ltValue = a.sort["$lt"]
        var gtValue = a.sort["$gt"]

        if (a.sort["$gt"] && (a.sort["$lt"])) {
          amountLanguage += `${gtValue} - ${ltValue}`
        } else if (a.sort["$gt"]) {
          amountLanguage += `Greater than: ${gtValue}`
        } else if (a.sort["$lt"]) {
          amountLanguage += `Less than: ${ltValue}`
        }

        return (<button className="btn btn-default tag-filter" onClick={() => this.removeFilter(a.columnName)} type="submit">{a.label}: {amountLanguage} X</button>)
      }
    }, this);

    return inputData
  }

  removeFilter = (selectedKey) => {
    var propObject = this.props.filterObject

    const filterTabObject = propObject.filter(function(a) {
      return (a.columnName !== selectedKey)
    })

    this.props.onUpdate(filterTabObject)
  }

  render () {
    return (
      <div>
        {this.buildNewFilterTags()}
      </div>
    )
  }
}

module.exports = FilterTags
