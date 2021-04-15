import { AriaLabelingProps, forwardRef, slot } from "../../shared";
import { ComponentProps, ElementType, ForwardedRef, SyntheticEvent } from "react";
import { CrossIcon } from "../../icons";
import { IconButton } from "./IconButton";

interface InnerCrossButtonProps extends AriaLabelingProps {
    /**
     * Whether or not the button content should takes additional space.
     */
    condensed?: boolean;
    /**
     * Whether or not the button should autoFocus on render.
     */
    autoFocus?: boolean | number;
    /**
     * A cross button can vary in size.
     */
    size?: "2xs" | "xs" | "sm" | "md";
    /**
     * Whether or not the cross button is disabled.
     */
    disabled?: boolean;
    /**
     * Called when the button is click.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @returns {void}
     */
    onClick?: (event: SyntheticEvent) => void;
    /**
     * A label providing an accessible name to the button. See [WCAG](https://www.w3.org/TR/WCAG20-TECHS/ARIA14.html).
     */
    "aria-label": string;
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as?: ElementType;
    /**
     * @ignore
     */
    forwardedRef: ForwardedRef<any>;
}

export function InnerCrossButton({ forwardedRef, ...rest }: InnerCrossButtonProps) {
    return (
        <IconButton
            {...rest}
            variant="ghost"
            shape="circular"
            ref={forwardedRef}
        >
            <CrossIcon />
        </IconButton>
    );
}

export const CrossButton = slot("button", forwardRef<InnerCrossButtonProps, "button">((props, ref) => (
    <InnerCrossButton {...props} forwardedRef={ref} />
)));

export type CrossButtonProps = ComponentProps<typeof CrossButton>;

CrossButton.displayName = "CrossButton";
