'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('./filter-tags.scss');

var FilterTags = function (_React$Component) {
  _inherits(FilterTags, _React$Component);

  function FilterTags(props) {
    _classCallCheck(this, FilterTags);

    var _this = _possibleConstructorReturn(this, (FilterTags.__proto__ || Object.getPrototypeOf(FilterTags)).call(this, props));

    _this.removeFilter = function (selectedKey) {
      _this.props.removeFilterTag(selectedKey);
    };

    return _this;
  }

  _createClass(FilterTags, [{
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'buildFilterTags',
    value: function buildFilterTags() {
      var inputData = this.props.filterTagObjects.map(function (a) {
        var _this2 = this;

        return _react2.default.createElement(
          'button',
          { className: 'btn btn-default tag-filter', key: a.key, onClick: function onClick() {
              return _this2.removeFilter(a.key);
            }, type: 'submit' },
          a.label,
          ' X'
        );
      }, this);

      return inputData;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        this.buildFilterTags()
      );
    }
  }]);

  return FilterTags;
}(_react2.default.Component);

module.exports = FilterTags;