import { Button } from "@react-components/button";
import { CloseIcon } from "@react-components/icons";
import { PopperTrigger } from "@react-components/popper";
import { TextInput } from "@react-components/text-input";
import { createRef } from "react";
import { render, wait } from "@testing-library/react";

function createPopperTrigger(popperProps = {}, inputProps = {}) {
    return (
        <PopperTrigger.TextInput
            input={<TextInput {...inputProps} placeholder="Pick a date" fluid />}
            {...popperProps}
        >
            <div>Popper</div>
        </PopperTrigger.TextInput>
    );
}

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef();

    render(
        createPopperTrigger({
            ref
        })
    );

    await wait();

    expect(ref.current).not.toBeNull();
    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("DIV");
    expect(ref.current.getAttribute("data-testid")).toBe("popper-trigger");
});

test("using a callback ref, ref is a DOM element", async () => {
    let refNode = null;

    render(
        createPopperTrigger({
            ref: node => {
                refNode = node;
            }
        })
    );

    await wait();

    expect(refNode).not.toBeNull();
    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("DIV");
    expect(refNode.getAttribute("data-testid")).toBe("popper-trigger");
});

test("can assign a ref to a text input", async () => {
    let refNode = null;

    render(
        createPopperTrigger({}, {
            ref: node => {
                refNode = node;
            }
        })
    );

    await wait();

    expect(refNode).not.toBeNull();
    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("DIV");
    expect(refNode.getAttribute("data-testid")).toBe("input");
});

test("can assign a ref a text input having a button", async () => {
    let refNode = null;

    render(
        createPopperTrigger({}, {
            button: <Button icon={<CloseIcon />} />,
            ref: node => {
                refNode = node;
            }
        })
    );

    await wait();

    expect(refNode).not.toBeNull();
    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("DIV");
    expect(refNode.getAttribute("data-testid")).toBe("input");
});

test("can assign a ref to a text input button", async () => {
    let refNode = null;

    render(
        createPopperTrigger({}, {
            button: <Button
                icon={<CloseIcon />}
                ref={node => {
                    refNode = node;
                }}
            />
        })
    );

    await wait();

    expect(refNode).not.toBeNull();
    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("BUTTON");
});
