import styles from "./red-box-with-boundary.module.css";

import { RedBoxPopper } from "./red-box-popper";
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
    scrollTop: 0,
    setPreventOverflowBoundaryElement: false,
    setFlipBoundaryElement: false
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

export function RedBoxPopperWithBoundary({ scrollTop, modifiers, setPreventOverflowBoundaryElement, setFlipBoundaryElement, ...rest }) {
    const [boundaryElement, setBoundaryElement] = useState(null);

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
                defaultShow
                popperModifiers={createModifiers()}
                {...rest}
            />
        </div>
    );
}

RedBoxPopperWithBoundary.propTypes = propTypes;
RedBoxPopperWithBoundary.defaultProps = defaultProps;
