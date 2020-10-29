import { createChainedFunction } from "@react-components/shared";

test("return func when no arguments", () => {
    expect(typeof(createChainedFunction())).toBe("function");
});

// test("return original function when single function is provided", () => {
//     const func = jest.fn();

//     expect(createChainedFunction(func)).toBe(func);
// });

test("wraps two functions with another that invokes both when called", () => {
    const func1 = jest.fn();
    const func2 = jest.fn();

    const chained = createChainedFunction(func1, func2);

    expect(func1).not.toHaveBeenCalled();
    expect(func2).not.toHaveBeenCalled();

    chained();

    expect(func1).toHaveBeenCalled();
    expect(func2).toHaveBeenCalled();
});

test("wraps multiple functions and invokes them in the order provided", () => {
    const results = [];
    const func1 = () => results.push(1);
    const func2 = () => results.push(2);
    const func3 = () => results.push(3);

    const chained = createChainedFunction(func1, func2, func3);

    chained();

    expect(results).toEqual([1, 2, 3]);
});

test("forwards arguments to all chained functions", () => {
    const arg1 = "SpaceX";
    const arg2 = "Won the race!";

    const func1 = jest.fn();
    const func2 = jest.fn();

    const chained = createChainedFunction(func1, func2);

    chained(arg1, arg2);

    [func1, func2].forEach(x => {
        expect(x).toHaveBeenCalledWith(arg1, arg2);
    });
});
