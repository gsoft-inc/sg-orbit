"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAutoControlledStateFromProps = getAutoControlledStateFromProps;
exports.AutoControlledPureComponent = void 0;

var _utils = require("../utils");

var _react = require("react");

var _lodash = require("lodash");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
 * How to to develop an auto controlled component to support "controlled" and "uncontrolled" values properties.
 *
 * - Extends your component class with "AutoControlledPureComponent" instead of "PureComponent".
 * - Define a static string property "name" on your component.
 * - Define a static array property "autoControlledProps" on your component. The array should contain the name of every value properties that should be auto controlled.
 * - Define a default value for every auto controlled properties (using defaultProps).
 * - Define a propType for every auto controlled properties (using propTypes).
 * - In your component "getDerivedStateFromProps" function, use "getAutoControlledStateFromProps".
 * - Everytime you want to update the state of a value property, instead of using "this.setState", use "this.trySetAutoControlledStateValue".
 */
var AUTO_CONTROLLED_PROPS_NAME = "autoControlledProps";

function getDefaultPropName(prop) {
  return "default".concat(prop[0].toUpperCase()).concat(prop.slice(1));
}

function getStateAutoControlledProps(state) {
  return state[AUTO_CONTROLLED_PROPS_NAME];
}

var AutoControlledStateBuilder =
/*#__PURE__*/
function () {
  function AutoControlledStateBuilder() {
    _classCallCheck(this, AutoControlledStateBuilder);

    _defineProperty(this, "state", _defineProperty({}, AUTO_CONTROLLED_PROPS_NAME, []));

    _defineProperty(this, "hasNewValues", false);
  }

  _createClass(AutoControlledStateBuilder, [{
    key: "addValue",
    value: function addValue(name, value) {
      this.state[name] = value;
      this.hasNewValues = true;
    }
  }, {
    key: "addAutoControlledValue",
    value: function addAutoControlledValue(name, value, hasChanged) {
      this.state[name] = value;
      this.state[AUTO_CONTROLLED_PROPS_NAME].push(name);

      if (hasChanged) {
        this.hasNewValues = true;
      }
    }
  }]);

  return AutoControlledStateBuilder;
}();

function ensureAutoControlledPropsHasNotChanged(newProps, lastProps) {
  var illegaProps = (0, _lodash.difference)(newProps, lastProps);

  if (illegaProps.length !== 0) {
    throw new Error( // prettier-ignore
    "ensureAutoControlledPropsHasNotChanged - ".concat(illegaProps.join(","), " were not controlled during the previous rendering. A property cannot switch between \"controlled\" and \"uncontrolled\" mode. Did you forgot to set a default value to your controlled prop?"));
  }
}
/**
 * Computed the state for the auto controlled properties.
 * The initial value is chosen in this order:
 *  - regular props
 *  - then, default props
 *  - then, initial state
 *  - else, undefined
 * @param {Object} props - The props provided in getDerivedStateFromProps.
 * @param {Object} state - The state provided in getDerivedStateFromProps.
 * @param {string[]} autoControlledProps - The list of auto controlled props.
 * @param {function} [getDerivedStateFromProps] - Provide additionnal values to store in the derived state.
 * @example
 * static getDerivedStateFromProps(props, state) {
 *      const { items } = props;
 *
 *      return getAutoControlledStateFromProps(
 *          props,
 *          state,
 *          MultiSelect.autoControlledProps,
 *          ({ values }) => computeDerivedState(items, values));
 * }
 */


function getAutoControlledStateFromProps(props, state, autoControlledProps, getDerivedStateFromProps) {
  (0, _utils.ensure)(props, "props", "".concat(AutoControlledPureComponent.name, ".getDerivedAutoControlledStateFromProps")).isNotNull();
  (0, _utils.ensure)(state, "state", "".concat(AutoControlledPureComponent.name, ".getDerivedAutoControlledStateFromProps")).isNotNull();
  (0, _utils.ensure)(autoControlledProps, "autoControlledProps\", \"".concat(AutoControlledPureComponent.name, ".getDerivedAutoControlledStateFromProps")).isNotNull();
  (0, _utils.ensure)(getDerivedStateFromProps, "getDerivedStateFromProps\", \"".concat(AutoControlledPureComponent.name, ".getDerivedAutoControlledStateFromProps")).isFunction();
  var lastAutoControlledProps = getStateAutoControlledProps(state);
  var isInitialState = (0, _lodash.isUndefined)(lastAutoControlledProps);
  var stateBuilder = new AutoControlledStateBuilder();
  autoControlledProps.forEach(function (name) {
    var propsValue = props[name];
    var stateValue = state[name];

    if ((0, _lodash.isUndefined)(propsValue)) {
      // This prop is "uncontrolled".
      if (isInitialState) {
        var defaultValue = props[getDefaultPropName(name)];

        if (!(0, _lodash.isUndefined)(defaultValue)) {
          stateBuilder.addValue(name, defaultValue);
        } else {
          stateBuilder.addValue(name, stateValue);
        }
      }
    } else {
      // This prop is "controlled".
      if (!_utils.IS_PRODUCTION) {
        var defaultPropName = getDefaultPropName(name);

        if (!(0, _lodash.isUndefined)(props[defaultPropName])) {
          throw new Error("".concat(AutoControlledPureComponent.name, ".getAutoControlledStateFromProps - ").concat(name, " prop is auto controlled. Specify either ").concat(name, " or ").concat(defaultPropName, ", but not both."));
        }
      }

      stateBuilder.addAutoControlledValue(name, propsValue, propsValue !== stateValue);
    }
  }); // Always compute the derived state for the initial state because the controlled props initial values might be the same at the component default values.

  if (stateBuilder.hasNewValues || isInitialState) {
    if (!isInitialState) {
      ensureAutoControlledPropsHasNotChanged(getStateAutoControlledProps(stateBuilder.state), lastAutoControlledProps);
    }

    var derivedState = stateBuilder.state;

    if (!(0, _lodash.isNil)(getDerivedStateFromProps)) {
      Object.assign(derivedState, getDerivedStateFromProps(stateBuilder.state));
    }

    return derivedState;
  }

  return null;
}
/**
 * This is a similar implementation of Semantic UI React "AutoControlledComponent" base component: https://github.com/Semantic-Org/Semantic-UI-React/blob/master/src/lib/AutoControlledComponent.js.
 * The goal of this class is to seemlessly support "controlled" and "uncontrolled" component behaviors by abstracting this complexity in this class.
 * This is achieved by setting the controlled values from the props in the state.
 */


