import { Field, Label } from "@components/field";
import { act, screen, waitFor, renderWithTheme } from "@test-utils";
import { DateInput } from "@components/date-input";
import { createRef } from "react";
import userEvent from "@testing-library/user-event";

// Using userEvent.type with a string having multiple characters doesn't work because of the mask. Only the last character ends up being typed.
// Providing an option.delay fix the problem but we get the following warning: "You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one."
function type(element: Element, text: string) {
    [...text].forEach(x => {
        userEvent.type(element, x);
    });
}

function backspace(element: Element, times = 1) {
    for (let x = 0; x < times; x += 1) {
        userEvent.type(element, "{backspace}");
    }
}

// ***** Behaviors *****

test("only accept number characters", async () => {
    renderWithTheme(
        <DateInput data-testid="date" />
    );

    act(() => {
        screen.getByTestId("date").focus();
    });

    type(screen.getByTestId("date"), "aA");

    await waitFor(() => expect(screen.getByTestId("date")).toHaveValue(""));

    type(screen.getByTestId("date"), "(@$");

    await waitFor(() => expect(screen.getByTestId("date")).toHaveValue(""));

    type(screen.getByTestId("date"), "010");

    await waitFor(() => expect(screen.getByTestId("date")).toHaveValue("01/0"));
});

test("when the input has no value and a partial date has been entered, reset to an empty value on blur", async () => {
    renderWithTheme(
        <DateInput data-testid="date" />
    );

    act(() => {
        screen.getByTestId("date").focus();
    });

    type(screen.getByTestId("date"), "010");

    await waitFor(() => expect(screen.getByTestId("date")).toHaveValue("01/0"));

    await userEvent.click(document.body);

    await waitFor(() => expect(screen.getByTestId("date")).toHaveValue(""));

    act(() => {
        screen.getByTestId("date").focus();
    });

    await waitFor(() => expect(screen.getByTestId("date")).toHaveValue(""));
});

test("when the input has no value and an invalid date has been entered, clear the input value on blur", async () => {
    renderWithTheme(
        <DateInput data-testid="date" />
    );

    act(() => {
        screen.getByTestId("date").focus();
    });

    type(screen.getByTestId("date"), "99999999");

    await userEvent.click(document.body);

    await waitFor(() => expect(screen.getByTestId("date")).toHaveValue(""));

    act(() => {
        screen.getByTestId("date").focus();
    });

    await waitFor(() => expect(screen.getByTestId("date")).toHaveValue(""));
});

test("when the entered date is lower than the min date, reset value to min date", async () => {
    renderWithTheme(
        <DateInput
            min={new Date(2021, 0, 1)}
            data-testid="date"
        />
    );

    act(() => {
        screen.getByTestId("date").focus();
    });

    type(screen.getByTestId("date"), "01012020");

    await userEvent.click(document.body);

    await waitFor(() => expect(screen.getByTestId("date")).toHaveValue("Fri, Jan 1, 2021"));

    act(() => {
        screen.getByTestId("date").focus();
    });

    await waitFor(() => expect(screen.getByTestId("date")).toHaveValue("01/01/2021"));
});

test("when the entered date is greater than the max date, reset the date to the max date value", async () => {
    renderWithTheme(
        <DateInput
            max={new Date(2021, 0, 1)}
            data-testid="date"
        />
    );

    act(() => {
        screen.getByTestId("date").focus();
    });

    type(screen.getByTestId("date"), "01012022");

    await userEvent.click(document.body);

    await waitFor(() => expect(screen.getByTestId("date")).toHaveValue("Fri, Jan 1, 2021"));

    act(() => {
        screen.getByTestId("date").focus();
    });

    await waitFor(() => expect(screen.getByTestId("date")).toHaveValue("01/01/2021"));
});

test("when a valid date is entered, convert the date format to a read format on blur", async () => {
    renderWithTheme(
        <DateInput data-testid="date" />
    );

    act(() => {
        screen.getByTestId("date").focus();
    });

    type(screen.getByTestId("date"), "01012021");

    await userEvent.click(document.body);

    await waitFor(() => expect(screen.getByTestId("date")).toHaveValue("Fri, Jan 1, 2021"));
});

