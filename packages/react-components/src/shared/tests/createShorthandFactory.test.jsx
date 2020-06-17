import { TextInput } from "@react-components/text-input";
import { createShorthandFactory } from "@react-components/shared";
import { render } from "@testing-library/react";

const createShorthand = createShorthandFactory(TextInput);

test("return null when shorthand is null or undefined", () => {
    expect(createShorthand(null)).toBeNull();
    expect(createShorthand()).toBeNull();
});

test("can create from element", () => {
    const shorthand = createShorthand(<TextInput />);

    expect(shorthand).toBeDefined();
});

test("can create from element and specify additional props", () => {
    const shorthand = createShorthand(<TextInput />, {
        placeholder: "SpaceX made it!"
    });

    expect(shorthand.props.placeholder).toBe("SpaceX made it!");
});

test("creating from element won't override user props", () => {
    const shorthand = createShorthand(<TextInput placeholder="SpaceX made it!" />, {
        placeholder: "Hey!"
    });

    expect(shorthand.props.placeholder).toBe("SpaceX made it!");
});

test("can create element with additional className", () => {
    const shorthand = createShorthand(<TextInput />, {
        className: "space-x"
    });

    expect(shorthand.props.className).toBe("space-x");
});

test("creating from element will merge className", () => {
    const shorthand = createShorthand(<TextInput className="space-x" />, {
        className: "made-it"
    });

    expect(shorthand.props.className).toBe("space-x made-it");
});

test("can create from element with additional style", () => {
    const shorthand = createShorthand(<TextInput />, {
        style: {
            zIndex: 2,
            marginBottom: "2px"
        }
    });

    expect(shorthand.props.style).toStrictEqual({
        zIndex: 2,
        marginBottom: "2px"
    });
});

test("creating from element will merge style", () => {
    const shorthand = createShorthand(<TextInput style={{ marginBottom: "1px" }} />, {
        style: {
            zIndex: 2,
            marginBottom: "2px"
        }
    });

    expect(shorthand.props.style).toStrictEqual({
        marginBottom: "1px",
        zIndex: 2
    });
});

test("can create from element with additional handler", () => {
    const func = jest.fn();

    const shorthand = createShorthand(<TextInput />, {
        onClick: func
    });

    shorthand.props.onClick();

    expect(func).toHaveBeenCalledTimes(1);
});

test("creating from element will merge handlers", () => {
    const func1 = jest.fn();
    const func2 = jest.fn();

    const shorthand = createShorthand(<TextInput onClick={func1} />, {
        onClick: func2
    });

    shorthand.props.onClick();

    expect(func1).toHaveBeenCalledTimes(1);
    expect(func2).toHaveBeenCalledTimes(1);
});

test("can create from element with additional ref", () => {
    const func = jest.fn();

    render(createShorthand(<TextInput />, {
        ref: func
    }));

    expect(func).toHaveBeenCalledTimes(1);
});

test("creating from element can merge refs", () => {
    const func1 = jest.fn();
    const func2 = jest.fn();

    render(createShorthand(<TextInput ref={func1} />, {
        ref: func2
    }));

    expect(func1).toHaveBeenCalledTimes(1);
    expect(func2).toHaveBeenCalledTimes(1);
});

//////////////////////

test("can create from object", () => {
    const shorthand = createShorthand({});

    expect(shorthand).toBeDefined();
});

test("can create from object and specify additional props", () => {
    const shorthand = createShorthand({}, {
        placeholder: "SpaceX made it!"
    });

    expect(shorthand.props.placeholder).toBe("SpaceX made it!");
});

test("creating from object won't override user props", () => {
    const shorthand = createShorthand({ placeholder: "SpaceX made it!" }, {
        placeholder: "Hey!"
    });

    expect(shorthand.props.placeholder).toBe("SpaceX made it!");
});

test("can create object with additional className", () => {
    const shorthand = createShorthand({}, {
        className: "space-x"
    });

    expect(shorthand.props.className).toBe("space-x");
});

