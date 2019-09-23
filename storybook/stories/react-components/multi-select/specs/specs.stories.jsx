import { AddIcon, MagnifierIcon } from "@orbit-ui/icons";
import { DEFAULT_ITEMS, DEFAULT_ITEMS_WITH_CATEGORIES, GROUP_NAME_CHANGED_VALUE, GROUP_RESTORED_VALUE, logValuesChanged } from "@stories/react-components/multi-select/shared";
import { Dropdown } from "semantic-ui-react";
import { MultiSelect } from "@orbit-ui/react-multi-select/src";
import { storiesBuilder } from "@utils/stories-builder";

function createMultiSelect(props = {}) {
    return <MultiSelect
        onValuesChange={logValuesChanged}
        {...props}
    />;
}

function stories(segment) {
    return storiesBuilder(module, "Multi-Select|specs")
        .segment(segment)
        .chromaticDelay(100)
        .build();
}

stories("/dropdown")
    .add("some items",
         () =>
             createMultiSelect({
                 items: DEFAULT_ITEMS,
                 defaultOpen: true
             })
    )
    .add("no items",
         () =>
             createMultiSelect({
                 items: [],
                 defaultOpen: true
             })
    )
    .add("categories",
         () =>
             createMultiSelect({
                 items: DEFAULT_ITEMS_WITH_CATEGORIES,
                 defaultOpen: true
             })
    );

stories("/selected values")
    .add("no selection",
         () =>
             createMultiSelect({
                 items: DEFAULT_ITEMS
             })
    )
    .add("some values selected",
         () =>
             createMultiSelect({
                 items: DEFAULT_ITEMS,
                 values: [GROUP_NAME_CHANGED_VALUE, GROUP_RESTORED_VALUE]
             })
    )
    .add("all values selected",
         () =>
             createMultiSelect({
                 items: DEFAULT_ITEMS,
                 values: DEFAULT_ITEMS.map(x => x.value)
             })
    );

stories("/selected values/clear button")
    .add("can clear when all values selected",
         () =>
             createMultiSelect({
                 items: DEFAULT_ITEMS,
                 values: DEFAULT_ITEMS.map(x => x.value)
             })
    )
    .add("cannot clear when no selection",
         () =>
             createMultiSelect({
                 items: DEFAULT_ITEMS,
                 values: []
             })
    );

stories("/selected values/add button")
    .add("can add when no selection",
         () =>
             createMultiSelect({
                 items: DEFAULT_ITEMS,
                 values: []
             })
    )
    .add("can add when all values selected",
         () =>
             createMultiSelect({
                 items: DEFAULT_ITEMS,
                 values: DEFAULT_ITEMS.map(x => x.value)
             })
    );

stories("/default values")
    .add("some values selected",
         () =>
             createMultiSelect({
                 items: DEFAULT_ITEMS,
                 defaultValues: [GROUP_NAME_CHANGED_VALUE, GROUP_RESTORED_VALUE]
             })
    )
    .add("all values selected",
         () =>
             createMultiSelect({
                 items: DEFAULT_ITEMS,
                 defaultvalues: DEFAULT_ITEMS.map(x => x.value)
             })
    );

stories("/disabled")
    .add("values selected",
         () =>
             createMultiSelect({
                 items: DEFAULT_ITEMS,
                 disabled: true
             })
    )
    .add("no selection",
         () =>
             createMultiSelect({
                 items: DEFAULT_ITEMS,
                 defaultValues: [GROUP_RESTORED_VALUE, GROUP_NAME_CHANGED_VALUE],
                 disabled: true
             })
    );

stories("/customization")
    .add("dropdown",
         () =>
             createMultiSelect({
                 items: DEFAULT_ITEMS,
                 dropdown: <MultiSelect.Dropdown className="bg-red border-red" />
             })
    )
    .add("item renderer",
         () =>
             createMultiSelect({
                 items: DEFAULT_ITEMS,
                 dropdown: <MultiSelect.Dropdown itemRenderer={(item, isSelected) => <Dropdown.Item text={item.text} value={item.value} selected={isSelected} className="bg-red" />} />,
                 defaultOpen: true
             })
    )
    .add("header renderer",
         () =>
             createMultiSelect({
                 items: DEFAULT_ITEMS_WITH_CATEGORIES,
                 dropdown: <MultiSelect.Dropdown headerRenderer={group => <Dropdown.Header content={group} className="bg-red" />} />,
                 defaultOpen: true
             })
    )
    .add("no results message",
         () =>
             createMultiSelect({
                 items: [],
                 noResultsMessage: "Custom no results message",
                 defaultOpen: true
             })
    )
    .add("add text",
         () =>
             createMultiSelect({
                 items: DEFAULT_ITEMS,
                 addText: "Custom add text"
             })
    )
    .add("trigger", () =>
        createMultiSelect({
            items: DEFAULT_ITEMS,
            dropdown: <MultiSelect.Dropdown trigger={<MultiSelect.Trigger className="bg-red" />} />
        })
    )
    .add("trigger icon",
         () =>
             createMultiSelect({
                 items: DEFAULT_ITEMS,
                 dropdown: <MultiSelect.Dropdown triggerIcon={<AddIcon className="w3 h3 fill-red ml2" />} />
             })
    )
    .add("search input",
         () =>
             createMultiSelect({
                 items: DEFAULT_ITEMS,
                 dropdown: <MultiSelect.Dropdown searchInput={<MultiSelect.SearchInput className="bg-red border-red" />} />,
                 defaultOpen: true
             })
    )
    .add("search icon",
         () =>
             createMultiSelect({
                 items: DEFAULT_ITEMS,
                 dropdown: <MultiSelect.Dropdown searchIcon={<MagnifierIcon className="w4 h4 fill-red" />} />,
                 defaultOpen: true
             })
    )
    .add("placeholder",
         () =>
             createMultiSelect({
                 items: DEFAULT_ITEMS,
                 placeholder: "Custom placeholder",
                 defaultOpen: true
             })
    )
    .add("selected items components",
         () =>
             createMultiSelect({
                 items: DEFAULT_ITEMS,
                 defaultValues: [GROUP_NAME_CHANGED_VALUE, GROUP_RESTORED_VALUE],
                 selectedItemsComponent: <MultiSelect.SelectedItems className="bg-red border-red" />
             })
    )
    .add("selected item renderer",
         () =>
             createMultiSelect({
                 items: DEFAULT_ITEMS,
                 defaultValues: [GROUP_NAME_CHANGED_VALUE, GROUP_RESTORED_VALUE],
                 selectedItemsComponent: <MultiSelect.SelectedItems itemRenderer={item => <div>{item.text}</div>} />
             })
    )
    .add("clear button",
         () =>
             createMultiSelect({
                 items: DEFAULT_ITEMS,
                 defaultValues: [GROUP_NAME_CHANGED_VALUE, GROUP_RESTORED_VALUE],
                 clearButton: <MultiSelect.ClearButton className="bg-red" />
             })
    )
    .add("clear text",
         () =>
             createMultiSelect({
                 items: DEFAULT_ITEMS,
                 defaultValues: [GROUP_NAME_CHANGED_VALUE, GROUP_RESTORED_VALUE],
                 clearButton: <MultiSelect.ClearButton text="Custom clear text" />
             })
    )
    .add("css class",
         () =>
             createMultiSelect({
                 items: DEFAULT_ITEMS,
                 defaultValues: [GROUP_NAME_CHANGED_VALUE, GROUP_RESTORED_VALUE],
                 className: "bg-red border-red"
             })
    );

