import { BIG, HUGE, LARGE, MASSIVE, MEDIUM, SMALL } from "../../shared";
import { MessageContext } from "./context";
import { cloneElement, useContext } from "react";
import { element } from "prop-types";

const SIZES_TO_ICON = {
    [SMALL]: LARGE,
    [MEDIUM]: BIG,
    [LARGE]: HUGE,
    [BIG]: MASSIVE
};

const propTypes = {
    icon: element.isRequired
};

export function MessageIcon({ icon, ...rest }) {
    const context = useContext(MessageContext);

    return cloneElement(icon, {
        size: SIZES_TO_ICON[context.size],
        ...rest
    });
}

MessageIcon.propTypes = propTypes;
