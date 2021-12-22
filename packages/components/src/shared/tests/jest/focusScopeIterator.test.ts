import { FocusScope, FocusScopeIterator } from "@components/shared";
import { MutableRefObject, createRef } from "react";

class Scope extends FocusScope {
    constructor(elements: HTMLElement[]) {
        const elementRef = createRef<HTMLElement[]>() as MutableRefObject<HTMLElement[]>;
        elementRef.current = elements;

        super(elementRef, null);
    }
}

function createInput({ notTabbable = false } = {}) {
    const element = document.createElement("INPUT");
    element.setAttribute("type", "text");

    if (notTabbable) {
        element.setAttribute("tabindex", "-1");
    }

    return element;
}

describe("firstElement", () => {
    test("can return the first element", () => {
        const elements = [
            createInput(),
            createInput(),
            createInput()
        ];

        const iterator = new FocusScopeIterator(new Scope(elements));

        const element = iterator.firstElement();

        expect(element).toBe(elements[0]);
    });

    test("when an accept function is provided and return true for the first element, return the first element", () => {
        const elements = [
            createInput(),
            createInput(),
            createInput()
        ];

        const iterator = new FocusScopeIterator(new Scope(elements));

        const element = iterator.firstElement({ acceptElement: () => true });

        expect(element).toBe(elements[0]);
    });

    test("when an accept function is provided and return false for the first element, return the second element", () => {
        const elements = [
            createInput(),
            createInput(),
            createInput()
        ];

        const iterator = new FocusScopeIterator(new Scope(elements));

        const element = iterator.firstElement({ acceptElement: x => x !== elements[0] });

        expect(element).toBe(elements[1]);
    });

    test("when an accept function is provided and return false for the first 2 elements, return the third element", () => {
        const elements = [
            createInput(),
            createInput(),
            createInput()
        ];

        const iterator = new FocusScopeIterator(new Scope(elements));

        const element = iterator.firstElement({ acceptElement: x => x !== elements[0] && x !== elements[1] });

        expect(element).toBe(elements[2]);
    });

    test("when an accept function is provided and return false for all the elements, return null", () => {
        const elements = [
            createInput(),
            createInput(),
            createInput()
        ];

        const iterator = new FocusScopeIterator(new Scope(elements));

        const element = iterator.firstElement({ acceptElement: () => false });

        expect(element).toBeNull();
    });

    test("when is tabbable only and the first element is tabbable, return the first element", () => {
        const elements = [
            createInput(),
            createInput(),
            createInput()
        ];

        const iterator = new FocusScopeIterator(new Scope(elements), { tabbableOnly: true });

        const element = iterator.firstElement();

        expect(element).toBe(elements[0]);
    });

    test("when is tabbable only and the first element is not tabbable, return the next element", () => {
        const elements = [
            createInput({ notTabbable: true }),
            createInput(),
            createInput()
        ];

        const iterator = new FocusScopeIterator(new Scope(elements), { tabbableOnly: true });

        const element = iterator.firstElement();

        expect(element).toBe(elements[1]);
    });

    test("when is tabbable only and the first 2 elements are not tabbable, return the third element", () => {
        const elements = [
            createInput({ notTabbable: true }),
            createInput({ notTabbable: true }),
            createInput()
        ];

        const iterator = new FocusScopeIterator(new Scope(elements), { tabbableOnly: true });

        const element = iterator.firstElement();

        expect(element).toBe(elements[2]);
    });

    test("when is tabbable only and all elements are not tabbable, return null", () => {
        const elements = [
            createInput({ notTabbable: true }),
            createInput({ notTabbable: true }),
            createInput({ notTabbable: true })
        ];

        const iterator = new FocusScopeIterator(new Scope(elements), { tabbableOnly: true });

        const element = iterator.firstElement();

        expect(element).toBe(null);
    });

    test("when starting from the last element, return the first element", () => {
        const elements = [
            createInput(),
            createInput(),
            createInput()
        ];

        const iterator = new FocusScopeIterator(new Scope(elements), { from: 2 });

        const element = iterator.firstElement();

        expect(element).toBe(elements[0]);
    });

    test("when starting from the first element, return the first element", () => {
        const elements = [
            createInput(),
            createInput(),
            createInput()
        ];

        const iterator = new FocusScopeIterator(new Scope(elements), { from: 0 });

        const element = iterator.firstElement();

        expect(element).toBe(elements[0]);
    });

    test("when the scope is empty, return null", () => {
        const iterator = new FocusScopeIterator(new Scope([]));

        const element = iterator.firstElement();

        expect(element).toBeNull();
    });
});

