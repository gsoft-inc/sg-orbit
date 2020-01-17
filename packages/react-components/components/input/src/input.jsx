import { Input as SemanticInput } from "semantic-ui-react";
import { isNil } from "lodash";
import { oneOf } from "prop-types";
import { throwWhenUnsupportedPropIsProvided } from "@orbit-ui/react-components-shared";

const UNSUPPORTED_PROPS = [];

export function Input({ children, ...props }) {
    throwWhenUnsupportedPropIsProvided(props, UNSUPPORTED_PROPS);

    return <SemanticInput {...props}>{children}</SemanticInput>;
}

// eslint-disable-next-line react/forbid-foreign-prop-types
if (!isNil(SemanticInput.propTypes)) {
    // eslint-disable-next-line react/forbid-foreign-prop-types
    SemanticInput.propTypes.size = oneOf(["tiny", "small", "medium", "large"]);
}
