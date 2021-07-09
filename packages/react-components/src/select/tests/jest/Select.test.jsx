import { Button } from "@react-components/button";
import { Field, Label } from "@react-components/field";
import { Item } from "@react-components/collection";
import { Keys } from "@react-components/shared";
import { Select } from "@react-components/select";
import { Transition } from "@react-components/transition";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { createRef } from "react";
import userEvent from "@testing-library/user-event";

beforeAll(() => {
    Transition.disableAnimation = true;
});

// ***** Behaviors *****

test("when a select open and there is no selected option, the first option is focused", async () => {
    const { getByTestId } = render(
        <Select data-testid="select">
            <Item key="earth" data-testid="earth-option">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Select>
    );

    act(() => {
        userEvent.click(getByTestId("select"));
    });

    await waitFor(() => expect(getByTestId("earth-option")).toHaveFocus());
});

test("when a select open and there is a selected option, the selected option is focused", async () => {
    const { getByTestId } = render(
        <Select defaultSelectedKey="mars" data-testid="select">
            <Item key="earth">Earth</Item>
            <Item key="mars" data-testid="mars-option">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Select>
    );

    act(() => {
        userEvent.click(getByTestId("select"));
    });

    await waitFor(() => expect(getByTestId("mars-option")).toHaveFocus());
});

test("when a select open with arrow down keypress and there is no selected option, the first option is focused", async () => {
    const { getByTestId } = render(
        <Select data-testid="select">
            <Item key="earth" data-testid="earth-option">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Select>
    );

    act(() => {
        fireEvent.keyDown(getByTestId("select"), { key: Keys.arrowDown });
    });

    await waitFor(() => expect(getByTestId("earth-option")).toHaveFocus());
});

test("when a select open with arrow down keypress and there is a selected option, the selected option is focused", async () => {
    const { getByTestId } = render(
        <Select defaultSelectedKey="mars" data-testid="select">
            <Item key="earth">Earth</Item>
            <Item key="mars" data-testid="mars-option">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Select>
    );

    act(() => {
        fireEvent.keyDown(getByTestId("select"), { key: Keys.arrowDown });
    });

    await waitFor(() => expect(getByTestId("mars-option")).toHaveFocus());
});

test("when a select open with arrow up keypress and there is no selected option, the last option is focused", async () => {
    const { getByTestId } = render(
        <Select data-testid="select">
            <Item key="earth">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn" data-testid="saturn-option">Saturn</Item>
        </Select>
    );

    act(() => {
        fireEvent.keyDown(getByTestId("select"), { key: Keys.arrowUp });
    });

    await waitFor(() => expect(getByTestId("saturn-option")).toHaveFocus());
});

test("when a select open with arrow up keypress and there is a selected option, the selected option is focused", async () => {
    const { getByTestId } = render(
        <Select defaultSelectedKey="mars" data-testid="select">
            <Item key="earth">Earth</Item>
            <Item key="mars" data-testid="mars-option">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Select>
    );

    act(() => {
        fireEvent.keyDown(getByTestId("select"), { key: Keys.arrowUp });
    });

    await waitFor(() => expect(getByTestId("mars-option")).toHaveFocus());
});

test("selecting an option close the menu", async () => {
    const { getByTestId, queryByTestId } = render(
        <Select
            data-testid="select"
            overlayProps={{ "data-testid": "overlay" }}
        >
            <Item key="earth" data-testid="earth-option">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Select>
    );

    act(() => {
        userEvent.click(getByTestId("select"));
    });

    act(() => {
        userEvent.click(getByTestId("earth-option"));
    });

    await waitFor(() => expect(queryByTestId("overlay")).not.toBeInTheDocument());
});

test("selecting an option update the trigger selected value text", async () => {
    const { getByTestId } = render(
        <Select data-testid="select">
            <Item key="earth" data-testid="earth-option">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Select>
    );

    act(() => {
        userEvent.click(getByTestId("select"));
    });

    act(() => {
        userEvent.click(getByTestId("earth-option"));
    });

    await waitFor(() => expect(getByTestId("select")).toHaveTextContent("Earth"));
});

test("selecting an option focus the trigger", async () => {
    Transition.disableAnimation = false;

    const { getByTestId, queryByTestId } = render(
        <Select
            overlayProps={{ "data-testid": "overlay" }}
            data-testid="select"
        >
            <Item key="earth" data-testid="earth-option">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Select>
    );

    act(() => {
        userEvent.click(getByTestId("select"));
    });

    act(() => {
        userEvent.click(getByTestId("earth-option"));
    });

    await waitFor(() => expect(queryByTestId("select")).toHaveFocus());
});

