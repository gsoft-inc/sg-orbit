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
import { RemoteSearchInput } from "@react-components/search-input";
import { fireEvent, render, wait, waitForDomChange, waitForElement } from "@testing-library/react";
import { noop } from "lodash";
import userEvent from "@utils/user-event";

function withResults({ items = DEFAULT_RESULTS, startsWith = true } = {}) {
    return (event, query) => {
        if (startsWith) {
            return Promise.resolve(items.filter(x => x.text.toUpperCase().startsWith(query.toUpperCase())));
        }

        return Promise.resolve(items);
    };
}

function failingResultsFetcher() {
    return Promise.reject();
}

function createRemoteSearchInput({ onFetchResults = withResults(), onValueChange = noop, ...otherProps } = {}) {
    return <RemoteSearchInput
        onFetchResults={onFetchResults}
        onValueChange={onValueChange}
        {...otherProps}
    />;
}

// ***** Behaviors *****

test("typing a search input show the matching results", async () => {
    const { getByTestId, getAllByTestId, container } = render(createRemoteSearchInput());

    userEvent.type(await getInput(getByTestId), "A");
    await waitForElement(() => getResultsMenu(container));

    expect(getAllByTestId(RESULT_ID).length).toBe(NUMBER_OF_RESULTS_BEGINNING_WITH_A);
});

test("typing a search input that match no results, show no results message", async () => {
    const { getByTestId, queryAllByTestId, container } = render(createRemoteSearchInput());

    userEvent.type(await getInput(getByTestId), "xyz");
    await waitForElement(() => getResultsMenu(container));

    expect(queryAllByTestId(RESULT_ID).length).toBe(0);
    expect(getNoResults(container)).toBeInTheDocument();
});

test("can navigate through the results with arrows keydown", async () => {
    const { getByTestId, getAllByTestId, container } = render(createRemoteSearchInput());

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
    const { getByTestId, getAllByTestId, container } = render(createRemoteSearchInput());

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
    const { getByTestId, getAllByTestId, container } = render(createRemoteSearchInput());

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
    const { getByTestId, getAllByTestId, container } = render(createRemoteSearchInput());

    userEvent.type(await getInput(getByTestId), "a");
    await waitForElement(() => getResultsMenu(container));

    const resultNodes = getAllByTestId(RESULT_ID);

    expect(resultNodes.length).toBe(NUMBER_OF_RESULTS_BEGINNING_WITH_A);

    userEvent.click(resultNodes[1]);
    await wait();

    expect(getResultsMenu(container)).not.toBeInTheDocument();
});

test("close the dropdown menu on outside click", async () => {
    const { getByTestId, container } = render(createRemoteSearchInput({
        defaultOpen: true
    }));

    await waitForElement(() => getResultsMenu(container));

    // await wait();
    expect(await getInput(getByTestId)).toHaveFocus();

    userEvent.click(document.body);
    await wait();

    expect(getResultsMenu(container)).not.toBeInTheDocument();
});

test("close the dropdown menu on blur", async () => {
    const { getByTestId, container } = render(createRemoteSearchInput({
        defaultOpen: true
    }));

    await waitForElement(() => getResultsMenu(container));

    fireEvent.blur(await getInput(getByTestId));
    await wait();

    expect(getResultsMenu(container)).not.toBeInTheDocument();
});

test("close the dropdown menu on esc keydown", async () => {
    const { getByTestId, container } = render(createRemoteSearchInput({
        defaultOpen: true
    }));

    await waitForElement(() => getResultsMenu(container));

    fireEvent.keyDown(await getInput(getByTestId), { key: "Escape", keyCode: 27 });
    await wait();

    expect(getResultsMenu(container)).not.toBeInTheDocument();
});

test("when no result is selected, on blur should clear the search input", async () => {
    const { getByTestId, container } = render(createRemoteSearchInput());

    const inputNode = await getInput(getByTestId);

    userEvent.type(inputNode, "a");
    await waitForElement(() => getResultsMenu(container));

    fireEvent.blur(inputNode);
    await wait();

    expect(inputNode).toHaveValue("");
});

test("when a result is selected, on blur shouldn't clear the search input", async () => {
    const { getByTestId, getAllByTestId, container } = render(createRemoteSearchInput());

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
    const { getByTestId, container } = render(createRemoteSearchInput());

    const inputNode = await getInput(getByTestId);

    userEvent.type(inputNode, "a");
    await waitForElement(() => getResultsMenu(container));

    fireEvent.keyDown(inputNode, { key: "Escape", keyCode: 27 });
    fireEvent.keyDown(inputNode, { key: "Escape", keyCode: 27 });
    await wait();

    expect(inputNode).toHaveValue("");
});

test("selected result is cleared on clear button click", async () => {
    const { getByTestId } = render(createRemoteSearchInput({
        defaultValue: ALEXANDRE_VALUE
    }));

    userEvent.click(getByTestId(CLEAR_BUTTON_ID));
    await wait();

    expect(await getInput(getByTestId)).toHaveValue("");
});

