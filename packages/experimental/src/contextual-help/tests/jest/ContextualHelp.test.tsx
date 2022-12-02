import { ContextualHelp } from "@experimental/contextual-help";
import { Text, Transition } from "@orbit-ui/components";
import { renderWithTheme } from "@jest-utils";
import { waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

beforeAll(() => {
    // @ts-ignore
    Transition.disableAnimation = true;
});

// ***** Refs *****
// test("ref is a DOM element", async () => {
//     const ref = createRef<HTMLElement>();

//     renderWithTheme(
//         <ContextualHelp ref={ref} >
//             Help message
//         </ContextualHelp>
//     );

//     await waitFor(() => expect(ref.current).not.toBeNull());

//     expect(ref.current instanceof HTMLElement).toBeTruthy();
//     expect(ref.current.tagName).toBe("DIV");
// });

// test("when using a callback ref, ref is a DOM element", async () => {
//     let refNode: HTMLElement = null;

//     renderWithTheme(
//         <ContextualHelp ref={node => {
//             refNode = node;
//         }}
//         >
//             Help message
//         </ContextualHelp>
//     );

//     await waitFor(() => expect(refNode).not.toBeNull());

//     expect(refNode instanceof HTMLElement).toBeTruthy();
//     expect(refNode.tagName).toBe("DIV");
// });

// test("set ref once", async () => {
//     const handler = jest.fn();

//     renderWithTheme(
//         <ContextualHelp ref={handler} >
//             Help message
//         </ContextualHelp>
//     );

//     await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
// });


// ***** Behaviors *****

test("open on ContextualHelp hover", async () => {
    const { getByTestId } = renderWithTheme(
        <ContextualHelp data-testid="trigger">
            <Text data-testid="tooltip">Content</Text>
        </ContextualHelp>
    );

    act(() => {
        // userEvent.hover() doesn't fire when the element is disabled.
        userEvent.hover(getByTestId("trigger"));
    });

    await waitFor(() => expect(getByTestId("tooltip")).toBeInTheDocument());
});

// ***** Api *****
test("call onOpenChange when the tooltip appears", async () => {
    const handler = jest.fn();

    const { getByTestId } = renderWithTheme(
        <ContextualHelp data-testid="trigger">
            <Text data-testid="tooltip">Content</Text>
        </ContextualHelp>
    );

    act(() => {
        userEvent.hover(getByTestId("trigger"));
    });

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), true));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});

test("call onOpenChange when the tooltip disappear", async () => {
    const handler = jest.fn();

    const { getByTestId } = renderWithTheme(
        <ContextualHelp data-testid="trigger">
            <Text data-testid="tooltip">Content</Text>
        </ContextualHelp>
    );

    act(() => {
        userEvent.hover(getByTestId("trigger"));
    });

    act(() => {
        userEvent.unhover(getByTestId("trigger"));
    });

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), false));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(2));
});
