import { Label } from "./Label";
import { isNil } from "lodash";

// TODO: Delete once everything merged
export function createLabel({ content, ...props }) {
    if (!isNil(content)) {
        return <Label {...props}>{content}</Label>;
    }

    return <Label {...props} />;
}


