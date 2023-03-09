import { AbstractLinkProps } from "./Link";
import { Box } from "../../box";
import { ComponentProps, ReactNode, forwardRef, useMemo } from "react";
import { LinkVariant, useLink } from "./useLink";
import { NewTabIndicator } from "./NewTabIndicator";
import { OmitInternalProps, as, augmentElement, normalizeSize, cssModule, mergeProps, useSlots } from "../../shared";
import { ResponsiveProp, useResponsiveValue, useStyleProps } from "../../styling";
import { Text } from "../../typography";
import { useFormButton } from "../../form";

const DefaultElement = "a";

export interface InnerTextLinkProps extends AbstractLinkProps<typeof DefaultElement> {
    /**
     * Whether or not the link should autoFocus on render.
     */
    autoFocus?: boolean | number;
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * A link can vary in size.
     */
    size?: ResponsiveProp<"sm" | "md" | "inherit">;
    /**
     * The underline style.
     */
    underline?: "solid" | "dotted" | "none";
    /**
     * The link style to use.
     */
    variant?: LinkVariant;
}

export function InnerTextLink(props: InnerTextLinkProps) {
    const [styleProps] = useStyleProps<InnerTextLinkProps>("link");
    const [formProps] = useFormButton();

    const {
        active,
        as: asProp = DefaultElement,
        autoFocus,
        children,
        disabled,
        external,
        focus,
        forwardedRef,
        hover,
        rel,
        size,
        target,
        underline = "solid",
        visited,
        variant,
        ...rest
    } = mergeProps(
        props,
        styleProps,
        formProps
    );

    const sizeValue = useResponsiveValue(size);

    const { linkProps, showNewTabIndicator } = useLink({
        active,
        autoFocus,
        cssModule: cssModule(
            "o-ui-text-link",
            normalizeSize(sizeValue)
        ),
        disabled,
        external,
        focus,
        forwardedRef,
        hover,
        rel,
        target,
        underline,
        variant,
        visited
    });

    const { icon, "start-icon": startIcon, text } = useSlots(children, useMemo(() => ({
        _: {
            defaultWrapper: Text
        },
        icon: null,
        "start-icon": {
            className: "o-ui-text-link-start-icon"
        },
        text: {
            className: "o-ui-link-text",
            size: sizeValue
        }
    }), [sizeValue]));

    const iconMarkup = icon && augmentElement(icon, {
        className: "o-ui-text-link-end-icon"
    });

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    as: asProp
                },
                linkProps
            )}
        >
            {startIcon}
            {text}
            {iconMarkup}
            {showNewTabIndicator && <NewTabIndicator />}
        </Box>
    );
}

InnerTextLink.defaultElement = DefaultElement;

/**
 *
 * [Documentation](https://orbit.sharegate.design/?path=/docs/link--default-story)
*/

export const TextLink = forwardRef<any, OmitInternalProps<InnerTextLinkProps>>((props, ref) => (
    <InnerTextLink {...props} forwardedRef={ref} />
));

export type TextLinkProps = ComponentProps<typeof TextLink>;

/////////
/**
 *
 * [Documentation](https://orbit.sharegate.design/?path=/docs/link--default-story)
*/

export const TextLinkAsButton = as(TextLink, "button");
export type TextLinkAsButtonProps = ComponentProps<typeof TextLinkAsButton>;
