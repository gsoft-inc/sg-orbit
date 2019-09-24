import { MultiSelect, multiSelectItem } from "@orbit-ui/react-multi-select/src";
import { noop } from "lodash";

const GROUP_CREATED_VALUE = "Group Created";
const GROUP_RESTORED_VALUE = "Group Restored";
const GROUP_DELETED_VALUE = "Group Deleted";
const GROUP_NAME_CHANGED_VALUE = "Group Name Changed";
const GROUP_PRIVACY_CHANGED_VALUE = "Group Privacy Changed";

const DEFAULT_ITEMS = [
    multiSelectItem("Created", GROUP_CREATED_VALUE),
    multiSelectItem("Restored", GROUP_RESTORED_VALUE),
    multiSelectItem("Deleted", GROUP_DELETED_VALUE),
    multiSelectItem("Name Changed", GROUP_NAME_CHANGED_VALUE),
    multiSelectItem("Privacy Changed", GROUP_PRIVACY_CHANGED_VALUE)
];

function createMultiSelect({ items = DEFAULT_ITEMS, onValuesChange = noop, ...otherProps } = {}) {
    return <MultiSelect
        items={items}
        onValuesChange={onValuesChange}
        {...otherProps}
    />;
}

test("open the dropdown menu on trigger click", async () => {

});
