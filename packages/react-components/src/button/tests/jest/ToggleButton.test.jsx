import { ToggleButton } from "@react-components/button";
import { act, render, waitFor } from "@testing-library/react";
import { createRef } from "react";
import userEvent from "@utils/userEvent";

// ***** Api *****

test("call onChange when the button is selected", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(
        <ToggleButton onChange={handler} value="any" data-testid="toggle-button">Cutoff</ToggleButton>
    );

    act(() => {
        userEvent.click(getByTestId("toggle-button"));
    });

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), true);
});

test("call onChange when the button is unselected", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(
        <ToggleButton onChange={handler} value="any" data-testid="toggle-button">Cutoff</ToggleButton>
    );

    act(() => {
        userEvent.click(getByTestId("toggle-button"));
    });

    act(() => {
        userEvent.click(getByTestId("toggle-button"));
    });

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), false);
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef();

    render(
        <ToggleButton ref={ref} value="any">Cutoff</ToggleButton>
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("BUTTON");
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode = null;

    render(
        <ToggleButton
            ref={node => {
                refNode = node;
            }}
            value="any"
        >Cutoff</ToggleButton>
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("BUTTON");
});

test("set ref once", async () => {
    const handler = jest.fn();

    render(
        <ToggleButton ref={handler} value="any">Cutoff</ToggleButton>
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
