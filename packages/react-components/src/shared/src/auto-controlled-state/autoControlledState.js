import { IS_PRODUCTION } from "../OLD_env";
import { PureComponent } from "react";
import { difference, isFunction, isNil, isUndefined } from "lodash";

/*
 * How to develop an auto controlled component to support "controlled" and "uncontrolled" values properties.
 *
 * - Extends your component class with "AutoControlledPureComponent" instead of "PureComponent".
 * - Define a static string property "name" on your component.
 * - Define a static array property "autoControlledProps" on your component. The array should contain the name of every value properties that should be auto controlled.
 * - Define a default value for every auto controlled properties (using defaultProps).
 * - Define a propType for every auto controlled properties (using propTypes).
 * - In your component "getDerivedStateFromProps" function, use "getAutoControlledStateFromProps".
 * - Everytime you want to update the state of a value property, instead of using "this.setState", use "this.trySetAutoControlledStateValue".
 * - Get your controlled or uncontrolled value from the state.
 */

const AUTO_CONTROLLED_PROPS_NAME = "autoControlledProps";

function getDefaultPropName(prop) {
    return `default${prop[0].toUpperCase()}${prop.slice(1)}`;
}

function getStateAutoControlledProps(state) {
    return state[AUTO_CONTROLLED_PROPS_NAME];
}

class AutoControlledStateBuilder {
    state = {
        [AUTO_CONTROLLED_PROPS_NAME]: []
    };

    hasNewValues = false;

    addValue(name, value) {
        this.state[name] = value;
        this.hasNewValues = true;
    }

    addAutoControlledValue(name, value, hasChanged) {
        this.state[name] = value;
        this.state[AUTO_CONTROLLED_PROPS_NAME].push(name);

        if (hasChanged) {
            this.hasNewValues = true;
        }
    }
}

function ensureAutoControlledPropsHasNotChanged(newProps, lastProps) {
    const illegaProps = difference(newProps, lastProps);

    if (illegaProps.length !== 0) {
        throw new Error(
            `ensureAutoControlledPropsHasNotChanged - ${illegaProps.join(",")} were not controlled during the previous rendering. A property cannot switch between "controlled" and "uncontrolled" mode. Did you forgot to set a default value to your controlled prop?`
        );
    }
}

/**
 * Compute the state for the auto controlled properties.
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
 *          TagsPicker.autoControlledProps,
 *          ({ values }) => computeDerivedState(items, values));
 * }
 */
