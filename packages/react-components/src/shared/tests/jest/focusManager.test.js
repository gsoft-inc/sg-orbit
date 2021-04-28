import { FocusManager } from "@react-components/shared";

class Scope {
    _elements;

    constructor(elements) {
        this._elements = elements;
    }

    get elements() {
        return this._elements;
    }

    isInScope(element) {
        return this._elements.some(x => x.contains(element));
    }
}

function getTestContainer() {
    return document.getElementById("test-container");
}

function appendToDom(...elements) {
    const container = getTestContainer();

    elements.forEach(x => {
        container.appendChild(x);
    });
}

function createInput(attributes = {}) {
    const element = document.createElement("INPUT");
    element.setAttribute("type", "text");

    Object.keys(attributes).forEach(x => {
        element.setAttribute(x, attributes[x]);
    });

    return element;
}

beforeEach(() => {
    const container = document.createElement("DIV");
    container.id = "test-container";

    document.body.appendChild(container);
});

afterEach(() => {
    document.body.removeChild(getTestContainer());
});

describe("focusFirst", () => {
    test("can focus the first element", () => {
        const elements = [
            createInput(),
            createInput(),
            createInput()
        ];

        appendToDom(...elements);

        const focusManager = new FocusManager(new Scope(elements));
        focusManager.focusFirst();

        expect(elements[0]).toHaveFocus();
    });

    test("call onFocus when the first element is focused", () => {
        const onFocus = jest.fn();

        const elements = [
            createInput(),
            createInput(),
            createInput()
        ];

        appendToDom(...elements);

        const focusManager = new FocusManager(new Scope(elements));
        focusManager.focusFirst({ onFocus });

        expect(onFocus).toHaveBeenCalledTimes(1);
        expect(onFocus).toHaveBeenCalledWith(elements[0]);
    });

    test("call onNotFound when the scope is empty", () => {
        const onNotFound = jest.fn();

        const focusManager = new FocusManager(new Scope([]));
        focusManager.focusFirst({ onNotFound });

        expect(onNotFound).toHaveBeenCalledTimes(1);
    });

    test("focus the first element when canFocus return true for the first element", () => {
        const elements = [
            createInput(),
            createInput(),
            createInput()
        ];

        appendToDom(...elements);

        const focusManager = new FocusManager(new Scope(elements));

        focusManager.focusFirst({
            canFocus: () => true
        });

        expect(elements[0]).toHaveFocus();
    });

    test("skip elements when canFocus return false for the first two elements", () => {
        const elements = [
            createInput(),
            createInput(),
            createInput()
        ];

        appendToDom(...elements);

        const focusManager = new FocusManager(new Scope(elements));

        focusManager.focusFirst({
            canFocus: x => x !== elements[0] && x !== elements[1]
        });

        expect(elements[2]).toHaveFocus();
    });

    test("call onNotFound when canFocus returns false for all the elements of the scope", () => {
        const onNotFound = jest.fn();

        const elements = [
            createInput(),
            createInput(),
            createInput()
        ];

        appendToDom(...elements);

        const focusManager = new FocusManager(new Scope(elements));

        focusManager.focusFirst({
            canFocus: () => false,
            onNotFound
        });

        expect(onNotFound).toHaveBeenCalledTimes(1);
    });
});

