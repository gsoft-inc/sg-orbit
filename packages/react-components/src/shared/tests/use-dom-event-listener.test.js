import { act, renderHook } from "@testing-library/react-hooks";
import { createRef } from "react";
import { fireEvent } from "@testing-library/dom";
import { render } from "@testing-library/react";
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
    const handler = jest.fn();

    renderHook(() => useDomEventListener("click", handler));

    const button = appendButton();

    act(() => {
        fireEvent.click(button);
    });

    expect(handler).toHaveBeenCalled();
});

test("handler is not called when another event is triggered on the target element", () => {
    const handler = jest.fn();

    renderHook(() => useDomEventListener("click", handler));

    const button = appendButton();

    act(() => {
        fireEvent.mouseOver(button);
    });

    expect(handler).not.toHaveBeenCalled();
});

test("handler is not called when an event is trigerred on another target element", () => {
    const handler = jest.fn();

    const div = document.createElement("div");
    document.body.append(div);

    renderHook(() => useDomEventListener("click", handler, true, { target: div }));

    const button = appendButton();

    act(() => {
        fireEvent.click(button);
    });

    expect(handler).not.toHaveBeenCalled();
});

test("target can be document", () => {
    const handler = jest.fn();

    renderHook(() => useDomEventListener("click", handler), true, { target: "document" });

    const button = appendButton();

    act(() => {
        fireEvent.click(button);
    });

    expect(handler).toHaveBeenCalled();
});

test("target can be window", () => {
    const handler = jest.fn();

    renderHook(() => useDomEventListener("click", handler), true, { target: "window" });

    const button = appendButton();

    act(() => {
        fireEvent.click(button);
    });

    expect(handler).toHaveBeenCalled();
});

test("target can be any DOM element", () => {
    const handler = jest.fn();

    const div = document.createElement("div");
    document.body.append(div);

    renderHook(() => useDomEventListener("click", handler, true, { target: div }));

    const button = appendButton();
    div.append(button);

    act(() => {
        fireEvent.click(button);
    });

    expect(handler).toHaveBeenCalled();
});

test("target can be a React ref", () => {
    const handler = jest.fn();

    const divRef = createRef();
    const buttonRef = createRef();

    render(
        <div ref={divRef}>
            <button type="button" ref={buttonRef}>Cutoff</button>
        </div>
    );

    renderHook(() => useDomEventListener("click", handler, true, { target: divRef }));

    act(() => {
        fireEvent.click(buttonRef.current);
    });

    expect(handler).toHaveBeenCalled();
});

test("can listen to multiple events on the same target element", () => {
    const clickHandler = jest.fn();
    const mouseOverHandler = jest.fn();

    renderHook(() => useDomEventListener("click", clickHandler));
    renderHook(() => useDomEventListener("mouseover", mouseOverHandler));

    const button = appendButton();

    act(() => {
        fireEvent.click(button);
        fireEvent.mouseOver(button);
    });

    expect(clickHandler).toHaveBeenCalled();
    expect(mouseOverHandler).toHaveBeenCalled();
});

test("doesn't call handler when not active", () => {
    const handler = jest.fn();

    renderHook(() => useDomEventListener("click", handler, false));

    const button = appendButton();

    act(() => {
        fireEvent.click(button);
    });

    expect(handler).not.toHaveBeenCalled();
});

test("doesn't call handler after transitioning from active to inactive", () => {
    const handler = jest.fn();

    const { rerender } = renderHook(({ active }) => useDomEventListener("click", handler, active), {
        initialProps: {
            active: true
        }
    });

    const button = appendButton();

    act(() => {
        fireEvent.click(button);
    });

    rerender({
        active: false
    });

    act(() => {
        fireEvent.click(button);
    });

    expect(handler).toHaveBeenCalledTimes(1);
});

test("call handler after transitioning from inactive to active", () => {
    const handler = jest.fn();

    const { rerender } = renderHook(({ active }) => useDomEventListener("click", handler, active), {
        initialProps: {
            active: false
        }
    });

    const button = appendButton();

    act(() => {
        fireEvent.click(button);
    });

    rerender({
        active: true
    });

    act(() => {
        fireEvent.click(button);
    });

    expect(handler).toHaveBeenCalledTimes(1);
});
