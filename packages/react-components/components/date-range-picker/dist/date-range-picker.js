"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DateRangePicker = void 0;

var _react = _interopRequireWildcard(require("react"));

var _constants = require("react-dates/lib/constants");

var _reactComponentsShared = require("@sharegate/react-components-shared");

var _iconClear = require("@svgr/webpack?-svgo,+ref!./assets/icon-clear.svg");

var _dateRangePickerButtons = require("./date-range-picker-buttons");

var _dateRangePickerCalendar = require("./date-range-picker-calendar");

var _dateRangePickerInput = require("./date-range-picker-input");

var _dateRangePickerPresets = require("./date-range-picker-presets");

var _iconInputCalendar = require("@svgr/webpack?-svgo,+ref!./assets/icon-input-calendar.svg");

var _iconNavNext = require("@svgr/webpack?-svgo,+ref!./assets/icon-nav-next.svg");

var _iconNavPrev = require("@svgr/webpack?-svgo,+ref!./assets/icon-nav-prev.svg");

var _presets = require("./presets");

var _reactPopup = require("@sharegate/react-popup");

var _iconPresetsCalendar = require("@svgr/webpack?-svgo,+ref!./assets/icon-presets-calendar.svg");

var _propTypes = require("prop-types");

var _lodash = require("lodash");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var KEYS = {
  enter: 13,
  space: 32
};

