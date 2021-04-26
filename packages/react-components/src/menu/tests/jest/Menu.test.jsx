import { Divider } from "@react-components/divider";
import { Item, Section } from "@react-components/collection";
import { Keys } from "@react-components/shared";
import { Menu } from "@react-components/menu";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { createRef } from "react";
import userEvent from "@utils/user-event";

// ***** Behaviors *****

test("when a menu have no selection, the first item is tabbable", async () => {
    const { getByTestId } = render(
        <Menu aria-label="Planets">
            <Item key="earth" data-testid="earth-item">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Menu>
    );

    await waitFor(() => expect(getByTestId("earth-item")).toHaveAttribute("tabindex", "0"));
});

test("when a menu with sections have no selection, the first item is tabbable", async () => {
    const { getByTestId } = render(
        <Menu aria-label="Planets">
            <Section title="Visited">
                <Item key="earth" data-testid="earth-item">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Section>
            <Section title="Not Visited">
                <Item key="jupiter">Jupiter</Item>
                <Item key="mercury">Mercury</Item>
                <Item key="neptune">Neptune</Item>
                <Item key="uranus">Uranus</Item>
            </Section>
        </Menu>
    );

    await waitFor(() => expect(getByTestId("earth-item")).toHaveAttribute("tabindex", "0"));
});

test("when a menu with dividers have no selection, the first item is tabbable", async () => {
    const { getByTestId } = render(
        <Menu aria-label="Planets">
            <Item key="earth" data-testid="earth-item">Earth</Item>
            <Item key="mars">Mars</Item>
            <Divider />
            <Item key="saturn">Saturn</Item>
            <Item key="jupiter">Jupiter</Item>
        </Menu>
    );

    await waitFor(() => expect(getByTestId("earth-item")).toHaveAttribute("tabindex", "0"));
});

test("a disabled item is tabbable", async () => {
    const { getByTestId } = render(
        <Menu aria-label="Planets">
            <Item disabled key="earth" data-testid="earth-item">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Menu>
    );

    await waitFor(() => expect(getByTestId("earth-item")).toHaveAttribute("tabindex", "0"));
});

test("when a menu have a single item selected, this item is tabbable", async () => {
    const { getByTestId } = render(
        <Menu defaultSelectedKeys={["jupiter"]} aria-label="Planets">
            <Item key="earth">Earth</Item>
            <Item key="jupiter" data-testid="jupiter-item">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Menu>
    );

    await waitFor(() => expect(getByTestId("jupiter-item")).toHaveAttribute("tabindex", "0"));
});

test("when a menu have multiple items selected, the first selected item is tabbable", async () => {
    const { getByTestId } = render(
        <Menu defaultSelectedKeys={["jupiter", "mars"]} selectionMode="multiple" aria-label="Planets">
            <Item key="earth">Earth</Item>
            <Item key="jupiter" data-testid="jupiter-item">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Menu>
    );

    await waitFor(() => expect(getByTestId("jupiter-item")).toHaveAttribute("tabindex", "0"));
});

test("down arrow keypress moves focus to the next item", async () => {
    const { getByTestId } = render(
        <Menu aria-label="Planets">
            <Item key="earth" data-testid="earth-item">Earth</Item>
            <Item key="jupiter" data-testid="jupiter-item">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Menu>
    );

    act(() => {
        getByTestId("earth-item").focus();
    });

    act(() => {
        fireEvent.keyDown(getByTestId("earth-item"), { key: Keys.arrowDown });
    });

    await waitFor(() => expect(document.activeElement).toBe(getByTestId("jupiter-item")));
});

