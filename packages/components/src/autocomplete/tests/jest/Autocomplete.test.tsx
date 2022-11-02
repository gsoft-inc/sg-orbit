import { Field, Label } from "@components/field";
import { act, fireEvent, waitFor } from "@testing-library/react";

import { Autocomplete } from "@components/autocomplete";
import { Button } from "@components/button";
import { Item } from "@components/collection";
import { Keys } from "@components/shared";
import { Transition } from "@components/transition";
import { createRef } from "react";
import { renderWithTheme } from "@jest-utils";
import userEvent from "@testing-library/user-event";

beforeAll(() => {
    // @ts-ignore
    Transition.disableAnimation = true;
});

// ***** Behaviors *****

test("when a query matching existing values is entered, open the overlay with the matching values", async () => {
    const { getByTestId, queryByTestId } = renderWithTheme(
        <Autocomplete
            overlayProps={{ "data-testid": "overlay" }}
            aria-label="Planet"
            data-testid="autocomplete"
        >
            <Item key="earth" data-testid="earth-option">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars" data-testid="mars-option">Mars</Item>
            <Item key="mercury" data-testid="mercury-option">Mercury</Item>
        </Autocomplete>
    );

    await act(() => userEvent.type(getByTestId("autocomplete"), "m"));

    await waitFor(() => expect(getByTestId("overlay")).toBeInTheDocument());

    await waitFor(() => expect(getByTestId("overlay")).toContainElement(getByTestId("mars-option")));
    await waitFor(() => expect(getByTestId("overlay")).toContainElement(getByTestId("mercury-option")));

    await waitFor(() => expect(queryByTestId("earth-option")).not.toBeInTheDocument());
});

test("when a query matching no values is entered, open the overlay with a not found message", async () => {
    const { getByTestId } = renderWithTheme(
        <Autocomplete
            overlayProps={{ "data-testid": "overlay" }}
            aria-label="Planet"
            data-testid="autocomplete"
        >
            <Item key="earth">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
            <Item key="mercury" data-testid="mercury-option">Mercury</Item>
        </Autocomplete>
    );

    await act(() => userEvent.type(getByTestId("autocomplete"), "z"));

    act(() => getByTestId("autocomplete").focus());

    await waitFor(() => expect(getByTestId("overlay")).toBeInTheDocument());
    await waitFor(() => expect(getByTestId("overlay")).toContainElement(getByTestId("overlay").querySelector(".o-ui-autocomplete-no-results")));
});

test("when opening, the focus stay on the input", async () => {
    const { getByTestId } = renderWithTheme(
        <Autocomplete
            overlayProps={{ "data-testid": "overlay" }}
            aria-label="Planet"
            data-testid="autocomplete"
        >
            <Item key="earth">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
            <Item key="mercury">Mercury</Item>
        </Autocomplete>
    );

    act(() => {
        userEvent.type(getByTestId("autocomplete"), "e");
    });

    await waitFor(() => expect(getByTestId("overlay")).toBeInTheDocument());

    await waitFor(() => expect(getByTestId("autocomplete")).toHaveFocus());
});

test("when a query is cleared with backspaces, hide the overlay", async () => {
    const { getByTestId, queryByTestId } = renderWithTheme(
        <Autocomplete
            overlayProps={{ "data-testid": "overlay" }}
            aria-label="Planet"
            data-testid="autocomplete"
        >
            <Item key="earth">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
            <Item key="mercury">Mercury</Item>
        </Autocomplete>
    );

    act(() => {
        userEvent.type(getByTestId("autocomplete"), "m");
    });

    await waitFor(() => expect(getByTestId("overlay")).toBeInTheDocument());

    act(() => {
        userEvent.type(getByTestId("autocomplete"), "{backspace}");
    });

    await waitFor(() => expect(getByTestId("autocomplete")).toHaveValue(""));

    await waitFor(() => expect(queryByTestId("overlay")).not.toBeInTheDocument());
});

