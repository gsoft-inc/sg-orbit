import { any } from "prop-types";
import { cloneElement, useCallback } from "react";
import { isNil } from "lodash";

const propTypes = {
    children: any.isRequired
};

export function RefLogger({ children }) {
    const onSetRef = useCallback(node => {
        if (!isNil(node)) {
            console.log(node);
        }
    }, []);

    return cloneElement(children, {
        ref: onSetRef
    });
}

RefLogger.propTypes = propTypes;
