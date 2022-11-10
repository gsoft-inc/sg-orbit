import { Content, Footer, Header } from "@components/placeholders";
import { act, fireEvent, waitFor } from "@testing-library/react";

import { Button } from "@components/button";
import { Dialog } from "@components/dialog";
import { Heading } from "@components/typography";
import { Keys } from "@components/shared";
import { createRef } from "react";
import { renderWithTheme } from "@jest-utils";
import userEvent from "@testing-library/user-event";

// ***** Behaviors *****

test("when an element is manually autofocus, keep the focus on this element", async () => {
    const { getByTestId } = renderWithTheme(
        <Dialog>
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>
                This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse.
                <input type="text" />
            </Content>
            <Button autoFocus data-testid="submit-button">Submit</Button>
        </Dialog>
    );

    await waitFor(() => expect(getByTestId("submit-button")).toHaveFocus());
});

test("when no element is focused, autofocus the first focusable element", async () => {
    const { getByTestId } = renderWithTheme(
        <Dialog>
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>
                This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse.
                <input type="text" data-testid="focusable-element" />
            </Content>
        </Dialog>
    );

    await waitFor(() => expect(getByTestId("focusable-element")).toHaveFocus());
});

test("when no element is focused and there are no focusable element, autofocus the dialog element", async () => {
    const { getByTestId } = renderWithTheme(
        <Dialog data-testid="dialog">
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse.</Content>
        </Dialog>
    );

    await waitFor(() => expect(getByTestId("dialog")).toHaveFocus());
});

test("do not autofocus an anchor element", async () => {
    const { getByTestId } = renderWithTheme(
        <Dialog data-testid="dialog">
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Header>
                <a href="https://www.google.com">This year, the National Science Foundation (NSF)</a>
            </Header>
            <Content>
                <a href="https://www.google.com">This year, the National Science Foundation (NSF)</a> said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse.
            </Content>
            <Footer>
                <a href="https://www.google.com">This year, the National Science Foundation (NSF)</a>
            </Footer>
        </Dialog>
    );

    await waitFor(() => expect(getByTestId("dialog")).toHaveFocus());
});

test("when dismissable is true, tabbing the last focusable element of the dialog will move the focus to the dismiss button", async () => {
    const { getByTestId, getByLabelText } = renderWithTheme(
        <Dialog data-testid="dialog">
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>
                This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse.
                <input type="text" data-testid="focusable-element" />
            </Content>
        </Dialog>
    );

    act(() => {
        getByTestId("focusable-element").focus();
    });

    act(() => {
        userEvent.tab();
    });

    await waitFor(() => expect(getByLabelText("Dismiss")).toHaveFocus());
});

// ***** Aria *****

test("when an id is provided, the dialog id attribute match the provided id value.", async () => {
    const { getByTestId } = renderWithTheme(
        <Dialog id="foo" data-testid="dialog">
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse.</Content>
        </Dialog>
    );

    await waitFor(() => expect(getByTestId("dialog")).toHaveAttribute("id", "foo"));
});

test("when no role are provided role, the dialog role is \"dialog\"", async () => {
    const { getByTestId } = renderWithTheme(
        <Dialog data-testid="dialog">
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse.</Content>
        </Dialog>
    );

    await waitFor(() => expect(getByTestId("dialog")).toHaveAttribute("role", "dialog"));
});

test("when the role \"alertdialog\" is provided, the dialog role is \"alertdialog\"", async () => {
    const { getByTestId } = renderWithTheme(
        <Dialog role="alertdialog" data-testid="dialog">
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse.</Content>
        </Dialog>
    );

    await waitFor(() => expect(getByTestId("dialog")).toHaveAttribute("role", "alertdialog"));
});

test("a dialog aria-modal attribute value is \"true\"", async () => {
    const { getByTestId } = renderWithTheme(
        <Dialog data-testid="dialog">
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse.</Content>
        </Dialog>
    );

    await waitFor(() => expect(getByTestId("dialog")).toHaveAttribute("aria-modal", "true"));
});