var DateRangePicker =
/*#__PURE__*/
function (_AutoControlledPureCo) {
  _inherits(DateRangePicker, _AutoControlledPureCo);

  function DateRangePicker() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DateRangePicker);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DateRangePicker)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      startDate: null,
      endDate: null,
      selectedStartDate: null,
      selectedEndDate: null,
      selectedPresetName: null,
      isCalendarVisible: false
    });

    _defineProperty(_assertThisInitialized(_this), "_containerRef", (0, _react.createRef)());

    _defineProperty(_assertThisInitialized(_this), "handleInputClick", function () {
      var isCalendarVisible = _this.state.isCalendarVisible;

      if (!isCalendarVisible) {
        _this.toggleCalendarVisibility();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleInputClear", function (event) {
      var onDatesChange = _this.props.onDatesChange;

      _this.trySetAutoControlledStateValue({
        startDate: null
      });

      _this.trySetAutoControlledStateValue({
        endDate: null
      });

      _this.setState({
        selectedStartDate: null,
        selectedEndDate: null,
        selectedPresetName: null
      });

      onDatesChange(event, null, null, null);
    });

    _defineProperty(_assertThisInitialized(_this), "handleInputKeyDown", function (event) {
      var key = event.keyCode;

      if (key === KEYS.space || key === KEYS.enter) {
        if (key === KEYS.space) {
          event.preventDefault();
        }

        _this.toggleCalendarVisibility();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handlePopupClose", function () {
      var _this$state = _this.state,
          startDate = _this$state.startDate,
          endDate = _this$state.endDate;

      _this.setState({
        selectedStartDate: startDate,
        selectedEndDate: endDate,
        selectedPresetName: null
      });

      _this.toggleCalendarVisibility();
    });

    _defineProperty(_assertThisInitialized(_this), "handleCalendarDatesChange", function (startDate, endDate, presetName) {
      _this.setState({
        selectedStartDate: startDate,
        selectedEndDate: endDate,
        selectedPresetName: presetName
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleCalendarApply", function (event) {
      var onDatesChange = _this.props.onDatesChange;
      var _this$state2 = _this.state,
          selectedStartDate = _this$state2.selectedStartDate,
          selectedEndDate = _this$state2.selectedEndDate,
          selectedPresetName = _this$state2.selectedPresetName;

      _this.toggleCalendarVisibility();

      _this.trySetAutoControlledStateValue({
        startDate: selectedStartDate
      });

      _this.trySetAutoControlledStateValue({
        endDate: selectedEndDate
      });

      onDatesChange(event, selectedStartDate, selectedEndDate, selectedPresetName);
    });

    return _this;
  }

  _createClass(DateRangePicker, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          minDate = _this$props.minDate,
          maxDate = _this$props.maxDate;

      if (!(0, _lodash.isNil)(minDate) && !(0, _lodash.isNil)(maxDate)) {
        if (minDate.isSameOrAfter(maxDate)) {
          throw new _reactComponentsShared.ArgumentError("DateRangePicker - \"minDate\" must be before \"maxDate\".");
        }
      }
    }
  }, {
    key: "toggleCalendarVisibility",
    value: function toggleCalendarVisibility() {
      var isCalendarVisible = this.state.isCalendarVisible;
      this.setState({
        isCalendarVisible: !isCalendarVisible
      });
    }
  }, {
    key: "getAnchorDirectionProps",
    value: function getAnchorDirectionProps() {
      var anchorDirection = this.props.anchorDirection;
      var props = {};

      if (anchorDirection === _constants.ANCHOR_LEFT) {
        props.left = "0";
      } else {
        props.right = "0";
      }

      return props;
    }
  }, {
    key: "getCssClasses",
    value: function getCssClasses() {
      var className = this.props.className;
      var defaultClasses = "relative";
      return (0, _lodash.isNil)(className) ? defaultClasses : "".concat(defaultClasses, " ").concat(className);
    }
  }, {
    key: "renderInput",
    value: function renderInput() {
      var _this$props2 = this.props,
          input = _this$props2.input,
          inputIcon = _this$props2.inputIcon,
          inputClearIcon = _this$props2.inputClearIcon,
          placeholder = _this$props2.placeholder,
          rangeFormat = _this$props2.rangeFormat,
          dateFormat = _this$props2.dateFormat,
          disabled = _this$props2.disabled;
      var _this$state3 = this.state,
          selectedStartDate = _this$state3.selectedStartDate,
          selectedEndDate = _this$state3.selectedEndDate,
          isCalendarVisible = _this$state3.isCalendarVisible;
      return (0, _react.cloneElement)(input, {
        startDate: selectedStartDate,
        endDate: selectedEndDate,
        onClick: this.handleInputClick,
        onClear: this.handleInputClear,
        onKeyDown: this.handleInputKeyDown,
        placeholder: placeholder,
        rangeFormat: rangeFormat,
        dateFormat: dateFormat,
        icon: inputIcon,
        clearIcon: inputClearIcon,
        disabled: disabled,
        opened: isCalendarVisible
      });
    }
  }, {
    key: "renderCalendar",
    value: function renderCalendar() {
      var _this$props3 = this.props,
          allowSingleDateSelection = _this$props3.allowSingleDateSelection,
          minDate = _this$props3.minDate,
          maxDate = _this$props3.maxDate,
          calendar = _this$props3.calendar,
          navPrevIcon = _this$props3.navPrevIcon,
          navNextIcon = _this$props3.navNextIcon,
          presetsComponent = _this$props3.presetsComponent,
          presets = _this$props3.presets,
          presetsIcon = _this$props3.presetsIcon,
          buttons = _this$props3.buttons,
          clearText = _this$props3.clearText,
          applyText = _this$props3.applyText;
      var _this$state4 = this.state,
          selectedStartDate = _this$state4.selectedStartDate,
          selectedEndDate = _this$state4.selectedEndDate;
      return (0, _react.cloneElement)(calendar, {
        startDate: selectedStartDate,
        endDate: selectedEndDate,
        onDatesChange: this.handleCalendarDatesChange,
        onApply: this.handleCalendarApply,
        allowSingleDateSelection: allowSingleDateSelection,
        minDate: minDate,
        maxDate: maxDate,
        presetsComponent: presetsComponent,
        presets: presets,
        presetsIcon: presetsIcon,
        buttons: buttons,
        navPrevIcon: navPrevIcon,
        navNextIcon: navNextIcon,
        clearText: clearText,
        applyText: applyText
      });
    }
  }, {
    key: "render",
    value: function render() {
      var disabled = this.props.disabled;
      var isCalendarVisible = this.state.isCalendarVisible;
      return _react["default"].createElement("div", {
        className: this.getCssClasses()
      }, this.renderInput(), !disabled ? _react["default"].createElement("div", {
        className: "relative z-2"
      }, _react["default"].createElement(_reactPopup.Popup, _extends({
        visible: isCalendarVisible,
        onOutsideClick: this.handlePopupClose,
        onEscapeKeyDown: this.handlePopupClose
      }, this.getAnchorDirectionProps()), _react["default"].createElement("div", {
        ref: this._containerRef
      }, this.renderCalendar()))) : null);
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      return (0, _reactComponentsShared.getAutoControlledStateFromProps)(props, state, DateRangePicker.autoControlledProps, function (_ref) {
        var startDate = _ref.startDate,
            endDate = _ref.endDate;
        return {
          selectedStartDate: startDate,
          selectedEndDate: endDate
        };
      });
    }
  }]);

  return DateRangePicker;
}(_reactComponentsShared.AutoControlledPureComponent);

