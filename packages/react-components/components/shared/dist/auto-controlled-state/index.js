"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _autoControlledState = require("./auto-controlled-state");

Object.keys(_autoControlledState).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _autoControlledState[key];
    }
  });
});