describe("lastElement", () => {
    test("can return the last element", () => {
        const elements = [
            createInput(),
            createInput(),
            createInput()
        ];

        const iterator = new FocusScopeIterator(new Scope(elements));

        const element = iterator.lastElement();

        expect(element).toBe(elements[2]);
    });

    test("when an accept function is provided and return true for the last element, return the last element", () => {
        const elements = [
            createInput(),
            createInput(),
            createInput()
        ];

        const iterator = new FocusScopeIterator(new Scope(elements));

        const element = iterator.lastElement({ acceptElement: () => true });

        expect(element).toBe(elements[2]);
    });

    test("when an accept function is provided and return false for the last element, return the second element", () => {
        const elements = [
            createInput(),
            createInput(),
            createInput()
        ];

        const iterator = new FocusScopeIterator(new Scope(elements));

        const element = iterator.lastElement({ acceptElement: x => x !== elements[2] });

        expect(element).toBe(elements[1]);
    });

    test("when an accept function is provided and return false for the last 2 elements, return the first element", () => {
        const elements = [
            createInput(),
            createInput(),
            createInput()
        ];

        const iterator = new FocusScopeIterator(new Scope(elements));

        const element = iterator.lastElement({ acceptElement: x => x !== elements[1] && x !== elements[2] });

        expect(element).toBe(elements[0]);
    });

    test("when an accept function is provided and return false for all the elements, return null", () => {
        const elements = [
            createInput(),
            createInput(),
            createInput()
        ];

        const iterator = new FocusScopeIterator(new Scope(elements));

        const element = iterator.lastElement({ acceptElement: () => false });

        expect(element).toBeNull();
    });

    test("when is tabbable only and the last element is tabbable, return the last element", () => {
        const elements = [
            createInput(),
            createInput(),
            createInput()
        ];

        const iterator = new FocusScopeIterator(new Scope(elements), { tabbableOnly: true });

        const element = iterator.lastElement();

        expect(element).toBe(elements[2]);
    });

    test("when is tabbable only and the last element is not tabbable, return the previous element", () => {
        const elements = [
            createInput(),
            createInput(),
            createInput({ notTabbable: true })
        ];

        const iterator = new FocusScopeIterator(new Scope(elements), { tabbableOnly: true });

        const element = iterator.lastElement();

        expect(element).toBe(elements[1]);
    });

    test("when is tabbable only and the last 2 elements are not tabbable, return the first element", () => {
        const elements = [
            createInput(),
            createInput({ notTabbable: true }),
            createInput({ notTabbable: true })
        ];

        const iterator = new FocusScopeIterator(new Scope(elements), { tabbableOnly: true });

        const element = iterator.lastElement();

        expect(element).toBe(elements[0]);
    });

    test("when is tabbable only and all elements are not tabbable, return null", () => {
        const elements = [
            createInput({ notTabbable: true }),
            createInput({ notTabbable: true }),
            createInput({ notTabbable: true })
        ];

        const iterator = new FocusScopeIterator(new Scope(elements), { tabbableOnly: true });

        const element = iterator.lastElement();

        expect(element).toBe(null);
    });

    test("when starting from the first element, return the last element", () => {
        const elements = [
            createInput(),
            createInput(),
            createInput()
        ];

        const iterator = new FocusScopeIterator(new Scope(elements), { from: 0 });

        const element = iterator.lastElement();

        expect(element).toBe(elements[2]);
    });

    test("when starting from the last element, return the last element", () => {
        const elements = [
            createInput(),
            createInput(),
            createInput()
        ];

        const iterator = new FocusScopeIterator(new Scope(elements), { from: 2 });

        const element = iterator.lastElement();

        expect(element).toBe(elements[2]);
    });

    test("when the scope is empty, return null", () => {
        const iterator = new FocusScopeIterator(new Scope([]));

        const element = iterator.lastElement();

        expect(element).toBeNull();
    });
});

