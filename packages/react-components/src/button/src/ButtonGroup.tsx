import "./ButtonGroup.css";

import { Children, ComponentProps, ReactElement, ReactNode, forwardRef } from "react";
import { Group } from "../../group";
import { InternalProps, OmitInternalProps, augmentElement, cssModule, mergeProps, normalizeSize, omitProps, slot } from "../../shared";
import { useFieldInputProps } from "../../field";

const DefaultElement = "div";

export interface InnerButtonGroupProps extends InternalProps, Omit<ComponentProps<typeof DefaultElement>, "size"> {
    /**
     * [Slot](?path=/docs/getting-started-slots--page) to render into.
     */
    slot?: string;
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
     * Whether or not to reverse the order of the elements.
     */
    reverse?: boolean;
    /**
     * The vertical alignment of the elements.
     */
    verticalAlign?: "start" | "end" | "center";
    /**
     * Space to display between each elements.
     */
    gap?: (0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13) | string;
    /**
     * Whether elements are forced onto one line or can wrap onto multiple lines
     */
    wrap?: boolean;
    /**
     * A WAI-ARIA accessibility role. See [MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles).
     */
    role?: string;

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
        as = DefaultElement,
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
                    as,
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

export const ButtonGroup = slot("button-group", forwardRef<any, OmitInternalProps<InnerButtonGroupProps>>((props, ref) => (
    <InnerButtonGroup {...props} forwardedRef={ref} />
)));

export type ButtonGroupProps = ComponentProps<typeof ButtonGroup>;

ButtonGroup.displayName = "ButtonGroup";
