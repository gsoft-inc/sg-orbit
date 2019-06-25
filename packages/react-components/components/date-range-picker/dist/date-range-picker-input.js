"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DateRangePickerInput = void 0;

var _style = _interopRequireDefault(require("styled-jsx/style"));

var _react = _interopRequireWildcard(require("react"));

var _semanticUiReact = require("semantic-ui-react");

var _propTypes = require("prop-types");

var _lodash = require("lodash");

var _classnames = _interopRequireDefault(require("classnames"));

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

var DateRangePickerInput =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(DateRangePickerInput, _PureComponent);

  function DateRangePickerInput() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DateRangePickerInput);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DateRangePickerInput)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "_clearButtonRef", (0, _react.createRef)());

    _defineProperty(_assertThisInitialized(_this), "handleClick", function (event) {
      var onClick = _this.props.onClick;

      if (!_this._clearButtonRef.current.contains(event.target)) {
        onClick(event);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleClear", function (event) {
      var onClear = _this.props.onClear;
      onClear(event);
    });

    return _this;
  }

  _createClass(DateRangePickerInput, [{
    key: "getValue",
    value: function getValue() {
      var _this$props = this.props,
          startDate = _this$props.startDate,
          endDate = _this$props.endDate,
          placeholder = _this$props.placeholder,
          rangeFormat = _this$props.rangeFormat,
          dateFormat = _this$props.dateFormat;

      var result = function result(text, isPlaceholder) {
        return {
          text: text,
          isPlaceholder: isPlaceholder
        };
      };

      if (!(0, _lodash.isNil)(startDate)) {
        if (!(0, _lodash.isNil)(endDate)) {
          return result(rangeFormat.replace("{startDate}", startDate.format(dateFormat)).replace("{endDate}", endDate.format(dateFormat)), false);
        }

        return result(startDate.format(dateFormat));
      }

      return result(placeholder, true);
    }
  }, {
    key: "getCssClasses",
    value: function getCssClasses(value) {
      var _this$props2 = this.props,
          disabled = _this$props2.disabled,
          opened = _this$props2.opened,
          className = _this$props2.className;
      var openedClasses = opened && !disabled ? " b--jet-dark jet-dark" : " b--cloud marine-lightest";
      var disabledClasses = (0, _classnames["default"])({
        "bg-cloud-light cloud-dark crsr-not-allowed": disabled
      });
      var placeholderClasses = (0, _classnames["default"])({
        "jet-dark": !value.isPlaceholder && !disabled
      });
      var defaultClasses = "input pv3 ph4 ba outline-0 f6 h9 br2 flex items-center ".concat(openedClasses, " ").concat(placeholderClasses, " ").concat(disabledClasses);
      return (0, _lodash.isNil)(className) ? defaultClasses : "".concat(defaultClasses, " ").concat(className);
    }
  }, {
    key: "renderIcon",
    value: function renderIcon() {
      var icon = this.props.icon;
      var disabled = this.props.disabled;
      return (0, _react.cloneElement)(icon, {
        className: "".concat(disabled ? " fill-cloud" : " fill-jet-dark", " mr4")
      });
    }
  }, {
    key: "renderClearButton",
    value: function renderClearButton(value) {
      var _this$props3 = this.props,
          clearIcon = _this$props3.clearIcon,
          disabled = _this$props3.disabled,
          opened = _this$props3.opened;
      return _react["default"].createElement("div", {
        className: (0, _classnames["default"])({
          dn: value.isPlaceholder || disabled || opened
        })
      }, _react["default"].createElement(_semanticUiReact.Ref, {
        innerRef: this._clearButtonRef
      }, _react["default"].createElement(_semanticUiReact.Button, {
        circular: true,
        size: "mini",
        primary: true,
        icon: true,
        className: "transparent",
        onClick: this.handleClear
      }, clearIcon)));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
          onKeyDown = _this$props4.onKeyDown,
          disabled = _this$props4.disabled;
      var value = this.getValue(); // prettier-ignore

      return _react["default"].createElement("div", {
        onClick: this.handleClick,
        onKeyDown: onKeyDown,
        tabIndex: disabled ? null : "0",
        autoComplete: "off",
        disabled: disabled,
        className: "jsx-3084311687" + " " + (this.getCssClasses(value) || "")
      }, this.renderIcon(), _react["default"].createElement("span", {
        className: "jsx-3084311687" + " " + "flex-grow-1"
      }, value.text), this.renderClearButton(value), _react["default"].createElement(_style["default"], {
        id: "3084311687"
      }, ".input.jsx-3084311687:not(\"disabled\"){cursor:text;}.input.jsx-3084311687:focus{border:1px solid var(--jet-dark);color:var(--jet-dark);}"));
    }
  }]);

  return DateRangePickerInput;
}(_react.PureComponent);

exports.DateRangePickerInput = DateRangePickerInput;

_defineProperty(DateRangePickerInput, "propTypes", {
  startDate: _propTypes.object,
  endDate: _propTypes.object,
  onClick: _propTypes.func,
  onClear: _propTypes.func,
  onKeyDown: _propTypes.func,
  placeholder: _propTypes.string,
  rangeFormat: _propTypes.string,
  dateFormat: _propTypes.string,
  icon: _propTypes.node,
  clearIcon: _propTypes.node,
  disabled: _propTypes.bool,
  opened: _propTypes.bool,
  className: _propTypes.string
});