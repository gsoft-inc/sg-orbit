import { Button } from "./button";
import { isNil } from "lodash";

export function createButton({ content, ...props }) {
    if (!isNil(content)) {
        return <Button {...props}>{content}</Button>;
    }

    return <Button {...props} />;
}