describe("focusLast", () => {
    test("can focus the last element", () => {
        const elements = [
            createInput(),
            createInput(),
            createInput()
        ];

        appendToDom(...elements);

        const focusManager = new FocusManager(new Scope(elements));
        focusManager.focusLast();

        expect(elements[elements.length - 1]).toHaveFocus();
    });

    test("call onFocus when the last element is focused", () => {
        const onFocus = jest.fn();

        const elements = [
            createInput(),
            createInput(),
            createInput()
        ];

        appendToDom(...elements);

        const focusManager = new FocusManager(new Scope(elements));
        focusManager.focusLast({ onFocus });

        expect(onFocus).toHaveBeenCalledTimes(1);
        expect(onFocus).toHaveBeenCalledWith(elements[elements.length - 1]);
    });

    test("call onNotFound when the scope is empty", () => {
        const onNotFound = jest.fn();

        const focusManager = new FocusManager(new Scope([]));
        focusManager.focusLast({ onNotFound });

        expect(onNotFound).toHaveBeenCalledTimes(1);
    });

    test("focus the last element when canFocus return true for the last element", () => {
        const elements = [
            createInput(),
            createInput(),
            createInput()
        ];

        appendToDom(...elements);

        const focusManager = new FocusManager(new Scope(elements));

        focusManager.focusLast({
            canFocus: () => true
        });

        expect(elements[elements.length - 1]).toHaveFocus();
    });

    test("skip elements when canFocus return false for the first and last elements", () => {
        const elements = [
            createInput(),
            createInput(),
            createInput()
        ];

        appendToDom(...elements);

        const focusManager = new FocusManager(new Scope(elements));

        focusManager.focusLast({
            canFocus: x => x !== elements[0] && x !== elements[2]
        });

        expect(elements[1]).toHaveFocus();
    });

    test("call onNotFound when canFocus returns false for all the elements of the scope", () => {
        const onNotFound = jest.fn();

        const elements = [
            createInput(),
            createInput(),
            createInput()
        ];

        appendToDom(...elements);

        const focusManager = new FocusManager(new Scope(elements));

        focusManager.focusLast({
            canFocus: () => false,
            onNotFound
        });

        expect(onNotFound).toHaveBeenCalledTimes(1);
    });
});

describe("focusNext", () => {
    test("can focus the next element", () => {
        const elements = [
            createInput(),
            createInput(),
            createInput()
        ];

        appendToDom(...elements);

        elements[0].focus();

        const focusManager = new FocusManager(new Scope(elements));
        focusManager.focusNext();

        expect(elements[1]).toHaveFocus();
    });

    test("focus the first element when the active element is out of the scope", () => {
        const elements = [
            createInput(),
            createInput(),
            createInput()
        ];

        const outOfScope = createInput();

        appendToDom(...elements, outOfScope);

        outOfScope.focus();

        const focusManager = new FocusManager(new Scope(elements));
        focusManager.focusNext();

        expect(elements[0]).toHaveFocus();
    });

    test("can jump from last to first", () => {
        const elements = [
            createInput(),
            createInput(),
            createInput()
        ];

        appendToDom(...elements);

        elements[elements.length - 1].focus();

        const focusManager = new FocusManager(new Scope(elements));
        focusManager.focusNext();

        expect(elements[0]).toHaveFocus();
    });

    test("call onFocus when the next element is focused", () => {
        const onFocus = jest.fn();

        const elements = [
            createInput(),
            createInput(),
            createInput()
        ];

        appendToDom(...elements);

        elements[0].focus();

        const focusManager = new FocusManager(new Scope(elements));
        focusManager.focusNext({ onFocus });

        expect(onFocus).toHaveBeenCalledTimes(1);
        expect(onFocus).toHaveBeenCalledWith(elements[1]);
    });

    test("call onNotFound when the scope is empty", () => {
        const onNotFound = jest.fn();

        const focusManager = new FocusManager(new Scope([]));
        focusManager.focusNext({ onNotFound });

        expect(onNotFound).toHaveBeenCalledTimes(1);
    });

    test("focus the next element when canFocus return true for the next element", () => {
        const elements = [
            createInput(),
            createInput(),
            createInput()
        ];

        appendToDom(...elements);

        elements[0].focus();

        const focusManager = new FocusManager(new Scope(elements));

        focusManager.focusNext({
            canFocus: () => true
        });

        expect(elements[1]).toHaveFocus();
    });

    test("skips elements when canFocus return false", () => {
        const elements = [
            createInput(),
            createInput(),
            createInput()
        ];

        appendToDom(...elements);

        elements[0].focus();

        const focusManager = new FocusManager(new Scope(elements));

        focusManager.focusNext({
            canFocus: x => x !== elements[1]
        });

        expect(elements[2]).toHaveFocus();
    });

    test("call onNotFound when canFocus returns false for all the elements of the scope", () => {
        const onNotFound = jest.fn();

        const elements = [
            createInput(),
            createInput(),
            createInput()
        ];

        appendToDom(...elements);

        elements[0].focus();

        const focusManager = new FocusManager(new Scope(elements));

        focusManager.focusNext({
            canFocus: () => false,
            onNotFound
        });

        expect(onNotFound).toHaveBeenCalledTimes(1);
    });

    test("can loop when canFocus returns false for the last elements", () => {
        const elements = [
            createInput(),
            createInput(),
            createInput()
        ];

        appendToDom(...elements);

        elements[1].focus();

        const focusManager = new FocusManager(new Scope(elements));

        focusManager.focusNext({
            canFocus: x => x !== elements[elements.length - 1]
        });

        expect(elements[0]).toHaveFocus();
    });
});

