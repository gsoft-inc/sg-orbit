import { Field, Label } from "@components/field";
import { act, fireEvent, screen, waitFor } from "@testing-library/react";

import { Button } from "@components/button";
import { Item } from "@components/collection";
import { Keys } from "@components/shared";
import { Select } from "@components/select";
import { Transition } from "@components/transition";
import { createRef } from "react";
import { renderWithTheme } from "@jest-utils";
import userEvent from "@testing-library/user-event";

// Using "beforeEach" instead of "beforeAll" because the restore focus tests currently need the fade out animation to works properly.
beforeEach(() => {
    // @ts-ignore
    Transition.disableAnimation = true;
});

// ***** Behaviors *****

test("when a select open and there is no selected option, the first option is focused", async () => {
    renderWithTheme(
        <Select data-testid="select">
            <Item key="earth" data-testid="earth-option">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Select>
    );

    await userEvent.click(screen.getByTestId("select"));

    await waitFor(() => expect(screen.getByTestId("earth-option")).toHaveFocus());
});

test("when a select open and there is a selected option, the selected option is focused", async () => {
    renderWithTheme(
        <Select defaultSelectedKey="mars" data-testid="select">
            <Item key="earth">Earth</Item>
            <Item key="mars" data-testid="mars-option">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Select>
    );

    await userEvent.click(screen.getByTestId("select"));

    await waitFor(() => expect(screen.getByTestId("mars-option")).toHaveFocus());
});

test("when a select open with arrow down keypress and there is no selected option, the first option is focused", async () => {
    renderWithTheme(
        <Select data-testid="select">
            <Item key="earth" data-testid="earth-option">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Select>
    );

    await fireEvent.keyDown(screen.getByTestId("select"), { key: Keys.arrowDown });

    await waitFor(() => expect(screen.getByTestId("earth-option")).toHaveFocus());
});

test("when a select open with arrow down keypress and there is a selected option, the selected option is focused", async () => {
    renderWithTheme(
        <Select defaultSelectedKey="mars" data-testid="select">
            <Item key="earth">Earth</Item>
            <Item key="mars" data-testid="mars-option">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Select>
    );

    await fireEvent.keyDown(screen.getByTestId("select"), { key: Keys.arrowDown });

    await waitFor(() => expect(screen.getByTestId("mars-option")).toHaveFocus());
});

test("when a select open with arrow up keypress and there is no selected option, the last option is focused", async () => {
    renderWithTheme(
        <Select data-testid="select">
            <Item key="earth">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn" data-testid="saturn-option">Saturn</Item>
        </Select>
    );

    await fireEvent.keyDown(screen.getByTestId("select"), { key: Keys.arrowUp });

    await waitFor(() => expect(screen.getByTestId("saturn-option")).toHaveFocus());
});

test("when a select open with arrow up keypress and there is a selected option, the selected option is focused", async () => {
    renderWithTheme(
        <Select defaultSelectedKey="mars" data-testid="select">
            <Item key="earth">Earth</Item>
            <Item key="mars" data-testid="mars-option">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Select>
    );

    await fireEvent.keyDown(screen.getByTestId("select"), { key: Keys.arrowUp });

    await waitFor(() => expect(screen.getByTestId("mars-option")).toHaveFocus());
});

test("selecting an option close the menu", async () => {
    renderWithTheme(
        <Select
            data-testid="select"
            overlayProps={{ "data-testid": "overlay" }}
        >
            <Item key="earth" data-testid="earth-option">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Select>
    );

    await userEvent.click(screen.getByTestId("select"));

    expect(await screen.findByTestId("overlay")).toBeInTheDocument();


    await userEvent.click(screen.getByTestId("earth-option"));

    await waitFor(() => expect(screen.queryByTestId("overlay")).not.toBeInTheDocument());
});

