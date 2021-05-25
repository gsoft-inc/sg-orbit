import { Checkbox } from "@react-components/checkbox";
import { Field, Label } from "@react-components/field";
import { act, render, waitFor } from "@testing-library/react";
import { createRef } from "react";
import { waitDelay } from "@utils/waitDelay";
import userEvent from "@testing-library/user-event";

function getInput(element) {
    return element.querySelector("input");
}

// ***** Behaviors *****

test("when in a field, clicking on the field label focus the checkbox", async () => {
    const { getByTestId } = render(
        <Field>
            <Label data-testid="label">I agree</Label>
            <Checkbox data-testid="checkbox" />
        </Field>
    );

    act(() => {
        userEvent.click(getByTestId("label"));
    });

    await waitFor(() => expect(getInput(getByTestId("checkbox"))).toHaveFocus());
});

test("when autofocus is true, the checkbox is focused on render", async () => {
    const { getByTestId } = render(
        <Checkbox autoFocus data-testid="checkbox" />
    );

    await waitFor(() => expect(getInput(getByTestId("checkbox"))).toHaveFocus());
});

test("when autofocus is true and the checkbox is disabled, the checkbox is not focused on render", async () => {
    const { getByTestId } = render(
        <Checkbox
            disabled
            autoFocus
            data-testid="checkbox"
        />
    );

    await waitFor(() => expect(getInput(getByTestId("checkbox"))).not.toHaveFocus());
});

test("when autofocus is specified with a delay, the checkbox is focused after the delay", async () => {
    const { getByTestId } = render(
        <Checkbox
            autoFocus={10}
            data-testid="checkbox"
        />
    );

    await waitFor(() => expect(getInput(getByTestId("checkbox"))).not.toHaveFocus());

    await waitDelay(10);

    await waitFor(() => expect(getInput(getByTestId("checkbox"))).toHaveFocus());
});

// ***** Api *****

test("call onChange, when the checkbox is checked", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(
        <Checkbox onChange={handler} data-testid="checkbox" />
    );

    act(() => {
        userEvent.click(getInput(getByTestId("checkbox")));
    });

    await waitFor(() => expect(handler).toHaveBeenCalled());
});

test("call onChange when the checkbox is unchecked", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(
        <Checkbox onValueChange={handler} data-testid="checkbox" />
    );

    act(() => {
        userEvent.click(getInput(getByTestId("checkbox")));
    });

    act(() => {
        userEvent.click(getInput(getByTestId("checkbox")));
    });

    await waitFor(() => expect(handler).toHaveBeenCalled());
});

test("call onValueChange when the checkbox is checked", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(
        <Checkbox onValueChange={handler} data-testid="checkbox" />
    );

    act(() => {
        userEvent.click(getInput(getByTestId("checkbox")));
    });

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), true));
});

test("call onValueChange when the checkbox is unchecked", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(
        <Checkbox onValueChange={handler} data-testid="checkbox" />
    );

    act(() => {
        userEvent.click(getInput(getByTestId("checkbox")));
    });

    act(() => {
        userEvent.click(getInput(getByTestId("checkbox")));
    });

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), false));
});

test("call onValueChange when the checkbox goes from indeterminate to checked", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(
        <Checkbox defaultIndeterminate onValueChange={handler} data-testid="checkbox" />
    );

    act(() => {
        userEvent.click(getInput(getByTestId("checkbox")));
    });

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), true));
});

test("dont call onValueChange when the checkbox is disabled", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(
        <Checkbox disabled onValueChange={handler} data-testid="checkbox" />
    );

    act(() => {
        userEvent.click(getInput(getByTestId("checkbox")));
    });

    await waitFor(() => expect(handler).not.toHaveBeenCalled());
});

test("can focus the checkbox with the focus api", async () => {
    let refNode = null;

    render(
        <Checkbox
            ref={node => {
                refNode = node;
            }}
            data-testid="checkbox"
        />
    );

    act(() => {
        refNode.focus();
    });

    await waitFor(() => expect(getInput(refNode)).toHaveFocus());
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef();

    render(
        <Checkbox ref={ref} data-testid="checkbox" />
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    await waitFor(() => expect(ref.current instanceof HTMLElement).toBeTruthy());
    await waitFor(() => expect(ref.current.tagName).toBe("LABEL"));
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode = null;

    render(
        <Checkbox
            ref={node => {
                refNode = node;
            }}
            data-testid="checkbox"
        />
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    await waitFor(() => expect(refNode instanceof HTMLElement).toBeTruthy());
    await waitFor(() => expect(refNode.tagName).toBe("LABEL"));
});

test("set ref once", async () => {
    const handler = jest.fn();

    render(
        <Checkbox ref={handler} data-testid="checkbox" />
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
