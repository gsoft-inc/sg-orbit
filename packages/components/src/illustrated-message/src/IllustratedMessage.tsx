import { Box } from "../../box";
import { ComponentProps, ReactNode, forwardRef, useMemo } from "react";
import { Flex } from "@components/layout";
import { InternalProps, OmitInternalProps, SlotProps, StyledComponentProps, cssModule, mergeProps, slot, useSlots } from "../../shared";
import { ResponsiveProp, useResponsiveValue } from "../../styling";
import { Text } from "../../typography";

const DefaultElement = "div";

export interface InnerIllustratedMessageProps extends SlotProps, InternalProps, StyledComponentProps<typeof DefaultElement> {
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * The orientation of the illustrated message.
     */
    orientation?: ResponsiveProp<"horizontal" | "vertical">;
    /**
     * The illustrated message shape.
     */
    shape?: "straight" | "rounded";
}

export function InnerIllustratedMessage({
    as = DefaultElement,
    children,
    forwardedRef,
    orientation = "horizontal",
    shape = "straight",
    ...rest
}: InnerIllustratedMessageProps) {
    const orientationValue = useResponsiveValue(orientation);

    const { content, heading, image } = useSlots(children, useMemo(() => ({
        _: {
            required: ["image"]
        },
        content: {
            as: Text,
            className: "o-ui-illustrated-message-content"
        },
        heading: {
            as: "h3",
            className: "o-ui-illustrated-message-heading",
            size: "sm"
        },
        image: {
            className: "o-ui-illustrated-message-image"
        }
    }), []));

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    as,
                    className: cssModule(
                        "o-ui-illustrated-message",
                        orientationValue,
                        shape
                    ),
                    ref: forwardedRef
                }
            )}
        >
            {image}
            <Flex direction="column">
                {heading}
                {content}
            </Flex>
        </Box>
    );
}

InnerIllustratedMessage.defaultElement = DefaultElement;

export const IllustratedMessage = slot("IllustratedMessage", forwardRef<any, OmitInternalProps<InnerIllustratedMessageProps>>((props, ref) => (
    <InnerIllustratedMessage {...props} forwardedRef={ref} />
)));

export type IllustratedMessageProps = ComponentProps<typeof IllustratedMessage>;