describe("nextElement", () => {
    test("when it's a new instance and the first call to next, return the first element", () => {
        const elements = [
            createInput(),
            createInput(),
            createInput()
        ];

        const iterator = new FocusScopeIterator(new Scope(elements));

        const element = iterator.nextElement();

        expect(element).toBe(elements[0]);
    });

    test("when it's the second call to next, return the second element", () => {
        const elements = [
            createInput(),
            createInput(),
            createInput()
        ];

        const iterator = new FocusScopeIterator(new Scope(elements));

        const element1 = iterator.nextElement();

        expect(element1).toBe(elements[0]);

        const element2 = iterator.nextElement();

        expect(element2).toBe(elements[1]);
    });

    test("can loop all the elements of the iterator", () => {
        const elements = [
            createInput(),
            createInput(),
            createInput()
        ];

        const iterator = new FocusScopeIterator(new Scope(elements));

        const element1 = iterator.nextElement();

        expect(element1).toBe(elements[0]);

        const element2 = iterator.nextElement();

        expect(element2).toBe(elements[1]);

        const element3 = iterator.nextElement();

        expect(element3).toBe(elements[2]);

        const element4 = iterator.nextElement();

        expect(element4).toBe(elements[0]);
    });

    test("when an accept function is provided and return true for the next element, return the next element", () => {
        const elements = [
            createInput(),
            createInput(),
            createInput()
        ];

        const iterator = new FocusScopeIterator(new Scope(elements));

        const element = iterator.nextElement({ acceptElement: () => true });

        expect(element).toBe(elements[0]);
    });

    test("when an accept function is provided and return false for the next element, return the second next element", () => {
        const elements = [
            createInput(),
            createInput(),
            createInput()
        ];

        const iterator = new FocusScopeIterator(new Scope(elements));

        const element = iterator.nextElement({ acceptElement: x => x !== elements[0] });

        expect(element).toBe(elements[1]);
    });

    test("when an accept function is provided and return false for the next 2 elements, return the third element", () => {
        const elements = [
            createInput(),
            createInput(),
            createInput()
        ];

        const iterator = new FocusScopeIterator(new Scope(elements));

        const element = iterator.nextElement({ acceptElement: x => x !== elements[0] && x !== elements[1] });

        expect(element).toBe(elements[2]);
    });

    test("when an accept function is provided and return false for all the elements, return null", () => {
        const elements = [
            createInput(),
            createInput(),
            createInput()
        ];

        const iterator = new FocusScopeIterator(new Scope(elements));

        const element = iterator.nextElement({ acceptElement: () => false });

        expect(element).toBeNull();
    });

    test("when is tabbable only and the next element is tabbable, return the next element", () => {
        const elements = [
            createInput(),
            createInput(),
            createInput()
        ];

        const iterator = new FocusScopeIterator(new Scope(elements), { tabbableOnly: true });

        const element = iterator.nextElement();

        expect(element).toBe(elements[0]);
    });

    test("when is tabbable only and the next element is not tabbable, return the second next element", () => {
        const elements = [
            createInput({ notTabbable: true }),
            createInput(),
            createInput()
        ];

        const iterator = new FocusScopeIterator(new Scope(elements), { tabbableOnly: true });

        const element = iterator.nextElement();

        expect(element).toBe(elements[1]);
    });

    test("when is tabbable only and the next 2 elements are not tabbable, return the third element", () => {
        const elements = [
            createInput({ notTabbable: true }),
            createInput({ notTabbable: true }),
            createInput()
        ];

        const iterator = new FocusScopeIterator(new Scope(elements), { tabbableOnly: true });

        const element = iterator.nextElement();

        expect(element).toBe(elements[2]);
    });

    test("when is tabbable only and all elements are not tabbable, return null", () => {
        const elements = [
            createInput({ notTabbable: true }),
            createInput({ notTabbable: true }),
            createInput({ notTabbable: true })
        ];

        const iterator = new FocusScopeIterator(new Scope(elements), { tabbableOnly: true });

        const element = iterator.nextElement();

        expect(element).toBe(null);
    });

    test("when starting from the first element, return the second element", () => {
        const elements = [
            createInput(),
            createInput(),
            createInput()
        ];

        const iterator = new FocusScopeIterator(new Scope(elements), { from: 0 });

        const element = iterator.nextElement();

        expect(element).toBe(elements[1]);
    });

    test("when starting from the second element, return the third element", () => {
        const elements = [
            createInput(),
            createInput(),
            createInput()
        ];

        const iterator = new FocusScopeIterator(new Scope(elements), { from: 1 });

        const element = iterator.nextElement();

        expect(element).toBe(elements[2]);
    });

    test("when starting from the last element, return the first element", () => {
        const elements = [
            createInput(),
            createInput(),
            createInput()
        ];

        const iterator = new FocusScopeIterator(new Scope(elements), { from: 2 });

        const element = iterator.nextElement();

        expect(element).toBe(elements[0]);
    });

    test("when the scope is empty, return null", () => {
        const iterator = new FocusScopeIterator(new Scope([]));

        const element = iterator.nextElement();

        expect(element).toBeNull();
    });
});

