import { Label } from "./label";
import { Tag } from "./tag";
import { isNil } from "lodash";

export function createLabelFromShorthand({ content, ...props }) {
    return <Label {...props}>{!isNil(content) && content}</Label>;
}

export function createTagFromShorthand(props) {
    return <Tag {...props} />;
}
