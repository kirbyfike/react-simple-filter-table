import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment'
require('./filter-tags.scss');


class FilterTags extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  buildFilterTags() {
    var inputData = this.props.filterTagObjects.map(function(a) {
      return (<button className="btn btn-default tag-filter" key={a.key} onClick={() => this.removeFilter(a.key)} type="submit">{a.label} X</button>)
    }, this)

    return inputData
  }

  removeFilter = (selectedKey) => {
    this.props.removeFilterTag(selectedKey)
  }

  render () {
    return (
      <div>
        {this.buildFilterTags()}
      </div>
    )
  }
}

module.exports = FilterTags
