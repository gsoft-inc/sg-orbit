import { MultiSelect, multiSelectItem } from "@orbit-ui/react-multi-select/src";
import { fireEvent, render, wait, waitForDomChange, waitForElement } from "@testing-library/react";
import { noop } from "lodash";
import userEvent from "@testing-library/user-event";

const TRIGGER_ID = "multi-select-dropdown-trigger";
const SEARCH_INPUT_ID = "multi-select-dropdown-search-input";
const MENU_ID = "multi-select-dropdown-menu";
const MENU_ITEMS_ID = "multi-select-dropdown-menu-items";
const MENU_ITEM_ID = "multi-select-dropdown-item";
const NO_RESULTS_ID = "multi-select-dropdown-menu-no-results";
const SELECTED_ITEM_ID = "multi-select-selected-item";
const CLEAR_BUTTON_ID = "multi-select-clear-button";

const GROUP_CREATED_VALUE = "group-created";
const GROUP_RESTORED_VALUE = "group-restored";
const GROUP_DELETED_VALUE = "group-deleted";
const GROUP_NAME_CHANGED_VALUE = "group-name-changed";
const GROUP_PRIVACY_CHANGED_VALUE = "group-privacy-changed";

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

// ***** Behaviors *****

test("open the dropdown menu on trigger click", async () => {
    const { getByTestId } = render(createMultiSelect());

    userEvent.click(getByTestId(TRIGGER_ID));

    const menuNode = await waitForElement(() => getByTestId(MENU_ID));

    expect(menuNode).toBeInTheDocument();
});

test("open the dropdown menu on space keydown", async () => {
    const { getByTestId } = render(createMultiSelect());

    fireEvent.keyDown(getByTestId(TRIGGER_ID), { key: " ", keyCode: 32 });

    const menuNode = await waitForElement(() => getByTestId(MENU_ID));

    expect(menuNode).toBeInTheDocument();
});

test("open the dropdown menu on enter keydown", async () => {
    const { getByTestId } = render(createMultiSelect());

    fireEvent.keyDown(getByTestId(TRIGGER_ID), { key: "Enter", keyCode: 13 });

    const menuNode = await waitForElement(() => getByTestId(MENU_ID));

    expect(menuNode).toBeInTheDocument();
});

test("close the dropdown menu on esc keydown", async () => {
    const { getByTestId } = render(createMultiSelect({
        defaultOpen: true
    }));

    const menuNode = await waitForElement(() => getByTestId(MENU_ID));

    fireEvent.keyDown(document, { key: "Escape", keyCode: 27 });
    await wait();

    expect(menuNode).not.toBeInTheDocument();
});

test("close the dropdown menu on outside click", async () => {
    const { getByTestId } = render(createMultiSelect({
        defaultOpen: true
    }));

    const menuNode = await waitForElement(() => getByTestId(MENU_ID));

    userEvent.click(document.body);
    await wait();

    expect(menuNode).not.toBeInTheDocument();
});

test("close the dropdown menu on trigger click", async () => {
    const { getByTestId } = render(createMultiSelect({
        defaultOpen: true
    }));

    const menuNode = await waitForElement(() => getByTestId(MENU_ID));

    userEvent.click(getByTestId(TRIGGER_ID));
    await wait();

    expect(menuNode).not.toBeInTheDocument();
});

test("when disabled, dont open the dropdown menu on trigger click", async () => {
    const { getByTestId, queryByTestId } = render(createMultiSelect({
        disabled: true
    }));

    userEvent.click(getByTestId(TRIGGER_ID));
    await wait();

    expect(queryByTestId(MENU_ID)).toBeNull();
});

test("search input is focused on open", async () => {
    const { getByTestId } = render(createMultiSelect());

    userEvent.click(getByTestId(TRIGGER_ID));

    const searchInputNode = await waitForElement(() => getByTestId(SEARCH_INPUT_ID));

    expect(searchInputNode).toHaveFocus();
});

