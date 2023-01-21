import { Dialog, DialogProps, DialogTrigger, useDialogTriggerContext } from "@components/dialog";
import { Heading, Paragraph } from "@components/typography";
import { Radio, RadioGroup } from "@components/radio";
import { act, fireEvent, screen, waitFor } from "@testing-library/react";
import { createRef, forwardRef } from "react";

import { Button } from "@components/button";
import { Content } from "@components/placeholders";
import { Item } from "@components/collection";
import { Keys } from "@components/shared";
import { Select } from "@components/select";
import { Transition } from "@components/transition";
import { renderWithTheme } from "@jest-utils";
import userEvent from "@testing-library/user-event";

beforeAll(() => {
    // @ts-ignore
    Transition.disableAnimation = true;
});

function getRadioInput(element: Element) {
    return element.querySelector("input") as HTMLInputElement;
}

// ***** Behaviors *****

test("when dismissable is true, close the dialog on dismiss button click", async () => {
    renderWithTheme(
        <DialogTrigger dismissable>
            <Button data-testid="trigger">Trigger</Button>
            <Dialog data-testid="dialog">
                <Heading>Iconic Arecibo Observatory collapses</Heading>
                <Content>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse.</Content>
            </Dialog>
        </DialogTrigger>
    );

    await userEvent.click(screen.getByTestId("trigger"));

    await waitFor(() => expect(screen.queryByTestId("dialog")).toHaveFocus());

    await userEvent.click(screen.getByLabelText("Dismiss"));

    await waitFor(() => expect(screen.queryByTestId("dialog")).not.toBeInTheDocument());
});

test("when dismissable is true, close the dialog on outside click", async () => {
    renderWithTheme(
        <DialogTrigger dismissable>
            <Button data-testid="trigger">Trigger</Button>
            <Dialog data-testid="dialog">
                <Heading>Iconic Arecibo Observatory collapses</Heading>
                <Content>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse.</Content>
            </Dialog>
        </DialogTrigger>
    );

    await userEvent.click(screen.getByTestId("trigger"));

    await waitFor(() => expect(screen.queryByTestId("dialog")).toHaveFocus());

    await userEvent.click(document.body);

    await waitFor(() => expect(screen.queryByTestId("dialog")).not.toBeInTheDocument());
});

test("when dismissable is true, close the dialog on esc keypress", async () => {
    renderWithTheme(
        <DialogTrigger dismissable>
            <Button data-testid="trigger">Trigger</Button>
            <Dialog data-testid="dialog">
                <Heading>Iconic Arecibo Observatory collapses</Heading>
                <Content>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse.</Content>
            </Dialog>
        </DialogTrigger>
    );

    await userEvent.click(screen.getByTestId("trigger"));

    await waitFor(() => expect(screen.queryByTestId("dialog")).toHaveFocus());

    await fireEvent.keyDown(screen.getByTestId("dialog"), { key: Keys.esc });

    await waitFor(() => expect(screen.queryByTestId("dialog")).not.toBeInTheDocument());
});

test("when dismissable is false, do not close the dialog on outside click", async () => {
    renderWithTheme(
        <DialogTrigger dismissable={false}>
            <Button data-testid="trigger">Trigger</Button>
            <Dialog data-testid="dialog">
                <Heading>Iconic Arecibo Observatory collapses</Heading>
                <Content>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse.</Content>
            </Dialog>
        </DialogTrigger>
    );

    await userEvent.click(screen.getByTestId("trigger"));

    await waitFor(() => expect(screen.queryByTestId("dialog")).toHaveFocus());

    await userEvent.click(document.body);

    expect(await screen.findByTestId("dialog")).toBeInTheDocument();
});

test("when dismissable is false, do not close the dialog on esc keypress", async () => {
    renderWithTheme(
        <DialogTrigger dismissable={false}>
            <Button data-testid="trigger">Trigger</Button>
            <Dialog data-testid="dialog">
                <Heading>Iconic Arecibo Observatory collapses</Heading>
                <Content>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse.</Content>
            </Dialog>
        </DialogTrigger>
    );

    await userEvent.click(screen.getByTestId("trigger"));

    await waitFor(() => expect(screen.queryByTestId("dialog")).toHaveFocus());

    await fireEvent.keyDown(screen.getByTestId("dialog"), { key: Keys.esc });

    expect(await screen.findByTestId("dialog")).toBeInTheDocument();
});

