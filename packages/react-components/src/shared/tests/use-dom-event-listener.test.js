import { act, renderHook } from "@testing-library/react-hooks";
import { createRef } from "react";
import { fireEvent } from "@testing-library/dom";
import { render, wait } from "@testing-library/react";
import { useDomEventListener } from "@react-components/shared";

function createButton() {
    const element = document.createElement("button");
    element.setAttribute("type", "button");
    element.innerHTML = "Cutoff";

    return element;
}

function appendButton() {
    const button = createButton();
    document.body.append(button);

    return button;
}

test("handler is called when the specified event is triggered on the target element", () => {
    let wasCalled = false;

    renderHook(() => useDomEventListener("click", () => {
        wasCalled = true;
    }));

    const button = appendButton();

    act(() => {
        fireEvent.click(button);
    });

    expect(wasCalled).toBeTruthy();
});

test("handler is not called when another event is triggered on the target element", () => {
    let wasCalled = false;

    renderHook(() => useDomEventListener("click", () => {
        wasCalled = true;
    }));

    const button = appendButton();

    act(() => {
        fireEvent.mouseOver(button);
    });

    expect(wasCalled).toBeFalsy();
});

test("handler is not called when an event is trigerred on another target element", () => {
    let wasCalled = false;

    const div = document.createElement("div");
    document.body.append(div);

    renderHook(() => useDomEventListener("click", () => {
        wasCalled = true;
    }, true, { target: div }));

    const button = appendButton();

    act(() => {
        fireEvent.click(button);
    });

    expect(wasCalled).toBeFalsy();
});

test("target can be document", () => {
    let wasCalled = false;

    renderHook(() => useDomEventListener("click", () => {
        wasCalled = true;
    }), true, { target: "document" });

    const button = appendButton();

    act(() => {
        fireEvent.click(button);
    });

    expect(wasCalled).toBeTruthy();
});

test("target can be window", () => {
    let wasCalled = false;

    renderHook(() => useDomEventListener("click", () => {
        wasCalled = true;
    }), true, { target: "window" });

    const button = appendButton();

    act(() => {
        fireEvent.click(button);
    });

    expect(wasCalled).toBeTruthy();
});

test("target can be any DOM element", () => {
    let wasCalled = false;

    const div = document.createElement("div");
    document.body.append(div);

    renderHook(() => useDomEventListener("click", () => {
        wasCalled = true;
    }, true, { target: div }));

    const button = appendButton();
    div.append(button);

    act(() => {
        fireEvent.click(button);
    });

    expect(wasCalled).toBeTruthy();
});

test("target can be a React ref", () => {
    let wasCalled = false;

    const divRef = createRef();
    const buttonRef = createRef();

    render(
        <div ref={divRef}>
            <button type="button" ref={buttonRef}>Cutoff</button>
        </div>
    );

    wait();

    renderHook(() => useDomEventListener("click", () => {
        wasCalled = true;
    }, true, { target: divRef }));

    act(() => {
        fireEvent.click(buttonRef.current);
    });

    expect(wasCalled).toBeTruthy();
});

test("can listen to multiple events on the same target element", () => {
    let clickWasCalled = false;
    let mouseOverWasCalled = false;

    renderHook(() => useDomEventListener("click", () => {
        clickWasCalled = true;
    }));

    renderHook(() => useDomEventListener("mouseover", () => {
        mouseOverWasCalled = true;
    }));

    const button = appendButton();

    act(() => {
        fireEvent.click(button);
        fireEvent.mouseOver(button);
    });

    expect(clickWasCalled).toBeTruthy();
    expect(mouseOverWasCalled).toBeTruthy();
});

test("doesn't call handler when active is false", () => {
    let wasCalled = false;

    renderHook(() => useDomEventListener("click", () => {
        wasCalled = true;
    }, false));

    const button = appendButton();

    act(() => {
        fireEvent.click(button);
    });

    expect(wasCalled).toBeFalsy();
});
