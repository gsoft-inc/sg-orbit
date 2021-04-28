import { Button } from "@react-components/button";
import { Item } from "@react-components/collection";
import { Keys } from "@react-components/shared";
import { Menu, MenuTrigger } from "@react-components/menu";
import { Transition } from "@react-components/transition";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { createRef } from "react";
import userEvent from "@utils/userEvent";

beforeAll(() => {
    Transition.disableAnimation = true;
});

// ***** Behaviors *****

test("when a menu open with arrow down keypress and there is no selected item, the first item is focused", async () => {
    const { getByTestId } = render(
        <MenuTrigger>
            <Button data-testid="trigger">Trigger</Button>
            <Menu>
                <Item key="earth" data-testid="earth-item">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Menu>
        </MenuTrigger>
    );

    act(() => {
        fireEvent.keyDown(getByTestId("trigger"), { key: Keys.arrowDown });
    });

    await waitFor(() => expect(getByTestId("earth-item")).toHaveFocus());
});

test("when a menu open with arrow down keypress and there is a selected item, the selected item is focused", async () => {
    const { getByTestId } = render(
        <MenuTrigger>
            <Button data-testid="trigger">Trigger</Button>
            <Menu defaultSelectedKeys={["mars"]} selectionMode="single">
                <Item key="earth">Earth</Item>
                <Item key="mars" data-testid="mars-item">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Menu>
        </MenuTrigger>
    );

    act(() => {
        fireEvent.keyDown(getByTestId("trigger"), { key: Keys.arrowDown });
    });

    await waitFor(() => expect(getByTestId("mars-item")).toHaveFocus());
});

test("when a menu open with arrow up keypress and there is no selected item, the first item is focused", async () => {
    const { getByTestId } = render(
        <MenuTrigger>
            <Button data-testid="trigger">Trigger</Button>
            <Menu>
                <Item key="earth">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn" data-testid="saturn-item">Saturn</Item>
            </Menu>
        </MenuTrigger>
    );

    act(() => {
        fireEvent.keyDown(getByTestId("trigger"), { key: Keys.arrowUp });
    });

    await waitFor(() => expect(getByTestId("saturn-item")).toHaveFocus());
});

test("when a menu open with arrow up keypress and there is a selected item, the selected item is focused", async () => {
    const { getByTestId } = render(
        <MenuTrigger>
            <Button data-testid="trigger">Trigger</Button>
            <Menu defaultSelectedKeys={["mars"]} selectionMode="single">
                <Item key="earth">Earth</Item>
                <Item key="mars" data-testid="mars-item">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Menu>
        </MenuTrigger>
    );

    act(() => {
        fireEvent.keyDown(getByTestId("trigger"), { key: Keys.arrowUp });
    });

    await waitFor(() => expect(getByTestId("mars-item")).toHaveFocus());
});

test("when selectionMode is \"none\", selecting an item close the menu", async () => {
    const { getByTestId, queryByTestId } = render(
        <MenuTrigger defaultOpen>
            <Button>Trigger</Button>
            <Menu selectionMode="none" data-testid="menu">
                <Item key="earth" data-testid="earth-item">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Menu>
        </MenuTrigger>
    );

    act(() => {
        userEvent.click(getByTestId("earth-item"));
    });

    await waitFor(() => expect(queryByTestId("menu")).not.toBeInTheDocument());
});

test("when selectionMode is \"single\", selecting an item close the menu", async () => {
    const { getByTestId, queryByTestId } = render(
        <MenuTrigger defaultOpen>
            <Button>Trigger</Button>
            <Menu selectionMode="single" data-testid="menu">
                <Item key="earth" data-testid="earth-item">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Menu>
        </MenuTrigger>
    );

    act(() => {
        userEvent.click(getByTestId("earth-item"));
    });

    await waitFor(() => expect(queryByTestId("menu")).not.toBeInTheDocument());
});

test("when selectionMode is \"multiple\", selecting an item close the menu", async () => {
    const { getByTestId, queryByTestId } = render(
        <MenuTrigger defaultOpen>
            <Button>Trigger</Button>
            <Menu selectionMode="single" data-testid="menu">
                <Item key="earth" data-testid="earth-item">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Menu>
        </MenuTrigger>
    );

    act(() => {
        userEvent.click(getByTestId("earth-item"));
    });

    await waitFor(() => expect(queryByTestId("menu")).not.toBeInTheDocument());
});

test("when closeOnSelect is false, selecting an item doesn't close the menu", async () => {
    const { getByTestId } = render(
        <MenuTrigger closeOnSelect={false} defaultOpen>
            <Button>Trigger</Button>
            <Menu data-testid="menu">
                <Item key="earth" data-testid="earth-item">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Menu>
        </MenuTrigger>
    );

    act(() => {
        userEvent.click(getByTestId("earth-item"));
    });

    await waitFor(() => expect(getByTestId("menu")).toBeInTheDocument());
});

test("when open, on tab keydown, close and select the next tabbable element", async () => {
    const { getByTestId, queryByTestId } = render(
        <>
            <Button>Previous</Button>
            <MenuTrigger>
                <Button data-testid="trigger">Trigger</Button>
                <Menu data-testid="menu">
                    <Item key="earth" data-testid="earth-item">Earth</Item>
                    <Item key="mars">Mars</Item>
                    <Item key="saturn">Saturn</Item>
                </Menu>
            </MenuTrigger>
            <Button data-testid="after">After</Button>
        </>
    );

    act(() => {
        userEvent.click(getByTestId("trigger"));
    });

    await waitFor(() => expect(getByTestId("menu")).toBeInTheDocument());

    act(() => {
        getByTestId("earth-item").focus();
    });

    act(() => {
        fireEvent.keyDown(getByTestId("earth-item"), { key: Keys.tab });
    });

    await waitFor(() => expect(queryByTestId("menu")).not.toBeInTheDocument());

    await waitFor(() => expect(getByTestId("after")).toHaveFocus());
});

