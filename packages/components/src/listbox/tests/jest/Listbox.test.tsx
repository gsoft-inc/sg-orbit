import { Item, Section } from "@components/collection";
import { Listbox, ListboxElement } from "@components/listbox";
import { act, fireEvent, screen, waitFor } from "@testing-library/react";

import { Keys } from "@components/shared";
import { Text } from "@components/typography";
import { createRef } from "react";
import { renderWithTheme } from "@test-utils";
import userEvent from "@testing-library/user-event";

// ***** Behaviors *****

test("when a listbox have no selection, the first option is tabbable", async () => {
    renderWithTheme(
        <Listbox>
            <Item key="earth" data-testid="earth-option">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Listbox>
    );

    await waitFor(() => expect(screen.getByTestId("earth-option")).toHaveAttribute("tabindex", "0"));
});

test("when a listbox with sections have no selection, the first option is tabbable", async () => {
    renderWithTheme(
        <Listbox>
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

    await waitFor(() => expect(screen.getByTestId("earth-option")).toHaveAttribute("tabindex", "0"));
});

test("a disabled option is not tabbable", async () => {
    renderWithTheme(
        <Listbox>
            <Item disabled key="earth" data-testid="earth-option">Earth</Item>
            <Item key="jupiter" data-testid="jupiter-option">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Listbox>
    );

    await waitFor(() => expect(screen.getByTestId("earth-option")).not.toHaveAttribute("tabindex"));
    await waitFor(() => expect(screen.getByTestId("jupiter-option")).toHaveAttribute("tabindex", "0"));
});

test("when a listbox have a single option selected, this option is tabbable", async () => {
    renderWithTheme(
        <Listbox defaultSelectedKeys={["jupiter"]}>
            <Item key="earth">Earth</Item>
            <Item key="jupiter" data-testid="jupiter-option">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Listbox>
    );

    await waitFor(() => expect(screen.getByTestId("jupiter-option")).toHaveAttribute("tabindex", "0"));
});

test("when a listbox have multiple selected options, the first selected option is tabbable", async () => {
    renderWithTheme(
        <Listbox defaultSelectedKeys={["jupiter", "mars"]} selectionMode="multiple">
            <Item key="earth">Earth</Item>
            <Item key="jupiter" data-testid="jupiter-option">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Listbox>
    );

    await waitFor(() => expect(screen.getByTestId("jupiter-option")).toHaveAttribute("tabindex", "0"));
});

test("down arrow keypress moves focus to the next option", async () => {
    renderWithTheme(
        <Listbox>
            <Item key="earth" data-testid="earth-option">Earth</Item>
            <Item key="jupiter" data-testid="jupiter-option">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Listbox>
    );

    act(() => {
        screen.getByTestId("earth-option").focus();
    });

    fireEvent.keyDown(screen.getByTestId("earth-option"), { key: Keys.arrowDown });

    await waitFor(() => expect(screen.getByTestId("jupiter-option")).toHaveFocus());
});

test("up arrow keypress moves focus to the previous option", async () => {
    renderWithTheme(
        <Listbox>
            <Item key="earth" data-testid="earth-option">Earth</Item>
            <Item key="jupiter" data-testid="jupiter-option">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Listbox>
    );

    act(() => {
        screen.getByTestId("earth-option").focus();
    });

    fireEvent.keyDown(screen.getByTestId("earth-option"), { key: Keys.arrowDown });

    fireEvent.keyDown(screen.getByTestId("jupiter-option"), { key: Keys.arrowUp });

    await waitFor(() => expect(screen.getByTestId("earth-option")).toHaveFocus());
});

test("home keypress move the focus to the first option", async () => {
    renderWithTheme(
        <Listbox>
            <Item key="earth" data-testid="earth-option">Earth</Item>
            <Item key="jupiter" data-testid="jupiter-option">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Listbox>
    );

    act(() => {
        screen.getByTestId("earth-option").focus();
    });

    fireEvent.keyDown(screen.getByTestId("earth-option"), { key: Keys.arrowDown });

    fireEvent.keyDown(screen.getByTestId("jupiter-option"), { key: Keys.home });

    await waitFor(() => expect(screen.getByTestId("earth-option")).toHaveFocus());
});

test("end keypress move the focus to the last option", async () => {
    renderWithTheme(
        <Listbox>
            <Item key="earth" data-testid="earth-option">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars" data-testid="mars-option">Mars</Item>
        </Listbox>
    );

    act(() => {
        screen.getByTestId("earth-option").focus();
    });

    fireEvent.keyDown(screen.getByTestId("earth-option"), { key: Keys.end });

    await waitFor(() => expect(screen.getByTestId("mars-option")).toHaveFocus());
});

test("when selectionMode is \"none\", spacebar keypress don't toggle the option selection", async () => {
    renderWithTheme(
        <Listbox selectionMode="none">
            <Item key="earth" data-testid="earth-option">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Listbox>
    );

    act(() => {
        screen.getByTestId("earth-option").focus();
    });

    fireEvent.keyDown(screen.getByTestId("earth-option"), { key: Keys.space });

    await waitFor(() => expect(screen.getByTestId("earth-option")).toHaveAttribute("aria-selected", "false"));
});

test("when selectionMode is \"none\", enter keypress don't toggle the option selection", async () => {
    renderWithTheme(
        <Listbox selectionMode="none">
            <Item key="earth" data-testid="earth-option">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Listbox>
    );

    act(() => {
        screen.getByTestId("earth-option").focus();
    });

    fireEvent.keyDown(screen.getByTestId("earth-option"), { key: Keys.enter });

    await waitFor(() => expect(screen.getByTestId("earth-option")).toHaveAttribute("aria-selected", "false"));
});

test("when selectionMode is \"none\", mouse click doesn't toggle the option selection", async () => {
    renderWithTheme(
        <Listbox selectionMode="none">
            <Item key="earth" data-testid="earth-option">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Listbox>
    );

    await userEvent.click(screen.getByTestId("earth-option"));

    await waitFor(() => expect(screen.getByTestId("earth-option")).toHaveAttribute("aria-selected", "false"));
});

test("when selectionMode is \"single\", spacebar keypress toggle the option selection", async () => {
    renderWithTheme(
        <Listbox selectionMode="single">
            <Item key="earth" data-testid="earth-option">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Listbox>
    );

    act(() => {
        screen.getByTestId("earth-option").focus();
    });

    fireEvent.keyDown(screen.getByTestId("earth-option"), { key: Keys.space });

    await waitFor(() => expect(screen.getByTestId("earth-option")).toHaveAttribute("aria-selected", "true"));

    fireEvent.keyDown(screen.getByTestId("earth-option"), { key: Keys.space });

    await waitFor(() => expect(screen.getByTestId("earth-option")).toHaveAttribute("aria-selected", "false"));
});

test("when selectionMode is \"single\", enter keypress toggle the option selection", async () => {
    renderWithTheme(
        <Listbox selectionMode="single">
            <Item key="earth" data-testid="earth-option">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Listbox>
    );

    act(() => {
        screen.getByTestId("earth-option").focus();
    });

    fireEvent.keyDown(screen.getByTestId("earth-option"), { key: Keys.enter });

    await waitFor(() => expect(screen.getByTestId("earth-option")).toHaveAttribute("aria-selected", "true"));

    fireEvent.keyDown(screen.getByTestId("earth-option"), { key: Keys.enter });

    await waitFor(() => expect(screen.getByTestId("earth-option")).toHaveAttribute("aria-selected", "false"));
});

test("when selectionMode is \"single\", mouse click toggle the option selection", async () => {
    renderWithTheme(
        <Listbox selectionMode="single">
            <Item key="earth" data-testid="earth-option">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Listbox>
    );

    await userEvent.click(screen.getByTestId("earth-option"));

    await waitFor(() => expect(screen.getByTestId("earth-option")).toHaveAttribute("aria-selected", "true"));

    await userEvent.click(screen.getByTestId("earth-option"));

    await waitFor(() => expect(screen.getByTestId("earth-option")).toHaveAttribute("aria-selected", "false"));
});

test("when selectionMode is \"multiple\", spacebar keypress toggle the option selection", async () => {
    renderWithTheme(
        <Listbox selectionMode="multiple">
            <Item key="earth" data-testid="earth-option">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Listbox>
    );

    act(() => {
        screen.getByTestId("earth-option").focus();
    });

    fireEvent.keyDown(screen.getByTestId("earth-option"), { key: Keys.space });

    await waitFor(() => expect(screen.getByTestId("earth-option")).toHaveAttribute("aria-selected", "true"));

    fireEvent.keyDown(screen.getByTestId("earth-option"), { key: Keys.space });

    await waitFor(() => expect(screen.getByTestId("earth-option")).toHaveAttribute("aria-selected", "false"));
});

test("when selectionMode is \"multiple\", enter keypress toggle the option selection", async () => {
    renderWithTheme(
        <Listbox selectionMode="multiple">
            <Item key="earth" data-testid="earth-option">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Listbox>
    );

    act(() => {
        screen.getByTestId("earth-option").focus();
    });

    fireEvent.keyDown(screen.getByTestId("earth-option"), { key: Keys.enter });

    await waitFor(() => expect(screen.getByTestId("earth-option")).toHaveAttribute("aria-selected", "true"));

    fireEvent.keyDown(screen.getByTestId("earth-option"), { key: Keys.enter });

    await waitFor(() => expect(screen.getByTestId("earth-option")).toHaveAttribute("aria-selected", "false"));
});

test("when selectionMode is \"multiple\", mouse click toggle the option selection", async () => {
    renderWithTheme(
        <Listbox selectionMode="multiple">
            <Item key="earth" data-testid="earth-option">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Listbox>
    );

    await userEvent.click(screen.getByTestId("earth-option"));

    await waitFor(() => expect(screen.getByTestId("earth-option")).toHaveAttribute("aria-selected", "true"));

    await userEvent.click(screen.getByTestId("earth-option"));

    await waitFor(() => expect(screen.getByTestId("earth-option")).toHaveAttribute("aria-selected", "false"));
});

test("when selectionMode is \"multiple\", shift + down arrow keypress moves focus to and toggles the selected state of the next option", async () => {
    renderWithTheme(
        <Listbox selectionMode="multiple">
            <Item key="earth" data-testid="earth-option">Earth</Item>
            <Item key="jupiter" data-testid="jupiter-option">Jupiter</Item>
            <Item key="mars" data-testid="mars-option">Mars</Item>
        </Listbox>
    );

    act(() => {
        screen.getByTestId("earth-option").focus();
    });

    fireEvent.keyDown(screen.getByTestId("earth-option"), { key: Keys.arrowDown, shiftKey: true });

    fireEvent.keyDown(screen.getByTestId("jupiter-option"), { key: Keys.arrowDown, shiftKey: true });

    await waitFor(() => expect(screen.getByTestId("earth-option")).toHaveAttribute("aria-selected", "false"));
    await waitFor(() => expect(screen.getByTestId("jupiter-option")).toHaveAttribute("aria-selected", "true"));
    await waitFor(() => expect(screen.getByTestId("mars-option")).toHaveAttribute("aria-selected", "true"));
});

test("when selectionMode is \"multiple\", shift + up arrow keypress moves focus to and toggles the selected state of the previous option", async () => {
    renderWithTheme(
        <Listbox selectionMode="multiple">
            <Item key="earth" data-testid="earth-option">Earth</Item>
            <Item key="jupiter" data-testid="jupiter-option">Jupiter</Item>
            <Item key="mars" data-testid="mars-option">Mars</Item>
        </Listbox>
    );

    act(() => {
        screen.getByTestId("mars-option").focus();
    });

    fireEvent.keyDown(screen.getByTestId("mars-option"), { key: Keys.arrowUp, shiftKey: true });

    fireEvent.keyDown(screen.getByTestId("jupiter-option"), { key: Keys.arrowUp, shiftKey: true });

    await waitFor(() => expect(screen.getByTestId("earth-option")).toHaveAttribute("aria-selected", "true"));
    await waitFor(() => expect(screen.getByTestId("jupiter-option")).toHaveAttribute("aria-selected", "true"));
    await waitFor(() => expect(screen.getByTestId("mars-option")).toHaveAttribute("aria-selected", "false"));
});

test("when selectionMode is \"multiple\", shift + space keypress selects contiguous options from the most recently selected item to the focused item.", async () => {
    renderWithTheme(
        <Listbox selectionMode="multiple">
            <Item key="earth" data-testid="earth-option">Earth</Item>
            <Item key="jupiter" data-testid="jupiter-option">Jupiter</Item>
            <Item key="mars" data-testid="mars-option">Mars</Item>
            <Item key="mercury" data-testid="mercury-option">Mercury</Item>
        </Listbox>
    );

    act(() => {
        screen.getByTestId("earth-option").focus();
    });

    fireEvent.keyDown(screen.getByTestId("earth-option"), { key: Keys.space });

    await screen.getByTestId("mercury-option").focus();

    fireEvent.keyDown(screen.getByTestId("mercury-option"), { key: Keys.space, shiftKey: true });

    await waitFor(() => expect(screen.getByTestId("earth-option")).toHaveAttribute("aria-selected", "true"));
    await waitFor(() => expect(screen.getByTestId("jupiter-option")).toHaveAttribute("aria-selected", "true"));
    await waitFor(() => expect(screen.getByTestId("mars-option")).toHaveAttribute("aria-selected", "true"));
    await waitFor(() => expect(screen.getByTestId("mercury-option")).toHaveAttribute("aria-selected", "true"));
});

test("when useVirtualFocus is true, a mouse click should render the option as focused", async () => {
    renderWithTheme(
        <Listbox useVirtualFocus>
            <Item key="earth">Earth</Item>
            <Item key="jupiter" data-testid="jupiter-option">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Listbox>
    );

    await userEvent.click(screen.getByTestId("jupiter-option"));

    await waitFor(() => expect(screen.getByTestId("jupiter-option")).toHaveClass("o-ui-focus"));
});

test("when useVirtualFocus is true, a programatically focused option should render the as focused", async () => {
    renderWithTheme(
        <Listbox useVirtualFocus>
            <Item key="earth">Earth</Item>
            <Item key="jupiter" data-testid="jupiter-option">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Listbox>
    );

    act(() => {
        screen.getByTestId("jupiter-option").focus();
    });

    await waitFor(() => expect(screen.getByTestId("jupiter-option")).toHaveClass("o-ui-focus"));
});

test("when useVirtualFocus and focusOnHover are true, a mouse hover should render the option as focused", async () => {
    renderWithTheme(
        <Listbox
            useVirtualFocus
            focusOnHover
        >
            <Item key="earth">Earth</Item>
            <Item key="jupiter" data-testid="jupiter-option">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Listbox>
    );

    fireEvent.mouseOver(screen.getByTestId("jupiter-option"));

    await waitFor(() => expect(screen.getByTestId("jupiter-option")).toHaveClass("o-ui-focus"));
});

test("a letter keypress move the focus to the first option starting with that letter", async () => {
    renderWithTheme(
        <Listbox>
            <Item key="earth">Earth</Item>
            <Item key="jupiter" data-testid="jupiter-option">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Listbox>
    );

    fireEvent.keyDown(screen.getByTestId("jupiter-option"), { key: "j" });

    await waitFor(() => expect(screen.getByTestId("jupiter-option")).toHaveFocus());
});

// ***** Aria *****

test("when an id is provided, the listbox id attribute match the provided id", async () => {
    renderWithTheme(
        <Listbox id="foo" data-testid="listbox">
            <Item key="earth">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Listbox>
    );

    await waitFor(() => expect(screen.getByTestId("listbox")).toHaveAttribute("id", "foo"));
});

test("a listbox role is \"listbox\"", async () => {
    renderWithTheme(
        <Listbox data-testid="listbox">
            <Item key="earth">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Listbox>
    );

    await waitFor(() => expect(screen.getByTestId("listbox")).toHaveAttribute("role", "listbox"));
});

test("when selectionMode is \"multiple\", aria-multiselectable is \"true\"", async () => {
    renderWithTheme(
        <Listbox selectionMode="multiple" data-testid="listbox">
            <Item key="earth">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Listbox>
    );

    await waitFor(() => expect(screen.getByTestId("listbox")).toHaveAttribute("aria-multiselectable", "true"));
});

test("a listbox option role is \"option\"", async () => {
    renderWithTheme(
        <Listbox>
            <Item key="earth" data-testid="earth-option">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Listbox>
    );

    await waitFor(() => expect(screen.getByTestId("earth-option")).toHaveAttribute("role", "option"));
});

test("when a listbox option is selected, aria-selected is \"true\"", async () => {
    renderWithTheme(
        <Listbox defaultSelectedKeys={["earth"]}>
            <Item key="earth" data-testid="earth-option">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Listbox>
    );

    await waitFor(() => expect(screen.getByTestId("earth-option")).toHaveAttribute("aria-selected", "true"));
});

test("when a listbox option is disabled, aria-disabled is \"true\"", async () => {
    renderWithTheme(
        <Listbox defaultSelectedKeys={["earth"]}>
            <Item disabled key="earth" data-testid="earth-option">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Listbox>
    );

    await waitFor(() => expect(screen.getByTestId("earth-option")).toHaveAttribute("aria-disabled", "true"));
});

test("a listbox option aria-labelledby match the listbox option id", async () => {
    renderWithTheme(
        <Listbox>
            <Item id="earth-item" key="earth" data-testid="earth-item">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Listbox>
    );

    await waitFor(() => expect(screen.getByTestId("earth-item")).toHaveAttribute("aria-labelledby", "earth-item-label"));
});

test("when a listbox option have a description, the listbox option aria-describedby match the description id", async () => {
    renderWithTheme(
        <Listbox>
            <Item id="earth-item" key="earth" data-testid="earth-item">
                <Text>Earth</Text>
                <Text slot="description">Is awesome!</Text>
            </Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Listbox>
    );

    await waitFor(() => expect(screen.getByTestId("earth-item")).toHaveAttribute("aria-describedby", "earth-item-description"));
});

test("when an id is provided to an option, it is used as the option id", async () => {
    renderWithTheme(
        <Listbox>
            <Item id="i-am-earth" key="earth" data-testid="earth-option">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Listbox>
    );

    await waitFor(() => expect(screen.getByTestId("earth-option")).toHaveAttribute("id", "i-am-earth"));
});

test("when no option id is provided, an option id is autogenerated", async () => {
    renderWithTheme(
        <Listbox>
            <Item key="earth" data-testid="earth-option">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Listbox>
    );

    await waitFor(() => expect(screen.getByTestId("earth-option")).toHaveAttribute("id"));
});

test("when autofocus is true, the first listbox option is focused on render", async () => {
    renderWithTheme(
        <Listbox autoFocus>
            <Item key="earth" data-testid="earth-option">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Listbox>
    );

    await waitFor(() => expect(screen.getByTestId("earth-option")).toHaveFocus());
});

test("when autofocus is true and the listbox is disabled, the first option is not focused on render", async () => {
    renderWithTheme(
        <Listbox disabled autoFocus>
            <Item key="earth" data-testid="earth-option">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Listbox>
    );

    await waitFor(() => expect(screen.getByTestId("earth-option")).not.toHaveFocus());
});

test("when autofocus is true and the listbox use virtual focus, the first listbox option is virtually focused on render", async () => {
    renderWithTheme(
        <Listbox useVirtualFocus autoFocus>
            <Item key="earth" data-testid="earth-option">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Listbox>
    );

    await waitFor(() => expect(screen.getByTestId("earth-option")).not.toHaveFocus());
    await waitFor(() => expect(screen.getByTestId("earth-option")).toHaveClass("o-ui-focus"));
});

test("when autofocus is true and the listbox use virtual focus and is disabled, the first listbox option is not virtually focused on render", async () => {
    renderWithTheme(
        <Listbox disabled useVirtualFocus autoFocus>
            <Item key="earth" data-testid="earth-option">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Listbox>
    );

    await waitFor(() => expect(screen.getByTestId("earth-option")).not.toHaveFocus());
});

test("when autofocus is true and the listox have sections, the first listbox option is focused on render", async () => {
    renderWithTheme(
        <Listbox autoFocus>
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

    await waitFor(() => expect(screen.getByTestId("earth-option")).toHaveFocus());
});

test("when autofocus is true and there is a single default key, the listbox option matching the default key is focused on render", async () => {
    renderWithTheme(
        <Listbox defaultSelectedKeys={["jupiter"]} autoFocus>
            <Item key="earth">Earth</Item>
            <Item key="jupiter" data-testid="jupiter-option">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Listbox>
    );

    await waitFor(() => expect(screen.getByTestId("jupiter-option")).toHaveFocus());
});

test("when autofocus is true and there are multiple default keys, the listbox option matching the first default key is focused on render", async () => {
    renderWithTheme(
        <Listbox defaultSelectedKeys={["jupiter", "mars"]} selectionMode="multiple" autoFocus>
            <Item key="earth">Earth</Item>
            <Item key="jupiter" data-testid="jupiter-option">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Listbox>
    );

    await waitFor(() => expect(screen.getByTestId("jupiter-option")).toHaveFocus());
});

test("when autofocus is true and the default focus target is \"first\", the listbox first option is focused on render", async () => {
    renderWithTheme(
        <Listbox autoFocusTarget="first" autoFocus>
            <Item key="earth" data-testid="earth-option">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Listbox>
    );

    await waitFor(() => expect(screen.getByTestId("earth-option")).toHaveFocus());
});

test("when autofocus is true and the default focus target is \"last\", the listbox last option is focused on render", async () => {
    renderWithTheme(
        <Listbox autoFocusTarget="last" autoFocus>
            <Item key="earth">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars" data-testid="mars-option">Mars</Item>
        </Listbox>
    );

    await waitFor(() => expect(screen.getByTestId("mars-option")).toHaveFocus());
});

test("when autofocus is true and the default focus target match an option key, the listbox option matching the key is focused on render", async () => {
    renderWithTheme(
        <Listbox autoFocusTarget="jupiter" autoFocus>
            <Item key="earth">Earth</Item>
            <Item key="jupiter" data-testid="jupiter-option">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Listbox>
    );

    await waitFor(() => expect(screen.getByTestId("jupiter-option")).toHaveFocus());
});

test("when autofocus is specified with a delay, the first listbox option is focused after the delay", async () => {
    renderWithTheme(
        <Listbox autoFocus={10}>
            <Item key="earth" data-testid="earth-option">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Listbox>
    );

    expect(screen.getByTestId("earth-option")).not.toHaveFocus();

    await waitFor(() => expect(screen.getByTestId("earth-option")).toHaveFocus());
});

// ***** Api *****

test("call onSelectionChange when a single option is selected", async () => {
    const handler = jest.fn();

    renderWithTheme(
        <Listbox onSelectionChange={handler}>
            <Item key="earth" data-testid="earth-option">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Listbox>
    );

    await userEvent.click(screen.getByTestId("earth-option"));

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), ["earth"]));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});

