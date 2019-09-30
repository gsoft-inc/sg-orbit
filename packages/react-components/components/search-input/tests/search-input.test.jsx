import { SearchInput, searchInputResult } from "@orbit-ui/react-search-input/src";
import { fireEvent, render, wait, waitForDomChange, waitForElement } from "@testing-library/react";
import { noop } from "lodash";
import userEvent from "@testing-library/user-event";

const RESULT_ID = "search-input-result";
const TEXTBOX_ID = "search-input-textbox";
const CLEAR_BUTTON_ID = "search-input-clear-button";

const GEORGE_VALUE = "George";
const LAURIE_VALUE = "Laurie";
const CLARA_VALUE = "Clara";
const FELIX_VALUE = "Felix";
const AUDREY_VALUE = "Audrey";
const ALEXANDRE_VALUE = "Alexandre";
const ALYSON_VALUE = "Alyson";

const DEFAULT_RESULTS = [
    searchInputResult("1", GEORGE_VALUE),
    searchInputResult("2", LAURIE_VALUE),
    searchInputResult("3", CLARA_VALUE),
    searchInputResult("4", FELIX_VALUE),
    searchInputResult("5", AUDREY_VALUE),
    searchInputResult("6", ALEXANDRE_VALUE),
    searchInputResult("7", ALYSON_VALUE)
];

const NUMBER_OF_RESULTS_BEGINNING_WITH_A = 3;

async function getTextbox(getByTestId) {
    const textboxNode = await getByTestId(TEXTBOX_ID);

    return textboxNode.querySelector("input");
}

function getResultsMenu(container) {
    return container.querySelector("div.results.visible");
}

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

    userEvent.type(await getTextbox(getByTestId), "A");
    await waitForElement(() => getResultsMenu(container));

    expect(getAllByTestId(RESULT_ID).length).toBe(NUMBER_OF_RESULTS_BEGINNING_WITH_A);
});

test("search input is case insensitive", async () => {
    const { getByTestId, getAllByTestId, container } = render(createSearchInput());

    userEvent.type(await getTextbox(getByTestId), "a");
    await waitForElement(() => getResultsMenu(container));

    expect(getAllByTestId(RESULT_ID).length).toBe(NUMBER_OF_RESULTS_BEGINNING_WITH_A);
});

test("typing a search input that match no results, show no results message", async () => {
    const { getByTestId, queryAllByTestId, container } = render(createSearchInput());

    userEvent.type(await getTextbox(getByTestId), "xyz");
    await waitForElement(() => getResultsMenu(container));

    expect(queryAllByTestId(RESULT_ID).length).toBe(0);

    const noResultsNode = container.querySelector("div.message.empty");

    expect(noResultsNode).toBeInTheDocument();
});

test("can navigate through the results with arrows keydown", async () => {
    const { getByTestId, getAllByTestId, container } = render(createSearchInput());

    userEvent.type(await getTextbox(getByTestId), "a");
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

    const textboxNode = await getTextbox(getByTestId);

    userEvent.type(textboxNode, "a");
    await waitForElement(() => getResultsMenu(container));

    const resultNodes = getAllByTestId(RESULT_ID);

    expect(resultNodes.length).toBe(NUMBER_OF_RESULTS_BEGINNING_WITH_A);

    userEvent.click(resultNodes[1]);
    await wait();

    expect(textboxNode).toHaveValue(ALEXANDRE_VALUE);
});

test("can select a result on enter keydown", async () => {
    const { getByTestId, getAllByTestId, container } = render(createSearchInput());

    const textboxNode = await getTextbox(getByTestId);

    userEvent.type(textboxNode, "a");
    await waitForElement(() => getResultsMenu(container));

    const resultNodes = getAllByTestId(RESULT_ID);

    expect(resultNodes.length).toBe(NUMBER_OF_RESULTS_BEGINNING_WITH_A);

    fireEvent.keyDown(container, { key: "ArrowDown", keyCode: 40 });
    fireEvent.keyDown(container, { key: "ArrowDown", keyCode: 40 });
    fireEvent.keyDown(resultNodes[1], { key: "Enter", keyCode: 13 });
    await wait();

    expect(textboxNode).toHaveValue(ALEXANDRE_VALUE);
});

test("when a result is selected, the dropdown menu close", async () => {
    const { getByTestId, getAllByTestId, container } = render(createSearchInput());

    userEvent.type(await getTextbox(getByTestId), "a");
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

    fireEvent.blur(await getTextbox(getByTestId));
    await wait();

    expect(getResultsMenu(container)).not.toBeInTheDocument();
});

