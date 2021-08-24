import { mergeRefs } from "@react-components/shared";

test("can merge refs", () => {
    const func1 = jest.fn();
    const func2 = jest.fn();

    const result = mergeRefs(func1, func2);

    result({});

    expect(func1).toHaveBeenCalledTimes(1);
    expect(func2).toHaveBeenCalledTimes(1);
});

test("filter out falsy values", () => {
    const func1 = jest.fn();
    const func2 = jest.fn();

    const result = mergeRefs(func1, null, func2, undefined);

    result({});

    expect(func1).toHaveBeenCalledTimes(1);
    expect(func2).toHaveBeenCalledTimes(1);
});