test("when a query is cleared with the clear button, hide the overlay", async () => {
    const { container, getByTestId, queryByTestId } = renderWithTheme(
        <Autocomplete
            overlayProps={{ "data-testid": "overlay" }}
            aria-label="Planet"
            data-testid="autocomplete"
        >
            <Item key="earth">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
            <Item key="mercury">Mercury</Item>
        </Autocomplete>
    );

    act(() => {
        userEvent.type(getByTestId("autocomplete"), "m");
    });

    await waitFor(() => expect(getByTestId("overlay")).toBeInTheDocument());

    await act(() => {
        return userEvent.click(container.querySelector(":scope .o-ui-search-input-clear-button"));
    });

    await waitFor(() => expect(getByTestId("autocomplete")).toHaveValue(""));

    await waitFor(() => expect(queryByTestId("overlay")).not.toBeInTheDocument());
});

test("when opened, clicking on a value close the overlay & select the value", async () => {
    const { getByTestId, queryByTestId } = renderWithTheme(
        <Autocomplete
            overlayProps={{ "data-testid": "overlay" }}
            aria-label="Planet"
            data-testid="autocomplete"
        >
            <Item key="earth" data-testid="earth-option">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
            <Item key="mercury">Mercury</Item>
        </Autocomplete>
    );

    await act(() => userEvent.type(getByTestId("autocomplete"), "e"));

    await waitFor(() => expect(getByTestId("overlay")).toBeInTheDocument());

    await act(() => userEvent.click(getByTestId("earth-option")));

    await waitFor(() => expect(queryByTestId("overlay")).not.toBeInTheDocument());

    await waitFor(() => expect(getByTestId("autocomplete")).toHaveValue("Earth"));
});

test("when opened, enter keypress on a value close the overlay & select the value", async () => {
    const { getByTestId, queryByTestId } = renderWithTheme(
        <Autocomplete
            overlayProps={{ "data-testid": "overlay" }}
            aria-label="Planet"
            data-testid="autocomplete"
        >
            <Item key="earth">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
            <Item key="mercury">Mercury</Item>
        </Autocomplete>
    );

    await act(() => userEvent.type(getByTestId("autocomplete"), "e"));

    await waitFor(() => expect(getByTestId("overlay")).toBeInTheDocument());

    act(() => {
        fireEvent.keyDown(getByTestId("autocomplete"), { key: Keys.arrowDown });
    });

    act(() => {
        fireEvent.keyDown(getByTestId("autocomplete"), { key: Keys.enter });
    });

    await waitFor(() => expect(queryByTestId("overlay")).not.toBeInTheDocument());

    await waitFor(() => expect(getByTestId("autocomplete")).toHaveValue("Earth"));
});

test("when opened, on esc keypress hide the overlay and focus the input", async () => {
    const { getByTestId, queryByTestId } = renderWithTheme(
        <Autocomplete
            overlayProps={{ "data-testid": "overlay" }}
            aria-label="Planet"
            data-testid="autocomplete"
        >
            <Item key="earth">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
            <Item key="mercury">Mercury</Item>
        </Autocomplete>
    );

    await act(() => userEvent.type(getByTestId("autocomplete"), "e"));

    await waitFor(() => expect(getByTestId("overlay")).toBeInTheDocument());

    act(() => {
        fireEvent.keyDown(getByTestId("autocomplete"), { key: Keys.esc });
    });

    await waitFor(() => expect(queryByTestId("overlay")).not.toBeInTheDocument());
});

test("when opened, down arrow keypress virtually focus the first value", async () => {
    const { getByTestId } = renderWithTheme(
        <Autocomplete
            overlayProps={{ "data-testid": "overlay" }}
            aria-label="Planet"
            data-testid="autocomplete"
        >
            <Item key="earth" data-testid="earth-option">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
            <Item key="mercury">Mercury</Item>
        </Autocomplete>
    );

    await act(() => userEvent.type(getByTestId("autocomplete"), "e"));

    act(() => {
        fireEvent.keyDown(getByTestId("autocomplete"), { key: Keys.arrowDown });
    });

    await waitFor(() => expect(getByTestId("earth-option")).toHaveClass("o-ui-focus"));
});