test("creating from object will merge className", () => {
    const shorthand = createShorthand({ className: "space-x" }, {
        className: "made-it"
    });

    expect(shorthand.props.className).toBe("space-x made-it");
});

test("can create from object with additional style", () => {
    const shorthand = createShorthand({}, {
        style: {
            zIndex: 2,
            marginBottom: "2px"
        }
    });

    expect(shorthand.props.style).toStrictEqual({
        zIndex: 2,
        marginBottom: "2px"
    });
});

test("creating from object will merge style", () => {
    const shorthand = createShorthand({ style: { marginBottom: "1px" } }, {
        style: {
            zIndex: 2,
            marginBottom: "2px"
        }
    });

    expect(shorthand.props.style).toStrictEqual({
        marginBottom: "1px",
        zIndex: 2
    });
});

test("can create from object with additional handler", () => {
    const func = jest.fn();

    const shorthand = createShorthand({}, {
        onClick: func
    });

    shorthand.props.onClick();

    expect(func).toHaveBeenCalledTimes(1);
});

test("creating from object will merge handlers", () => {
    const func1 = jest.fn();
    const func2 = jest.fn();

    const shorthand = createShorthand({ onClick: func1 }, {
        onClick: func2
    });

    shorthand.props.onClick();

    expect(func1).toHaveBeenCalledTimes(1);
    expect(func2).toHaveBeenCalledTimes(1);
});

test("can create from object with additional ref", () => {
    const func = jest.fn();

    render(createShorthand({}, {
        ref: func
    }));

    expect(func).toHaveBeenCalledTimes(1);
});

test("creating from object can merge refs", () => {
    const func1 = jest.fn();
    const func2 = jest.fn();

    render(createShorthand({ ref: func1 }, {
        ref: func2
    }));

    expect(func1).toHaveBeenCalledTimes(1);
    expect(func2).toHaveBeenCalledTimes(1);
});

//////////////////////

test("merged handler is the same when handlers doesn't change", () => {
    const func1 = jest.fn();
    const func2 = jest.fn();

    const shorthand1 = createShorthand(<TextInput onClick={func1} />, {
        onClick: func2
    });

    const shorthand2 = createShorthand(<TextInput onClick={func1} />, {
        onClick: func2
    });

    expect(shorthand1.props.onClick).toBe(shorthand2.props.onClick);
});

test("merged handler update when user handler change", () => {
    const func1 = jest.fn();
    const func2 = jest.fn();

    const shorthand1 = createShorthand(<TextInput onClick={func1} />, {
        onClick: func2
    });

    const shorthand2 = createShorthand(<TextInput onClick={() => {}} />, {
        onClick: func2
    });

    const shorthand3 = createShorthand(<TextInput onClick={func1} />, {
        onClick: func2
    });

    expect(shorthand1.props.onClick).not.toBe(shorthand2.props.onClick);
    expect(shorthand1.props.onClick).toBe(shorthand3.props.onClick);
});

test("merged ref is the same when refs doesn't change", () => {
    const func1 = jest.fn();
    const func2 = jest.fn();

    const shorthand1 = createShorthand(<TextInput ref={func1} />, {
        ref: func2
    });

    const shorthand2 = createShorthand(<TextInput ref={func1} />, {
        ref: func2
    });

    expect(shorthand1.ref).toBe(shorthand2.ref);
});

test("merged ref update when user ref change", () => {
    const func1 = jest.fn();
    const func2 = jest.fn();

    const shorthand1 = createShorthand(<TextInput ref={func1} />, {
        ref: func2
    });

    const shorthand2 = createShorthand(<TextInput ref={() => {}} />, {
        ref: func2
    });

    const shorthand3 = createShorthand(<TextInput ref={func1} />, {
        ref: func2
    });

    expect(shorthand1.ref).not.toBe(shorthand2.ref);
    expect(shorthand1.ref).toBe(shorthand3.ref);
});
