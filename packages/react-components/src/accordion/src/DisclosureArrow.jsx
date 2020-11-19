import "./DisclosureArrow.css";

import { ChevronIcon } from "../../icons";
import { bool } from "prop-types";
import { cssModule, mergeClasses } from "../../shared";
import { forwardRef } from "react";
import { isNil } from "lodash";
import { useDisclosureContext } from "../../disclosure";

const propTypes = {
    open: bool,
    disabled: bool
};

export function InnerDisclosureArrow({
    open,
    disabled,
    className,
    ...rest
}) {
    const disclosureContext = useDisclosureContext();

    const isOpen = open ?? disclosureContext.isOpen;

    if (isNil(isOpen)) {
        throw new Error("The disclosure arrow component must receive a controlled prop 'open' or have a parent DisclosureContext.");
    }

    return (
        <ChevronIcon
            {...rest}
            className={mergeClasses(
                cssModule(
                    "o-ui-disclosure-arrow",
                    isOpen ? "down" : "up",
                    disabled && "disabled"
                ),
                className
            )}
        />
    );
}

InnerDisclosureArrow.propTypes = propTypes;

export const DisclosureArrow = forwardRef((props, ref) => (
    <InnerDisclosureArrow {...props} forwardedRef={ref} />
));
