import {
    CheckableContext,
    KEYS,
    augmentElement,
    getNextNavigableElement,
    getPreviousNavigableElement,
    useAutoFocus,
    useControllableState,
    useEventCallback,
    useId,
    useMergedRefs
} from "../../shared";
import { Children, forwardRef, useCallback, useLayoutEffect } from "react";
import { Flex } from "../../layout";
import { any, bool, elementType, func, number, oneOf, oneOfType, string } from "prop-types";
import { isFunction, isNil } from "lodash";

const propTypes = {
    /**
   * The value of the radio group.
   */
    value: oneOfType([string, number]),
    /**
   * The initial value of `value`.
   */
    defaultValue: oneOfType([string, number]),
    /**
     * Radio group name.
     */
    name: string,
    /**
   * Called when any of the children is checked or unchecked.
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {string | number} value - The new value.
   * @returns {void}
   */
    onChange: func,
    /**
     * Whether or not the radio group should autoFocus on render.
     */
    autoFocus: bool,
    /**
     * Delay before trying to autofocus.
     */
    autoFocusDelay: number,
    /**
   * Flex direction to display the children.
   */
    direction: oneOf(["row", "column"]),
    /**
     * Whether or not elements are forced onto one line or can wrap onto multiple lines
     */
    wrap: bool,
    /**
   * Children size.
   */
    size: oneOf(["small", "medium", "large"]),
    /**
     * Whether or not the radio group is disabled.
     */
    disabled: bool,
    /**
     * Whether or not the radio group is read only.
     */
    readOnly: bool,
    /**
   * An HTML element type or a custom React element type to render as.
   */
    as: oneOfType([string, elementType]),
    /**
   * @ignore
   */
    children: any.isRequired
};

const defaultProps = {
    direction: "column",
    as: "div"
};

function useKeyboardNavigation(setCheckedValue) {
    const setElement = element => {
        if (isFunction(element.focus)) {
            element.focus();
        }

        setCheckedValue(element.value);
    };

    const handleKeyDown = useEventCallback(event => {
        switch (event.keyCode) {
            case KEYS.down:
            case KEYS.right:
                event.preventDefault();
                setElement(getNextNavigableElement(event.currentTarget, event.target));
                break;
            case KEYS.up:
            case KEYS.left:
                event.preventDefault();
                setElement(getPreviousNavigableElement(event.currentTarget, event.target));
                break;
        }
    });

    return {
        onKeyDown: handleKeyDown
    };
}

function useGroupAutoFocus(autoFocus, autoFocusDelay, disabled, ref) {
    const setFocus = useCallback(() => {
        if (!isNil(ref.current)) {
            const inputs = ref.current.querySelectorAll("input[tabIndex=\"0\"]");

            if (inputs.length > 0) {
                inputs[0].focus();
            }
        }
    }, [ref]);

    useAutoFocus(autoFocus, autoFocusDelay, disabled, setFocus);

    useLayoutEffect(() => {
        if (!disabled && autoFocus) {
            setFocus();
        }
    }, [autoFocus, disabled, setFocus]);
}

export function InnerRadioGroup({
    value,
    defaultValue,
    name,
    onChange,
    autoFocus,
    autoFocusDelay,
    wrap,
    size,
    disabled,
    readOnly,
    children,
    forwardedRef,
    ...rest
}) {
    const [checkedValue, setCheckedValue] = useControllableState(value, defaultValue, null);

    const ref = useMergedRefs(forwardedRef);

    const navigationProps = useKeyboardNavigation(setCheckedValue);

    useGroupAutoFocus(autoFocus, autoFocusDelay, disabled, ref);

    // https://www.w3.org/TR/wai-aria-practices-1.1/examples/radio/radio-1/radio-1.html
    const getRovingTabIndex = (props, index) => {
        if (isNil(checkedValue)) {
            return index === 0 ? "0" : "-1";
        }

        return !disabled && !props.disabled && checkedValue === props.value ? "0" : "-1";
    };

    const handleCheck = useEventCallback((event, newValue) => {
        setCheckedValue(newValue);

        if (!isNil(onChange)) {
            onChange(event, newValue);
        }
    });

    const groupName = useId(name, "radio-group");

    return (
        <Flex
            {...rest}
            {...navigationProps}
            alignItems="start"
            gap={2}
            wrap={!isNil(wrap) ? "wrap" : undefined}
            role="radiogroup"
            aria-readonly={readOnly}
            aria-disabled={disabled}
            ref={ref}
        >
            <CheckableContext.Provider
                value={{
                    onCheck: handleCheck,
                    checkedValue
                }}
            >
                {Children.map(children, (x, index) => {
                    return augmentElement(x, {
                        name: groupName,
                        size,
                        disabled,
                        readOnly,
                        tabIndex: getRovingTabIndex(x.props, index),
                        role: "radio"
                    });
                })}
            </CheckableContext.Provider>
        </Flex>
    );
}

InnerRadioGroup.propTypes = propTypes;
InnerRadioGroup.defaultProps = defaultProps;

export const RadioGroup = forwardRef((props, ref) => (
    <InnerRadioGroup { ...props } forwardedRef={ref} />
));
