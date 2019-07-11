import { ReactComponent as CustomAddIcon } from "./assets/icon-custom-add.svg";
import { ReactComponent as CustomSearchIcon } from "./assets/icon-custom-search.svg";
import { DEFAULT_ITEMS, DEFAULT_ITEMS_WITH_CATEGORIES, GROUP_NAME_CHANGED_VALUE, GROUP_RESTORED_VALUE, logValuesChanged } from "../shared";
import { Dropdown } from "semantic-ui-react";
import { MultiSelect } from "../../src";
import { storiesBuilder } from "../../../../storybook/utils/stories-builder";

function stories(segment) {
    return storiesBuilder("Multi-Select|specs")
        .segment(segment)
        .chromaticDelay(100)
        .build();
}

stories("/dropdown")
    .add("some items", () =>
        <MultiSelect
            items={DEFAULT_ITEMS}
            defaultOpened
            onValuesChange={logValuesChanged}
        />
    )
    .add("no items", () =>
        <MultiSelect
            items={[]}
            defaultOpened
            onValuesChange={logValuesChanged}
        />
    )
    .add("categories", () =>
        <MultiSelect
            items={DEFAULT_ITEMS_WITH_CATEGORIES}
            defaultOpened
            onValuesChange={logValuesChanged}
        />
    )

stories("/selected values")
    .add("no values", () =>
        <MultiSelect
            items={DEFAULT_ITEMS}
            onValuesChange={logValuesChanged}
        />
    )
    .add("some values", () =>
        <MultiSelect
            items={DEFAULT_ITEMS}
            values={[GROUP_NAME_CHANGED_VALUE, GROUP_RESTORED_VALUE]}
            onValuesChange={logValuesChanged}
        />
    )
    .add("all values", () =>
        <MultiSelect
            items={DEFAULT_ITEMS}
            values={DEFAULT_ITEMS.map(x => x.value)}
            onValuesChange={logValuesChanged}
        />
    )
    .add("can clear when all values selected", () =>
        <MultiSelect
            items={DEFAULT_ITEMS}
            values={DEFAULT_ITEMS.map(x => x.value)}
            onValuesChange={logValuesChanged}
        />
    )
    .add("cannot clear when no values selected", () =>
        <MultiSelect
            items={DEFAULT_ITEMS}
            values={[]}
            onValuesChange={logValuesChanged}
        />
    )
    .add("can add when no values selected", () =>
        <MultiSelect
            items={DEFAULT_ITEMS}
            values={[]}
            onValuesChange={logValuesChanged}
        />
    )
    .add("can add when all values selected", () =>
        <MultiSelect
            items={DEFAULT_ITEMS}
            values={DEFAULT_ITEMS.map(x => x.value)}
            onValuesChange={logValuesChanged}
        />
    );

stories("/default values")
    .add("no values", () =>
        <MultiSelect
            items={DEFAULT_ITEMS}
            onValuesChange={logValuesChanged}
        />
    )
    .add("some values", () =>
        <MultiSelect
            items={DEFAULT_ITEMS}
            defaultValues={[GROUP_NAME_CHANGED_VALUE, GROUP_RESTORED_VALUE]}
            onValuesChange={logValuesChanged}
        />
    )
    .add("all values", () =>
        <MultiSelect
            items={DEFAULT_ITEMS}
            defaultValues={DEFAULT_ITEMS.map(x => x.value)}
            onValuesChange={logValuesChanged}
        />
    );

stories("/disabled")
    .add("values", () =>
        <MultiSelect
            items={DEFAULT_ITEMS}
            disabled
            onValuesChange={logValuesChanged}
        />
    )
    .add("no values", () =>
        <MultiSelect
            items={DEFAULT_ITEMS}
            values={[GROUP_RESTORED_VALUE, GROUP_NAME_CHANGED_VALUE]}
            disabled
            onValuesChange={logValuesChanged}
        />
    );

stories("/customization")
    .add("dropdown", () =>
        <MultiSelect
            items={DEFAULT_ITEMS}
            dropdown={<MultiSelect.Dropdown className="bg-red" />}
            onValuesChange={logValuesChanged}
        />
    )
    .add("item renderer", () =>
        <MultiSelect
            items={DEFAULT_ITEMS}
            itemRenderer={(item, isSelected) => {
                return <Dropdown.Item text={item.text} value={item.value} selected={isSelected} className="bg-red" />;
            }}
            defaultOpened
            onValuesChange={logValuesChanged}
        />
    )
    .add("header renderer", () =>
        <MultiSelect
            items={DEFAULT_ITEMS_WITH_CATEGORIES}
            categoryHeaderRenderer={(group) => {
                return <Dropdown.Header content={group} className="bg-red" />;
            }}
            defaultOpened
            onValuesChange={logValuesChanged}
        />
    )
    .add("no results message", () =>
        <MultiSelect
            items={[]}
            noResultsMessage="Custom no results message"
            defaultOpened
            onValuesChange={logValuesChanged}
        />
    )
    .add("trigger text", () =>
        <MultiSelect
            items={DEFAULT_ITEMS}
            triggerText="Custom trigger text"
            onValuesChange={logValuesChanged}
        />
    )
    .add("trigger icon", () =>
        <MultiSelect
            items={DEFAULT_ITEMS}
            triggerIcon={<CustomAddIcon />}
            onValuesChange={logValuesChanged}
        />
    )
    .add("search icon", () =>
        <MultiSelect
            items={DEFAULT_ITEMS}
            searchIcon={<CustomSearchIcon />}
            defaultOpened
            onValuesChange={logValuesChanged}
        />
    )
    .add("placeholder", () =>
        <MultiSelect
            items={DEFAULT_ITEMS}
            placeholder="Custom placeholder"
            defaultOpened
            onValuesChange={logValuesChanged}
        />
    )
    .add("selected items components", () =>
        <MultiSelect
            items={DEFAULT_ITEMS}
            values={[GROUP_NAME_CHANGED_VALUE, GROUP_RESTORED_VALUE]}
            selectedItemsComponent={<MultiSelect.SelectedItems className="bg-red" />}
            onValuesChange={logValuesChanged}
        />
    )

