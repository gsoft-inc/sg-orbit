import "./ButtonGroup.css";

import { Children, ComponentProps, ReactElement, ReactNode, forwardRef } from "react";
import { Group } from "../../group";
import { InternalProps, OmitInternalProps, OrbitComponentProps, SlotProps, augmentElement, cssModule, mergeProps, normalizeSize, omitProps, slot } from "../../shared";
import { useFieldInputProps } from "../../field";

const DefaultElement = "div";

export interface InnerButtonGroupProps extends SlotProps, InternalProps, Omit<OrbitComponentProps<typeof DefaultElement>, "size"> {
    /**
      * The horizontal alignment of the buttons.
      */
    align?: "start" | "end" | "center";
    /**
      * React children.
      */
    children: ReactNode;
    /**
      * Whether or not the buttons are disabled.
      */
    disabled?: boolean;
    /**
      * Whether or not the group take up the width of its container.
      */
    fluid?: boolean;
    /**
     * The orientation of the buttons.
     */
    orientation?: "horizontal" | "vertical";
    /**
      * The buttons size.
      */
    size?: "sm" | "md";
}

/* eslint-disable sort-keys, sort-keys-fix/sort-keys-fix */
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
/* eslint-enable sort-keys, sort-keys-fix/sort-keys-fix */

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
                    align,
                    as,
                    className: cssModule(
                        "o-ui-button-group",
                        isInField && "in-field"
                    ),
                    fluid,
                    gap: Gap[orientation][normalizeSize(size)],
                    orientation,
                    ref: forwardedRef,
                    role: !isInField ? "group" : undefined,
                    verticalAlign: orientation === "horizontal" ? "center" : undefined
                } as const
            )}
        >
            {Children.toArray(children).filter(x => x).map((x: ReactElement) => {
                return augmentElement(x, {
                    disabled,
                    fluid,
                    size
                });
            })}
        </Group>
    );
}

export const ButtonGroup = slot("button-group", forwardRef<any, OmitInternalProps<InnerButtonGroupProps>>((props, ref) => (
    <InnerButtonGroup {...props} forwardedRef={ref} />
)));

export type ButtonGroupProps = ComponentProps<typeof ButtonGroup>;
