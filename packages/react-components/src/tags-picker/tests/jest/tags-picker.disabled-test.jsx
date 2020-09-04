// import { TagsPicker, tagsPickerItem } from "@react-components/tags-picker";
// import { act, fireEvent, render, waitFor } from "@testing-library/react";
// import { noop } from "lodash";
// import userEvent from "@utils/user-event";

// const TRIGGER_ID = "tags-picker-dropdown-trigger";
// const SEARCH_INPUT_ID = "tags-picker-dropdown-search-input";
// const MENU_ITEM_ID = "tags-picker-dropdown-item";
// const NO_RESULTS_ID = "tags-picker-dropdown-menu-no-results";
// const SELECTED_ITEM_ID = "tags-picker-selected-item";
// const CLEAR_BUTTON_ID = "tags-picker-clear-button";

// const GROUP_CREATED_VALUE = "group-created";
// const GROUP_RESTORED_VALUE = "group-restored";
// const GROUP_DELETED_VALUE = "group-deleted";
// const GROUP_NAME_CHANGED_VALUE = "group-name-changed";
// const GROUP_PRIVACY_CHANGED_VALUE = "group-privacy-changed";

// const DEFAULT_ITEMS = [
//     tagsPickerItem("Created", GROUP_CREATED_VALUE),
//     tagsPickerItem("Restored", GROUP_RESTORED_VALUE),
//     tagsPickerItem("Deleted", GROUP_DELETED_VALUE),
//     tagsPickerItem("Name Changed", GROUP_NAME_CHANGED_VALUE),
//     tagsPickerItem("Privacy Changed", GROUP_PRIVACY_CHANGED_VALUE)
// ];

// function createTagsPicker({ items = DEFAULT_ITEMS, onValuesChange = noop, ...otherProps } = {}) {
//     return <TagsPicker
//         items={items}
//         onValuesChange={onValuesChange}
//         dropdown={<TagsPicker.Dropdown debounceDelay={0} />}
//         {...otherProps}
//     />;
// }

// async function openDropdownMenu({ getByTestId, getAllByTestId, container } ) {
//     const triggerNode = await getByTestId(TRIGGER_ID);

//     act(() => {
//         userEvent.click(triggerNode);
//     });

//     await waitFor(() => getDropdownMenu(container));

//     return {
//         triggerNode,
//         queries: {
//             getDropdownMenu: () => {
//                 return getDropdownMenu(container);
//             },
//             getSearchInput: () => {
//                 return getSearchInput(getByTestId);
//             },
//             getMenuItems: () => {
//                 return getAllByTestId(MENU_ITEM_ID);
//             }
//         }
//     };
// }

// function getDropdownMenu(container) {
//     return container.querySelector("div.menu.visible");
// }

// function getSearchInput(getByTestId) {
//     return getByTestId(SEARCH_INPUT_ID);
// }

// function getSelectedItems(queryAllByTestId) {
//     return queryAllByTestId(SELECTED_ITEM_ID, { exact: false });
// }

// function getSelectedItem(itemValue, getByTestId) {
//     return getByTestId(`${SELECTED_ITEM_ID}-${itemValue}`);
// }

// // ***** Behaviors *****

// test("open the dropdown menu on trigger click", async () => {
//     const { getByTestId, container } = render(createTagsPicker());

//     act(() => {
//         userEvent.click(getByTestId(TRIGGER_ID));
//     });

//     const menuNode = await waitFor(() => getDropdownMenu(container));

//     await waitFor(() => expect(menuNode).toBeInTheDocument());
// });

// test("open the dropdown menu on trigger space keydown", async () => {
//     const { getByTestId, container } = render(createTagsPicker());

//     act(() => {
//         fireEvent.keyDown(getByTestId(TRIGGER_ID), { key: " ", keyCode: 32 });
//     });

//     const menuNode = await waitFor(() => getDropdownMenu(container));

//     await waitFor(() => expect(menuNode).toBeInTheDocument());
// });

// test("open the dropdown menu on trigger enter keydown", async () => {
//     const { getByTestId, container } = render(createTagsPicker());

//     act(() => {
//         userEvent.keyDown(getByTestId(TRIGGER_ID), { key: "Enter", keyCode: 13 });
//     });

//     const menuNode = await waitFor(() => getDropdownMenu(container));

//     await waitFor(() => expect(menuNode).toBeInTheDocument());
// });

// test("close the dropdown menu on esc keydown", async () => {
//     const renderResult = render(createTagsPicker());

//     const { queries } = await openDropdownMenu(renderResult);

//     act(() => {
//         fireEvent.keyDown(document, { key: "Escape", keyCode: 27 });
//     });

