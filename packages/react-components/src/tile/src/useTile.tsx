import { Box } from "../../box";
import { FlexOrientation } from "../../layout";
import { InteractionProps, cssModule, useSlots } from "../../shared";
import { ReactNode, useMemo } from "react";
import { Text } from "../../typography";

export interface UseTileProps extends InteractionProps {
    children: ReactNode;
    orientation: FlexOrientation;
    variant: "checkable" | "link";
}

export function useTile({
    active,
    children,
    focus,
    hover,
    orientation,
    variant
}: UseTileProps) {
    const { content, heading, illustration, image } = useSlots(children, useMemo(() => ({
        _: {
            required: ["heading", "content"]
        },
        content: {
            as: Text,
            className: "o-ui-tile-content"
        },
        heading: {
            as: "span",
            className: "o-ui-tile-heading",
            size: "xs"
        },
        illustration: {
            className: "o-ui-tile-illustration",
            orientation: orientation === "horizontal" ? "vertical" : "horizontal"
        },
        image: {
            className: "o-ui-tile-image"
        }
    }), [orientation]));

    const imageMarkup = image && (
        <Box className="o-ui-tile-thumbnail">
            {image}
        </Box>
    );

    return {
        markup: (
            <>
                {imageMarkup}
                {illustration}
                <div className="o-ui-tile-main">
                    {heading}
                    {content}
                </div>
            </>
        ),
        tileProps: {
            className: cssModule(
                "o-ui-tile",
                variant,
                orientation,
                active && "active",
                focus && "focus",
                hover && "hover"
            )
        }
    };
}
