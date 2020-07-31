import { mergeClasses } from "@react-components/shared";

test("can merge classes", () => {
    const result = mergeClasses(
        "w4",
        "h4",
        "outline primary"
    );

    expect(result).toBe("w4 h4 outline primary");
});

test("filter out falsy values", () => {
    const result = mergeClasses(
        "w4",
        undefined,
        null,
        false,
        "h4"
    );

    expect(result).toBe("w4 h4");
});

test("dedupe classes", () => {
    const result = mergeClasses(
        "w4",
        "h4",
        "outline h4",
        "w4"
    );

    expect(result).toBe("w4 h4 outline");
});
