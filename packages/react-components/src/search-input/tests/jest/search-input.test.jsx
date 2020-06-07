import {
    ALEXANDRE_RESULT,
    ALEXANDRE_VALUE,
    CLEAR_BUTTON_ID,
    DEFAULT_RESULTS,
    NUMBER_OF_RESULTS_BEGINNING_WITH_A,
    getInput,
    getResultsMenu,
    search
} from "./shared";
import { SearchInput, searchInputResult } from "@react-components/search-input";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { noop } from "lodash";
import { waitDelay } from "@utils/wait-delay";
import userEvent from "@utils/user-event";

function createSearchInput({ results = DEFAULT_RESULTS, onValueChange = noop, ...otherProps } = {}) {
    return <SearchInput
        results={results}
        onValueChange={onValueChange}
        debounceDelay={0}
        {...otherProps}
    />;
}

// ***** Behaviors *****

test("typing a search input show the matching results", async () => {
    const renderResult = render(createSearchInput());

    const { queries } = await search("A", renderResult);

    await waitFor(() => expect(queries.getResults().length).toBe(NUMBER_OF_RESULTS_BEGINNING_WITH_A));
});

test("search input is case insensitive", async () => {
    const renderResult = render(createSearchInput());

    const { queries } = await search("a", renderResult);

    await waitFor(() => expect(queries.getResults().length).toBe(NUMBER_OF_RESULTS_BEGINNING_WITH_A));
});

test("typing a search input that match no results, show no results message", async () => {
    const renderResult = render(createSearchInput());

    const { queries } = await search("xyz", renderResult);

    await waitFor(() => expect(queries.queryResults().length).toBe(0));
    await waitFor(() => expect(queries.getNoResults()).toBeInTheDocument());
});

test("can navigate through the results with arrows keydown", async () => {
    const renderResult = render(createSearchInput());

    const { container } = renderResult;

    const { queries } = await search("a", renderResult);

    await waitFor(() => expect(queries.getResults().length).toBe(NUMBER_OF_RESULTS_BEGINNING_WITH_A));

    act(() => {
        fireEvent.keyDown(container, { key: "ArrowDown", keyCode: 40 });
    });

    act(() => {
        fireEvent.keyDown(container, { key: "ArrowDown", keyCode: 40 });
    });

    act(() => {
        fireEvent.keyDown(container, { key: "ArrowDown", keyCode: 40 });
    });

    act(() => {
        fireEvent.keyDown(container, { key: "ArrowUp", keyCode: 38 });
    });

    await waitFor(() => expect(queries.getResults()[1].parentNode).toHaveClass("active"));
});

test("can select a result on click", async () => {
    const renderResult = render(createSearchInput());

    const { inputNode, queries } = await search("a", renderResult);

    await waitFor(() => expect(queries.getResults().length).toBe(NUMBER_OF_RESULTS_BEGINNING_WITH_A));

    act(() => {
        userEvent.click(queries.getResults()[1]);
    });

    await waitFor(() => expect(inputNode).toHaveValue(ALEXANDRE_VALUE));
});

test("can select a result on enter keydown", async () => {
    const renderResult = render(createSearchInput());

    const { container } = renderResult;

    const { inputNode, queries } = await search("a", renderResult);

    await waitFor(() => expect(queries.getResults().length).toBe(NUMBER_OF_RESULTS_BEGINNING_WITH_A));

    act(() => {
        fireEvent.keyDown(container, { key: "ArrowDown", keyCode: 40 });
    });

    act(() => {
        fireEvent.keyDown(container, { key: "ArrowDown", keyCode: 40 });
    });

    act(() => {
        fireEvent.keyDown(queries.getResults()[1], { key: "Enter", keyCode: 13 });
    });

    await waitFor(() => expect(inputNode).toHaveValue(ALEXANDRE_VALUE));
});

test("when a result is selected, the dropdown menu close", async () => {
    const renderResult = render(createSearchInput());

    const { container } = renderResult;

    const { queries } = await search("a", renderResult);

    await waitFor(() => expect(queries.getResults().length).toBe(NUMBER_OF_RESULTS_BEGINNING_WITH_A));

    act(() => {
        userEvent.click(queries.getResults()[1]);
    });

    await waitFor(() => expect(getResultsMenu(container)).not.toBeInTheDocument());
});

test("close the dropdown menu on outside click", async () => {
    const { container } = render(createSearchInput({
        defaultOpen: true
    }));

    await waitFor(() => expect(getResultsMenu(container)).toBeInTheDocument());

    act(() => {
        userEvent.click(document.body);
    });

    await waitFor(() => expect(getResultsMenu(container)).not.toBeInTheDocument());
});

test("close the dropdown menu on blur", async () => {
    const { getByTestId, container } = render(createSearchInput({
        defaultOpen: true
    }));

    await waitFor(() => expect(getResultsMenu(container)).toBeInTheDocument());

    act(() => {
        fireEvent.blur(getInput(getByTestId));
    });

    await waitFor(() => expect(getResultsMenu(container)).not.toBeInTheDocument());
});

