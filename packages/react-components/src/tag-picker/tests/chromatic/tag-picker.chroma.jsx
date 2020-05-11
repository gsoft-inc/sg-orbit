import { AddIcon } from "@react-components/icons";
import { TagPicker, tagPickerItem } from "@react-components/tag-picker";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";
import { noop } from "lodash";

const GROUP_CREATED_VALUE = "group-created";
const GROUP_RESTORED_VALUE = "group-restored";
const GROUP_DELETED_VALUE = "group-deleted";
const GROUP_NAME_CHANGED_VALUE = "group-name-changed";
const GROUP_PRIVACY_CHANGED_VALUE = "group-privacy-changed";

const DEFAULT_ITEMS = [
    tagPickerItem("Created", GROUP_CREATED_VALUE),
    tagPickerItem("Restored", GROUP_RESTORED_VALUE),
    tagPickerItem("Deleted", GROUP_DELETED_VALUE),
    tagPickerItem("Name Changed", GROUP_NAME_CHANGED_VALUE),
    tagPickerItem("Privacy Changed", GROUP_PRIVACY_CHANGED_VALUE)
];

const DEFAULT_ITEMS_WITH_CATEGORIES = [
    tagPickerItem("Created", GROUP_CREATED_VALUE, "Group Lifecycle"),
    tagPickerItem("Restored", GROUP_RESTORED_VALUE, "Group Lifecycle"),
    tagPickerItem("Deleted", GROUP_DELETED_VALUE, "Collaboration"),
    tagPickerItem("Name Changed", GROUP_NAME_CHANGED_VALUE, "Collaboration"),
    tagPickerItem("Privacy Changed", GROUP_PRIVACY_CHANGED_VALUE, "Others")
];

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("TagPicker"))
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .build())
        .build();
}

function createTagPicker({ items = DEFAULT_ITEMS, ...otherProps } = {}) {
    return <TagPicker
        items={items}
        onValuesChange={noop}
        {...otherProps}
    />;
}

stories()
    .add("opened", () =>
        createTagPicker({
            open: true
        })
    )
    .add("default opened", () =>
        createTagPicker({
            defaultOpen: true
        })
    )
    .add("size",
         () =>
             <div className="flex flex-column">
                 <div className="flex" style={{ marginBottom: "150px" }}>
                     {createTagPicker({
                         size: "small",
                         defaultValues: [GROUP_NAME_CHANGED_VALUE, GROUP_RESTORED_VALUE]
                     })}
                 </div>
                 <div className="flex" style={{ marginBottom: "150px" }}>
                     {createTagPicker({
                         defaultValues: [GROUP_NAME_CHANGED_VALUE, GROUP_RESTORED_VALUE]
                     })}
                 </div>
                 <div className="flex">
                     {createTagPicker({
                         size: "large",
                         defaultValues: [GROUP_NAME_CHANGED_VALUE, GROUP_RESTORED_VALUE]
                     })}
                 </div>
             </div>
    );

stories("/dropdown")
    .add("some items",
         () =>
             createTagPicker({
                 defaultOpen: true
             })
    )
    .add("no items",
         () =>
             createTagPicker({
                 items: [],
                 defaultOpen: true
             })
    )
    .add("categories",
         () =>
             createTagPicker({
                 items: DEFAULT_ITEMS_WITH_CATEGORIES,
                 defaultOpen: true
             })
    );

stories("/selected values")
    .add("no selection",
         () =>
             createTagPicker()
    )
    .add("some values selected",
         () =>
             createTagPicker({
                 values: [GROUP_NAME_CHANGED_VALUE, GROUP_RESTORED_VALUE]
             })
    )
    .add("all values selected",
         () =>
             createTagPicker({
                 values: DEFAULT_ITEMS.map(x => x.value)
             })
    );

