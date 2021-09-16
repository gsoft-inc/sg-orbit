import "./Card.css";

import { Box } from "../../box";
import { ComponentProps, ReactNode, cloneElement, forwardRef, useMemo } from "react";
import { HtmlElements } from "../../html";
import { InternalProps, OmitInternalProps, SlotProps, StyledComponentProps, cssModule, isNil, isString, mergeProps, normalizeSize, slot, useSlots } from "../../shared";
import { Text } from "../../typography";

const DefaultElement = "section";

export interface InnerCardProps extends SlotProps, InternalProps, StyledComponentProps<typeof DefaultElement> {
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * Whether or not the card take up the width of its container.
     */
    fluid?: boolean;
    /**
     * The orientation of the card.
     */
    orientation?: "horizontal" | "vertical";
    /**
     * A card can vary in size.
     */
    size?: "xs" | "sm" | "md" | "lg" | "xl";
}

export function InnerCard({
    as = HtmlElements[DefaultElement],
    children,
    fluid,
    forwardedRef,
    orientation = "vertical",
    size,
    ...rest
}: InnerCardProps) {
    const { button, "button-group": buttonGroup, content, header, heading, illustration, image } = useSlots(children, useMemo(() => ({
        _: {
            required: ["heading", "content"]
        },
        button: {
            className: "o-ui-card-button"
        },
        "button-group": {
            className: "o-ui-card-button-group"
        },
        content: {
            as: Text,
            className: "o-ui-card-content"
        },
        header: {
            className: "o-ui-card-header"
        },
        heading: {
            as: "span",
            className: "o-ui-card-heading",
            size: "xs"
        },
        illustration: {
            className: "o-ui-card-illustration",
            orientation: orientation === "horizontal" ? "vertical" : "horizontal"
        },
        image: null
    }), [orientation]));

    const headerMarkup = isString(header?.props?.children)
        ? cloneElement(header, { children: <Text>{header?.props?.children}</Text> })
        : header;

    const imageMarkup = image && (
        <Box className="o-ui-card-image">
            {image}
        </Box>
    );

    const headerSectionMarkup = (
        <Box className="o-ui-card-header-section">
            {heading}
            {headerMarkup}
        </Box>
    );

    const footerSectionMarkup = (!isNil(button) || !isNil(buttonGroup)) && (
        <Box className="o-ui-card-footer-section">
            {button}
            {buttonGroup}
        </Box>
    );

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    as,
                    className: cssModule(
                        "o-ui-card",
                        orientation,
                        !fluid && normalizeSize(size),
                        fluid && "fluid"
                    ),
                    ref: forwardedRef
                }
            )}
        >
            {imageMarkup}
            {illustration}
            <Box className="o-ui-card-aside">
                {headerSectionMarkup}
                {content}
                {footerSectionMarkup}
            </Box>
        </Box>
    );
}

export const Card = slot("card", forwardRef<any, OmitInternalProps<InnerCardProps>>((props, ref) => (
    <InnerCard {...props} forwardedRef={ref} />
)));

export type CardProps = ComponentProps<typeof Card>;