test("close the dropdown menu on esc keydown", async () => {
    const { getByTestId, container } = render(createSearchInput({
        defaultOpen: true
    }));

    await waitFor(() => expect(getResultsMenu(container)).toBeInTheDocument());

    act(() => {
        fireEvent.keyDown(getInput(getByTestId), { key: "Escape", keyCode: 27 });
    });

    await waitFor(() => expect(getResultsMenu(container)).not.toBeInTheDocument());
});

test("when no result is selected, on blur should clear the search input", async () => {
    const renderResult = render(createSearchInput());

    const { inputNode } = await search("a", renderResult);

    act(() => {
        fireEvent.blur(inputNode);
    });

    await waitFor(() => expect(inputNode).toHaveValue(""));
});

test("when a result is selected, on blur shouldn't clear the search input", async () => {
    const renderResult = render(createSearchInput());

    const { inputNode, queries } = await search("a", renderResult);

    await waitFor(() => expect(queries.getResults().length).toBe(NUMBER_OF_RESULTS_BEGINNING_WITH_A));

    act(() => {
        userEvent.click(queries.getResults()[0]);
    });

    await waitFor(() => expect(inputNode).not.toHaveValue(""));
});

test("selected result is cleared on 2x esc keydown", async () => {
    const renderResult = render(createSearchInput());

    const { inputNode } = await search("a", renderResult);

    act(() => {
        fireEvent.keyDown(inputNode, { key: "Escape", keyCode: 27 });
    });

    act(() => {
        fireEvent.keyDown(inputNode, { key: "Escape", keyCode: 27 });
    });

    await waitFor(() => expect(inputNode).toHaveValue(""));
});

test("selected result is cleared on clear button click", async () => {
    const { getByTestId } = render(createSearchInput({
        defaultValue: ALEXANDRE_VALUE
    }));

    act(() => {
        userEvent.click(getByTestId(CLEAR_BUTTON_ID));
    });

    await waitFor(() => expect(getInput(getByTestId)).toHaveValue(""));
});


test("input is focused on clear button click", async () => {
    const { getByTestId } = render(createSearchInput({
        defaultValue: ALEXANDRE_VALUE
    }));

    act(() => {
        userEvent.click(getByTestId(CLEAR_BUTTON_ID));
    });

    await waitFor(() => expect(getInput(getByTestId)).toHaveFocus());
});

test("dropdown menu is closed on clear button click", async () => {
    const renderResult = render(createSearchInput({
        defaultValue: ALEXANDRE_VALUE
    }));

    const { getByTestId } = renderResult;

    const { queries } = await search("a", renderResult);

    act(() => {
        userEvent.click(getByTestId(CLEAR_BUTTON_ID));
    });

    expect(queries.getResultsMenu()).not.toBeInTheDocument();
});

test("when autofocus is true, the input is focused on render", async () => {
    const { getByTestId } = render(createSearchInput({
        autofocus: true,
        autofocusDelay: 0
    }));

    // Required for the JavaScript scheduler to run the autofocus code since it's in a setTimeout.
    await waitDelay(0);

    await waitFor(() => expect(getInput(getByTestId)).toHaveFocus());
});

test("when delayed autofocus, the input is focused after the delay", async () => {
    const { getByTestId } = render(createSearchInput({
        autofocus: true,
        autofocusDelay: 50
    }));

    // Required for the JavaScript scheduler to run the autofocus code since it's in a setTimeout.
    await waitDelay(0);

    expect(getInput(getByTestId)).not.toHaveFocus();

    await waitFor(() => expect(getInput(getByTestId)).toHaveFocus());
});

test("when disabled, dont open the dropdown menu on textbox click", async () => {
    const { getByTestId, container } = render(createSearchInput({
        disabled: true
    }));

    act(() => {
        userEvent.click(getInput(getByTestId));
    });

    await waitFor(() => expect(getResultsMenu(container)).toBeNull());
});

test("when closeOnSelect is true, clear the search input on item select", async () => {
    const renderResult = render(createSearchInput({
        clearOnSelect: true
    }));

    const { inputNode, queries } = await search("a", renderResult);

    act(() => {
        userEvent.click(queries.getResults()[0]);
    });

    await waitFor(() => expect(inputNode).toHaveTextContent(""));
});

test("wait until specified minCharacters count typed before filtering and showing results", async () => {
    const MINIMUM_CHARACTERS = 4;

    const renderResult = render(createSearchInput({
        minCharacters: MINIMUM_CHARACTERS
    }));

    const { getByTestId, container } = renderResult;

    act(() => {
        userEvent.type(getInput(getByTestId), ALEXANDRE_VALUE.substring(0, MINIMUM_CHARACTERS -1));
    });

    expect(getResultsMenu(container)).not.toBeInTheDocument();

    const { queries } = await search(ALEXANDRE_VALUE, renderResult);

    await waitFor(() => expect(queries.getResults().length).toBe(1));
    await waitFor(() => expect(queries.getResults()[0]).toHaveTextContent(ALEXANDRE_VALUE));
});

