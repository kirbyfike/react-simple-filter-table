'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactSimplePopover = require('react-simple-popover');

var _reactSimplePopover2 = _interopRequireDefault(_reactSimplePopover);

var _reactDatetime = require('react-datetime');

var _reactDatetime2 = _interopRequireDefault(_reactDatetime);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FilterTags = function (_React$Component) {
  _inherits(FilterTags, _React$Component);

  function FilterTags(props) {
    _classCallCheck(this, FilterTags);

    var _this = _possibleConstructorReturn(this, (FilterTags.__proto__ || Object.getPrototypeOf(FilterTags)).call(this, props));

    _this.removeFilter = function (selectedKey) {
      var propObject = _this.props.filterObject;

      var filterTabObject = propObject.filter(function (a) {
        return a.columnName !== selectedKey;
      });

      _this.props.onUpdate(filterTabObject);
    };

    _this.state = {};
    return _this;
  }

  _createClass(FilterTags, [{
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'buildNewFilterTags',
    value: function buildNewFilterTags() {

      var filterObject = this.props.filterObject;

      // {"mode":{"sort":{"$in":["pcg","broker"]},"label":"Channel"}}

      var inputData = this.props.filterObject.map(function (a) {
        var _this2 = this;

        if (a.datatype === "multiselect") {

          return _react2.default.createElement(
            'button',
            { className: 'btn btn-default tag-filter', onClick: function onClick() {
                return _this2.removeFilter(a.columnName);
              }, type: 'submit' },
            a.label,
            ': ',
            a.sort["$in"].toString(),
            ' X'
          );
        } else if (a.datatype === "date") {
          var dateLanguage = "";

          var ltValue = (0, _moment2.default)(a.sort["$lt"]).format("MM/DD/YYYY");
          var gtValue = (0, _moment2.default)(a.sort["$gt"]).format("MM/DD/YYYY");

          if (a.sort["$gt"] && a.sort["$lt"]) {
            dateLanguage += gtValue + ' - ' + ltValue;
          } else if (a.sort["$gt"]) {
            dateLanguage += 'Greater than: ' + gtValue;
          } else if (a.sort["$lt"]) {
            dateLanguage += 'Less than: ' + ltValue;
          }

          return _react2.default.createElement(
            'button',
            { className: 'btn btn-default tag-filter', onClick: function onClick() {
                return _this2.removeFilter(a.columnName);
              }, type: 'submit' },
            a.label,
            ': ',
            dateLanguage,
            ' X'
          );
        } else if (a.datatype === "number") {
          var amountLanguage = "";

          var ltValue = a.sort["$lt"];
          var gtValue = a.sort["$gt"];

          if (a.sort["$gt"] && a.sort["$lt"]) {
            amountLanguage += gtValue + ' - ' + ltValue;
          } else if (a.sort["$gt"]) {
            amountLanguage += 'Greater than: ' + gtValue;
          } else if (a.sort["$lt"]) {
            amountLanguage += 'Less than: ' + ltValue;
          }

          return _react2.default.createElement(
            'button',
            { className: 'btn btn-default tag-filter', onClick: function onClick() {
                return _this2.removeFilter(a.columnName);
              }, type: 'submit' },
            a.label,
            ': ',
            amountLanguage,
            ' X'
          );
        }
      }, this);

      return inputData;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        this.buildNewFilterTags()
      );
    }
  }]);

  return FilterTags;
}(_react2.default.Component);

module.exports = FilterTags;