test("when opened, up arrow keypress virtually focus the last value", async () => {
    const { getByTestId } = renderWithTheme(
        <Autocomplete
            overlayProps={{ "data-testid": "overlay" }}
            aria-label="Planet"
            data-testid="autocomplete"
        >
            <Item key="mars">Mars</Item>
            <Item key="mercury">Mercury</Item>
            <Item key="maartje" data-testid="maartje-option">Maartje</Item>
        </Autocomplete>
    );

    await act(() => userEvent.type(getByTestId("autocomplete"), "m"));

    act(() => {
        fireEvent.keyDown(getByTestId("autocomplete"), { key: Keys.arrowUp });
    });

    await waitFor(() => expect(getByTestId("maartje-option")).toHaveClass("o-ui-focus"));
});

test("when opened, home keypress virtually focus the first value", async () => {
    const { getByTestId } = renderWithTheme(
        <Autocomplete
            overlayProps={{ "data-testid": "overlay" }}
            aria-label="Planet"
            data-testid="autocomplete"
        >
            <Item key="mars" data-testid="mars-option">Mars</Item>
            <Item key="mercury">Mercury</Item>
            <Item key="maartje">Maartje</Item>
        </Autocomplete>
    );

    await act(() => userEvent.type(getByTestId("autocomplete"), "m"));

    act(() => {
        fireEvent.keyDown(getByTestId("autocomplete"), { key: Keys.home });
    });

    await waitFor(() => expect(getByTestId("mars-option")).toHaveClass("o-ui-focus"));
});

test("when opened, end keypress virtually focus the last value", async () => {
    const { getByTestId } = renderWithTheme(
        <Autocomplete
            overlayProps={{ "data-testid": "overlay" }}
            aria-label="Planet"
            data-testid="autocomplete"
        >
            <Item key="mars">Mars</Item>
            <Item key="mercury">Mercury</Item>
            <Item key="maartje" data-testid="maartje-option">Maartje</Item>
        </Autocomplete>
    );

    await act(() => userEvent.type(getByTestId("autocomplete"), "m"));

    act(() => {
        fireEvent.keyDown(getByTestId("autocomplete"), { key: Keys.end });
    });

    await waitFor(() => expect(getByTestId("maartje-option")).toHaveClass("o-ui-focus"));
});

test("when no value is selected, leaving the autocomplete without selecting a new value clear the input", async () => {
    const { getByTestId, queryByTestId } = renderWithTheme(
        <Autocomplete
            overlayProps={{ "data-testid": "overlay" }}
            aria-label="Planet"
            data-testid="autocomplete"
        >
            <Item key="earth">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
            <Item key="mercury">Mercury</Item>
        </Autocomplete>
    );

    act(() => {
        userEvent.type(getByTestId("autocomplete"), "e");
    });

    await waitFor(() => expect(getByTestId("overlay")).toBeInTheDocument());

    await act(() => {
        return userEvent.click(document.body);
    });

    await waitFor(() => expect(queryByTestId("overlay")).not.toBeInTheDocument());

    await waitFor(() => expect(getByTestId("autocomplete")).toHaveValue(""));
});

test("when a value is selected, leaving the autocomplete without selecting a value reset the input with the selected value", async () => {
    const { getByTestId, queryByTestId } = renderWithTheme(
        <Autocomplete
            overlayProps={{ "data-testid": "overlay" }}
            aria-label="Planet"
            data-testid="autocomplete"
        >
            <Item key="earth" data-testid="earth-option">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
            <Item key="mercury">Mercury</Item>
        </Autocomplete>
    );

    await act(() => userEvent.type(getByTestId("autocomplete"), "e"));

    await waitFor(() => expect(getByTestId("overlay")).toBeInTheDocument());

    await act(() => userEvent.click(getByTestId("earth-option")));

    await waitFor(() => expect(queryByTestId("overlay")).not.toBeInTheDocument());

    await waitFor(() => expect(getByTestId("autocomplete")).toHaveValue("Earth"));

    await act(() => userEvent.clear(getByTestId("autocomplete")));

    await act(() => userEvent.type(getByTestId("autocomplete"), "m"));

    await waitFor(() => expect(getByTestId("autocomplete")).toHaveValue("m"));

    await waitFor(() => expect(getByTestId("overlay")).toBeInTheDocument());

    await act(() => userEvent.click(document.body));

    await waitFor(() => expect(queryByTestId("overlay")).not.toBeInTheDocument());

    await waitFor(() => expect(getByTestId("autocomplete")).toHaveValue("Earth"), { timeout: 20000 });
});

