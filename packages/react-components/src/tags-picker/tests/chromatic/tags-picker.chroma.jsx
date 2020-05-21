import { AddIcon } from "@react-components/icons";
import { TagsPicker, tagsPickerItem } from "@react-components/tags-picker";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";
import { noop } from "lodash";

const GROUP_CREATED_VALUE = "group-created";
const GROUP_RESTORED_VALUE = "group-restored";
const GROUP_DELETED_VALUE = "group-deleted";
const GROUP_NAME_CHANGED_VALUE = "group-name-changed";
const GROUP_PRIVACY_CHANGED_VALUE = "group-privacy-changed";

const DEFAULT_ITEMS = [
    tagsPickerItem("Created", GROUP_CREATED_VALUE),
    tagsPickerItem("Restored", GROUP_RESTORED_VALUE),
    tagsPickerItem("Deleted", GROUP_DELETED_VALUE),
    tagsPickerItem("Name Changed", GROUP_NAME_CHANGED_VALUE),
    tagsPickerItem("Privacy Changed", GROUP_PRIVACY_CHANGED_VALUE)
];

const DEFAULT_ITEMS_WITH_CATEGORIES = [
    tagsPickerItem("Created", GROUP_CREATED_VALUE, "Group Lifecycle"),
    tagsPickerItem("Restored", GROUP_RESTORED_VALUE, "Group Lifecycle"),
    tagsPickerItem("Deleted", GROUP_DELETED_VALUE, "Collaboration"),
    tagsPickerItem("Name Changed", GROUP_NAME_CHANGED_VALUE, "Collaboration"),
    tagsPickerItem("Privacy Changed", GROUP_PRIVACY_CHANGED_VALUE, "Others")
];

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("TagsPicker"))
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .build())
        .build();
}

function createTagsPicker({ items = DEFAULT_ITEMS, ...otherProps } = {}) {
    return <TagsPicker
        items={items}
        onValuesChange={noop}
        {...otherProps}
    />;
}

stories()
    .add("opened", () =>
        createTagsPicker({
            open: true
        })
    )
    .add("default opened", () =>
        createTagsPicker({
            defaultOpen: true
        })
    )
    .add("size",
         () =>
             <div className="flex flex-column">
                 <div className="flex" style={{ marginBottom: "150px" }}>
                     {createTagsPicker({
                         size: "small",
                         defaultValues: [GROUP_NAME_CHANGED_VALUE, GROUP_RESTORED_VALUE]
                     })}
                 </div>
                 <div className="flex" style={{ marginBottom: "150px" }}>
                     {createTagsPicker({
                         defaultValues: [GROUP_NAME_CHANGED_VALUE, GROUP_RESTORED_VALUE]
                     })}
                 </div>
                 <div className="flex">
                     {createTagsPicker({
                         size: "large",
                         defaultValues: [GROUP_NAME_CHANGED_VALUE, GROUP_RESTORED_VALUE]
                     })}
                 </div>
             </div>
    )
    .add("focused",
         () =>
             createTagsPicker({
                 focus: true
             })
    );

stories("/dropdown")
    .add("some items",
         () =>
             createTagsPicker({
                 defaultOpen: true
             })
    )
    .add("no items",
         () =>
             createTagsPicker({
                 items: [],
                 defaultOpen: true
             })
    )
    .add("categories",
         () =>
             createTagsPicker({
                 items: DEFAULT_ITEMS_WITH_CATEGORIES,
                 defaultOpen: true
             })
    );

stories("/selected values")
    .add("no selection",
         () =>
             createTagsPicker()
    )
    .add("some values selected",
         () =>
             createTagsPicker({
                 values: [GROUP_NAME_CHANGED_VALUE, GROUP_RESTORED_VALUE]
             })
    )
    .add("all values selected",
         () =>
             createTagsPicker({
                 values: DEFAULT_ITEMS.map(x => x.value)
             })
    );

stories("/selected values/clear button")
    .add("can clear when all values selected",
         () =>
             createTagsPicker({
                 values: DEFAULT_ITEMS.map(x => x.value)
             })
    )
    .add("cannot clear when no selection",
         () =>
             createTagsPicker({
                 values: []
             })
    );

