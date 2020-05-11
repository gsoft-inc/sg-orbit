import { Button } from "./button";
import { isNil } from "lodash";

export function createButtonFromShorthand({ content, ...props }) {
    if (!isNil(content)) {
        return <Button {...props}>{content}</Button>;
    }

    return <Button {...props} />;
}
