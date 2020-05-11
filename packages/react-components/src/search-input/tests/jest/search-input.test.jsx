import {
    ALEXANDRE_RESULT,
    ALEXANDRE_VALUE,
    CLEAR_BUTTON_ID,
    DEFAULT_RESULTS,
    NUMBER_OF_RESULTS_BEGINNING_WITH_A,
    RESULT_ID,
    getInput,
    getNoResults,
    getResultsMenu
} from "./shared";
import { SearchInput, searchInputResult } from "@react-components/search-input";
import { fireEvent, render, wait, waitForElement } from "@testing-library/react";
import { noop } from "lodash";
import userEvent from "@utils/user-event";

function createSearchInput({ results = DEFAULT_RESULTS, onValueChange = noop, ...otherProps } = {}) {
    return <SearchInput
        results={results}
        onValueChange={onValueChange}
        {...otherProps}
    />;
}

// ***** Behaviors *****

test("typing a search input show the matching results", async () => {
    const { getByTestId, getAllByTestId, container } = render(createSearchInput());

    userEvent.type(await getInput(getByTestId), "A");
    await waitForElement(() => getResultsMenu(container));

    expect(getAllByTestId(RESULT_ID).length).toBe(NUMBER_OF_RESULTS_BEGINNING_WITH_A);
});

test("search input is case insensitive", async () => {
    const { getByTestId, getAllByTestId, container } = render(createSearchInput());

    userEvent.type(await getInput(getByTestId), "a");
    await waitForElement(() => getResultsMenu(container));

    expect(getAllByTestId(RESULT_ID).length).toBe(NUMBER_OF_RESULTS_BEGINNING_WITH_A);
});

test("typing a search input that match no results, show no results message", async () => {
    const { getByTestId, queryAllByTestId, container } = render(createSearchInput());

    userEvent.type(await getInput(getByTestId), "xyz");
    await waitForElement(() => getResultsMenu(container));

    expect(queryAllByTestId(RESULT_ID).length).toBe(0);
    expect(getNoResults(container)).toBeInTheDocument();
});

test("can navigate through the results with arrows keydown", async () => {
    const { getByTestId, getAllByTestId, container } = render(createSearchInput());

    userEvent.type(await getInput(getByTestId), "a");
    await waitForElement(() => getResultsMenu(container));

    expect(getAllByTestId(RESULT_ID).length).toBe(NUMBER_OF_RESULTS_BEGINNING_WITH_A);

    fireEvent.keyDown(container, { key: "ArrowDown", keyCode: 40 });
    fireEvent.keyDown(container, { key: "ArrowDown", keyCode: 40 });
    fireEvent.keyDown(container, { key: "ArrowDown", keyCode: 40 });
    fireEvent.keyDown(container, { key: "ArrowUp", keyCode: 38 });
    await wait();

    expect(getAllByTestId(RESULT_ID)[1].parentNode).toHaveClass("active");
});

test("can select a result on click", async () => {
    const { getByTestId, getAllByTestId, container } = render(createSearchInput());

    const inputNode = await getInput(getByTestId);

    userEvent.type(inputNode, "a");
    await waitForElement(() => getResultsMenu(container));

    const resultNodes = getAllByTestId(RESULT_ID);

    expect(resultNodes.length).toBe(NUMBER_OF_RESULTS_BEGINNING_WITH_A);

    userEvent.click(resultNodes[1]);
    await wait();

    expect(inputNode).toHaveValue(ALEXANDRE_VALUE);
});

test("can select a result on enter keydown", async () => {
    const { getByTestId, getAllByTestId, container } = render(createSearchInput());

    const inputNode = await getInput(getByTestId);

    userEvent.type(inputNode, "a");
    await waitForElement(() => getResultsMenu(container));

    const resultNodes = getAllByTestId(RESULT_ID);

    expect(resultNodes.length).toBe(NUMBER_OF_RESULTS_BEGINNING_WITH_A);

    fireEvent.keyDown(container, { key: "ArrowDown", keyCode: 40 });
    fireEvent.keyDown(container, { key: "ArrowDown", keyCode: 40 });
    fireEvent.keyDown(resultNodes[1], { key: "Enter", keyCode: 13 });
    await wait();

    expect(inputNode).toHaveValue(ALEXANDRE_VALUE);
});

