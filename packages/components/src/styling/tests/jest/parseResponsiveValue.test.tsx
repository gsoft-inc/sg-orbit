import { parseResponsiveValue } from "@components/styling";

test("when the value is a string, return the string value", () => {
    const result = parseResponsiveValue("10px", ["lg"]);

    expect(result).toBe("10px");
});

test("when the value is numeric, return numeric value", () => {
    const result = parseResponsiveValue(10, ["lg"]);

    expect(result).toBe(10);
});

test("when the value is boolean, return the boolean value", () => {
    const result = parseResponsiveValue(true, ["lg"]);

    expect(result).toBe(true);
});

test("when the value is an object with a \"base\" prop and no props are provided for the current breakpoint, return the \"base\" prop value", () => {
    const result = parseResponsiveValue({ base: "10px" }, ["lg"]);

    expect(result).toBe("10px");
});

test("when the value is an object with an \"xs\" prop and the current breakpoint is xsmall, return the \"xs\" prop value", () => {
    const result = parseResponsiveValue({ xs: "10px" }, ["xs"]);

    expect(result).toBe("10px");
});

test("when the value is an object with a \"sm\" prop and the current breakpoint is small, return the \"sm\" prop value", () => {
    const result = parseResponsiveValue({ sm: "10px" }, ["sm"]);

    expect(result).toBe("10px");
});

test("when the value is an object with a \"md\" prop and the current breakpoint is medium, return the \"md\" prop value", () => {
    const result = parseResponsiveValue({ md: "10px" }, ["md"]);

    expect(result).toBe("10px");
});

test("when the value is an object with a \"lg\" prop and the current breakpoint is large, return the \"lg\" prop value", () => {
    const result = parseResponsiveValue({ lg: "10px" }, ["lg"]);

    expect(result).toBe("10px");
});

test("when the value is an object with an \"xl\" prop and the current breakpoint is xlarge, return the \"xl\" prop value", () => {
    const result = parseResponsiveValue({ xl: "10px" }, ["xl"]);

    expect(result).toBe("10px");
});

test("when the value is an object with an \"xl\" prop, and the current breakpoint is small, return undefined", () => {
    const result = parseResponsiveValue({ xl: "10px" }, ["sm"]);

    expect(result).toBeUndefined();
});

test("when the value is an object but not a responsive object, return the object value", () => {
    const objectValue = {
        space: "x"
    };

    const result = parseResponsiveValue(objectValue, ["lg"]);

    expect(result).toEqual(objectValue);
});

test("when the value is a React component, return the React component value", () => {
    const componentValue = <div>Space X</div>;

    const result = parseResponsiveValue(componentValue, ["lg"]);

    expect(result).toEqual(componentValue);
});

test("when the value is a responsive object with React components, return the React component matching the current breakpoint", () => {
    const componentValue = <div>Space X</div>;

    const result = parseResponsiveValue({ lg: componentValue }, ["lg"]);

    expect(result).toEqual(componentValue);
});
