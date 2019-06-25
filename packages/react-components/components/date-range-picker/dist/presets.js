"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_DATES_PRESETS = exports.LAST_12_MONTHS_PRESET = exports.LAST_6_MONTHS_PRESET = exports.LAST_3_MONTHS_PRESET = exports.LAST_MONTH_PRESET = exports.LAST_WEEK_PRESET = exports.toPreset = exports.PRESET_SHAPE = void 0;

var _propTypes = require("prop-types");

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PRESET_SHAPE = {
  text: _propTypes.string.isRequired,
  startDate: _propTypes.object.isRequired,
  endDate: _propTypes.object.isRequired
};
exports.PRESET_SHAPE = PRESET_SHAPE;

var toPreset = function toPreset(text, startDate, endDate) {
  return {
    text: text,
    startDate: startDate,
    endDate: endDate
  };
};

exports.toPreset = toPreset;
var LAST_WEEK_PRESET = toPreset("Last week", (0, _moment["default"])().subtract(1, "week"), (0, _moment["default"])().startOf("day"));
exports.LAST_WEEK_PRESET = LAST_WEEK_PRESET;
var LAST_MONTH_PRESET = toPreset("Last month", (0, _moment["default"])().subtract(1, "months"), (0, _moment["default"])().startOf("day"));
exports.LAST_MONTH_PRESET = LAST_MONTH_PRESET;
var LAST_3_MONTHS_PRESET = toPreset("Last 3 months", (0, _moment["default"])().subtract(3, "months"), (0, _moment["default"])().startOf("day"));
exports.LAST_3_MONTHS_PRESET = LAST_3_MONTHS_PRESET;
var LAST_6_MONTHS_PRESET = toPreset("Last 6 months", (0, _moment["default"])().subtract(6, "months"), (0, _moment["default"])().startOf("day"));
exports.LAST_6_MONTHS_PRESET = LAST_6_MONTHS_PRESET;
var LAST_12_MONTHS_PRESET = toPreset("Last 12 months", (0, _moment["default"])().subtract(12, "months"), (0, _moment["default"])().startOf("day")); // prettier-ignore

exports.LAST_12_MONTHS_PRESET = LAST_12_MONTHS_PRESET;
var DEFAULT_DATES_PRESETS = [LAST_WEEK_PRESET, LAST_MONTH_PRESET, LAST_3_MONTHS_PRESET, LAST_6_MONTHS_PRESET, LAST_12_MONTHS_PRESET];
exports.DEFAULT_DATES_PRESETS = DEFAULT_DATES_PRESETS;