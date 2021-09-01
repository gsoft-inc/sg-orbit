import "./CheckboxGroup.css";

import { AbstractGroupProps, Group } from "../../group";
import {
    CheckableContext,
    InternalProps,
    OmitInternalProps,
    OrbitComponentProps,
    SlotProps,
    ValidationState,
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
import { Children, ComponentProps, ReactElement, SyntheticEvent, forwardRef } from "react";
import { ClearFieldContext, useFieldInputProps } from "../../field";
import { ClearToolbar, useToolbarProps } from "../../toolbar";
import { useGroupInput } from "../../input";

const DefaultElement = "div";

export interface InnerCheckboxGroupProps extends
    AbstractGroupProps,
    SlotProps,
    InternalProps,
    Omit<OrbitComponentProps<typeof DefaultElement>, "children" | "onChange"> {
    /**
     * Whether or not the first checkbox of the group should autoFocus on render.
     */
    autoFocus?: boolean | number;
    /**
     * The initial value of `value`.
     */
    defaultValue?: string[];
    /**
     * Whether or not the group elements are disabled.
     */
    disabled?: boolean;
    /**
     * Called when any of the children is checked or unchecked.
     * @param {SyntheticEvent} event - React's original event.
     * @param {string[]} value - The new value.
     * @returns {void}
     */
    onChange?: (event: SyntheticEvent, value: string[]) => void;
    /**
     * Whether a user input is required before form submission.
     */
    required?: boolean;
    /**
     * The group elements size.
     */
    size?: "sm" | "md";
    /**
     * Whether the group should display as "valid" or "invalid".
     */
    validationState?: ValidationState;
    /**
     * The value of the checkbox group.
     */
    value?: string[] | null;
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
        as = DefaultElement,
        autoFocus,
        children,
        defaultValue,
        disabled,
        forwardedRef,
        gap,
        onChange,
        orientation = "horizontal",
        required,
        reverse,
        size,
        validationState,
        value,
        wrap,
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
        delay: isNumber(autoFocus) ? autoFocus : undefined,
        isDisabled: !autoFocus
    });

    const { groupProps, itemProps } = useGroupInput({
        cssModule: "o-ui-checkbox-group",
        disabled,
        gap,
        groupRef,
        isInField,
        orientation,
        required,
        reverse,
        size,
        validationState,
        wrap
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
                rest,
                {
                    as
                },
                groupProps
            )}
        >
            <ClearToolbar>
                <ClearFieldContext>
                    <CheckableContext.Provider
                        value={{
                            checkedValue,
                            onCheck: handleCheck
                        }}
                    >
                        {Children.toArray(items).filter(x => x).map((x: ReactElement, index) => {
                            return augmentElement(x, {
                                ...itemProps,
                                role: "checkbox",
                                value: index.toString()
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
