import { CollectionNode, isDivider, isItem } from "./useCollection";
import { getRawSlots } from "../../shared";
import { isNil } from "lodash";

export function getItemText(item: CollectionNode): string {
    if (isDivider(item) || isItem(item)) {
        const { text, stringValue } = getRawSlots(item?.content, ["text"]);

        return !isNil(text)
            ? text.props?.children ?? ""
            : stringValue ?? "";
    }

    return "";
}
