import { Box } from "../../box";
import { InteractionStatesProps, cssModule, useSlots } from "../../shared";
import { ReactNode, useMemo } from "react";
import { Text } from "../../typography";

export interface UseTileProps extends InteractionStatesProps {
    variant: "checkable" | "link";
    orientation: "horizontal" | "vertical";
    children: ReactNode;
}

export function useTile({
    variant,
    orientation,
    active,
    focus,
    hover,
    children
}: UseTileProps) {
    const { image, illustration, heading, content } = useSlots(children, useMemo(() => ({
        _: {
            required: ["heading", "content"]
        },
        image: {
            className: "o-ui-tile-image"
        },
        illustration: {
            orientation: orientation === "horizontal" ? "vertical" : "horizontal",
            className: "o-ui-tile-illustration"
        },
        heading: {
            className: "o-ui-tile-heading",
            size: "2xs",
            as: "span"
        },
        content: {
            className: "o-ui-tile-content",
            as: Text
        }
    }), [orientation]));

    const imageMarkup = image && (
        <Box className="o-ui-tile-thumbnail">
            {image}
        </Box>
    );

    return {
        tileProps: {
            className: cssModule(
                "o-ui-tile",
                variant,
                orientation,
                active && "active",
                focus && "focus",
                hover && "hover"
            )
        },
        markup: (
            <>
                {imageMarkup}
                {illustration}
                <div className="o-ui-tile-main">
                    {heading}
                    {content}
                </div>
            </>
        )
    };
}