test("can navigate through the dropdown menu item with arrows keydown", async () => {
    const { getByTestId, getAllByTestId, container } = render(createMultiSelect());

    userEvent.click(getByTestId(TRIGGER_ID));
    await waitForElement(() => getByTestId(SEARCH_INPUT_ID));

    fireEvent.keyDown(container, { key: "ArrowDown", keyCode: 40 });
    fireEvent.keyDown(container, { key: "ArrowDown", keyCode: 40 });
    fireEvent.keyDown(container, { key: "ArrowDown", keyCode: 40 });
    fireEvent.keyDown(container, { key: "ArrowUp", keyCode: 38 });
    await wait();

    expect(getAllByTestId(MENU_ITEM_ID)[1]).toHaveClass("selected");
});

test("dont close the dropdown menu on search input click", async () => {
    const { getByTestId } = render(createMultiSelect({
        defaultOpen: true
    }));

    const menuNode = await waitForElement(() => getByTestId(MENU_ID));

    userEvent.click(getByTestId(SEARCH_INPUT_ID));
    await wait();

    expect(menuNode).toBeInTheDocument();
});

test("when closeOnSelect is false, dont close the dropdown menu on item click", async () => {
    const { getByTestId, getAllByTestId } = render(createMultiSelect({
        defaultOpen: true
    }));

    const menuNode = await waitForElement(() => getByTestId(MENU_ID));

    userEvent.click(getAllByTestId(MENU_ITEM_ID)[0]);
    await wait();

    expect(menuNode).toBeInTheDocument();
});

test("when closeOnSelect is false, dont close the dropdown menu on item enter keydown", async () => {
    const { getByTestId } = render(createMultiSelect({
        defaultOpen: true
    }));

    const menuNode = await waitForElement(() => getByTestId(MENU_ID));

    fireEvent.keyDown(document, { key: "ArrowDown", keyCode: 40 });
    fireEvent.keyDown(document, { key: "Enter", keyCode: 13 });
    await wait();

    expect(menuNode).toBeInTheDocument();
});

test("when closeOnSelect is true, close the dropdown menu on item click", async () => {
    const { getByTestId, getAllByTestId } = render(createMultiSelect({
        defaultOpen: true,
        closeOnSelect: true
    }));

    const menuNode = await waitForElement(() => getByTestId(MENU_ID));

    userEvent.click(getAllByTestId(MENU_ITEM_ID)[0]);
    await wait();

    expect(menuNode).not.toBeInTheDocument();
});

test("when closeOnSelect is true, close the dropdown menu on item enter keydown", async () => {
    const { getByTestId } = render(createMultiSelect({
        defaultOpen: true,
        closeOnSelect: true
    }));

    const menuNode = await waitForElement(() => getByTestId(MENU_ID));

    fireEvent.keyDown(document, { key: "ArrowDown", keyCode: 40 });
    fireEvent.keyDown(document, { key: "Enter", keyCode: 13 });
    await wait();

    expect(menuNode).not.toBeInTheDocument();
});

test("without a search input, all the dropdown menu items are displayed", async () => {
    const { getByTestId, getAllByTestId } = render(createMultiSelect({
        defaultOpen: true
    }));

    await waitForElement(() => getByTestId(MENU_ID));

    expect(getAllByTestId(MENU_ITEM_ID).length).toBe(DEFAULT_ITEMS.length);
});

test("typing a search input filter out the available dropdown menu items", async () => {
    const { getByTestId, getAllByTestId } = render(createMultiSelect({
        defaultOpen: true
    }));

    await waitForElement(() => getByTestId(MENU_ID));

    expect(getAllByTestId(MENU_ITEM_ID).length).toBe(DEFAULT_ITEMS.length);

    userEvent.type(getByTestId(SEARCH_INPUT_ID), "N");
    await waitForDomChange(getByTestId(MENU_ITEMS_ID));

    expect(getAllByTestId(MENU_ITEM_ID).length).toBe(1);
});