stories("/selected values/add button")
    .add("can add when no selection",
         () =>
             createTagsPicker({
                 values: []
             })
    )
    .add("can add when all values selected",
         () =>
             createTagsPicker({
                 values: DEFAULT_ITEMS.map(x => x.value)
             })
    );

stories("/default values")
    .add("some values selected",
         () =>
             createTagsPicker({
                 defaultValues: [GROUP_NAME_CHANGED_VALUE, GROUP_RESTORED_VALUE]
             })
    )
    .add("all values selected",
         () =>
             createTagsPicker({
                 defaultValues: DEFAULT_ITEMS.map(x => x.value)
             })
    );

stories("/disabled")
    .add("values selected",
         () =>
             createTagsPicker({
                 defaultValues: [GROUP_RESTORED_VALUE, GROUP_NAME_CHANGED_VALUE],
                 disabled: true
             })
    )
    .add("no selection",
         () =>
             createTagsPicker({
                 disabled: true
             })
    );

stories("/customization")
    .add("dropdown",
         () =>
             createTagsPicker({
                 dropdown: <TagsPicker.Dropdown className="bg-red border-red" />
             })
    )
    .add("no results message",
         () =>
             createTagsPicker({
                 items: [],
                 noResultsMessage: "Custom no results message",
                 defaultOpen: true
             })
    )
    .add("add text",
         () =>
             createTagsPicker({
                 addText: "Custom add text"
             })
    )
    .add("trigger", () =>
        createTagsPicker({
            dropdown: <TagsPicker.Dropdown trigger={<TagsPicker.Trigger className="bg-red" />} />
        })
    )
    .add("trigger icon",
         () =>
             createTagsPicker({
                 dropdown: <TagsPicker.Dropdown triggerIcon={<AddIcon className="fill-red" />} />
             })
    )
    .add("search input element",
         () =>
             createTagsPicker({
                 dropdown: <TagsPicker.Dropdown searchInput={<TagsPicker.SearchInput className="border-red" />} />,
                 defaultOpen: true
             })
    )
    .add("search input object",
         () =>
             createTagsPicker({
                 dropdown: <TagsPicker.Dropdown searchInput={{ className: "border-red" }} />,
                 defaultOpen: true
             })
    )
    .add("placeholder",
         () =>
             createTagsPicker({
                 placeholder: "Custom placeholder",
                 defaultOpen: true
             })
    )
    .add("selected items components",
         () =>
             createTagsPicker({
                 defaultValues: [GROUP_NAME_CHANGED_VALUE, GROUP_RESTORED_VALUE],
                 selectedItemsComponent: <TagsPicker.SelectedItems className="bg-red border-red" />
             })
    )
    .add("selected item renderer",
         () =>
             createTagsPicker({
                 defaultValues: [GROUP_NAME_CHANGED_VALUE, GROUP_RESTORED_VALUE],
                 selectedItemsComponent: <TagsPicker.SelectedItems itemRenderer={item => <div>{item.text}</div>} />
             })
    )
    .add("clear button",
         () =>
             createTagsPicker({
                 defaultValues: [GROUP_NAME_CHANGED_VALUE, GROUP_RESTORED_VALUE],
                 clearButton: <TagsPicker.ClearButton className="bg-red" />
             })
    )
    .add("clear text",
         () =>
             createTagsPicker({
                 defaultValues: [GROUP_NAME_CHANGED_VALUE, GROUP_RESTORED_VALUE],
                 clearButton: <TagsPicker.ClearButton text="Custom clear text" />
             })
    )
    .add("styling", () =>
        <div className="flex">
            {createTagsPicker({
                defaultValues: [GROUP_NAME_CHANGED_VALUE, GROUP_RESTORED_VALUE],
                className: "bg-red mr5"
            })}
            {createTagsPicker({
                defaultValues: [GROUP_NAME_CHANGED_VALUE, GROUP_RESTORED_VALUE],
                style: { backgroundColor: "red" }
            })}
        </div>
    );