test("when the input value has a valid date and receive focus, convert the date format to an editable format", async () => {
    renderWithTheme(
        <DateInput
            defaultValue={new Date(2021, 0, 1)}
            data-testid="date"
        />
    );

    act(() => {
        screen.getByTestId("date").focus();
    });

    await waitFor(() => expect(screen.getByTestId("date")).toHaveValue("01/01/2021"));
});

test("when the input value has a valid date and a partial date has been entered entered, reset to the last valid date on blur", async () => {
    renderWithTheme(
        <DateInput
            defaultValue={new Date(2021, 0, 1)}
            data-testid="date"
        />
    );

    act(() => {
        screen.getByTestId("date").focus();
    });

    type(screen.getByTestId("date"), "010");

    await userEvent.click(document.body);

    await waitFor(() => expect(screen.getByTestId("date")).toHaveValue("Fri, Jan 1, 2021"));

    act(() => {
        screen.getByTestId("date").focus();
    });

    await waitFor(() => expect(screen.getByTestId("date")).toHaveValue("01/01/2021"));
});

test("when the input value has a valid date and a malformed date has been entered, reset to the last valid date", async () => {
    renderWithTheme(
        <DateInput
            defaultValue={new Date(2021, 0, 1)}
            data-testid="date"
        />
    );

    act(() => {
        screen.getByTestId("date").focus();
    });

    backspace(screen.getByTestId("date"), 6);

    type(screen.getByTestId("date"), "999999");

    await userEvent.click(document.body);

    await waitFor(() => expect(screen.getByTestId("date")).toHaveValue("Fri, Jan 1, 2021"));

    act(() => {
        screen.getByTestId("date").focus();
    });

    await waitFor(() => expect(screen.getByTestId("date")).toHaveValue("01/01/2021"));
});

test("when in a field, clicking on the field label focus the date input", async () => {
    renderWithTheme(
        <Field>
            <Label data-testid="label">Date</Label>
            <DateInput data-testid="date" />
        </Field>
    );

    await userEvent.click(screen.getByTestId("label"));

    await waitFor(() => expect(screen.getByTestId("date")).toHaveFocus());
});

test("when autofocus is true, the date input is focused on render", async () => {
    renderWithTheme(
        <DateInput autoFocus data-testid="date" />
    );

    await waitFor(() => expect(screen.getByTestId("date")).toHaveFocus());
});

test("when autofocus is true and the date input is disabled, the date input is not focused on render", async () => {
    renderWithTheme(
        <DateInput disabled autoFocus data-testid="date" />
    );

    await waitFor(() => expect(screen.getByTestId("date")).not.toHaveFocus());
});

test("when autofocus is true and the date input is readonly, the date input is not focused on render", async () => {
    renderWithTheme(
        <DateInput readOnly autoFocus data-testid="date" />
    );

    await waitFor(() => expect(screen.getByTestId("date")).not.toHaveFocus());
});

test("when autofocus is specified with a de lay, the date input is focused after the delay", async () => {
    renderWithTheme(
        <DateInput autoFocus={10} data-testid="date" />
    );

    expect(screen.getByTestId("date")).not.toHaveFocus();

    await waitFor(() => expect(screen.getByTestId("date")).toHaveFocus());
});

