import { CollectionItem } from "./useCollection";
import { getRawSlots } from "../../shared";
import { isNil } from "lodash";

export function getItemText(item: CollectionItem) {
    const { text, stringValue } = getRawSlots(item?.content, ["text"]);

    return !isNil(text)
        ? text.props?.children ?? ""
        : stringValue ?? "";
}
