// import {
//     ALEXANDRE_RESULT,
//     ALEXANDRE_VALUE,
//     CLEAR_BUTTON_ID,
//     DEFAULT_RESULTS,
//     NUMBER_OF_RESULTS_BEGINNING_WITH_A,
//     getInput,
//     getResultsMenu,
//     search
// } from "./shared";
// import { RemoteSearchInput } from "@react-components/search-input";
// import { act, fireEvent, render, waitFor } from "@testing-library/react";
// import { noop } from "lodash";
// import { waitDelay } from "@utils/wait-delay";
// import userEvent from "@utils/user-event";

// function withResults({ items = DEFAULT_RESULTS, startsWith = true } = {}) {
//     return (event, query) => {
//         if (startsWith) {
//             return Promise.resolve(items.filter(x => x.text.toUpperCase().startsWith(query.toUpperCase())));
//         }

//         return Promise.resolve(items);
//     };
// }

// function failingResultsFetcher() {
//     return Promise.reject();
// }

// function createRemoteSearchInput({ onFetchResults = withResults(), onValueChange = noop, ...otherProps } = {}) {
//     return <RemoteSearchInput
//         onFetchResults={onFetchResults}
//         onValueChange={onValueChange}
//         debounceDelay={0}
//         {...otherProps}
//     />;
// }

// // ***** Behaviors *****

// test("typing a search input show the matching results", async () => {
//     const renderResult = render(createRemoteSearchInput());

//     const { queries } = await search("A", renderResult);

//     await waitFor(() => expect(queries.getResults().length).toBe(NUMBER_OF_RESULTS_BEGINNING_WITH_A));
// });

// test("typing a search input that match no results, show no results message", async () => {
//     const renderResult = render(createRemoteSearchInput());

//     const { queries } = await search("xyz", renderResult);

//     await waitFor(() => expect(queries.queryResults().length).toBe(0));
//     await waitFor(() => expect(queries.getNoResults()).toBeInTheDocument());
// });

// test("can navigate through the results with arrows keydown", async () => {
//     const renderResult = render(createRemoteSearchInput());

//     const { container } = renderResult;

//     const { queries } = await search("a", renderResult);

//     await waitFor(() => expect(queries.getResults().length).toBe(NUMBER_OF_RESULTS_BEGINNING_WITH_A));

//     act(() => {
//         fireEvent.keyDown(container, { key: "ArrowDown", keyCode: 40 });
//     });

//     act(() => {
//         fireEvent.keyDown(container, { key: "ArrowDown", keyCode: 40 });
//     });

//     act(() => {
//         fireEvent.keyDown(container, { key: "ArrowDown", keyCode: 40 });
//     });

//     act(() => {
//         fireEvent.keyDown(container, { key: "ArrowUp", keyCode: 38 });
//     });

//     await waitFor(() => expect(queries.getResults()[1].parentNode).toHaveClass("active"));
// });

// test("can select a result on click", async () => {
//     const renderResult = render(createRemoteSearchInput());

//     const { inputNode, queries } = await search("a", renderResult);

//     await waitFor(() => expect(queries.getResults().length).toBe(NUMBER_OF_RESULTS_BEGINNING_WITH_A));

//     act(() => {
//         userEvent.click(queries.getResults()[1]);
//     });

//     await waitFor(() => expect(inputNode).toHaveValue(ALEXANDRE_VALUE));
// });

// test("can select a result on enter keydown", async () => {
//     const renderResult = render(createRemoteSearchInput());

//     const { container } = renderResult;

//     const { inputNode, queries } = await search("a", renderResult);

//     await waitFor(() => expect(queries.getResults().length).toBe(NUMBER_OF_RESULTS_BEGINNING_WITH_A));

//     act(() => {
//         fireEvent.keyDown(container, { key: "ArrowDown", keyCode: 40 });
//     });

//     act(() => {
//         fireEvent.keyDown(container, { key: "ArrowDown", keyCode: 40 });
//     });

//     act(() => {
//         fireEvent.keyDown(queries.getResults()[1], { key: "Enter", keyCode: 13 });
//     });

//     await waitFor(() => expect(inputNode).toHaveValue(ALEXANDRE_VALUE));
// });

// test("when a result is selected, the dropdown menu close", async () => {
//     const renderResult = render(createRemoteSearchInput());

//     const { queries } = await search("a", renderResult);

//     await waitFor(() => expect(queries.getResults().length).toBe(NUMBER_OF_RESULTS_BEGINNING_WITH_A));

//     act(() => {
//         userEvent.click(queries.getResults()[1]);
//     });

//     await waitFor(() => expect(queries.getResultsMenu()).not.toBeInTheDocument());
// });

// test("close the dropdown menu on outside click", async () => {
//     const { getByTestId, container } = render(createRemoteSearchInput({
//         defaultOpen: true
//     }));