test("up arrow keypress moves focus to the previous item", async () => {
    const { getByTestId } = render(
        <Menu aria-label="Planets">
            <Item key="earth" data-testid="earth-item">Earth</Item>
            <Item key="jupiter" data-testid="jupiter-item">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Menu>
    );

    act(() => {
        getByTestId("earth-item").focus();
    });

    act(() => {
        fireEvent.keyDown(getByTestId("earth-item"), { key: Keys.arrowDown });
    });

    act(() => {
        fireEvent.keyDown(getByTestId("jupiter-item"), { key: Keys.arrowUp });
    });

    await waitFor(() => expect(document.activeElement).toBe(getByTestId("earth-item")));
});

test("home keypress move the focus to the first item", async () => {
    const { getByTestId } = render(
        <Menu aria-label="Planets">
            <Item key="earth" data-testid="earth-item">Earth</Item>
            <Item key="jupiter" data-testid="jupiter-item">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Menu>
    );

    act(() => {
        getByTestId("earth-item").focus();
    });

    act(() => {
        fireEvent.keyDown(getByTestId("earth-item"), { key: Keys.arrowDown });
    });

    act(() => {
        fireEvent.keyDown(getByTestId("jupiter-item"), { key: Keys.home });
    });

    await waitFor(() => expect(document.activeElement).toBe(getByTestId("earth-item")));
});

test("end keypress move the focus to the last item", async () => {
    const { getByTestId } = render(
        <Menu aria-label="Planets">
            <Item key="earth" data-testid="earth-item">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars" data-testid="mars-item">Mars</Item>
        </Menu>
    );

    act(() => {
        getByTestId("earth-item").focus();
    });

    act(() => {
        fireEvent.keyDown(getByTestId("earth-item"), { key: Keys.end });
    });

    await waitFor(() => expect(document.activeElement).toBe(getByTestId("mars-item")));
});

test("when selectionMode is \"none\", spacebar keypress don't toggle the item selection", async () => {
    const { getByTestId } = render(
        <Menu aria-label="Planets" selectionMode="none">
            <Item key="earth" data-testid="earth-item">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Menu>
    );

    act(() => {
        getByTestId("earth-item").focus();
    });

    act(() => {
        fireEvent.keyDown(getByTestId("earth-item"), { key: Keys.space });
    });

    await waitFor(() => expect(getByTestId("earth-item")).toHaveAttribute("aria-checked", "false"));
});

test("when selectionMode is \"none\", enter keypress don't toggle the item selection", async () => {
    const { getByTestId } = render(
        <Menu aria-label="Planets" selectionMode="none">
            <Item key="earth" data-testid="earth-item">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Menu>
    );

    act(() => {
        getByTestId("earth-item").focus();
    });

    act(() => {
        fireEvent.keyDown(getByTestId("earth-item"), { key: Keys.enter });
    });

    await waitFor(() => expect(getByTestId("earth-item")).toHaveAttribute("aria-checked", "false"));
});

test("when selectionMode is \"none\", mouse click doesn't toggle the item selection", async () => {
    const { getByTestId } = render(
        <Menu aria-label="Planets" selectionMode="none">
            <Item key="earth" data-testid="earth-item">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Menu>
    );

    act(() => {
        userEvent.click(getByTestId("earth-item"));
    });

    await waitFor(() => expect(getByTestId("earth-item")).toHaveAttribute("aria-checked", "false"));
});

test("when selectionMode is \"single\", spacebar keypress toggle the item selection", async () => {
    const { getByTestId } = render(
        <Menu aria-label="Planets" selectionMode="single">
            <Item key="earth" data-testid="earth-item">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Menu>
    );

    act(() => {
        getByTestId("earth-item").focus();
    });

    act(() => {
        fireEvent.keyDown(getByTestId("earth-item"), { key: Keys.space });
    });

    await waitFor(() => expect(getByTestId("earth-item")).toHaveAttribute("aria-checked", "true"));

    act(() => {
        fireEvent.keyDown(getByTestId("earth-item"), { key: Keys.space });
    });

    await waitFor(() => expect(getByTestId("earth-item")).toHaveAttribute("aria-checked", "false"));
});

