import { CustomAddIcon, CustomSearchIcon } from "./assets";
import { DEFAULT_ITEMS, DEFAULT_ITEMS_WITH_CATEGORIES, GROUP_NAME_CHANGED_VALUE, GROUP_RESTORED_VALUE, logValuesChanged } from "@stories/react-components/multi-select/shared";
import { Dropdown } from "semantic-ui-react";
import { MultiSelect } from "@orbit-ui/react-multi-select/src";
import { storiesBuilder } from "@utils/stories-builder";

function stories(segment) {
    return storiesBuilder(module, "Multi-Select|specs")
        .segment(segment)
        .chromaticDelay(100)
        .build();
}

stories("/dropdown")
    .add("some items",
         () =>
             <MultiSelect
                 items={DEFAULT_ITEMS}
                 defaultOpen
                 onValuesChange={logValuesChanged}
             />
    )
    .add("no items",
         () =>
             <MultiSelect
                 items={[]}
                 defaultOpen
                 onValuesChange={logValuesChanged}
             />
    )
    .add("categories",
         () =>
             <MultiSelect
                 items={DEFAULT_ITEMS_WITH_CATEGORIES}
                 defaultOpen
                 onValuesChange={logValuesChanged}
             />
    );

stories("/selected values")
    .add("no selection",
         () =>
             <MultiSelect
                 items={DEFAULT_ITEMS}
                 onValuesChange={logValuesChanged}
             />
    )
    .add("some values selected",
         () =>
             <MultiSelect
                 items={DEFAULT_ITEMS}
                 values={[GROUP_NAME_CHANGED_VALUE, GROUP_RESTORED_VALUE]}
                 onValuesChange={logValuesChanged}
             />
    )
    .add("all values selected",
         () =>
             <MultiSelect
                 items={DEFAULT_ITEMS}
                 values={DEFAULT_ITEMS.map(x => x.value)}
                 onValuesChange={logValuesChanged}
             />
    );

stories("/selected values/clear button")
    .add("can clear when all values selected",
         () =>
             <MultiSelect
                 items={DEFAULT_ITEMS}
                 values={DEFAULT_ITEMS.map(x => x.value)}
                 onValuesChange={logValuesChanged}
             />
    )
    .add("cannot clear when no selection",
         () =>
             <MultiSelect
                 items={DEFAULT_ITEMS}
                 values={[]}
                 onValuesChange={logValuesChanged}
             />
    );

stories("/selected values/add button")
    .add("can add when no selection",
         () =>
             <MultiSelect
                 items={DEFAULT_ITEMS}
                 values={[]}
                 onValuesChange={logValuesChanged}
             />
    )
    .add("can add when all values selected",
         () =>
             <MultiSelect
                 items={DEFAULT_ITEMS}
                 values={DEFAULT_ITEMS.map(x => x.value)}
                 onValuesChange={logValuesChanged}
             />
    );

stories("/default values")
    .add("some values selected",
         () =>
             <MultiSelect
                 items={DEFAULT_ITEMS}
                 defaultValues={[GROUP_NAME_CHANGED_VALUE, GROUP_RESTORED_VALUE]}
                 onValuesChange={logValuesChanged}
             />
    )
    .add("all values selected",
         () =>
             <MultiSelect
                 items={DEFAULT_ITEMS}
                 defaultValues={DEFAULT_ITEMS.map(x => x.value)}
                 onValuesChange={logValuesChanged}
             />
    );

stories("/disabled")
    .add("values selected",
         () =>
             <MultiSelect
                 items={DEFAULT_ITEMS}
                 disabled
                 onValuesChange={logValuesChanged}
             />
    )
    .add("no selection",
         () =>
             <MultiSelect
                 items={DEFAULT_ITEMS}
                 defaultValues={[GROUP_RESTORED_VALUE, GROUP_NAME_CHANGED_VALUE]}
                 disabled
                 onValuesChange={logValuesChanged}
             />
    );

stories("/customization")
    .add("dropdown",
         () =>
             <MultiSelect
                 items={DEFAULT_ITEMS}
                 dropdown={<MultiSelect.Dropdown className="bg-red" />}
                 onValuesChange={logValuesChanged}
             />
    )
    .add("item renderer",
         () =>
             <MultiSelect
                 items={DEFAULT_ITEMS}
                 itemRenderer={(item, isSelected) => {
                     return <Dropdown.Item text={item.text} value={item.value} selected={isSelected} className="bg-red" />;
                 }}
                 defaultOpen
                 onValuesChange={logValuesChanged}
             />
    )
    .add("header renderer",
         () =>
             <MultiSelect
                 items={DEFAULT_ITEMS_WITH_CATEGORIES}
                 categoryHeaderRenderer={group => {
                     return <Dropdown.Header content={group} className="bg-red" />;
                 }}
                 defaultOpen
                 onValuesChange={logValuesChanged}
             />
    )
    .add("no results message",
         () =>
             <MultiSelect
                 items={[]}
                 noResultsMessage="Custom no results message"
                 defaultOpen
                 onValuesChange={logValuesChanged}
             />
    )
    .add("trigger text",
         () =>
             <MultiSelect
                 items={DEFAULT_ITEMS}
                 triggerText="Custom trigger text"
                 onValuesChange={logValuesChanged}
             />
    )
    .add("trigger icon",
         () =>
             <MultiSelect
                 items={DEFAULT_ITEMS}
                 triggerIcon={<CustomAddIcon />}
                 onValuesChange={logValuesChanged}
             />
    )
    .add("search icon",
         () =>
             <MultiSelect
                 items={DEFAULT_ITEMS}
                 searchIcon={<CustomSearchIcon />}
                 defaultOpen
                 onValuesChange={logValuesChanged}
             />
    )
    .add("placeholder",
         () =>
             <MultiSelect
                 items={DEFAULT_ITEMS}
                 placeholder="Custom placeholder"
                 defaultOpen
                 onValuesChange={logValuesChanged}
             />
    )
    .add("selected items components",
         () =>
             <MultiSelect
                 items={DEFAULT_ITEMS}
                 defaultValues={[GROUP_NAME_CHANGED_VALUE, GROUP_RESTORED_VALUE]}
                 selectedItemsComponent={<MultiSelect.SelectedItems className="bg-red" />}
                 onValuesChange={logValuesChanged}
             />
    )
    .add("selected item renderer",
         () =>
             <MultiSelect
                 items={DEFAULT_ITEMS}
                 defaultValues={[GROUP_NAME_CHANGED_VALUE, GROUP_RESTORED_VALUE]}
                 selectedItemRenderer={item => <div>{item.text}</div>}
                 onValuesChange={logValuesChanged}
             />
    )
    .add("clear button",
         () =>
             <MultiSelect
                 items={DEFAULT_ITEMS}
                 defaultValues={[GROUP_NAME_CHANGED_VALUE, GROUP_RESTORED_VALUE]}
                 clearButton={<MultiSelect.ClearButton className="bg-red" />}
                 onValuesChange={logValuesChanged}
             />
    )
    .add("clear text",
         () =>
             <MultiSelect
                 items={DEFAULT_ITEMS}
                 defaultValues={[GROUP_NAME_CHANGED_VALUE, GROUP_RESTORED_VALUE]}
                 clearText="Custom clear text"
                 onValuesChange={logValuesChanged}
             />
    )
    .add("css class",
         () =>
             <MultiSelect
                 items={DEFAULT_ITEMS}
                 defaultValues={[GROUP_NAME_CHANGED_VALUE, GROUP_RESTORED_VALUE]}
                 className="bg-red"
                 onValuesChange={logValuesChanged}
             />
    );

