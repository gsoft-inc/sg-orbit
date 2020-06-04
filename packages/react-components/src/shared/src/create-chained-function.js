// Copied from https://github.com/react-bootstrap/react-bootstrap/blob/master/src/createChainedFunction.js

import { isNil } from "lodash";

export function createChainedFunction(...funcs) {
    return funcs
        .filter(Boolean)
        .reduce((acc, func) => {
            if (isNil(acc)) {
                return func;
            }

            return (...args) => {
                acc.apply(this, args);
                func.apply(this, args);
            };
        }, null);
}