test("when selectionMode is \"single\", enter keypress toggle the item selection", async () => {
    const { getByTestId } = render(
        <Menu aria-label="Planets" selectionMode="single">
            <Item key="earth" data-testid="earth-item">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Menu>
    );

    act(() => {
        getByTestId("earth-item").focus();
    });

    act(() => {
        fireEvent.keyDown(getByTestId("earth-item"), { key: Keys.enter });
    });

    await waitFor(() => expect(getByTestId("earth-item")).toHaveAttribute("aria-checked", "true"));

    act(() => {
        fireEvent.keyDown(getByTestId("earth-item"), { key: Keys.enter });
    });

    await waitFor(() => expect(getByTestId("earth-item")).toHaveAttribute("aria-checked", "false"));
});

test("when selectionMode is \"single\", mouse click toggle the item selection", async () => {
    const { getByTestId } = render(
        <Menu aria-label="Planets" selectionMode="single">
            <Item key="earth" data-testid="earth-item">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Menu>
    );

    act(() => {
        userEvent.click(getByTestId("earth-item"));
    });

    await waitFor(() => expect(getByTestId("earth-item")).toHaveAttribute("aria-checked", "true"));

    act(() => {
        userEvent.click(getByTestId("earth-item"));
    });

    await waitFor(() => expect(getByTestId("earth-item")).toHaveAttribute("aria-checked", "false"));
});

test("when selectionMode is \"multiple\", spacebar keypress toggle the item selection", async () => {
    const { getByTestId } = render(
        <Menu aria-label="Planets" selectionMode="multiple">
            <Item key="earth" data-testid="earth-item">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Menu>
    );

    act(() => {
        getByTestId("earth-item").focus();
    });

    act(() => {
        fireEvent.keyDown(getByTestId("earth-item"), { key: Keys.space });
    });

    await waitFor(() => expect(getByTestId("earth-item")).toHaveAttribute("aria-checked", "true"));

    act(() => {
        fireEvent.keyDown(getByTestId("earth-item"), { key: Keys.space });
    });

    await waitFor(() => expect(getByTestId("earth-item")).toHaveAttribute("aria-checked", "false"));
});

test("when selectionMode is \"multiple\", enter keypress toggle the item selection", async () => {
    const { getByTestId } = render(
        <Menu aria-label="Planets" selectionMode="multiple">
            <Item key="earth" data-testid="earth-item">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Menu>
    );

    act(() => {
        getByTestId("earth-item").focus();
    });

    act(() => {
        fireEvent.keyDown(getByTestId("earth-item"), { key: Keys.enter });
    });

    await waitFor(() => expect(getByTestId("earth-item")).toHaveAttribute("aria-checked", "true"));

    act(() => {
        fireEvent.keyDown(getByTestId("earth-item"), { key: Keys.enter });
    });

    await waitFor(() => expect(getByTestId("earth-item")).toHaveAttribute("aria-checked", "false"));
});

test("when selectionMode is \"multiple\", mouse click toggle the item selection", async () => {
    const { getByTestId } = render(
        <Menu aria-label="Planets" selectionMode="multiple">
            <Item key="earth" data-testid="earth-item">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Menu>
    );

    act(() => {
        userEvent.click(getByTestId("earth-item"));
    });

    await waitFor(() => expect(getByTestId("earth-item")).toHaveAttribute("aria-checked", "true"));

    act(() => {
        userEvent.click(getByTestId("earth-item"));
    });

    await waitFor(() => expect(getByTestId("earth-item")).toHaveAttribute("aria-checked", "false"));
});

// ***** Aria *****

test("a menu role is \"menu\"", async () => {
    const { getByTestId } = render(
        <Menu aria-label="Planets" data-testid="menu">
            <Item key="earth">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Menu>
    );

    await waitFor(() => expect(getByTestId("menu")).toHaveAttribute("role", "menu"));
});