test("call onSelectionChange when multiple options are selected in sequence", async () => {
    const handler = jest.fn();

    renderWithTheme(
        <Listbox
            onSelectionChange={handler}
            selectionMode="multiple"
        >
            <Item key="earth" data-testid="earth-option">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars" data-testid="mars-option">Mars</Item>
        </Listbox>
    );

    await userEvent.click(screen.getByTestId("earth-option"));

    await userEvent.click(screen.getByTestId("mars-option"));

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), ["earth", "mars"]));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(2));
});

test("call onSelectionChange when multiple options are selected at once", async () => {
    const handler = jest.fn();

    renderWithTheme(
        <Listbox
            onSelectionChange={handler}
            selectionMode="multiple"
        >
            <Item key="earth" data-testid="earth-option">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
            <Item key="mercury" data-testid="mercury-option">Mercury</Item>
        </Listbox>
    );

    act(() => {
        screen.getByTestId("earth-option").focus();
    });

    fireEvent.keyDown(screen.getByTestId("earth-option"), { key: Keys.space });

    act(() => {
        screen.getByTestId("mercury-option").focus();
    });

    fireEvent.keyDown(screen.getByTestId("mercury-option"), { key: Keys.space, shiftKey: true });

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), ["earth", "jupiter", "mars", "mercury"]));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(2));
});

