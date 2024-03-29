import { ContextualHelp } from "@experimental/contextual-help";
import { Text, Transition } from "@sharegate/orbit-ui";
import { renderWithTheme, waitFor, screen } from "@test-utils";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";

beforeAll(() => {
    // @ts-ignore
    Transition.disableAnimation = true;
});

// ***** Refs *****
test("ref is a DOM element", async () => {
    const ref = createRef<HTMLElement>();

    renderWithTheme(
        <ContextualHelp data-testid="trigger" ref={ref}>
            Content
        </ContextualHelp>
    );

    await userEvent.hover(screen.getByTestId("trigger"));

    await waitFor(() => expect(ref.current).not.toBeNull());

    await waitFor(() => expect(ref.current instanceof SVGSVGElement).toBeTruthy());
    await waitFor(() => expect(ref.current.tagName).toBe("svg"));
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode: HTMLElement = null;

    renderWithTheme(
        <ContextualHelp
            data-testid="trigger"
            ref={node => {
                refNode = node;
            }}
        >
            Content
        </ContextualHelp>
    );

    await userEvent.hover(screen.getByTestId("trigger"));

    await waitFor(() => expect(refNode).not.toBeNull());

    await waitFor(() => expect(refNode instanceof SVGSVGElement).toBeTruthy());
    await waitFor(() => expect(refNode.tagName).toBe("svg"));
});

test("set ref once", async () => {
    const handler = jest.fn();

    renderWithTheme(
        <ContextualHelp data-testid="trigger" ref={handler}>
            Content
        </ContextualHelp>
    );

    await userEvent.hover(screen.getByTestId("trigger"));

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});


// ***** Behaviors *****
test("open on ContextualHelp hover", async () => {
    renderWithTheme(
        <ContextualHelp data-testid="trigger">
            <Text data-testid="tooltip">Content</Text>
        </ContextualHelp>
    );

    await userEvent.hover(screen.getByTestId("trigger"));

    expect(await screen.findByTestId("tooltip")).toBeInTheDocument();
});

// ***** Api *****
test("call onOpenChange when the tooltip appears", async () => {
    const handler = jest.fn();

    renderWithTheme(
        <ContextualHelp
            data-testid="trigger"
            tooltipTriggerProps={{
                onOpenChange:handler
            }}
        >
            <Text data-testid="tooltip">Content</Text>
        </ContextualHelp>
    );

    await userEvent.hover(screen.getByTestId("trigger"));

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), true));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});

test("call onOpenChange when the tooltip disappear", async () => {
    const handler = jest.fn();

    renderWithTheme(
        <ContextualHelp
            data-testid="trigger"
            tooltipTriggerProps={{
                onOpenChange:handler
            }}
        >
            <Text data-testid="tooltip">Content</Text>
        </ContextualHelp>
    );

    await userEvent.hover(screen.getByTestId("trigger"));

    await userEvent.unhover(screen.getByTestId("trigger"));

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), false));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(2));
});
