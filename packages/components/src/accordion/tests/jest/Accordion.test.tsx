import { act, fireEvent, screen, waitFor, renderWithTheme } from "@test-utils";
import { Accordion } from "@components/accordion";
import { Content } from "@components/placeholders";
import { H3 } from "@components/typography";
import { Item } from "@components/collection";
import { Keys } from "@components/shared";
import { createRef } from "react";

// ***** Behaviors *****

test("down arrow keypress select the next item", async () => {
    renderWithTheme(
        <Accordion>
            <Item data-testid="item-1">
                <H3>Header</H3>
                <Content>Content</Content>
            </Item>
            <Item data-testid="item-2">
                <H3>Header</H3>
                <Content>Content</Content>
            </Item>
            <Item>
                <H3>Header</H3>
                <Content>Content</Content>
            </Item>
        </Accordion>
    );

    act(() => {
        screen.getByTestId("item-1").focus();
    });

    fireEvent.keyDown(screen.getByTestId("item-1"), { key: Keys.arrowDown });

    await waitFor(() => expect(screen.getByTestId("item-2")).toHaveFocus());
});

test("up arrow keypress select the next item", async () => {
    renderWithTheme(
        <Accordion>
            <Item data-testid="item-1">
                <H3>Header</H3>
                <Content>Content</Content>
            </Item>
            <Item data-testid="item-2">
                <H3>Header</H3>
                <Content>Content</Content>
            </Item>
            <Item>
                <H3>Header</H3>
                <Content>Content</Content>
            </Item>
        </Accordion>
    );

    act(() => {
        screen.getByTestId("item-2").focus();
    });

    fireEvent.keyDown(screen.getByTestId("item-2"), { key: Keys.arrowUp });

    await waitFor(() => expect(screen.getByTestId("item-1")).toHaveFocus());
});

test("when autofocus is true, accordion header is focused on render", async () => {
    renderWithTheme(
        <Accordion autoFocus>
            <Item data-testid="item-1">
                <H3>Header</H3>
                <Content>Content</Content>
            </Item>
            <Item>
                <H3>Header</H3>
                <Content>Content</Content>
            </Item>
            <Item>
                <H3>Header</H3>
                <Content>Content</Content>
            </Item>
        </Accordion>
    );

    await waitFor(() => expect(screen.getByTestId("item-1")).toHaveFocus());
});

test("when autofocus is specified with a delay, accordion header is focused after the delay", async () => {
    renderWithTheme(
        <Accordion autoFocus={10}>
            <Item data-testid="item-1">
                <H3>Header</H3>
                <Content>Content</Content>
            </Item>
            <Item>
                <H3>Header</H3>
                <Content>Content</Content>
            </Item>
            <Item>
                <H3>Header</H3>
                <Content>Content</Content>
            </Item>
        </Accordion>
    );

    expect(screen.getByTestId("item-1")).not.toHaveFocus();

    await waitFor(() => expect(screen.getByTestId("item-1")).toHaveFocus());
});

// ***** Aria *****

test("when an id is provided, the accordion id attribute match the provided value", async () => {
    renderWithTheme(
        <Accordion id="foo" data-testid="accordion">
            <Item>
                <H3>Header</H3>
                <Content>Content</Content>
            </Item>
            <Item>
                <H3>Header</H3>
                <Content>Content</Content>
            </Item>
        </Accordion>
    );

    await waitFor(() => expect(screen.getByTestId("accordion")).toHaveAttribute("id", "foo"));
});

// ***** Api *****

test("when single, call onExpansionChange when the expanded tab change", async () => {
    const handler = jest.fn();

    renderWithTheme(
        <Accordion expansionMode="single" onExpansionChange={handler}>
            <Item data-testid="item-1">
                <H3>Header</H3>
                <Content>Content</Content>
            </Item>
            <Item data-testid="item-2">
                <H3>Header</H3>
                <Content>Content</Content>
            </Item>
            <Item>
                <H3>Header</H3>
                <Content>Content</Content>
            </Item>
        </Accordion>
    );

    fireEvent.click(screen.getByTestId("item-1"));

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), ["0"]));

    fireEvent.click(screen.getByTestId("item-2"));

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), ["1"]));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(2));
});

test("when multiple, call onExpansionChange when the expanded tabs change", async () => {
    const handler = jest.fn();

    renderWithTheme(
        <Accordion expansionMode="multiple" onExpansionChange={handler}>
            <Item data-testid="item-1">
                <H3>Header</H3>
                <Content>Content</Content>
            </Item>
            <Item data-testid="item-2">
                <H3>Header</H3>
                <Content>Content</Content>
            </Item>
            <Item>
                <H3>Header</H3>
                <Content>Content</Content>
            </Item>
        </Accordion>
    );

    fireEvent.click(screen.getByTestId("item-1"));

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), ["0"]));

    fireEvent.click(screen.getByTestId("item-2"));

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), ["0", "1"]));

    fireEvent.click(screen.getByTestId("item-2"));

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), ["0"]));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(3));
});

// ***** Refs *****

test("accordion ref is a DOM element", async () => {
    const ref = createRef<HTMLElement>();

    renderWithTheme(
        <Accordion ref={ref}>
            <Item>
                <H3>Header</H3>
                <Content>Content</Content>
            </Item>
        </Accordion>
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("DIV");
});

test("header ref is a DOM element", async () => {
    const ref = createRef<HTMLElement>();

    renderWithTheme(
        <Accordion>
            <Item>
                <H3 ref={ref}>Header</H3>
                <Content>Content</Content>
            </Item>
        </Accordion>
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("BUTTON");
});

test("content ref is a DOM element", async () => {
    const ref = createRef<HTMLElement>();

    renderWithTheme(
        <Accordion>
            <Item>
                <H3>Header</H3>
                <Content ref={ref}>Content</Content>
            </Item>
        </Accordion>
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("DIV");
});