describe("focusPrevious", () => {
    test("can focus the previous element", () => {
        const elements = [
            createInput(),
            createInput(),
            createInput()
        ];

        appendToDom(...elements);

        elements[1].focus();

        const focusManager = new FocusManager(new Scope(elements));
        focusManager.focusPrevious();

        expect(elements[0]).toHaveFocus();
    });

    test("focus the last element when the active element is out of the scope", () => {
        const elements = [
            createInput(),
            createInput(),
            createInput()
        ];

        const outOfScope = createInput();

        appendToDom(...elements, outOfScope);

        outOfScope.focus();

        const focusManager = new FocusManager(new Scope(elements));
        focusManager.focusPrevious();

        expect(elements[elements.length - 1]).toHaveFocus();
    });

    test("can jump from first to last", () => {
        const elements = [
            createInput(),
            createInput(),
            createInput()
        ];

        appendToDom(...elements);

        elements[0].focus();

        const focusManager = new FocusManager(new Scope(elements));
        focusManager.focusPrevious();

        expect(elements[elements.length - 1]).toHaveFocus();
    });

    test("call onFocus when the previous element is focused", () => {
        const onFocus = jest.fn();

        const elements = [
            createInput(),
            createInput(),
            createInput()
        ];

        appendToDom(...elements);

        elements[1].focus();

        const focusManager = new FocusManager(new Scope(elements));
        focusManager.focusPrevious({ onFocus });

        expect(onFocus).toHaveBeenCalledTimes(1);
        expect(onFocus).toHaveBeenCalledWith(elements[0]);
    });

    test("call onNotFound when the scope is empty", () => {
        const onNotFound = jest.fn();

        const focusManager = new FocusManager(new Scope([]));
        focusManager.focusPrevious({ onNotFound });

        expect(onNotFound).toHaveBeenCalledTimes(1);
    });

    test("focus the previous element when canFocus return true for the previous element", () => {
        const elements = [
            createInput(),
            createInput(),
            createInput()
        ];

        appendToDom(...elements);

        elements[1].focus();

        const focusManager = new FocusManager(new Scope(elements));

        focusManager.focusPrevious({
            canFocus: () => true
        });

        expect(elements[0]).toHaveFocus();
    });

    test("skips elements when canFocus return false", () => {
        const elements = [
            createInput(),
            createInput(),
            createInput()
        ];

        appendToDom(...elements);

        elements[elements.length - 1].focus();

        const focusManager = new FocusManager(new Scope(elements));

        focusManager.focusPrevious({
            canFocus: x => x !== elements[1]
        });

        expect(elements[0]).toHaveFocus();
    });

    test("call onNotFound when canFocus returns false for all the elements of the scope", () => {
        const onNotFound = jest.fn();

        const elements = [
            createInput(),
            createInput(),
            createInput()
        ];

        appendToDom(...elements);

        elements[0].focus();

        const focusManager = new FocusManager(new Scope(elements));

        focusManager.focusPrevious({
            canFocus: () => false,
            onNotFound
        });

        expect(onNotFound).toHaveBeenCalledTimes(1);
    });

    test("can loop when canFocus returns false for the first elements", () => {
        const elements = [
            createInput(),
            createInput(),
            createInput()
        ];

        appendToDom(...elements);

        elements[1].focus();

        const focusManager = new FocusManager(new Scope(elements));

        focusManager.focusPrevious({
            canFocus: x => x !== elements[0]
        });

        expect(elements[elements.length - 1]).toHaveFocus();
    });
});