test("menu aria-orientation is always \"vertical\"", async () => {
    const { getByTestId } = render(
        <Menu aria-label="Planets" data-testid="menu">
            <Item key="earth">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Menu>
    );

    await waitFor(() => expect(getByTestId("menu")).toHaveAttribute("aria-orientation", "vertical"));
});

test("when selectionMode is \"none\", a menu item role is \"menuitem\"", async () => {
    const { getByTestId } = render(
        <Menu aria-label="Planets" selectionMode="none">
            <Item key="earth" data-testid="earth-item">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Menu>
    );

    await waitFor(() => expect(getByTestId("earth-item")).toHaveAttribute("role", "menuitem"));
});

test("when selectionMode is \"single\", a menu item role is \"menuitemradio\"", async () => {
    const { getByTestId } = render(
        <Menu aria-label="Planets" selectionMode="single">
            <Item key="earth" data-testid="earth-item">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Menu>
    );

    await waitFor(() => expect(getByTestId("earth-item")).toHaveAttribute("role", "menuitemradio"));
});

test("when selectionMode is \"multiple\", a menu item role is \"menuitemcheckbox\"", async () => {
    const { getByTestId } = render(
        <Menu aria-label="Planets" selectionMode="multiple">
            <Item key="earth" data-testid="earth-item">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Menu>
    );

    await waitFor(() => expect(getByTestId("earth-item")).toHaveAttribute("role", "menuitemcheckbox"));
});

test("when a menu item is selected, aria-checked is \"true\"", async () => {
    const { getByTestId } = render(
        <Menu defaultSelectedKeys={["earth"]} aria-label="Planets" selectionMode="single">
            <Item key="earth" data-testid="earth-item">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Menu>
    );

    await waitFor(() => expect(getByTestId("earth-item")).toHaveAttribute("aria-checked", "true"));
});

test("when a menu item is disabled, aria-disabled is \"true\"", async () => {
    const { getByTestId } = render(
        <Menu aria-label="Planets">
            <Item disabled key="earth" data-testid="earth-item">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Menu>
    );

    await waitFor(() => expect(getByTestId("earth-item")).toHaveAttribute("aria-disabled", "true"));
});

test("when an id is provided to an item, it is used as the item id", async () => {
    const { getByTestId } = render(
        <Menu aria-label="Planets">
            <Item id="i-am-earth" key="earth" data-testid="earth-item">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Menu>
    );

    await waitFor(() => expect(getByTestId("earth-item")).toHaveAttribute("id", "i-am-earth"));
});

test("when an item id is autogenerated, it is used as the item id", async () => {
    const { getByTestId } = render(
        <Menu aria-label="Planets">
            <Item key="earth" data-testid="earth-item">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Menu>
    );

    await waitFor(() => expect(getByTestId("earth-item")).toHaveAttribute("id"));
});

// ***** Api *****

test("call onSelectionChange when a single item is selected", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(
        <Menu
            onSelectionChange={handler}
            selectionMode="single"
            aria-label="Planets"
        >
            <Item key="earth" data-testid="earth-option">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Menu>
    );

    act(() => {
        userEvent.click(getByTestId("earth-option"));
    });

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), ["earth"]);
});

test("call onSelectionChange when multiple items are selected", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(
        <Menu
            onSelectionChange={handler}
            selectionMode="multiple"
            aria-label="Planets"
        >
            <Item key="earth" data-testid="earth-option">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars" data-testid="mars-option">Mars</Item>
        </Menu>
    );

    act(() => {
        userEvent.click(getByTestId("earth-option"));
    });

    act(() => {
        userEvent.click(getByTestId("mars-option"));
    });

    expect(handler).toHaveBeenLastCalledWith(expect.anything(), ["earth", "mars"]);
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef();

    render(
        <Menu ref={ref} />
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("UL");
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode = null;

    render(
        <Menu
            ref={node => {
                refNode = node;
            }}
        />
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("UL");
});

test("set ref once", async () => {
    const handler = jest.fn();

    render(
        <Menu ref={handler} />
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});

