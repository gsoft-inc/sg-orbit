import { Item, Section } from "@react-components/collection";
import { Keys } from "@react-components/shared";
import { Listbox } from "@react-components/listbox";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { createRef } from "react";

// ***** Behaviors *****

/*
selectionMode: none
    - spacebar keypress don't toggle option selection
    - enter keypress don't toggle option selection
    - click don't toggle option selection

selectionMode: single
    - spacebar keypress toggle option selection
    - enter keypress toggle option selection
    - click toggle option selection

selectionMode: multiple
    - spacebar keypress toggle option selection
    - enter keypress toggle option selection
    - click toggle option selection
    - shift + down arrow keypress moves focus to and toggles the selected state of the next option
    - shift + up arrow keypress moves focus to and toggles the selected state of the previous option
    - shift + space keypress selects contiguous options from the most recently selected item to the focused item.

all:
    - when focusOnHover is true, hovering an option will move the focus to that option
    - when useVirtualFocus is true, an option will render a focus class instead of actually receiving the focus
*/

test("when a listbox have no selection, the first option is tabbable", async () => {
    const { getByTestId } = render(
        <Listbox aria-label="Planets">
            <Item key="earth" data-testid="earth-option">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Listbox>
    );

    await waitFor(() => expect(getByTestId("earth-option")).toHaveAttribute("tabindex", "0"));
});

test("when a listbox with sections have no selection, the first option is tabbable", async () => {
    const { getByTestId } = render(
        <Listbox aria-label="Planets">
            <Section title="Visited">
                <Item key="earth" data-testid="earth-option">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Section>
            <Section title="Not Visited">
                <Item key="jupiter">Jupiter</Item>
                <Item key="mercury">Mercury</Item>
                <Item key="neptune">Neptune</Item>
                <Item key="uranus">Uranus</Item>
            </Section>
        </Listbox>
    );

    await waitFor(() => expect(getByTestId("earth-option")).toHaveAttribute("tabindex", "0"));
});

test("a disabled option is not tabbable", async () => {
    const { getByTestId } = render(
        <Listbox aria-label="Planets">
            <Item disabled key="earth" data-testid="earth-option">Earth</Item>
            <Item key="jupiter" data-testid="jupiter-option">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Listbox>
    );

    await waitFor(() => expect(getByTestId("earth-option")).not.toHaveAttribute("tabindex"));
    await waitFor(() => expect(getByTestId("jupiter-option")).toHaveAttribute("tabindex", "0"));
});

test("when a listbox have a single option selected, this option is tabbable", async () => {
    const { getByTestId } = render(
        <Listbox defaultSelectedKeys={["jupiter"]} aria-label="Planets">
            <Item key="earth">Earth</Item>
            <Item key="jupiter" data-testid="jupiter-option">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Listbox>
    );

    await waitFor(() => expect(getByTestId("jupiter-option")).toHaveAttribute("tabindex", "0"));
});

test("when a listbox have multiple options selected, the first selected option is tabbable", async () => {
    const { getByTestId } = render(
        <Listbox defaultSelectedKeys={["jupiter", "mars"]} selectionMode="multiple" aria-label="Planets">
            <Item key="earth">Earth</Item>
            <Item key="jupiter" data-testid="jupiter-option">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Listbox>
    );

    await waitFor(() => expect(getByTestId("jupiter-option")).toHaveAttribute("tabindex", "0"));
});

test("down arrow keypress moves focus to the next option", async () => {
    const { getByTestId } = render(
        <Listbox aria-label="Planets">
            <Item key="earth" data-testid="earth-option">Earth</Item>
            <Item key="jupiter" data-testid="jupiter-option">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Listbox>
    );

    act(() => {
        getByTestId("earth-option").focus();
    });

    act(() => {
        fireEvent.keyDown(getByTestId("earth-option"), { key: Keys.arrowDown });
    });

    await waitFor(() => expect(document.activeElement).toBe(getByTestId("jupiter-option")));
});

test("up arrow keypress moves focus to the previous option", async () => {
    const { getByTestId } = render(
        <Listbox aria-label="Planets">
            <Item key="earth" data-testid="earth-option">Earth</Item>
            <Item key="jupiter" data-testid="jupiter-option">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Listbox>
    );

    act(() => {
        getByTestId("earth-option").focus();
    });

    act(() => {
        fireEvent.keyDown(getByTestId("earth-option"), { key: Keys.arrowDown });
    });

    act(() => {
        fireEvent.keyDown(getByTestId("jupiter-option"), { key: Keys.arrowUp });
    });

    await waitFor(() => expect(document.activeElement).toBe(getByTestId("earth-option")));
});

test("home keypress move the focus to the first option", async () => {
    const { getByTestId } = render(
        <Listbox aria-label="Planets">
            <Item key="earth" data-testid="earth-option">Earth</Item>
            <Item key="jupiter" data-testid="jupiter-option">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Listbox>
    );

    act(() => {
        getByTestId("earth-option").focus();
    });

    act(() => {
        fireEvent.keyDown(getByTestId("earth-option"), { key: Keys.arrowDown });
    });

    act(() => {
        fireEvent.keyDown(getByTestId("jupiter-option"), { key: Keys.home });
    });

    await waitFor(() => expect(document.activeElement).toBe(getByTestId("earth-option")));
});

test("end keypress move the focus to the last option", async () => {
    const { getByTestId } = render(
        <Listbox aria-label="Planets">
            <Item key="earth" data-testid="earth-option">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars" data-testid="mars-option">Mars</Item>
        </Listbox>
    );

    act(() => {
        getByTestId("earth-option").focus();
    });

    act(() => {
        fireEvent.keyDown(getByTestId("earth-option"), { key: Keys.end });
    });

    await waitFor(() => expect(document.activeElement).toBe(getByTestId("mars-option")));
});

// ***** Aria *****

/*
- when an id is provided to an option, it is used as the option id.
- when an option is autogenerated, it is used as the option id.
- when an id is provided to an option, it is used to compose the label id
- when an option id is autogenerated, it is used to compose the label id
- when an id is provided to an option, it is used to compose the description id
- when an option id is autogenerated, it is used to compose the description id
*/

// ***** Api *****

/*

- call onSelectionChange when a single option is selected
- call onSelectionChange when multiple options are selected at once
- call onSelectionChange when multiple options are selected in sequence
- call onFocusChange when an option is focused

*/

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef();

    render(
        <Listbox ref={ref} />
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("DIV");
});

test("ref have a focusManager function", async () => {
    const ref = createRef();

    render(
        <Listbox ref={ref} />
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current.focusManager).not.toBeUndefined();
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode = null;

    render(
        <Listbox
            ref={node => {
                refNode = node;
            }}
        />
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("DIV");
});

test("set ref once", async () => {
    const handler = jest.fn();

    render(
        <Listbox ref={handler} />
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});


