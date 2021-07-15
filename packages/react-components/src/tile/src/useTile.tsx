import { Box } from "../../box";
import { InteractionStatesProps, cssModule, useSlots } from "../../shared";
import { ReactNode, useMemo } from "react";
import { Text } from "../../typography";

export interface UseTileProps extends InteractionStatesProps {
    variant: "checkable" | "link";
    children: ReactNode;
}

export function useTile({
    variant,
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
            className: "o-ui-tile-illustration"
        },
        heading: {
            className: "o-ui-tile-heading",
            size: "sm",
            as: "h5"
        },
        content: {
            className: "o-ui-tile-content",
            as: Text
        }
    }), []));

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
