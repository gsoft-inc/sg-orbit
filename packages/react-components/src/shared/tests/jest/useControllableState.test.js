import { ErrorBoundary, muteConsoleErrors } from "@utils/error-handling";
import { act, renderHook } from "@testing-library/react-hooks";
import { useControllableState } from "@react-components/shared";

// Errors in useEffect are not catch by @testing-library/react-hooks error handling code. Therefore we must catch those errors with a custom ErrorBoundary.
function withErrorBoundary(onError) {
    return {
        wrapper: ({ children }) => <ErrorBoundary onError={onError}>{children}</ErrorBoundary>
    };
}

function muteReactTestRendererConsoleErrors() {
    return muteConsoleErrors(["The above error occurred in the <TestHook> component:", "react-test-renderer.development.js"]);
}

// ***** State from props *****

test("state is the controlled value when a controlled value is provided", () => {
    const { result } = renderHook(() => useControllableState(true, undefined, false));

    expect(result.current[0]).toBeTruthy();
});

test("state is the initial value when an initial value is provided", () => {
    const { result } = renderHook(() => useControllableState(undefined, true, false));

    expect(result.current[0]).toBeTruthy();
});

test("throw an error when a controlled value and an initial value are provided", () => {
    const { result } = renderHook(() => useControllableState(true, true, false));

    expect(result.error).toBeDefined();
});

test("state is the default value when no controlled value and no initial value are provided", () => {
    const { result } = renderHook(() => useControllableState(undefined, undefined, false));

    expect(result.current[0]).toBeFalsy();
});

test("state is unchanged when a subsequent run is made with the same values", () => {
    const handler = jest.fn();

    const { result, rerender } = renderHook(() => useControllableState(true, undefined, false, { onChange: handler }));

    expect(result.current[0]).toBeTruthy();

    rerender();

    expect(result.current[0]).toBeTruthy();
    expect(handler).toHaveBeenCalledTimes(1);
});

test("state is updated when a new controlled value is provided on a subsequent run", () => {
    const handler = jest.fn();

    const { result, rerender } = renderHook(({ controlledValue }) => useControllableState(controlledValue, undefined, false, { onChange: handler }), {
        initialProps: {
            controlledValue: true
        }
    });

    expect(result.current[0]).toBeTruthy();

    rerender({
        controlledValue: false
    });

    expect(result.current[0]).toBeFalsy();
    expect(handler).toHaveBeenCalledTimes(2);
});

test("throw an error when a controlled value is not provided on the first run but is provided on a subsequent run", () => {
    let hasError = false;

    const unmuteErrors = muteReactTestRendererConsoleErrors();

    const { rerender } = renderHook(({ controlledValue }) => useControllableState(controlledValue, undefined, false), {
        initialProps: {
            controlledValue: undefined
        },
        ...withErrorBoundary(() => {
            hasError = true;
        })
    });

    rerender({
        controlledValue: true
    });

    unmuteErrors();

    expect(hasError).toBeTruthy();
});

test("throw an error when a controlled value is provided on the first run but is not provided on a subsequent run", () => {
    let hasError = false;

    const unmuteErrors = muteReactTestRendererConsoleErrors();

    const { rerender } = renderHook(({ controlledValue }) => useControllableState(controlledValue, undefined, false), {
        initialProps: {
            controlledValue: true
        },
        ...withErrorBoundary(() => {
            hasError = true;
        })
    });

    rerender({
        controlledValue: undefined
    });

    unmuteErrors();

    expect(hasError).toBeTruthy();
});

test("initial value doesn't override state on a subsequent run when in uncontrolled mode", () => {
    const { result, rerender } = renderHook(() => useControllableState(undefined, false, false));

    expect(result.current[0]).toBeFalsy();

    act(() => {
        result.current[1](true);
    });

    expect(result.current[0]).toBeTruthy();

    rerender();

    expect(result.current[0]).toBeTruthy();
});

test("default value doesn't override state on a subsequent run when in uncontrolled mode", () => {
    const { result, rerender } = renderHook(() => useControllableState(undefined, undefined, false));

    expect(result.current[0]).toBeFalsy();

    act(() => {
        result.current[1](true);
    });

    expect(result.current[0]).toBeTruthy();

    rerender();

    expect(result.current[0]).toBeTruthy();
});