test("call onFocusChange when an option is programatically focused", async () => {
    const handler = jest.fn();

    renderWithTheme(
        <Listbox onFocusChange={handler}>
            <Item key="earth" data-testid="earth-option">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Listbox>
    );

    act(() => {
        screen.getByTestId("earth-option").focus();
    });

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), "earth", expect.anything()));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});

test("dont call onFocusChange when a disabled option is programatically focused", async () => {
    const handler = jest.fn();

    renderWithTheme(
        <Listbox onFocusChange={handler}>
            <Item disabled key="earth" data-testid="earth-option">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Listbox>
    );

    act(() => {
        screen.getByTestId("earth-option").focus();
    });

    await waitFor(() => expect(handler).not.toHaveBeenCalled());
});

test("call onFocusChange when an option is focused following an arrow down keypress", async () => {
    const handler = jest.fn();

    renderWithTheme(
        <Listbox onFocusChange={handler}>
            <Item key="earth" data-testid="earth-option">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Listbox>
    );

    act(() => {
        screen.getByTestId("earth-option").focus();
    });

    fireEvent.keyDown(screen.getByTestId("earth-option"), { key: Keys.arrowDown });

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), "jupiter", expect.anything()));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(2));
});

test("call onFocusChange when an option is focused following an arrow up keypress", async () => {
    const handler = jest.fn();

    renderWithTheme(
        <Listbox onFocusChange={handler}>
            <Item key="earth">Earth</Item>
            <Item key="jupiter" data-testid="jupiter-option">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Listbox>
    );

    act(() => {
        screen.getByTestId("jupiter-option").focus();
    });

    fireEvent.keyDown(screen.getByTestId("jupiter-option"), { key: Keys.arrowUp });

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), "earth", expect.anything()));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(2));
});

