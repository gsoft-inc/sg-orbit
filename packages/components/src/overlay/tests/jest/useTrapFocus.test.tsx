import { Box } from "@components/box";
import { Button } from "@components/button";
import { ReactNode } from "react";
import { act, waitFor } from "@testing-library/react";
import { renderWithTheme } from "@utils";
import { useFocusManager, useFocusScope } from "@components/shared";
import { useTrapFocus } from "@components/overlay";
import userEvent from "@testing-library/user-event";

function Trap({ children }: { children?: ReactNode }) {
    const [focusScope, setFocusRef] = useFocusScope();

    const focusManager = useFocusManager(focusScope);

    useTrapFocus(focusManager);

    return (
        <Box ref={setFocusRef}>
            {children}
        </Box>
    );
}

test("Move the focus to the next element of the scope on tab keypress", async () => {
    const { getByTestId } = renderWithTheme(
        <>
            <Button>1</Button>
            <Trap>
                <Button data-testid="button-2">2</Button>
                <Button data-testid="button-3">3</Button>
                <Button data-testid="button-4">4</Button>
            </Trap>
            <Button>5</Button>
        </>
    );

    act(() => {
        userEvent.click(getByTestId("button-2"));
    });

    act(() => {
        userEvent.tab();
    });

    act(() => {
        userEvent.tab();
    });

    await waitFor(() => expect(getByTestId("button-4")).toHaveFocus());

    act(() => {
        userEvent.tab();
    });

    await waitFor(() => expect(getByTestId("button-2")).toHaveFocus());
});

test("Move the focus to the previous element of the scope on shift + tab keypress", async () => {
    const { getByTestId } = renderWithTheme(
        <>
            <Button>1</Button>
            <Trap>
                <Button data-testid="button-2">2</Button>
                <Button data-testid="button-3">3</Button>
                <Button data-testid="button-4">4</Button>
            </Trap>
            <Button>5</Button>
        </>
    );

    act(() => {
        userEvent.click(getByTestId("button-4"));
    });

    act(() => {
        userEvent.tab({ shift: true });
    });

    act(() => {
        userEvent.tab({ shift: true });
    });

    await waitFor(() => expect(getByTestId("button-2")).toHaveFocus());

    act(() => {
        userEvent.tab({ shift: true });
    });

    await waitFor(() => expect(getByTestId("button-4")).toHaveFocus());
});

test("When an element of the scope is focused, clicking an element outside of the scope will focus back the last focused element", async () => {
    const { getByTestId } = renderWithTheme(
        <>
            <Button data-testid="button-1">1</Button>
            <Trap>
                <Button>2</Button>
                <Button data-testid="button-3">3</Button>
                <Button>4</Button>
            </Trap>
            <Button>5</Button>
        </>
    );

    act(() => {
        userEvent.click(getByTestId("button-3"));
    });

    act(() => {
        userEvent.click(getByTestId("button-1"));
    });

    await waitFor(() => expect(getByTestId("button-3")).toHaveFocus());
});

test("When no element of the scope is focused, clicking an element outside of the scope will focus the first focusable element of the scope", async () => {
    const { getByTestId } = renderWithTheme(
        <>
            <Button>1</Button>
            <Trap>
                <Button data-testid="button-2">2</Button>
                <Button>3</Button>
                <Button>4</Button>
            </Trap>
            <Button data-testid="button-5">5</Button>
        </>
    );

    act(() => {
        userEvent.click(getByTestId("button-5"));
    });

    await waitFor(() => expect(getByTestId("button-2")).toHaveFocus());
});
