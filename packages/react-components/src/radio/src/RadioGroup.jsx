import {
    CheckableContext,
    KEYS,
    augmentElement,
    useArrowNavigation,
    useAutoFocusFirstTabbableElement,
    useControllableState,
    useEventCallback,
    useId,
    useMergedRefs,
    useRovingFocus
} from "../../shared";
import { Children, forwardRef } from "react";
import { Flex } from "../../layout";
import { InputLabel, useInputGroup } from "../../input";
import { any, bool, elementType, func, number, oneOf, oneOfType, string } from "prop-types";
import { isFunction, isNil } from "lodash";
import { useToolbarProps } from "../../toolbar";

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
     * Label identifying the radio group.
     */
    label: string,
    /**
     * Whether a user input is required before form submission.
     */
    required: bool,
    /**
     * Additional text to describe the radio group.
     */
    description: string,
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
     * Orientation of the children.
     */
    orientation: oneOf(["horizontal", "vertical"]),
    /**
     * The space between elements.
     */
    gap: oneOfType([oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]), string]),
    /**
     * Whether elements are forced onto one line or can wrap onto multiple lines
     */
    wrap: bool,
    /**
     * Children size.
     */
    size: oneOf(["small", "medium", "large"]),
    /**
     * Whether the radio group is disabled.
     */
    disabled: bool,
    /**
     * Whether the radio group is read only.
     */
    readOnly: bool,
    /**
   * An HTML element type or a custom React element type to render as.
   */
    as: oneOfType([string, elementType]),
    /**
     * Component children.
     */
    children: oneOfType([any, func]).isRequired
};

const defaultProps = {
    orientation: "vertical",
    as: "div"
};

export function InnerRadioGroup(props) {
    const {
        value,
        defaultValue,
        label,
        required,
        description,
        name,
        onChange,
        autoFocus,
        autoFocusDelay,
        orientation,
        gap,
        wrap,
        size,
        disabled,
        readOnly,
        navigationMode,
        children,
        forwardedRef,
        ...rest
    } = useToolbarProps(props);

    const [checkedValue, setCheckedValue] = useControllableState(value, defaultValue, null);

    const ref = useMergedRefs(forwardedRef);

    useRovingFocus(ref, checkedValue, { keyProp: "value" });
    useAutoFocusFirstTabbableElement(ref, autoFocus, { delay: autoFocusDelay });

    const handleArrowSelect = useEventCallback((event, element) => {
        setCheckedValue(element.value);
    });

    const navigationProps = useArrowNavigation(ARROW_NAV_KEY_BINDING[navigationMode], navigationMode !== "toolbar" ? handleArrowSelect : undefined);

    const { groupProps, itemsProps, labelProps } = useInputGroup({
        ...rest,
        role: "radio-group",
        labelIdPrefix: "o-ui-radio-group-label",
        label,
        required,
        description,
        orientation,
        gap,
        wrap,
        size,
        readOnly,
        disabled,
        ref
    });

    const handleCheck = useEventCallback((event, newValue) => {
        setCheckedValue(newValue);

        if (!isNil(onChange)) {
            onChange(event, newValue);
        }
    });

    const labelMarkup = labelProps && (
        <InputLabel {...labelProps} />
    );

    const groupName = useId(name, "radio-group");

    const renderItems = (additionalProps = {}) => {
        const items = isFunction(children)
            ? children({ checkedValue })
            : children;

        return (
            <Flex
                {...additionalProps}
                {...navigationProps}
                {...itemsProps}
                alignItems="start"
            >
                <CheckableContext.Provider
                    value={{
                        onCheck: handleCheck,
                        checkedValue
                    }}
                >
                    {Children.map(items, x => {
                        return augmentElement(x, {
                            name: groupName,
                            size,
                            disabled,
                            readOnly,
                            role: "radio"
                        });
                    })}
                </CheckableContext.Provider>
            </Flex>
        );
    };

    return (
        !labelMarkup ? renderItems(groupProps) : (
            <Flex
                {...groupProps}
                direction="column"
                gap={2}
            >
                {labelMarkup}
                {renderItems()}
            </Flex>
        )
    );
}

InnerRadioGroup.propTypes = propTypes;
InnerRadioGroup.defaultProps = defaultProps;

export const RadioGroup = forwardRef((props, ref) => (
    <InnerRadioGroup { ...props } forwardedRef={ref} />
));