test("when focusOnHover is true, call onFocusChange when an option is hovered with mouse", async () => {
    const handler = jest.fn();

    renderWithTheme(
        <Listbox
            focusOnHover
            onFocusChange={handler}
        >
            <Item key="earth" data-testid="earth-option">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Listbox>
    );

    fireEvent.mouseOver(screen.getByTestId("earth-option"));

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), "earth", expect.anything()));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});

test("when focusOnHover is true, dont call onFocusChange when a disabled option is hovered with mouse", async () => {
    const handler = jest.fn();

    renderWithTheme(
        <Listbox
            focusOnHover
            onFocusChange={handler}
        >
            <Item disabled key="earth" data-testid="earth-option">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Listbox>
    );

    fireEvent.mouseOver(screen.getByTestId("earth-option"));

    await waitFor(() => expect(handler).not.toHaveBeenCalled());
});

test("when useVirtualFocus is true, call onFocusChange when an option is focused following an arrow up keypress", async () => {
    const handler = jest.fn();

    renderWithTheme(
        <Listbox
            useVirtualFocus
            onFocusChange={handler}
        >
            <Item key="earth">Earth</Item>
            <Item key="jupiter" data-testid="jupiter-option">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Listbox>
    );

    act(() => {
        screen.getByTestId("jupiter-option").focus();
    });

    fireEvent.keyDown(screen.getByTestId("jupiter-option"), { key: Keys.arrowUp });

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), "earth", expect.anything()));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(2));
});

test("when useVirtualFocus is true, call onFocusChange when an option is focused following an arrow down keypress", async () => {
    const handler = jest.fn();

    renderWithTheme(
        <Listbox
            useVirtualFocus
            onFocusChange={handler}
        >
            <Item key="earth" data-testid="earth-option">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Listbox>
    );

    act(() => {
        screen.getByTestId("earth-option").focus();
    });

    fireEvent.keyDown(screen.getByTestId("earth-option"), { key: Keys.arrowDown });

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), "jupiter", expect.anything()));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(2));
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef<ListboxElement>();

    renderWithTheme(
        <Listbox ref={ref} />
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("DIV");
});

test("ref have a focusManager function", async () => {
    const ref = createRef<ListboxElement>();

    renderWithTheme(
        <Listbox ref={ref} />
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current.focusManager).not.toBeUndefined();
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode: HTMLElement = null;

    renderWithTheme(
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

    renderWithTheme(
        <Listbox ref={handler} />
    );

    await waitFor(() => expect(handler).toHaveBeenCalled());
});


