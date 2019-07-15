import { multiSelectItem } from "../src";

export const GROUP_CREATED_VALUE = "Group Created";
export const GROUP_RESTORED_VALUE = "Group Restored";
export const GROUP_DELETED_VALUE = "Group Deleted";
export const GROUP_NAME_CHANGED_VALUE = "Group Name Changed";
export const GROUP_PRIVACY_CHANGED_VALUE = "Group Privacy Changed";

export const DEFAULT_ITEMS = [
    multiSelectItem("Created", GROUP_CREATED_VALUE),
    multiSelectItem("Restored", GROUP_RESTORED_VALUE),
    multiSelectItem("Deleted", GROUP_DELETED_VALUE),
    multiSelectItem("Name Changed", GROUP_NAME_CHANGED_VALUE),
    multiSelectItem("Privacy Changed", GROUP_PRIVACY_CHANGED_VALUE)
];

export const DEFAULT_ITEMS_WITH_CATEGORIES = [
    multiSelectItem("Created", GROUP_CREATED_VALUE, "Group Lifecycle"),
    multiSelectItem("Restored", GROUP_RESTORED_VALUE, "Group Lifecycle"),
    multiSelectItem("Deleted", GROUP_DELETED_VALUE, "Collaboration"),
    multiSelectItem("Name Changed", GROUP_NAME_CHANGED_VALUE, "Collaboration"),
    multiSelectItem("Privacy Changed", GROUP_PRIVACY_CHANGED_VALUE, "Others")
];

export function logValuesChanged(event, values) {
    console.log("Values: ", values);
}