test("search input is case insensitive", async () => {
    const { getByTestId, getAllByTestId } = render(createMultiSelect({
        defaultOpen: true
    }));

    await waitForElement(() => getByTestId(MENU_ID));

    expect(getAllByTestId(MENU_ITEM_ID).length).toBe(DEFAULT_ITEMS.length);

    userEvent.type(getByTestId(SEARCH_INPUT_ID), "n");
    await waitForDomChange(getByTestId(MENU_ITEMS_ID));

    expect(getAllByTestId(MENU_ITEM_ID).length).toBe(1);
});

test("when no items match the search input, empty results is shown", async () => {
    const { getByTestId, getAllByTestId } = render(createMultiSelect({
        defaultOpen: true
    }));

    await waitForElement(() => getByTestId(MENU_ID));

    expect(getAllByTestId(MENU_ITEM_ID).length).toBe(DEFAULT_ITEMS.length);

    userEvent.type(getByTestId(SEARCH_INPUT_ID), "abc");
    await waitForDomChange(getByTestId(MENU_ITEMS_ID));

    expect(getByTestId(NO_RESULTS_ID)).toBeInTheDocument();
});

test("selecting a dropdown menu item add a new selected item", async () => {
    const { getByTestId, queryAllByTestId, getAllByTestId } = render(createMultiSelect({
        defaultOpen: true
    }));

    expect(queryAllByTestId(SELECTED_ITEM_ID, { exact: false }).length).toBe(0);

    await waitForElement(() => getByTestId(MENU_ID));

    userEvent.click(getAllByTestId(MENU_ITEM_ID)[0]);
    await wait();

    const selectedItem = getByTestId(`${SELECTED_ITEM_ID}-${DEFAULT_ITEMS[0].value}`);

    expect(selectedItem).toBeInTheDocument();
});

test("selecting a dropdown menu item remove the item from the dropdown menu items", async () => {
    const { getByTestId, queryAllByTestId, getAllByTestId } = render(createMultiSelect({
        defaultOpen: true
    }));

    expect(queryAllByTestId(SELECTED_ITEM_ID, { exact: false }).length).toBe(0);

    await waitForElement(() => getByTestId(MENU_ID));

    userEvent.click(getAllByTestId(MENU_ITEM_ID)[0]);
    await wait();

    expect(getAllByTestId(MENU_ITEM_ID)[0].querySelector("span")).not.toHaveTextContent(DEFAULT_ITEMS[0].text);
});

test("when the dropdown menu close, focus the trigger", async () => {
    const { getByTestId } = render(createMultiSelect({
        defaultOpen: true
    }));

    await waitForElement(() => getByTestId(MENU_ID));

    fireEvent.keyDown(document, { key: "Escape", keyCode: 27 });
    await wait();

    expect(getByTestId(TRIGGER_ID)).toHaveFocus();
});

test("selected item is removed on remove button click", async () => {
    const { getByTestId } = render(createMultiSelect({
        defaultValues: DEFAULT_ITEMS.map(x => x.value)
    }));

    const selectedItem = getByTestId(`${SELECTED_ITEM_ID}-${GROUP_RESTORED_VALUE}`);

    userEvent.click(selectedItem.querySelector("button"));
    await wait();

    expect(selectedItem).not.toBeInTheDocument();
});

test("when removed, the item is available again in the dropdown menu items", async () => {
    const { getByTestId, getAllByTestId } = render(createMultiSelect({
        defaultValues: DEFAULT_ITEMS.map(x => x.value)
    }));

    const selectedItem = getByTestId(`${SELECTED_ITEM_ID}-${GROUP_RESTORED_VALUE}`);

    userEvent.click(selectedItem.querySelector("button"));
    await wait();

    userEvent.click(getByTestId(TRIGGER_ID));
    await waitForElement(() => getByTestId(MENU_ID));

    const menuItemsNodes = getAllByTestId(MENU_ITEM_ID);

    expect(menuItemsNodes.length).toBe(1);
    expect(menuItemsNodes[0].querySelector("span")).toHaveTextContent(DEFAULT_ITEMS[1].text);
});