// // ***** API *****

test("call onValueChange when a result is selected on click", async () => {
    const handler = jest.fn();

    const renderResult = render(createSearchInput({
        onValueChange: handler
    }));

    const { queries } = await search("a", renderResult);

    act(() => {
        userEvent.click(queries.queryResults()[1]);
    });

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), ALEXANDRE_RESULT));
});

test("call onValueChange when a result is selected on enter keydown", async () => {
    const handler = jest.fn();

    const renderResult = render(createSearchInput({
        onValueChange: handler
    }));

    const { container } = renderResult;

    await search("a", renderResult);

    act(() => {
        fireEvent.keyDown(container, { key: "ArrowDown", keyCode: 40 });
    });

    act(() => {
        fireEvent.keyDown(container, { key: "ArrowDown", keyCode: 40 });
    });

    act(() => {
        fireEvent.keyDown(container, { key: "Enter", keyCode: 13 });
    });

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), ALEXANDRE_RESULT));
});

test("call onValueChange when the selected result is cleared", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(createSearchInput({
        defaultValue: ALEXANDRE_VALUE,
        onValueChange: handler
    }));

    act(() => {
        userEvent.click(getByTestId(CLEAR_BUTTON_ID));
    });

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), null));
});

test("call onVisibilityChange when the dropdown menu is opened by typing a search input", async () => {
    const handler = jest.fn();

    const renderResult = render(createSearchInput({
        onVisibilityChange: handler
    }));

    await search("xyz", renderResult);

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), true));
});

test("call onVisibilityChange when the dropdown menu is closed on outside click", async () => {
    const handler = jest.fn();

    const { container } = render(createSearchInput({
        defaultOpen: true,
        onVisibilityChange: handler
    }));

    await waitFor(() => expect(getResultsMenu(container)).toBeInTheDocument());

    act(() => {
        userEvent.click(document.body);
    });

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), false));
});

test("call onVisibilityChange when the dropdown menu is closed on esc keydown", async () => {
    const handler = jest.fn();

    const { getByTestId, container } = render(createSearchInput({
        defaultOpen: true,
        onVisibilityChange: handler
    }));

    await waitFor(() => expect(getResultsMenu(container)).toBeInTheDocument());

    act(() => {
        fireEvent.keyDown(getInput(getByTestId), { key: "Escape", keyCode: 27 });
    });

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), false));
});

test("call onVisibilityChange when the dropdown menu is closed on blur", async () => {
    const handler = jest.fn();

    const { getByTestId, container } = render(createSearchInput({
        defaultOpen: true,
        onVisibilityChange: handler
    }));

    await waitFor(() => expect(getResultsMenu(container)).toBeInTheDocument());

    act(() => {
        fireEvent.blur(getInput(getByTestId));
    });

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), false));
});

test("call onVisibilityChange when the dropdown menu is closed on item selection", async () => {
    const handler = jest.fn();

    const renderResult = render(createSearchInput({
        onVisibilityChange: handler
    }));

    const { queries } = await search("a", renderResult);

    act(() => {
        userEvent.click(queries.getResults()[0]);
    });

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), false));
});

test("call onSearch when the search input change", async () => {
    const handler = jest.fn(() => {
        return [];
    });

    const renderResult = render(createSearchInput({
        onSearch: handler
    }));

    await search("a", renderResult);

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), DEFAULT_RESULTS, "a"));
});

test("call onSearch with custom object when specified", async () => {
    const handler = jest.fn(() => {
        return [];
    });

    const RESULT = searchInputResult("1", ALEXANDRE_VALUE, { foo: "bar" });

    const renderResult = render(createSearchInput({
        results: [RESULT],
        onSearch: handler
    }));

    await search("a", renderResult);

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), [RESULT], "a"));
});

test("results returned by onSearch are shown", async () => {
    const results = [DEFAULT_RESULTS[0], DEFAULT_RESULTS[1]];

    const handler = jest.fn(() => {
        return results;
    });

    const renderResult = render(createSearchInput({
        onSearch: handler
    }));

    const { queries } = await search("a", renderResult);

    const resultsNodes = queries.getResults();

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

    act(() => {
        fireEvent.blur(getInput(getByTestId));
    });

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything()));
});

test("call onKeyDown when any keys down on the input", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(createSearchInput({
        onKeyDown: handler
    }));

    const inputNode = getInput(getByTestId);

    act(() => {
        fireEvent.keyDown(inputNode, { key: "Escape", keyCode: 27 });
    });

    act(() => {
        fireEvent.keyDown(inputNode, { key: "Enter", keyCode: 13 });
    });

    act(() => {
        fireEvent.keyDown(inputNode, { key: " ", keyCode: 32 });
    });

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(3));
});

test("call onClear when the clear button is clicked", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(createSearchInput({
        defaultValue: ALEXANDRE_VALUE,
        onClear: handler
    }));

    act(() => {
        userEvent.click(getByTestId(CLEAR_BUTTON_ID));
    });

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything()));
});
