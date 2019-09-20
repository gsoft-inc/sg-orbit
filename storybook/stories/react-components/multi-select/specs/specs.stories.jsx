import { AddIcon, MagnifierIcon } from "@orbit-ui/icons";
import { DEFAULT_ITEMS, DEFAULT_ITEMS_WITH_CATEGORIES, GROUP_NAME_CHANGED_VALUE, GROUP_RESTORED_VALUE, logValuesChanged } from "@stories/react-components/multi-select/shared";
import { Dropdown } from "semantic-ui-react";
import { MultiSelect as MS } from "@orbit-ui/react-multi-select/src";
import { storiesBuilder } from "@utils/stories-builder";

function MultiSelect(props) {
    return <MS
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
             <MultiSelect
                 items={DEFAULT_ITEMS}
                 defaultOpen
             />
    )
    .add("no items",
         () =>
             <MultiSelect
                 items={[]}
                 defaultOpen
             />
    )
    .add("categories",
         () =>
             <MultiSelect
                 items={DEFAULT_ITEMS_WITH_CATEGORIES}
                 defaultOpen
             />
    );

stories("/selected values")
    .add("no selection",
         () =>
             <MultiSelect
                 items={DEFAULT_ITEMS}
             />
    )
    .add("some values selected",
         () =>
             <MultiSelect
                 items={DEFAULT_ITEMS}
                 values={[GROUP_NAME_CHANGED_VALUE, GROUP_RESTORED_VALUE]}
             />
    )
    .add("all values selected",
         () =>
             <MultiSelect
                 items={DEFAULT_ITEMS}
                 values={DEFAULT_ITEMS.map(x => x.value)}
             />
    );

stories("/selected values/clear button")
    .add("can clear when all values selected",
         () =>
             <MultiSelect
                 items={DEFAULT_ITEMS}
                 values={DEFAULT_ITEMS.map(x => x.value)}
             />
    )
    .add("cannot clear when no selection",
         () =>
             <MultiSelect
                 items={DEFAULT_ITEMS}
                 values={[]}
             />
    );

stories("/selected values/add button")
    .add("can add when no selection",
         () =>
             <MultiSelect
                 items={DEFAULT_ITEMS}
                 values={[]}
             />
    )
    .add("can add when all values selected",
         () =>
             <MultiSelect
                 items={DEFAULT_ITEMS}
                 values={DEFAULT_ITEMS.map(x => x.value)}
             />
    );

stories("/default values")
    .add("some values selected",
         () =>
             <MultiSelect
                 items={DEFAULT_ITEMS}
                 defaultValues={[GROUP_NAME_CHANGED_VALUE, GROUP_RESTORED_VALUE]}
             />
    )
    .add("all values selected",
         () =>
             <MultiSelect
                 items={DEFAULT_ITEMS}
                 defaultValues={DEFAULT_ITEMS.map(x => x.value)}
             />
    );

stories("/disabled")
    .add("values selected",
         () =>
             <MultiSelect
                 items={DEFAULT_ITEMS}
                 disabled
             />
    )
    .add("no selection",
         () =>
             <MultiSelect
                 items={DEFAULT_ITEMS}
                 defaultValues={[GROUP_RESTORED_VALUE, GROUP_NAME_CHANGED_VALUE]}
                 disabled
             />
    );

stories("/customization")
    .add("dropdown",
         () =>
             <MultiSelect
                 items={DEFAULT_ITEMS}
                 dropdown={<MultiSelect.Dropdown className="bg-red border-red" />}
             />
    )
    .add("item renderer",
         () =>
             <MultiSelect
                 items={DEFAULT_ITEMS}
                 dropdown={
                     <MultiSelect.Dropdown itemRenderer={(item, isSelected) => <Dropdown.Item text={item.text} value={item.value} selected={isSelected} className="bg-red" />} />
                 }
                 defaultOpen
             />
    )
    .add("header renderer",
         () =>
             <MultiSelect
                 items={DEFAULT_ITEMS_WITH_CATEGORIES}
                 dropdown={
                     <MultiSelect.Dropdown headerRenderer={group => <Dropdown.Header content={group} className="bg-red" />} />
                 }
                 defaultOpen
             />
    )
    .add("no results message",
         () =>
             <MultiSelect
                 items={[]}
                 noResultsMessage="Custom no results message"
                 defaultOpen
             />
    )
    .add("add text",
         () =>
             <MultiSelect
                 items={DEFAULT_ITEMS}
                 addText="Custom add text"
             />
    )
    .add("trigger", () =>
        <MultiSelect
            items={DEFAULT_ITEMS}
            dropdown={<MultiSelect.Dropdown trigger={<MultiSelect.Trigger className="bg-red" />} />}
        />
    )
    .add("trigger icon",
         () =>
             <MultiSelect
                 items={DEFAULT_ITEMS}
                 dropdown={<MultiSelect.Dropdown triggerIcon={<AddIcon className="w3 h3 fill-red ml2" />} />}
             />
    )
    .add("search input",
         () =>
             <MultiSelect
                 items={DEFAULT_ITEMS}
                 dropdown={<MultiSelect.Dropdown searchInput={<MultiSelect.SearchInput className="bg-red border-red" />} />}
                 defaultOpen
             />
    )
    .add("search icon",
         () =>
             <MultiSelect
                 items={DEFAULT_ITEMS}
                 dropdown={<MultiSelect.Dropdown searchIcon={<MagnifierIcon className="w4 h4 fill-red" />} />}
                 defaultOpen
             />
    )
    .add("placeholder",
         () =>
             <MultiSelect
                 items={DEFAULT_ITEMS}
                 placeholder="Custom placeholder"
                 defaultOpen
             />
    )
    .add("selected items components",
         () =>
             <MultiSelect
                 items={DEFAULT_ITEMS}
                 defaultValues={[GROUP_NAME_CHANGED_VALUE, GROUP_RESTORED_VALUE]}
                 selectedItemsComponent={<MultiSelect.SelectedItems className="bg-red border-red" />}
             />
    )
    .add("selected item renderer",
         () =>
             <MultiSelect
                 items={DEFAULT_ITEMS}
                 defaultValues={[GROUP_NAME_CHANGED_VALUE, GROUP_RESTORED_VALUE]}
                 selectedItemsComponent={<MultiSelect.SelectedItems itemRenderer={item => <div>{item.text}</div>} />}
             />
    )
    .add("clear button",
         () =>
             <MultiSelect
                 items={DEFAULT_ITEMS}
                 defaultValues={[GROUP_NAME_CHANGED_VALUE, GROUP_RESTORED_VALUE]}
                 clearButton={<MultiSelect.ClearButton className="bg-red" />}
             />
    )
    .add("clear text",
         () =>
             <MultiSelect
                 items={DEFAULT_ITEMS}
                 defaultValues={[GROUP_NAME_CHANGED_VALUE, GROUP_RESTORED_VALUE]}
                 clearButton={<MultiSelect.ClearButton text="Custom clear text" />}
             />
    )
    .add("css class",
         () =>
             <MultiSelect
                 items={DEFAULT_ITEMS}
                 defaultValues={[GROUP_NAME_CHANGED_VALUE, GROUP_RESTORED_VALUE]}
                 className="bg-red border-red"
             />
    );

