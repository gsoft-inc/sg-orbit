import { act, renderHook } from "@testing-library/react-hooks";
import { useAutoControlledState } from "@react-components/shared";

// ***** State from props *****

test("state contains controlled prop value when a controlled prop value is provided, ", () => {
    const autoControlledProps = {
        open: false
    };

    const componentProps = {
        open: true
    };

    const { result } = renderHook(() => useAutoControlledState(autoControlledProps, componentProps));

    expect(result.current.autoControlledState.open).toBeTruthy();
});

test("state contains default prop value when no controlled prop value is provided but a default prop value is provided", () => {
    const autoControlledProps = {
        open: false
    };

    const componentProps = {
        defaultOpen: true
    };

    const { result } = renderHook(() => useAutoControlledState(autoControlledProps, componentProps));

    expect(result.current.autoControlledState.open).toBeTruthy();
});

test("state contains default value when no controlled prop value and no default prop value are provided", () => {
    const autoControlledProps = {
        open: false
    };

    const { result } = renderHook(() => useAutoControlledState(autoControlledProps, {}));

    expect(result.current.autoControlledState.open).toBeFalsy();
});

test("state always contains a value for all auto controlled props", () => {
    const autoControlledProps = {
        open: false,
        values: []
    };

    const { result } = renderHook(() => useAutoControlledState(autoControlledProps, {}));

    expect(result.current.autoControlledState.open).toBeDefined();
    expect(result.current.autoControlledState.values).toBeDefined();
});

test("state is unchanged when a subsequent run is made with the same values", () => {
    const autoControlledProps = {
        open: false,
        values: []
    };

    const componentProps = {
        open: true
    };

    const { result, rerender } = renderHook(() => useAutoControlledState(autoControlledProps, componentProps));

    expect(result.current.autoControlledState.open).toBeTruthy();
    expect(result.current.autoControlledState.values).toEqual(autoControlledProps.values);

    rerender();

    expect(result.current.autoControlledState.open).toBeTruthy();
    expect(result.current.autoControlledState.values).toEqual(autoControlledProps.values);
});

test("support multiple controlled props", () => {
    const autoControlledProps = {
        open: false,
        values: []
    };

    const componentProps = {
        open: true,
        values: ["Neil Armstrong"]
    };

    const { result } = renderHook(() => useAutoControlledState(autoControlledProps, componentProps));

    expect(result.current.autoControlledState.open).toBeTruthy();
    expect(result.current.autoControlledState.values).toEqual(componentProps.values);
});

test("support multiple default props", () => {
    const autoControlledProps = {
        open: false,
        values: []
    };

    const componentProps = {
        defaultOpen: true,
        defaultValues: ["Neil Armstrong"]
    };

    const { result } = renderHook(() => useAutoControlledState(autoControlledProps, componentProps));

    expect(result.current.autoControlledState.open).toBeTruthy();
    expect(result.current.autoControlledState.values).toEqual(componentProps.defaultValues);
});

test("support mixing controlled props, default props and default values", () => {
    const autoControlledProps = {
        open: false,
        values: [],
        focus: false
    };

    const componentProps = {
        open: true,
        defaultValues: ["Neil Armstrong"]
    };

    const { result } = renderHook(() => useAutoControlledState(autoControlledProps, componentProps));

    expect(result.current.autoControlledState.open).toBeTruthy();
    expect(result.current.autoControlledState.values).toBe(componentProps.defaultValues);
    expect(result.current.autoControlledState.focus).toBe(autoControlledProps.focus);
});

test("state contains the new value when a new controlled prop value is provided on a subsequent run", () => {
    const autoControlledProps = {
        open: false
    };

    const { result, rerender } = renderHook(({ componentProps }) => useAutoControlledState(autoControlledProps, componentProps), {
        initialProps: {
            componentProps: {
                open: true
            }
        }
    });

    expect(result.current.autoControlledState.open).toBeTruthy();

    rerender({
        componentProps: {
            open: false
        }
    });

    expect(result.current.autoControlledState.open).toBeFalsy();
});

test("throw an error when a controlled prop value is not provided on the first run but is provided on a subsequent run", () => {
    const autoControlledProps = {
        open: false
    };

    const { result, rerender } = renderHook(({ componentProps }) => useAutoControlledState(autoControlledProps, componentProps), {
        initialProps: {
            componentProps: {}
        }
    });

    rerender({
        componentProps: {
            open: true
        }
    });

    expect(result.error.message).toContain("useAutoControlledProps.ensureControlledPropsHaveNotChanged");
});

test("throw an error when a controlled prop value value and a default prop value are provided for the same auto controlled prop", () => {
    const autoControlledProps = {
        open: false
    };

    const componentProps = {
        open: true,
        defaultOpen: true
    };

    const { result } = renderHook(() => useAutoControlledState(autoControlledProps, componentProps));

    expect(result.error.message).toContain("useAutoControlledState.computeNewState");
});

test("default prop value doesn't override state on subsequent runs", () => {
    const autoControlledProps = {
        open: false
    };

    const { result, rerender } = renderHook(({ componentProps }) => useAutoControlledState(autoControlledProps, componentProps), {
        initialProps: {
            componentProps: {
                defaultOpen: true
            }
        }
    });

    expect(result.current.autoControlledState.open).toBeTruthy();

    act(() => {
        result.current.setAutoControlledState({
            open: false
        });
    });

    expect(result.current.autoControlledState.open).toBeFalsy();

    rerender({
        componentProps: {}
    });

    expect(result.current.autoControlledState.open).toBeFalsy();
});

