"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isNullOrEmpty = isNullOrEmpty;
exports.isNotNullOrEmpty = isNotNullOrEmpty;

var _lodash = require("lodash");

function isNullOrEmpty(value) {
  return (0, _lodash.isNil)(value) || value === "";
}

function isNotNullOrEmpty(value) {
  return !isNullOrEmpty(value);
}