import { act, renderHook } from "@testing-library/react-hooks";
import { createRef } from "react";
import { useCombinedRefs } from "@react-components/shared";

test("when having a single ref, assign the ref on change", () => {
    const ref = jest.fn();

    const { result } = renderHook(() => useCombinedRefs(ref));

    act(() => {
        result.current("hey!");
    });

    expect(ref).toHaveBeenCalledTimes(1);
});

test("when having multiple refs, assign the ref on change", () => {
    const ref1 = jest.fn();
    const ref2 = jest.fn();

    const { result } = renderHook(() => useCombinedRefs(ref1, ref2));

    act(() => {
        result.current("hey!");
    });

    expect(ref1).toHaveBeenCalledTimes(1);
    expect(ref2).toHaveBeenCalledTimes(1);
});

test("can assign to a callback ref", () => {
    let value1;
    let value2;

    const { result } = renderHook(() => useCombinedRefs(
        x => { value1 = x; },
        x => { value2 = x; }
    ));

    act(() => {
        result.current("hey!");
    });

    expect(value1).toBe("hey!");
    expect(value2).toBe("hey!");
});

test("can assign to an object ref", () => {
    const ref1 = createRef();
    const ref2 = createRef();

    const { result } = renderHook(() => useCombinedRefs(ref1, ref2));

    act(() => {
        result.current("hey!");
    });

    expect(ref1.current).toBe("hey!");
    expect(ref2.current).toBe("hey!");
});

test("assign to new ref when ref changes", () => {
    const ref1 = jest.fn();
    const ref2 = jest.fn();
    const ref3 = jest.fn();

    const { result, rerender } = renderHook(({ refs }) => useCombinedRefs(...refs), {
        initialProps: {
            refs: [ref1, ref2]
        }
    });

    rerender({
        refs: [ref2, ref3]
    });

    act(() => {
        result.current("hey!");
    });

    expect(ref1).not.toHaveBeenCalled();
    expect(ref2).toHaveBeenCalledTimes(1);
    expect(ref3).toHaveBeenCalledTimes(1);
});

test("support current prop", () => {
    const ref1 = jest.fn();
    const ref2 = jest.fn();

    const { result } = renderHook(() => useCombinedRefs(ref1, ref2));

    act(() => {
        result.current("hey!");
    });

    expect(result.current.current).toBe("hey!");
});

test("support current prop when ref changes", () => {
    const ref1 = jest.fn();
    const ref2 = jest.fn();
    const ref3 = jest.fn();

    const { result, rerender } = renderHook(({ refs }) => useCombinedRefs(...refs), {
        initialProps: {
            refs: [ref1, ref2]
        }
    });

    act(() => {
        result.current("oh!");
    });

    rerender({
        refs: [ref2, ref3]
    });

    act(() => {
        result.current("hey!");
    });

    expect(result.current.current).toBe("hey!");
});
