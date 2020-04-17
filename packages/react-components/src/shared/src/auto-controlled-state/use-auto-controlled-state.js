import { IS_PRODUCTION } from "../env";
import { difference, isFunction, isNil, isUndefined } from "lodash";
import { ensure } from "../contracts";
import { useCallback, useState } from "react";

function getDefaultPropName(prop) {
    return `default${prop[0].toUpperCase()}${prop.slice(1)}`;
}

function areEqual(newValue, currentValue) {
    // Using the Object.is algorithm since this is what React hooks setState is also using for comparison.
    // For more info: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is#Description
    return Object.is(newValue, currentValue);
}

function validatePrerequisites(autoControlledProps, componentDefaultProps) {
    if (!IS_PRODUCTION) {
        // Validate that auto controlled props
        //   - doesn't have default values.
        Object.keys(autoControlledProps).forEach(propName => {
            const defaultProp = getDefaultPropName(propName);

            if (!isNil(componentDefaultProps)) {
                if (componentDefaultProps.hasOwnProperty(defaultProp)) {
                    throw new Error(`Auto controlled prop "${propName}" shouldn't have a default value for ${defaultProp}.`);
                }

                if (componentDefaultProps.hasOwnProperty(propName)) {
                    throw new Error(`Auto controlled prop "${propName}" shouldn't have a default value.`);
                }
            }
        });
    }
}

function ensureControlledPropsHaveNotChanged(newProps, lastProps) {
    const illegalProps = difference(newProps, lastProps);

    if (illegalProps.length !== 0) {
        throw new Error(
            // eslint-disable-next-line max-len
            `useAutoControlledProps.ensureControlledPropsHaveNotChanged - "${illegalProps.join(",")}" prop${illegalProps.length > 1 ? "s were" : " was"} not controlled during the previous rendering. A property cannot switch between "controlled" and "uncontrolled" mode. Did you inadvertently set a default value for your controlled prop?`
        );
    }
}

function computeInitialState(autoControlledProps, componentProps) {
    const state = {};
    const controlledProps = [];

    Object.keys(autoControlledProps).forEach(propName => {
        const defaultValue = autoControlledProps[propName];
        const propsValue = componentProps[propName];

        if (isUndefined(propsValue)) {
            // This prop is "uncontrolled".
            const defaultPropValue = componentProps[getDefaultPropName(propName)];
            const value = !isUndefined(defaultPropValue) ? defaultPropValue : defaultValue;

            state[propName] = value;
        } else {
            // This prop is "controlled".
            if (!IS_PRODUCTION) {
                const defaultPropName = getDefaultPropName(propName);

                if (!isUndefined(componentProps[defaultPropName])) {
                    throw new Error(
                        `useAutoControlledState.computeNewState - "${propName}" prop is auto controlled. Specify either "${propName}" or "${defaultPropName}", but not both.`
                    );
                }
            }

            controlledProps.push(propName);
            state[propName] = propsValue;
        }
    });

    return {
        state,
        controlledProps
    };
}

function computeStateFromProps(autoControlledProps, componentProps, currentState) {
    const newState = Object.assign({}, currentState);
    const newControlledProps = [];

    let hasChanges = false;

    Object.keys(autoControlledProps).forEach(propName => {
        const propsValue = componentProps[propName];

        if (!isUndefined(propsValue)) {
            // This prop is "controlled".
            newControlledProps.push(propName);

            if (!areEqual(propsValue, currentState[propName])) {
                newState[propName] = propsValue;
                hasChanges = true;
            }
        }
    });

    return {
        newState,
        newControlledProps,
        hasChanges
    };
}

function computeStateForSet(maybeState, currentState, controlledProps) {
    const newState = Object.assign({}, currentState);
    let hasChanges = false;

    Object.keys(maybeState).forEach(propName => {
        if (!controlledProps.includes(propName)) {
            const maybeValue = maybeState[propName];

            if (!areEqual(maybeValue, currentState[propName])) {
                newState[propName] = maybeValue;
                hasChanges = true;
            }
        }
    });

    return {
        newState,
        hasChanges
    };
}

