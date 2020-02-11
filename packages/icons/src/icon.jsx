import { BIG, HUGE, LARGE, MASSIVE, MEDIUM, SIZES, SMALL, TINY } from "./sizes";
import { cloneElement } from "react";
import { element, oneOf } from "prop-types";
import { mergeClasses } from "@orbit-ui/react-components-shared";

const DIMENSIONS = {
    [TINY]: "w4 h4",
    [SMALL]: "w5 h5",
    [MEDIUM]: "w6 h6",
    [LARGE]: "w7 h7",
    [BIG]: "w8 h8",
    [HUGE]: "w9 h9",
    [MASSIVE]: "w10 h10"
};

export function Icon({ source, size, className, ...rest }) {
    const classes = mergeClasses(
        className,
        DIMENSIONS[size]
    );

    return cloneElement(source, {
        className: classes,
        ...rest
    });
}

Icon.propTypes = {
    source: element.isRequired,
    size: oneOf(SIZES)
};

Icon.defaultProps = {
    size: "medium"
};

export function MultiVariantIcon({ source24, source32, size, ...rest }) {
    let source = source32;

    if (size === TINY || size === SMALL || size === MEDIUM) {
        source = source24;
    }

    return <Icon source={source} size={size} {...rest} />;
}

MultiVariantIcon.propTypes = {
    source24: element.isRequired,
    source32: element.isRequired,
    size: oneOf(SIZES)
};

MultiVariantIcon.defaultProps = {
    size: "medium"
};
