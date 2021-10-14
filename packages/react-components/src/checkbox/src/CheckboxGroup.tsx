import "./CheckboxGroup.css";

import { AbstractGroupInputProps, useGroupInput } from "../../input";
import {
    CheckableContext,
    OmitInternalProps,
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
import { Group } from "../../group";
import { ResponsiveProp, useResponsiveValue } from "../../styling";

const DefaultElement = "div";

export interface InnerCheckboxGroupProps extends AbstractGroupInputProps<typeof DefaultElement, string[]> {
    /**
     * The checkbox of a group can vary in size.
     */
    size?: ResponsiveProp<"sm" | "md">;
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
        wrap = true,
        ...rest
    } = mergeProps(
        props,
        toolbarProps,
        omitProps(fieldProps, ["fluid"])
    );

    const sizeValue = useResponsiveValue(size);
    const wrapValue = useResponsiveValue(wrap);

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
        size: sizeValue,
        validationState,
        wrap: wrapValue
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
