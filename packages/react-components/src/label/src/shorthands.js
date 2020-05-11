import { Label } from "./label";
import { isNil } from "lodash";

export function createLabel({ content, ...props }) {
    if (!isNil(content)) {
        return <Label {...props}>{content}</Label>;
    }

    return <Label {...props} />;
}