test("when opened, on tab keydown, close and select the next tabbable element", async () => {
    const { getByTestId, queryByTestId } = renderWithTheme(
        <>
            <Button>Previous</Button>
            <Autocomplete
                overlayProps={{ "data-testid": "overlay" }}
                aria-label="Planet"
                data-testid="autocomplete"
            >
                <Item key="earth">Earth</Item>
                <Item key="jupiter">Jupiter</Item>
                <Item key="mars">Mars</Item>
                <Item key="mercury">Mercury</Item>
            </Autocomplete>
            <Button data-testid="after">After</Button>
        </>
    );

    act(() => {
        userEvent.type(getByTestId("autocomplete"), "e");
    });

    await waitFor(() => expect(getByTestId("overlay")).toBeInTheDocument());

    // First tab move the focus to the clear button.
    await act(() => {
        return userEvent.tab();
    });

    await waitFor(() => expect(getByTestId("overlay")).toBeInTheDocument());

    await act(() => {
        return userEvent.tab();
    });

    await waitFor(() => expect(queryByTestId("overlay")).not.toBeInTheDocument());

    await waitFor(() => expect(getByTestId("after")).toHaveFocus());
});

test("when opened, on shift+tab keydown, close and select the previous tabbable element", async () => {
    const { getByTestId, queryByTestId } = renderWithTheme(
        <>
            <Button data-testid="previous">Previous</Button>
            <Autocomplete
                overlayProps={{ "data-testid": "overlay" }}
                aria-label="Planet"
                data-testid="autocomplete"
            >
                <Item key="earth">Earth</Item>
                <Item key="jupiter">Jupiter</Item>
                <Item key="mars">Mars</Item>
                <Item key="mercury">Mercury</Item>
            </Autocomplete>
            <Button>After</Button>
        </>
    );

    act(() => {
        userEvent.type(getByTestId("autocomplete"), "e");
    });

    await waitFor(() => expect(getByTestId("overlay")).toBeInTheDocument());

    act(() => {
        userEvent.tab({ shift: true });
    });

    await waitFor(() => expect(queryByTestId("overlay")).not.toBeInTheDocument());

    await waitFor(() => expect(getByTestId("previous")).toHaveFocus());
});

test("when the clear button is clicked, the focus is moved to the input", async () => {
    const { container, getByTestId } = renderWithTheme(
        <Autocomplete
            overlayProps={{ "data-testid": "overlay" }}
            aria-label="Planet"
            data-testid="autocomplete"
        >
            <Item key="earth">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
            <Item key="mercury">Mercury</Item>
        </Autocomplete>
    );

    act(() => {
        userEvent.type(getByTestId("autocomplete"), "e");
    });

    await waitFor(() => expect(getByTestId("overlay")).toBeInTheDocument());

    await act(() => {
        return userEvent.click(container.querySelector(":scope .o-ui-search-input-clear-button"));
    });

    await waitFor(() => expect(getByTestId("autocomplete")).toHaveFocus());
});

test("when in a field, clicking on the field label focus the autocomplete", async () => {
    const { getByTestId } = renderWithTheme(
        <Field>
            <Label data-testid="label">Autocomplete</Label>
            <Autocomplete aria-label="Planet" data-testid="autocomplete">
                <Item key="earth">Earth</Item>
                <Item key="jupiter">Jupiter</Item>
                <Item key="mars">Mars</Item>
                <Item key="mercury">Mercury</Item>
            </Autocomplete>
        </Field>
    );

    await act(() => {
        return userEvent.click(getByTestId("label"));
    });

    await waitFor(() => expect(getByTestId("autocomplete")).toHaveFocus());
});

