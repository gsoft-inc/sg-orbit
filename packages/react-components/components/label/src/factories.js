import { Label } from "./label";
import { Tag } from "./tag";
import { isNil } from "lodash";

export function createLabelFromShorthand({ content, ...props }) {
    if (!isNil(content)) {
        return <Label {...props}>{content}</Label>;
    }

    return <Label {...props} />;
}

export function createTagFromShorthand(props) {
    return <Tag {...props} />;
}