//     await waitFor(() => expect(getInput(getByTestId)).toHaveFocus());

//     act(() => {
//         userEvent.click(document.body);
//     });

//     await waitFor(() => expect(getResultsMenu(container)).not.toBeInTheDocument());
// });

// test("close the dropdown menu on blur", async () => {
//     const { getByTestId, container } = render(createRemoteSearchInput({
//         defaultOpen: true
//     }));

//     await waitFor(() => expect(getInput(getByTestId)).toHaveFocus());

//     act(() => {
//         fireEvent.blur(getInput(getByTestId));
//     });

//     await waitFor(() => expect(getResultsMenu(container)).not.toBeInTheDocument());
// });

// test("close the dropdown menu on esc keydown", async () => {
//     const { getByTestId, container } = render(createRemoteSearchInput({
//         defaultOpen: true
//     }));

//     await waitFor(() => expect(getResultsMenu(container)).toBeInTheDocument());

//     act(() => {
//         fireEvent.keyDown(getInput(getByTestId), { key: "Escape", keyCode: 27 });
//     });

//     await waitFor(() => expect(getResultsMenu(container)).not.toBeInTheDocument());
// });

// test("when no result is selected, on blur should clear the search input", async () => {
//     const renderResult = render(createRemoteSearchInput());

//     const { inputNode } = await search("a", renderResult);

//     act(() => {
//         fireEvent.blur(inputNode);
//     });

//     await waitFor(() => expect(inputNode).toHaveValue(""));
// });

// test("when a result is selected, on blur shouldn't clear the search input", async () => {
//     const renderResult = render(createRemoteSearchInput());

//     const { inputNode, queries } = await search("a", renderResult);

//     await waitFor(() => expect(queries.getResults().length).toBe(NUMBER_OF_RESULTS_BEGINNING_WITH_A));

//     act(() => {
//         userEvent.click(queries.getResults()[0]);
//     });

//     await waitFor(() => expect(inputNode).not.toHaveValue(""));
// });

// test("selected result is cleared on 2x esc keydown", async () => {
//     const renderResult = render(createRemoteSearchInput());

//     const { inputNode } = await search("a", renderResult);

//     act(() => {
//         fireEvent.keyDown(inputNode, { key: "Escape", keyCode: 27 });
//     });

//     act(() => {
//         fireEvent.keyDown(inputNode, { key: "Escape", keyCode: 27 });
//     });

//     await waitFor(() => expect(inputNode).toHaveValue(""));
// });

// test("selected result is cleared on clear button click", async () => {
//     const { getByTestId } = render(createRemoteSearchInput({
//         defaultValue: ALEXANDRE_VALUE
//     }));

//     act(() => {
//         userEvent.click(getByTestId(CLEAR_BUTTON_ID));
//     });

//     await waitFor(() => expect(getInput(getByTestId)).toHaveValue(""));
// });

// test("input is focused on clear button click", async () => {
//     const { getByTestId } = render(createRemoteSearchInput({
//         defaultValue: ALEXANDRE_VALUE
//     }));

//     act(() => {
//         userEvent.click(getByTestId(CLEAR_BUTTON_ID));
//     });

//     await waitFor(() => expect(getInput(getByTestId)).toHaveFocus());
// });

// test("dropdown menu is closed on clear button click", async () => {
//     const { getByTestId, container } = render(createRemoteSearchInput({
//         defaultValue: ALEXANDRE_VALUE,
//         defaultOpen: true
//     }));

//     await waitFor(() => expect(getResultsMenu(container)).toBeInTheDocument());

//     act(() => {
//         userEvent.click(getByTestId(CLEAR_BUTTON_ID));
//     });

//     await waitFor(() => expect(getResultsMenu(container)).not.toBeInTheDocument());
// });

// test("when autoFocus is true, the input is focused on render", async () => {
//     const { getByTestId } = render(createRemoteSearchInput({
//         autoFocus: true,
//         autoFocusDelay: 0
//     }));

//     // Required for the JavaScript scheduler to run the autoFocus code since it's in a setTimeout.
//     await waitDelay(0);

//     await waitFor(async () => expect(getInput(getByTestId)).toHaveFocus());
// });

// test("when delayed autoFocus, the input is focused after the delay", async () => {
//     const { getByTestId } = render(createRemoteSearchInput({
//         autoFocus: true,
//         autoFocusDelay: 50
//     }));

//     // Required for the JavaScript scheduler to run the autoFocus code since it's in a setTimeout.
//     await waitDelay(0);

//     expect(getInput(getByTestId)).not.toHaveFocus();

//     // Fixme: this delay shouldn't be needed, waitFor should be enough.
//     await waitDelay(60);

//     await waitFor(async () => expect(getInput(getByTestId)).toHaveFocus());
// });

