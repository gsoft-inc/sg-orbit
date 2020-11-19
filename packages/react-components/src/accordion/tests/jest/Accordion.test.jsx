import { Accordion } from "@react-components/accordion";
import { Content, Header } from "@react-components/view";
import { Item } from "@react-components/collection";
import { KEYS } from "@react-components/shared";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { createRef } from "react";

// ***** Accessibility *****

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
        fireEvent.keyDown(getByTestId("item-1"), { key: "ArrowDown", keyCode: KEYS.down });
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
        fireEvent.keyDown(getByTestId("item-2"), { key: "ArrowUp", keyCode: KEYS.up });
    });

    await waitFor(() => expect(getByTestId("item-1")).toHaveFocus());
});

// ***** API *****

test("when exclusive, call onChange when the expanded tab change", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(
        <Accordion onChange={handler}>
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

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), [0]));

    act(() => {
        fireEvent.click(getByTestId("item-2"));
    });

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), [1]));
});

test("when multiple, call onChange when the expanded tabs change", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(
        <Accordion multiple onChange={handler}>
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

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), [0]));

    act(() => {
        fireEvent.click(getByTestId("item-2"));
    });

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), [0, 1]));

    act(() => {
        fireEvent.click(getByTestId("item-2"));
    });

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), [0]));
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
    expect(ref.current.tagName).toBe("BUTTON");
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
