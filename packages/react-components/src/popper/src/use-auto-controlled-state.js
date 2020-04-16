import { IS_PRODUCTION, ensure } from "../../shared";
import { difference, isArray, isEqual, isFunction, isNil, isPlainObject, isUndefined } from "lodash";
import { useCallback, useEffect, useState } from "react";

function getDefaultPropName(prop) {
    return `default${prop[0].toUpperCase()}${prop.slice(1)}`;
}

function areEqual(newValue, currentValue) {
    // Using the Object.is algorithm since this is what React hooks setState is also using for comparison.
    // For more info: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is#Description
    return Object.is(newValue, currentValue);
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
    const newState = Object.assign(currentState);
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

export function useAutoControlledState(autoControlledProps, componentProps, componentDefaultValues, onChanged) {
    const [state, setState] = useState(null);
    const [controlledProps, setControlledProps] = useState(null);

    const isInitialState = isNil(state);

    const setAutoControlledState = useCallback(maybeState => {
        const { newState, hasChanges } = computeStateForSet(maybeState, state, controlledProps);

        if (hasChanges) {
            setState(newState);
        }
    }, [state, setState, controlledProps]);

    if (isInitialState) {
        const { state: initialState, controlledProps: initialControlledProps } = computeInitialState(autoControlledProps, componentProps);

        setState(initialState);
        setControlledProps(initialControlledProps);
    } else {
        const { newState, newControlledProps, hasChanges } = computeStateFromProps(autoControlledProps, componentProps, state);

        if (hasChanges) {
            ensureControlledPropsHaveNotChanged(newControlledProps, controlledProps);
            setState(newState);
            setControlledProps(newControlledProps);
        }
    }

    return {
        autoControlledState: state,
        setAutoControlledState
    };
}

// // TODO:
// //  - Add validation
// //  - Update state function? The function will merge the existing state with the new state values (like setState)

// // VALIDATION TO DO ONCE AT BEGINNING:
// //  -

// class PropRegistry {
//     props = {};
//     controlledProps = [];
//     hasChanges = false;

//     addUncontrolledProp(name, value) {
//         this.props[name] = {
//             value,
//             isControlled: false,
//             hasChanged: true
//         };

//         this.hasChanges = true;
//     }

//     addControlledProp(name, value, hasChanged) {
//         const prop = {
//             value,
//             isControlled: true,
//             hasChanged: hasChanged
//         };

//         this.props[name] = prop;
//         this.controlledProps[name] = prop;

//         if (hasChanged) {
//             this.hasChanges = true;
//         }
//     }

//     hasControlledProp(name) {
//         return Object.keys(this.controlledProps).some(x => x === name);
//     }

//     // TODO: delete
//     toExportableValues() {
//         return this.props.map(x => x.value);
//     }
// }

// function validatePrerequisites(candidates, componentProps, componentDefaultValues) {

// }

// function getDefaultPropName(prop) {
//     return `default${prop[0].toUpperCase()}${prop.slice(1)}`;
// }

// function ensureControlledPropsHaveNotChanged(newProps, lastProps) {
//     const illegaProps = difference(Object.keys(newProps), Object.keys(lastProps));

//     if (illegaProps.length !== 0) {
//         throw new Error(
//             `useAutoControlledProps.ensureControlledPropsHaveNotChanged - ${illegaProps.join(",")} were not controlled during the previous rendering. A property cannot switch between "controlled" and "uncontrolled" mode.`
//         );
//     }
// }

// function computeNewRegistry(autoControlledProps, componentProps, currentRegistry) {
//     const newRegistry = new PropRegistry();
//     const isInitialRegistry = isNil(currentRegistry);

//     autoControlledProps.forEach(({ name: propName, defaultValue }) => {
//         const propsValue = componentProps[propName];

//         if (isUndefined(propsValue)) {
//             // This prop is "uncontrolled".
//             if (isInitialRegistry) {
//                 const defaultPropValue = componentProps[getDefaultPropName(propName)];

//                 if (!isUndefined(defaultPropValue)) {
//                     newRegistry.addUncontrolledProp(propName, defaultPropValue);
//                 } else {
//                     newRegistry.addUncontrolledProp(propName, defaultValue);
//                 }
//             }
//         } else {
//             // This prop is "controlled".
//             if (!IS_PRODUCTION) {
//                 const defaultPropName = getDefaultPropName(propName);

//                 if (!isUndefined(componentProps[defaultPropName])) {
//                     throw new Error(
//                         `useAutoControlledProps.computeNewState - ${propName} prop is auto controlled. Specify either ${propName} or ${defaultPropName}, but not both.`
//                     );
//                 }
//             }

//             if (isInitialRegistry) {
//                 newRegistry.addControlledProp(propName, propsValue, propsValue !== defaultValue);
//             } else {
//                 newRegistry.addControlledProp(propName, propsValue, propsValue !== currentRegistry.props[propName].value);
//             }
//         }
//     });

//     return {
//         registry: newRegistry,
//         isInitialRegistry: isInitialRegistry
//     };
// }

// function mergeState(currentState, newValues) {
//     return {
//         ...currentState,
//         ...newValues
//     };
// }

// /**
//  * This is a similar implementation of Semantic UI React "AutoControlledComponent" base component: https://github.com/Semantic-Org/Semantic-UI-React/blob/master/src/lib/AutoControlledComponent.js.
//  * The goal is to seemlessly support "controlled" and "uncontrolled" component behaviors by abstracting this complexity in this hook.
//  * This is achieved by abstracting the state and updateing a state value only when a prop is considered "uncontrolled".
//  *
//  * @example
//  * useAutoControlledProps()
//  */
// export function useAutoControlledProps(autoControlledProps, componentProps, componentDefaultValues, onChanged) {
//     ensure(autoControlledProps, "autoControlledProps", "useAutoControlledProps").isPlainObject();
//     ensure(componentProps, "componentProps", "useAutoControlledProps").isPlainObject();
//     ensure(componentDefaultValues, "componentDefaultValues", "useAutoControlledProps").isPlainObject();

//     const [currentRegistry, setRegistry] = useState(null);
//     const [pogo, setPogo] = useState({});

//     validatePrerequisites(autoControlledProps, componentProps, componentDefaultValues);

//     const { registry: newRegistry, isInitialRegistry } = computeNewRegistry(autoControlledProps, componentProps, currentRegistry);

//     // Always call onStateChanged when the initial state is computed because the controlled props initial values might be the same as the component default values.
//     if (newRegistry.hasChanges || isInitialRegistry) {
//         if (!isInitialRegistry) {
//             ensureControlledPropsHaveNotChanged(newRegistry.controlledProps, isInitialRegistry ? {} : currentRegistry.controlledProps);
//         }

//         setRegistry(newRegistry);

//         // UPDATE STATE SOMEWHERE WITH CHANGES PROPS.

//         if (isFunction(onChanged)) {
//             onChanged(newRegistry.props);
//         }
//     }

//     /**
//      * Safely attempt to set state for auto controlled props that might be "controlled" by the consumer.
//      * When the prop is "uncontrolled", the state will be updated with the value, otherwise ignored.
//      *
//      * @param {Object} props - Props to update.
//      * @example
//      * setAutoControlledProps({ prop: newValue });
//      */
//     const setAutoControlledProps = useCallback(props => {
//         ensure(props, "props", "useAutoControlledProps.setAutoControlledProps").isPlainObject();

//         const newProps = {};

//         Object.keys(props).forEach(x => {
//             if (!currentRegistry.hasControlledProp(x)) {
//                 newProps[x] = props[x];
//             }
//         });

//         if (Object.keys(newProps).length > 0) {
//             setRegistry(mergeState());
//         }
//     }, [currentRegistry]);

//     return [newRegistry.toExportableValues, setAutoControlledProps];
// }
