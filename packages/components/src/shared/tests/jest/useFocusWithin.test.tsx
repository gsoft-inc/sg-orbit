import { act, render, screen, waitFor } from "@test-utils";

import { Div } from "@components/html";
import { ReactNode } from "react";
import { useFocusWithin } from "@components/shared";
import userEvent from "@testing-library/user-event";

interface FocusWithinProps {
    onFocus?: () => void;
    onBlur?: () => void;
    disabled?: boolean;
    children?: ReactNode;
}

function FocusWithin({ onFocus, onBlur, disabled, children }: FocusWithinProps) {
    const focusWithinProps = useFocusWithin({ onFocus, onBlur, isDisabled: disabled });

    return (
        <Div {...focusWithinProps}>
            {children}
        </Div>
    );
}

test("call onFocus when a child of the element receive focus", async () => {
    const handler = jest.fn();

    render(
        <FocusWithin onFocus={handler}>
            <input type="text" data-testid="input" />
            <button type="button" data-testid="button" />
        </FocusWithin>
    );

    act(() => {
        screen.getByTestId("input").focus();
    });

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});

test("do not call onFocus again when the focus move to another child of the element", async () => {
    const handler = jest.fn();

    render(
        <FocusWithin onFocus={handler}>
            <input type="text" data-testid="input" />
            <button type="button" data-testid="button" />
        </FocusWithin>
    );

    act(() => {
        screen.getByTestId("input").focus();
    });

    act(() => {
        screen.getByTestId("button").focus();
    });

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});

test("do not call onFocus when isDisabled is true", async () => {
    const handler = jest.fn();

    render(
        <FocusWithin onFocus={handler} disabled>
            <input type="text" data-testid="input" />
            <button type="button" data-testid="button" />
        </FocusWithin>
    );

    act(() => {
        screen.getByTestId("input").focus();
    });

    await waitFor(() => expect(handler).not.toHaveBeenCalled());
});

test("call onBlur when the focus move out of the element", async () => {
    const handler = jest.fn();

    render(
        <FocusWithin onBlur={handler}>
            <input type="text" data-testid="input" />
            <button type="button" data-testid="button" />
        </FocusWithin>
    );

    act(() => {
        screen.getByTestId("input").focus();
    });

    await userEvent.click(document.body);

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});

test("do not call onBlur when the focus move to another child of the element", async () => {
    const handler = jest.fn();

    render(
        <FocusWithin onBlur={handler}>
            <input type="text" data-testid="input" />
            <button type="button" data-testid="button" />
        </FocusWithin>
    );

    act(() => {
        screen.getByTestId("input").focus();
    });

    act(() => {
        screen.getByTestId("button").focus();
    });

    await waitFor(() => expect(handler).not.toHaveBeenCalled());
});

test("do not call onBlur when isDisabled is true", async () => {
    const handler = jest.fn();

    render(
        <FocusWithin onBlur={handler} disabled>
            <input type="text" data-testid="input" />
            <button type="button" data-testid="button" />
        </FocusWithin>
    );

    act(() => {
        screen.getByTestId("input").focus();
    });

    await userEvent.click(document.body);

    await waitFor(() => expect(handler).not.toHaveBeenCalled());
});

