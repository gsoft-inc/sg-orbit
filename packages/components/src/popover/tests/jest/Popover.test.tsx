import { Content, Footer } from "@components/placeholders";
import { act, waitFor } from "@testing-library/react";

import { Button } from "@components/button";
import { Heading } from "@components/typography";
import { HtmlInput } from "@components/html";
import { Popover } from "@components/popover";
import { TextLink } from "@components/link";
import { createRef } from "react";
import { renderWithTheme } from "@jest-utils";
import userEvent from "@testing-library/user-event";

// ***** Behaviors *****

test("when an element is manually autofocus, keep the focus on this element", async () => {
    const { getByTestId } = renderWithTheme(
        <Popover>
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>
                This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse.
                <HtmlInput type="text" />
            </Content>
            <Button autoFocus data-testid="submit-button">Submit</Button>
        </Popover>
    );

    await waitFor(() => expect(getByTestId("submit-button")).toHaveFocus());
});

test("when no element is focused, autofocus the first focusable element", async () => {
    const { getByTestId } = renderWithTheme(
        <Popover>
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>
                This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse.
                <HtmlInput type="text" data-testid="focusable-element" />
            </Content>
        </Popover>
    );

    await waitFor(() => expect(getByTestId("focusable-element")).toHaveFocus());
});

test("when no element is focused and there are no focusable element, autofocus the popover element", async () => {
    const { getByTestId } = renderWithTheme(
        <Popover data-testid="popover">
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse.</Content>
        </Popover>
    );

    await waitFor(() => expect(getByTestId("popover")).toHaveFocus());
});

test("do not autofocus an anchor element", async () => {
    const { getByTestId } = renderWithTheme(
        <Popover data-testid="popover">
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>
                <TextLink href="https://www.google.com">This year, the National Science Foundation (NSF)</TextLink> said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse.
            </Content>
            <Footer>
                <TextLink href="https://www.google.com">This year, the National Science Foundation (NSF)</TextLink>
            </Footer>
        </Popover>
    );

    await waitFor(() => expect(getByTestId("popover")).toHaveFocus());
});

test("when dismissable, tabbing the last focusable element of the popover will move the focus to the dissmiss button", async () => {
    const { getByTestId, getByLabelText } = renderWithTheme(
        <Popover data-testid="popover">
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>
                This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse.
                <HtmlInput type="text" />
                <HtmlInput type="text" data-testid="last-focusable-element" />
            </Content>
        </Popover>
    );

    act(() => {
        getByTestId("last-focusable-element").focus();
    });

    await act(() => {
        return userEvent.tab();
    });

    await waitFor(() => expect(getByLabelText("Dismiss")));
});

test("when not dismissable, tabbing the last focusable element of the popover will move the focus to the first focusable element", async () => {
    const { getByTestId } = renderWithTheme(
        <Popover dismissable={false} data-testid="popover">
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>
                This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse.
                <HtmlInput type="text" data-testid="first-focusable-element" />
                <HtmlInput type="text" data-testid="last-focusable-element" />
            </Content>
        </Popover>
    );

    act(() => {
        getByTestId("last-focusable-element").focus();
    });

    await act(() => {
        return userEvent.tab();
    });

    await waitFor(() => expect(getByTestId("first-focusable-element")).toHaveFocus());
});

// ***** Aria *****

test("when an id is provided, the popover id attribute match the provided id value.", async () => {
    const { getByTestId } = renderWithTheme(
        <Popover id="foo" data-testid="popover">
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse.</Content>
        </Popover>
    );

    await waitFor(() => expect(getByTestId("popover")).toHaveAttribute("id", "foo"));
});

test("when an aria-label attribute and an aria-labelledby attribute are provided, do not set aria-labelledby on the popover", async () => {
    const { getByTestId } = renderWithTheme(
        <Popover aria-label="Iconic Arecibo Observatory" aria-labelledby="heading-1" data-testid="popover">
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse.</Content>
        </Popover>
    );

    await waitFor(() => expect(getByTestId("popover")).toHaveAttribute("aria-label", "Iconic Arecibo Observatory"));
    await waitFor(() => expect(getByTestId("popover")).not.toHaveAttribute("aria-labelledby"));
});

test("when an aria-labelledby attribute is provided, the popover aria-labelledby attribute value match the provided value", async () => {
    const { getByTestId } = renderWithTheme(
        <Popover aria-labelledby="heading-1" data-testid="popover">
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse.</Content>
        </Popover>
    );

    await waitFor(() => expect(getByTestId("popover")).toHaveAttribute("aria-labelledby", "heading-1"));
});

test("when no aria-label or aria-labelledby attributes are provided, the popover aria-labelledby attribute value match the heading id", async () => {
    const { getByTestId } = renderWithTheme(
        <Popover data-testid="popover">
            <Heading id="heading-1">Iconic Arecibo Observatory collapses</Heading>
            <Content>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse.</Content>
        </Popover>
    );

    await waitFor(() => expect(getByTestId("popover")).toHaveAttribute("aria-labelledby", "heading-1"));
});

// ***** Api *****

test("call onClose when the dismiss button is click", async () => {
    const handler = jest.fn();

    const { getByLabelText } = renderWithTheme(
        <Popover onClose={handler}>
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse.</Content>
        </Popover>
    );

    await act(() => {
        return userEvent.click(getByLabelText("Dismiss"));
    });

    await waitFor(() => expect(handler).toHaveBeenCalledWith(expect.anything()));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef<HTMLElement>();

    renderWithTheme(
        <Popover ref={ref}>
            <Heading>Space News</Heading>
            <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft.</Content>
        </Popover>
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("SECTION");
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode: HTMLElement = null;

    renderWithTheme(
        <Popover
            ref={node => {
                refNode = node;
            }}
        >
            <Heading>Space News</Heading>
            <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft.</Content>
        </Popover>
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("SECTION");
});

test("set ref once", async () => {
    const handler = jest.fn();

    renderWithTheme(
        <Popover ref={handler}>
            <Heading>Space News</Heading>
            <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft.</Content>
        </Popover>
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