test("dropdown menu is closed on clear button click", async () => {
    const { getByTestId, container } = render(createRemoteSearchInput({
        defaultValue: ALEXANDRE_VALUE
    }));

    userEvent.type(await getInput(getByTestId), "a");
    await waitForElement(() => getResultsMenu(container));

    userEvent.click(getByTestId(CLEAR_BUTTON_ID));
    await wait();

    expect(getResultsMenu(container)).not.toBeInTheDocument();
});

test("when autofocus is true, the input is focused on render", async () => {
    const { getByTestId } = render(createRemoteSearchInput({
        autofocus: true,
        autofocusDelay: 0
    }));

    await wait();

    expect(await getInput(getByTestId)).toHaveFocus();
});

test("when disabled, dont open the dropdown menu on textbox click", async () => {
    const { getByTestId, container } = render(createRemoteSearchInput({
        disabled: true
    }));

    userEvent.click(await getInput(getByTestId));
    await wait();

    expect(getResultsMenu(container)).toBeNull();
});

test("when closeOnSelect is true, clear the search input on item select", async () => {
    const { getByTestId, getAllByTestId, container } = render(createRemoteSearchInput({
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

    const { getByTestId, getAllByTestId, container } = render(createRemoteSearchInput({
        minCharacters: MINIMUM_CHARACTERS
    }));

    const inputNode = await getInput(getByTestId);

    userEvent.type(inputNode, ALEXANDRE_VALUE.substring(0, MINIMUM_CHARACTERS -1));
    await wait();

    expect(getResultsMenu(container)).not.toBeInTheDocument();

    userEvent.type(inputNode, ALEXANDRE_VALUE);
    await waitForElement(() => getResultsMenu(container));

    const resultsNodes = getAllByTestId(RESULT_ID);

    expect(resultsNodes.length).toBe(1);
    expect(resultsNodes[0]).toHaveTextContent(ALEXANDRE_VALUE);
});

test("dont make any remote calls until the minCharacters count has been reached", async () => {
    const MINIMUM_CHARACTERS = 4;

    const handler = jest.fn(withResults());

    const { getByTestId, container } = render(createRemoteSearchInput({
        minCharacters: MINIMUM_CHARACTERS,
        onFetchResults: handler
    }));

    const inputNode = await getInput(getByTestId);

    userEvent.type(inputNode, ALEXANDRE_VALUE.substring(0, MINIMUM_CHARACTERS -3));
    await wait();

    userEvent.type(inputNode, ALEXANDRE_VALUE.substring(0, MINIMUM_CHARACTERS -2));
    await wait();

    userEvent.type(inputNode, ALEXANDRE_VALUE.substring(0, MINIMUM_CHARACTERS -1));
    await wait();

    userEvent.type(inputNode, ALEXANDRE_VALUE);
    await waitForElement(() => getResultsMenu(container));

    expect(handler).toHaveBeenCalledTimes(1);
});

test("when the remote call fail, show the no results message", async () => {
    const { getByTestId, container } = render(createRemoteSearchInput({
        onFetchResults: failingResultsFetcher
    }));

    userEvent.type(await getInput(getByTestId), "a");
    await wait();

    expect(getNoResults(container)).toBeInTheDocument();
});

test("show the loading state until the remote call end", async () => {
    let resolvePromise;

    const promise = new Promise(resolve => {
        resolvePromise = resolve;
    });

    const { getByTestId, container } = render(createRemoteSearchInput({
        onFetchResults: () => promise
    }));

    const inputNode = await getInput(getByTestId);

    userEvent.type(inputNode, "a");
    await waitForDomChange(container);

    expect(inputNode.parentNode).toHaveClass("loading");

    resolvePromise([]);
    await waitForDomChange(container);

    expect(inputNode.parentNode).not.toHaveClass("loading");
});

test("when closeOnBlur is false, dont close the dropdown menu on blur", async () => {
    const { getByTestId, container } = render(createRemoteSearchInput({
        closeOnBlur: false
    }));

    userEvent.type(await getInput(getByTestId), "a");
    await waitForElement(() => getResultsMenu(container));

    userEvent.click(document.body);

    expect(getResultsMenu(container)).toBeInTheDocument();
});

test("when closeOnBlur is false and closeOnOutsideClick is true, close the dropdown menu on outside click", async () => {
    const { getByTestId, container } = render(createRemoteSearchInput({
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

    const { getByTestId, getAllByTestId, container } = render(createRemoteSearchInput({
        onValueChange: handler
    }));

    const inputNode = await getInput(getByTestId);

    userEvent.type(inputNode, "a");
    await waitForElement(() => getResultsMenu(container));

    userEvent.click(getAllByTestId(RESULT_ID)[1]);
    await wait();

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), ALEXANDRE_RESULT, expect.anything());
});

test("call onValueChange when a result is selected on enter keydown", async () => {
    const handler = jest.fn();

    const { getByTestId, container } = render(createRemoteSearchInput({
        onValueChange: handler
    }));

    const inputNode = await getInput(getByTestId);

    userEvent.type(inputNode, "a");
    await waitForElement(() => getResultsMenu(container));

    fireEvent.keyDown(container, { key: "ArrowDown", keyCode: 40 });
    fireEvent.keyDown(container, { key: "ArrowDown", keyCode: 40 });
    fireEvent.keyDown(container, { key: "Enter", keyCode: 13 });
    await wait();

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), ALEXANDRE_RESULT, expect.anything());
});

test("call onValueChange when the selected result is cleared", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(createRemoteSearchInput({
        defaultValue: ALEXANDRE_VALUE,
        onValueChange: handler
    }));

    userEvent.click(getByTestId(CLEAR_BUTTON_ID));
    await wait();

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), null, expect.anything());
});

