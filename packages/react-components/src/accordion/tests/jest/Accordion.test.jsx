import { Accordion } from "@react-components/accordion";
import { Content, Header } from "@react-components/placeholders";
import { Item } from "@react-components/collection";
import { Keys } from "@react-components/shared";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { createRef } from "react";
import { waitDelay } from "@utils/waitDelay";

// ***** Behaviors *****

test("down arrow keypress select the next item", async () => {
    const { getByTestId } = render(
        <Accordion>
            <Item data-testid="item-1">
                <Header as="h3">Header</Header>
                <Content>Content</Content>
            </Item>
            <Item data-testid="item-2">
                <Header as="h3">Header</Header>
                <Content>Content</Content>
            </Item>
            <Item>
                <Header as="h3">Header</Header>
                <Content>Content</Content>
            </Item>
        </Accordion>
    );

    act(() => {
        getByTestId("item-1").focus();
    });

    act(() => {
        fireEvent.keyDown(getByTestId("item-1"), { key: Keys.arrowDown });
    });

    await waitFor(() => expect(getByTestId("item-2")).toHaveFocus());
});

test("up arrow keypress select the next item", async () => {
    const { getByTestId } = render(
        <Accordion>
            <Item data-testid="item-1">
                <Header as="h3">Header</Header>
                <Content>Content</Content>
            </Item>
            <Item data-testid="item-2">
                <Header as="h3">Header</Header>
                <Content>Content</Content>
            </Item>
            <Item>
                <Header as="h3">Header</Header>
                <Content>Content</Content>
            </Item>
        </Accordion>
    );

    act(() => {
        getByTestId("item-2").focus();
    });

    act(() => {
        fireEvent.keyDown(getByTestId("item-2"), { key: Keys.arrowUp });
    });

    await waitFor(() => expect(getByTestId("item-1")).toHaveFocus());
});

test("when autofocus is true, accordion header is focused on render", async () => {
    const { getByTestId } = render(
        <Accordion autoFocus>
            <Item data-testid="item-1">
                <Header as="h3">Header</Header>
                <Content>Content</Content>
            </Item>
            <Item>
                <Header as="h3">Header</Header>
                <Content>Content</Content>
            </Item>
            <Item>
                <Header as="h3">Header</Header>
                <Content>Content</Content>
            </Item>
        </Accordion>
    );

    await waitFor(() => expect(getByTestId("item-1")).toHaveFocus());
});

test("when autofocus is specified with a delay, accordion header is focused after the delay", async () => {
    const { getByTestId } = render(
        <Accordion autoFocus={10}>
            <Item data-testid="item-1">
                <Header as="h3">Header</Header>
                <Content>Content</Content>
            </Item>
            <Item>
                <Header as="h3">Header</Header>
                <Content>Content</Content>
            </Item>
            <Item>
                <Header as="h3">Header</Header>
                <Content>Content</Content>
            </Item>
        </Accordion>
    );

    await waitFor(() => expect(getByTestId("item-1")).not.toHaveFocus());

    await waitDelay(10);

    await waitFor(() => expect(getByTestId("item-1")).toHaveFocus());
});

// ***** Api *****

test("when single, call onExpansionChange when the expanded tab change", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(
        <Accordion expansionMode="single" onExpansionChange={handler}>
            <Item data-testid="item-1">
                <Header as="h3">Header</Header>
                <Content>Content</Content>
            </Item>
            <Item data-testid="item-2">
                <Header as="h3">Header</Header>
                <Content>Content</Content>
            </Item>
            <Item>
                <Header as="h3">Header</Header>
                <Content>Content</Content>
            </Item>
        </Accordion>
    );

    act(() => {
        fireEvent.click(getByTestId("item-1"));
    });

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), ["0"]));

    act(() => {
        fireEvent.click(getByTestId("item-2"));
    });

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), ["1"]));
});

test("when multiple, call onExpansionChange when the expanded tabs change", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(
        <Accordion expansionMode="multiple" onExpansionChange={handler}>
            <Item data-testid="item-1">
                <Header as="h3">Header</Header>
                <Content>Content</Content>
            </Item>
            <Item data-testid="item-2">
                <Header as="h3">Header</Header>
                <Content>Content</Content>
            </Item>
            <Item>
                <Header as="h3">Header</Header>
                <Content>Content</Content>
            </Item>
        </Accordion>
    );

    act(() => {
        fireEvent.click(getByTestId("item-1"));
    });

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), ["0"]));

    act(() => {
        fireEvent.click(getByTestId("item-2"));
    });

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), ["0", "1"]));

    act(() => {
        fireEvent.click(getByTestId("item-2"));
    });

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), ["0"]));
});

// ***** Refs *****

test("accordion ref is a DOM element", async () => {
    const ref = createRef();

    render(
        <Accordion ref={ref}>
            <Item>
                <Header as="h3">Header</Header>
                <Content>Content</Content>
            </Item>
        </Accordion>
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("DIV");
});

test("header ref is a DOM element", async () => {
    const ref = createRef();

    render(
        <Accordion>
            <Item>
                <Header as="h3" ref={ref}>Header</Header>
                <Content>Content</Content>
            </Item>
        </Accordion>
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("H3");
});

test("content ref is a DOM element", async () => {
    const ref = createRef();

    render(
        <Accordion>
            <Item>
                <Header as="h3">Header</Header>
                <Content ref={ref}>Content</Content>
            </Item>
        </Accordion>
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("DIV");
});
