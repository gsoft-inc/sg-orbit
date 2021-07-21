import { Button } from "@react-components/button";
import { Content } from "@react-components/placeholders";
import { Dialog, DialogTrigger, useDialogTriggerContext } from "@react-components/dialog";
import { Heading } from "@react-components/typography";
import { Keys } from "@react-components/shared";
import { Transition } from "@react-components/transition";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { createRef, forwardRef } from "react";
import userEvent from "@testing-library/user-event";

beforeAll(() => {
    Transition.disableAnimation = true;
});

// ***** Behaviors *****

test("when dismissable is true, close the dialog on dismiss button click", async () => {
    const { getByLabelText, getByTestId, queryByTestId } = render(
        <DialogTrigger dismissable>
            <Button data-testid="trigger">Trigger</Button>
            <Dialog data-testid="dialog">
                <Heading>Iconic Arecibo Observatory collapses</Heading>
                <Content>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse.</Content>
            </Dialog>
        </DialogTrigger>
    );

    act(() => {
        userEvent.click(getByTestId("trigger"));
    });

    await waitFor(() => expect(queryByTestId("dialog")).toBeInTheDocument());

    act(() => {
        userEvent.click(getByLabelText("Dismiss"));
    });

    await waitFor(() => expect(queryByTestId("dialog")).not.toBeInTheDocument());
});

test("when dismissable is true, close the dialog on outside click", async () => {
    const { getByTestId, queryByTestId } = render(
        <DialogTrigger dismissable>
            <Button data-testid="trigger">Trigger</Button>
            <Dialog data-testid="dialog">
                <Heading>Iconic Arecibo Observatory collapses</Heading>
                <Content>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse.</Content>
            </Dialog>
        </DialogTrigger>
    );

    act(() => {
        userEvent.click(getByTestId("trigger"));
    });

    await waitFor(() => expect(queryByTestId("dialog")).toBeInTheDocument());

    act(() => {
        userEvent.click(document.body);
    });

    await waitFor(() => expect(queryByTestId("dialog")).not.toBeInTheDocument());
});

test("when dismissable is true, close the dialog on esc keypress", async () => {
    const { getByTestId, queryByTestId } = render(
        <DialogTrigger dismissable>
            <Button data-testid="trigger">Trigger</Button>
            <Dialog data-testid="dialog">
                <Heading>Iconic Arecibo Observatory collapses</Heading>
                <Content>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse.</Content>
            </Dialog>
        </DialogTrigger>
    );

    act(() => {
        userEvent.click(getByTestId("trigger"));
    });

    await waitFor(() => expect(queryByTestId("dialog")).toBeInTheDocument());

    act(() => {
        fireEvent.keyDown(getByTestId("dialog"), { key: Keys.esc });
    });

    await waitFor(() => expect(queryByTestId("dialog")).not.toBeInTheDocument());
});

test("when dismissable is false, do not close the dialog on outside click", async () => {
    const { getByTestId, queryByTestId } = render(
        <DialogTrigger dismissable={false}>
            <Button data-testid="trigger">Trigger</Button>
            <Dialog data-testid="dialog">
                <Heading>Iconic Arecibo Observatory collapses</Heading>
                <Content>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse.</Content>
            </Dialog>
        </DialogTrigger>
    );

    act(() => {
        userEvent.click(getByTestId("trigger"));
    });

    await waitFor(() => expect(queryByTestId("dialog")).toBeInTheDocument());

    act(() => {
        userEvent.click(document.body);
    });

    await waitFor(() => expect(queryByTestId("dialog")).toBeInTheDocument());
});

test("when dismissable is false, close the dialog on esc keypress", async () => {
    const { getByTestId, queryByTestId } = render(
        <DialogTrigger dismissable={false}>
            <Button data-testid="trigger">Trigger</Button>
            <Dialog data-testid="dialog">
                <Heading>Iconic Arecibo Observatory collapses</Heading>
                <Content>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse.</Content>
            </Dialog>
        </DialogTrigger>
    );

    act(() => {
        userEvent.click(getByTestId("trigger"));
    });

    await waitFor(() => expect(queryByTestId("dialog")).toBeInTheDocument());

    act(() => {
        fireEvent.keyDown(getByTestId("dialog"), { key: Keys.esc });
    });

    await waitFor(() => expect(queryByTestId("dialog")).not.toBeInTheDocument());
});

test("when the render props close function is called, close the dialog", async () => {
    const { getByTestId, queryByTestId } = render(
        <DialogTrigger>
            {({ close }) => {
                return (
                    <>
                        <Button data-testid="trigger">Trigger</Button>
                        <Dialog data-testid="dialog">
                            <Heading>Iconic Arecibo Observatory collapses</Heading>
                            <Content>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse.</Content>
                            <Button onClick={close} data-testid="close-btn">Close</Button>
                        </Dialog>
                    </>
                );
            }}
        </DialogTrigger>
    );

    act(() => {
        userEvent.click(getByTestId("trigger"));
    });

    await waitFor(() => expect(queryByTestId("dialog")).toBeInTheDocument());

    act(() => {
        userEvent.click(getByTestId("close-btn"));
    });

    await waitFor(() => expect(queryByTestId("dialog")).not.toBeInTheDocument());
});

