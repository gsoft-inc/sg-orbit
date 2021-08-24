import { Button } from "@react-components/button";
import { Content, Footer } from "@react-components/placeholders";
import { Heading } from "@react-components/typography";
import { Popover } from "@react-components/popover";
import { act, render, waitFor } from "@testing-library/react";
import { createRef } from "react";
import userEvent from "@testing-library/user-event";

// ***** Behaviors *****

test("when an element is manually autofocus, keep the focus on this element", async () => {
    const { getByTestId } = render(
        <Popover>
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>
                This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse.
                <input type="text" />
            </Content>
            <Button autoFocus data-testid="submit-button">Submit</Button>
        </Popover>
    );

    await waitFor(() => expect(getByTestId("submit-button")).toHaveFocus());
});

test("when no element is focused, autofocus the first focusable element", async () => {
    const { getByTestId } = render(
        <Popover>
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>
                This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse.
                <input type="text" data-testid="focusable-element" />
            </Content>
        </Popover>
    );

    await waitFor(() => expect(getByTestId("focusable-element")).toHaveFocus());
});

test("when no element is focused and there are no focusable element, autofocus the popover element", async () => {
    const { getByTestId } = render(
        <Popover data-testid="popover">
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse.</Content>
        </Popover>
    );

    await waitFor(() => expect(getByTestId("popover")).toHaveFocus());
});

test("do not autofocus an anchor element", async () => {
    const { getByTestId } = render(
        <Popover data-testid="popover">
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>
                <a href="https://www.google.com">This year, the National Science Foundation (NSF)</a> said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse.
            </Content>
            <Footer>
                <a href="https://www.google.com">This year, the National Science Foundation (NSF)</a>
            </Footer>
        </Popover>
    );

    await waitFor(() => expect(getByTestId("popover")).toHaveFocus());
});

test("tabbing the last focusable element of the popover will move the focus to the popover element", async () => {
    const { getByTestId } = render(
        <Popover data-testid="popover">
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>
                This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse.
                <input type="text" data-testid="focusable-element" />
            </Content>
        </Popover>
    );

    act(() => {
        getByTestId("focusable-element").focus();
    });

    act(() => {
        userEvent.tab();
    });

    await waitFor(() => expect(getByTestId("popover")).toHaveFocus());
});

// ***** Aria *****

test("when an id is provided, the popover id attribute match the provided id value.", async () => {
    const { getByTestId } = render(
        <Popover id="foo" data-testid="popover">
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse.</Content>
        </Popover>
    );

    await waitFor(() => expect(getByTestId("popover")).toHaveAttribute("id", "foo"));
});

test("when an aria-label attribute and an aria-labelledby attribute are provided, do not set aria-labelledby on the popover", async () => {
    const { getByTestId } = render(
        <Popover aria-label="Iconic Arecibo Observatory" aria-labelledby="heading-1" data-testid="popover">
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse.</Content>
        </Popover>
    );

    await waitFor(() => expect(getByTestId("popover")).toHaveAttribute("aria-label", "Iconic Arecibo Observatory"));
    await waitFor(() => expect(getByTestId("popover")).not.toHaveAttribute("aria-labelledby"));
});

test("when an aria-labelledby attribute is provided, the popover aria-labelledby attribute value match the provided value", async () => {
    const { getByTestId } = render(
        <Popover aria-labelledby="heading-1" data-testid="popover">
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse.</Content>
        </Popover>
    );

    await waitFor(() => expect(getByTestId("popover")).toHaveAttribute("aria-labelledby", "heading-1"));
});

test("when no aria-label or aria-labelledby attributes are provided, the popover aria-labelledby attribute value match the heading id", async () => {
    const { getByTestId } = render(
        <Popover data-testid="popover">
            <Heading id="heading-1">Iconic Arecibo Observatory collapses</Heading>
            <Content>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse.</Content>
        </Popover>
    );

    await waitFor(() => expect(getByTestId("popover")).toHaveAttribute("aria-labelledby", "heading-1"));
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef<HTMLElement>();

    render(
        <Popover ref={ref}>
            <Heading>Space News</Heading>
            <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Content>
        </Popover>
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("SECTION");
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode: HTMLElement = null;

    render(
        <Popover
            ref={node => {
                refNode = node;
            }}
        >
            <Heading>Space News</Heading>
            <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Content>
        </Popover>
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("SECTION");
});

test("set ref once", async () => {
    const handler = jest.fn();

    render(
        <Popover ref={handler}>
            <Heading>Space News</Heading>
            <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Content>
        </Popover>
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
