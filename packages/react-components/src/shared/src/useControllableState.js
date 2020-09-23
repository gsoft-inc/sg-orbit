import { isFunction, isUndefined } from "lodash";
import { useCallback, useEffect, useRef, useState } from "react";

function validatePrerequisites(controlledValue, initialValue) {
    if (!isUndefined(controlledValue) && !isUndefined(initialValue)) {
        throw new Error(
            "useControllableState - A controllable state value can either have a controlled value or an initial value, but not both."
        );
    }
}

function ensureControlledStateHaveNotChanged(controlledValue, isControlled) {
    if ((isControlled && isUndefined(controlledValue)) || (!isControlled && !isUndefined(controlledValue))) {
        throw new Error("useControllableState - A controllable state value cannot switch between controlled and uncontrolled. Did you inadvertently set a default value (defaultProps) for your controlled prop?");
    }
}

function notifyStateChanged(newState, isInitialState, handler) {
    if (isFunction(handler)) {
        handler(newState, isInitialState);
    }
}

function useComputeInitialState(controlledValue, initialValue, defaultValue) {
    const result = (state, isControlled, isInitialState = false) => ({ state, isControlled, isInitialState });

    const hasComputedRef = useRef(false);

    if (hasComputedRef.current) {
        return result(null, null);
    }

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

    hasComputedRef.current = true;

    return result(state, isControlled, true);
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
 * Safely attempt to set state for a prop that might be "controlled" by the consumer.
 * When the prop is "uncontrolled", the state will be updated with the value, otherwise ignored.
 */
function useSetUncontrolledState(currentState, setState, isControlled, onChange) {
    return useCallback(maybeState => {
        if (!isControlled) {
            if (maybeState !== currentState) {
                setState(maybeState);
                notifyStateChanged(maybeState, false, onChange);
            }
        }
    }, [currentState, setState, isControlled, onChange]);
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
 * const [controllableValue, setUncontrolledState] = useControllableState(value, initialValue, defaultValue, (newValue, isInitialState) => {
 *      // Optionally compute derived state...
 *      if (isInitialState) {
 *          setSelectedValue(newValue)
 *      }
 * });
 *
 * ...
 *
 * setUncontrolledState("Neil Armstrong");
 */
export function useControllableState(controlledValue, initialValue, defaultValue, onChange) {
    validatePrerequisites(controlledValue, initialValue);

    const { state: initialState, isControlled: isControlledProp, isInitialState } = useComputeInitialState(controlledValue, initialValue, defaultValue);

    const [state, setState] = useState(initialState);
    const [isControlled] = useState(isControlledProp);

    if (isInitialState) {
        notifyStateChanged(initialState, true, onChange);
    }

    useEffect(() => {
        if (!isInitialState) {
            const { newState, hasChanged } = computeSubsequentState(controlledValue, state, isControlled);

            if (hasChanged) {
                setState(newState);
                notifyStateChanged(newState, false, onChange);
            }
        }
    }, [state, isControlled, isInitialState, controlledValue, initialValue, defaultValue, onChange]);

    const setUncontrolledState = useSetUncontrolledState(state, setState, isControlled, onChange);

    return [state, setUncontrolledState];
}