describe("compact presets", () => {
    test("when a preset is selected, both inputs are filled with the preset dates", async () => {
        renderWithTheme(
            <DateInput
                presets={[{ text: "Preset 1", date: new Date(2020, 0, 1) }]}
                presetsVariant="compact"
                placeholder="date-input"
            />
        );

        await userEvent.click(screen.getByLabelText("Date presets"));

        expect(await screen.findByRole("menu")).toBeInTheDocument();

        await userEvent.click(screen.getByRole("menuitemradio"));

        await waitFor(() => expect(screen.getByPlaceholderText("date-input")).toHaveValue("Wed, Jan 1, 2020"));

        act(() => {
            screen.getByPlaceholderText("date-input").focus();
        });

        await waitFor(() => expect(screen.getByPlaceholderText("date-input")).toHaveValue("01/01/2020"));
    });

    test("when a preset is selected, the preset menu trigger is focused", async () => {
        renderWithTheme(
            <DateInput
                presets={[{ text: "Preset 1", date: new Date(2020, 0, 1) }]}
                presetsVariant="compact"
                placeholder="date-range"
            />
        );

        await userEvent.click(screen.getByLabelText("Date presets"));

        expect(await screen.findByRole("menu")).toBeInTheDocument();

        await userEvent.click(screen.getByRole("menuitemradio"));

        await waitFor(() => expect(screen.getByLabelText("Date presets")).toHaveFocus());
    });

    test("when a preset is selected from the menu, the selected item of the menu match the selected preset", async () => {
        renderWithTheme(
            <DateInput
                presets={[{ text: "Preset 1", date: new Date(2020, 0, 1) }]}
                presetsVariant="compact"
                placeholder="date-range"
            />
        );

        await userEvent.click(screen.getByLabelText("Date presets"));

        expect(await screen.findByRole("menu")).toBeInTheDocument();

        await userEvent.click(screen.getByRole("menuitemradio"));

        await waitFor(() => expect(screen.getByRole("menuitemradio")).toHaveAttribute("aria-checked", "true"));
    });

    test("when the date value match a preset, the selected item of the menu match the preset", async () => {
        renderWithTheme(
            <DateInput
                value={new Date(2020, 0, 1)}
                presets={[{ text: "Preset 1", date: new Date(2020, 0, 1) }]}
                presetsVariant="compact"
                placeholder="date-range"
            />
        );

        await userEvent.click(screen.getByLabelText("Date presets"));

        expect(await screen.findByRole("menu")).toBeInTheDocument();

        await waitFor(() => expect(screen.getByRole("menuitemradio")).toHaveAttribute("aria-checked", "true"));
    });
});

describe("expanded presets", () => {
    test("when a preset is selected, the input is filled with the preset date", async () => {
        renderWithTheme(
            <DateInput
                presets={[{ text: "Preset 1", date: new Date(2020, 0, 1) }]}
                presetsVariant="expanded"
                placeholder="date-input"
            />
        );

        await userEvent.click(screen.getByRole("radio"));

        await waitFor(() => expect(screen.getByPlaceholderText("date-input")).toHaveValue("Wed, Jan 1, 2020"));

        act(() => {
            screen.getByPlaceholderText("date-input").focus();
        });

        await waitFor(() => expect(screen.getByPlaceholderText("date-input")).toHaveValue("01/01/2020"));
    });

    test("when a preset is selected, the toggled button match the selected preset", async () => {
        renderWithTheme(
            <DateInput
                presets={[{ text: "Preset 1", date: new Date(2020, 0, 1) }]}
                presetsVariant="expanded"
                placeholder="date-input"
            />
        );

        await userEvent.click(screen.getByRole("radio"));

        await waitFor(() => expect(screen.getByRole("radio")).toHaveAttribute("aria-checked", "true"));
    });

    test("when the date match a preset, the toggled button match the preset", async () => {
        renderWithTheme(
            <DateInput
                value={new Date(2020, 0, 1)}
                presets={[{ text: "Preset 1", date: new Date(2020, 0, 1) }]}
                presetsVariant="expanded"
                placeholder="date-input"
            />
        );

        await waitFor(() => expect(screen.getByRole("radio")).toHaveAttribute("aria-checked", "true"));
    });
});

// ***** Api *****

test("when the input has no value and a valid date has been entered, call onDateChange with the new date on blur", async () => {
    const handler = jest.fn();

    renderWithTheme(
        <DateInput
            onDateChange={handler}
            data-testid="date"
        />
    );

    act(() => {
        screen.getByTestId("date").focus();
    });

    type(screen.getByTestId("date"), "01012021");

    await userEvent.click(document.body);

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(handler).toHaveBeenCalledWith(expect.anything(), new Date(2021, 0, 1)));
});

