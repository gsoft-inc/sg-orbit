import { adaptInputStylingProps } from "@components/input";

test("when the input have a className prop, return the className value as a root prop", () => {
    const result = adaptInputStylingProps({ className: "earth" }, {});

    expect(result.className).toBe("earth");
    expect(result.wrapperProps).toBeUndefined();
});

test("when the input have a style prop, return the style value as a root prop", () => {
    const styleProp = {
        border: "1px solid red"
    };

    const result = adaptInputStylingProps({ style: styleProp }, {});

    expect(result.style).toBe(styleProp);
    expect(result.wrapperProps).toBeUndefined();
});

test("when the input wrapper have a className prop, return the className value as a wrapper prop", () => {
    const result = adaptInputStylingProps({ wrapperProps: { className: "earth" } }, {});

    // @ts-ignore
    expect(result.className).toBeUndefined();
    expect(result.wrapperProps.className).toBe("earth");
});

test("when the input wrapper have a style prop, return the style value as a wrapper prop", () => {
    const styleProp = {
        border: "1px solid red"
    };

    const result = adaptInputStylingProps({ wrapperProps: { style: styleProp } }, {});

    // @ts-ignore
    expect(result.style).toBeUndefined();
    expect(result.wrapperProps.style).toEqual(styleProp);
});

test("when the input have a styled prop that should be rendered on the wrapper, return the styled prop as a wrapper prop", () => {
    const result = adaptInputStylingProps({ marginTop: 10 }, {});

    // @ts-ignore
    expect(result.marginTop).toBeUndefined();
    expect(result.wrapperProps.marginTop).toBe(10);
});

test("when the input have styled props that should be renderer on the input, return the styled prop as a root prop", () => {
    const result = adaptInputStylingProps({ resize: "none" }, {});

    expect(result.resize).toBe("none");
    // @ts-ignore
    expect(result.wrapperProps).toBeUndefined();
});

test("when the context props have a className prop, return the className value as a wrapper prop", () => {
    const result = adaptInputStylingProps({}, { className: "earth" });

    // @ts-ignore
    expect(result.className).toBeUndefined();
    expect(result.wrapperProps.className).toBe("earth");
});

test("when the context props have a style prop, return the styles value as a wrapper prop", () => {
    const styleProp = {
        border: "1px solid red"
    };

    const result = adaptInputStylingProps({}, { style: styleProp });

    // @ts-ignore
    expect(result.style).toBeUndefined();
    expect(result.wrapperProps.style).toEqual(styleProp);
});

test("when the input wrapper have a className prop and the context props have a className prop, return the merged value as as wrapper prop", () => {
    const result = adaptInputStylingProps({ wrapperProps: { className: "earth" } }, { className: "saturn" });

    // @ts-ignore
    expect(result.className).toBeUndefined();
    expect(result.wrapperProps.className).toBe("earth saturn");
});

test("when the input wrapper have a style prop and the context prop have a style prop, return the merged value as a wrapper prop", () => {
    const wrapperStyleProp = {
        border: "1px solid red"
    };

    const contextStyleProp = {
        color: "blue"
    };

    const result = adaptInputStylingProps({ wrapperProps: { style: wrapperStyleProp } }, { style: contextStyleProp });

    // @ts-ignore
    expect(result.style).toBeUndefined();

    expect(result.wrapperProps.style).toEqual({
        ...wrapperStyleProp,
        ...contextStyleProp
    });
});

test("when the input have a className prop and the context props have a className prop, return the input className value as a root prop and the context className prop as a wrapper prop", () => {
    const result = adaptInputStylingProps({ className: "earth" }, { className: "saturn" });

    expect(result.className).toBe("earth");
    expect(result.wrapperProps.className).toBe("saturn");
});



