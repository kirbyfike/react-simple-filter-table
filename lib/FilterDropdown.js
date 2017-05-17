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

require('./filter-dropdown.scss');
require('./react-simple-popover.scss');

var FilterDropdown = function (_React$Component) {
  _inherits(FilterDropdown, _React$Component);

  function FilterDropdown(props) {
    _classCallCheck(this, FilterDropdown);

    var _this = _possibleConstructorReturn(this, (FilterDropdown.__proto__ || Object.getPrototypeOf(FilterDropdown)).call(this, props));

    _this.state = {
      open: false,
      showSubFilter: false,
      openFilterPopover: false,
      selectedMainFilter: "",
      selectedObject: {}
    };
    return _this;
  }

  _createClass(FilterDropdown, [{
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'handleFiltlerPopoverClick',
    value: function handleFiltlerPopoverClick() {
      this.setState({ openFilterPopover: true });
    }
  }, {
    key: 'handleFiltlerPopOverClose',
    value: function handleFiltlerPopOverClose() {
      this.setState({ openFilterPopover: false, showSubFilter: false });
    }
  }, {
    key: 'handleMainFiltlerSelected',
    value: function handleMainFiltlerSelected() {

      var selectedObject = {};

      var filterMainName = this.refs.filterMainName.value;

      if (filterMainName !== "") {
        this.props.filterData.forEach(function (a) {
          if (filterMainName === a.label) {
            selectedObject = a;
          }
        });

        this.setState({ selectedObject: selectedObject, showSubFilter: true, selectedMainFilter: this.refs.filterMainName.value });
      }
    }
  }, {
    key: 'buildMainFilters',
    value: function buildMainFilters() {

      var inputData = this.props.filterData.map(function (a) {
        return _react2.default.createElement(
          'option',
          { key: a.label, value: a.label },
          a.label
        );
      });

      return inputData;
    }
  }, {
    key: 'showSubFilterInputs',
    value: function showSubFilterInputs() {
      var inputs = undefined;

      var selectedMainFilter = this.state.selectedMainFilter;

      var subFilter = {};

      var selectedObject = this.state.selectedObject;

      if (selectedObject.datatype === "multiselect") {

        var selectData = selectedObject.values.map(function (d) {
          return _react2.default.createElement(
            'div',
            { className: 'checkbox' },
            _react2.default.createElement(
              'label',
              null,
              _react2.default.createElement('input', { type: 'checkbox', className: selectedObject.columnName + '-selected', value: d.value }),
              d.label
            )
          );
        });

        inputs = _react2.default.createElement(
          'div',
          { style: { marginTop: "10px" } },
          _react2.default.createElement(
            'label',
            null,
            'Select Your Filter:'
          ),
          selectData
        );
      } else if (selectedObject.datatype === "date") {

        inputs = _react2.default.createElement(
          'div',
          { style: { marginTop: "10px" } },
          _react2.default.createElement(
            'label',
            null,
            'Date is less than:'
          ),
          _react2.default.createElement(_reactDatetime2.default, { inputProps: { id: "lessThanDate" }, inputFormat: 'MM/DD/YY', timeFormat: false, open: false, closeOnSelect: true }),
          _react2.default.createElement(
            'label',
            null,
            'Date is greater than:'
          ),
          _react2.default.createElement(_reactDatetime2.default, { inputProps: { id: "greaterThanDate" }, timeFormat: false, open: false, closeOnSelect: true })
        );
      } else if (selectedObject.datatype === "number") {
        inputs = _react2.default.createElement(
          'div',
          { style: { marginTop: "10px" } },
          _react2.default.createElement(
            'label',
            null,
            'Amount is less than:'
          ),
          _react2.default.createElement('input', { type: 'text', className: 'form-control', id: selectedObject.columnName + '-lessThanAmount' }),
          _react2.default.createElement(
            'label',
            null,
            'Amount is greater than:'
          ),
          _react2.default.createElement('input', { type: 'text', className: 'form-control', id: selectedObject.columnName + '-greaterThanAmount' })
        );
      }

      return inputs;
    }
  }, {
    key: 'handleAddFilter',
    value: function handleAddFilter() {
      var selectedObject = this.state.selectedObject;

      var newObject = {};

      if (selectedObject.datatype === "multiselect") {
        newObject[selectedObject.columnName] = { "$in": [] };

        var elems = document.getElementsByClassName(selectedObject.columnName + '-selected');

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = elems[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var elem = _step.value;

            if (elem.checked) {
              newObject[selectedObject.columnName]["$in"].push(elem.value);
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      } else if (selectedObject.datatype === "date") {
        var lessThanDate = document.getElementById("lessThanDate").value;
        var greaterThanDate = document.getElementById("greaterThanDate").value;

        newObject[selectedObject.columnName] = {};

        if (lessThanDate) {
          newObject[selectedObject.columnName]["$lt"] = Date.parse(lessThanDate);
        }

        if (greaterThanDate) {
          newObject[selectedObject.columnName]["$gt"] = Date.parse(greaterThanDate);
        }
      } else if (selectedObject.datatype === "number") {
        var lessThanAmount = document.getElementById(selectedObject.columnName + '-lessThanAmount').value;
        var greaterThanAmount = document.getElementById(selectedObject.columnName + '-greaterThanAmount').value;

        newObject[selectedObject.columnName] = {};

        if (lessThanAmount) {
          newObject[selectedObject.columnName]["$lt"] = lessThanAmount;
        }

        if (greaterThanAmount) {
          newObject[selectedObject.columnName]["$gt"] = greaterThanAmount;
        }
      }

      this.props.onUpdate(newObject);
    }
  }, {
    key: 'handleClose',
    value: function handleClose(e) {
      this.setState({ openFilterPopover: false });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'button',
          {
            className: 'btn btn-default filter-opportunities',
            onClick: function onClick() {
              return _this2.handleFiltlerPopoverClick();
            } },
          this.props.label,
          ' ',
          _react2.default.createElement('span', { className: 'caret' })
        ),
        _react2.default.createElement(
          _reactSimplePopover2.default,
          {
            placement: 'bottom',
            containerStyle: { zIndex: '10000' },
            className: 'popover',
            container: this,
            show: this.state.openFilterPopover,
            onHide: function onHide() {
              return _this2.handleFiltlerPopOverClose();
            } },
          _react2.default.createElement(
            'p',
            null,
            'Filter Opportunities:'
          ),
          _react2.default.createElement(
            'form',
            null,
            _react2.default.createElement(
              'select',
              { ref: 'filterMainName', onChange: function onChange() {
                  return _this2.handleMainFiltlerSelected();
                }, className: 'form-control' },
              _react2.default.createElement(
                'option',
                { value: '' },
                'Select a Filter...'
              ),
              this.buildMainFilters()
            ),
            this.state.selectedMainFilter.length > 0 ? this.showSubFilterInputs() : null,
            _react2.default.createElement(
              'button',
              { className: 'btn btn-default', onClick: function onClick() {
                  return _this2.handleAddFilter();
                }, style: { marginTop: "10px" }, type: 'button' },
              'Add Filter'
            )
          )
        )
      );
    }
  }]);

  return FilterDropdown;
}(_react2.default.Component);

module.exports = FilterDropdown;