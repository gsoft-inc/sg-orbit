import "./MenuArrow.css";

import { ChevronIcon } from "../../icons";
import { bool, oneOf } from "prop-types";
import { cssModule, mergeProps, slot } from "../../shared";
import { forwardRef } from "react";
import { isNil } from "lodash";
import { useMenuTriggerContext } from "./MenuTriggerContext";

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

export function InnerMenuArrow({
    open,
    forwardedRef,
    ...rest
}) {
    const menuContext = useMenuTriggerContext();

    const isOpen = open ?? menuContext?.isOpen;

    if (isNil(isOpen)) {
        throw new Error("The menu arrow component must receive a controlled prop \"open\" or have a parent MenuTriggerContext.");
    }

    return (
        <ChevronIcon
            {...mergeProps(
                rest,
                {
                    className: cssModule(
                        "o-ui-menu-arrow",
                        isOpen ? "down" : "up"
                    ),
                    ref: forwardedRef
                }
            )}
        />
    );
}

InnerMenuArrow.propTypes = propTypes;

export const MenuArrow = slot("icon", forwardRef((props, ref) => (
    <InnerMenuArrow {...props} forwardedRef={ref} />
)));

MenuArrow.displayName = "MenuArrow";