test("selecting an option update the trigger selected value text", async () => {
    renderWithTheme(
        <Select
            data-testid="select"
            overlayProps={{ "data-testid": "overlay" }}
        >
            <Item key="earth" data-testid="earth-option">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Select>
    );

    await userEvent.click(screen.getByTestId("select"));

    expect(await screen.findByTestId("overlay")).toBeInTheDocument();

    await userEvent.click(screen.getByTestId("earth-option"));

    await waitFor(() => expect(screen.getByTestId("select")).toHaveTextContent("Earth"));
});

test("selecting an option focus the trigger", async () => {
    // @ts-ignore
    Transition.disableAnimation = false;

    renderWithTheme(
        <Select
            data-testid="select"
            overlayProps={{ "data-testid": "overlay" }}
        >
            <Item key="earth" data-testid="earth-option">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Select>
    );

    await userEvent.click(screen.getByTestId("select"));

    expect(await screen.findByTestId("overlay")).toBeInTheDocument();

    await userEvent.click(screen.getByTestId("earth-option"));

    await waitFor(() => expect(screen.queryByTestId("select")).toHaveFocus());
});

test("when opened, on tab keydown, close and select the next tabbable element", async () => {
    renderWithTheme(
        <>
            <Button>Previous</Button>
            <Select
                overlayProps={{ "data-testid": "overlay" }}
                data-testid="select"
            >
                <Item key="earth" data-testid="earth-option">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Select>
            <Button data-testid="after">After</Button>
        </>
    );

    await userEvent.click(screen.getByTestId("select"));

    expect(await screen.findByTestId("overlay")).toBeInTheDocument();

    act(() => {
        screen.getByTestId("earth-option").focus();
    });

    await userEvent.tab();

    await waitFor(() => expect(screen.queryByTestId("overlay")).not.toBeInTheDocument());

    await waitFor(() => expect(screen.getByTestId("after")).toHaveFocus());
});

test("when opened, on shift+tab keydown, close and select the previous tabbable element", async () => {
    renderWithTheme(
        <>
            <Button data-testid="previous">Previous</Button>
            <Select
                overlayProps={{ "data-testid": "overlay" }}
                data-testid="select"
            >
                <Item key="earth" data-testid="earth-option">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Select>
            <Button>After</Button>
        </>
    );

    await userEvent.click(screen.getByTestId("select"));

    expect(await screen.findByTestId("overlay")).toBeInTheDocument();

    act(() => {
        screen.getByTestId("earth-option").focus();
    });

    await userEvent.tab({ shift: true });

    await waitFor(() => expect(screen.queryByTestId("overlay")).not.toBeInTheDocument());

    await waitFor(() => expect(screen.getByTestId("previous")).toHaveFocus());
});

test("when in a field, clicking on the field label open the select and focus the first option", async () => {
    renderWithTheme(
        <Field>
            <Label data-testid="label">Select</Label>
            <Select data-testid="select">
                <Item key="earth" data-testid="earth-option">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Select>
        </Field>
    );

    await userEvent.click(screen.getByTestId("label"));

    await waitFor(() => expect(screen.getByTestId("earth-option")).toHaveFocus());
});

test("when autofocus is true, the select trigger is focused on render", async () => {
    renderWithTheme(
        <Select
            autoFocus
            data-testid="select"
        >
            <Item key="earth" data-testid="earth-option">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Select>
    );

    await waitFor(() => expect(screen.getByTestId("select")).toHaveFocus());
});

test("when autofocus is true and the select is disabled, the select trigger is not focused on render", async () => {
    renderWithTheme(
        <Select
            disabled
            autoFocus
            data-testid="select"
        >
            <Item key="earth" data-testid="earth-option">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Select>
    );

    await waitFor(() => expect(screen.getByTestId("select")).not.toHaveFocus());
});

// ***** Aria *****

test("a select have an aria-haspopup attribute", async () => {
    renderWithTheme(
        <Select
            defaultOpen
            data-testid="select"
        >
            <Item key="earth">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Select>
    );

    await waitFor(() => expect(screen.getByTestId("select")).toHaveAttribute("aria-haspopup", "listbox"));
});