test("when the context close function is called, close the dialog", async () => {
    const CustomDialog = forwardRef((props, ref) => {
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

    const { getByTestId, queryByTestId } = render(
        <DialogTrigger>
            <Button data-testid="trigger">Trigger</Button>
            <CustomDialog />
        </DialogTrigger>
    );

    act(() => {
        userEvent.click(getByTestId("trigger"));
    });

    await waitFor(() => expect(queryByTestId("dialog")).toBeInTheDocument());

    act(() => {
        userEvent.click(getByTestId("close-btn"));
    });

    await waitFor(() => expect(queryByTestId("dialog")).not.toBeInTheDocument());
});

// ***** Api *****

test("when the dialog open, call onOpenChange", async () => {
    const handler = jest.fn();

    const { getByTestId, queryByTestId } = render(
        <DialogTrigger onOpenChange={handler}>
            <Button data-testid="trigger">Trigger</Button>
            <Dialog data-testid="dialog">
                <Heading>Iconic Arecibo Observatory collapses</Heading>
                <Content>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse.</Content>
            </Dialog>
        </DialogTrigger>
    );

    act(() => {
        userEvent.click(getByTestId("trigger"));
    });

    await waitFor(() => expect(queryByTestId("dialog")).toBeInTheDocument());

    await waitFor(() => expect(handler).toHaveBeenCalledWith(expect.anything(), true));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});

test("call onOpenChange when the dismiss button is clicked", async () => {
    const handler = jest.fn();

    const { getByLabelText, getByTestId, queryByTestId } = render(
        <DialogTrigger onOpenChange={handler}>
            <Button data-testid="trigger">Trigger</Button>
            <Dialog data-testid="dialog">
                <Heading>Iconic Arecibo Observatory collapses</Heading>
                <Content>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse.</Content>
            </Dialog>
        </DialogTrigger>
    );

    act(() => {
        userEvent.click(getByTestId("trigger"));
    });

    await waitFor(() => expect(queryByTestId("dialog")).toBeInTheDocument());

    act(() => {
        userEvent.click(getByLabelText("Dismiss"));
    });

    await waitFor(() => expect(queryByTestId("dialog")).not.toBeInTheDocument());

    await waitFor(() => expect(handler).toHaveBeenCalledWith(expect.anything(), false));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(2));
});

test("call onOpenChange on outside click", async () => {
    const handler = jest.fn();

    const { getByTestId, queryByTestId } = render(
        <DialogTrigger onOpenChange={handler}>
            <Button data-testid="trigger">Trigger</Button>
            <Dialog data-testid="dialog">
                <Heading>Iconic Arecibo Observatory collapses</Heading>
                <Content>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse.</Content>
            </Dialog>
        </DialogTrigger>
    );

    act(() => {
        userEvent.click(getByTestId("trigger"));
    });

    await waitFor(() => expect(queryByTestId("dialog")).toBeInTheDocument());

    act(() => {
        userEvent.click(document.body);
    });

    await waitFor(() => expect(queryByTestId("dialog")).not.toBeInTheDocument());

    await waitFor(() => expect(handler).toHaveBeenCalledWith(expect.anything(), false));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(2));
});

test("call onOpenChange on esc keypress", async () => {
    const handler = jest.fn();

    const { getByTestId, queryByTestId } = render(
        <DialogTrigger onOpenChange={handler}>
            <Button data-testid="trigger">Trigger</Button>
            <Dialog data-testid="dialog">
                <Heading>Iconic Arecibo Observatory collapses</Heading>
                <Content>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse.</Content>
            </Dialog>
        </DialogTrigger>
    );

    act(() => {
        userEvent.click(getByTestId("trigger"));
    });

    await waitFor(() => expect(queryByTestId("dialog")).toBeInTheDocument());

    act(() => {
        fireEvent.keyDown(getByTestId("dialog"), { key: Keys.esc });
    });

    await waitFor(() => expect(queryByTestId("dialog")).not.toBeInTheDocument());

    await waitFor(() => expect(handler).toHaveBeenCalledWith(expect.anything(), false));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(2));
});

test("call onOpenChange when the close function is called", async () => {
    const handler = jest.fn();

    const { getByTestId, queryByTestId } = render(
        <DialogTrigger onOpenChange={handler}>
            {({ close }) => {
                return (
                    <>
                        <Button data-testid="trigger">Trigger</Button>
                        <Dialog data-testid="dialog">
                            <Heading>Iconic Arecibo Observatory collapses</Heading>
                            <Content>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse.</Content>
                            <Button onClick={close} data-testid="close-btn">Close</Button>
                        </Dialog>
                    </>
                );
            }}
        </DialogTrigger>
    );

    act(() => {
        userEvent.click(getByTestId("trigger"));
    });

    await waitFor(() => expect(queryByTestId("dialog")).toBeInTheDocument());

    act(() => {
        userEvent.click(getByTestId("close-btn"));
    });

    await waitFor(() => expect(queryByTestId("dialog")).not.toBeInTheDocument());

    await waitFor(() => expect(handler).toHaveBeenCalledWith(expect.anything(), false));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(2));
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef();

    render(
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
    let refNode = null;

    render(
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

    render(
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
