"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IS_DEBUG = exports.IS_PRODUCTION = exports.ENVIRONMENT = void 0;
var ENVIRONMENT = process.env.NODE_ENV;
exports.ENVIRONMENT = ENVIRONMENT;
var IS_PRODUCTION = ENVIRONMENT === "staging" || ENVIRONMENT === "production";
exports.IS_PRODUCTION = IS_PRODUCTION;
var IS_DEBUG = !IS_PRODUCTION;
exports.IS_DEBUG = IS_DEBUG;