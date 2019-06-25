"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DateRangePickerCalendar = void 0;

var _style = _interopRequireDefault(require("styled-jsx/style"));

var _react = _interopRequireWildcard(require("react"));

var _reactDates = require("react-dates");

var _presets = require("./presets");

var _constants = require("react-dates/constants");

var _propTypes = require("prop-types");

var _lodash = require("lodash");

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PHRASES = {
  chooseAvailableStartDate: function chooseAvailableStartDate(_ref) {
    var date = _ref.date;
    return "Choose ".concat(date, ".");
  },
  chooseAvailableEndDate: function chooseAvailableEndDate(_ref2) {
    var date = _ref2.date;
    return "Choose ".concat(date, ".");
  }
};

var DateRangePickerCalendar =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(DateRangePickerCalendar, _PureComponent);

  function DateRangePickerCalendar() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DateRangePickerCalendar);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DateRangePickerCalendar)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      // Must be non-null in order to select dates.
      focusedInput: _constants.START_DATE
    });

    _defineProperty(_assertThisInitialized(_this), "handleFocusChange", function (focusedInput) {
      _this.setState({
        focusedInput: focusedInput
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleDatesChange", function (_ref3) {
      var startDate = _ref3.startDate,
          endDate = _ref3.endDate;
      var onDatesChange = _this.props.onDatesChange;
      var focusedInput = _this.state.focusedInput;

      if (focusedInput === _constants.START_DATE) {
        if (!(0, _lodash.isNil)(startDate) && !(0, _lodash.isNil)(endDate)) {
          // By default, when the user select a valid full range then select a date previous to the range, react-dates will extend the current range instead of starting a new one.
          // It works this way because react-dates doesn't reset the endDate.
          onDatesChange(startDate, null, null);
        } else {
          onDatesChange(startDate, endDate, null);
        }
      } else {
        // Enable selection of a new single date or range when an end date is selected.
        // This is mostly usefull to allow the selection of a single date after a range has beem selected.
        // The default behavior is to select a new end date for the current range.
        if (!(0, _lodash.isNil)(endDate)) {
          _this.resetFocusedInput();
        }

        onDatesChange(startDate, endDate, null);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleClear", function () {
      var onDatesChange = _this.props.onDatesChange;

      _this.resetFocusedInput();

      onDatesChange(null, null, null);
    });

    _defineProperty(_assertThisInitialized(_this), "handleApply", function (event) {
      var onApply = _this.props.onApply;

      _this.resetFocusedInput();

      onApply(event);
    });

    _defineProperty(_assertThisInitialized(_this), "handleSelectPreset", function (event, preset) {
      var onDatesChange = _this.props.onDatesChange;

      _this.resetFocusedInput();

      onDatesChange(preset.startDate, preset.endDate, preset.text);
    });

    _defineProperty(_assertThisInitialized(_this), "isDayBlocked", function (day) {
      var _this$props = _this.props,
          minDate = _this$props.minDate,
          maxDate = _this$props.maxDate;

      if (!(0, _lodash.isNil)(minDate) && !(0, _lodash.isNil)(maxDate)) {
        return day.isBefore(minDate, "day") || day.isAfter(maxDate, "day");
      }

      if (!(0, _lodash.isNil)(minDate)) {
        return day.isBefore(minDate, "day");
      }

      if (!(0, _lodash.isNil)(maxDate)) {
        return day.isAfter(maxDate, "day");
      }

      return false;
    });

    _defineProperty(_assertThisInitialized(_this), "isMonthBlocked", function (month) {
      var _this$props2 = _this.props,
          minDate = _this$props2.minDate,
          maxDate = _this$props2.maxDate;

      if (!(0, _lodash.isNil)(minDate) || !(0, _lodash.isNil)(maxDate)) {
        var firstDay = (0, _moment["default"])(month).startOf("month");
        var lastDay = (0, _moment["default"])(month).endOf("month");
        return _this.isDayBlocked(firstDay) && _this.isDayBlocked(lastDay);
      }

      return false;
    });

    _defineProperty(_assertThisInitialized(_this), "getInitialVisibleMonth", function () {
      var _this$props3 = _this.props,
          startDate = _this$props3.startDate,
          endDate = _this$props3.endDate;
      var initialMonth = startDate || endDate || (0, _moment["default"])();
      var nextMonth = (0, _moment["default"])(initialMonth).add(1, "months");

      if (_this.isMonthBlocked(nextMonth)) {
        // When the next month is blocked, show the previous and current months instead of the current and next months.
        return (0, _moment["default"])(initialMonth).subtract(1, "months");
      }

      return initialMonth;
    });

    return _this;
  }

  _createClass(DateRangePickerCalendar, [{
    key: "resetFocusedInput",
    value: function resetFocusedInput() {
      this.setState({
        focusedInput: _constants.START_DATE
      });
    }
  }, {
    key: "getCssClasses",
    value: function getCssClasses() {
      var className = this.props.className;
      var defaultClasses = "calendar flex mt3";
      return (0, _lodash.isNil)(className) ? defaultClasses : "".concat(defaultClasses, " ").concat(className);
    }
  }, {
    key: "renderPresets",
    value: function renderPresets() {
      var _this$props4 = this.props,
          startDate = _this$props4.startDate,
          endDate = _this$props4.endDate,
          presetsComponent = _this$props4.presetsComponent,
          presets = _this$props4.presets,
          presetsIcon = _this$props4.presetsIcon;
      return (0, _react.cloneElement)(presetsComponent, {
        startDate: startDate,
        endDate: endDate,
        onSelectPreset: this.handleSelectPreset,
        presets: presets,
        icon: presetsIcon
      });
    }
  }, {
    key: "renderNavPrev",
    value: function renderNavPrev() {
      var navPrevIcon = this.props.navPrevIcon;
      return _react["default"].createElement("div", {
        tabIndex: "0"
      }, navPrevIcon);
    }
  }, {
    key: "renderNavNext",
    value: function renderNavNext() {
      var navNextIcon = this.props.navNextIcon;
      return _react["default"].createElement("div", {
        tabIndex: "0"
      }, navNextIcon);
    }
  }, {
    key: "renderButtons",
    value: function renderButtons() {
      var _this$props5 = this.props,
          startDate = _this$props5.startDate,
          endDate = _this$props5.endDate,
          allowSingleDateSelection = _this$props5.allowSingleDateSelection,
          buttons = _this$props5.buttons,
          clearText = _this$props5.clearText,
          applyText = _this$props5.applyText;
      return (0, _react.cloneElement)(buttons, {
        startDate: startDate,
        endDate: endDate,
        onClear: this.handleClear,
        onApply: this.handleApply,
        allowSingleDateSelection: allowSingleDateSelection,
        clearText: clearText,
        applyText: applyText
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props6 = this.props,
          startDate = _this$props6.startDate,
          endDate = _this$props6.endDate,
          allowSingleDateSelection = _this$props6.allowSingleDateSelection,
          minDate = _this$props6.minDate,
          maxDate = _this$props6.maxDate;
      var focusedInput = this.state.focusedInput;
      return _react["default"].createElement("div", {
        className: "jsx-153042954" + " " + (this.getCssClasses() || "")
      }, this.renderPresets(), _react["default"].createElement("div", {
        className: "jsx-153042954" + " " + "flex flex-column"
      }, _react["default"].createElement(_reactDates.DayPickerRangeController, {
        startDate: startDate,
        endDate: endDate,
        onDatesChange: this.handleDatesChange,
        onFocusChange: this.handleFocusChange,
        focusedInput: focusedInput,
        minimumNights: allowSingleDateSelection ? 0 : 1,
        minDate: minDate,
        maxDate: maxDate,
        navPrev: this.renderNavPrev(),
        navNext: this.renderNavNext(),
        isDayBlocked: !(0, _lodash.isNil)(minDate) || !(0, _lodash.isNil)(maxDate) ? this.isDayBlocked : undefined,
        initialVisibleMonth: this.getInitialVisibleMonth,
        numberOfMonths: 2,
        phrases: PHRASES,
        noBorder: true,
        keepOpenOnDateSelect: true,
        hideKeyboardShortcutsPanel: true
      }), this.renderButtons()), _react["default"].createElement(_style["default"], {
        id: "153042954"
      }, ".calendar.jsx-153042954{border-radius:var(--scale-alpha);box-shadow:var(--shadow-5);background-color:var(--white);}.calendar.jsx-153042954 .CalendarMonth_table{margin-top:var(--scale-bravo);}.calendar.jsx-153042954 .CalendarDay__default{border:none;color:var(--jet-dark);font-size:1rem;}.calendar.jsx-153042954 .CalendarDay__selected{background:var(--primary-500);color:var(--white);}.calendar.jsx-153042954 .CalendarDay__selected_span{background:var(--primary-lightest);}.calendar.jsx-153042954 .CalendarDay__hovered_span{background:var(--primary-lightest);}.calendar.jsx-153042954 .CalendarMonth_caption{font-size:24px;}.calendar.jsx-153042954 .DayPickerNavigation_button__default{border:0;}.calendar.jsx-153042954 .CalendarDay__blocked_calendar{background:var(--transparent);color:var(--cloud-dark);}.calendar.jsx-153042954 .DayPickerNavigation{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;padding:0 24px;}.calendar.jsx-153042954 .DayPickerNavigation_button{margin-top:24px;}.calendar.jsx-153042954 .DayPickerNavigation_button__horizontalDefault{padding:0;}.calendar.jsx-153042954 .DayPickerNavigation_button__disabled{border:0;}.calendar.jsx-153042954 .DayPicker_weekHeader_li small{font-size:0.875rem;color:var(--cloud-darkest);}.calendar.jsx-153042954 .CalendarDay__default:hover,.calendar.jsx-153042954 .CalendarDay__default:focus{background:var(--cloud-light);}.calendar.jsx-153042954 .CalendarDay__default:focus{outline:none;}.calendar.jsx-153042954 .DayPickerNavigation_button:focus{outline:none;}.calendar.jsx-153042954 .CalendarDay__blocked_calendar:hover,.calendar.jsx-153042954 .CalendarDay__blocked_calendar:focus{background:var(--transparent);color:var(--cloud-dark);}.calendar.jsx-153042954 .CalendarDay__selected:hover,.calendar.jsx-153042954 .CalendarDay__selected:active{background:var(--primary-500);}.calendar.jsx-153042954 .CalendarDay__selected_span:hover,.calendar.jsx-153042954 .CalendarDay__selected_span:active{background:var(--primary-lightest);}.calendar.jsx-153042954 .CalendarDay__default.CalendarDay__selected:focus{background:var(--primary-500);color:var(--white);}.calendar.jsx-153042954 .DayPickerNavigation_button__disabled #Calendar-Components{fill:var(--cloud-light);}"));
    }
  }]);

  return DateRangePickerCalendar;
}(_react.PureComponent);

exports.DateRangePickerCalendar = DateRangePickerCalendar;

_defineProperty(DateRangePickerCalendar, "propTypes", {
  startDate: _propTypes.object,
  endDate: _propTypes.object,
  onDatesChange: _propTypes.func,
  onApply: _propTypes.func,
  allowSingleDateSelection: _propTypes.bool,
  minDate: _propTypes.object,
  maxDate: _propTypes.object,
  navPrevIcon: _propTypes.node,
  navNextIcon: _propTypes.node,
  presetsComponent: _propTypes.node,
  presets: (0, _propTypes.arrayOf)((0, _propTypes.shape)(_presets.PRESET_SHAPE)),
  presetsIcon: _propTypes.node,
  buttons: _propTypes.node,
  clearText: _propTypes.string,
  applyText: _propTypes.string,
  className: _propTypes.string
});