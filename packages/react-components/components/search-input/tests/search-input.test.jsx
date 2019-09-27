import { SearchInput, searchInputResult } from "@orbit-ui/react-search-input/src";
import { fireEvent, render, wait, waitForElement } from "@testing-library/react";
import { noop } from "lodash";

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

test("typing a search input show the matching results", async () => {
    const { getByTestId, getAllByTestId } = render(createSearchInput());

    fireEvent.change(await getTextbox(getByTestId), { target: { value: "A" } });
    await wait();

    expect(getAllByTestId(RESULT_ID).length).toBe(3);
});

test("search input is case insensitive", async () => {
    const { getByTestId, getAllByTestId } = render(createSearchInput());

    fireEvent.change(await getTextbox(getByTestId), { target: { value: "a" } });
    await wait();

    expect(getAllByTestId(RESULT_ID).length).toBe(3);
});

test("typing a search input that match no results, show no results message", async () => {
    const { getByTestId, queryAllByTestId, container } = render(createSearchInput());

    fireEvent.change(await getTextbox(getByTestId), { target: { value: "xyz" } });
    await wait();

    expect(queryAllByTestId(RESULT_ID).length).toBe(0);

    const noResultsNode = container.querySelector("div.message.empty");

    expect(noResultsNode).toBeInTheDocument();
});

test("can navigate through the results with arrows keydown", async () => {
    const { getByTestId, getAllByTestId, container } = render(createSearchInput());

    fireEvent.change(await getTextbox(getByTestId), { target: { value: "a" } });
    await wait();

    expect(getAllByTestId(RESULT_ID).length).toBe(3);

    fireEvent.keyDown(container, { key: "ArrowDown", keyCode: 40 });
    fireEvent.keyDown(container, { key: "ArrowDown", keyCode: 40 });
    fireEvent.keyDown(container, { key: "ArrowDown", keyCode: 40 });
    fireEvent.keyDown(container, { key: "ArrowUp", keyCode: 38 });
    await wait();

    expect(getAllByTestId(RESULT_ID)[1].parentNode).toHaveClass("active");
});

// Select a value on click
// Select a value on enter

// clicking outside close the dropdown menu
// Results menu close on esc


// When results menu is closed, the typed filter is not cleared
// Clear button click clear the search value
// Clear button click close the dropdown menu

// Clear the value with esc
// Disabled
// autofocus
