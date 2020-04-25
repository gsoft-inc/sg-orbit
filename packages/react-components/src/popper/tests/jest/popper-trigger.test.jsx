import { Button } from "@react-components/button";
import { PopperTrigger } from "@react-components/popper";
import { createRef } from "react";
import { render, wait } from "@testing-library/react";

function createPopperTrigger(popperProps = {}) {
    return (
        <PopperTrigger
            trigger={<Button />}
            toggleHandler="onClick"
            {...popperProps}
        >
            <div>Popper</div>
        </PopperTrigger>
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
