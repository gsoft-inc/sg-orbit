import { IS_PRODUCTION } from "../env";
import { ensure } from "../contracts";
import { isFunction, isNil, isUndefined } from "lodash";
import { useCallback, useEffect, useState } from "react";

function validatePrerequisites(controlledValue, initialValue) {
    if (!IS_PRODUCTION) {
        if (!isUndefined(controlledValue) && !isUndefined(initialValue)) {
            throw new Error(
                "useAutoControlledState - An auto controlled prop can have either a controlled value or an initial value, but not both."
            );
        }
    }
}

function ensureControlledStateHaveNotChanged(controlledValue, isControlled) {
    if ((isControlled && isUndefined(controlledValue)) || (!isControlled && !isUndefined(controlledValue))) {
        throw new Error("useAutoControlledState - An auto controlled prop cannot switch between controlled and uncontrolled. Did you inadvertently set a default value (defaultProps) for your controlled prop?");
    }
}

function notifyStateChanged(newState, isInitialState, handler) {
    if (isFunction(handler)) {
        handler(newState, isInitialState);
    }
}

function computeInitialState(controlledValue, initialValue, defaultValue) {
    let state;
    let isControlled = false;

    if (isUndefined(controlledValue)) {
        // This prop is "uncontrolled".
        state = !isUndefined(initialValue) ? initialValue : defaultValue;

    } else {
        // This prop is "controlled".
        state = controlledValue;
        isControlled = true;
    }

    return {
        state,
        isControlled
    };
}

function computeSubsequentState(controlledValue, currentState, isControlled) {
    let newState = null;
    let hasChanged = false;

    ensureControlledStateHaveNotChanged(controlledValue, isControlled);

    if (isControlled) {
        if (currentState !== controlledValue) {
            newState = controlledValue;
            hasChanged = true;
        }
    }

    return {
        newState,
        hasChanged
    };
}

/**
 * Safely attempt to set state for an auto controlled prop that might be "controlled" by the consumer.
 * When the prop is "uncontrolled", the state will be updated with the value, otherwise ignored.
 *
 * @param {Object} maybeState - The expected new state value.
 * @example
 * setAutoControlledState(["Neil Armstrong"]);
 */
function setAutoControlledState(maybeState, currentState, setState, isControlled, onChange) {
    ensure(maybeState, "maybeState", "useAutoControlledState").isNotNull();

    if (!isControlled) {
        if (maybeState !== currentState) {
            setState(maybeState);
            notifyStateChanged(maybeState, false, onChange);
        }
    }
}

/**
 * This implementation is a port of Semantic UI React "AutoControlledComponent" base component to hooks: https://github.com/Semantic-Org/Semantic-UI-React/blob/master/src/lib/AutoControlledComponent.js.
 * The goal is to seemlessly support "controlled" and "uncontrolled" component behaviors by abstracting the complexity in this hook.
 * This is achieved by abstracting the state and updating a state value only when a prop is considered "uncontrolled".
 *
 * @param {Object} controlledValue - The controlled value.
 * @param {Object} initialValue - The initial value.
 * @param {Object} defaultValue - The default value.
 * @param {Function} [onChange] - An optionnal function called when the auto controlled state is updated.
 * @returns {[Object, Function]} An array with the first value being the value of the state and the second value being a function to manually update the state value.
 * @example
 * const [autoControlledValues, setValues] = useAutoControlledState(values, defaultValues, false, (newValues, isInitialState) => {
 *      // Optionally compute derived state...
 *      if (isInitialState) {
 *          setSelectedValues(newValues)
 *      }
 * });
 *
 * ...
 *
 * setValues([...autoControlledValues, "Neil Armstrong"]);
 */
export function useAutoControlledState(controlledValue, initialValue, defaultValue, onChange) {
    const [state, setState] = useState(null);
    const [isControlled, setIsControlled] = useState(false);

    validatePrerequisites(controlledValue, initialValue);

    useEffect(() => {
        if (isNil(state)) {
            const { state: initialState, isControlled: isControlledProp } = computeInitialState(controlledValue, initialValue, defaultValue);

            setState(initialState);
            setIsControlled(isControlledProp);
            notifyStateChanged(initialState, true, onChange);
        }
        else {
            const { newState, hasChanged } = computeSubsequentState(controlledValue, state, isControlled);

            if (hasChanged) {
                setState(newState);
                notifyStateChanged(newState, false, onChange);
            }
        }
    }, [state, isControlled, controlledValue, initialValue, defaultValue, onChange]);

    const memoizedSetAutoControlledState = useCallback(maybeState => {
        setAutoControlledState(maybeState, state, setState, isControlled, onChange);
    }, [state, isControlled, onChange]);

    return [state, memoizedSetAutoControlledState];
}
