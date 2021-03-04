import { CompositeKeyWeakMap, mergeProps } from "@react-components/shared";

describe("CompositeKeyWeakMap", () => {
    test("can store single key value", () => {
        const map = new CompositeKeyWeakMap();
        const key = {};

        map.set([key], "foo");

        expect(map.get([key])).toBe("foo");
    });

    test("can store composite key value", () => {
        const map = new CompositeKeyWeakMap();
        const key1 = {};
        const key2 = {};

        map.set([key1, key2], "foo");

        expect(map.get([key1, key2])).toBe("foo");
    });

    test("can have multiple composite key using the same root", () => {
        const map = new CompositeKeyWeakMap();
        const key1 = {};
        const key2 = {};
        const key3 = {};
        const key4 = {};

        map.set([key1, key2], "1");
        map.set([key1, key3], "2");
        map.set([key1, key4], "3");

        expect(map.get([key1, key2])).toBe("1");
        expect(map.get([key1, key3])).toBe("2");
        expect(map.get([key1, key4])).toBe("3");
    });

    test("a key can be be used in multiple branch", () => {
        const map = new CompositeKeyWeakMap();
        const key1 = {};
        const key2 = {};
        const key3 = {};

        map.set([key1, key2], "1");
        map.set([key2, key3], "2");

        expect(map.get([key1, key2])).toBe("1");
        expect(map.get([key2, key3])).toBe("2");
    });

    test("a node can have a value and children", () => {
        const map = new CompositeKeyWeakMap();
        const key1 = {};
        const key2 = {};
        const key3 = {};

        map.set([key1, key2, key3], "1");
        map.set([key1, key2], "2");

        expect(map.get([key1, key2, key3])).toBe("1");
        expect(map.get([key1, key2])).toBe("2");
    });
});

describe("mergeProps", () => {
    test("can specify additional props", () => {
        const result = mergeProps({}, {
            placeholder: "SpaceX made it!"
        });

        expect(result.placeholder).toBe("SpaceX made it!");
    });

    test("won't override original props", () => {
        const originalProps = {
            placeholder: "SpaceX made it!"
        };

        const result = mergeProps(originalProps, {
            placeholder: "Hey!"
        });

        expect(result.placeholder).toBe("SpaceX made it!");
    });

    test("can specify additional className", () => {
        const result = mergeProps({}, {
            className: "space-x"
        });

        expect(result.className).toBe("space-x");
    });

    test("merge className when exist on original", () => {
        const originalProps = {
            className: "space-x"
        };

        const result = mergeProps(originalProps, {
            className: "made-it"
        });

        expect(result.className).toBe("space-x made-it");
    });

    test("can specify additional style", () => {
        const result = mergeProps({}, {
            style: {
                zIndex: 2,
                marginBottom: "2px"
            }
        });

        expect(result.style).toStrictEqual({
            zIndex: 2,
            marginBottom: "2px"
        });
    });

    test("merge style when exist on original", () => {
        const originalProps = {
            style: {
                marginBottom: "1px"
            }
        };

        const result = mergeProps(originalProps, {
            style: {
                zIndex: 2,
                marginBottom: "2px"
            }
        });

        expect(result.style).toStrictEqual({
            marginBottom: "1px",
            zIndex: 2
        });
    });

    test("can specify additional handler", () => {
        const func = jest.fn();

        const result = mergeProps({}, {
            onClick: func
        });

        result.onClick();

        expect(func).toHaveBeenCalledTimes(1);
    });

    test("merge handlers when exist on original", () => {
        const func1 = jest.fn();
        const func2 = jest.fn();

        const originalProps = {
            onClick: func1
        };

        const result = mergeProps(originalProps, {
            onClick: func2
        });

        result.onClick();

        expect(func1).toHaveBeenCalledTimes(1);
        expect(func2).toHaveBeenCalledTimes(1);
    });

    test("can specify additional ref", () => {
        const func = jest.fn();

        const result = mergeProps({}, {
            ref: func
        });

        result.ref();

        expect(func).toHaveBeenCalledTimes(1);
    });

    test("merge ref when exist on original", () => {
        const func1 = jest.fn();
        const func2 = jest.fn();

        const originalProps = {
            ref: func1
        };

        const result = mergeProps(originalProps, {
            ref: func2
        });

        result.ref();

        expect(func1).toHaveBeenCalledTimes(1);
        expect(func2).toHaveBeenCalledTimes(1);
    });

    test("ignore original null ref", () => {
        const func2 = jest.fn();

        const originalProps = {
            ref: null
        };

        const result = mergeProps(originalProps, {
            ref: func2
        });

        result.ref();

        expect(func2).toHaveBeenCalledTimes(1);
    });

    test("ignore additional null ref", () => {
        const func1 = jest.fn();

        const originalProps = {
            ref: func1
        };

        const result = mergeProps(originalProps, {
            ref: null
        });

        result.ref();

        expect(func1).toHaveBeenCalledTimes(1);
    });

    test("merged handler is memoized", () => {
        const func1 = jest.fn();
        const func2 = jest.fn();

        const result1 = mergeProps({ onClick: func1 }, { onClick: func2 });
        const result2 = mergeProps({ onClick: func1 }, { onClick: func2 });

        expect(result1.onClick).toBe(result2.onClick);
    });

    test("merge handler is updated when handlers change", () => {
        const func1 = jest.fn();
        const func2 = jest.fn();
        const func3 = jest.fn();

        const result1 = mergeProps({ onClick: func1 }, { onClick: func2 });
        const result2 = mergeProps({ onClick: func2 }, { onClick: func1 });
        const result3 = mergeProps({ onClick: func1 }, { onClick: func3 });

        expect(result1.onClick).not.toBe(result2.onClick);
        expect(result1.onClick).not.toBe(result3.onClick);
    });

    test("merged ref is memoized", () => {
        const func1 = jest.fn();
        const func2 = jest.fn();

        const result1 = mergeProps({ ref: func1 }, { ref: func2 });
        const result2 = mergeProps({ ref: func1 }, { ref: func2 });

        expect(result1.ref).toBe(result2.ref);
    });

    test("merged ref is updated when refs change", () => {
        const func1 = jest.fn();
        const func2 = jest.fn();
        const func3 = jest.fn();

        const result1 = mergeProps({ ref: func1 }, { ref: func2 });
        const result2 = mergeProps({ ref: func2 }, { ref: func1 });
        const result3 = mergeProps({ ref: func1 }, { ref: func3 });

        expect(result1.ref).not.toBe(result2.ref);
        expect(result1.ref).not.toBe(result3.ref);
    });

    test("can merge multiple props objects", () => {
        const func1 = jest.fn();
        const func2 = jest.fn();
        const func3 = jest.fn();
        const func4 = jest.fn();
        const func5 = jest.fn();
        const func6 = jest.fn();

        const result = mergeProps({
            className: "space-x",
            placeholder: "SpaceX",
            onClick: func1,
            ref: func4
        }, {
            className: "made",
            placeholder: "made",
            onClick: func2,
            ref: func5
        }, {
            className: "it",
            placeholder: "it",
            onClick: func3,
            ref: func6
        });

        result.onClick();
        result.ref();

        expect(result.className).toBe("space-x made it");
        expect(result.placeholder).toBe("SpaceX");

        expect(func1).toHaveBeenCalledTimes(1);
        expect(func2).toHaveBeenCalledTimes(1);
        expect(func3).toHaveBeenCalledTimes(1);
        expect(func4).toHaveBeenCalledTimes(1);
        expect(func5).toHaveBeenCalledTimes(1);
        expect(func6).toHaveBeenCalledTimes(1);


    });
});