test("when opened, on tab keydown, close and select the next tabbable element", async () => {
    const { getByTestId, queryByTestId } = render(
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

    act(() => {
        userEvent.click(getByTestId("select"));
    });

    await waitFor(() => expect(getByTestId("overlay")).toBeInTheDocument());

    act(() => {
        getByTestId("earth-option").focus();
    });

    act(() => {
        userEvent.tab();
    });

    await waitFor(() => expect(queryByTestId("overlay")).not.toBeInTheDocument());

    await waitFor(() => expect(getByTestId("after")).toHaveFocus());
});

test("when opened, on shift+tab keydown, close and select the previous tabbable element", async () => {
    const { getByTestId, queryByTestId } = render(
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

    act(() => {
        userEvent.click(getByTestId("select"));
    });

    await waitFor(() => expect(getByTestId("overlay")).toBeInTheDocument());

    act(() => {
        getByTestId("earth-option").focus();
    });

    act(() => {
        userEvent.tab({ shift: true });
    });

    await waitFor(() => expect(queryByTestId("overlay")).not.toBeInTheDocument());

    await waitFor(() => expect(getByTestId("previous")).toHaveFocus());
});

test("when in a field, clicking on the field label open the select and focus the first option", async () => {
    const { getByTestId } = render(
        <Field>
            <Label data-testid="label">Select</Label>
            <Select
                overlayProps={{ "data-testid": "overlay" }}
                data-testid="select"
            >
                <Item key="earth" data-testid="earth-option">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Select>
        </Field>
    );

    act(() => {
        userEvent.click(getByTestId("label"));
    });

    await waitFor(() => expect(getByTestId("overlay")).toBeInTheDocument());

    await waitFor(() => expect(getByTestId("earth-option")).toHaveFocus());
});

test("when autofocus is true, the select trigger is focused on render", async () => {
    const { getByTestId } = render(
        <Select
            autoFocus
            data-testid="select"
        >
            <Item key="earth" data-testid="earth-option">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Select>
    );

    await waitFor(() => expect(getByTestId("select")).toHaveFocus());
});

test("when autofocus is true and the select is disabled, the select trigger is not focused on render", async () => {
    const { getByTestId } = render(
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

    await waitFor(() => expect(getByTestId("select")).not.toHaveFocus());
});

// ***** Aria *****

test("a select have an aria-haspopup attribute", async () => {
    const { getByTestId } = render(
        <Select
            defaultOpen
            data-testid="select"
        >
            <Item key="earth">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Select>
    );

    await waitFor(() => expect(getByTestId("select")).toHaveAttribute("aria-haspopup", "listbox"));
});

test("when an aria-label and an aria-labelledby are provided, do not set aria-labelledby on the trigger", async () => {
    const { getByTestId } = render(
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

    await waitFor(() => expect(getByTestId("select")).not.toHaveAttribute("aria-labelledby"));
});

test("when an id is provided, it is used as the trigger id", async () => {
    const { getByTestId } = render(
        <Select
            id="planets"
            data-testid="select"
        >
            <Item key="earth">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Select>
    );

    await waitFor(() => expect(getByTestId("select")).toHaveAttribute("id", "planets"));
});

test("when no id is provided, generate a trigger id", async () => {
    const { getByTestId } = render(
        <Select data-testid="select">
            <Item key="earth">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Select>
    );

    await waitFor(() => expect(getByTestId("select")).toHaveAttribute("id"));
});

test("when an aria-label and an aria-labelledby are provided, do not set aria-labelledby on the overlay", async () => {
    const { getByTestId } = render(
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

    await waitFor(() => expect(getByTestId("overlay")).not.toHaveAttribute("aria-labelledby"));
});

test("when no aria-label and no aria-labelledby are provided, set the trigger id as listbox aria-labelledby", async () => {
    const { getByTestId } = render(
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

    await waitFor(() => expect(getByTestId("overlay").querySelector(":scope > .o-ui-listbox")).toHaveAttribute("aria-labelledby", "planets"));
});

// ***** Api *****

test("call onOpenChange when the select open", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(
        <Select
            onOpenChange={handler}
            overlayProps={{ "data-testid": "overlay" }}
            data-testid="select"
        >
            <Item key="earth">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Select>
    );

    act(() => {
        userEvent.click(getByTestId("select"));
    });

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), true));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});

test("call onOpenChange when the select close", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(
        <Select
            onOpenChange={handler}
            defaultOpen
            overlayProps={{ "data-testid": "overlay" }}
            data-testid="select"
        >
            <Item key="earth">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Select>
    );

    act(() => {
        getByTestId("overlay").focus();
    });

    act(() => {
        fireEvent.keyDown(getByTestId("overlay"), { key: Keys.esc });
    });

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), false));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});

test("call onSelectionChange when an option is selected", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(
        <Select
            onSelectionChange={handler}
            defaultOpen
        >
            <Item key="earth" data-testid="earth-option">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Select>
    );

    act(() => {
        userEvent.click(getByTestId("earth-option"));
    });

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), "earth"));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef();

    render(
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
    let refNode = null;

    render(
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

    render(
        <Select ref={handler}>
            <Item key="earth">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Select>
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});

test("calling the focus function on the select ref will focus the select trigger", async () => {
    const ref = createRef();

    const { getByTestId } = render(
        <Select ref={ref} data-testid="select">
            <Item key="earth">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Select>
    );

    act(() => {
        ref.current.focus();
    });

    await waitFor(() => expect(getByTestId("select")).toHaveFocus());
});

