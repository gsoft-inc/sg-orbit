import { screen, waitFor, renderWithTheme } from "@test-utils";

import { CheckableContext } from "@components/shared";
import { Content } from "@components/placeholders";
import { Heading } from "@components/typography";
import { Tile } from "@components/tile";
import { createRef } from "react";
import userEvent from "@testing-library/user-event";

// ***** Behaviors *****

test("when autofocus is true, the tile is focused on render", async () => {
    renderWithTheme(
        <Tile autoFocus data-testid="tile">
            <Heading>Fuel</Heading>
            <Content>Fuel configuration and level</Content>
        </Tile>
    );

    await waitFor(() => expect(screen.getByTestId("tile")).toHaveFocus());
});

test("when autofocus is true and the tile is disabled, the tile is not focused on render", async () => {
    renderWithTheme(
        <Tile disabled autoFocus data-testid="tile">
            <Heading>Fuel</Heading>
            <Content>Fuel configuration and level</Content>
        </Tile>
    );

    await waitFor(() => expect(screen.getByTestId("tile")).not.toHaveFocus());
});

test("when autofocus is specified with a delay, the tile is focused after the delay", async () => {
    renderWithTheme(
        <Tile autoFocus={10} data-testid="tile">
            <Heading>Fuel</Heading>
            <Content>Fuel configuration and level</Content>
        </Tile>
    );

    expect(screen.getByTestId("tile")).not.toHaveFocus();

    await waitFor(() => expect(screen.getByTestId("tile")).toHaveFocus());
});

// ***** Aria *****

test("when a tile is not in a checkable context and is not selected, aria-pressed is \"false\"", async () => {
    renderWithTheme(
        <Tile data-testid="tile">
            <Heading>Fuel</Heading>
            <Content>Fuel configuration and level</Content>
        </Tile>
    );

    await waitFor(() => expect(screen.getByTestId("tile")).toHaveAttribute("aria-pressed", "false"));
});

test("when a tile is not in a checkable context and is selected, aria-pressed is \"true\"", async () => {
    renderWithTheme(
        <Tile checked data-testid="tile">
            <Heading>Fuel</Heading>
            <Content>Fuel configuration and level</Content>
        </Tile>
    );

    await waitFor(() => expect(screen.getByTestId("tile")).toHaveAttribute("aria-pressed", "true"));
});

test("when a tile is in a checkable context and is not selected, aria-checked is \"false\"", async () => {
    renderWithTheme(
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

    await waitFor(() => expect(screen.getByTestId("tile")).toHaveAttribute("aria-checked", "false"));
});

test("when a tile is in a checkable context and is selected, aria-checked is \"true\"", async () => {
    renderWithTheme(
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

    await waitFor(() => expect(screen.getByTestId("tile")).toHaveAttribute("aria-checked", "true"));
});

// ***** Api *****

test("call onChange when the tile is selected", async () => {
    const handler = jest.fn();

    renderWithTheme(
        <Tile onChange={handler} data-testid="tile">
            <Heading>Fuel</Heading>
            <Content>Fuel configuration and level</Content>
        </Tile>
    );

    await userEvent.click(screen.getByTestId("tile"));

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), true));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});

test("call onChange when the tile is unselected", async () => {
    const handler = jest.fn();

    renderWithTheme(
        <Tile onChange={handler} data-testid="tile">
            <Heading>Fuel</Heading>
            <Content>Fuel configuration and level</Content>
        </Tile>
    );

    await userEvent.click(screen.getByTestId("tile"));

    await userEvent.click(screen.getByTestId("tile"));

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), false));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(2));
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef<HTMLElement>();

    renderWithTheme(
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

    renderWithTheme(
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

    renderWithTheme(
        <Tile ref={handler}>
            <Heading>Fuel</Heading>
            <Content>Fuel configuration and level</Content>
        </Tile>
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
