import "./DisclosureArrow.css";

import { ChevronIcon } from "../../icons";
import { ComponentProps, ForwardedRef } from "react";
import { cssModule, forwardRef, isNil, mergeProps, slot } from "../../shared";
import { useDisclosureContext } from "./DisclosureContext";

export interface InnerDisclosureArrowProps {
    /**
     * A controlled open value that determined whether or not the arrow is up or down.
     */
    open?: boolean;
    /**
     * An arrow can vary in size.
     */
    size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "inherit";
    /**
    * @ignore
    */
    forwardedRef: ForwardedRef<any>;
}

export function InnerDisclosureArrow({
    open,
    forwardedRef,
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

export const DisclosureArrow = slot("icon", forwardRef<InnerDisclosureArrowProps>((props, ref) => (
    <InnerDisclosureArrow {...props} forwardedRef={ref} />
)));

export type DisclosureArrowProps = ComponentProps<typeof DisclosureArrow>;

DisclosureArrow.displayName = "DisclosureArrow";
