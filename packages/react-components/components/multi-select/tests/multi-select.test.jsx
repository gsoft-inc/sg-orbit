import { MultiSelect, multiSelectItem } from "@orbit-ui/react-multi-select/src";
import { fireEvent, getByRole as getByRoleUnscoped, render, wait, waitForDomChange, waitForElement } from "@testing-library/react";
import { noop } from "lodash";

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

test("open the dropdown menu on trigger click", async () => {
    const { getByTestId } = render(createMultiSelect());

    fireEvent.click(getByTestId(TRIGGER_ID));

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

    fireEvent.click(document);
    await wait();

    expect(menuNode).not.toBeInTheDocument();
});

test("close the dropdown menu on trigger click", async () => {
    const { getByTestId } = render(createMultiSelect({
        defaultOpen: true
    }));

    const menuNode = await waitForElement(() => getByTestId(MENU_ID));

    fireEvent.click(getByTestId(TRIGGER_ID));
    await wait();

    expect(menuNode).not.toBeInTheDocument();
});

test("when disabled, dont open the dropdown menu on trigger click", async () => {
    const { getByTestId, queryByTestId } = render(createMultiSelect({
        disabled: true
    }));

    fireEvent.click(getByTestId(TRIGGER_ID));
    await wait();

    expect(queryByTestId(MENU_ID)).toBeNull();
});

test("when disabled, dont open the dropdown menu on space keydown", async () => {
    const { getByTestId, queryByTestId } = render(createMultiSelect({
        disabled: true
    }));

    fireEvent.keyDown(getByTestId(TRIGGER_ID), { key: " ", keyCode: 32 });
    await wait();

    expect(queryByTestId(MENU_ID)).toBeNull();
});

test("when disabled, dont open the dropdown menu on enter keydown", async () => {
    const { getByTestId, queryByTestId } = render(createMultiSelect({
        disabled: true
    }));

    fireEvent.keyDown(getByTestId(TRIGGER_ID), { key: "Enter", keyCode: 13 });
    await wait();

    expect(queryByTestId(MENU_ID)).toBeNull();
});

test("search input is focused on open", async () => {
    const { getByTestId } = render(createMultiSelect());

    fireEvent.click(getByTestId(TRIGGER_ID));

    const searchInputNode = await waitForElement(() => getByTestId(SEARCH_INPUT_ID));

    expect(searchInputNode).toHaveFocus();
});

test("can select a dropdown menu item with arrows keydown", async () => {
    const { getByTestId, getAllByTestId } = render(createMultiSelect({
        defaultOpen: true
    }));

    await waitForElement(() => getByTestId(MENU_ID));

    fireEvent.keyDown(getByTestId(TRIGGER_ID), { key: "ArrowDown", keyCode: 40 });
    fireEvent.keyDown(getByTestId(TRIGGER_ID), { key: "ArrowDown", keyCode: 40 });
    fireEvent.keyDown(getByTestId(TRIGGER_ID), { key: "ArrowDown", keyCode: 40 });
    fireEvent.keyDown(getByTestId(TRIGGER_ID), { key: "ArrowUp", keyCode: 38 });
    await wait();

    expect(getAllByTestId(MENU_ITEM_ID)[1]).toHaveClass("selected");
});

test("dont close the dropdown menu on search input click", async () => {
    const { getByTestId } = render(createMultiSelect({
        defaultOpen: true
    }));

    const menuNode = await waitForElement(() => getByTestId(MENU_ID));

    fireEvent.click(getByTestId(SEARCH_INPUT_ID));
    await wait();

    expect(menuNode).toBeInTheDocument();
});

test("when closeOnSelect is false, dont close the dropdown menu on item click", async () => {
    const { getByTestId, getAllByTestId } = render(createMultiSelect({
        defaultOpen: true
    }));

    const menuNode = await waitForElement(() => getByTestId(MENU_ID));

    fireEvent.click(getAllByTestId(MENU_ITEM_ID)[0]);
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

    fireEvent.click(getAllByTestId(MENU_ITEM_ID)[0]);
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

test("without any search input, all the dropdown menu items are displayed", async () => {
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

    fireEvent.change(getByTestId(SEARCH_INPUT_ID), { target: { value: "N" } });
    await waitForDomChange(getByTestId(MENU_ITEMS_ID));

    expect(getAllByTestId(MENU_ITEM_ID).length).toBe(1);
});

test("search input filter is case insensitive", async () => {
    const { getByTestId, getAllByTestId } = render(createMultiSelect({
        defaultOpen: true
    }));

    await waitForElement(() => getByTestId(MENU_ID));

    expect(getAllByTestId(MENU_ITEM_ID).length).toBe(DEFAULT_ITEMS.length);

    fireEvent.change(getByTestId(SEARCH_INPUT_ID), { target: { value: "n" } });
    await waitForDomChange(getByTestId(MENU_ITEMS_ID));

    expect(getAllByTestId(MENU_ITEM_ID).length).toBe(1);
});

test("when no items match the search input filter, empty results is shown", async () => {
    const { getByTestId, getAllByTestId } = render(createMultiSelect({
        defaultOpen: true
    }));

    await waitForElement(() => getByTestId(MENU_ID));

    expect(getAllByTestId(MENU_ITEM_ID).length).toBe(DEFAULT_ITEMS.length);

    fireEvent.change(getByTestId(SEARCH_INPUT_ID), { target: { value: "abc" } });
    await waitForDomChange(getByTestId(MENU_ITEMS_ID));

    expect(getByTestId(NO_RESULTS_ID)).toBeInTheDocument();
});

test("selecting a dropdown menu item add a new selected item", async () => {
    const { getByTestId, queryAllByTestId, getAllByTestId } = render(createMultiSelect({
        defaultOpen: true
    }));

    expect(queryAllByTestId(SELECTED_ITEM_ID, { exact: false }).length).toBe(0);

    await waitForElement(() => getByTestId(MENU_ID));

    fireEvent.click(getAllByTestId(MENU_ITEM_ID)[0]);
    await wait();

    const selectedItem = getByTestId(`${SELECTED_ITEM_ID}-${DEFAULT_ITEMS[0].value}`);

    expect(selectedItem).toBeInTheDocument();
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

    expect(selectedItem).toBeInTheDocument();

    fireEvent.click(getByRoleUnscoped(selectedItem, "button"));
    await wait();

    expect(selectedItem).not.toBeInTheDocument();
});

test("remove all the selected items on clear all button click", async () => {
    const { getByTestId, queryAllByTestId } = render(createMultiSelect({
        defaultValues: DEFAULT_ITEMS.map(x => x.value)
    }));

    expect(queryAllByTestId(SELECTED_ITEM_ID, { exact: false }).length).toBe(DEFAULT_ITEMS.length);

    fireEvent.click(getByTestId(CLEAR_BUTTON_ID));
    await wait();

    expect(queryAllByTestId(SELECTED_ITEM_ID, { exact: false }).length).toBe(0);
});
