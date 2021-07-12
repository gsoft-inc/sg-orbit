import { Button } from "@react-components/button";
import { Content } from "@react-components/placeholders";
import { Heading } from "@react-components/heading";
import { Popover, PopoverTrigger } from "@react-components/popover";
import { Transition } from "@react-components/transition";
import { act, render, waitFor } from "@testing-library/react";
import { createRef } from "react";
import userEvent from "@testing-library/user-event";

beforeAll(() => {
    Transition.disableAnimation = true;
});

// ***** Behaviors *****

test("when a popover is dismissable, hide the popover on outside click", async () => {
    const { getByTestId, queryByTestId } = render(
        <PopoverTrigger
            dismissable
            data-testid="overlay"
        >
            <Button data-testid="trigger">Trigger</Button>
            <Popover>
                <Heading>Space News</Heading>
                <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Content>
            </Popover>
        </PopoverTrigger>
    );

    act(() => {
        userEvent.click(getByTestId("trigger"));
    });

    await waitFor(() => expect(getByTestId("overlay")).toBeInTheDocument());

    act(() => {
        userEvent.click(document.body);
    });

    await waitFor(() => expect(queryByTestId("overlay")).not.toBeInTheDocument());
});

test("when a popover is not dismissable, do not hide the popover on outside click", async () => {
    const { getByTestId } = render(
        <PopoverTrigger
            dismissable={false}
            data-testid="overlay"
        >
            <Button data-testid="trigger">Trigger</Button>
            <Popover>
                <Heading>Space News</Heading>
                <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Content>
            </Popover>
        </PopoverTrigger>
    );

    act(() => {
        userEvent.click(getByTestId("trigger"));
    });

    await waitFor(() => expect(getByTestId("overlay")).toBeInTheDocument());

    act(() => {
        userEvent.click(document.body);
    });

    await waitFor(() => expect(getByTestId("overlay")).toBeInTheDocument());
});

// ***** Aria *****

test("a popover trigger have an aria-haspopup attribute", async () => {
    const { getByTestId } = render(
        <PopoverTrigger data-testid="overlay">
            <Button data-testid="trigger">Trigger</Button>
            <Popover>
                <Heading>Space News</Heading>
                <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Content>
            </Popover>
        </PopoverTrigger>
    );

    act(() => {
        userEvent.click(getByTestId("trigger"));
    });

    await waitFor(() => expect(getByTestId("overlay")).toBeInTheDocument());

    await waitFor(() => expect(getByTestId("trigger")).toHaveAttribute("aria-haspopup", "dialog"));
});

// ***** Api *****

test("call onOpenChange when the popover appears", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(
        <PopoverTrigger onOpenChange={handler}>
            <Button data-testid="trigger">Trigger</Button>
            <Popover data-testid="popover">
                <Heading>Space News</Heading>
                <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Content>
            </Popover>
        </PopoverTrigger>
    );

    act(() => {
        userEvent.click(getByTestId("trigger"));
    });

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), true));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});

test("call onOpenChange when the popover disappear", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(
        <PopoverTrigger onOpenChange={handler}>
            <Button data-testid="trigger">Trigger</Button>
            <Popover data-testid="popover">
                <Heading>Space News</Heading>
                <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Content>
            </Popover>
        </PopoverTrigger>
    );

    act(() => {
        userEvent.click(getByTestId("trigger"));
    });

    act(() => {
        userEvent.click(document.body);
    });

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), false));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(2));
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef();

    const { getByTestId } = render(
        <PopoverTrigger ref={ref}>
            <Button data-testid="trigger">Trigger</Button>
            <Popover>
                <Heading>Space News</Heading>
                <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Content>
            </Popover>
        </PopoverTrigger>
    );

    act(() => {
        userEvent.click(getByTestId("trigger"));
    });

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("DIV");
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode = null;

    const { getByTestId } = render(
        <PopoverTrigger
            ref={node => {
                refNode = node;
            }}
        >
            <Button data-testid="trigger">Trigger</Button>
            <Popover>
                <Heading>Space News</Heading>
                <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Content>
            </Popover>
        </PopoverTrigger>
    );

    act(() => {
        userEvent.click(getByTestId("trigger"));
    });

    await waitFor(() => expect(refNode).not.toBeNull());

    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("DIV");
});

test("set ref once", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(
        <PopoverTrigger ref={handler}>
            <Button data-testid="trigger">Trigger</Button>
            <Popover>
                <Heading>Space News</Heading>
                <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Content>
            </Popover>
        </PopoverTrigger>
    );

    act(() => {
        userEvent.click(getByTestId("trigger"));
    });

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