function notifyStateChanged(newState, isInitialState, handler) {
    if (isFunction(handler)) {
        handler(newState, isInitialState);
    }
}

/**
 * Safely attempt to set state for auto controlled props that might be "controlled" by the consumer.
 * When the prop is "uncontrolled", the state will be updated with the value, otherwise ignored.
 *
 * @param {Object} maybeState - Props to update.
 * @example
 * setAutoControlledProps({
 *      open: true,
 *      values: ["Neil Armstrong"]
 * });
 */
function setAutoControlledState(maybeState, currentState, setState, controlledProps, onChange) {
    ensure(maybeState, "maybeState", "useAutoControlledProps.setAutoControlledState").isPlainObject().isNotNull();

    const { newState, hasChanges } = computeStateForSet(maybeState, currentState, controlledProps);

    if (hasChanges) {
        setState(newState);
        notifyStateChanged(newState, false, onChange);
    }
}

/**
 * This is a similar implementation to Semantic UI React "AutoControlledComponent" base component: https://github.com/Semantic-Org/Semantic-UI-React/blob/master/src/lib/AutoControlledComponent.js.
 * The goal is to seemlessly support "controlled" and "uncontrolled" component behaviors by abstracting the complexity in this hook.
 * This is achieved by abstracting the state and updating a state value only when a prop is considered "uncontrolled".
 *
 * @param {Object} autoControlledProps - The component auto controlled props definition. For each entry, the key is the name of the auto controlled prop and the value is the default value.
 * @param {Object} componentProps - The component props object.
 * @param {Object} defaultProps - The component default props object.
 * @param {Function} [onChange] - An optionnal function called when the auto controlled state is updated.
 * @example
 * const [selectedValues, setSelectedValues] = useState([]);
 *
 * const autoControlledProps = {
 *      open: false,
 *      values: ["Neil Armstrong"]
 * };
 *
 * const { autoControlledState, setAutoControlledState } = useAutoControlledState(autoControlledProps, props, defaultValues, (newState, initialState) => {
 *      // Optionally compute derived state...
 *      if (isInitialState) {
 *          setSelectedValues(newState.values);
 *      }
 * });
 *
 * ...
 *
 * if (!autoControlledState.open) {
 *      setAutoControlledState({ open: true });
 * }
 */
export function useAutoControlledState(autoControlledProps, componentProps, componentDefaultProps, onChange) {
    ensure(autoControlledProps, "autoControlledProps", "useAutoControlledProps").isPlainObject().isNotNull();
    ensure(componentProps, "componentProps", "useAutoControlledProps").isPlainObject().isNotNull();
    ensure(componentDefaultProps, "componentDefaultProps", "useAutoControlledProps").isPlainObject();

    const [state, setState] = useState(null);
    const [controlledProps, setControlledProps] = useState(null);

    const isInitialState = isNil(state);

    const memoizedSetAutoControlledState = useCallback(maybeState => {
        setAutoControlledState(maybeState, state, setState, controlledProps, onChange);
    }, [controlledProps, onChange, state]);

    if (isInitialState) {
        validatePrerequisites(autoControlledProps, componentDefaultProps);

        const { state: initialState, controlledProps: initialControlledProps } = computeInitialState(autoControlledProps, componentProps);

        setState(initialState);
        setControlledProps(initialControlledProps);
        notifyStateChanged(initialState, true, onChange);
    } else {
        const { newState, newControlledProps, hasChanges } = computeStateFromProps(autoControlledProps, componentProps, state);

        if (hasChanges) {
            ensureControlledPropsHaveNotChanged(newControlledProps, controlledProps);
            setState(newState);
            setControlledProps(newControlledProps);
            notifyStateChanged(newState, false, onChange);
        }
    }

    return {
        autoControlledState: state,
        setAutoControlledState: memoizedSetAutoControlledState
    };
}
