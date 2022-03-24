import { renderHook } from "@testing-library/react-hooks";
import { useMoveStylingPropsToWrapper } from "@components/input";

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

    expect(result.current.style).toBeUndefined();
    expect(result.current.wrapperProps.style).toEqual(styleProp);
});

test("when the input have styled props outputting classes, return the styled props resulting className value as a wrapper prop", () => {
    const { result } = renderHook(() => useMoveStylingPropsToWrapper({ borderHover: "1px solid red" }, {}));

    expect(result.current.className).toBeUndefined();
    expect(result.current.wrapperProps.className).toBe("o-ui-b-hover");
});

test("when the input have styled props outputting style values, return the styled props resulting values as a wrapper prop", () => {
    const { result } = renderHook(() => useMoveStylingPropsToWrapper({ marginTop: 10 }, {}));

    expect(result.current.style).toBeUndefined();

    expect(result.current.wrapperProps.style).toEqual({
        marginTop: "var(--o-ui-sp-10)"
    });
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

    expect(result.current.style).toBeUndefined();
    expect(result.current.wrapperProps.style).toEqual(styleProp);
});

test("when the input wrapper have a className prop and the context props have a className prop, return the merged value as as wrapper prop", () => {
    const { result } = renderHook(() => useMoveStylingPropsToWrapper({ wrapperProps: { className: "earth" } }, { className: "saturn" }));

    expect(result.current.className).toBeUndefined();
    expect(result.current.wrapperProps.className).toBe("earth saturn");
});

test("when the input wrapper have a style prop and the context prop have a style prop, return the merged value as a wrapper prop", () => {
    const wrapperStyleProp = {
        border: "1px solid red"
    };

    const contextStyleProp = {
        color: "blue"
    };

    const { result } = renderHook(() => useMoveStylingPropsToWrapper({ wrapperProps: { style: wrapperStyleProp } }, { style: contextStyleProp }));

    expect(result.current.style).toBeUndefined();

    expect(result.current.wrapperProps.style).toEqual({
        ...wrapperStyleProp,
        ...contextStyleProp
    });
});

test("when the input have styled props outputting classes and also have a wrapper className prop, return the merged value as a wrapper prop", () => {
    const { result } = renderHook(() => useMoveStylingPropsToWrapper({ borderHover: "1px solid red", wrapperProps: { className: "earth" } }, {}));

    expect(result.current.className).toBeUndefined();
    expect(result.current.wrapperProps.className).toBe("earth o-ui-b-hover");
});

test("when the input have styled props outputting style values and also have a wrapper style prop, return the merged value as a wrapper prop", () => {
    const wrapperStyleProp = {
        border: "1px solid red"
    };

    const { result } = renderHook(() => useMoveStylingPropsToWrapper({ marginTop: 10, wrapperProps: { style: wrapperStyleProp } }, {}));

    expect(result.current.style).toBeUndefined();

    expect(result.current.wrapperProps.style).toEqual({
        ...wrapperStyleProp,
        marginTop: "var(--o-ui-sp-10)"
    });
});

test("when the input have styled props outputting classes and the context props have a className prop, return the merged value as a wrapper prop", () => {
    const { result } = renderHook(() => useMoveStylingPropsToWrapper({ borderHover: "1px solid red" }, { className: "earth" }));

    expect(result.current.className).toBeUndefined();
    expect(result.current.wrapperProps.className).toBe("o-ui-b-hover earth");
});

test("when the input have styled props outputting style values and the context prop have a style prop, return the merged value as a wrapper prop", () => {
    const contextStyleProp = {
        border: "1px solid red"
    };

    const { result } = renderHook(() => useMoveStylingPropsToWrapper({ marginTop: 10 }, { style: contextStyleProp }));

    expect(result.current.style).toBeUndefined();

    expect(result.current.wrapperProps.style).toEqual({
        ...contextStyleProp,
        marginTop: "var(--o-ui-sp-10)"
    });
});

test("when the input have styled props outputting classes, the wrapper have a className prop and the context props have a className prop, return the merge value as a wrapper prop", () => {
    const { result } = renderHook(() => useMoveStylingPropsToWrapper({ borderHover: "1px solid red", wrapperProps: { className: "earth" } }, { className: "saturn" }));

    expect(result.current.className).toBeUndefined();
    expect(result.current.wrapperProps.className).toBe("earth o-ui-b-hover saturn");
});

test("when the input have styled props outputting style values, the wrapper have a style prop and the context props have a style prop, return the merge value as a wrapper prop", () => {
    const wrapperStyleProp = {
        border: "1px solid red"
    };

    const contextStyleProp = {
        border: "1px solid red"
    };

    const { result } = renderHook(() => useMoveStylingPropsToWrapper({ marginTop: 10, wrapperProps: { style: wrapperStyleProp } }, { style: contextStyleProp }));

    expect(result.current.style).toBeUndefined();

    expect(result.current.wrapperProps.style).toEqual({
        ...wrapperStyleProp,
        ...contextStyleProp,
        marginTop: "var(--o-ui-sp-10)"
    });
});

test("when the input have a className prop and the context props have a className prop, return the input className value as a root prop and the context className prop as a wrapper prop", () => {
    const { result } = renderHook(() => useMoveStylingPropsToWrapper({ className: "earth" }, { className: "saturn" }));

    expect(result.current.className).toBe("earth");
    expect(result.current.wrapperProps.className).toBe("saturn");
});