//     await waitFor(() => expect(queries.getDropdownMenu()).not.toBeInTheDocument());
// });

// test("close the dropdown menu on outside click", async () => {
//     const renderResult = render(createTagsPicker());

//     const { queries } = await openDropdownMenu(renderResult);

//     act(() => {
//         userEvent.click(document.body);
//     });

//     await waitFor(() => expect(queries.getDropdownMenu()).not.toBeInTheDocument());
// });

// test("close the dropdown menu on focusout", async () => {
//     const renderResult = render(createTagsPicker({
//         defaultValues: [GROUP_CREATED_VALUE]
//     }));

//     const { queries } = await openDropdownMenu(renderResult);

//     act(() => {
//         fireEvent.focusOut(queries.getSearchInput());
//     });

//     await waitFor(() => expect(queries.getDropdownMenu()).not.toBeInTheDocument());
// });

// test("close the dropdown menu on trigger click", async () => {
//     const renderResult = render(createTagsPicker());

//     const { triggerNode, queries } = await openDropdownMenu(renderResult);

//     act(() => {
//         userEvent.click(triggerNode);
//     });

//     await waitFor(() => expect(queries.getDropdownMenu()).not.toBeInTheDocument());
// });

// test("close the dropdown menu on trigger spacebar keydown", async () => {
//     const renderResult = render(createTagsPicker());

//     const { triggerNode, queries } = await openDropdownMenu(renderResult);

//     act(() => {
//         userEvent.keyDown(triggerNode, { key: "Enter", keyCode: 32 });
//     });

//     await waitFor(() => expect(queries.getDropdownMenu()).not.toBeInTheDocument());
// });

// test("close the dropdown menu on trigger enter keydown", async () => {
//     const renderResult = render(createTagsPicker());

//     const { triggerNode, queries } = await openDropdownMenu(renderResult);

//     act(() => {
//         userEvent.keyDown(triggerNode, { key: "Enter", keyCode: 13 });
//     });

//     await waitFor(() => expect(queries.getDropdownMenu()).not.toBeInTheDocument());
// });

// test("when disabled, dont open the dropdown menu on trigger click", async () => {
//     const { getByTestId, container } = render(createTagsPicker({
//         disabled: true
//     }));

//     act(() => {
//         userEvent.click(getByTestId(TRIGGER_ID));
//     });

//     expect(getDropdownMenu(container)).toBeNull();
// });

// test("search input is focused on open", async () => {
//     const renderResult = render(createTagsPicker());

//     const { queries } = await openDropdownMenu(renderResult);

//     await waitFor(() => expect(queries.getSearchInput()).toHaveFocus());
// });

// test("can navigate through the dropdown menu item with arrows keydown", async () => {
//     const renderResult = render(createTagsPicker());

//     const { container } = renderResult;

//     const { queries } = await openDropdownMenu(renderResult);

//     fireEvent.keyDown(container, { key: "ArrowDown", keyCode: 40 });
//     fireEvent.keyDown(container, { key: "ArrowDown", keyCode: 40 });
//     fireEvent.keyDown(container, { key: "ArrowDown", keyCode: 40 });
//     fireEvent.keyDown(container, { key: "ArrowUp", keyCode: 38 });

//     await waitFor(() => expect(queries.getMenuItems()[1]).toHaveClass("selected"));
// });

// test("dont close the dropdown menu on search input click", async () => {
//     const renderResult = render(createTagsPicker({
//         orbitId: "I AM 1"
//     }));

//     const { queries } = await openDropdownMenu(renderResult);

//     act(() => {
//         userEvent.click(queries.getSearchInput());
//     });

//     await waitFor(() => expect(queries.getDropdownMenu()).toBeInTheDocument());
// });

// test("when closeOnSelect is false, dont close the dropdown menu on item click", async () => {
//     const renderResult = render(createTagsPicker({
//         orbitId: "I AM 2"
//     }));

//     const { queries } = await openDropdownMenu(renderResult);

//     act(() => {
//         userEvent.click(queries.getMenuItems()[0]);
//     });

//     await waitFor(() => expect(queries.getDropdownMenu()).toBeInTheDocument());
// });

// test("when closeOnSelect is false, dont close the dropdown menu on item enter keydown", async () => {
//     const renderResult = render(createTagsPicker());

//     const { queries } = await openDropdownMenu(renderResult);

//     act(() => {
//         fireEvent.keyDown(document, { key: "ArrowDown", keyCode: 40 });
//     });

//     act(() => {
//         fireEvent.keyDown(document, { key: "Enter", keyCode: 13 });
//     });

