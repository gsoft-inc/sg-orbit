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

const propTypes = {
    content: element.isRequired,
    size: oneOf(SIZES)
};

const defaultProps = {
    size: DEFAULT_SIZE
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

Icon.propTypes = propTypes;
Icon.defaultProps = defaultProps;