test("when autofocus is true, the autocomplete trigger is focused on render", async () => {
    const { getByTestId } = renderWithTheme(
        <Autocomplete
            autoFocus
            aria-label="Planet"
            data-testid="autocomplete"
        >
            <Item key="earth">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
            <Item key="mercury">Mercury</Item>
        </Autocomplete>
    );

    await waitFor(() => expect(getByTestId("autocomplete")).toHaveFocus());
});

test("when autofocus is true and the autocomplete is disabled, the autocomplete trigger is not focused on render", async () => {
    const { getByTestId } = renderWithTheme(
        <Autocomplete
            disabled
            autoFocus
            aria-label="Planet"
            data-testid="autocomplete"
        >
            <Item key="earth">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
            <Item key="mercury">Mercury</Item>
        </Autocomplete>
    );

    await waitFor(() => expect(getByTestId("autocomplete")).not.toHaveFocus());
});

test("when autofocus is specified with a delay, the autocomplete trigger is focused after the delay", async () => {
    const { getByTestId } = renderWithTheme(
        <Autocomplete
            autoFocus={10}
            aria-label="Planet"
            data-testid="autocomplete"
        >
            <Item key="earth">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
            <Item key="mercury">Mercury</Item>
        </Autocomplete>
    );

    expect(getByTestId("autocomplete")).not.toHaveFocus();

    await waitFor(() => expect(getByTestId("autocomplete")).toHaveFocus());
});

// ***** Aria *****

test("when an id is provided, it is used as the trigger id", async () => {
    const { getByTestId } = renderWithTheme(
        <Autocomplete id="foo" aria-label="Planet" data-testid="autocomplete">
            <Item key="earth">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Autocomplete>
    );

    await waitFor(() => expect(getByTestId("autocomplete")).toHaveAttribute("id", "foo"));
});

test("an autocomplete have the \"combobox\" role", async () => {
    const { getByTestId } = renderWithTheme(
        <Autocomplete aria-label="Planet" data-testid="autocomplete">
            <Item key="earth">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
            <Item key="mercury">Mercury</Item>
        </Autocomplete>
    );

    await waitFor(() => expect(getByTestId("autocomplete")).toHaveAttribute("role", "combobox"));
});

test("an autocomplete have an aria-haspopup attribute", async () => {
    const { getByTestId } = renderWithTheme(
        <Autocomplete aria-label="Planet" data-testid="autocomplete">
            <Item key="earth">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
            <Item key="mercury">Mercury</Item>
        </Autocomplete>
    );

    await waitFor(() => expect(getByTestId("autocomplete")).toHaveAttribute("aria-haspopup", "listbox"));
});

test("an autocomplete have an aria-expanded attribute", async () => {
    const { getByTestId } = renderWithTheme(
        <Autocomplete
            overlayProps={{ "data-testid": "overlay" }}
            aria-label="Planet"
            data-testid="autocomplete"
        >
            <Item key="earth">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
            <Item key="mercury">Mercury</Item>
        </Autocomplete>
    );

    act(() => {
        userEvent.type(getByTestId("autocomplete"), "e");
    });

    await waitFor(() => expect(getByTestId("overlay")).toBeInTheDocument());

    await waitFor(() => expect(getByTestId("autocomplete")).toHaveAttribute("aria-expanded", "true"));
});

test("when opened, the autocomplete aria-controls match the overlay id", async () => {
    const { getByTestId } = renderWithTheme(
        <Autocomplete
            overlayProps={{ "data-testid": "overlay" }}
            aria-label="Planet"
            data-testid="autocomplete"
        >
            <Item key="earth">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
            <Item key="mercury">Mercury</Item>
        </Autocomplete>
    );

    act(() => {
        userEvent.type(getByTestId("autocomplete"), "e");
    });

    await waitFor(() => expect(getByTestId("overlay")).toBeInTheDocument());

    await waitFor(() => expect(getByTestId("autocomplete")).toHaveAttribute("aria-controls", getByTestId("overlay").getAttribute("id")));
});

// ***** Api *****