//     await waitFor(() => expect(queries.getDropdownMenu()).toBeInTheDocument());
// });

// test("when closeOnSelect is true, close the dropdown menu on item click", async () => {
//     const renderResult = render(createTagsPicker({
//         closeOnSelect: true
//     }));

//     const { queries } = await openDropdownMenu(renderResult);

//     act(() => {
//         userEvent.click(queries.getMenuItems()[0]);
//     });

//     await waitFor(() => expect(queries.getDropdownMenu()).not.toBeInTheDocument());
// });

// test("when closeOnSelect is true, close the dropdown menu on item enter keydown", async () => {
//     const renderResult = render(createTagsPicker({
//         closeOnSelect: true
//     }));

//     const { queries } = await openDropdownMenu(renderResult);

//     act(() => {
//         fireEvent.keyDown(document, { key: "ArrowDown", keyCode: 40 });
//     });

//     act(() => {
//         fireEvent.keyDown(document, { key: "Enter", keyCode: 13 });
//     });

//     await waitFor(() => expect(queries.getDropdownMenu()).not.toBeInTheDocument());
// });

// test("without a search input, all the dropdown menu items are displayed", async () => {
//     const renderResult = render(createTagsPicker());

//     const { queries } = await openDropdownMenu(renderResult);

//     await waitFor(() => expect(queries.getMenuItems().length).toBe(DEFAULT_ITEMS.length));
// });

// test("typing a search input filter out the available dropdown menu items", async () => {
//     const renderResult = render(createTagsPicker());

//     const { queries } = await openDropdownMenu(renderResult);

//     await waitFor(() => expect(queries.getMenuItems().length).toBe(DEFAULT_ITEMS.length));

//     act(() => {
//         userEvent.type(queries.getSearchInput(), "N");
//     });

//     await waitFor(() => expect(queries.getMenuItems().length).toBe(1));
// });

// test("search input is case insensitive", async () => {
//     const renderResult = render(createTagsPicker());

//     const { queries } = await openDropdownMenu(renderResult);

//     await waitFor(() => expect(queries.getMenuItems().length).toBe(DEFAULT_ITEMS.length));

//     act(() => {
//         userEvent.type(queries.getSearchInput(), "n");
//     });

//     await waitFor(() => expect(queries.getMenuItems().length).toBe(1));
// });

// test("when no items match the search input, empty results is shown", async () => {
//     const renderResult = render(createTagsPicker());

//     const { getByTestId } = renderResult;

//     const { queries } = await openDropdownMenu(renderResult);

//     await waitFor(() => expect(queries.getMenuItems().length).toBe(DEFAULT_ITEMS.length));

//     act(() => {
//         userEvent.type(queries.getSearchInput(), "abc");
//     });

//     await waitFor(() => expect(getByTestId(NO_RESULTS_ID)).toBeInTheDocument());
// });

// test("selecting a dropdown menu item add a new selected item", async () => {
//     const renderResult = render(createTagsPicker());

//     const { queryAllByTestId, getByTestId } = renderResult;

//     await waitFor(() => expect(getSelectedItems(queryAllByTestId).length).toBe(0));

//     const { queries } = await openDropdownMenu(renderResult);

//     act(() => {
//         userEvent.click(queries.getMenuItems()[0]);
//     });

//     await waitFor(() => expect(getSelectedItem(DEFAULT_ITEMS[0].value, getByTestId)).toBeInTheDocument());
// });

// test("selecting a dropdown menu item remove the item from the dropdown menu items", async () => {
//     const renderResult = render(createTagsPicker());

//     const { queryAllByTestId } = renderResult;

//     await waitFor(() => expect(getSelectedItems(queryAllByTestId).length).toBe(0));

//     const { queries } = await openDropdownMenu(renderResult);

//     act(() => {
//         userEvent.click(queries.getMenuItems()[0]);
//     });

//     await waitFor(() => expect(queries.getMenuItems()[0].querySelector("span")).not.toHaveTextContent(DEFAULT_ITEMS[0].text));
// });

// test("when the dropdown menu close, focus the trigger", async () => {
//     const renderResult = render(createTagsPicker());

//     const { triggerNode } = await openDropdownMenu(renderResult);

//     act(() => {
//         fireEvent.keyDown(document, { key: "Escape", keyCode: 27 });
//     });

//     await waitFor(() => expect(triggerNode).toHaveFocus());
// });

// test("selected item is removed on remove button click", async () => {
//     const { getByTestId } = render(createTagsPicker({
//         defaultValues: DEFAULT_ITEMS.map(x => x.value)
//     }));