test("when the input has no value and a partial date has been cleared, do not call onDateChange", async () => {
    const handler = jest.fn();

    renderWithTheme(
        <DateInput
            onDateChange={handler}
            data-testid="date"
        />
    );

    act(() => {
        screen.getByTestId("date").focus();
    });

    type(screen.getByTestId("date"), "010");

    await waitFor(() => expect(screen.getByTestId("date")).toHaveValue("01/0"));

    await userEvent.clear(screen.getByTestId("date"));

    await userEvent.click(document.body);

    await waitFor(() => expect(screen.getByTestId("date")).toHaveValue(""));

    await waitFor(() => expect(handler).not.toHaveBeenCalled());
});

test("when the input has no value and a malformed date has been entered, do not call onDateChange", async () => {
    const handler = jest.fn();

    renderWithTheme(
        <DateInput
            onDateChange={handler}
            data-testid="date"
        />
    );

    act(() => {
        screen.getByTestId("date").focus();
    });

    type(screen.getByTestId("date"), "99999999");

    await userEvent.click(document.body);

    await waitFor(() => expect(screen.getByTestId("date")).toHaveValue(""));

    await waitFor(() => expect(handler).not.toHaveBeenCalled());
});

test("when the input value has a valid date and a new valid date has been entered, call onDateChange with the new date", async () => {
    const handler = jest.fn();

    renderWithTheme(
        <DateInput
            defaultValue={new Date(2021, 0, 1)}
            onDateChange={handler}
            data-testid="date"
        />
    );

    act(() => {
        screen.getByTestId("date").focus();
    });

    backspace(screen.getByTestId("date"));

    await userEvent.type(screen.getByTestId("date"), "0");

    await userEvent.click(document.body);

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(handler).toHaveBeenCalledWith(expect.anything(), new Date(2020, 0, 1)));
});

test("when the input value has a valid date and the date has been cleared, call onDateChange with null", async () => {
    const handler = jest.fn();

    renderWithTheme(
        <DateInput
            defaultValue={new Date(2021, 0, 1)}
            onDateChange={handler}
            data-testid="date"
        />
    );

    act(() => {
        screen.getByTestId("date").focus();
    });

    await userEvent.clear(screen.getByTestId("date"));

    await userEvent.click(document.body);

    await waitFor(() => expect(handler).toHaveBeenCalledWith(expect.anything(), null));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});

test("when the input value has a valid date and a partial date has been entered, do not call onDateChange on date reset", async () => {
    const handler = jest.fn();

    renderWithTheme(
        <DateInput
            defaultValue={new Date(2021, 0, 1)}
            onDateChange={handler}
            data-testid="date"
        />
    );

    act(() => {
        screen.getByTestId("date").focus();
    });

    backspace(screen.getByTestId("date"), 3);

    await userEvent.click(document.body);

    await waitFor(() => expect(screen.getByTestId("date")).toHaveValue("Fri, Jan 1, 2021"));

    await waitFor(() => expect(handler).not.toHaveBeenCalled());
});

test("when the input value has a valid date and a malformed date has been entered, do not call onDateChange", async () => {
    const handler = jest.fn();

    renderWithTheme(
        <DateInput
            defaultValue={new Date(2021, 0, 1)}
            onDateChange={handler}
            data-testid="date"
        />
    );

    act(() => {
        screen.getByTestId("date").focus();
    });

    backspace(screen.getByTestId("date"), 6);

    type(screen.getByTestId("date"), "999999");

    await userEvent.click(document.body);

    await waitFor(() => expect(handler).not.toHaveBeenCalled());
});

