import { CheckableContext } from "@react-components/shared";
import { Content } from "@react-components/placeholders";
import { Heading } from "@react-components/typography";
import { Tile } from "@react-components/tile";
import { act, render, waitFor } from "@testing-library/react";
import { createRef } from "react";
import { waitDelay } from "@utils/waitDelay";
import userEvent from "@testing-library/user-event";

// ***** Behaviors *****

test("when autofocus is true, the tile is focused on render", async () => {
    const { getByTestId } = render(
        <Tile autoFocus data-testid="tile">
            <Heading>Fuel</Heading>
            <Content>Fuel configuration and level</Content>
        </Tile>
    );

    await waitFor(() => expect(getByTestId("tile")).toHaveFocus());
});

test("when autofocus is true and the tile is disabled, the tile is not focused on render", async () => {
    const { getByTestId } = render(
        <Tile disabled autoFocus data-testid="tile">
            <Heading>Fuel</Heading>
            <Content>Fuel configuration and level</Content>
        </Tile>
    );

    await waitFor(() => expect(getByTestId("tile")).not.toHaveFocus());
});

test("when autofocus is specified with a delay, the tile is focused after the delay", async () => {
    const { getByTestId } = render(
        <Tile autoFocus={10} data-testid="tile">
            <Heading>Fuel</Heading>
            <Content>Fuel configuration and level</Content>
        </Tile>
    );

    await waitFor(() => expect(getByTestId("tile")).not.toHaveFocus());

    await waitDelay(10);

    await waitFor(() => expect(getByTestId("tile")).toHaveFocus());
});

// ***** Aria *****

test("when a tile is not in a checkable context and is not selected, aria-pressed is \"false\"", async () => {
    const { getByTestId } = render(
        <Tile data-testid="tile">
            <Heading>Fuel</Heading>
            <Content>Fuel configuration and level</Content>
        </Tile>
    );

    await waitFor(() => expect(getByTestId("tile")).toHaveAttribute("aria-pressed", "false"));
});

test("when a tile is not in a checkable context and is selected, aria-pressed is \"true\"", async () => {
    const { getByTestId } = render(
        <Tile checked data-testid="tile">
            <Heading>Fuel</Heading>
            <Content>Fuel configuration and level</Content>
        </Tile>
    );

    await waitFor(() => expect(getByTestId("tile")).toHaveAttribute("aria-pressed", "true"));
});

test("when a tile is in a checkable context and is not selected, aria-checked is \"false\"", async () => {
    const { getByTestId } = render(
        <CheckableContext.Provider
            value={{
                checkedValue: []
            }}
        >
            <Tile data-testid="tile">
                <Heading>Fuel</Heading>
                <Content>Fuel configuration and level</Content>
            </Tile>
        </CheckableContext.Provider>
    );

    await waitFor(() => expect(getByTestId("tile")).toHaveAttribute("aria-checked", "false"));
});

test("when a tile is in a checkable context and is selected, aria-checked is \"true\"", async () => {
    const { getByTestId } = render(
        <CheckableContext.Provider
            value={{
                checkedValue: ["fuel"]
            }}
        >
            <Tile value="fuel" data-testid="tile">
                <Heading>Fuel</Heading>
                <Content>Fuel configuration and level</Content>
            </Tile>
        </CheckableContext.Provider>
    );

    await waitFor(() => expect(getByTestId("tile")).toHaveAttribute("aria-checked", "true"));
});

// ***** Api *****

test("call onChange when the tile is selected", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(
        <Tile onChange={handler} data-testid="tile">
            <Heading>Fuel</Heading>
            <Content>Fuel configuration and level</Content>
        </Tile>
    );

    act(() => {
        userEvent.click(getByTestId("tile"));
    });

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), true));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});

test("call onChange when the tile is unselected", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(
        <Tile onChange={handler} data-testid="tile">
            <Heading>Fuel</Heading>
            <Content>Fuel configuration and level</Content>
        </Tile>
    );

    act(() => {
        userEvent.click(getByTestId("tile"));
    });

    act(() => {
        userEvent.click(getByTestId("tile"));
    });

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), false));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(2));
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef<HTMLElement>();

    render(
        <Tile ref={ref}>
            <Heading>Fuel</Heading>
            <Content>Fuel configuration and level</Content>
        </Tile>
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    await waitFor(() => expect(ref.current instanceof HTMLElement).toBeTruthy());
    await waitFor(() => expect(ref.current.tagName).toBe("BUTTON"));
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode: HTMLElement = null;

    render(
        <Tile
            ref={node => {
                refNode = node;
            }}
        >
            <Heading>Fuel</Heading>
            <Content>Fuel configuration and level</Content>
        </Tile>
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    await waitFor(() => expect(refNode instanceof HTMLElement).toBeTruthy());
    await waitFor(() => expect(refNode.tagName).toBe("BUTTON"));
});

test("set ref once", async () => {
    const handler = jest.fn();

    render(
        <Tile ref={handler}>
            <Heading>Fuel</Heading>
            <Content>Fuel configuration and level</Content>
        </Tile>
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
