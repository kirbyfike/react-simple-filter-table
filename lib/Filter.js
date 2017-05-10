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

    _this.onUpdatedFilterTag = function (newFilters) {

      var obj = {};
      newFilters.forEach(function (data) {
        obj[data.columnName] = data.sort;
      });

      _this.props.filterTagUpdated(obj);
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
    key: 'render',
    value: function render() {

      var filterObject = this.state.filterObject;

      var filterTabObject = Object.keys(filterObject).map(function (key, index) {
        var found = false;
        var returnObject = {};
        this.props.categories.forEach(function (a) {
          if (a.columnName === key) {
            found = true;
            returnObject = { "columnName": key, "sort": filterObject[key], "datatype": a.datatype, "label": a.label };
            return;
          }
        });

        if (found) {
          return returnObject;
        }
      }, this);

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_FilterDropdown2.default, { label: this.props.label, onUpdate: this.onUpdatedFilter, filterData: this.props.categories }),
        _react2.default.createElement(_FilterTags2.default, { onUpdate: this.onUpdatedFilterTag, filterObject: filterTabObject })
      );
    }
  }]);

  return Filter;
}(_react2.default.Component);

module.exports = Filter;