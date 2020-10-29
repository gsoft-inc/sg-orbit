import { Badge } from "@react-components/badge";
import { Text } from "@react-components/text";
import { createRef } from "react";
import { forwardRef } from "react";
import { render, waitFor } from "@testing-library/react";

const SquareBadge = forwardRef(({ children, ...rest }, ref) => {
    return (
        <Badge
            {...rest}
            ref={ref}
        >
            {children}
            <div style={{ width: "45px", height: "45px" }} />
        </Badge>
    );
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef();

    render(
        <SquareBadge ref={ref}>
            <Text>100</Text>
        </SquareBadge>
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("DIV");
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode = null;

    render(
        <SquareBadge
            ref={node => {
                refNode = node;
            }}
        >
            <Text>100</Text>
        </SquareBadge>
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("DIV");
});

test("set ref once", async () => {
    const handler = jest.fn();

    render(
        <SquareBadge ref={handler}>
            <Text>100</Text>
        </SquareBadge>
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
