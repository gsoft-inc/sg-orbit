import { Tooltip } from "@react-components/tooltip";
import { createRef, forwardRef } from "react";
import { render, waitFor } from "@testing-library/react";

function createTooltip(props = {}) {
    return <Tooltip
        content="Adds users to your feed"
        open
        trigger={<span>Add</span>}
        {...props}
    />;
}

const SimpleTooltip = forwardRef((props, ref) => {
    return (
        <Tooltip
            {...props}
            content="Adds users to your feed"
            open
            trigger={<span>Add</span>}
            ref={ref}
        />
    );
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef();

    render(
        <SimpleTooltip ref={ref} />
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("DIV");
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode = null;

    render(
        <SimpleTooltip
            ref={node => {
                refNode = node;
            }}
        />
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("DIV");
});

test("set ref once", async () => {
    const handler = jest.fn();

    render(
        <SimpleTooltip ref={handler} />
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