test("call onSearch when the query is updated", async () => {
    const handler = jest.fn();

    const { getByTestId } = renderWithTheme(
        <Autocomplete
            onSearch={handler}
            aria-label="Planet"
            data-testid="autocomplete"
        >
            <Item key="earth">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
            <Item key="mercury">Mercury</Item>
        </Autocomplete>
    );

    act(() => {
        userEvent.type(getByTestId("autocomplete"), "e");
    });

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), "e"));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});

test("do not call onSearch when the query is empty", async () => {
    const handler = jest.fn();

    const { getByTestId } = renderWithTheme(
        <Autocomplete
            onSearch={handler}
            aria-label="Planet"
            data-testid="autocomplete"
        >
            <Item key="earth">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
            <Item key="mercury">Mercury</Item>
        </Autocomplete>
    );

    act(() => {
        userEvent.type(getByTestId("autocomplete"), "e");
    });

    act(() => {
        userEvent.type(getByTestId("autocomplete"), "{backspace}");
    });

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});

test("call onOpenChange when the autocomplete overlay open", async () => {
    const handler = jest.fn();

    const { getByTestId } = renderWithTheme(
        <Autocomplete
            onOpenChange={handler}
            aria-label="Planet"
            data-testid="autocomplete"
        >
            <Item key="earth">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
            <Item key="mercury">Mercury</Item>
        </Autocomplete>
    );

    act(() => {
        userEvent.type(getByTestId("autocomplete"), "e");
    });

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), true));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});

test("call onOpenChange when the autocomplete overlay close", async () => {
    const handler = jest.fn();

    const { getByTestId } = renderWithTheme(
        <Autocomplete
            onOpenChange={handler}
            aria-label="Planet"
            data-testid="autocomplete"
        >
            <Item key="earth">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
            <Item key="mercury">Mercury</Item>
        </Autocomplete>
    );

    act(() => {
        userEvent.type(getByTestId("autocomplete"), "e");
    });

    act(() => {
        userEvent.type(getByTestId("autocomplete"), "{backspace}");
    });

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), false));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(2));
});

test("call onSelectionChange when a value is selected", async () => {
    const user = userEvent.setup();
    const handler = jest.fn();

    const { getByTestId } = renderWithTheme(
        <Autocomplete
            onSelectionChange={handler}
            aria-label="Planet"
            data-testid="autocomplete"
        >
            <Item key="earth" data-testid="earth-option">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
            <Item key="mercury">Mercury</Item>
        </Autocomplete>
    );

    await act(() => user.type(getByTestId("autocomplete"), "e"));

    await act(() => user.click(getByTestId("earth-option")));

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), { key: "earth", value: "Earth" }));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});

test("calling the focus function on the autocomplete ref will focus the autocomplete", async () => {
    const ref = createRef<HTMLInputElement>();

    const { getByTestId } = renderWithTheme(
        <Autocomplete
            defaultOpen
            ref={ref}
            aria-label="Planet"
            data-testid="autocomplete"
        >
            <Item key="earth">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
            <Item key="mercury">Mercury</Item>
        </Autocomplete>
    );

    act(() => {
        ref.current.focus();
    });

    await waitFor(() => expect(getByTestId("autocomplete")).toHaveFocus());
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef<HTMLInputElement>();

    renderWithTheme(
        <Autocomplete defaultOpen ref={ref} aria-label="Planet">
            <Item key="earth">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
            <Item key="mercury">Mercury</Item>
        </Autocomplete>
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();

    expect(ref.current.tagName).toBe("INPUT");
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode: HTMLElement = null;

    renderWithTheme(
        <Autocomplete
            defaultOpen
            ref={node => {
                refNode = node;
            }}
            aria-label="Planet"
        >
            <Item key="earth">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
            <Item key="mercury">Mercury</Item>
        </Autocomplete>
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("INPUT");
});

test("set ref once", async () => {
    const handler = jest.fn();

    renderWithTheme(
        <Autocomplete
            defaultOpen
            ref={handler}
            aria-label="Planet"
        >
            <Item key="earth">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
            <Item key="mercury">Mercury</Item>
        </Autocomplete>
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});