describe("previousElement", () => {
    test("when it's a new instance and the first call to previous, return the last element", () => {
        const elements = [
            createInput(),
            createInput(),
            createInput()
        ];

        const iterator = new FocusScopeIterator(new Scope(elements));

        const element = iterator.previousElement();

        expect(element).toBe(elements[2]);
    });

    test("when it's the second call to previous, return the second element", () => {
        const elements = [
            createInput(),
            createInput(),
            createInput()
        ];

        const iterator = new FocusScopeIterator(new Scope(elements));

        const element1 = iterator.previousElement();

        expect(element1).toBe(elements[2]);

        const element2 = iterator.previousElement();

        expect(element2).toBe(elements[1]);
    });

    test("can loop all the elements of the iterator", () => {
        const elements = [
            createInput(),
            createInput(),
            createInput()
        ];

        const iterator = new FocusScopeIterator(new Scope(elements));

        const element1 = iterator.previousElement();

        expect(element1).toBe(elements[2]);

        const element2 = iterator.previousElement();

        expect(element2).toBe(elements[1]);

        const element3 = iterator.previousElement();

        expect(element3).toBe(elements[0]);

        const element4 = iterator.previousElement();

        expect(element4).toBe(elements[2]);
    });

    test("when an accept function is provided and return true for the previous element, return the previous element", () => {
        const elements = [
            createInput(),
            createInput(),
            createInput()
        ];

        const iterator = new FocusScopeIterator(new Scope(elements));

        const element = iterator.previousElement({ acceptElement: () => true });

        expect(element).toBe(elements[2]);
    });

    test("when an accept function is provided and return false for the previous element, return the second previous element", () => {
        const elements = [
            createInput(),
            createInput(),
            createInput()
        ];

        const iterator = new FocusScopeIterator(new Scope(elements));

        const element = iterator.previousElement({ acceptElement: x => x !== elements[2] });

        expect(element).toBe(elements[1]);
    });

    test("when an accept function is provided and return false for the previous 2 elements, return the first element", () => {
        const elements = [
            createInput(),
            createInput(),
            createInput()
        ];

        const iterator = new FocusScopeIterator(new Scope(elements));

        const element = iterator.previousElement({ acceptElement: x => x !== elements[1] && x !== elements[2] });

        expect(element).toBe(elements[0]);
    });

    test("when an accept function is provided and return false for all the elements, return null", () => {
        const elements = [
            createInput(),
            createInput(),
            createInput()
        ];

        const iterator = new FocusScopeIterator(new Scope(elements));

        const element = iterator.previousElement({ acceptElement: () => false });

        expect(element).toBeNull();
    });

    test("when is tabbable only and the previous element is tabbable, return the previous element", () => {
        const elements = [
            createInput(),
            createInput(),
            createInput()
        ];

        const iterator = new FocusScopeIterator(new Scope(elements), { tabbableOnly: true });

        const element = iterator.previousElement();

        expect(element).toBe(elements[2]);
    });

    test("when is tabbable only and the previous element is not tabbable, return the second previous element", () => {
        const elements = [
            createInput(),
            createInput(),
            createInput({ notTabbable: true })
        ];

        const iterator = new FocusScopeIterator(new Scope(elements), { tabbableOnly: true });

        const element = iterator.previousElement();

        expect(element).toBe(elements[1]);
    });

    test("when is tabbable only and the previous 2 elements are not tabbable, return the first element", () => {
        const elements = [
            createInput(),
            createInput({ notTabbable: true }),
            createInput({ notTabbable: true })
        ];

        const iterator = new FocusScopeIterator(new Scope(elements), { tabbableOnly: true });

        const element = iterator.previousElement();

        expect(element).toBe(elements[0]);
    });

    test("when is tabbable only and all elements are not tabbable, return null", () => {
        const elements = [
            createInput({ notTabbable: true }),
            createInput({ notTabbable: true }),
            createInput({ notTabbable: true })
        ];

        const iterator = new FocusScopeIterator(new Scope(elements), { tabbableOnly: true });

        const element = iterator.previousElement();

        expect(element).toBe(null);
    });

    test("when starting from the last element, return the second element", () => {
        const elements = [
            createInput(),
            createInput(),
            createInput()
        ];

        const iterator = new FocusScopeIterator(new Scope(elements), { from: 2 });

        const element = iterator.previousElement();

        expect(element).toBe(elements[1]);
    });

    test("when starting from the second element, return the first element", () => {
        const elements = [
            createInput(),
            createInput(),
            createInput()
        ];

        const iterator = new FocusScopeIterator(new Scope(elements), { from: 1 });

        const element = iterator.previousElement();

        expect(element).toBe(elements[0]);
    });

    test("when starting from the first element, return the last element", () => {
        const elements = [
            createInput(),
            createInput(),
            createInput()
        ];

        const iterator = new FocusScopeIterator(new Scope(elements), { from: 0 });

        const element = iterator.previousElement();

        expect(element).toBe(elements[2]);
    });

    test("when the scope is empty, return null", () => {
        const iterator = new FocusScopeIterator(new Scope([]));

        const element = iterator.previousElement();

        expect(element).toBeNull();
    });
});