describe("focusKey", () => {
    test("can focus the element matching the key", () => {
        const Key = "data-key";

        const elements = [
            createInput({ [Key]: "0" }),
            createInput({ [Key]: "1" }),
            createInput({ [Key]: "2" })
        ];

        appendToDom(...elements);

        const focusManager = new FocusManager(new Scope(elements), { keyProp: Key });
        focusManager.focusKey("1");

        expect(elements[1]).toHaveFocus();
    });

    test("can onFocus when the matching element is focused", () => {
        const onFocus = jest.fn();

        const Key = "data-key";

        const elements = [
            createInput({ [Key]: "0" }),
            createInput({ [Key]: "1" }),
            createInput({ [Key]: "2" })
        ];

        appendToDom(...elements);

        const focusManager = new FocusManager(new Scope(elements), { keyProp: Key });
        focusManager.focusKey("1", { onFocus });

        expect(onFocus).toHaveBeenCalledTimes(1);
        expect(onFocus).toHaveBeenCalledWith(elements[1]);
    });

    test("call onNotFound when no elements match the key", () => {
        const onNotFound = jest.fn();

        const Key = "data-key";

        const elements = [
            createInput({ [Key]: "0" }),
            createInput({ [Key]: "1" }),
            createInput({ [Key]: "2" })
        ];

        appendToDom(...elements);

        const focusManager = new FocusManager(new Scope(elements), { keyProp: Key });
        focusManager.focusKey("10", { onNotFound });

        expect(onNotFound).toHaveBeenCalledTimes(1);
    });
});

describe("virtual focus", () => {
    test("add focus CSS class to the focused element", () => {
        const elements = [
            createInput(),
            createInput(),
            createInput()
        ];

        appendToDom(...elements);

        const focusManager = new FocusManager(new Scope(elements), { isVirtual: true });
        focusManager.focusFirst();

        expect(elements[0]).toHaveClass("o-ui-focus");
        expect(elements[1]).not.toHaveClass("o-ui-focus");
        expect(elements[2]).not.toHaveClass("o-ui-focus");
    });

    test("remove focus CSS class from previous focused element", () => {
        const elements = [
            createInput(),
            createInput(),
            createInput()
        ];

        appendToDom(...elements);

        const focusManager = new FocusManager(new Scope(elements), { isVirtual: true });
        focusManager.focusLast();
        focusManager.focusFirst();

        expect(elements[0]).toHaveClass("o-ui-focus");
        expect(elements[1]).not.toHaveClass("o-ui-focus");
        expect(elements[2]).not.toHaveClass("o-ui-focus");
    });

    test("the focused element is not the document active element", () => {
        const elements = [
            createInput(),
            createInput(),
            createInput()
        ];

        appendToDom(...elements);

        const focusManager = new FocusManager(new Scope(elements), { isVirtual: true });
        focusManager.focusFirst();

        expect(elements[0]).not.toHaveFocus();
    });

    test("can focus next", () => {
        const elements = [
            createInput(),
            createInput(),
            createInput()
        ];

        appendToDom(...elements);

        const focusManager = new FocusManager(new Scope(elements), { isVirtual: true });
        focusManager.focusNext();
        focusManager.focusNext();

        expect(elements[1]).not.toHaveFocus();
    });

    test("can focus previous", () => {
        const elements = [
            createInput(),
            createInput(),
            createInput()
        ];

        appendToDom(...elements);

        const focusManager = new FocusManager(new Scope(elements), { isVirtual: true });
        focusManager.focusNext();
        focusManager.focusNext();

        expect(elements[1]).not.toHaveFocus();
    });

    test("hasFocus", () => {
        const elements = [
            createInput(),
            createInput(),
            createInput()
        ];

        appendToDom(...elements);

        const focusManager = new FocusManager(new Scope(elements), { isVirtual: true });

        expect(focusManager.hasFocus()).toBeFalsy();

        focusManager.focusFirst();

        expect(focusManager.hasFocus()).toBeTruthy();
    });
});