// test("when disabled, dont open the dropdown menu on textbox click", async () => {
//     const { getByTestId, container } = render(createRemoteSearchInput({
//         disabled: true
//     }));

//     act(() => {
//         userEvent.click(getInput(getByTestId));
//     });

//     expect(getResultsMenu(container)).toBeNull();
// });

// test("when closeOnSelect is true, clear the search input on item select", async () => {
//     const renderResult = render(createRemoteSearchInput({
//         clearOnSelect: true
//     }));

//     const { inputNode, queries } = await search("a", renderResult);

//     act(() => {
//         userEvent.click(queries.getResults()[0]);
//     });

//     await waitFor(() => expect(inputNode).toHaveTextContent(""));
// });

// test("wait until specified minCharacters count typed before filtering and showing results", async () => {
//     const MINIMUM_CHARACTERS = 4;

//     const renderResult = render(createRemoteSearchInput({
//         minCharacters: MINIMUM_CHARACTERS
//     }));

//     const { getByTestId, container } = renderResult;

//     act(() => {
//         userEvent.type(getInput(getByTestId), ALEXANDRE_VALUE.substring(0, MINIMUM_CHARACTERS -1));
//     });

//     expect(getResultsMenu(container)).not.toBeInTheDocument();

//     const { queries } = await search(ALEXANDRE_VALUE, renderResult);

//     await waitFor(() => expect(queries.getResults().length).toBe(1));
//     await waitFor(() => expect(queries.getResults()[0]).toHaveTextContent(ALEXANDRE_VALUE));
// });

// test("dont make any remote calls until the minCharacters count has been reached", async () => {
//     const MINIMUM_CHARACTERS = 4;

//     const handler = jest.fn(withResults());

//     const { getByTestId, container } = render(createRemoteSearchInput({
//         minCharacters: MINIMUM_CHARACTERS,
//         onFetchResults: handler
//     }));

//     const inputNode = getInput(getByTestId);

//     act(() => {
//         userEvent.type(inputNode, ALEXANDRE_VALUE.substring(0, MINIMUM_CHARACTERS -3));
//     });

//     act(() => {
//         userEvent.type(inputNode, ALEXANDRE_VALUE.substring(0, MINIMUM_CHARACTERS -2));
//     });

//     act(() => {
//         userEvent.type(inputNode, ALEXANDRE_VALUE.substring(0, MINIMUM_CHARACTERS -1));
//     });

//     act(() => {
//         userEvent.type(inputNode, ALEXANDRE_VALUE);
//     });

//     await waitFor(() => expect(getResultsMenu(container)).toBeInTheDocument());
//     await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
// });

// test("when the remote call fail, show the no results message", async () => {
//     const renderResult = render(createRemoteSearchInput({
//         onFetchResults: failingResultsFetcher
//     }));

//     const { queries } = await search("a", renderResult);

//     await waitFor(() => expect(queries.getNoResults()).toBeInTheDocument());
// });

// test("show the loading state until the remote call end", async () => {
//     let resolvePromise;

//     const promise = new Promise(resolve => {
//         resolvePromise = resolve;
//     });

//     const renderResult = render(createRemoteSearchInput({
//         onFetchResults: () => promise
//     }));

//     const { inputNode } = await search("a", renderResult);

//     await waitFor(() => expect(inputNode.parentNode).toHaveClass("loading"));

//     resolvePromise([]);

//     await waitFor(() => expect(inputNode.parentNode).not.toHaveClass("loading"));
// });

// // // ***** API *****

// test("call onValueChange when a result is selected on click", async () => {
//     const handler = jest.fn();

//     const renderResult = render(createRemoteSearchInput({
//         onValueChange: handler
//     }));

//     const { queries } = await search("a", renderResult);

//     act(() => {
//         userEvent.click(queries.queryResults()[1]);
//     });

//     await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), ALEXANDRE_RESULT));
// });

// test("call onValueChange when a result is selected on enter keydown", async () => {
//     const handler = jest.fn();

//     const renderResult = render(createRemoteSearchInput({
//         onValueChange: handler
//     }));

//     const { container } = renderResult;

//     await search("a", renderResult);

//     act(() => {
//         fireEvent.keyDown(container, { key: "ArrowDown", keyCode: 40 });
//     });

//     act(() => {
//         fireEvent.keyDown(container, { key: "ArrowDown", keyCode: 40 });
//     });

//     act(() => {
//         fireEvent.keyDown(container, { key: "Enter", keyCode: 13 });
//     });

//     await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), ALEXANDRE_RESULT));
// });

// test("call onValueChange when the selected result is cleared", async () => {
//     const handler = jest.fn();

//     const { getByTestId } = render(createRemoteSearchInput({
//         defaultValue: ALEXANDRE_VALUE,
//         onValueChange: handler
//     }));