test("next + next + first + next + last + next", () => {
    const elements = [
        createInput(),
        createInput(),
        createInput()
    ];

    const iterator = new FocusScopeIterator(new Scope(elements));

    const element1 = iterator.nextElement();

    expect(element1).toBe(elements[0]);

    const element2 = iterator.nextElement();

    expect(element2).toBe(elements[1]);

    const element3 = iterator.firstElement();

    expect(element3).toBe(elements[0]);

    const element4 = iterator.nextElement();

    expect(element4).toBe(elements[1]);

    const element5 = iterator.lastElement();

    expect(element5).toBe(elements[2]);

    const element6 = iterator.nextElement();

    expect(element6).toBe(elements[0]);
});

test("next + next + first + next + last + next with an accept function invalidating the first element", () => {
    const elements = [
        createInput(),
        createInput(),
        createInput()
    ];

    const acceptElement = (x: HTMLElement) => x !== elements[0];

    const iterator = new FocusScopeIterator(new Scope(elements));

    const element1 = iterator.nextElement({ acceptElement });

    expect(element1).toBe(elements[1]);

    const element2 = iterator.nextElement({ acceptElement });

    expect(element2).toBe(elements[2]);

    const element3 = iterator.firstElement({ acceptElement });

    expect(element3).toBe(elements[1]);

    const element4 = iterator.nextElement({ acceptElement });

    expect(element4).toBe(elements[2]);

    const element5 = iterator.lastElement({ acceptElement });

    expect(element5).toBe(elements[2]);

    const element6 = iterator.nextElement({ acceptElement });

    expect(element6).toBe(elements[1]);
});

