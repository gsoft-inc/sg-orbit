import { Count } from "@react-components/count";
import { createRef } from "react";
import { render } from "@testing-library/react";

function createCount(props) {
    return <Count {...props}>6</Count>;
}

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef();

    render(
        createCount({
            ref
        })
    );

    expect(ref.current).not.toBeNull();
    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("SPAN");
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode = null;

    render(
        createCount({
            ref: node => {
                refNode = node;
            }
        })
    );

    expect(refNode).not.toBeNull();
    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("SPAN");
});

test("set ref once", async () => {
    const handler = jest.fn();

    render(
        createCount({
            ref: handler
        })
    );

    expect(handler).toHaveBeenCalledTimes(1);
});