test("when a result is selected, the dropdown menu close", async () => {
    const { getByTestId, getAllByTestId, container } = render(createSearchInput());

    userEvent.type(await getInput(getByTestId), "a");
    await waitForElement(() => getResultsMenu(container));

    const resultNodes = getAllByTestId(RESULT_ID);

    expect(resultNodes.length).toBe(NUMBER_OF_RESULTS_BEGINNING_WITH_A);

    userEvent.click(resultNodes[1]);
    await wait();

    expect(getResultsMenu(container)).not.toBeInTheDocument();
});

test("close the dropdown menu on outside click", async () => {
    const { container } = render(createSearchInput({
        defaultOpen: true
    }));

    await waitForElement(() => getResultsMenu(container));

    userEvent.click(document.body);
    await wait();

    expect(getResultsMenu(container)).not.toBeInTheDocument();
});

test("close the dropdown menu on blur", async () => {
    const { getByTestId, container } = render(createSearchInput({
        defaultOpen: true
    }));

    await waitForElement(() => getResultsMenu(container));

    fireEvent.blur(await getInput(getByTestId));
    await wait();

    expect(getResultsMenu(container)).not.toBeInTheDocument();
});

test("close the dropdown menu on esc keydown", async () => {
    const { getByTestId, container } = render(createSearchInput({
        defaultOpen: true
    }));

    await waitForElement(() => getResultsMenu(container));

    fireEvent.keyDown(await getInput(getByTestId), { key: "Escape", keyCode: 27 });
    await wait();

    expect(getResultsMenu(container)).not.toBeInTheDocument();
});

test("when no result is selected, on blur should clear the search input", async () => {
    const { getByTestId, container } = render(createSearchInput());

    const inputNode = await getInput(getByTestId);

    userEvent.type(inputNode, "a");
    await waitForElement(() => getResultsMenu(container));

    fireEvent.blur(inputNode);
    await wait();

    expect(inputNode).toHaveValue("");
});

test("when a result is selected, on blur shouldn't clear the search input", async () => {
    const { getByTestId, getAllByTestId, container } = render(createSearchInput());

    const inputNode = await getInput(getByTestId);

    userEvent.type(inputNode, "a");
    await waitForElement(() => getResultsMenu(container));

    const resultNodes = getAllByTestId(RESULT_ID);

    expect(resultNodes.length).toBe(NUMBER_OF_RESULTS_BEGINNING_WITH_A);

    userEvent.click(resultNodes[0]);
    await wait();

    expect(inputNode).not.toHaveValue("");
});

test("selected result is cleared on 2x esc keydown", async () => {
    const { getByTestId, container } = render(createSearchInput());

    const inputNode = await getInput(getByTestId);

    userEvent.type(inputNode, "a");
    await waitForElement(() => getResultsMenu(container));

    fireEvent.keyDown(inputNode, { key: "Escape", keyCode: 27 });
    fireEvent.keyDown(inputNode, { key: "Escape", keyCode: 27 });
    await wait();

    expect(inputNode).toHaveValue("");
});

test("selected result is cleared on clear button click", async () => {
    const { getByTestId } = render(createSearchInput({
        defaultValue: ALEXANDRE_VALUE
    }));

    userEvent.click(getByTestId(CLEAR_BUTTON_ID));
    await wait();

    expect(await getInput(getByTestId)).toHaveValue("");
});

test("dropdown menu is closed on clear button click", async () => {
    const { getByTestId, container } = render(createSearchInput({
        defaultValue: ALEXANDRE_VALUE
    }));

    userEvent.type(await getInput(getByTestId), "a");
    await waitForElement(() => getResultsMenu(container));

    userEvent.click(getByTestId(CLEAR_BUTTON_ID));
    await wait();

    expect(getResultsMenu(container)).not.toBeInTheDocument();
});

test("when autofocus is true, the input is focused on render", async () => {
    const { getByTestId } = render(createSearchInput({
        autofocus: true,
        autofocusDelay: 0
    }));

    await wait();

    expect(await getInput(getByTestId)).toHaveFocus();
});