test("next + next + first + next + last + next with an accept function invalidating the last element", () => {
    const elements = [
        createInput(),
        createInput(),
        createInput()
    ];

    const acceptElement = (x: HTMLElement) => x !== elements[2];

    const iterator = new FocusScopeIterator(new Scope(elements));

    const element1 = iterator.nextElement({ acceptElement });

    expect(element1).toBe(elements[0]);

    const element2 = iterator.nextElement({ acceptElement });

    expect(element2).toBe(elements[1]);

    const element3 = iterator.firstElement({ acceptElement });

    expect(element3).toBe(elements[0]);

    const element4 = iterator.nextElement({ acceptElement });

    expect(element4).toBe(elements[1]);

    const element5 = iterator.lastElement({ acceptElement });

    expect(element5).toBe(elements[1]);

    const element6 = iterator.nextElement({ acceptElement });

    expect(element6).toBe(elements[0]);
});

test("previous + previous + first + previous + last + previous", () => {
    const elements = [
        createInput(),
        createInput(),
        createInput()
    ];

    const iterator = new FocusScopeIterator(new Scope(elements));

    const element1 = iterator.previousElement();

    expect(element1).toBe(elements[2]);

    const element2 = iterator.previousElement();

    expect(element2).toBe(elements[1]);

    const element3 = iterator.firstElement();

    expect(element3).toBe(elements[0]);

    const element4 = iterator.previousElement();

    expect(element4).toBe(elements[2]);

    const element5 = iterator.lastElement();

    expect(element5).toBe(elements[2]);

    const element6 = iterator.previousElement();

    expect(element6).toBe(elements[1]);
});

test("previous + previous + first + previous + last + previous with an accept function invalidating the last element", () => {
    const elements = [
        createInput(),
        createInput(),
        createInput()
    ];

    const acceptElement = (x: HTMLElement) => x !== elements[2];

    const iterator = new FocusScopeIterator(new Scope(elements));

    const element1 = iterator.previousElement({ acceptElement });

    expect(element1).toBe(elements[1]);

    const element2 = iterator.previousElement({ acceptElement });

    expect(element2).toBe(elements[0]);

    const element3 = iterator.firstElement({ acceptElement });

    expect(element3).toBe(elements[0]);

    const element4 = iterator.previousElement({ acceptElement });

    expect(element4).toBe(elements[1]);

    const element5 = iterator.lastElement({ acceptElement });

    expect(element5).toBe(elements[1]);

    const element6 = iterator.previousElement({ acceptElement });

    expect(element6).toBe(elements[0]);
});

test("previous + previous + first + previous + last + previous with an accept function invalidating the first element", () => {
    const elements = [
        createInput(),
        createInput(),
        createInput()
    ];

    const acceptElement = (x: HTMLElement) => x !== elements[0];

    const iterator = new FocusScopeIterator(new Scope(elements));

    const element1 = iterator.previousElement({ acceptElement });

    expect(element1).toBe(elements[2]);

    const element2 = iterator.previousElement({ acceptElement });

    expect(element2).toBe(elements[1]);

    const element3 = iterator.firstElement({ acceptElement });

    expect(element3).toBe(elements[1]);

    const element4 = iterator.previousElement({ acceptElement });

    expect(element4).toBe(elements[2]);

    const element5 = iterator.lastElement({ acceptElement });

    expect(element5).toBe(elements[2]);

    const element6 = iterator.previousElement({ acceptElement });

    expect(element6).toBe(elements[1]);
});