test("when the input value has a valid date and is focused then blured with the same date, do not call onDateChange", async () => {
    const handler = jest.fn();

    renderWithTheme(
        <DateInput
            defaultValue={new Date(2021, 0, 1)}
            onDateChange={handler}
            data-testid="date"
        />
    );

    act(() => {
        screen.getByTestId("date").focus();
    });

    await userEvent.click(document.body);

    await waitFor(() => expect(handler).not.toHaveBeenCalled());
});

test("when a valid date has been entered and the date exceed the specified min or max value, onDateChange is called with the clamped date before onBlur is called", async () => {
    const handleDateChange = jest.fn();

    renderWithTheme(
        <DateInput
            onDateChange={handleDateChange}
            min={new Date(2021, 0, 1)}
            data-testid="date"
        />
    );

    act(() => {
        screen.getByTestId("date").focus();
    });

    type(screen.getByTestId("date"), "01012020");

    await userEvent.click(document.body);

    await waitFor(() => expect(handleDateChange).toHaveBeenLastCalledWith(expect.anything(), new Date(2021, 0, 1)));
    await waitFor(() => expect(handleDateChange).toHaveBeenCalledTimes(1));
});

test("when a preset is selected, call onDateChange with the preset date", async () => {
    const handler = jest.fn();

    renderWithTheme(
        <DateInput
            presets={[{ text: "Preset 1", date: new Date(2020, 0, 1) }]}
            onDateChange={handler}
        />
    );

    await userEvent.click(screen.getByLabelText("Date presets"));

    expect(await screen.findByRole("menu")).toBeInTheDocument();

    await userEvent.click(screen.getByRole("menuitemradio"));

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(handler).toHaveBeenCalledWith(expect.anything(), new Date(2020, 0, 1)));
});

test("can focus the date input with the focus api", async () => {
    let refNode: HTMLElement = null;

    renderWithTheme(
        <DateInput
            ref={node => {
                refNode = node;
            }}
            data-testid="date"
        />
    );

    act(() => {
        refNode.focus();
    });

    await waitFor(() => expect(refNode).toHaveFocus());
});

test("when compact presets are provided, can focus the input with the focus api", async () => {
    const ref = createRef<HTMLInputElement>();

    renderWithTheme(
        <DateInput
            presets={[{ text: "Preset 1", date: new Date(2020, 0, 1) }]}
            presetsVariant="compact"
            placeholder="date-input"
            ref={ref}
        />
    );

    act(() => {
        ref.current.focus();
    });

    await waitFor(() => expect(screen.getByPlaceholderText("date-input")).toHaveFocus());
});

test("when expanded presets are provided, can focus the input with the focus api", async () => {
    const ref = createRef<HTMLInputElement>();

    renderWithTheme(
        <DateInput
            presets={[{ text: "Preset 1", date: new Date(2020, 0, 1) }]}
            presetsVariant="expanded"
            placeholder="date-input"
            ref={ref}
        />
    );

    act(() => {
        ref.current.focus();
    });

    await waitFor(() => expect(screen.getByPlaceholderText("date-input")).toHaveFocus());
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef<HTMLInputElement>();

    renderWithTheme(
        <DateInput ref={ref} />
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("INPUT");
});

test("when compact presets are provided, ref is a DOM element", async () => {
    const ref = createRef<HTMLInputElement>();

    renderWithTheme(
        <DateInput
            presets={[{ text: "Preset 1", date: new Date(2020, 0, 1) }]}
            presetsVariant="compact"
            ref={ref}
        />
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("DIV");
});

test("when expanded presets are provided, ref is a DOM element", async () => {
    const ref = createRef<HTMLInputElement>();

    renderWithTheme(
        <DateInput
            presets={[{ text: "Preset 1", date: new Date(2020, 0, 1) }]}
            presetsVariant="expanded"
            ref={ref}
        />
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("DIV");
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode: HTMLElement = null;

    renderWithTheme(
        <DateInput
            ref={node => {
                refNode = node;
            }}
        />
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("INPUT");
});

test("set ref once", async () => {
    const handler = jest.fn();

    renderWithTheme(
        <DateInput ref={handler} />
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});


