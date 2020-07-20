import { Checkbox } from "@react-components/checkbox";
import { createRef } from "react";
import { render, waitFor } from "@testing-library/react";
import { waitDelay } from "@utils/wait-delay";

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
