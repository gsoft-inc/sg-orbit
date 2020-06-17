import { Ref } from "semantic-ui-react";
import { isNil } from "lodash";

export function SemanticRef({ innerRef, children }) {
    if (!isNil(innerRef)) {
        return (
            <Ref innerRef={innerRef}>
                {children}
            </Ref>
        );
    }

    return children;
}
