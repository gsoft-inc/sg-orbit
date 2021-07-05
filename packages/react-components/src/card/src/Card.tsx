import "./Card.css";

import { Box } from "../../box";
import { ComponentProps, ElementType, ForwardedRef, ReactNode, useMemo } from "react";
import { Content } from "../../placeholders";
import { Text } from "../../text";
import { cssModule, forwardRef, mergeProps, slot, useSlots } from "../../shared";

/*
TODO: Add sizes support
*/

export interface InnerCardProps {
    /**
     * Whether or not the card take up the width of its container.
     */
    fluid?: boolean;
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as?: ElementType;
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
    fluid,
    as = "div",
    children,
    forwardedRef,
    ...rest
}: InnerCardProps) {
    const { image, heading, content, button, "button-group": buttonGroup } = useSlots(children, useMemo(() => ({
        _: {
            defaultWrapper: Content
        },
        image: {
            className: "o-ui-card-image"
        },
        heading: {
            className: "o-ui-card-heading",
            as: "h4"
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

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    className: cssModule(
                        "o-ui-card",
                        fluid && "fluid"
                    ),
                    as,
                    ref: forwardedRef
                }
            )}
        >
            {image}
            {heading}
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
