import { Radio } from "@react-components/radio";
import { act, render, waitFor } from "@testing-library/react";
import { createRef } from "react";
import { waitDelay } from "@utils/wait-delay";
import userEvent from "@utils/user-event";

function getInput(element) {
    return element.querySelector("input");
}

// ***** Behaviors *****

test("when autofocus is true, the radio is autofocused on render", async () => {
    const { getByTestId } = render(
        <Radio autofocus />
    );

    await waitFor(() => expect(getInput(getByTestId("radio"))).toHaveFocus());
});

test("when autofocus on a disabled radio, the radio is not autofocused on render", async () => {
    const { getByTestId } = render(
        <Radio
            disabled
            autofocus
        />
    );

    expect(getInput(getByTestId("radio"))).not.toHaveFocus();
});

test("when delayed autofocus, the radio is autofocused after the delay", async () => {
    const { getByTestId } = render(
        <Radio
            autofocus
            autofocusDelay={50}
        />
    );

    // Required for the JavaScript scheduler to run the autofocus code since it's in a setTimeout.
    await waitDelay(0);

    expect(getInput(getByTestId("radio"))).not.toHaveFocus();

    await waitFor(() => expect(getInput(getByTestId("radio"))).toHaveFocus());
});

test("when delayed autofocus on a disabled radio, the radio is not autofocused after the delay", async () => {
    const { getByTestId } = render(
        <Radio
            disabled
            autofocus
            autofocusDelay={50}
        />
    );

    await waitDelay(60);

    expect(getInput(getByTestId("radio"))).not.toHaveFocus();
});

// ***** API *****

test("call onChange when the radio is checked", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(
        <Radio onChange={handler} />
    );

    act(() => {
        userEvent.click(getInput(getByTestId("radio")));
    });

    expect(handler).toHaveBeenLastCalledWith(expect.anything());
});

test("call onChange when the radio is unchecked", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(
        <Radio onChange={handler} />
    );

    act(() => {
        userEvent.click(getInput(getByTestId("radio")));
    });

    act(() => {
        userEvent.click(getInput(getByTestId("radio")));
    });

    expect(handler).toHaveBeenLastCalledWith(expect.anything());
});

test("dont call onChange when the radio is disabled", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(
        <Radio disabled onChange={handler} />
    );

    act(() => {
        userEvent.click(getInput(getByTestId("radio")));
    });

    expect(handler).not.toHaveBeenCalled();
});

test("dont call onChange when the radio is readonly", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(
        <Radio readOnly onChange={handler} />
    );

    act(() => {
        userEvent.click(getInput(getByTestId("radio")));
    });

    expect(handler).not.toHaveBeenCalled();
});

test("can focus the radio with the focus api", async () => {
    let refNode = null;

    render(
        <Radio
            ref={node => {
                refNode = node;
            }}
        />
    );

    act(() => {
        refNode.focus();
    });

    await waitFor(() => expect(getInput(refNode)).toHaveFocus());
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef();

    render(
        <Radio ref={ref} />
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("LABEL");
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode = null;

    render(
        <Radio
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
        <Radio ref={handler} />
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
