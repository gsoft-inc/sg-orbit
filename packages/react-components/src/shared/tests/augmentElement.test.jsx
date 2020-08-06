import { TextInput } from "@react-components/input";
import { augmentElement } from "@react-components/shared";
import { render } from "@testing-library/react";

test("can specify additional props", () => {
    const element = augmentElement(<TextInput />, {
        placeholder: "SpaceX made it!"
    });

    expect(element.props.placeholder).toBe("SpaceX made it!");
});

test("won't override user props", () => {
    const element = augmentElement(<TextInput placeholder="SpaceX made it!" />, {
        placeholder: "Hey!"
    });

    expect(element.props.placeholder).toBe("SpaceX made it!");
});

test("can specify additional className", () => {
    const element = augmentElement(<TextInput />, {
        className: "space-x"
    });

    expect(element.props.className).toBe("space-x");
});

test("can merge className", () => {
    const element = augmentElement(<TextInput className="space-x" />, {
        className: "made-it"
    });

    expect(element.props.className).toBe("space-x made-it");
});

test("can specify additional style", () => {
    const element = augmentElement(<TextInput />, {
        style: {
            zIndex: 2,
            marginBottom: "2px"
        }
    });

    expect(element.props.style).toStrictEqual({
        zIndex: 2,
        marginBottom: "2px"
    });
});

test("can merge style", () => {
    const element = augmentElement(<TextInput style={{ marginBottom: "1px" }} />, {
        style: {
            zIndex: 2,
            marginBottom: "2px"
        }
    });

    expect(element.props.style).toStrictEqual({
        marginBottom: "1px",
        zIndex: 2
    });
});

test("can specify additional handler", () => {
    const func = jest.fn();

    const element = augmentElement(<TextInput />, {
        onClick: func
    });

    element.props.onClick();

    expect(func).toHaveBeenCalledTimes(1);
});

test("can merge handlers", () => {
    const func1 = jest.fn();
    const func2 = jest.fn();

    const element = augmentElement(<TextInput onClick={func1} />, {
        onClick: func2
    });

    element.props.onClick();

    expect(func1).toHaveBeenCalledTimes(1);
    expect(func2).toHaveBeenCalledTimes(1);
});

test("can specify additional ref", () => {
    const func = jest.fn();

    render(augmentElement(<TextInput />, {
        ref: func
    }));

    expect(func).toHaveBeenCalledTimes(1);
});

test("can merge refs", () => {
    const func1 = jest.fn();
    const func2 = jest.fn();

    render(augmentElement(<TextInput ref={func1} />, {
        ref: func2
    }));

    expect(func1).toHaveBeenCalledTimes(1);
    expect(func2).toHaveBeenCalledTimes(1);
});

test("merged handler is the same when handlers doesn't change", () => {
    const func1 = jest.fn();
    const func2 = jest.fn();

    const element1 = augmentElement(<TextInput onClick={func1} />, {
        onClick: func2
    });

    const element2 = augmentElement(<TextInput onClick={func1} />, {
        onClick: func2
    });

    expect(element1.props.onClick).toBe(element2.props.onClick);
});

test("merged handler update when user handler change", () => {
    const func1 = jest.fn();
    const func2 = jest.fn();

    const element1 = augmentElement(<TextInput onClick={func1} />, {
        onClick: func2
    });

    const element2 = augmentElement(<TextInput onClick={() => {}} />, {
        onClick: func2
    });

    const element3 = augmentElement(<TextInput onClick={func1} />, {
        onClick: func2
    });

    expect(element1.props.onClick).not.toBe(element2.props.onClick);
    expect(element1.props.onClick).toBe(element3.props.onClick);
});

test("merged ref is the same when refs doesn't change", () => {
    const func1 = jest.fn();
    const func2 = jest.fn();

    const element1 = augmentElement(<TextInput ref={func1} />, {
        ref: func2
    });

    const element2 = augmentElement(<TextInput ref={func1} />, {
        ref: func2
    });

    expect(element1.ref).toBe(element2.ref);
});

test("merged ref update when user ref change", () => {
    const func1 = jest.fn();
    const func2 = jest.fn();

    const element1 = augmentElement(<TextInput ref={func1} />, {
        ref: func2
    });

    const element2 = augmentElement(<TextInput ref={() => {}} />, {
        ref: func2
    });

    const element3 = augmentElement(<TextInput ref={func1} />, {
        ref: func2
    });

    expect(element1.ref).not.toBe(element2.ref);
    expect(element1.ref).toBe(element3.ref);
});
