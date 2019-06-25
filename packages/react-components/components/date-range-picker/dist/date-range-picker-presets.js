"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DateRangePickerPresets = void 0;

var _style = _interopRequireDefault(require("styled-jsx/style"));

var _react = _interopRequireWildcard(require("react"));

var _presets = require("./presets");

var _propTypes = require("prop-types");

var _lodash = require("lodash");

var _utils = require("./utils");

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

var Preset =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Preset, _PureComponent);

  function Preset() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Preset);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Preset)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "handleClick", function (event) {
      var _this$props = _this.props,
          preset = _this$props.preset,
          onSelectPreset = _this$props.onSelectPreset;
      onSelectPreset(event, preset);
    });

    return _this;
  }

  _createClass(Preset, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          preset = _this$props2.preset,
          isSelected = _this$props2.isSelected;
      return _react["default"].createElement("li", null, _react["default"].createElement("button", {
        type: "button",
        onClick: this.handleClick,
        className: (0, _classnames["default"])("f7 jet-dark lh-solid pa2 mb2 outline-0 pointer hover-primary", {
          primary: isSelected
        })
      }, preset.text));
    }
  }]);

  return Preset;
}(_react.PureComponent);

_defineProperty(Preset, "propTypes", {
  preset: (0, _propTypes.shape)(_presets.PRESET_SHAPE).isRequired,
  onSelectPreset: _propTypes.func,
  isSelected: _propTypes.bool
});

var DateRangePickerPresets =
/*#__PURE__*/
function (_PureComponent2) {
  _inherits(DateRangePickerPresets, _PureComponent2);

  function DateRangePickerPresets() {
    _classCallCheck(this, DateRangePickerPresets);

    return _possibleConstructorReturn(this, _getPrototypeOf(DateRangePickerPresets).apply(this, arguments));
  }

  _createClass(DateRangePickerPresets, [{
    key: "renderPresets",
    value: function renderPresets() {
      var _this$props3 = this.props,
          startDate = _this$props3.startDate,
          endDate = _this$props3.endDate,
          onSelectPreset = _this$props3.onSelectPreset,
          presets = _this$props3.presets;
      return presets.map(function (x) {
        var isSelected = (0, _utils.isSameDay)(x.startDate, startDate) && (0, _utils.isSameDay)(x.endDate, endDate);
        return _react["default"].createElement(Preset, {
          key: x.text,
          preset: x,
          onSelectPreset: onSelectPreset,
          isSelected: isSelected
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
          presets = _this$props4.presets,
          icon = _this$props4.icon,
          className = _this$props4.className;
      var defaultClasses = "presets flex flex-column pt8 ph8 br b--cloud-light";
      var classes = (0, _lodash.isNil)(className) ? defaultClasses : "".concat(defaultClasses, " ").concat(className);

      if (presets.length > 0) {
        return _react["default"].createElement("div", {
          className: "jsx-1856604534" + " " + (classes || "")
        }, _react["default"].createElement("div", {
          className: "jsx-1856604534" + " " + "self-center mb8"
        }, icon), _react["default"].createElement("ul", {
          className: "jsx-1856604534"
        }, this.renderPresets()), _react["default"].createElement(_style["default"], {
          id: "1856604534"
        }, ".presets.jsx-1856604534{min-width:200px;}"));
      }

      return null;
    }
  }]);

  return DateRangePickerPresets;
}(_react.PureComponent);

exports.DateRangePickerPresets = DateRangePickerPresets;

_defineProperty(DateRangePickerPresets, "propTypes", {
  startDate: _propTypes.object,
  endDate: _propTypes.object,
  onSelectPreset: _propTypes.func,
  presets: (0, _propTypes.arrayOf)((0, _propTypes.shape)(_presets.PRESET_SHAPE)),
  icon: _propTypes.node,
  className: _propTypes.string
});