stories("/selected values/clear button")
    .add("can clear when all values selected",
         () =>
             createTagPicker({
                 values: DEFAULT_ITEMS.map(x => x.value)
             })
    )
    .add("cannot clear when no selection",
         () =>
             createTagPicker({
                 values: []
             })
    );

stories("/selected values/add button")
    .add("can add when no selection",
         () =>
             createTagPicker({
                 values: []
             })
    )
    .add("can add when all values selected",
         () =>
             createTagPicker({
                 values: DEFAULT_ITEMS.map(x => x.value)
             })
    );

stories("/default values")
    .add("some values selected",
         () =>
             createTagPicker({
                 defaultValues: [GROUP_NAME_CHANGED_VALUE, GROUP_RESTORED_VALUE]
             })
    )
    .add("all values selected",
         () =>
             createTagPicker({
                 defaultValues: DEFAULT_ITEMS.map(x => x.value)
             })
    );

stories("/disabled")
    .add("values selected",
         () =>
             createTagPicker({
                 defaultValues: [GROUP_RESTORED_VALUE, GROUP_NAME_CHANGED_VALUE],
                 disabled: true
             })
    )
    .add("no selection",
         () =>
             createTagPicker({
                 disabled: true
             })
    );

stories("/customization")
    .add("dropdown",
         () =>
             createTagPicker({
                 dropdown: <TagPicker.Dropdown className="bg-red border-red" />
             })
    )
    .add("no results message",
         () =>
             createTagPicker({
                 items: [],
                 noResultsMessage: "Custom no results message",
                 defaultOpen: true
             })
    )
    .add("add text",
         () =>
             createTagPicker({
                 addText: "Custom add text"
             })
    )
    .add("trigger", () =>
        createTagPicker({
            dropdown: <TagPicker.Dropdown trigger={<TagPicker.Trigger className="bg-red" />} />
        })
    )
    .add("trigger icon",
         () =>
             createTagPicker({
                 dropdown: <TagPicker.Dropdown triggerIcon={<AddIcon className="fill-red" />} />
             })
    )
    .add("search input",
         () =>
             createTagPicker({
                 dropdown: <TagPicker.Dropdown searchInput={<TagPicker.SearchInput className="bg-red border-red" />} />,
                 defaultOpen: true
             })
    )
    .add("placeholder",
         () =>
             createTagPicker({
                 placeholder: "Custom placeholder",
                 defaultOpen: true
             })
    )
    .add("selected items components",
         () =>
             createTagPicker({
                 defaultValues: [GROUP_NAME_CHANGED_VALUE, GROUP_RESTORED_VALUE],
                 selectedItemsComponent: <TagPicker.SelectedItems className="bg-red border-red" />
             })
    )
    .add("selected item renderer",
         () =>
             createTagPicker({
                 defaultValues: [GROUP_NAME_CHANGED_VALUE, GROUP_RESTORED_VALUE],
                 selectedItemsComponent: <TagPicker.SelectedItems itemRenderer={item => <div>{item.text}</div>} />
             })
    )
    .add("clear button",
         () =>
             createTagPicker({
                 defaultValues: [GROUP_NAME_CHANGED_VALUE, GROUP_RESTORED_VALUE],
                 clearButton: <TagPicker.ClearButton className="bg-red" />
             })
    )
    .add("clear text",
         () =>
             createTagPicker({
                 defaultValues: [GROUP_NAME_CHANGED_VALUE, GROUP_RESTORED_VALUE],
                 clearButton: <TagPicker.ClearButton text="Custom clear text" />
             })
    )
    .add("styling", () =>
        <div className="flex">
            {createTagPicker({
                defaultValues: [GROUP_NAME_CHANGED_VALUE, GROUP_RESTORED_VALUE],
                className: "bg-red mr5"
            })}
            {createTagPicker({
                defaultValues: [GROUP_NAME_CHANGED_VALUE, GROUP_RESTORED_VALUE],
                style: { backgroundColor: "red" }
            })}
        </div>
    );
