import { Ref } from "semantic-ui-react";
import { isNil } from "lodash";
import React, { Ref as InnerRef, ReactElement, ReactNode } from "react";

interface SemanticRefProps {
    innerRef: InnerRef<HTMLElement> | null
    children: ReactElement
}

export function SemanticRef({ innerRef, children }: SemanticRefProps): ReactNode {
    if (!isNil(innerRef)) {
        return (
            <Ref innerRef={innerRef}>
                {children}
            </Ref>
        );
    }

    return children;
}
