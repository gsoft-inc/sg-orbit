"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _popup = require("./popup");

Object.keys(_popup).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _popup[key];
    }
  });
});