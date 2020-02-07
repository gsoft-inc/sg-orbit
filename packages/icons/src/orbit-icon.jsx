import { DEFAULT_SIZE, MEDIUM, SIZES, SMALL, TINY } from "./sizes";
import { Icon } from "./icon";
import { element, oneOf } from "prop-types";

export function createOrbitIcon(icon24, icon32) {
    return props => {
        return <OrbitIcon icon24={icon24} icon32={icon32} {...props} />;
    };
}

const propTypes = {
    icon24: element.isRequired,
    icon32: element.isRequired,
    size: oneOf(SIZES)
};

const defaultProps = {
    size: DEFAULT_SIZE
};

function OrbitIcon({ icon24, icon32, size, ...rest }) {
    let content = icon32;

    if (size === TINY || size === SMALL || size === MEDIUM) {
        content = icon24;
    }

    return <Icon content={content} size={size} {...rest} />;
}

OrbitIcon.propTypes = propTypes;
OrbitIcon.defaultProps = defaultProps;
