"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.template = template;

/**
 * Tagged template literals that create a dynamic string template.
 * For more informations view https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals.
 * @param {string} strings - The template.
 * @param {...string} key - The interpolation keys.
 * @return {function} A function that accept the dynamic values and return the formatted string.
 * @example
 * function log(messageTemplate) {
 *     console.log(messageTemplate("John"));
 * }
 *
 * log(template`Hello ${0}!`); -> // Hello John!
 */
function template(strings) {
  for (var _len = arguments.length, keys = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    keys[_key - 1] = arguments[_key];
  }

  return function () {
    for (var _len2 = arguments.length, values = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      values[_key2] = arguments[_key2];
    }

    var result = [strings[0]];
    keys.forEach(function (key, i) {
      result.push(values[key], strings[i + 1]);
    });
    return result.join("");
  };
}