//     act(() => {
//         userEvent.click(getByTestId(CLEAR_BUTTON_ID));
//     });

//     await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), null));
// });

// test("call onVisibilityChange when the dropdown menu is opened by typing a search input", async () => {
//     const handler = jest.fn();

//     const renderResult = render(createRemoteSearchInput({
//         onVisibilityChange: handler
//     }));

//     await search("xyz", renderResult);

//     await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), true));
// });

// test("call onVisibilityChange when the dropdown menu is closed on outside click", async () => {
//     const handler = jest.fn();

//     const { container } = render(createRemoteSearchInput({
//         defaultOpen: true,
//         onVisibilityChange: handler
//     }));

//     await waitFor(() => expect(getResultsMenu(container)).toBeInTheDocument());

//     act(() => {
//         userEvent.click(document.body);
//     });

//     await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), false));
// });

// test("call onVisibilityChange when the dropdown menu is closed on esc keydown", async () => {
//     const handler = jest.fn();

//     const { getByTestId, container } = render(createRemoteSearchInput({
//         defaultOpen: true,
//         onVisibilityChange: handler
//     }));

//     await waitFor(() => expect(getResultsMenu(container)).toBeInTheDocument());

//     act(() => {
//         fireEvent.keyDown(getInput(getByTestId), { key: "Escape", keyCode: 27 });
//     });

//     await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), false));
// });

// test("call onVisibilityChange when the dropdown menu is closed on blur", async () => {
//     const handler = jest.fn();

//     const { getByTestId, container } = render(createRemoteSearchInput({
//         defaultOpen: true,
//         onVisibilityChange: handler
//     }));

//     await waitFor(() => expect(getResultsMenu(container)).toBeInTheDocument());

//     act(() => {
//         fireEvent.blur(getInput(getByTestId));
//     });

//     await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), false));
// });

// test("call onVisibilityChange when the dropdown menu is closed on item selection", async () => {
//     const handler = jest.fn();

//     const renderResult = render(createRemoteSearchInput({
//         onVisibilityChange: handler
//     }));

//     const { queries } = await search("a", renderResult);

//     act(() => {
//         userEvent.click(queries.getResults()[0]);
//     });

//     await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), false));
// });

// test("call onFetchResults when the search input change", async () => {
//     const handler = jest.fn(withResults());

//     const renderResult = render(createRemoteSearchInput({
//         onFetchResults: handler
//     }));

//     await search("a", renderResult);

//     await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), "a"));
// });

// test("call onResults when the remote calls responds with results", async () => {
//     const handler = jest.fn(() => {
//         return [];
//     });

//     const renderResult = render(createRemoteSearchInput({
//         onResults: handler,
//         onFetchResults: withResults({ startsWith: false })
//     }));

//     await search("a", renderResult);

//     await waitFor(() => expect(handler).toHaveBeenLastCalledWith(DEFAULT_RESULTS, "a"));
// });

// test("call onResults when the remote calls responds without results", async () => {
//     const handler = jest.fn(() => {
//         return [];
//     });

//     const renderResult = render(createRemoteSearchInput({
//         onResults: handler,
//         onFetchResults: withResults({ items: [] })
//     }));

//     await search("a", renderResult);

//     await waitFor(() => expect(handler).toHaveBeenLastCalledWith([], "a"));
// });

// test("call onBlur when the input blur", async () => {
//     const handler = jest.fn();

//     const { getByTestId } = render(createRemoteSearchInput({
//         onBlur: handler,
//         autoFocus: true,
//         autoFocusDelay: 0
//     }));

//     act(() => {
//         fireEvent.blur(getInput(getByTestId));
//     });

//     await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything()));
// });

// test("call onKeyDown when any keys down on the input", async () => {
//     const handler = jest.fn();

//     const { getByTestId } = render(createRemoteSearchInput({
//         onKeyDown: handler
//     }));

//     const inputNode = getInput(getByTestId);

//     act(() => {
//         fireEvent.keyDown(inputNode, { key: "Escape", keyCode: 27 });
//     });

//     act(() => {
//         fireEvent.keyDown(inputNode, { key: "Enter", keyCode: 13 });
//     });

//     act(() => {
//         fireEvent.keyDown(inputNode, { key: " ", keyCode: 32 });
//     });

//     await waitFor(() => expect(handler).toHaveBeenCalledTimes(3));
// });

// test("call onClear when the clear button is clicked", async () => {
//     const handler = jest.fn();

//     const { getByTestId } = render(createRemoteSearchInput({
//         defaultValue: ALEXANDRE_VALUE,
//         onClear: handler
//     }));

//     act(() => {
//         userEvent.click(getByTestId(CLEAR_BUTTON_ID));
//     });

//     await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything()));
// });
