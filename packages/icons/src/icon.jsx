import { BIG, DEFAULT_SIZE, HUGE, LARGE, MASSIVE, MEDIUM, SIZES, SMALL, TINY } from "./sizes";
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

export function Icon({ content, size, className, ...rest }) {
    const classes = mergeClasses(
        className,
        DIMENSIONS[size]
    );

    return cloneElement(content, {
        className: classes,
        ...rest
    });
}

Icon.propTypes = {
    content: element.isRequired,
    size: oneOf(SIZES)
};

Icon.defaultProps = {
    size: "medium"
};

export function MultiVariantIcon({ icon24, icon32, size, ...rest }) {
    let content = icon32;

    if (size === TINY || size === SMALL || size === MEDIUM) {
        content = icon24;
    }

    return <Icon content={content} size={size} {...rest} />;
}

MultiVariantIcon.propTypes = {
    icon24: element.isRequired,
    icon32: element.isRequired,
    size: oneOf(SIZES)
};

MultiVariantIcon.defaultProps = {
    size: "medium"
};
