import { getRawSlots } from "../../shared";
import { isNil } from "lodash";

export function getItemText(item) {
    const { text, stringValue } = getRawSlots(item?.content, ["text"]);

    return !isNil(text)
        ? text.props?.children ?? ""
        : stringValue ?? "";
}