test("remove all the selected items on clear all button click", async () => {
    const { getByTestId, queryAllByTestId } = render(createMultiSelect({
        defaultValues: DEFAULT_ITEMS.map(x => x.value)
    }));

    expect(queryAllByTestId(SELECTED_ITEM_ID, { exact: false }).length).toBe(DEFAULT_ITEMS.length);

    userEvent.click(getByTestId(CLEAR_BUTTON_ID));
    await wait();

    expect(queryAllByTestId(SELECTED_ITEM_ID, { exact: false }).length).toBe(0);
});

// ***** Handlers *****

test("call onValuesChange with the new selected item when an item is selected", async () => {
    const handler = jest.fn();
    const defaultValues = [DEFAULT_ITEMS[4].value];

    const { getByTestId, getAllByTestId } = render(createMultiSelect({
        defaultOpen: true,
        defaultValues: defaultValues,
        onValuesChange: handler
    }));

    await waitForElement(() => getByTestId(MENU_ID));

    userEvent.click(getAllByTestId(MENU_ITEM_ID)[1]);
    await wait();

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), [...defaultValues, DEFAULT_ITEMS[1].value], expect.anything());
});

test("call onValuesChange without the removed item when a selected item is removed", async () => {
    const handler = jest.fn();
    const defaultValues = [DEFAULT_ITEMS[0].value, DEFAULT_ITEMS[1].value, DEFAULT_ITEMS[2].value];

    const { getByTestId } = render(createMultiSelect({
        defaultValues: defaultValues,
        onValuesChange: handler
    }));

    userEvent.click(getByTestId(`${SELECTED_ITEM_ID}-${GROUP_RESTORED_VALUE}`).querySelector("button"));
    await wait();

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), [DEFAULT_ITEMS[0].value, DEFAULT_ITEMS[2].value], expect.anything());
});

test("call onValuesChange without values when all the selected items are cleared", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(createMultiSelect({
        defaultValues: DEFAULT_ITEMS.map(x => x.value),
        onValuesChange: handler
    }));

    userEvent.click(getByTestId(CLEAR_BUTTON_ID));
    await wait();

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), [], expect.anything());
});

test("call onVisibilityChange when the dropdown menu is opened with a trigger click", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(createMultiSelect({
        onVisibilityChange: handler
    }));

    userEvent.click(getByTestId(TRIGGER_ID));
    await wait();

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), true, expect.anything());
});

test("call onVisibilityChange when the dropdown menu is opened with space keydown", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(createMultiSelect({
        onVisibilityChange: handler
    }));

    fireEvent.keyDown(getByTestId(TRIGGER_ID), { key: " ", keyCode: 32 });
    await wait();

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), true, expect.anything());
});

test("call onVisibilityChange when the dropdown menu is opened with enter keydown", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(createMultiSelect({
        onVisibilityChange: handler
    }));

    fireEvent.keyDown(getByTestId(TRIGGER_ID), { key: "Enter", keyCode: 13 });
    await wait();

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), true, expect.anything());
});

test("call onVisibilityChange when the dropdown menu is closed with a trigger click", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(createMultiSelect({
        defaultOpen: true,
        onVisibilityChange: handler
    }));

    await waitForElement(() => getByTestId(MENU_ID));

    userEvent.click(getByTestId(TRIGGER_ID));
    await wait();

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), false, expect.anything());
});

test("call onVisibilityChange when the dropdown menu is closed with esc keydown", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(createMultiSelect({
        defaultOpen: true,
        onVisibilityChange: handler
    }));

    await waitForElement(() => getByTestId(MENU_ID));

    fireEvent.keyDown(document, { key: "Escape", keyCode: 27 });
    await wait();

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), false, expect.anything());
});

