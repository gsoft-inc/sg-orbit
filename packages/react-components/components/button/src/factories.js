import { Button } from "./button";
import { isNil } from "lodash";

export function createButtonFromShorthand({ content, ...props }) {
    return <Button {...props}>{!isNil(content) && content}</Button>;
}