test("when disabled, dont open the dropdown menu on textbox click", async () => {
    const { getByTestId, container } = render(createSearchInput({
        disabled: true
    }));

    userEvent.click(await getInput(getByTestId));
    await wait();

    expect(getResultsMenu(container)).toBeNull();
});

test("when closeOnSelect is true, clear the search input on item select", async () => {
    const { getByTestId, getAllByTestId, container } = render(createSearchInput({
        clearOnSelect: true
    }));

    const inputNode = await getInput(getByTestId);

    userEvent.type(inputNode, "a");
    await waitForElement(() => getResultsMenu(container));

    userEvent.click(getAllByTestId(RESULT_ID)[0]);
    await wait();

    expect(inputNode).toHaveTextContent("");
});

test("wait until specified minCharacters count typed before filtering and showing results", async () => {
    const MINIMUM_CHARACTERS = 4;

    const { getByTestId, getAllByTestId, container } = render(createSearchInput({
        minCharacters: MINIMUM_CHARACTERS
    }));

    const inputNode = await getInput(getByTestId);

    userEvent.type(inputNode, ALEXANDRE_VALUE.substring(0, MINIMUM_CHARACTERS -1));
    await wait();

    expect(getResultsMenu(container)).not.toBeInTheDocument();

    userEvent.type(inputNode, ALEXANDRE_VALUE.substring(0, MINIMUM_CHARACTERS));
    await waitForElement(() => getResultsMenu(container));

    const resultsNodes = getAllByTestId(RESULT_ID);

    expect(resultsNodes.length).toBe(1);
    expect(resultsNodes[0]).toHaveTextContent(ALEXANDRE_VALUE);
});

test("when closeOnBlur is false, dont close the dropdown menu on blur", async () => {
    const { getByTestId, container } = render(createSearchInput({
        closeOnBlur: false
    }));

    userEvent.type(await getInput(getByTestId), "a");
    await waitForElement(() => getResultsMenu(container));

    userEvent.click(document.body);

    expect(getResultsMenu(container)).toBeInTheDocument();
});

test("when closeOnBlur is false and closeOnOutsideClick is true, close the dropdown menu on outside click", async () => {
    const { getByTestId, container } = render(createSearchInput({
        closeOnBlur: false,
        closeOnOutsideClick: true
    }));

    userEvent.type(await getInput(getByTestId), "a");
    await waitForElement(() => getResultsMenu(container));

    userEvent.click(document.body);

    expect(getResultsMenu(container)).not.toBeInTheDocument();
});

// ***** API *****

test("call onValueChange when a result is selected on click", async () => {
    const handler = jest.fn();

    const { getByTestId, getAllByTestId, container } = render(createSearchInput({
        onValueChange: handler
    }));

    const inputNode = await getInput(getByTestId);

    userEvent.type(inputNode, "a");
    await waitForElement(() => getResultsMenu(container));

    userEvent.click(getAllByTestId(RESULT_ID)[1]);
    await wait();

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), ALEXANDRE_RESULT);
});

test("call onValueChange when a result is selected on enter keydown", async () => {
    const handler = jest.fn();

    const { getByTestId, container } = render(createSearchInput({
        onValueChange: handler
    }));

    const inputNode = await getInput(getByTestId);

    userEvent.type(inputNode, "a");
    await waitForElement(() => getResultsMenu(container));

    fireEvent.keyDown(container, { key: "ArrowDown", keyCode: 40 });
    fireEvent.keyDown(container, { key: "ArrowDown", keyCode: 40 });
    fireEvent.keyDown(container, { key: "Enter", keyCode: 13 });
    await wait();

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), ALEXANDRE_RESULT);
});

test("call onValueChange when the selected result is cleared", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(createSearchInput({
        defaultValue: ALEXANDRE_VALUE,
        onValueChange: handler
    }));

    userEvent.click(getByTestId(CLEAR_BUTTON_ID));
    await wait();

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), null);
});

