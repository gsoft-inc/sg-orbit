import { multiSelectItem } from "@orbit-ui/react-multi-select/src";

export const GROUP_CREATED_VALUE = "group-created";
export const GROUP_RESTORED_VALUE = "group-restored";
export const GROUP_DELETED_VALUE = "group-deleted";
export const GROUP_NAME_CHANGED_VALUE = "group-name-changed";
export const GROUP_PRIVACY_CHANGED_VALUE = "group-privacy-changed";

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
