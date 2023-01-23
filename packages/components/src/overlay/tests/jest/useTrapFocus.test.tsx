import { UseTrapFocusOptions, useTrapFocus } from "@components/overlay";
import { screen, waitFor, renderWithTheme } from "@test-utils";
import { mergeProps, useFocusManager, useFocusScope } from "@components/shared";
import { Button } from "@components/button";
import { ComponentProps } from "react";
import { Div } from "@components/html";
import userEvent from "@testing-library/user-event";

type TrapProps = UseTrapFocusOptions & ComponentProps<"div">;

function Trap({
    children,
    isDisabled,
    ...rest
}: TrapProps) {
    const [focusScope, setFocusRef] = useFocusScope();

    const focusManager = useFocusManager(focusScope);

    useTrapFocus(focusManager, { isDisabled });

    return (
        <Div
            {...mergeProps(
                rest,
                {
                    ref: setFocusRef
                }
            )}
        >
            {children}
        </Div>
    );
}

test("move the focus to the next element of the scope on tab keypress", async () => {
    renderWithTheme(
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

    await userEvent.click(screen.getByTestId("button-2"));

    await userEvent.tab();

    await userEvent.tab();

    await waitFor(() => expect(screen.getByTestId("button-4")).toHaveFocus());

    await userEvent.tab();

    await waitFor(() => expect(screen.getByTestId("button-2")).toHaveFocus());
});

test("move the focus to the previous element of the scope on shift + tab keypress", async () => {
    renderWithTheme(
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

    await userEvent.click(screen.getByTestId("button-4"));

    await userEvent.tab({ shift: true });

    await userEvent.tab({ shift: true });

    await waitFor(() => expect(screen.getByTestId("button-2")).toHaveFocus());

    await userEvent.tab({ shift: true });

    await waitFor(() => expect(screen.getByTestId("button-4")).toHaveFocus());
});

test("when no element of the scope is focused, clicking an element outside of the scope will focus the first focusable element of the scope", async () => {
    renderWithTheme(
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

    await userEvent.click(screen.getByTestId("button-5"));

    await waitFor(() => expect(screen.getByTestId("button-2")).toHaveFocus());
});

test("when disabled, do not trap the focus", async () => {
    renderWithTheme(
        <>
            <Button>1</Button>
            <Trap isDisabled>
                <Button>2</Button>
                <Button>3</Button>
                <Button data-testid="button-4">4</Button>
            </Trap>
            <Button data-testid="button-5">5</Button>
        </>
    );

    await userEvent.click(screen.getByTestId("button-4"));

    await userEvent.tab();

    await waitFor(() => expect(screen.getByTestId("button-5")).toHaveFocus());
});