test("when the context close function is called, close the dialog", async () => {
    const CustomDialog = forwardRef<HTMLElement, Omit<DialogProps, "children">>((props, ref) => {
        const { close } = useDialogTriggerContext();

        return (
            <Dialog
                {...props}
                ref={ref}
                data-testid="dialog"
            >
                <Heading>Iconic Arecibo Observatory collapses</Heading>
                <Content>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse.</Content>
                <Button onClick={close} data-testid="close-btn">Close</Button>
            </Dialog>
        );
    });

    renderWithTheme(
        <DialogTrigger>
            <Button data-testid="trigger">Trigger</Button>
            <CustomDialog />
        </DialogTrigger>
    );

    await userEvent.click(screen.getByTestId("trigger"));

    expect(await screen.findByTestId("close-btn")).toBeInTheDocument();

    await userEvent.click(screen.getByTestId("close-btn"));

    await waitFor(() => expect(screen.queryByTestId("dialog")).not.toBeInTheDocument());
});

// ***** Api *****

test("when the dialog open, call onOpenChange", async () => {
    const handler = jest.fn();

    renderWithTheme(
        <DialogTrigger onOpenChange={handler}>
            <Button data-testid="trigger">Trigger</Button>
            <Dialog data-testid="dialog">
                <Heading>Iconic Arecibo Observatory collapses</Heading>
                <Content>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse.</Content>
            </Dialog>
        </DialogTrigger>
    );

    await userEvent.click(screen.getByTestId("trigger"));

    await waitFor(() => expect(screen.queryByTestId("dialog")).toHaveFocus());

    await waitFor(() => expect(handler).toHaveBeenCalledWith(expect.anything(), true));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});

test("call onOpenChange when the dismiss button is clicked", async () => {
    const handler = jest.fn();

    renderWithTheme(
        <DialogTrigger onOpenChange={handler}>
            <Button data-testid="trigger">Trigger</Button>
            <Dialog data-testid="dialog">
                <Heading>Iconic Arecibo Observatory collapses</Heading>
                <Content>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse.</Content>
            </Dialog>
        </DialogTrigger>
    );

    await userEvent.click(screen.getByTestId("trigger"));

    await waitFor(() => expect(screen.queryByTestId("dialog")).toHaveFocus());

    await userEvent.click(screen.getByLabelText("Dismiss"));

    await waitFor(() => expect(screen.queryByTestId("dialog")).not.toBeInTheDocument());

    await waitFor(() => expect(handler).toHaveBeenCalledWith(expect.anything(), false));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(2));
});

test("call onOpenChange on outside click", async () => {
    const handler = jest.fn();

    renderWithTheme(
        <DialogTrigger onOpenChange={handler}>
            <Button data-testid="trigger">Trigger</Button>
            <Dialog data-testid="dialog">
                <Heading>Iconic Arecibo Observatory collapses</Heading>
                <Content>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse.</Content>
            </Dialog>
        </DialogTrigger>
    );

    await userEvent.click(screen.getByTestId("trigger"));

    await waitFor(() => expect(screen.queryByTestId("dialog")).toHaveFocus());

    await userEvent.click(document.body);

    await waitFor(() => expect(screen.queryByTestId("dialog")).not.toBeInTheDocument());

    await waitFor(() => expect(handler).toHaveBeenCalledWith(expect.anything(), false));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(2));
});