test("when an aria-label attribute and an aria-labelledby attribute are provided, do not set aria-labelledby on the dialog", async () => {
    const { getByTestId } = renderWithTheme(
        <Dialog aria-label="Iconic Arecibo Observatory" aria-labelledby="heading-1" data-testid="dialog">
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse.</Content>
        </Dialog>
    );

    await waitFor(() => expect(getByTestId("dialog")).toHaveAttribute("aria-label", "Iconic Arecibo Observatory"));
    await waitFor(() => expect(getByTestId("dialog")).not.toHaveAttribute("aria-labelledby"));
});

test("when an aria-labelledby attribute is provided, the dialog aria-labelledby attribute value match the provided value", async () => {
    const { getByTestId } = renderWithTheme(
        <Dialog aria-labelledby="heading-1" data-testid="dialog">
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse.</Content>
        </Dialog>
    );

    await waitFor(() => expect(getByTestId("dialog")).toHaveAttribute("aria-labelledby", "heading-1"));
});

test("when no aria-label or aria-labelledby attributes are provided, the dialog aria-labelledby attribute value match the heading id", async () => {
    const { getByTestId } = renderWithTheme(
        <Dialog data-testid="dialog">
            <Heading id="heading-1">Iconic Arecibo Observatory collapses</Heading>
            <Content>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse.</Content>
        </Dialog>
    );

    await waitFor(() => expect(getByTestId("dialog")).toHaveAttribute("aria-labelledby", "heading-1"));
});

test("when an aria-describedby attribute is provided, the dialog aria-describedby attribute value match the provided value", async () => {
    const { getByTestId } = renderWithTheme(
        <Dialog aria-describedby="content-1" data-testid="dialog">
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse.</Content>
        </Dialog>
    );

    await waitFor(() => expect(getByTestId("dialog")).toHaveAttribute("aria-describedby", "content-1"));
});

test("when no aria-describedby attributes is provided, the dialog aria-describedby attribute value match the content id", async () => {
    const { getByTestId } = renderWithTheme(
        <Dialog data-testid="dialog">
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content id="content-1">This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse.</Content>
        </Dialog>
    );

    await waitFor(() => expect(getByTestId("dialog")).toHaveAttribute("aria-describedby", "content-1"));
});

// ***** Api *****

test("call onClose when the dismiss button is clicked", async () => {
    const handler = jest.fn();

    const { getByLabelText } = renderWithTheme(
        <Dialog onClose={handler}>
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse.</Content>
        </Dialog>
    );

    act(() => {
        userEvent.click(getByLabelText("Dismiss"));
    });

    await waitFor(() => expect(handler).toHaveBeenCalledWith(expect.anything()));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});

test("call onClose on esc keypress", async () => {
    const handler = jest.fn();

    const { getByTestId } = renderWithTheme(
        <Dialog onClose={handler} data-testid="dialog">
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse.</Content>
        </Dialog>
    );

    act(() => {
        fireEvent.keyDown(getByTestId("dialog"), { key: Keys.esc });
    });

    await waitFor(() => expect(handler).toHaveBeenCalledWith(expect.anything()));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});

test("call onClose on outside click", async () => {
    const handler = jest.fn();

    renderWithTheme(
        <Dialog onClose={handler}>
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse.</Content>
        </Dialog>
    );

    act(() => {
        userEvent.click(document.body);
    });

    await waitFor(() => expect(handler).toHaveBeenCalledWith(expect.anything()));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});

// ***** Ref *****

test("ref is a DOM element", async () => {
    const ref = createRef<HTMLElement>();

    renderWithTheme(
        <Dialog ref={ref}>
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse.</Content>
        </Dialog>
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    await waitFor(() => expect(ref.current instanceof HTMLElement).toBeTruthy());
    await waitFor(() => expect(ref.current.tagName).toBe("SECTION"));
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode: HTMLElement = null;

    renderWithTheme(
        <Dialog
            ref={node => {
                refNode = node;
            }}
        >
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse.</Content>
        </Dialog>
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    await waitFor(() => expect(refNode instanceof HTMLElement).toBeTruthy());
    await waitFor(() => expect(refNode.tagName).toBe("SECTION"));
});

test("set ref once", async () => {
    const handler = jest.fn();

    renderWithTheme(
        <Dialog ref={handler}>
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse.</Content>
        </Dialog>
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});



