import "./DisclosureArrow.css";

import { ChevronIcon } from "../../icons";
import { bool, oneOf } from "prop-types";
import { cssModule, mergeClasses, slot } from "../../shared";
import { forwardRef } from "react";
import { isNil } from "lodash";
import { useDisclosureContext } from "../../disclosure";

const propTypes = {
    /**
     * A controlled open value that determined whether or not the arrow is up or down.
     */
    open: bool,
    /**
     * An arrow can vary in size.
     */
    size: oneOf(["2xs", "xs", "sm", "md", "lg", "xl", "inherit"])
};

export function InnerDisclosureArrow({
    open,
    className,
    forwardedRef,
    ...rest
}) {
    const disclosureContext = useDisclosureContext();

    const isOpen = open ?? disclosureContext.isOpen;

    if (isNil(isOpen)) {
        throw new Error("The disclosure arrow component must receive a controlled prop \"open\" or have a parent DisclosureProvider.");
    }

    return (
        <ChevronIcon
            {...rest}
            className={mergeClasses(
                cssModule(
                    "o-ui-disclosure-arrow",
                    isOpen ? "down" : "up"
                ),
                className
            )}
            ref={forwardedRef}
        />
    );
}

InnerDisclosureArrow.propTypes = propTypes;

export const DisclosureArrow = slot("icon", forwardRef((props, ref) => (
    <InnerDisclosureArrow {...props} forwardedRef={ref} />
)));

DisclosureArrow.displayName = "DisclosureArrow";
