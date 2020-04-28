import { Button } from "@react-components/button";
import { Popper } from "@react-components/popper";
import { createRef, forwardRef, useState } from "react";
import { isNil } from "lodash";
import { render, wait } from "@testing-library/react";

// TODO:
//  - don't toggle popper when disabled
//  - support additional props

function PureDummyPopper({ forwardedRef, ...rest }) {
    const [triggerElement, setTriggerElement] = useState(null);

    return (
        <>
            <Button ref={setTriggerElement}>Open</Button>
            <If condition={!isNil(triggerElement)}>
                <Popper
                    show
                    triggerElement={triggerElement}
                    ref={forwardedRef}
                    {...rest}
                >
                    <div>Popper</div>
                </Popper>
            </If>
        </>
    );
}

const DummyPopper = forwardRef((props, ref) => (
    <PureDummyPopper { ...props } forwardedRef={ref} />
));

function createPopper(props = {}) {
    return <DummyPopper {...props} />;
}

// ***** Refs *****

test("when wrapped, ref is a DOM element", async () => {
    const ref = createRef();

    render(
        createPopper({
            ref
        })
    );

    await wait();

    expect(ref.current).not.toBeNull();
    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("DIV");
    expect(ref.current.getAttribute("data-testid")).toBe("popper-wrapper");
});

test("when wrapped, using a callback ref, ref is a DOM element", async () => {
    let refNode = null;

    render(
        createPopper({
            ref: node => {
                refNode = node;
            }
        })
    );

    await wait();

    expect(refNode).not.toBeNull();
    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("DIV");
    expect(refNode.getAttribute("data-testid")).toBe("popper-wrapper");
});

test("when not wrapped, ref is a DOM element", async () => {
    const ref = createRef();

    render(
        createPopper({
            noWrap: true,
            ref
        })
    );

    await wait();

    expect(ref.current).not.toBeNull();
    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("DIV");
    expect(ref.current.getAttribute("data-testid")).not.toBe("popper-wrapper");
});

test("when not wrapped and using a callback ref, ref is a DOM element", async () => {
    let refNode = null;

    render(
        createPopper({
            noWrap: true,
            ref: node => {
                refNode = node;
            }
        })
    );

    await wait();

    expect(refNode).not.toBeNull();
    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("DIV");
    expect(refNode.getAttribute("data-testid")).not.toBe("popper-wrapper");
});