test("when open, on shift+tab keydown close and select the previous tabbable element", async () => {
    const { getByTestId, queryByTestId } = render(
        <>
            <Button data-testid="previous">Previous</Button>
            <MenuTrigger>
                <Button data-testid="trigger">Trigger</Button>
                <Menu data-testid="menu">
                    <Item key="earth" data-testid="earth-item">Earth</Item>
                    <Item key="mars">Mars</Item>
                    <Item key="saturn">Saturn</Item>
                </Menu>
            </MenuTrigger>
            <Button>After</Button>
        </>
    );

    act(() => {
        userEvent.click(getByTestId("trigger"));
    });

    await waitFor(() => expect(getByTestId("menu")).toBeInTheDocument());

    act(() => {
        getByTestId("earth-item").focus();
    });

    act(() => {
        fireEvent.keyDown(getByTestId("earth-item"), { key: Keys.tab, shiftKey: true });
    });

    await waitFor(() => expect(queryByTestId("menu")).not.toBeInTheDocument());

    await waitFor(() => expect(getByTestId("previous")).toHaveFocus());
});

// ***** Aria *****

test("when a trigger have an aria-labelledby attribute, the menu aria-labelledby match the trigger aria-labelledby attribute", async () => {
    const { getByTestId } = render(
        <MenuTrigger defaultOpen>
            <Button aria-labelledby="trigger-label">Trigger</Button>
            <Menu data-testid="menu">
                <Item key="earth">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Menu>
        </MenuTrigger>
    );

    await waitFor(() => expect(getByTestId("menu")).toHaveAttribute("aria-labelledby", "trigger-label"));
});

test("when a trigger doesn't have a aria-labelledby attribute, the menu aria-labelledby match the trigger id", async () => {
    const { getByTestId } = render(
        <MenuTrigger defaultOpen>
            <Button id="trigger-id">Trigger</Button>
            <Menu data-testid="menu">
                <Item key="earth">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Menu>
        </MenuTrigger>
    );

    await waitFor(() => expect(getByTestId("menu")).toHaveAttribute("aria-labelledby", "trigger-id"));
});

test("when a trigger have a aria-describedby attribute, the menu aria-describedby match the trigger aria-describedby attribute", async () => {
    const { getByTestId } = render(
        <MenuTrigger defaultOpen>
            <Button aria-describedby="trigger-description">Trigger</Button>
            <Menu data-testid="menu">
                <Item key="earth">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Menu>
        </MenuTrigger>
    );

    await waitFor(() => expect(getByTestId("menu")).toHaveAttribute("aria-describedby", "trigger-description"));
});

test("when a trigger have an id, use this id for the trigger", async () => {
    const { getByTestId } = render(
        <MenuTrigger>
            <Button id="trigger-id" data-testid="trigger">Trigger</Button>
            <Menu>
                <Item key="earth">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Menu>
        </MenuTrigger>
    );

    await waitFor(() => expect(getByTestId("trigger")).toHaveAttribute("id", "trigger-id"));
});

test("when a trigger doesn't have an id, a trigger id is autogenerated", async () => {
    const { getByTestId } = render(
        <MenuTrigger>
            <Button id="trigger-id" data-testid="trigger">Trigger</Button>
            <Menu>
                <Item key="earth">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Menu>
        </MenuTrigger>
    );

    await waitFor(() => expect(getByTestId("trigger")).toHaveAttribute("id"));
});

// ***** Api *****

test("call onOpenChange when the menu open", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(
        <MenuTrigger onOpenChange={handler}>
            <Button data-testid="trigger">Trigger</Button>
            <Menu data-testid="menu">
                <Item key="earth">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Menu>
        </MenuTrigger>
    );

    act(() => {
        userEvent.click(getByTestId("trigger"));
    });

    // Required otherwise a warning is emitted because the test complete before the open state is updated.
    await waitFor(() => expect(getByTestId("menu")).toBeInTheDocument());

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), true);
});

test("call onOpenChange when the menu close", async () => {
    const handler = jest.fn();

    const { getByTestId, queryByTestId } = render(
        <MenuTrigger
            onOpenChange={handler}
            defaultOpen
        >
            <Button data-testid="trigger">Trigger</Button>
            <Menu data-testid="menu">
                <Item key="earth">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Menu>
        </MenuTrigger>
    );

    act(() => {
        getByTestId("menu").focus();
    });

    act(() => {
        fireEvent.keyDown(getByTestId("menu"), { key: Keys.esc });
    });

    // Required otherwise a warning is emitted because the test complete before the open state is updated.
    await waitFor(() => expect(queryByTestId("menu")).not.toBeInTheDocument());

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), false);
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef();

    render(
        <MenuTrigger defaultOpen ref={ref}>
            <Button>Trigger</Button>
            <Menu>
                <Item key="earth">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Menu>
        </MenuTrigger>
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("DIV");
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode = null;

    render(
        <MenuTrigger
            defaultOpen
            ref={node => {
                refNode = node;
            }}
        >
            <Button>Trigger</Button>
            <Menu>
                <Item key="earth">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Menu>
        </MenuTrigger>
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("DIV");
});

test("set ref once", async () => {
    const handler = jest.fn();

    render(
        <MenuTrigger
            defaultOpen
            ref={handler}
        >
            <Button>Trigger</Button>
            <Menu>
                <Item key="earth">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Menu>
        </MenuTrigger>
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});

