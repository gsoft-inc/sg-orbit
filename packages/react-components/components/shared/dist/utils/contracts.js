"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensure = ensure;

var _throwableErrors = require("./throwable-errors");

var _env = require("./env");

var _lodash = require("lodash");

var _types = require("./types");

var _strings = require("./strings");

function _templateObject11() {
  var data = _taggedTemplateLiteral(["", "", " is invalid."]);

  _templateObject11 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10() {
  var data = _taggedTemplateLiteral(["", "", " must be a number."]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = _taggedTemplateLiteral(["", "", " must be a plain object."]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _taggedTemplateLiteral(["", "", " must be an object."]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["", "", " must be an array."]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["", "", " must be a string."]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["", "", " must be a function."]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["", "", " cannot be empty."]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["", "", " cannot be null."]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["", "", " cannot be empty."]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["", "", " cannot be null."]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var ASSERTION_DEFINITIONS = {
  /**
   * @example
   * ensure(parameter, "Optional parameter name", "Optional context").isNotNull("Optional specific message");
   */
  isNotNull: function isNotNull(parameter, parameterName, context, assertionMessage) {
    if ((0, _lodash.isNil)(parameter)) {
      var message = getMessage(assertionMessage, (0, _strings.template)(_templateObject(), 0, 1), parameterName, context);
      throw new _throwableErrors.ArgumentNullError(parameterName, message);
    }
  },

  /**
   * @example
   * ensure(parameter, "Optional parameter name", "Optional context").isNotEmpty("Optional specific message");
   */
  isNotEmpty: function isNotEmpty(parameter, parameterName, context, assertionMessage) {
    var isValid = false;

    if (!(0, _lodash.isNil)(parameter)) {
      isValid = true;
    } else if ((0, _lodash.isArray)(parameter)) {
      isValid = parameter.length > 0;
    } else {
      isValid = parameter !== "";
    }

    if (!isValid) {
      var message = getMessage(assertionMessage, (0, _strings.template)(_templateObject2(), 0, 1), parameterName, context);
      throw new _throwableErrors.ArgumentError(message);
    }
  },

  /**
   * @example
   * ensure(parameter, "Optional parameter name", "Optional context").isNotNullOrEmpty("Optional specific message");
   */
  isNotNullOrEmpty: function isNotNullOrEmpty(parameter, parameterName, context, assertionMessage) {
    var message = "";

    if ((0, _lodash.isNil)(parameter)) {
      message = getMessage(assertionMessage, (0, _strings.template)(_templateObject3(), 0, 1), parameterName, context);
      throw new _throwableErrors.ArgumentNullError(parameterName, message);
    }

    if (parameter === "") {
      message = getMessage(assertionMessage, (0, _strings.template)(_templateObject4(), 0, 1), parameterName, context);
      throw new _throwableErrors.ArgumentError(message);
    }
  },

  /**
   * @example
   * ensure(parameter, "Optional parameter name", "Optional context").isFunction("Optional specific message");
   */
  isFunction: function isFunction(parameter, parameterName, context, assertionMessage) {
    if (!(0, _lodash.isNil)(parameter) && !(0, _lodash.isFunction)(parameter)) {
      var message = getMessage(assertionMessage, (0, _strings.template)(_templateObject5(), 0, 1), parameterName, context);
      throw new _throwableErrors.ArgumentError(message);
    }
  },

  /**
   * @example
   * ensure(parameter, "Optional parameter name", "Optional context").isString("Optional specific message");
   */
  isString: function isString(parameter, parameterName, context, assertionMessage) {
    if (!(0, _lodash.isNil)(parameter) && !(0, _lodash.isString)(parameter)) {
      var message = getMessage(assertionMessage, (0, _strings.template)(_templateObject6(), 0, 1), parameterName, context);
      throw new _throwableErrors.ArgumentError(message);
    }
  },

  /**
   * @example
   * ensure(parameter, "Optional parameter name", "Optional context").isArray("Optional specific message");
   */
  isArray: function isArray(parameter, parameterName, context, assertionMessage) {
    if (!(0, _lodash.isNil)(parameter) && !(0, _lodash.isArray)(parameter)) {
      var message = getMessage(assertionMessage, (0, _strings.template)(_templateObject7(), 0, 1), parameterName, context);
      throw new _throwableErrors.ArgumentError(message);
    }
  },

  /**
   * @example
   * ensure(parameter, "Optional parameter name", "Optional context").isObject("Optional specific message");
   */
  isObject: function isObject(parameter, parameterName, context, assertionMessage) {
    if (!(0, _lodash.isNil)(parameter) && !(0, _lodash.isObject)(parameter)) {
      var message = getMessage(assertionMessage, (0, _strings.template)(_templateObject8(), 0, 1), parameterName, context);
      throw new _throwableErrors.ArgumentError(message);
    }
  },

  /**
   * @example
   * ensure(parameter, "Optional parameter name", "Optional context").isPlainObject("Optional specific message");
   */
  isPlainObject: function isPlainObject(parameter, parameterName, context, assertionMessage) {
    if (!(0, _lodash.isNil)(parameter) && !(0, _lodash.isPlainObject)(parameter)) {
      var message = getMessage(assertionMessage, (0, _strings.template)(_templateObject9(), 0, 1), parameterName, context);
      throw new _throwableErrors.ArgumentError(message);
    }
  },

  /**
   * @example
   * ensure(parameter, "Optional parameter name", "Optional context").isNumber("Optional specific message");
   */
  isNumber: function isNumber(parameter, parameterName, context, assertionMessage) {
    if (!(0, _lodash.isNil)(parameter) && !(0, _lodash.isInteger)(parameter)) {
      var message = getMessage(assertionMessage, (0, _strings.template)(_templateObject10(), 0, 1), parameterName, context);
      throw new _throwableErrors.ArgumentError(message);
    }
  },

  /**
   * @example
   * ensure(parameter, "Optional parameter name", "Optional context").isTrue(// Can be a boolean or a function // () => { return true; }, "Optional specific message");
   */
  isTrue: function isTrue(parameter, parameterName, context, evaluator, assertionMessage) {
    var fct = evaluator;

    if (!(0, _lodash.isFunction)(evaluator)) {
      fct = function fct(x) {
        return !!x;
      };
    }

    if (!(0, _lodash.isNil)(parameter) && !fct(parameter)) {
      var message = getMessage(assertionMessage, (0, _strings.template)(_templateObject11(), 0, 1), parameterName, context);
      throw new _throwableErrors.ArgumentError(message);
    }
  }
};

function getMessage(assertionMessage, defaultMessageTemplate, parameterName, context) {
  var message = assertionMessage;

  if ((0, _types.isNullOrEmpty)(message)) {
    var param1 = (0, _types.isNullOrEmpty)(context) ? "" : "".concat(context, " - ");
    var param2 = (0, _types.isNullOrEmpty)(parameterName) ? "Parameter" : parameterName;
    message = defaultMessageTemplate(param1, param2);
  }

  return message;
}
/**
 * Ensure that a parameter respect the specified assertions.
 * @param {string} parameter - The parameter to verify.
 * @param {string} parameterName - The name of the parameter to verify.
 * @param {string} [context] - An identifier providing more information about the context of the call to ensure.
 * @return {Object} An object that contains all the assertions functions.
 * @example
 * ensure(parameter, "Optional parameter name", "Optional context")
 *      .isNotNull("Optional specific message")
 *      .isNotEmpty("Optional specific message")
 *      .isString("Optional specific message");
 */


function ensure(parameter, parameterName, context) {
  var assertions = {};

  var getAssertionProxy = function getAssertionProxy(assertion) {
    return function () {
      if (!_env.IS_PRODUCTION) {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        assertion.apply(void 0, [parameter, parameterName, context].concat(args));
      }

      return assertions;
    };
  }; // Wrap all the assertions to append the default arguments to the function arguments.


  (0, _lodash.forOwn)(ASSERTION_DEFINITIONS, function (assertion, assertionKey) {
    assertions[assertionKey] = getAssertionProxy(assertion);
  });
  return assertions;
}