import { AriaLabelingProps, slot } from "../../shared";
import { ComponentProps, ElementType, ForwardedRef, MouseEventHandler, forwardRef } from "react";
import { CrossIcon } from "../../icons";
import { IconButton, IconButtonProps } from "./IconButton";

export interface InnerCrossButtonProps extends AriaLabelingProps, Omit<IconButtonProps, "children"> {
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
     * @ignore
     */
    onClick?: MouseEventHandler;
    /**
     * A label providing an accessible name to the button. See [WCAG](https://www.w3.org/TR/WCAG20-TECHS/ARIA14.html).
     */
    "aria-label": string;
    /**
     * @ignore
     */
    as?: ElementType;
    /**
     * Default slot override.
     */
    slot?: string;
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

export const CrossButton = slot("button", forwardRef<HTMLButtonElement, Omit<InnerCrossButtonProps, "forwardedRef">>((props, ref) => (
    <InnerCrossButton {...props} forwardedRef={ref} />
)));

export type CrossButtonProps = ComponentProps<typeof CrossButton>;

CrossButton.displayName = "CrossButton";
