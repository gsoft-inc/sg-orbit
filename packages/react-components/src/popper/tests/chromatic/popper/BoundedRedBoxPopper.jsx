import styles from "./BoundedRedBoxPopper.module.css";

import { RedBoxPopper } from "./RedBoxPopper";
import { array, bool, number } from "prop-types";
import { isNil, merge } from "lodash";
import { useLayoutEffect, useState } from "react";

const propTypes = {
    scrollTop: number,
    modifiers: array,
    setPreventOverflowBoundaryElement: bool,
    setFlipBoundaryElement: bool
};

const defaultProps = {
    scrollTop: 0
};

function setModifierBoundaryElement(name, boundaryElement, modifiers) {
    const modifier = modifiers.find(x => x.name === name);

    if (!isNil(modifier)) {
        modifier.options = merge(modifier.options || {}, {
            boundary: boundaryElement
        });
    } else {
        modifiers.push({
            name,
            options: {
                boundary: boundaryElement
            }
        });
    }
}

export function BoundedRedBoxPopper({ scrollTop, modifiers, setPreventOverflowBoundaryElement, setFlipBoundaryElement, ...rest }) {
    const [boundaryElement, setBoundaryElement] = useState();

    useLayoutEffect(() => {
        if (!isNil(boundaryElement)) {
            boundaryElement.scrollTop = scrollTop;
        }
    }, [boundaryElement, scrollTop]);

    const createModifiers = () => {
        const mergedModifiers = modifiers || [];

        if (setPreventOverflowBoundaryElement) {
            setModifierBoundaryElement("preventOverflow", boundaryElement, mergedModifiers);
        }

        if (setFlipBoundaryElement) {
            setModifierBoundaryElement("flip", boundaryElement, mergedModifiers);
        }

        return mergedModifiers;
    };

    return (
        <div className={styles.boundary} ref={setBoundaryElement}>
            <RedBoxPopper
                show
                popperModifiers={createModifiers()}
                {...rest}
            />
        </div>
    );
}

BoundedRedBoxPopper.propTypes = propTypes;
BoundedRedBoxPopper.defaultProps = defaultProps;
