import { act, renderHook } from "@testing-library/react-hooks";

import { useMoveStylingPropsToWrapper } from "@components/input";

/*
-
-

-
-

-
-

-
- when the input wrapper have a style prop and the context prop have a style prop, return the merge value as a wrapper prop

- when the input have styled props outputting classes and also have a wrapper className prop, return the merge value as a wrapper prop
- when the input have styled props outputting style values and also have a wrapper style prop, return the merge value as a wrapper prop

- when the input have styled props outputting classes and the context props have a className prop, return the merge value as a wrapper prop
- when the input have styled props outputting style values and the context prop have a style prop, return the merge value as a wrapper prop

- when the input have styled props outputting classes, the wrapper have a className prop and the context props have a className prop, return the merge value as a wrapper prop
- when the input have styled props outputting style values, the wrapper have a style prop and the context props have a style prop, return the merge value as a wrapper prop

- when the input have a className prop and the context props have a className prop, return the input className value as a root prop and the context className prop as a wrapper prop
- when the input have a className prop

*/

test("when the input have a className prop, return the className value as a root prop", () => {
    const { result } = renderHook(() => useMoveStylingPropsToWrapper({ className: "earth" }, {}));

    expect(result.current.className).toBe("earth");
    expect(result.current.wrapperProps).toBeUndefined();
});

test("when the input have a style prop, return the style value as a root prop", () => {
    const styleProp = {
        border: "1px solid red"
    };

    const { result } = renderHook(() => useMoveStylingPropsToWrapper({ style: styleProp }, {}));

    expect(result.current.style).toBe(styleProp);
    expect(result.current.wrapperProps).toBeUndefined();
});

test("when the input wrapper have a className prop, return the className value as a wrapper prop", () => {
    const { result } = renderHook(() => useMoveStylingPropsToWrapper({ wrapperProps: { className: "earth" } }, {}));

    expect(result.current.className).toBeUndefined();
    expect(result.current.wrapperProps.className).toBe("earth");
});

test("when the input wrapper have a style prop, return the style value as a wrapper prop", () => {
    const styleProp = {
        border: "1px solid red"
    };

    const { result } = renderHook(() => useMoveStylingPropsToWrapper({ wrapperProps: { style: styleProp } }, {}));

    expect(result.current.className).toBeUndefined();
    expect(result.current.wrapperProps.style).toEqual(styleProp);
});

test("when the input have styled props, return the styled props resulting className value as a wrapper prop", () => {
    const { result } = renderHook(() => useMoveStylingPropsToWrapper({ borderHover: "1px solid red" }, {}));

    expect(result.current.className).toBeUndefined();
    expect(result.current.wrapperProps.className).toBe("o-ui-b-hover");
});

test("when the context props have a className prop, return the className value as a wrapper prop", () => {
    const { result } = renderHook(() => useMoveStylingPropsToWrapper({}, { className: "earth" }));

    expect(result.current.className).toBeUndefined();
    expect(result.current.wrapperProps.className).toBe("earth");
});

test("when the context props have a style prop, return the styles value as a wrapper prop", () => {
    const styleProp = {
        border: "1px solid red"
    };

    const { result } = renderHook(() => useMoveStylingPropsToWrapper({}, { style: styleProp }));

    expect(result.current.className).toBeUndefined();
    expect(result.current.wrapperProps.style).toEqual(styleProp);
});

// test("when the input wrapper have a className prop and the context props have a className prop, return the merge value as as wrapper prop", () => {

// });



