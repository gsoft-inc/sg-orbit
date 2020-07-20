import { Checkbox } from "@react-components/checkbox";
import { act, render, waitFor } from "@testing-library/react";
import { createRef } from "react";
import { waitDelay } from "@utils/wait-delay";
import userEvent from "@utils/user-event";

function getInput(getByTestId) {
    const searchInputNode = getByTestId("checkbox");

    return searchInputNode.querySelector("input");
}

// ***** Behaviors *****

test("when autofocus is true, the checkbox is autofocused on render", async () => {
    const { getByTestId } = render(
        <Checkbox autofocus />
    );

    await waitFor(() => expect(getInput(getByTestId)).toHaveFocus());
});

test("when autofocus on a disabled checkbox, the checkbox is not autofocused on render", async () => {
    const { getByTestId } = render(
        <Checkbox
            disabled
            autofocus
        />
    );

    expect(getInput(getByTestId)).not.toHaveFocus();
});

test("when delayed autofocus, the checkbox is autofocused after the delay", async () => {
    const { getByTestId } = render(
        <Checkbox
            autofocus
            autofocusDelay={50}
        />
    );

    // Required for the JavaScript scheduler to run the autofocus code since it's in a setTimeout.
    await waitDelay(0);

    expect(getInput(getByTestId)).not.toHaveFocus();

    await waitFor(() => expect(getInput(getByTestId)).toHaveFocus());
});

test("when delayed autofocus on a disabled checkbox, the checkbox is not autofocused after the delay", async () => {
    const { getByTestId } = render(
        <Checkbox
            disabled
            autofocus
            autofocusDelay={50}
        />
    );

    await waitDelay(60);

    expect(getInput(getByTestId)).not.toHaveFocus();
});

// ***** API *****

test("call onChange when the checkbox is checked", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(
        <Checkbox onChange={handler} />
    );

    act(() => {
        userEvent.click(getInput(getByTestId));
    });

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), { isChecked: true });
});

test("call onChange when the checkbox is unchecked", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(
        <Checkbox onChange={handler} />
    );

    act(() => {
        userEvent.click(getInput(getByTestId));
    });

    act(() => {
        userEvent.click(getInput(getByTestId));
    });

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), { isChecked: false });
});

test("call onChange when the checkbox goes from indeterminate to checked", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(
        <Checkbox defaultIndeterminate onChange={handler} />
    );

    act(() => {
        userEvent.click(getInput(getByTestId));
    });

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), { isChecked: true });
});

test("dont call onChange when the checkbox is disabled", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(
        <Checkbox disabled onChange={handler} />
    );

    act(() => {
        userEvent.click(getInput(getByTestId));
    });

    expect(handler).not.toHaveBeenCalled();
});

test("dont call onChange when the checkbox is readonly", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(
        <Checkbox readOnly onChange={handler} />
    );

    act(() => {
        userEvent.click(getInput(getByTestId));
    });

    expect(handler).not.toHaveBeenCalled();
});

test("can focus the button with the focus api", async () => {
    let refNode = null;

    render(
        <Checkbox
            ref={node => {
                refNode = node;
            }}
        />
    );

    act(() => {
        refNode.focus();
    });

    await waitFor(() => expect(refNode.querySelector("input")).toHaveFocus());
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef();

    render(
        <Checkbox ref={ref} />
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("LABEL");
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode = null;

    render(
        <Checkbox
            ref={node => {
                refNode = node;
            }}
        />
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("LABEL");
});

test("set ref once", async () => {
    const handler = jest.fn();

    render(
        <Checkbox ref={handler} />
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
