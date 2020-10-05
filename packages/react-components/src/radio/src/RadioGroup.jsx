import "./RadioGroup.css";

import {
    CheckableContext,
    KEYS,
    augmentElement,
    mergeProps,
    omitProps,
    useArrowNavigation,
    useAutoFocusFirstTabbableElement,
    useControllableState,
    useEventCallback,
    useId,
    useMergedRefs,
    useRenderProps,
    useRovingFocus
} from "../../shared";
import { Children, forwardRef } from "react";
import { Group } from "../../group";
import { any, bool, elementType, func, number, oneOf, oneOfType, string } from "prop-types";
import { isNil } from "lodash";
import { useFieldInput } from "../../field";
import { useGroupInput } from "../../input";
import { useToolbarContext } from "../../toolbar";

const ARROW_NAV_KEY_BINDING = {
    "default": {
        previous: [KEYS.left, KEYS.up],
        next: [KEYS.right, KEYS.down],
        first: [KEYS.home],
        last: [KEYS.end]
    },
    "toolbar": {
        previous: [KEYS.up],
        next: [KEYS.down]
    }
};

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
     * Whether a user input is required before form submission.
     */
    required: bool,
    /**
     * Whether the group should display as "valid" or "invalid".
     */
    validationState: oneOf(["valid", "invalid"]),
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
     * Whether the radio group should autoFocus on render.
     */
    autoFocus: bool,
    /**
     * Delay before trying to autofocus.
     */
    autoFocusDelay: number,
    /**
     * The orientation of the elements.
     */
    orientation: oneOf(["horizontal", "vertical"]),
    /**
     * The space between elements.
     */
    gap: oneOfType([oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]), string]),
    /**
     * Whether elements are forced onto one line or can wrap onto multiple lines
     */
    wrap: bool,
    /**
     * The elements size.
     */
    size: oneOf(["sm", "md", "lg"]),
    /**
     * Invert the order of the button and the label of all children.
     */
    reverse: bool,
    /**
     * Whether the radio group is disabled.
     */
    disabled: bool,
    /**
   * An HTML element type or a custom React element type to render as.
   */
    as: oneOfType([string, elementType]),
    /**
     * Component children.
     */
    children: oneOfType([any, func]).isRequired
};

export function InnerRadioGroup(props) {
    const [toolbarProps, isInToolbar] = useToolbarContext();
    const [fieldProps] = useFieldInput();

    const {
        value,
        defaultValue,
        required,
        validationState,
        name,
        onChange,
        autoFocus,
        autoFocusDelay,
        orientation = "vertical",
        gap,
        wrap,
        size,
        reverse,
        disabled,
        className,
        children,
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        toolbarProps,
        omitProps(fieldProps, ["fluid"])
    );

    const [checkedValue, setCheckedValue] = useControllableState(value, defaultValue, null);

    const ref = useMergedRefs(forwardedRef);

    useRovingFocus(ref, checkedValue, { keyProp: "value" });
    useAutoFocusFirstTabbableElement(ref, autoFocus, { delay: autoFocusDelay });

    const handleArrowSelect = useEventCallback((event, element) => {
        setCheckedValue(element.value);
    });

    const navigationMode = isInToolbar ? "toolbar" : "default";
    const navigationProps = useArrowNavigation(ARROW_NAV_KEY_BINDING[navigationMode], !isInToolbar ? handleArrowSelect : undefined);

    const { groupProps, itemProps } = useGroupInput({
        cssModule: "o-ui-radio-group",
        role: "radio-group",
        required,
        validationState,
        orientation,
        gap,
        wrap,
        size,
        reverse,
        disabled,
        className,
        ref
    });

    const handleCheck = useEventCallback((event, newValue) => {
        setCheckedValue(newValue);

        if (!isNil(onChange)) {
            onChange(event, newValue);
        }
    });

    const groupName = useId(name, "radio-group");

    const items = useRenderProps({ checkedValue }, props, children);

    return (
        <Group
            {...rest}
            {...navigationProps}
            {...groupProps}
        >
            <CheckableContext.Provider
                value={{
                    onCheck: handleCheck,
                    checkedValue
                }}
            >
                {Children.map(items, x => {
                    return augmentElement(x, {
                        ...itemProps,
                        role: "radio",
                        name: groupName
                    });
                })}
            </CheckableContext.Provider>
        </Group>
    );
}

InnerRadioGroup.propTypes = propTypes;

export const RadioGroup = forwardRef((props, ref) => (
    <InnerRadioGroup { ...props } forwardedRef={ref} />
));