test("call onVisibilityChange when the dropdown menu is closed with an outside click", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(createMultiSelect({
        defaultOpen: true,
        onVisibilityChange: handler
    }));

    await waitForElement(() => getByTestId(MENU_ID));

    userEvent.click(document.body);
    await wait();

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), false, expect.anything());
});

test("call onVisibilityChange when the dropdown menu is closed by selecting a value (closeOnSelect)", async () => {
    const handler = jest.fn();

    const { getByTestId, getAllByTestId } = render(createMultiSelect({
        defaultOpen: true,
        closeOnSelect: true,
        onVisibilityChange: handler
    }));

    await waitForElement(() => getByTestId(MENU_ID));

    userEvent.click(getAllByTestId(MENU_ITEM_ID)[1]);
    await wait();

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), false, expect.anything());
});

test("call onSearch when the search input change", async () => {
    const handler = jest.fn(() => {
        return [];
    });

    const { getByTestId } = render(createMultiSelect({
        defaultOpen: true,
        onSearch: handler
    }));

    await waitForElement(() => getByTestId(MENU_ID));

    userEvent.type(getByTestId(SEARCH_INPUT_ID), "N");
    await waitForDomChange(getByTestId(MENU_ITEMS_ID));

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), DEFAULT_ITEMS, "N", expect.anything());
});

test("call onSearch with groups when specified", async () => {
    const handler = jest.fn(() => {
        return [];
    });

    const ITEM = multiSelectItem("Created", GROUP_CREATED_VALUE, "group 1");

    const { getByTestId } = render(createMultiSelect({
        defaultOpen: true,
        items: [ITEM],
        onSearch: handler
    }));

    await waitForElement(() => getByTestId(MENU_ID));

    userEvent.type(getByTestId(SEARCH_INPUT_ID), "N");
    await waitForDomChange(getByTestId(MENU_ITEMS_ID));

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), [ITEM], "N", expect.anything());
});

test("call onSearch with custom object when specified", async () => {
    const handler = jest.fn(() => {
        return [];
    });

    const ITEM = multiSelectItem("Created", GROUP_CREATED_VALUE, null, { foo: "bar" });

    const { getByTestId } = render(createMultiSelect({
        defaultOpen: true,
        items: [ITEM],
        onSearch: handler
    }));

    await waitForElement(() => getByTestId(MENU_ID));

    userEvent.type(getByTestId(SEARCH_INPUT_ID), "N");
    await waitForDomChange(getByTestId(MENU_ITEMS_ID));

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), [ITEM], "N", expect.anything());
});

test("results returned by onSearch are shown", async () => {
    const results = [DEFAULT_ITEMS[0], DEFAULT_ITEMS[1]];

    const handler = jest.fn(() => {
        return results;
    });

    const { getByTestId, getAllByTestId } = render(createMultiSelect({
        defaultOpen: true,
        onSearch: handler
    }));

    await waitForElement(() => getByTestId(MENU_ID));

    userEvent.type(getByTestId(SEARCH_INPUT_ID), "N");
    await waitForDomChange(getByTestId(MENU_ITEMS_ID));

    const menuItemsNodes = getAllByTestId(MENU_ITEM_ID);

    expect(menuItemsNodes.length).toBe(2);
    expect(menuItemsNodes[0].querySelector("span")).toHaveTextContent(results[0].text);
    expect(menuItemsNodes[1].querySelector("span")).toHaveTextContent(results[1].text);
});

test("onSearch is not call with the already selected items", async () => {
    const handler = jest.fn(() => {
        return [];
    });

    const { getByTestId } = render(createMultiSelect({
        defaultOpen: true,
        defaultValues: DEFAULT_ITEMS.map(x => x.value).filter(x => x !== DEFAULT_ITEMS[0].value),
        onSearch: handler
    }));

    await waitForElement(() => getByTestId(MENU_ID));

    userEvent.type(getByTestId(SEARCH_INPUT_ID), "N");
    await waitForDomChange(getByTestId(MENU_ITEMS_ID));

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), [DEFAULT_ITEMS[0]], "N", expect.anything());
});