exports.DateRangePicker = DateRangePicker;

_defineProperty(DateRangePicker, "propTypes", {
  startDate: _propTypes.object,
  endDate: _propTypes.object,
  defaultStartDate: _propTypes.object,
  defaultEndDate: _propTypes.object,
  onDatesChange: _propTypes.func.isRequired,
  allowSingleDateSelection: _propTypes.bool,
  minDate: _propTypes.object,
  maxDate: _propTypes.object,
  input: _propTypes.node,
  inputIcon: _propTypes.node,
  inputClearIcon: _propTypes.node,
  placeholder: _propTypes.string,
  rangeFormat: _propTypes.string,
  dateFormat: _propTypes.string,
  anchorDirection: (0, _propTypes.oneOf)([_constants.ANCHOR_LEFT, _constants.ANCHOR_RIGHT]),
  calendar: _propTypes.node,
  navPrevIcon: _propTypes.node,
  navNextIcon: _propTypes.node,
  left: _propTypes.string,
  right: _propTypes.string,
  presetsComponent: _propTypes.node,
  presets: (0, _propTypes.arrayOf)((0, _propTypes.shape)(_presets.PRESET_SHAPE)),
  presetsIcon: _propTypes.node,
  buttons: _propTypes.node,
  clearText: _propTypes.string,
  applyText: _propTypes.string,
  disabled: _propTypes.bool,
  className: _propTypes.string
});

_defineProperty(DateRangePicker, "defaultProps", {
  allowSingleDateSelection: false,
  input: _react["default"].createElement(_dateRangePickerInput.DateRangePickerInput, null),
  inputIcon: _react["default"].createElement(_iconInputCalendar.ReactComponent, null),
  inputClearIcon: _react["default"].createElement(_iconClear.ReactComponent, null),
  placeholder: "Pick a date",
  rangeFormat: "{startDate} - {endDate}",
  dateFormat: "MMM Do YYYY",
  anchorDirection: _constants.ANCHOR_LEFT,
  calendar: _react["default"].createElement(_dateRangePickerCalendar.DateRangePickerCalendar, null),
  navPrevIcon: _react["default"].createElement(_iconNavPrev.ReactComponent, null),
  navNextIcon: _react["default"].createElement(_iconNavNext.ReactComponent, null),
  presetsComponent: _react["default"].createElement(_dateRangePickerPresets.DateRangePickerPresets, null),
  presets: [],
  presetsIcon: _react["default"].createElement(_iconPresetsCalendar.ReactComponent, null),
  buttons: _react["default"].createElement(_dateRangePickerButtons.DateRangePickerButtons, null),
  clearText: "Clear",
  applyText: "Apply",
  disabled: false
});

_defineProperty(DateRangePicker, "autoControlledProps", ["startDate", "endDate"]);

_defineProperty(DateRangePicker, "Input", _dateRangePickerInput.DateRangePickerInput);

_defineProperty(DateRangePicker, "Calendar", _dateRangePickerCalendar.DateRangePickerCalendar);

_defineProperty(DateRangePicker, "Presets", _dateRangePickerPresets.DateRangePickerPresets);

_defineProperty(DateRangePicker, "Buttons", _dateRangePickerButtons.DateRangePickerButtons);