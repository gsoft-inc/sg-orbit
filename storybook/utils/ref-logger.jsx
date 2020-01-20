import { cloneElement, useCallback } from "react";
import { element } from "prop-types";
import { isNil } from "lodash";

const propTypes = {
    component: element.isRequired
};

export function RefLogger({ component }) {
    const onSetRef = useCallback(node => {
        if (!isNil(node)) {
            console.log(node);
        }
    }, []);

    return cloneElement(component, {
        ref: onSetRef
    });
}

RefLogger.propTypes = propTypes;
