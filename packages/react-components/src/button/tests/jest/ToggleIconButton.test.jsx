import { AddIcon } from "@react-components/icons";
import { ToggleIconButton } from "@react-components/button";
import { act, render, waitFor } from "@testing-library/react";
import { createRef } from "react";
import userEvent from "@utils/user-event";

// ***** API *****

test("call onChange when the button is selected", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(
        <ToggleIconButton onChange={handler} value="any"><AddIcon /></ToggleIconButton>
    );

    act(() => {
        userEvent.click(getByTestId("toggle-button"));
    });

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), { value: "any", isSelected: true });
});

test("call onChange when the button is unselected", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(
        <ToggleIconButton onChange={handler} value="any"><AddIcon /></ToggleIconButton>
    );

    act(() => {
        userEvent.click(getByTestId("toggle-button"));
    });

    act(() => {
        userEvent.click(getByTestId("toggle-button"));
    });

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), { value: "any", isSelected: false });
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef();

    render(
        <ToggleIconButton ref={ref} value="any"><AddIcon /></ToggleIconButton>
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("BUTTON");
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode = null;

    render(
        <ToggleIconButton
            ref={node => {
                refNode = node;
            }}
            value="any"
        >
            <AddIcon />
        </ToggleIconButton>
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("BUTTON");
});

test("set ref once", async () => {
    const handler = jest.fn();

    render(
        <ToggleIconButton ref={handler} value="any"><AddIcon /></ToggleIconButton>
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