//     const selectedItem = getSelectedItem(GROUP_RESTORED_VALUE, getByTestId);

//     act(() => {
//         userEvent.click(selectedItem.querySelector("button"));
//     });

//     await waitFor(() => expect(selectedItem).not.toBeInTheDocument());
// });

// test("when removed, the item is available again in the dropdown menu items", async () => {
//     const renderResult = render(createTagsPicker({
//         defaultValues: DEFAULT_ITEMS.map(x => x.value)
//     }));

//     const { getByTestId } = renderResult;

//     act(() => {
//         userEvent.click(getSelectedItem(GROUP_RESTORED_VALUE, getByTestId).querySelector("button"));
//     });

//     const { queries } = await openDropdownMenu(renderResult);

//     await waitFor(() => expect(queries.getMenuItems().length).toBe(1));
//     await waitFor(() => expect(queries.getMenuItems()[0].querySelector("span")).toHaveTextContent(DEFAULT_ITEMS[1].text));
// });

// test("remove all the selected items on clear all button click", async () => {
//     const { getByTestId, queryAllByTestId } = render(createTagsPicker({
//         defaultValues: DEFAULT_ITEMS.map(x => x.value)
//     }));

//     await waitFor(() => expect(getSelectedItems(queryAllByTestId).length).toBe(DEFAULT_ITEMS.length));

//     act(() => {
//         userEvent.click(getByTestId(CLEAR_BUTTON_ID));
//     });

//     await waitFor(() => expect(getSelectedItems(queryAllByTestId).length).toBe(0));
// });

// test("clicking on the document body will not focus the trigger button", async () => {
//     const { getByTestId } = render(createTagsPicker());

//     act(() => {
//         userEvent.click(document.body);
//     });

//     await waitFor(() => expect(getByTestId(TRIGGER_ID)).not.toHaveFocus());
// });

// // ***** API *****

// test("call onValuesChange with the new selected item when an item is selected", async () => {
//     const handler = jest.fn();
//     const defaultValues = [DEFAULT_ITEMS[4].value];

//     const renderResult = render(createTagsPicker({
//         defaultValues: defaultValues,
//         onValuesChange: handler
//     }));

//     const { queries } = await openDropdownMenu(renderResult);

//     act(() => {
//         userEvent.click(queries.getMenuItems()[1]);
//     });

//     await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), [...defaultValues, DEFAULT_ITEMS[1].value]));
// });

// test("call onValuesChange without the removed item when a selected item is removed", async () => {
//     const handler = jest.fn();
//     const defaultValues = [DEFAULT_ITEMS[0].value, DEFAULT_ITEMS[1].value, DEFAULT_ITEMS[2].value];

//     const { getByTestId } = render(createTagsPicker({
//         defaultValues: defaultValues,
//         onValuesChange: handler
//     }));

//     act(() => {
//         userEvent.click(getSelectedItem(GROUP_RESTORED_VALUE, getByTestId).querySelector("button"));
//     });

//     await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), [DEFAULT_ITEMS[0].value, DEFAULT_ITEMS[2].value]));
// });

// test("call onValuesChange without values when all the selected items are cleared", async () => {
//     const handler = jest.fn();

//     const { getByTestId } = render(createTagsPicker({
//         defaultValues: DEFAULT_ITEMS.map(x => x.value),
//         onValuesChange: handler
//     }));

//     act(() => {
//         userEvent.click(getByTestId(CLEAR_BUTTON_ID));
//     });

//     await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), []));
// });

// test("call onVisibilityChange when the dropdown menu is opened with a trigger click", async () => {
//     const handler = jest.fn();

//     const { getByTestId } = render(createTagsPicker({
//         onVisibilityChange: handler
//     }));

//     act(() => {
//         userEvent.click(getByTestId(TRIGGER_ID));
//     });

//     await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), true));
// });

// test("call onVisibilityChange when the dropdown menu is opened with space keydown", async () => {
//     const handler = jest.fn();

//     const { getByTestId } = render(createTagsPicker({
//         onVisibilityChange: handler
//     }));

//     act(() => {
//         fireEvent.keyDown(getByTestId(TRIGGER_ID), { key: " ", keyCode: 32 });
//     });

//     await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), true));
// });

// test("call onVisibilityChange when the dropdown menu is opened with enter keydown", async () => {
//     const handler = jest.fn();

//     const { getByTestId } = render(createTagsPicker({
//         onVisibilityChange: handler
//     }));

//     act(() => {
//         userEvent.keyDown(getByTestId(TRIGGER_ID), { key: "Enter", keyCode: 13 });
//     });

//     await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), true));
// });

