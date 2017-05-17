'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactDatetime = require('react-datetime');

var _reactDatetime2 = _interopRequireDefault(_reactDatetime);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _FilterDropdown = require('./FilterDropdown');

var _FilterDropdown2 = _interopRequireDefault(_FilterDropdown);

var _FilterTags = require('./FilterTags');

var _FilterTags2 = _interopRequireDefault(_FilterTags);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Filter = function (_React$Component) {
  _inherits(Filter, _React$Component);

  function Filter(props) {
    _classCallCheck(this, Filter);

    var _this = _possibleConstructorReturn(this, (Filter.__proto__ || Object.getPrototypeOf(Filter)).call(this, props));

    _this.onUpdatedFilter = function (newFilter) {

      var selectedKey = Object.keys(newFilter)[0];

      if (_this.state.filterObject[selectedKey]) {
        delete _this.state.filterObject[selectedKey];
      }

      _this.state.filterObject[selectedKey] = newFilter[selectedKey];

      _this.props.filterUpdated(_this.state.filterObject);
    };

    _this.removeFilterTag = function (removedKey) {

      if (_this.state.filterObject[removedKey]) {
        delete _this.state.filterObject[removedKey];
      }

      _this.props.filterTagUpdated(_this.state.filterObject);
    };

    _this.state = {
      openFilterPopover: false,
      showSubFilter: false,
      filterObject: {},
      filterTagObject: undefined
    };
    return _this;
  }

  _createClass(Filter, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var filterObject = this.props.filterObject ? this.props.filterObject : {};
      this.setState({ filterObject: filterObject });
    }
  }, {
    key: 'buildFilterTags',
    value: function buildFilterTags() {
      var filterObjects = Object.keys(this.props.filterObject);

      var inputData = filterObjects.map(function (a) {

        var returnObject = {};
        this.props.categories.forEach(function (b) {

          if (b.columnName === a) {
            var valuesObject = this.props.filterObject[a];
            if (b.datatype === "multiselect") {

              var validList = b.values.filter(function (item) {
                return valuesObject["$in"].includes(item.value);
              }).map(function (item) {
                return item.label;
              });

              returnObject = { key: a, label: b.label + ': ' + validList.toString() };
            } else if (b.datatype === "date" || b.datatype === "number") {

              var ltValue = "";
              var gtValue = "";

              if (b.datatype === "date") {
                ltValue = (0, _moment2.default)(valuesObject["$lt"]).format("MM/DD/YYYY");
                gtValue = (0, _moment2.default)(valuesObject["$gt"]).format("MM/DD/YYYY");
              } else {
                var formatter = new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 2
                });

                ltValue = formatter.format(valuesObject["$lt"]);
                gtValue = formatter.format(valuesObject["$gt"]);
              }

              var language = "";

              if (valuesObject["$gt"] && valuesObject["$lt"]) {
                language += gtValue + ' - ' + ltValue;
              } else if (a.sort["$gt"]) {
                language += 'Greater than: ' + gtValue;
              } else if (a.sort["$lt"]) {
                language += 'Less than: ' + ltValue;
              }

              returnObject = { key: a, label: b.label + ': ' + language };
            }
          }
        }, this);

        return returnObject;
      }, this);

      return inputData;
    }
  }, {
    key: 'render',
    value: function render() {

      var filterObject = this.state.filterObject;
      var filterTagObjects = this.buildFilterTags();

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_FilterDropdown2.default, { label: this.props.label, onUpdate: this.onUpdatedFilter, filterData: this.props.categories }),
        _react2.default.createElement(_FilterTags2.default, { removeFilterTag: this.removeFilterTag, filterTagObjects: filterTagObjects })
      );
    }
  }]);

  return Filter;
}(_react2.default.Component);

module.exports = Filter;