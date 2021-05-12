import { Button } from "@react-components/button";
import { Toolbar } from "@react-components/toolbar";
import { createRef } from "react";
import { render, waitFor } from "@testing-library/react";

// ***** Behaviors *****

test("first element is tabbable", async () => {
    const { getByTestId } = render(
        <Toolbar>
            <Button data-testid="element-1">1</Button>
            <Button data-testid="element-2">2</Button>
        </Toolbar>
    );

    await waitFor(() => expect(getByTestId("element-1")).toHaveAttribute("tabindex", "0"));
    await waitFor(() => expect(getByTestId("element-2")).toHaveAttribute("tabindex", "-1"));
});

test("a disabled element is not tabbable", async () => {
    const { getByTestId } = render(
        <Toolbar>
            <Button disabled data-testid="element-1">1</Button>
            <Button data-testid="element-2">2</Button>
        </Toolbar>
    );

    await waitFor(() => expect(getByTestId("element-1")).not.toHaveAttribute("tabindex"));
    await waitFor(() => expect(getByTestId("element-2")).toHaveAttribute("tabindex", "0"));
});

// ***** Aria *****

test("a toolbar have the \"toolbar\" role", async () => {
    const { getByTestId } = render(
        <Toolbar data-testid="toolbar">
            <Button>1</Button>
            <Button>2</Button>
        </Toolbar>
    );

    await waitFor(() => expect(getByTestId("toolbar")).toHaveAttribute("role", "toolbar"));
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef();

    render(
        <Toolbar ref={ref}><div>Hey!</div></Toolbar>
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    await waitFor(() => expect(ref.current instanceof HTMLElement).toBeTruthy());
    await waitFor(() => expect(ref.current.tagName).toBe("DIV"));
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode = null;

    render(
        <Toolbar
            ref={node => {
                refNode = node;
            }}
        >
            <div>Hey!</div>
        </Toolbar>
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    await waitFor(() => expect(refNode instanceof HTMLElement).toBeTruthy());
    await waitFor(() => expect(refNode.tagName).toBe("DIV"));
});

test("set ref once", async () => {
    const handler = jest.fn();

    render(
        <Toolbar ref={handler}>
            <div>Hey!</div>
        </Toolbar>
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
