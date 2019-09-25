import { MultiSelect, multiSelectItem } from "@orbit-ui/react-multi-select/src";
import { fireEvent, queryByTestId, render, wait, waitForElement } from "@testing-library/react";
import { noop } from "lodash";

const TRIGGER_ID = "multi-select-dropdown-trigger";
const MENU_ID = "multi-select-dropdown-menu";
const SEARCH_INPUT_ID = "multi-select-dropdown-search-input";

const GROUP_CREATED_VALUE = "Group Created";
const GROUP_RESTORED_VALUE = "Group Restored";
const GROUP_DELETED_VALUE = "Group Deleted";
const GROUP_NAME_CHANGED_VALUE = "Group Name Changed";
const GROUP_PRIVACY_CHANGED_VALUE = "Group Privacy Changed";

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

test("open the dropdown menu on space", async () => {
    const { getByTestId } = render(createMultiSelect());

    fireEvent.keyDown(getByTestId(TRIGGER_ID), { key: " ", keyCode: 32 });

    const menuNode = await waitForElement(() => getByTestId(MENU_ID));

    expect(menuNode).toBeInTheDocument();
});

test("open the dropdown menu on enter", async () => {
    const { getByTestId } = render(createMultiSelect());

    fireEvent.keyDown(getByTestId(TRIGGER_ID), { key: "Enter", keyCode: 13 });

    const menuNode = await waitForElement(() => getByTestId(MENU_ID));

    expect(menuNode).toBeInTheDocument();
});

test("close the dropdown menu on esc", async () => {
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
    const { getByTestId } = render(createMultiSelect({
        disabled: true
    }));

    fireEvent.click(getByTestId(TRIGGER_ID));
    await wait();

    expect(queryByTestId(document, MENU_ID)).toBeNull();
});

test("when disabled, dont open the dropdown menu on space", async () => {
    const { getByTestId } = render(createMultiSelect({
        disabled: true
    }));

    fireEvent.keyDown(getByTestId(TRIGGER_ID), { key: " ", keyCode: 32 });
    await wait();

    expect(queryByTestId(document, MENU_ID)).toBeNull();
});

test("when disabled, dont open the dropdown menu on enter", async () => {
    const { getByTestId } = render(createMultiSelect({
        disabled: true
    }));

    fireEvent.keyDown(getByTestId(TRIGGER_ID), { key: "Enter", keyCode: 13 });
    await wait();

    expect(queryByTestId(document, MENU_ID)).toBeNull();
});

test("search input is focused on open", async () => {
    const { getByTestId } = render(createMultiSelect());

    fireEvent.click(getByTestId(TRIGGER_ID));

    const searchInputNode = await waitForElement(() => getByTestId(SEARCH_INPUT_ID));

    expect(searchInputNode).toHaveFocus();
});

// closeOnSelect
// Trigger focused on close
// Arrow up / Down
// Select Item on enter
// Remove item when click the (x)
// Clear all remove all items
// Filter results when typing
// Disabled
