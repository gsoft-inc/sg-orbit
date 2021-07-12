import "./Card.css";

import { Box } from "../../box";
import { ComponentProps, ElementType, ForwardedRef, ReactNode, cloneElement, useMemo } from "react";
import { Text } from "../../text";
import { cssModule, forwardRef, isString, mergeProps, slot, useSlots } from "../../shared";

export interface InnerCardProps {
    /**
     * The orientation of the card.
     */
    orientation: "horizontal" | "vertical";
    /**
     * Whether or not the card take up the width of its container.
     */
    fluid?: boolean;
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as?: ElementType;
    /**
     * Default slot override.
     */
    slot?: string;
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * @ignore
     */
    forwardedRef: ForwardedRef<any>;
}

export function InnerCard({
    orientation = "vertical",
    fluid,
    as = "section",
    children,
    forwardedRef,
    ...rest
}: InnerCardProps) {
    const { image, illustration, heading, header, content, button, "button-group": buttonGroup } = useSlots(children, useMemo(() => ({
        _: {
            required: ["heading", "content"]
        },
        image: {
            className: "o-ui-card-image"
        },
        illustration: {
            orientation,
            className: "o-ui-card-illustration"
        },
        heading: {
            className: "o-ui-card-heading",
            as: "h5"
        },
        header: {
            className: "o-ui-card-header"
        },
        content: {
            className: "o-ui-card-content",
            as: Text
        },
        button: {
            className: "o-ui-card-button"
        },
        "button-group": {
            className: "o-ui-card-button-group"
        }
    }), []));

    const headerMarkup = isString(header?.props?.children)
        ? cloneElement(header, { children: <Text>{header?.props?.children}</Text> })
        : header;

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    className: cssModule(
                        "o-ui-card",
                        orientation,
                        fluid && "fluid"
                    ),
                    as,
                    ref: forwardedRef
                }
            )}
        >
            {image}
            {illustration}
            {heading}
            {headerMarkup}
            {content}
            {button}
            {buttonGroup}
        </Box>
    );
}

export const Card = slot("card", forwardRef<InnerCardProps>((props, ref) => (
    <InnerCard {...props} forwardedRef={ref} />
)));

export type CardProps = ComponentProps<typeof Card>;

Card.displayName = "Card";