// ***** setAutoControlledState *****

test("setting the value of an uncontrolled prop update the state with the new value", () => {
    const { result } = renderHook(() => useControllableState(undefined, undefined, false));

    act(() => {
        result.current[1](true);
    });

    expect(result.current[0]).toBeTruthy();
});

test("setting the value of a controlled prop doesn't update the state", () => {
    const { result } = renderHook(() => useControllableState(false, undefined, false));

    act(() => {
        result.current[1](true);
    });

    expect(result.current[0]).toBeFalsy();
});

// ***** onChange *****

test("call onChange on first run", () => {
    let callCount = 0;
    let lastState;
    let lastIsInitialState;

    renderHook(() => useControllableState(true, undefined, false, {
        onChange: (state, isInitialState) => {
            callCount++;
            lastState = state;
            lastIsInitialState = isInitialState;
        }
    }));

    expect(callCount).toBe(1);
    expect(lastState).toBeTruthy();
    expect(lastIsInitialState).toBeTruthy();
});

test("call onChange when a new value is provided for a controlled prop", () => {
    let callCount = 0;
    let lastState;

    const { rerender } = renderHook(({ controlledValue }) => useControllableState(controlledValue, undefined, false, {
        onChange: state => {
            callCount++;
            lastState = state;
        }
    }), {
        initialProps: {
            controlledValue: true
        }
    });

    rerender({
        controlledValue: false
    });

    expect(callCount).toBe(2);
    expect(lastState).toBeFalsy();
});

test("don't call onChange when a new uncontrolled value is set for a controlled prop", () => {
    const handler = jest.fn();

    const { result } = renderHook(({ controlledValue }) => useControllableState(controlledValue, undefined, false, { onChange: handler }), {
        initialProps: {
            controlledValue: true
        }
    });

    act(() => {
        result.current[1](false);
    });

    expect(handler).toHaveBeenCalledTimes(1);
});

test("call onChange when a new value is set for an uncontrolled prop", () => {
    let callCount = 0;
    let lastState;

    const { result } = renderHook(() => useControllableState(undefined, true, false, {
        onChange: state => {
            callCount++;
            lastState = state;
        }
    }));

    act(() => {
        result.current[1](false);
    });

    expect(callCount).toBe(2);
    expect(lastState).toBeFalsy();
});

test("when onChange return a value for a controlled prop, this is the new value", () => {
    let callCount = 0;

    const handler = jest.fn(state => {
        callCount++;

        return `${state} ${callCount}`;
    });

    const { result, rerender } = renderHook(({ controlledValue }) => useControllableState(controlledValue, undefined, false, { onChange: handler }), {
        initialProps: {
            controlledValue: "elon"
        }
    });

    rerender({
        controlledValue: "musk"
    });

    expect(result.current[0]).toBe("musk 2");
    expect(handler).toHaveBeenLastCalledWith(expect.anything(), { isInitial: expect.anything(), isControlled: true });
});

test("when onChange return a value for an uncontrolled prop, this is the new value", () => {
    let callCount = 0;

    const handler = jest.fn(state => {
        callCount++;

        return `${state} ${callCount}`;
    });

    const { result } = renderHook(() => useControllableState(undefined, "elon", false, { onChange: handler }));

    act(() => {
        result.current[1]("musk");
    });

    expect(result.current[0]).toBe("musk 2");
    expect(handler).toHaveBeenLastCalledWith(expect.anything(), { isInitial: expect.anything(), isControlled: false });
});

// ***** isControlled *****

test("isControlled is true when a controlled value is provided", () => {
    const { result } = renderHook(() => useControllableState(true));

    expect(result.current[2]).toBeTruthy();
});

test("isControlled is false when an initial value is provided", () => {
    const { result } = renderHook(() => useControllableState(undefined, true));

    expect(result.current[2]).toBeFalsy();
});

test("isControlled is false when no controlled value and no initial value are provided", () => {
    const { result } = renderHook(() => useControllableState(undefined, undefined));

    expect(result.current[2]).toBeFalsy();
});

