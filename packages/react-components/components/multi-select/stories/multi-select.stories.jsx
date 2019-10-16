import { ControlledMultiSelect } from "./components";
import { DEFAULT_ITEMS, DEFAULT_ITEMS_WITH_CATEGORIES, GROUP_NAME_CHANGED_VALUE, GROUP_RESTORED_VALUE } from "./data";
import { MultiSelect, multiSelectItem } from "@orbit-ui/react-multi-select/src";
import { boolean, text, withKnobs } from "@storybook/addon-knobs";
import { storiesOfBuilder } from "@utils/stories-of-builder";

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

