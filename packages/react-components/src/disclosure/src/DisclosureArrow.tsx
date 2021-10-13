import "./DisclosureArrow.css";

import { ChevronIcon } from "../../icons";
import { ComponentProps, forwardRef } from "react";
import { InternalProps, OmitInternalProps, SlotProps, StyledComponentProps, cssModule, isNil, mergeProps, slot } from "../../shared";
import { ResponsiveProp } from "../../styling";
import { useDisclosureContext } from "./DisclosureContext";

export interface InnerDisclosureArrowProps extends SlotProps, InternalProps, StyledComponentProps<"svg"> {
    /**
     * A controlled open value that determined whether or not the arrow is up or down.
     */
    open?: boolean;
    /**
     * An arrow can vary in size.
     */
    size?: ResponsiveProp<"2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "inherit">;
}

export function InnerDisclosureArrow({
    forwardedRef,
    open,
    ...rest
}: InnerDisclosureArrowProps) {
    const disclosureContext = useDisclosureContext();

    const isOpen = open ?? disclosureContext?.isOpen;

    if (isNil(isOpen)) {
        throw new Error("The disclosure arrow component must receive a controlled prop \"open\" or have a parent DisclosureContext.");
    }

    return (
        <ChevronIcon
            {...mergeProps(
                rest,
                {
                    className: cssModule(
                        "o-ui-disclosure-arrow",
                        isOpen ? "up" : "down"
                    ),
                    ref: forwardedRef
                }
            )}
        />
    );
}

export const DisclosureArrow = slot("icon", forwardRef<any, OmitInternalProps<InnerDisclosureArrowProps>>((props, ref) => (
    <InnerDisclosureArrow {...props} forwardedRef={ref} />
)));

export type DisclosureArrowProps = ComponentProps<typeof DisclosureArrow>;
