import { ToggleButton, ToggleButtonGroup } from "@react-components/button";
import { act, render, waitFor } from "@testing-library/react";
import { createRef, forwardRef } from "react";
import userEvent from "@utils/user-event";

const Group = forwardRef((props, ref) => {
    return (
        <ToggleButtonGroup
            {...props}
            ref={ref}
        >
            <ToggleButton value="1">1</ToggleButton>
            <ToggleButton value="2">2</ToggleButton>
            <ToggleButton value="3">3</ToggleButton>
        </ToggleButtonGroup>
    );
});

// ***** API *****

describe("multiple selection", () => {
    test("call onChange when a single button is selected", async () => {
        const handler = jest.fn();

        const { getAllByTestId } = render(
            <Group onChange={handler} />
        );

        act(() => {
            userEvent.click(getAllByTestId("toggle-button")[0]);
        });

        expect(handler).toHaveBeenLastCalledWith(expect.anything(), ["1"]);
    });

    test("call onChange when multiple buttons are selected", async () => {
        const handler = jest.fn();

        const { getAllByTestId } = render(
            <Group onChange={handler} />
        );

        const buttons = getAllByTestId("toggle-button");

        act(() => {
            userEvent.click(buttons[0]);
        });

        act(() => {
            userEvent.click(buttons[2]);
        });

        expect(handler).toHaveBeenLastCalledWith(expect.anything(), ["1", "3"]);
    });

    test("call onChange when a button is unselected", async () => {
        const handler = jest.fn();

        const { getAllByTestId } = render(
            <Group onChange={handler} />
        );

        const buttons = getAllByTestId("toggle-button");

        act(() => {
            userEvent.click(buttons[0]);
        });

        act(() => {
            userEvent.click(buttons[2]);
        });

        act(() => {
            userEvent.click(buttons[0]);
        });

        expect(handler).toHaveBeenLastCalledWith(expect.anything(), ["3"]);
    });

    test("pass an empty array when no button are selected", async () => {
        const handler = jest.fn();

        const { getAllByTestId } = render(
            <Group onChange={handler} />
        );

        act(() => {
            userEvent.click(getAllByTestId("toggle-button")[0]);
        });

        act(() => {
            userEvent.click(getAllByTestId("toggle-button")[0]);
        });

        expect(handler).toHaveBeenLastCalledWith(expect.anything(), []);
    });
});

describe("exclusive selection", () => {
    test("call onChange when a button is selected", async () => {
        const handler = jest.fn();

        const { getAllByTestId } = render(
            <Group exclusive onChange={handler} />
        );

        act(() => {
            userEvent.click(getAllByTestId("toggle-button")[0]);
        });

        expect(handler).toHaveBeenLastCalledWith(expect.anything(), "1");
    });

    test("call onChange when a new button is selected", async () => {
        const handler = jest.fn();

        const { getAllByTestId } = render(
            <Group exclusive onChange={handler} />
        );

        act(() => {
            userEvent.click(getAllByTestId("toggle-button")[0]);
        });

        act(() => {
            userEvent.click(getAllByTestId("toggle-button")[2]);
        });

        expect(handler).toHaveBeenLastCalledWith(expect.anything(), "3");
    });

    test("pass null when a button is unselected", async () => {
        const handler = jest.fn();

        const { getAllByTestId } = render(
            <Group exclusive onChange={handler} />
        );

        act(() => {
            userEvent.click(getAllByTestId("toggle-button")[0]);
        });

        act(() => {
            userEvent.click(getAllByTestId("toggle-button")[0]);
        });

        expect(handler).toHaveBeenLastCalledWith(expect.anything(), null);
    });
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef();

    render(
        <Group ref={ref} />
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("DIV");
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode = null;

    render(
        <Group
            ref={node => {
                refNode = node;
            }}
        />
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("DIV");
});

test("set ref once", async () => {
    const handler = jest.fn();

    render(
        <Group ref={handler} />
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
