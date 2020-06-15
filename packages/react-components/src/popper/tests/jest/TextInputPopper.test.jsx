import { Button } from "@react-components/button";
import { CloseIcon } from "@react-components/icons";
import { TextInput } from "@react-components/text-input";
import { TextInputPopper } from "@react-components/popper";
import { act, render, waitFor } from "@testing-library/react";
import { createRef, forwardRef } from "react";
import userEvent from "@utils/user-event";

const POPPER_ID = "popper-wrapper";

const SimpleTextInputPopper = forwardRef(({
    input = <TextInput />,
    ...rest
}, ref) => {
    return (
        <TextInputPopper
            {...rest}
            input={input}
            ref={ref}
        >
            <div>Popper</div>
        </TextInputPopper>
    );
});

function getInput(getByTestId) {
    return getByTestId("input").querySelector("input");
}

// ***** Behaviors *****

test("show the popper on input click", async () => {
    const { getByTestId } = render(
        <SimpleTextInputPopper />
    );

    act(() => {
        userEvent.click(getInput(getByTestId));
    });

    await waitFor(() => expect(getByTestId(POPPER_ID)).toBeInTheDocument());
});

test("hide the popper on input click", async () => {
    const { getByTestId } = render(
        <SimpleTextInputPopper />
    );

    const inputNode = getInput(getByTestId);

    act(() => {
        userEvent.click(inputNode);
    });

    const popperNode = await waitFor(() => getByTestId(POPPER_ID));

    act(() => {
        userEvent.click(inputNode);
    });

    await waitFor(() => expect(popperNode).not.toBeInTheDocument());
});

test("dont close the popper on input clear button click", async () => {
    const { getByTestId } = render(
        <SimpleTextInputPopper
            input={
                <TextInput
                    button={
                        <Button
                            icon={<CloseIcon />}
                            data-testid="clear-button"
                        />
                    }
                />
            }
        />
    );

    act(() => {
        userEvent.click(getInput(getByTestId));
    });

    const popperNode = await waitFor(() => getByTestId(POPPER_ID));

    act(() => {
        userEvent.click(getByTestId("clear-button"));
    });

    await waitFor(() => expect(popperNode).toBeInTheDocument());
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef();

    render(
        <SimpleTextInputPopper
            ref={ref}
        />
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("DIV");
    expect(ref.current.getAttribute("data-testid")).toBe("popper-trigger");
});

test("using a callback ref, ref is a DOM element", async () => {
    let refNode = null;

    render(
        <SimpleTextInputPopper
            ref={node => {
                refNode = node;
            }}
        />
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("DIV");
    expect(refNode.getAttribute("data-testid")).toBe("popper-trigger");
});

test("can assign a ref to a text input", async () => {
    const ref = createRef();

    render(
        <SimpleTextInputPopper
            input={<TextInput ref={ref} />}
        />
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("DIV");
    expect(ref.current.getAttribute("data-testid")).toBe("input");
});

test("can assign a ref to a text input having a button", async () => {
    const ref = createRef();

    render(
        <SimpleTextInputPopper
            input={
                <TextInput
                    button={<Button icon={<CloseIcon />} />}
                    ref={ref}
                />
            }
        />
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("DIV");
    expect(ref.current.getAttribute("data-testid")).toBe("input");
});

test("can assign a ref to a text input button", async () => {
    const ref = createRef();

    render(
        <SimpleTextInputPopper
            input={
                <TextInput
                    button={<Button icon={<CloseIcon />} ref={ref} />}
                />
            }
        />
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("BUTTON");
});