test("call onOpenChange on esc keypress", async () => {
    const handler = jest.fn();

    renderWithTheme(
        <DialogTrigger onOpenChange={handler}>
            <Button data-testid="trigger">Trigger</Button>
            <Dialog data-testid="dialog">
                <Heading>Iconic Arecibo Observatory collapses</Heading>
                <Content>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse.</Content>
            </Dialog>
        </DialogTrigger>
    );

    await userEvent.click(screen.getByTestId("trigger"));

    await waitFor(() => expect(screen.queryByTestId("dialog")).toHaveFocus());

    await fireEvent.keyDown(screen.getByTestId("dialog"), { key: Keys.esc });

    await waitFor(() => expect(screen.queryByTestId("dialog")).not.toBeInTheDocument());

    await waitFor(() => expect(handler).toHaveBeenCalledWith(expect.anything(), false));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(2));
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef<HTMLElement>();

    renderWithTheme(
        <DialogTrigger defaultOpen ref={ref}>
            <Button>Trigger</Button>
            <Dialog>
                <Heading>Iconic Arecibo Observatory collapses</Heading>
                <Content>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse.</Content>
            </Dialog>
        </DialogTrigger>
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    await waitFor(() => expect(ref.current instanceof HTMLElement).toBeTruthy());
    await waitFor(() => expect(ref.current.tagName).toBe("DIV"));
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode: HTMLElement = null;

    renderWithTheme(
        <DialogTrigger
            defaultOpen
            ref={node => {
                refNode = node;
            }}
        >
            <Button>Trigger</Button>
            <Dialog>
                <Heading>Iconic Arecibo Observatory collapses</Heading>
                <Content>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse.</Content>
            </Dialog>
        </DialogTrigger>
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    await waitFor(() => expect(refNode instanceof HTMLElement).toBeTruthy());
    await waitFor(() => expect(refNode.tagName).toBe("DIV"));
});

test("set ref once", async () => {
    const handler = jest.fn();

    renderWithTheme(
        <DialogTrigger defaultOpen ref={handler}>
            <Button>Trigger</Button>
            <Dialog>
                <Heading>Iconic Arecibo Observatory collapses</Heading>
                <Content>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse.</Content>
            </Dialog>
        </DialogTrigger>
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});

// ***** Nested overlay components *****

test("when a dialog contains a select component, focusing an option do not close the dialog", async () => {
    renderWithTheme(
        <DialogTrigger>
            <Button data-testid="trigger">Trigger</Button>
            <Dialog data-testid="dialog">
                <Heading>Iconic Arecibo Observatory collapses</Heading>
                <Content>
                    <Select
                        data-testid="select"
                        overlayProps={{ "data-testid": "select-overlay" }}
                    >
                        <Item key="1">Option 1</Item>
                        <Item data-testid="option-2" key="2">Option 2</Item>
                        <Item key="3">Option 3</Item>
                    </Select>
                    <Paragraph>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse.</Paragraph>
                </Content>
            </Dialog>
        </DialogTrigger>
    );

    await userEvent.click(screen.getByTestId("trigger"));

    expect(await screen.findByTestId("dialog")).toBeInTheDocument();

    await userEvent.click(screen.getByTestId("select"));

    expect(await screen.findByTestId("select-overlay")).toBeInTheDocument();

    act(() => {
        screen.getByTestId("option-2").focus();
    });

    expect(await screen.findByTestId("select-overlay")).toBeInTheDocument();
    expect(await screen.findByTestId("dialog")).toBeInTheDocument();
});

test("when a dialog contains a select component, selecting an option do not close the dialog", async () => {
    renderWithTheme(
        <DialogTrigger>
            <Button data-testid="trigger">Trigger</Button>
            <Dialog data-testid="dialog">
                <Heading>Iconic Arecibo Observatory collapses</Heading>
                <Content>
                    <Select
                        data-testid="select"
                        overlayProps={{ "data-testid": "select-overlay" }}
                    >
                        <Item key="1">Option 1</Item>
                        <Item data-testid="option-2" key="2">Option 2</Item>
                        <Item key="3">Option 3</Item>
                    </Select>
                    <Paragraph>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse.</Paragraph>
                </Content>
            </Dialog>
        </DialogTrigger>
    );

    await userEvent.click(screen.getByTestId("trigger"));

    expect(await screen.findByTestId("dialog")).toBeInTheDocument();

    await userEvent.click(screen.getByTestId("select"));

    expect(await screen.findByTestId("select-overlay")).toBeInTheDocument();

    await userEvent.click(screen.getByTestId("option-2"));

    expect(await screen.findByTestId("dialog")).toBeInTheDocument();
});

test("when a dialog contains a select, closing the select with an esc keydown do not close the dialog", async () => {
    renderWithTheme(
        <DialogTrigger>
            <Button data-testid="trigger">Trigger</Button>
            <Dialog data-testid="dialog">
                <Heading>Iconic Arecibo Observatory collapses</Heading>
                <Content>
                    <Select
                        data-testid="select"
                        overlayProps={{ "data-testid": "select-overlay" }}
                    >
                        <Item key="1">Option 1</Item>
                        <Item data-testid="option-2" key="2">Option 2</Item>
                        <Item key="3">Option 3</Item>
                    </Select>
                    <Paragraph>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse.</Paragraph>
                </Content>
            </Dialog>
        </DialogTrigger>
    );

    await userEvent.click(screen.getByTestId("trigger"));

    expect(await screen.findByTestId("dialog")).toBeInTheDocument();

    await userEvent.click(screen.getByTestId("select"));

    expect(await screen.findByTestId("select-overlay")).toBeInTheDocument();

    act(() => {
        screen.getByTestId("option-2").focus();
    });

    await fireEvent.keyDown(screen.getByTestId("option-2"), { key: Keys.esc });

    await waitFor(() => expect(screen.queryByTestId("select-overlay")).not.toBeInTheDocument());
    expect(await screen.findByTestId("dialog")).toBeInTheDocument();
});

test("when a dialog contains a select, closing the select with a tab keydown select the next focusable element of the dialog", async () => {
    renderWithTheme(
        <DialogTrigger>
            <Button data-testid="trigger">Trigger</Button>
            <Dialog data-testid="dialog">
                <Heading>Iconic Arecibo Observatory collapses</Heading>
                <Content>
                    <Select
                        data-testid="select"
                        overlayProps={{ "data-testid": "select-overlay" }}
                    >
                        <Item key="1">Option 1</Item>
                        <Item data-testid="option-2" key="2">Option 2</Item>
                        <Item key="3">Option 3</Item>
                    </Select>
                    <Button data-testid="button">Button</Button>
                    <Paragraph>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse.</Paragraph>
                </Content>
            </Dialog>
        </DialogTrigger>
    );

    await userEvent.click(screen.getByTestId("trigger"));

    expect(await screen.findByTestId("dialog")).toBeInTheDocument();

    await userEvent.click(screen.getByTestId("select"));

    expect(await screen.findByTestId("select-overlay")).toBeInTheDocument();


    act(() => {
        screen.getByTestId("option-2").focus();
    });

    await fireEvent.keyDown(screen.getByTestId("option-2"), { key: Keys.tab });

    await waitFor(() => expect(screen.queryByTestId("select-overlay")).not.toBeInTheDocument());
    await waitFor(() => expect(screen.queryByTestId("button")).toHaveFocus());
    expect(await screen.findByTestId("dialog")).toBeInTheDocument();
});

test("when a dialog contains a radio group, only the first radio of the group is focused with tabbulation", async () => {
    renderWithTheme(
        <DialogTrigger>
            <Button data-testid="trigger">Trigger</Button>
            <Dialog data-testid="dialog">
                <Heading>Iconic Arecibo Observatory collapses</Heading>
                <Content>
                    <Button data-testid="button-1">Button 1</Button>
                    <RadioGroup>
                        <Radio data-testid="radio-1" value="1">1</Radio>
                        <Radio value="2">2</Radio>
                        <Radio value="3">3</Radio>
                    </RadioGroup>
                    <Button data-testid="button-2">Button 1</Button>
                    <Paragraph>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse.</Paragraph>
                </Content>
            </Dialog>
        </DialogTrigger>
    );

    await userEvent.click(screen.getByTestId("trigger"));

    expect(await screen.findByTestId("dialog")).toBeInTheDocument();

    act(() => {
        screen.getByTestId("button-1").focus();
    });

    await waitFor(() => expect(screen.queryByTestId("button-1")).toHaveFocus());

    await fireEvent.keyDown(screen.getByTestId("button-1"), { key: Keys.tab });

    await waitFor(() => expect(getRadioInput(screen.queryByTestId("radio-1"))).toHaveFocus());

    await fireEvent.keyDown(getRadioInput(screen.getByTestId("radio-1")), { key: Keys.tab });

    await waitFor(() => expect(screen.queryByTestId("button-2")).toHaveFocus());
});