export function getAutoControlledStateFromProps(props, state, autoControlledProps, getDerivedStateFromProps) {
    // ensure(props, "props", `${AutoControlledPureComponent.name}.getDerivedAutoControlledStateFromProps`).isNotNull();
    // ensure(state, "state", `${AutoControlledPureComponent.name}.getDerivedAutoControlledStateFromProps`).isNotNull();
    // ensure(autoControlledProps, `autoControlledProps", "${AutoControlledPureComponent.name}.getDerivedAutoControlledStateFromProps`).isNotNull();
    // ensure(getDerivedStateFromProps, `getDerivedStateFromProps", "${AutoControlledPureComponent.name}.getDerivedAutoControlledStateFromProps`).isFunction();

    const lastAutoControlledProps = getStateAutoControlledProps(state);
    const isInitialState = isUndefined(lastAutoControlledProps);

    const stateBuilder = new AutoControlledStateBuilder();

    autoControlledProps.forEach(name => {
        const propsValue = props[name];
        const stateValue = state[name];

        if (isUndefined(propsValue)) {
            // This prop is "uncontrolled".
            if (isInitialState) {
                const defaultValue = props[getDefaultPropName(name)];

                if (!isUndefined(defaultValue)) {
                    stateBuilder.addValue(name, defaultValue);
                } else {
                    stateBuilder.addValue(name, stateValue);
                }
            }
        } else {
            // This prop is "controlled".
            if (!IS_PRODUCTION) {
                const defaultPropName = getDefaultPropName(name);

                if (!isUndefined(props[defaultPropName])) {
                    throw new Error(
                        `${AutoControlledPureComponent.name}.getAutoControlledStateFromProps - ${name} prop is auto controlled. Specify either ${name} or ${defaultPropName}, but not both.`
                    );
                }
            }

            stateBuilder.addAutoControlledValue(name, propsValue, propsValue !== stateValue);
        }
    });

    // Always compute the derived state for the initial state because the controlled props initial values might be the same as the component default values.
    if (stateBuilder.hasNewValues || isInitialState) {
        if (!isInitialState) {
            ensureAutoControlledPropsHasNotChanged(getStateAutoControlledProps(stateBuilder.state), lastAutoControlledProps);
        }

        const derivedState = stateBuilder.state;

        if (!isNil(getDerivedStateFromProps)) {
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
export class AutoControlledPureComponent extends PureComponent {
    constructor(...args) {
        super(...args);

        if (!IS_PRODUCTION) {
            // eslint-disable-next-line react/forbid-foreign-prop-types
            const { autoControlledProps, defaultProps, name, propTypes } = this.constructor;

            if (isUndefined(name)) {
                throw new Error(`${AutoControlledPureComponent.name}.ctor - Auto controlled component is missing a static "name" property.`);
            }

            if (isUndefined(autoControlledProps)) {
                throw new Error(`${AutoControlledPureComponent.name}.ctor - Auto controlled component is missing a static "autoControlledProps" property.`);
            }

            if (isUndefined(propTypes)) {
                throw Error(`${AutoControlledPureComponent.name}.ctor - Auto controlled components is missing propTypes`);
            }

            // Validate that auto controlled props
            //   - have propTypes validation.
            //   - doesn't have a default values.
            autoControlledProps.forEach(prop => {
                const defaultProp = getDefaultPropName(prop);

                if (!propTypes.hasOwnProperty(defaultProp)) {
                    throw new Error(`${name} is missing "${defaultProp}" propTypes validation for auto controlled prop "${prop}".`);
                }

                if (!propTypes.hasOwnProperty(prop)) {
                    throw new Error(`${name} is missing propTypes validation for auto controlled prop "${prop}".`);
                }

                if (defaultProps.hasOwnProperty(defaultProp)) {
                    throw new Error(`${name} shouldn't have "${defaultProp}" default prop for auto controlled prop "${prop}".`);
                }

                if (defaultProps.hasOwnProperty(prop)) {
                    throw new Error(`${name} shouldn't have a default prop for auto controlled prop "${prop}".`);
                }
            });
        }
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
    trySetAutoControlledStateValue(maybeState, derivedState) {
        const { name } = this.constructor;

        const { [AUTO_CONTROLLED_PROPS_NAME]: autoControlledProps } = this.state;

        // ensure(maybeState, "maybeState", `${name}.trySetAutoControlledStateValue`).isNotNull();

        if (isUndefined(autoControlledProps)) {
            throw new Error(
                `${name}.trySetAutoControlledStateValue - "autoControlledProps" are not part of the state. Did you setup "${AutoControlledPureComponent.name}.getDerivedAutoControlledStateFromProps" in "getDerivedStateFromProps" ?`
            );
        }

        const newState = {};
        const keys = Object.keys(maybeState);

        if (keys.length !== 1) {
            throw new Error(`${name}.trySetAutoControlledStateValue - Only one state property can be provided by entry. If you want to update multiple properties, use the "array" syntax.`);
        }

        const key = keys[0];

        if (!autoControlledProps.includes(key)) {
            // The prop is not auto controlled this time, add it to the state object.
            Object.assign(newState, maybeState);

            if (!isNil(derivedState)) {
                // Derived state is provided, add it to the state object.
                Object.assign(newState, isFunction(derivedState) ? derivedState() : derivedState);
            }
        }

        this.setState(newState);
    }
}
