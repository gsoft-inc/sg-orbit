import "./ButtonGroup.css";

import { Children, ComponentProps, ReactElement, ReactNode, forwardRef } from "react";
import { Group, GroupProps } from "../../group";
import { InternalProps, augmentElement, cssModule, mergeProps, normalizeSize, omitProps, slot } from "../../shared";
import { useFieldInputProps } from "../../field";

export interface InnerButtonGroupProps extends InternalProps, Omit<GroupProps, "size"> {
    /**
     * The orientation of the buttons.
     */
    orientation?: "horizontal" | "vertical";
    /**
     * The horizontal alignment of the buttons.
     */
    align?: "start" | "end" | "center";
    /**
     * The buttons size.
     */
    size?: "sm" | "md";
    /**
     * Whether or not the buttons are disabled.
     */
    disabled?: boolean;
    /**
     * Whether or not the group take up the width of its container.
     */
    fluid?: boolean;
    /**
     * React children.
     */
    children: ReactNode;
}

const Gap = {
    "horizontal": {
        "sm": 3,
        "md": 4
    },
    "vertical": {
        "sm": 2,
        "md": 3
    }
} as const;

export function InnerButtonGroup(props: InnerButtonGroupProps) {
    const [fieldProps, isInField] = useFieldInputProps();

    const {
        orientation = "horizontal",
        align,
        size,
        fluid,
        disabled,
        children,
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        omitProps(fieldProps, ["fluid"])
    );

    return (
        <Group
            {...mergeProps(
                rest,
                {
                    orientation,
                    align,
                    verticalAlign: orientation === "horizontal" ? "center" : undefined,
                    fluid,
                    gap: Gap[orientation][normalizeSize(size)],
                    className: cssModule(
                        "o-ui-button-group",
                        isInField && "in-field"
                    ),
                    role: !isInField ? "group" : undefined,
                    ref: forwardedRef
                } as const
            )}
        >
            {Children.toArray(children).filter(x => x).map((x: ReactElement) => {
                return augmentElement(x, {
                    size,
                    fluid,
                    disabled
                });
            })}
        </Group>
    );
}

export const ButtonGroup = slot("button-group", forwardRef<any, Omit<InnerButtonGroupProps, "forwardedRef">>((props, ref) => (
    <InnerButtonGroup {...props} forwardedRef={ref} />
)));

export type ButtonGroupProps = ComponentProps<typeof ButtonGroup>;

ButtonGroup.displayName = "ButtonGroup";