test("close the dropdown menu on esc keydown", async () => {
    const { getByTestId, container } = render(createSearchInput({
        defaultOpen: true
    }));

    await waitForElement(() => getResultsMenu(container));

    fireEvent.keyDown(await getTextbox(getByTestId), { key: "Escape", keyCode: 27 });
    await wait();

    expect(getResultsMenu(container)).not.toBeInTheDocument();
});

test("when no result is selected, on blur should clear the search input", async () => {
    const { getByTestId, container } = render(createSearchInput());

    const textboxNode = await getTextbox(getByTestId);

    userEvent.type(textboxNode, "a");
    await waitForElement(() => getResultsMenu(container));

    fireEvent.blur(textboxNode);
    await wait();

    expect(textboxNode).toHaveValue("");
});

test("when a result is selected, on blur shouldn't clear the search input", async () => {
    const { getByTestId, getAllByTestId, container } = render(createSearchInput());

    const textboxNode = await getTextbox(getByTestId);

    userEvent.type(textboxNode, "a");
    await waitForElement(() => getResultsMenu(container));

    const resultNodes = getAllByTestId(RESULT_ID);

    expect(resultNodes.length).toBe(NUMBER_OF_RESULTS_BEGINNING_WITH_A);

    userEvent.click(resultNodes[0]);
    await wait();

    expect(textboxNode).not.toHaveValue("");
});

test("selected result is cleared on 2x esc keydown", async () => {
    const { getByTestId, container } = render(createSearchInput());

    const textboxNode = await getTextbox(getByTestId);

    userEvent.type(textboxNode, "a");
    await waitForElement(() => getResultsMenu(container));

    fireEvent.keyDown(textboxNode, { key: "Escape", keyCode: 27 });
    fireEvent.keyDown(textboxNode, { key: "Escape", keyCode: 27 });
    await wait();

    expect(textboxNode).toHaveValue("");
});

test("selected result is cleared on clear button click", async () => {
    const { getByTestId } = render(createSearchInput({
        defaultValue: LAURIE_VALUE
    }));

    userEvent.click(getByTestId(CLEAR_BUTTON_ID));
    await wait();

    expect(await getTextbox(getByTestId)).toHaveValue("");
});

test("dropdown menu is closed on clear button click", async () => {
    const { getByTestId, container } = render(createSearchInput({
        defaultValue: LAURIE_VALUE
    }));

    userEvent.type(await getTextbox(getByTestId), "a");
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

    expect(await getTextbox(getByTestId)).toHaveFocus();
});

test("when disabled, dont open the dropdown menu on textbox click", async () => {
    const { getByTestId, container } = render(createSearchInput({
        disabled: true
    }));

    userEvent.click(await getTextbox(getByTestId));
    await wait();

    expect(getResultsMenu(container)).toBeNull();
});

// ***** Handlers *****

test("call onValueChange when a result is selected on click", async () => {
    const handler = jest.fn();

    const { getByTestId, getAllByTestId, container } = render(createSearchInput({
        onValueChange: handler
    }));

    const textboxNode = await getTextbox(getByTestId);

    userEvent.type(textboxNode, "a");
    await waitForElement(() => getResultsMenu(container));

    userEvent.click(getAllByTestId(RESULT_ID)[0]);
    await wait();

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), searchInputResult("5", AUDREY_VALUE), expect.anything());
});

test("call onValueChange when a result is selected on enter keydown", async () => {
    const handler = jest.fn();

    const { getByTestId, getAllByTestId, container } = render(createSearchInput({
        onValueChange: handler
    }));

    const textboxNode = await getTextbox(getByTestId);

    userEvent.type(textboxNode, "a");
    await waitForElement(() => getResultsMenu(container));

    fireEvent.keyDown(container, { key: "ArrowDown", keyCode: 40 });
    fireEvent.keyDown(getAllByTestId(RESULT_ID)[0], { key: "Enter", keyCode: 13 });
    await wait();

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), searchInputResult("5", AUDREY_VALUE), expect.anything());
});

test("call onValueChange when the selected result is cleared", async () => {
    const handler = jest.fn();

    const { getByTestId, getAllByTestId, container } = render(createSearchInput({
        defaultValue: AUDREY_VALUE,
        onValueChange: handler
    }));

    userEvent.click(getByTestId(CLEAR_BUTTON_ID));
    await wait();

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), null, expect.anything());
});

// call onVisibilityChange when typing a search input
// call onVisibilityChange on outside click
// call onVisibilityChange on esc
// call onVisibilityChange on blur
// call onVisibilityChange when an item is selected

// onSearch

// onBlur
