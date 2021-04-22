import { CollectionNode, isDivider, isItem } from "./useCollection";
import { getRawSlots, isNil } from "../../shared";

export function getItemText(item: CollectionNode): string {
    if (isDivider(item) || isItem(item)) {
        const { text, stringValue } = getRawSlots(item?.content, ["text"]);

        return !isNil(text)
            ? text.props?.children ?? ""
            : stringValue ?? "";
    }

    return "";
}