var AutoControlledPureComponent =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(AutoControlledPureComponent, _PureComponent);

  function AutoControlledPureComponent() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, AutoControlledPureComponent);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(AutoControlledPureComponent)).call.apply(_getPrototypeOf2, [this].concat(args)));

    if (!_utils.IS_PRODUCTION) {
      // eslint-disable-next-line react/forbid-foreign-prop-types
      var _this$constructor = _this.constructor,
          autoControlledProps = _this$constructor.autoControlledProps,
          defaultProps = _this$constructor.defaultProps,
          name = _this$constructor.name,
          propTypes = _this$constructor.propTypes;

      if ((0, _lodash.isUndefined)(name)) {
        throw new Error("".concat(AutoControlledPureComponent.name, ".ctor - Auto controlled component is missing a static \"name\" property."));
      }

      if ((0, _lodash.isUndefined)(autoControlledProps)) {
        throw new Error("".concat(AutoControlledPureComponent.name, ".ctor - Auto controlled component is missing a static \"autoControlledProps\" property."));
      }

      if ((0, _lodash.isUndefined)(propTypes)) {
        throw Error();
      } // Validate that auto controlled props
      //   - have propTypes validation.
      //   - doesn't have a default values.


      autoControlledProps.forEach(function (prop) {
        var defaultProp = getDefaultPropName(prop);

        if (!propTypes.hasOwnProperty(defaultProp)) {
          throw new Error("".concat(name, " is missing \"").concat(defaultProp, "\" propTypes validation for auto controlled prop \"").concat(prop, "\"."));
        }

        if (!propTypes.hasOwnProperty(prop)) {
          throw new Error("".concat(name, " is missing propTypes validation for auto controlled prop \"").concat(prop, "\"."));
        }

        if (defaultProps.hasOwnProperty(defaultProp)) {
          throw new Error("".concat(name, " shouldn't have \"").concat(defaultProp, "\" default prop for auto controlled prop \"").concat(prop, "\"."));
        }

        if (defaultProps.hasOwnProperty(prop)) {
          throw new Error("".concat(name, " shouldn't have a default prop for auto controlled prop \"").concat(prop, "\"."));
        }
      });
    }

    return _this;
  }
  /**
   * Safely attempt to set state for auto controlled props that might be controlled by the consumer.
   * When the prop is uncontrolled, the state will be updated with the value, otherwise ignored.
   *
   * NOTE: You can only update a single property by call.
   * @param {Object} maybeState - State that corresponds to auto controlled props.
   * @param {Object|function} [derivedState] - Additionnal derived state to add to the state only if the prop is uncontrolled.
   * @example
   * this.trySetAutoControlledStateValue({ values: newValues }, () => { anotherValues: { .. } });
   */


  _createClass(AutoControlledPureComponent, [{
    key: "trySetAutoControlledStateValue",
    value: function trySetAutoControlledStateValue(maybeState, derivedState) {
      var name = this.constructor.name;
      var autoControlledProps = this.state[AUTO_CONTROLLED_PROPS_NAME];
      (0, _utils.ensure)(maybeState, "maybeState", "".concat(name, ".trySetAutoControlledStateValue")).isNotNull();

      if ((0, _lodash.isUndefined)(autoControlledProps)) {
        throw new Error( // prettier-ignore
        "".concat(name, ".trySetAutoControlledStateValue - \"autoControlledProps\" are not part of the state. Did you setup \"").concat(AutoControlledPureComponent.name, ".getDerivedAutoControlledStateFromProps\" in \"getDerivedStateFromProps\" ?"));
      }

      var newState = {};
      var keys = Object.keys(maybeState);

      if (keys.length !== 1) {
        throw new Error("".concat(name, ".trySetAutoControlledStateValue - Only one state property can be provided by entry. If you want to update multiple properties, use the \"array\" syntax."));
      }

      var key = keys[0];

      if (!autoControlledProps.includes(key)) {
        // The prop is not auto controlled this time, add it to the state object.
        Object.assign(newState, maybeState);

        if (!(0, _lodash.isNil)(derivedState)) {
          // Derived state is provided, add it to the state object.
          Object.assign(newState, (0, _lodash.isFunction)(derivedState) ? derivedState() : derivedState);
        }
      }

      this.setState(newState);
    }
  }]);

  return AutoControlledPureComponent;
}(_react.PureComponent);

exports.AutoControlledPureComponent = AutoControlledPureComponent;