test("call onVisibilityChange when the dropdown menu is opened by typing a search input", async () => {
    const handler = jest.fn();

    const { getByTestId, container } = render(createRemoteSearchInput({
        onVisibilityChange: handler
    }));

    userEvent.type(await getInput(getByTestId), "xyz");
    await waitForElement(() => getResultsMenu(container));

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), true, expect.anything());
});

test("call onVisibilityChange when the dropdown menu is closed on outside click", async () => {
    const handler = jest.fn();

    const { container } = render(createRemoteSearchInput({
        defaultOpen: true,
        onVisibilityChange: handler
    }));

    await waitForElement(() => getResultsMenu(container));

    userEvent.click(document.body);
    await wait();

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), false, expect.anything());
});

test("call onVisibilityChange when the dropdown menu is closed on esc keydown", async () => {
    const handler = jest.fn();

    const { getByTestId, container } = render(createRemoteSearchInput({
        defaultOpen: true,
        onVisibilityChange: handler
    }));

    await waitForElement(() => getResultsMenu(container));

    fireEvent.keyDown(await getInput(getByTestId), { key: "Escape", keyCode: 27 });
    await wait();

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), false, expect.anything());
});

test("call onVisibilityChange when the dropdown menu is closed on blur", async () => {
    const handler = jest.fn();

    const { getByTestId, container } = render(createRemoteSearchInput({
        defaultOpen: true,
        onVisibilityChange: handler
    }));

    await waitForElement(() => getResultsMenu(container));

    fireEvent.blur(await getInput(getByTestId));
    await wait();

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), false, expect.anything());
});

test("call onVisibilityChange when the dropdown menu is closed on item selection", async () => {
    const handler = jest.fn();

    const { getByTestId, getAllByTestId, container } = render(createRemoteSearchInput({
        onVisibilityChange: handler
    }));

    userEvent.type(await getInput(getByTestId), "a");
    await waitForElement(() => getResultsMenu(container));

    userEvent.click(getAllByTestId(RESULT_ID)[0]);
    await wait();

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), false, expect.anything());
});

test("call onFetchResults when the search input change", async () => {
    const handler = jest.fn(withResults());

    const { getByTestId } = render(createRemoteSearchInput({
        onFetchResults: handler
    }));

    userEvent.type(await getInput(getByTestId), "a");
    await wait();

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), "a", expect.anything());
});

test("call onResults when the remote calls responds with results", async () => {
    const handler = jest.fn(() => {
        return [];
    });

    const { getByTestId } = render(createRemoteSearchInput({
        onResults: handler,
        onFetchResults: withResults({ startsWith: false })
    }));

    userEvent.type(await getInput(getByTestId), "a");
    await wait();

    expect(handler).toHaveBeenLastCalledWith(DEFAULT_RESULTS, "a", expect.anything());
});

test("call onResults when the remote calls responds without results", async () => {
    const handler = jest.fn(() => {
        return [];
    });

    const { getByTestId } = render(createRemoteSearchInput({
        onResults: handler,
        onFetchResults: withResults({ items: [] })
    }));

    userEvent.type(await getInput(getByTestId), "a");
    await wait();

    expect(handler).toHaveBeenLastCalledWith([], "a", expect.anything());
});

test("call onBlur when the input blur", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(createRemoteSearchInput({
        onBlur: handler,
        autofocus: true,
        autofocusDelay: 0
    }));

    fireEvent.blur(await getInput(getByTestId));
    await wait();

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), expect.anything());
});

test("call onKeyDown when any keys down on the input", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(createRemoteSearchInput({
        onKeyDown: handler
    }));

    const inputNode = await getInput(getByTestId);

    fireEvent.keyDown(inputNode, { key: "Escape", keyCode: 27 });
    fireEvent.keyDown(inputNode, { key: "Enter", keyCode: 13 });
    fireEvent.keyDown(inputNode, { key: " ", keyCode: 32 });
    await wait();

    expect(handler).toHaveBeenCalledTimes(3);
});

test("call onClear when the clear button is clicked", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(createRemoteSearchInput({
        defaultValue: ALEXANDRE_VALUE,
        onClear: handler
    }));

    userEvent.click(getByTestId(CLEAR_BUTTON_ID));
    await wait();

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), expect.anything());
});

test("call onOutsideClick on outside click", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(createRemoteSearchInput({
        onOutsideClick: handler
    }));

    userEvent.type(await getInput(getByTestId), "a");
    await wait();

    userEvent.click(document.body);
    await wait();

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), expect.anything());
});