test("call onVisibilityChange when the dropdown menu is opened by typing a search input", async () => {
    const handler = jest.fn();

    const { getByTestId, container } = render(createSearchInput({
        onVisibilityChange: handler
    }));

    userEvent.type(await getInput(getByTestId), "xyz");
    await waitForElement(() => getResultsMenu(container));

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), true);
});

test("call onVisibilityChange when the dropdown menu is closed on outside click", async () => {
    const handler = jest.fn();

    const { container } = render(createSearchInput({
        defaultOpen: true,
        onVisibilityChange: handler
    }));

    await waitForElement(() => getResultsMenu(container));

    userEvent.click(document.body);
    await wait();

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), false);
});

test("call onVisibilityChange when the dropdown menu is closed on esc keydown", async () => {
    const handler = jest.fn();

    const { getByTestId, container } = render(createSearchInput({
        defaultOpen: true,
        onVisibilityChange: handler
    }));

    await waitForElement(() => getResultsMenu(container));

    fireEvent.keyDown(await getInput(getByTestId), { key: "Escape", keyCode: 27 });
    await wait();

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), false);
});

test("call onVisibilityChange when the dropdown menu is closed on blur", async () => {
    const handler = jest.fn();

    const { getByTestId, container } = render(createSearchInput({
        defaultOpen: true,
        onVisibilityChange: handler
    }));

    await waitForElement(() => getResultsMenu(container));

    fireEvent.blur(await getInput(getByTestId));
    await wait();

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), false);
});

test("call onVisibilityChange when the dropdown menu is closed on item selection", async () => {
    const handler = jest.fn();

    const { getByTestId, getAllByTestId, container } = render(createSearchInput({
        onVisibilityChange: handler
    }));

    userEvent.type(await getInput(getByTestId), "a");
    await waitForElement(() => getResultsMenu(container));

    userEvent.click(getAllByTestId(RESULT_ID)[0]);
    await wait();

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), false);
});

test("call onSearch when the search input change", async () => {
    const handler = jest.fn(() => {
        return [];
    });

    const { getByTestId } = render(createSearchInput({
        onSearch: handler
    }));

    userEvent.type(await getInput(getByTestId), "a");
    await wait();

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), DEFAULT_RESULTS, "a");
});

test("call onSearch with custom object when specified", async () => {
    const handler = jest.fn(() => {
        return [];
    });

    const RESULT = searchInputResult("1", ALEXANDRE_VALUE, { foo: "bar" });

    const { getByTestId } = render(createSearchInput({
        results: [RESULT],
        onSearch: handler
    }));

    userEvent.type(await getInput(getByTestId), "a");
    await wait();

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), [RESULT], "a");
});

test("results returned by onSearch are shown", async () => {
    const results = [DEFAULT_RESULTS[0], DEFAULT_RESULTS[1]];

    const handler = jest.fn(() => {
        return results;
    });

    const { getByTestId, getAllByTestId } = render(createSearchInput({
        onSearch: handler
    }));

    userEvent.type(await getInput(getByTestId), "a");
    await wait();

    const resultsNodes = getAllByTestId(RESULT_ID);

    expect(resultsNodes.length).toBe(2);
    expect(resultsNodes[0]).toHaveTextContent(results[0].text);
    expect(resultsNodes[1]).toHaveTextContent(results[1].text);
});

test("call onBlur when the input blur", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(createSearchInput({
        onBlur: handler,
        autofocus: true,
        autofocusDelay: 0
    }));

    fireEvent.blur(await getInput(getByTestId));
    await wait();

    expect(handler).toHaveBeenLastCalledWith(expect.anything());
});

test("call onClear when the clear button is clicked", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(createSearchInput({
        defaultValue: ALEXANDRE_VALUE,
        onClear: handler
    }));

    userEvent.click(getByTestId(CLEAR_BUTTON_ID));
    await wait();

    expect(handler).toHaveBeenLastCalledWith(expect.anything());
});

test("call onOutsideClick on outside click", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(createSearchInput({
        onOutsideClick: handler
    }));

    userEvent.type(await getInput(getByTestId), "a");
    await wait();

    userEvent.click(document.body);
    await wait();

    expect(handler).toHaveBeenLastCalledWith(expect.anything());
});
