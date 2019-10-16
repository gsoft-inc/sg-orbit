import { ControlledMultiSelect } from "./components";
import { MultiSelect, multiSelectItem } from "@orbit-ui/react-multi-select/src";
import { boolean, text, withKnobs } from "@storybook/addon-knobs";
import { storiesOfBuilder } from "@utils/stories-of-builder";

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

function stories(segment) {
    return storiesOfBuilder(module, "Multi-Select")
        .segment(segment)
        .build();
}

stories()
    .add("default",
         () =>
             <MultiSelect
                 items={DEFAULT_ITEMS}
                 onValuesChange={logValuesChanged}
             />
    )
    .add("knobs",
         () =>
             <MultiSelect
                 items={DEFAULT_ITEMS}
                 // Not sure why, when using a knob, the component doesn't re-render when the knob value change.
                 defaultValues={[GROUP_NAME_CHANGED_VALUE, GROUP_RESTORED_VALUE]}
                 closeOnSelect={boolean("closeOnSelect", false)}
                 noResultsMessage={text("noResultsMessage", MultiSelect.defaultProps.noResultsMessage)}
                 triggerText={text("triggerText", MultiSelect.defaultProps.triggerText)}
                 placeholder={text("placeholder", MultiSelect.defaultProps.placeholder)}
                 clearText={text("clearText", MultiSelect.defaultProps.clearText)}
                 disabled={boolean("disabled", false)}
                 closeOnBlur={boolean("closeOnBlur", true)}
                 closeOnOutsideClick={boolean("closeOnOutsideClick", false)}
                 onValuesChange={logValuesChanged}
             />,
         { decorators: [withKnobs] }
    )
    .add("categories",
         () =>
             <MultiSelect
                 items={DEFAULT_ITEMS_WITH_CATEGORIES}
                 onValuesChange={logValuesChanged}
             />
    )
    .add("default values",
         () =>
             <MultiSelect
                 items={DEFAULT_ITEMS}
                 defaultValues={[GROUP_RESTORED_VALUE, GROUP_NAME_CHANGED_VALUE]}
                 onValuesChange={logValuesChanged}
             />
    )
    .add("close on select",
         () =>
             <MultiSelect
                 items={DEFAULT_ITEMS}
                 closeOnSelect
                 onValuesChange={logValuesChanged}
             />
    )
    .add("custom search",
         () =>
             <MultiSelect
                 items={DEFAULT_ITEMS}
                 onSearch={(event, items, query) => {
                     const surpriseItem = multiSelectItem("Surprise! (added from custom search)", "surprise");

                     return [surpriseItem, ...items.filter(x => x.text.toUpperCase().startsWith(query.toUpperCase()))];
                 }}
                 onValuesChange={logValuesChanged}
             />
    )
    .add("disabled",
         () =>
             <MultiSelect
                 items={DEFAULT_ITEMS}
                 defaultValues={[GROUP_RESTORED_VALUE, GROUP_NAME_CHANGED_VALUE]}
                 disabled
                 onValuesChange={logValuesChanged}
             />
    )
    .add("dont close on blur",
         () =>
             <MultiSelect
                 items={DEFAULT_ITEMS}
                 closeOnBlur={false}
                 closeOnOutsideClick
                 onValuesChange={logValuesChanged}
             />
    );

stories("/controlled")
    .add("stateful",
         () =>
             <ControlledMultiSelect
                 items={DEFAULT_ITEMS}
                 values={[GROUP_NAME_CHANGED_VALUE, GROUP_RESTORED_VALUE]}
                 onValuesChange={logValuesChanged}
             />
    );

