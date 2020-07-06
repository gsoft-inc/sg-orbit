import { Button } from "@react-components/button";
import { Popper } from "@react-components/popper";
import { createRef, forwardRef, useState } from "react";
import { isNil } from "lodash";
import { render, waitFor } from "@testing-library/react";

const POPPER_WRAPPER_ID = "popper-wrapper";

const SimplePopper = forwardRef((props, ref) => {
    const [triggerElement, setTriggerElement] = useState();

    return (
        <>
            <Button ref={setTriggerElement}>Open</Button>
            <If condition={!isNil(triggerElement)}>
                <Popper
                    {...props}
                    show
                    animate={false}
                    triggerElement={triggerElement}
                    ref={ref}
                >
                    <div>Popper</div>
                </Popper>
            </If>
        </>
    );
});

// ***** API *****

test("spread additional props on the root element", async () => {
    const ref = createRef();

    render(
        <SimplePopper
            ref={ref}
            data-extra-props-test="works"
        />
    );

    await waitFor(() => expect(ref.current.getAttribute("data-extra-props-test")).toBe("works"));
});

// ***** Refs *****

test("when wrapped, ref is a DOM element", async () => {
    const ref = createRef();

    render(
        <SimplePopper
            ref={ref}
        />
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("DIV");
    expect(ref.current.getAttribute("data-testid")).toBe(POPPER_WRAPPER_ID);
});

test("when wrapped, using a callback ref, ref is a DOM element", async () => {
    let refNode = null;

    render(
        <SimplePopper
            ref={node => {
                refNode = node;
            }}
        />
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("DIV");
    expect(refNode.getAttribute("data-testid")).toBe(POPPER_WRAPPER_ID);
});

test("when wrapped, set ref once", async () => {
    const handler = jest.fn();

    render(
        <SimplePopper
            ref={handler}
        />
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});

test("when not wrapped, ref is a DOM element", async () => {
    const ref = createRef();

    render(
        <SimplePopper
            noWrap
            ref={ref}
        />
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("DIV");
    expect(ref.current.getAttribute("data-testid")).not.toBe(POPPER_WRAPPER_ID);
});

test("when not wrapped and using a callback ref, ref is a DOM element", async () => {
    let refNode = null;

    render(
        <SimplePopper
            noWrap
            ref={node => {
                refNode = node;
            }}
        />
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("DIV");
    expect(refNode.getAttribute("data-testid")).not.toBe(POPPER_WRAPPER_ID);
});

test("when not wrapped, set ref once", async () => {
    const handler = jest.fn();

    render(
        <SimplePopper
            noWrap
            ref={handler}
        />
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
