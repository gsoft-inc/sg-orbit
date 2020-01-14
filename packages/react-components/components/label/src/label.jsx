import { Label as SemanticLabel } from "semantic-ui-react";
import { throwWhenUnsupportedPropIsProvided } from "@orbit-ui/react-components-shared";

const UNSUPPORTED_PROPS = ["attached", "corner", "floating", "horizontal", "icon", "image", "pointing", "prompt", "removeIcon", "ribbon"];

export function Label({ children, ...props }) {
    throwWhenUnsupportedPropIsProvided(props, UNSUPPORTED_PROPS);

    return <SemanticLabel {...props}>{children}</SemanticLabel>;
}

Label.Detail = SemanticLabel.Detail;
Label.Group = SemanticLabel.Group;