// test("call onVisibilityChange when the dropdown menu is closed with a trigger click", async () => {
//     const handler = jest.fn();

//     const renderResult = render(createTagsPicker({
//         onVisibilityChange: handler
//     }));

//     const { triggerNode } = await openDropdownMenu(renderResult);

//     act(() => {
//         userEvent.click(triggerNode);
//     });

//     await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), false));
// });

// test("call onVisibilityChange when the dropdown menu is closed with esc keydown", async () => {
//     const handler = jest.fn();

//     const renderResult = render(createTagsPicker({
//         onVisibilityChange: handler
//     }));

//     await openDropdownMenu(renderResult);

//     act(() => {
//         fireEvent.keyDown(document, { key: "Escape", keyCode: 27 });
//     });

//     await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), false));
// });

// test("call onVisibilityChange when the dropdown menu is closed with an outside click", async () => {
//     const handler = jest.fn();

//     const renderResult = render(createTagsPicker({
//         onVisibilityChange: handler
//     }));

//     const { queries } = await openDropdownMenu(renderResult);

//     act(() => {
//         userEvent.click(document.body);
//     });

//     // I shouldn't need this but the test fail otherwise.
//     await waitFor(() => expect(queries.getDropdownMenu()).not.toBeInTheDocument());

//     expect(handler).toHaveBeenLastCalledWith(expect.anything(), false);
// });

// test("call onVisibilityChange when the dropdown menu is closed by selecting a value (closeOnSelect)", async () => {
//     const handler = jest.fn();

//     const renderResult = render(createTagsPicker({
//         closeOnSelect: true,
//         onVisibilityChange: handler
//     }));

//     const { queries } = await openDropdownMenu(renderResult);

//     act(() => {
//         userEvent.click(queries.getMenuItems()[1]);
//     });

//     await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), false));
// });

// test("call onSearch when the search input change", async () => {
//     const handler = jest.fn(() => {
//         return [];
//     });

//     const renderResult = render(createTagsPicker({
//         onSearch: handler
//     }));

//     const { queries } = await openDropdownMenu(renderResult);

//     act(() => {
//         userEvent.type(queries.getSearchInput(), "N");
//     });

//     await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), DEFAULT_ITEMS, "N"));
// });

// test("call onSearch with groups when specified", async () => {
//     const handler = jest.fn(() => {
//         return [];
//     });

//     const item = tagsPickerItem("Created", GROUP_CREATED_VALUE, "group 1");

//     const renderResult = render(createTagsPicker({
//         items: [item],
//         onSearch: handler
//     }));

//     const { queries } = await openDropdownMenu(renderResult);

//     act(() => {
//         userEvent.type(queries.getSearchInput(), "N");
//     });

//     await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), [item], "N"));
// });

// test("call onSearch with custom object when specified", async () => {
//     const handler = jest.fn(() => {
//         return [];
//     });

//     const item = tagsPickerItem("Created", GROUP_CREATED_VALUE, null, { foo: "bar" });

//     const renderResult = render(createTagsPicker({
//         items: [item],
//         onSearch: handler
//     }));

//     const { queries } = await openDropdownMenu(renderResult);

//     act(() => {
//         userEvent.type(queries.getSearchInput(), "N");
//     });

//     await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), [item], "N"));
// });

// test("results returned by onSearch are shown", async () => {
//     const results = [DEFAULT_ITEMS[0], DEFAULT_ITEMS[1]];

//     const handler = jest.fn(() => {
//         return results;
//     });

//     const renderResult = render(createTagsPicker({
//         onSearch: handler
//     }));

//     const { queries } = await openDropdownMenu(renderResult);

//     act(() => {
//         userEvent.type(queries.getSearchInput(), "N");
//     });

//     const menuItemsNodes = queries.getMenuItems();

//     expect(menuItemsNodes.length).toBe(2);
//     expect(menuItemsNodes[0].querySelector("span")).toHaveTextContent(results[0].text);
//     expect(menuItemsNodes[1].querySelector("span")).toHaveTextContent(results[1].text);
// });

// test("onSearch is not call with the already selected items", async () => {
//     const handler = jest.fn(() => {
//         return [];
//     });

//     const renderResult = render(createTagsPicker({
//         defaultValues: DEFAULT_ITEMS.map(x => x.value).filter(x => x !== DEFAULT_ITEMS[0].value),
//         onSearch: handler
//     }));

//     const { queries } = await openDropdownMenu(renderResult);

//     act(() => {
//         userEvent.type(queries.getSearchInput(), "N");
//     });

//     await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), [DEFAULT_ITEMS[0]], "N"));
// });
