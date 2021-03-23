import { Children, ComponentProps, ElementType, ForwardedRef, ReactElement } from "react";
import { Group, GroupProps } from "../../group";
import { augmentElement, forwardRef, mergeProps, normalizeSize, slot } from "../../shared";

export interface InnerButtonGroupProps {
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
     * An HTML element type or a custom React element type to render as.
     */
    as?: ElementType;
    /**
     * React children.
     */
    children: ReactElement<any, any>;
    /**
     * @ignore
     */
    forwardedRef: ForwardedRef<any>;
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
    const {
        orientation = "horizontal",
        align,
        size,
        fluid,
        disabled,
        children,
        forwardedRef,
        ...rest
    } = props;

    return (
        <Group
            {...mergeProps<Partial<GroupProps>[]>(
                rest,
                {
                    orientation,
                    align,
                    verticalAlign: orientation === "horizontal" ? "center" : undefined,
                    fluid,
                    gap: Gap[orientation][normalizeSize(size)],
                    className: "o-ui-button-group",
                    ref: forwardedRef
                }
            )}
        >
            {Children.map(children, x => {
                return augmentElement(x, {
                    size,
                    fluid,
                    disabled
                });
            })}
        </Group>
    );
}

export const ButtonGroup = slot("button-group", forwardRef<InnerButtonGroupProps>((props, ref) => (
    <InnerButtonGroup {...props} forwardedRef={ref} />
)));

export type ButtonGroupProps = ComponentProps<typeof ButtonGroup>

ButtonGroup.displayName = "ButtonGroup";
