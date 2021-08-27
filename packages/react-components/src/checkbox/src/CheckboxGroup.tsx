import "./CheckboxGroup.css";

import {
    CheckableContext,
    InternalProps,
    OmitInternalProps,
    SlotProps,
    augmentElement,
    isNil,
    isNumber,
    mergeProps,
    omitProps,
    resolveChildren,
    useAutoFocusChild,
    useControllableState,
    useEventCallback,
    useFocusManager,
    useFocusScope,
    useMergedRefs
} from "../../shared";
import { Children, ComponentProps, ReactElement, ReactNode, SyntheticEvent, forwardRef } from "react";
import { ClearFieldContext, useFieldInputProps } from "../../field";
import { ClearToolbar, useToolbarProps } from "../../toolbar";
import { Group } from "../../group";
import { useGroupInput } from "../../input";

const DefaultElement = "div";

export interface InnerCheckboxGroupProps extends SlotProps, InternalProps, Omit<ComponentProps<typeof DefaultElement>, "size" | "autoFocus" | "onChange"> {
    /**
     * How the elements are placed in the container. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction).
     */
    direction?: "row" | "column";
    /**
     * The distribution of space around child items along the cross axis. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/align-content).
     */
    alignContent?: (
        "start" |
        "end" |
        "center" |
        "space-between" |
        "space-around" |
        "space-evenly" |
        "stretch" |
        "baseline" |
        "first baseline" |
        "last baseline" |
        "safe center" |
        "unsafe center");
    /**
     * The alignment of children within their container. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items).
     */
    alignItems?: (
        "start" |
        "end" |
        "center" |
        "stretch" |
        "self-start" |
        "self-end" |
        "baseline" |
        "first baseline" |
        "last baseline" |
        "safe center" |
        "unsafe center");
    /**
     * The distribution of space around items along the main axis. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content).
     */
    justifyContent?: (
        "start" |
        "end" |
        "center" |
        "left" |
        "right" |
        "space-between" |
        "space-around" |
        "space-evenly" |
        "stretch" |
        "baseline" |
        "first baseline" |
        "last baseline" |
        "safe center" |
        "unsafe center");
    /**
     * Whether to wrap children in a `div` element.
     */
    wrapChildren?: boolean;
    /**
     * Whether or not to inline the elements.
     */
    inline?: boolean;
    /**
     * The horizontal alignment of the elements.
     */
    align?: "start" | "end" | "center";
    /**
     * The vertical alignment of the elements.
     */
    verticalAlign?: "start" | "end" | "center";
    /**
     * Whether the elements take up the width & height of their container.
     */
    fluid?: boolean;
    /**
     * A WAI-ARIA accessibility role. See [MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles).
     */
    role?: string;
    /**
   * The value of the checkbox group.
   */
    value?: string[] | null;
    /**
     * The initial value of `value`.
     */
    defaultValue?: string[];
    /**
     * Whether a user input is required before form submission.
     */
    required?: boolean;
    /**
     * Whether the group should display as "valid" or "invalid".
     */
    validationState?: "valid" | "invalid";
    /**
     * Called when any of the children is checked or unchecked..
     * @param {SyntheticEvent} event - React's original event.
     * @param {string[]} value - The new value.
     * @returns {void}
     */
    onChange?: (event: SyntheticEvent, value: string[]) => void;
    /**
     * Whether or not the first checkbox of the group should autoFocus on render.
     */
    autoFocus?: boolean | number;
    /**
     * The orientation of the group elements.
     */
    orientation?: "horizontal" | "vertical";
    /**
     * The space between the group elements.
     */
    gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | string;
    /**
     * Whether the group elements are forced onto one line or can wrap onto multiple lines
     */
    wrap?: boolean;
    /**
     * The group elements size.
     */
    size?: "sm" | "md";
    /**
     * Whether or not the group elements are disabled.
     */
    disabled?: boolean;
    /**
     * Invert the order of the checkbox and his label.
     */
    reverse?: boolean;
    /**
     * React children.
     */
    children: ReactNode;
}

function arrayToggleValue<T>(array: T[], value: T) {
    if (isNil(array)) {
        return [value];
    }

    const index = array.indexOf(value);

    if (index !== -1) {
        const newArray = [...array];
        newArray.splice(index, 1);

        return newArray;
    }

    return [...array, value];
}

export function InnerCheckboxGroup(props: InnerCheckboxGroupProps) {
    const [toolbarProps] = useToolbarProps();
    const [fieldProps, isInField] = useFieldInputProps();

    const {
        value,
        defaultValue,
        required,
        validationState,
        onChange,
        autoFocus,
        orientation = "horizontal",
        as = DefaultElement,
        gap,
        wrap,
        size,
        reverse,
        disabled,
        children,
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        toolbarProps,
        omitProps(fieldProps, ["fluid"])
    );

    const [checkedValue, setCheckedValue] = useControllableState(value, defaultValue, []);

    const [focusScope, setFocusRef] = useFocusScope();

    const groupRef = useMergedRefs(setFocusRef, forwardedRef);

    const focusManager = useFocusManager(focusScope);

    useAutoFocusChild(focusManager, {
        isDisabled: !autoFocus,
        delay: isNumber(autoFocus) ? autoFocus : undefined
    });

    const { groupProps, itemProps } = useGroupInput({
        cssModule: "o-ui-checkbox-group",
        required,
        validationState,
        orientation,
        gap,
        wrap,
        size,
        reverse,
        disabled,
        isInField,
        groupRef
    });

    const handleCheck = useEventCallback((event: SyntheticEvent, newValue: string) => {
        const newCheckedValue = arrayToggleValue(checkedValue, newValue);

        setCheckedValue(newCheckedValue);

        if (!isNil(onChange)) {
            onChange(event, newCheckedValue);
        }
    });

    const items = resolveChildren(children, { checkedValue });

    return (
        <Group
            {...mergeProps(
                {
                    as
                },
                rest,
                groupProps
            )}
        >
            <ClearToolbar>
                <ClearFieldContext>
                    <CheckableContext.Provider
                        value={{
                            onCheck: handleCheck,
                            checkedValue
                        }}
                    >
                        {Children.toArray(items).filter(x => x).map((x: ReactElement, index) => {
                            return augmentElement(x, {
                                ...itemProps,
                                value: index.toString(),
                                role: "checkbox"
                            });
                        })}
                    </CheckableContext.Provider>
                </ClearFieldContext>
            </ClearToolbar>
        </Group>
    );
}

export const CheckboxGroup = forwardRef<any, OmitInternalProps<InnerCheckboxGroupProps>>((props, ref) => (
    <InnerCheckboxGroup {...props} forwardedRef={ref} />
));

export type CheckboxGroupProps = ComponentProps<typeof CheckboxGroup>;
