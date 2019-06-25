"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSameDay = isSameDay;

var _lodash = require("lodash");

function isSameDay(x, y) {
  if ((0, _lodash.isNil)(x) || (0, _lodash.isNil)(y)) {
    return false;
  }

  return x.date() === y.date() && x.month() === y.month() && x.year() === y.year();
}