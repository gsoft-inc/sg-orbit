import { Button } from "@react-components/button";
import { PopperTrigger } from "@react-components/popper";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { createRef } from "react";
import userEvent from "@utils/user-event";

const TRIGGER_ID = "button";
const POPPER_ID = "popper-wrapper";
const POPPER_FOCUSABLE_ELEMENT_ID = "popper-focusable-element";

function createPopperTrigger(popperProps = {}, triggerProps = {}) {
    return (
        <PopperTrigger
            trigger={<Button {...triggerProps} />}
            toggleHandler="onClick"
            {...popperProps}
        >
            <div><a href="https://www.google.com" data-testid={POPPER_FOCUSABLE_ELEMENT_ID}>Focus element in popper</a></div>
        </PopperTrigger>
    );
}

async function showPopper({ getByTestId }) {
    const triggerNode = getByTestId(TRIGGER_ID);

    act(() => {
        userEvent.click(triggerNode);
    });

    const popperNode = await waitFor(() => getByTestId(POPPER_ID));

    return {
        triggerNode,
        popperNode,
        queries: {
            getPopperFocusableElement() {
                return getByTestId(POPPER_FOCUSABLE_ELEMENT_ID);
            }
        }
    };
}

// ***** Behaviors *****

test("show the popper on trigger toggle", async () => {
    const { getByTestId } = render(createPopperTrigger());

    act(() => {
        userEvent.click(getByTestId(TRIGGER_ID));
    });

    await waitFor(() => expect(getByTestId(POPPER_ID)).toBeInTheDocument());
});

test("show the popper on trigger spacebar keydown", async () => {
    const { getByTestId } = render(createPopperTrigger());

    act(() => {
        fireEvent.keyDown(getByTestId(TRIGGER_ID), { key: " ", keyCode: 32 });
    });

    await waitFor(() => expect(getByTestId(POPPER_ID)).toBeInTheDocument());
});

test("show the popper on trigger enter keydown", async () => {
    const { getByTestId } = render(createPopperTrigger());

    act(() => {
        fireEvent.keyDown(getByTestId(TRIGGER_ID), { key: "Enter", keyCode: 13 });
    });

    await waitFor(() => expect(getByTestId(POPPER_ID)).toBeInTheDocument());
});

test("when showOnSpacebar is false, dont show the popper on trigger spacebar keydown", async () => {
    const { getByTestId, queryByTestId } = render(createPopperTrigger({
        showOnSpacebar: false
    }));

    act(() => {
        fireEvent.keyDown(getByTestId(TRIGGER_ID), { key: " ", keyCode: 32 });
    });

    expect(queryByTestId(POPPER_ID)).not.toBeInTheDocument();
});

test("when showOnEnter is false, dont show the popper on trigger enter keydown", async () => {
    const { getByTestId, queryByTestId } = render(createPopperTrigger({
        showOnEnter: false
    }));

    act(() => {
        fireEvent.keyDown(getByTestId(TRIGGER_ID), { key: " ", keyCode: 13 });
    });

    expect(queryByTestId(POPPER_ID)).not.toBeInTheDocument();
});

test("when focusTriggerOnShow is true, focus the trigger on show", async () => {
    const renderResult = render(createPopperTrigger({
        focusTriggerOnShow: true
    }));

    const { triggerNode } = await showPopper(renderResult);

    await waitFor(() => expect(triggerNode).toHaveFocus());
});

test("when focusFirstElementOnShow is true, focus the first popper focusable element on show", async () => {
    const renderResult = render(createPopperTrigger({
        focusFirstElementOnShow: true
    }));

    const { queries } = await showPopper(renderResult);

    await waitFor(() => expect(queries.getPopperFocusableElement()).toHaveFocus());
});

test("when disabled, dont show the popper on trigger toggle", async () => {
    const { getByTestId, queryByTestId } = render(createPopperTrigger({
        disabled: true
    }));

    act(() => {
        userEvent.click(getByTestId(TRIGGER_ID));
    });

    expect(queryByTestId(POPPER_ID)).not.toBeInTheDocument();
});

test("hide the popper on esc keydown", async () => {
    const renderResult = render(createPopperTrigger());

    const { popperNode } = await showPopper(renderResult);

    act(() => {
        fireEvent.keyDown(document, { key: "Escape", keyCode: 27 });
    });

    await waitFor(() => expect(popperNode).not.toBeInTheDocument());
});

test("hide the popper on outside click", async () => {
    const renderResult = render(createPopperTrigger());

    const { popperNode } = await showPopper(renderResult);

    act(() => {
        userEvent.click(document.body);
    });

    await waitFor(() => expect(popperNode).not.toBeInTheDocument());
});

test("hide the popper on trigger mouse click", async () => {
    const renderResult = render(createPopperTrigger());

    const { triggerNode, popperNode } = await showPopper(renderResult);

    act(() => {
        userEvent.click(triggerNode);
    });

    await waitFor(() => expect(popperNode).not.toBeInTheDocument());
});

test("hide the popper on trigger spacebar keydown", async () => {
    const renderResult = render(createPopperTrigger());

    const { triggerNode, popperNode } = await showPopper(renderResult);

    act(() => {
        fireEvent.keyDown(triggerNode, { key: " ", keyCode: 32 });
    });

    await waitFor(() => expect(popperNode).not.toBeInTheDocument());
});

test("hide the popper on trigger enter keydown", async () => {
    const renderResult = render(createPopperTrigger());

    const { triggerNode, popperNode } = await showPopper(renderResult);

    act(() => {
        fireEvent.keyDown(triggerNode, { key: " ", keyCode: 13 });
    });

    await waitFor(() => expect(popperNode).not.toBeInTheDocument());
});

