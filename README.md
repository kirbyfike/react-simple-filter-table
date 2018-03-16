# React Simple Filter Table

A UI React component to search table data and visualize it.

## Getting Started

npm install react-simple-filter-table

### Usage
let objectData = [];

let categories = {columnName: "col1", label: "Channel", datatype: "multiselect", values: [{value: "option1", label: "Option 1"}, {value: "option2", label: "Option 1"}]},
{columnName: "col2", label: "Date", datatype: "date"},
{columnName: "col3", label: "Amount", datatype: "number"}]}

<Filter
categories={categories}
filterObject={objectData}
filterUpdated={this.filterUpdated}
filterTagUpdated={this.filterTagUpdated}
label="Filter Opportunities"
name="Opportunities"/>
