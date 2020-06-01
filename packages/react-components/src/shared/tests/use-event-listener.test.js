import { act, renderHook } from "@testing-library/react-hooks";
import { fireEvent } from "@testing-library/dom";
import { useEventListener } from "@react-components/shared";

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

    renderHook(() => useEventListener(document, "click", handler));

    const button = appendButton();

    act(() => {
        fireEvent.click(button);
    });

    expect(handler).toHaveBeenCalled();
});

test("handler is not called when another event is triggered on the target element", () => {
    const handler = jest.fn();

    renderHook(() => useEventListener(document, "click", handler));

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

    renderHook(() => useEventListener(div, "click", handler, true));

    const button = appendButton();

    act(() => {
        fireEvent.click(button);
    });

    expect(handler).not.toHaveBeenCalled();
});

test("handler can be a function", () => {
    const handler = jest.fn();

    renderHook(() => useEventListener(() => document, "click", handler));

    const button = appendButton();

    act(() => {
        fireEvent.click(button);
    });

    expect(handler).toHaveBeenCalled();
});

test("can listen to multiple events on the same target element", () => {
    const clickHandler = jest.fn();
    const mouseOverHandler = jest.fn();

    renderHook(() => useEventListener(document, "click", clickHandler));
    renderHook(() => useEventListener(document, "mouseover", mouseOverHandler));

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

    renderHook(() => useEventListener(document, "click", handler, false));

    const button = appendButton();

    act(() => {
        fireEvent.click(button);
    });

    expect(handler).not.toHaveBeenCalled();
});

test("doesn't call handler after transitioning from active to inactive", () => {
    const handler = jest.fn();

    const { rerender } = renderHook(({ active }) => useEventListener(document, "click", handler, active), {
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

    const { rerender } = renderHook(({ active }) => useEventListener(document, "click", handler, active), {
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
