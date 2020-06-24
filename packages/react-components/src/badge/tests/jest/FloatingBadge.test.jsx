import { FloatingBadge } from "@react-components/badge";
import { createRef } from "react";
import { render, waitFor } from "@testing-library/react";

function BadgedRedSquare({ props }) {
    return (
        <FloatingBadge
            {...props}
            badge={<Badge dot />}
        >
            <div className="bg-red" style={{ width: "35px", height: "35px" }}></div>
        </FloatingBadge>
    );
}

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef();

    render(
        <BadgedRedSquare ref={ref} />
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("SPAN");
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode = null;

    render(
        <Badge
            ref={node => {
                refNode = node;
            }}
        />
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("SPAN");
});

test("set ref once", async () => {
    const handler = jest.fn();

    render(
        <Badge ref={handler} />
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