test("default value doesn't override state on subsequent runs", () => {
    const autoControlledProps = {
        open: false
    };

    const { result, rerender } = renderHook(() => useAutoControlledState(autoControlledProps, {}));

    expect(result.current.autoControlledState.open).toBeFalsy();

    act(() => {
        result.current.setAutoControlledState({
            open: true
        });
    });

    expect(result.current.autoControlledState.open).toBeTruthy();

    rerender();

    expect(result.current.autoControlledState.open).toBeTruthy();
});

// ***** setAutoControlledState *****

test("setting a new value for an uncontrolled prop update the state with the new value", () => {
    const autoControlledProps = {
        open: false
    };

    const { result } = renderHook(() => useAutoControlledState(autoControlledProps, {}));

    act(() => {
        result.current.setAutoControlledState({
            open: true
        });
    });

    expect(result.current.autoControlledState.open).toBeTruthy();
});

test("setting a new value for a controlled prop doesn't update the state", () => {
    const autoControlledProps = {
        open: false
    };

    const componentProps = {
        open: false
    };

    const { result } = renderHook(() => useAutoControlledState(autoControlledProps, componentProps));

    act(() => {
        result.current.setAutoControlledState({
            open: true
        });
    });

    expect(result.current.autoControlledState.open).toBeFalsy();
});

test("can set multiple uncontrolled props values in the same call", () => {
    const autoControlledProps = {
        open: false,
        values: []
    };

    const { result } = renderHook(() => useAutoControlledState(autoControlledProps, {}));

    act(() => {
        result.current.setAutoControlledState({
            open: true,
            values: ["Neil Armstrong"]
        });
    });

    expect(result.current.autoControlledState.open).toBeTruthy();
    expect(result.current.autoControlledState.values).toEqual(["Neil Armstrong"]);
});

test("can set values for uncontrolled and controlled props in the same call", () => {
    const autoControlledProps = {
        open: false,
        values: []
    };

    const componentProps = {
        open: false
    };

    const { result } = renderHook(() => useAutoControlledState(autoControlledProps, componentProps));

    act(() => {
        result.current.setAutoControlledState({
            open: true,
            values: ["Neil Armstrong"]
        });
    });

    expect(result.current.autoControlledState.open).toBeFalsy();
    expect(result.current.autoControlledState.values).toEqual(["Neil Armstrong"]);
});

test("setting a new value for an uncontrolled prop doesn't update the other values of the state", () => {
    const autoControlledProps = {
        open: false,
        values: []
    };

    const { result } = renderHook(() => useAutoControlledState(autoControlledProps, {}));

    act(() => {
        result.current.setAutoControlledState({
            open: true
        });
    });

    act(() => {
        result.current.setAutoControlledState({
            values: ["Neil Armstrong"]
        });
    });

    expect(result.current.autoControlledState.open).toBeTruthy();
    expect(result.current.autoControlledState.values).toEqual(["Neil Armstrong"]);
});

// ***** onChange *****

test("call onChange on first run", () => {
    const autoControlledProps = {
        open: false
    };

    let callCount = 0;
    let lastState;
    let lastIsInitialState;

    renderHook(() => useAutoControlledState(autoControlledProps, {}, {}, (state, isInitialState) => {
        callCount++;
        lastState = state;
        lastIsInitialState = isInitialState;
    }));

    expect(callCount).toBe(1);
    expect(lastState.open).toBeFalsy();
    expect(lastIsInitialState).toBeTruthy();
});

test("call onChange when a new value is provided for a controlled prop", () => {
    const autoControlledProps = {
        open: false
    };

    let callCount = 0;
    let lastState;
    let lastIsInitialState;

    const { rerender } = renderHook(({ componentProps }) => useAutoControlledState(autoControlledProps, componentProps, {}, (state, isInitialState) => {
        callCount++;
        lastState = state;
        lastIsInitialState = isInitialState;
    }), {
        initialProps: {
            componentProps: {
                open: false
            }
        }
    });

    rerender({
        componentProps: {
            open: true
        }
    });

    expect(callCount).toBe(2);
    expect(lastState.open).toBeTruthy();
    expect(lastIsInitialState).toBeFalsy();
});

test("don't call onChange when a new value is set for a controlled prop", () => {
    const autoControlledProps = {
        open: false
    };

    const componentProps = {
        open: false
    };

    let callCount = 0;

    const { result } = renderHook(() => useAutoControlledState(autoControlledProps, componentProps, {}, () => {
        callCount++;
    }));

    act(() => {
        result.current.setAutoControlledState({
            open: true
        });
    });

    expect(callCount).toBe(1);
});

test("call onChange when a new value is set for an uncontrolled prop", () => {
    const autoControlledProps = {
        open: false
    };

    let callCount = 0;
    let lastState;
    let lastIsInitialState;

    const { result } = renderHook(() => useAutoControlledState(autoControlledProps, {}, {}, (state, isInitialState) => {
        callCount++;
        lastState = state;
        lastIsInitialState = isInitialState;
    }));

    act(() => {
        result.current.setAutoControlledState({
            open: true
        });
    });

    expect(callCount).toBe(2);
    expect(lastState.open).toBeTruthy();
    expect(lastIsInitialState).toBeFalsy();
});