test("hide the popper on blur", async () => {
    const renderResult = render(createPopperTrigger());

    const { triggerNode, popperNode } = await showPopper(renderResult);

    act(() => {
        triggerNode.blur();
    });

    await waitFor(() => expect(popperNode).not.toBeInTheDocument());
});

test("when the popper hide on esc keydown, the trigger should be focused", async () => {
    const renderResult = render(createPopperTrigger());

    const { triggerNode, queries } = await showPopper(renderResult);

    act(() => {
        queries.getPopperFocusableElement().focus();
    });

    await waitFor(() => expect(triggerNode).not.toHaveFocus());

    act(() => {
        fireEvent.keyDown(document, { key: "Escape", keyCode: 27 });
    });

    await waitFor(() => expect(triggerNode).toHaveFocus());
});

test("when hideOnBlur is false, dont hide the popper on blur", async () => {
    const renderResult = render(createPopperTrigger({
        hideOnBlur: false
    }));

    const { popperNode } = await showPopper(renderResult);

    act(() => {
        userEvent.click(document.body);
    });

    // queries.getPopperFocusableElement().focus();

    await waitFor(() => expect(popperNode).toBeInTheDocument());
});

test("when hideOnBlur is false and hideOnOutsideClick is true, hide the popper on outside click", async () => {
    const renderResult = render(createPopperTrigger({
        hideOnBlur: false,
        hideOnOutsideClick: true
    }));

    const { popperNode } = await showPopper(renderResult);

    act(() => {
        userEvent.click(document.body);
    });

    await waitFor(() => expect(popperNode).not.toBeInTheDocument());
});

test("when hideOnEscape is false, dont hide the popper on escape keydown", async () => {
    const renderResult = render(createPopperTrigger({
        hideOnEscape: false
    }));

    const { popperNode } = await showPopper(renderResult);

    act(() => {
        fireEvent.keyDown(document, { key: "Escape", keyCode: 27 });
    });

    await waitFor(() => expect(popperNode).toBeInTheDocument());
});

test("when focusTriggerOnEscape is false, dont focus the trigger on escape keydown", async () => {
    const renderResult = render(createPopperTrigger({
        focusTriggerOnEscape: false
    }));

    const { triggerNode, queries } = await showPopper(renderResult);

    act(() => {
        queries.getPopperFocusableElement().focus();
    });

    act(() => {
        fireEvent.keyDown(document, { key: "Escape", keyCode: 27 });
    });

    expect(triggerNode).not.toHaveFocus();
});

// ***** API *****

test("consumer can set is own toggle handler", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(
        createPopperTrigger({}, {
            onClick: handler
        })
    );

    act(() => {
        userEvent.click(getByTestId("button"));
    });

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});

test("call onVisibilityChange when the popper is showed with a trigger toggle", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(createPopperTrigger({
        onVisibilityChange: handler
    }));

    act(() => {
        userEvent.click(getByTestId(TRIGGER_ID));
    });

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), true));
});

test("call onVisibilityChange when the popper is showed with space keydown", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(createPopperTrigger({
        onVisibilityChange: handler
    }));

    act(() => {
        fireEvent.keyDown(getByTestId(TRIGGER_ID), { key: " ", keyCode: 32 });
    });

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), true));
});

test("call onVisibilityChange when the popper is showed with enter keydown", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(createPopperTrigger({
        onVisibilityChange: handler
    }));

    act(() => {
        fireEvent.keyDown(getByTestId(TRIGGER_ID), { key: "Enter", keyCode: 13 });
    });

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), true));
});

test("call onVisibilityChange when the popper is hidden with an outside click", async () => {
    const handler = jest.fn();

    const renderResult = render(createPopperTrigger({
        onVisibilityChange: handler
    }));

    const { popperNode } = await showPopper(renderResult);

    act(() => {
        userEvent.click(document.body);
    });

    // I shouldn't need this but the test fail otherwise.
    await waitFor(() => expect(popperNode).not.toBeInTheDocument());

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), false));
});

test("call onVisibilityChange when the popper is hidden with esc keydown", async () => {
    const handler = jest.fn();

    const renderResult = render(createPopperTrigger({
        onVisibilityChange: handler
    }));

    const { popperNode } = await showPopper(renderResult);

    act(() => {
        fireEvent.keyDown(document, { key: "Escape", keyCode: 27 });
    });

    // I shouldn't need this but the test fail otherwise.
    await waitFor(() => expect(popperNode).not.toBeInTheDocument());

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), false));
});

test("call onVisibilityChange when the popper hide on blur", async () => {
    const handler = jest.fn();

    const renderResult = render(createPopperTrigger({
        onVisibilityChange: handler
    }));

    const { triggerNode, popperNode } = await showPopper(renderResult);

    act(() => {
        triggerNode.blur();
    });

    // I shouldn't need this but the test fail otherwise.
    await waitFor(() => expect(popperNode).not.toBeInTheDocument());

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), false));
});

test("spread additional props on the root element", async () => {
    const ref = createRef();

    render(
        createPopperTrigger({
            ref,
            "data-extra-props-test": "works"
        })
    );

    expect(ref.current.getAttribute("data-extra-props-test")).toBe("works");
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef();

    render(
        createPopperTrigger({
            ref
        })
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("DIV");
    expect(ref.current.getAttribute("data-testid")).toBe("popper-trigger");
});

test("using a callback ref, ref is a DOM element", async () => {
    let refNode = null;

    render(
        createPopperTrigger({
            ref: node => {
                refNode = node;
            }
        })
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("DIV");
    expect(refNode.getAttribute("data-testid")).toBe("popper-trigger");
});