test("when an aria-label and an aria-labelledby are provided, do not set aria-labelledby on the trigger", async () => {
    renderWithTheme(
        <Select
            aria-label="Planets"
            aria-labelledby="an-id"
            data-testid="select"
        >
            <Item key="earth">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Select>
    );

    await waitFor(() => expect(screen.getByTestId("select")).not.toHaveAttribute("aria-labelledby"));
});

test("when an id is provided, it is used as the trigger id", async () => {
    renderWithTheme(
        <Select
            id="planets"
            data-testid="select"
        >
            <Item key="earth">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Select>
    );

    await waitFor(() => expect(screen.getByTestId("select")).toHaveAttribute("id", "planets"));
});

test("when no id is provided, generate a trigger id", async () => {
    renderWithTheme(
        <Select data-testid="select">
            <Item key="earth">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Select>
    );

    await waitFor(() => expect(screen.getByTestId("select")).toHaveAttribute("id"));
});

test("when an aria-label and an aria-labelledby are provided, do not set aria-labelledby on the overlay", async () => {
    renderWithTheme(
        <Select
            defaultOpen
            overlayProps={{ "data-testid": "overlay" }}
            aria-label="Planets"
            aria-labelledby="an-id"
        >
            <Item key="earth">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Select>
    );

    await waitFor(() => expect(screen.getByTestId("overlay")).not.toHaveAttribute("aria-labelledby"));
});

test("when no aria-label and no aria-labelledby are provided, set the trigger id as listbox aria-labelledby", async () => {
    renderWithTheme(
        <Select
            id="planets"
            defaultOpen
            overlayProps={{ "data-testid": "overlay" }}
        >
            <Item key="earth">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Select>
    );

    await waitFor(() => expect(screen.getByRole("listbox")).toHaveAttribute("aria-labelledby", "planets"));
});

// ***** Api *****

test("call onOpenChange when the select open", async () => {
    const handler = jest.fn();

    renderWithTheme(
        <Select
            onOpenChange={handler}
            data-testid="select"
        >
            <Item key="earth">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Select>
    );

    await userEvent.click(screen.getByTestId("select"));

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), true));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});

test("call onOpenChange when the select close", async () => {
    const handler = jest.fn();

    renderWithTheme(
        <Select
            onOpenChange={handler}
            defaultOpen
            data-testid="select"
            overlayProps={{ "data-testid": "overlay" }}
        >
            <Item key="earth" data-testid="earth-option">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Select>
    );

    expect(await screen.findByTestId("overlay")).toBeInTheDocument();

    act(() => {
        screen.getByTestId("earth-option").focus();
    });

    await fireEvent.keyDown(screen.getByTestId("earth-option"), { key: Keys.esc });

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), false));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});

test("call onSelectionChange when an option is selected", async () => {
    const handler = jest.fn();

    renderWithTheme(
        <Select
            onSelectionChange={handler}
            defaultOpen
            overlayProps={{ "data-testid": "overlay" }}
        >
            <Item key="earth" data-testid="earth-option">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Select>
    );

    expect(await screen.findByTestId("overlay")).toBeInTheDocument();

    await userEvent.click(screen.getByTestId("earth-option"));

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), "earth"));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef<HTMLElement>();

    renderWithTheme(
        <Select ref={ref}>
            <Item key="earth">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Select>
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("BUTTON");
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode: HTMLElement = null;

    renderWithTheme(
        <Select
            ref={node => {
                refNode = node;
            }}
        >
            <Item key="earth">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Select>
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("BUTTON");
});

test("set ref once", async () => {
    const handler = jest.fn();

    renderWithTheme(
        <Select ref={handler}>
            <Item key="earth">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Select>
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});

test("calling the focus function on the select ref will focus the select trigger", async () => {
    const ref = createRef<HTMLElement>();

    renderWithTheme(
        <Select ref={ref} data-testid="select">
            <Item key="earth">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Select>
    );

    act(() => {
        ref.current.focus();
    });

    await waitFor(() => expect(screen.getByTestId("select")).toHaveFocus());
});

