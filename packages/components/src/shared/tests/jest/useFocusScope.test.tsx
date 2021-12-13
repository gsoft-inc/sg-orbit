import { FocusScope, isFunction, useFocusScope, useMergedRefs } from "@components/shared";
import { ReactNode, createRef, forwardRef } from "react";
import { render, waitFor } from "@testing-library/react";

import { Button } from "@components/button";
import { Disclosure } from "@components/disclosure";
import { Div } from "@components/html";
import { TextInput } from "@components/text-input";

interface FocusScopeProps {
    tabIndex?: number;
    onInitialScope?: (scope: FocusScope) => void;
    children: ReactNode;
}

const Container = forwardRef(({ children, onInitialScope, ...props }: FocusScopeProps, ref) => {
    const [scope, scopeRef] = useFocusScope();

    const containerRef = useMergedRefs(scopeRef, ref);

    if (isFunction(onInitialScope)) {
        onInitialScope(scope);
    }

    return (
        <Div ref={containerRef} {...props}>
            {children}
        </Div>
    );
});

test("the scope includes only focusable elements", async () => {
    let domScope: FocusScope = null;

    const buttonRef = createRef<HTMLButtonElement>();
    const textInputRef = createRef<HTMLInputElement>();

    render(
        <Container onInitialScope={scope => { domScope = scope; }}>
            <Div>Decoy 1</Div>
            <Button ref={buttonRef}>Button</Button>
            <Div>Decoy 2</Div>
            <TextInput placeholder="Value" ref={textInputRef} />
            <Div>Decoy 3</Div>
        </Container>
    );

    await waitFor(() => expect(domScope).not.toBeNull());
    await waitFor(() => expect(domScope.elements).toContain(buttonRef.current));
    await waitFor(() => expect(domScope.elements).toContain(textInputRef.current));
    await waitFor(() => expect(domScope.elements.length).toBe(2));
});

test("the scope can includes non tabbable elements", async () => {
    let domScope: FocusScope = null;

    const buttonRef = createRef<HTMLButtonElement>();
    const textInputRef = createRef<HTMLInputElement>();

    render(
        <Container onInitialScope={scope => { domScope = scope; }}>
            <Div>Decoy 1</Div>
            <Button tabIndex={-1} ref={buttonRef}>Button</Button>
            <Div>Decoy 2</Div>
            <TextInput placeholder="Value" ref={textInputRef} />
            <Div>Decoy 3</Div>
        </Container>
    );

    await waitFor(() => expect(domScope).not.toBeNull());
    await waitFor(() => expect(domScope.elements).toContain(buttonRef.current));
    await waitFor(() => expect(domScope.elements).toContain(textInputRef.current));
    await waitFor(() => expect(domScope.elements.length).toBe(2));
});

test("the scope does not includes focusable elements that are not visible", async () => {
    let domScope: FocusScope = null;

    const buttonRef = createRef<HTMLButtonElement>();
    const textInputRef = createRef<HTMLInputElement>();

    render(
        <Container onInitialScope={scope => { domScope = scope; }}>
            <Div>Decoy 1</Div>
            <Button ref={buttonRef} hidden>Button</Button>
            <Div>Decoy 2</Div>
            <TextInput placeholder="Value" ref={textInputRef} />
            <Div>Decoy 3</Div>
        </Container>
    );

    await waitFor(() => expect(domScope).not.toBeNull());
    await waitFor(() => expect(domScope.elements).not.toContain(buttonRef.current));
    await waitFor(() => expect(domScope.elements).toContain(textInputRef.current));
    await waitFor(() => expect(domScope.elements.length).toBe(1));
});

test("the scope does not includes focusable elements with a parent that is not visible", async () => {
    let domScope: FocusScope = null;

    const buttonRef = createRef<HTMLButtonElement>();
    const disclosureButtonRef = createRef<HTMLButtonElement>();
    const textInputRef = createRef<HTMLInputElement>();

    render(
        <Container onInitialScope={scope => { domScope = scope; }}>
            <Div>Decoy 1</Div>
            <Button ref={buttonRef}>Button</Button>
            <Div>Decoy 2</Div>
            <Disclosure>
                <Button ref={disclosureButtonRef}>Disclosure button</Button>
                <Div>
                    <TextInput placeholder="Value" ref={textInputRef} />
                </Div>
            </Disclosure>
            <Div>Decoy 3</Div>
        </Container>
    );

    await waitFor(() => expect(domScope).not.toBeNull());
    await waitFor(() => expect(domScope.elements).toContain(buttonRef.current));
    await waitFor(() => expect(domScope.elements).toContain(disclosureButtonRef.current));
    await waitFor(() => expect(domScope.elements).not.toContain(textInputRef.current));
    await waitFor(() => expect(domScope.elements.length).toBe(2));
});

test("when the root element is focusable, the scope includes the root element", async () => {
    let domScope: FocusScope = null;

    const rootRef = createRef<HTMLDivElement>();
    const buttonRef = createRef<HTMLButtonElement>();
    const textInputRef = createRef<HTMLInputElement>();

    render(
        <Container tabIndex={1} ref={rootRef} onInitialScope={scope => { domScope = scope; }}>
            <Div>Decoy 1</Div>
            <Button ref={buttonRef}>Button</Button>
            <Div>Decoy 2</Div>
            <TextInput placeholder="Value" ref={textInputRef} />
            <Div>Decoy 3</Div>
        </Container>
    );

    await waitFor(() => expect(domScope).not.toBeNull());
    await waitFor(() => expect(domScope.elements).toContain(rootRef.current));
    await waitFor(() => expect(domScope.elements).toContain(buttonRef.current));
    await waitFor(() => expect(domScope.elements).toContain(textInputRef.current));
    await waitFor(() => expect(domScope.elements.length).toBe(3));
});

test("when the hidden attribute of an element change, the scope is updated", async () => {
    let domScope: FocusScope = null;

    const onScopeChange = jest.fn();

    const buttonRef = createRef<HTMLButtonElement>();
    const textInputRef = createRef<HTMLInputElement>();

    const { rerender } = render(
        <Container onInitialScope={scope => { domScope = scope; }}>
            <Div>Decoy 1</Div>
            <Button ref={buttonRef} hidden>Button</Button>
            <Div>Decoy 2</Div>
            <TextInput placeholder="Value" ref={textInputRef} />
            <Div>Decoy 3</Div>
        </Container>
    );

    await waitFor(() => expect(domScope).not.toBeNull());
    await waitFor(() => expect(domScope.elements).not.toContain(buttonRef.current));
    await waitFor(() => expect(domScope.elements).toContain(textInputRef.current));
    await waitFor(() => expect(domScope.elements.length).toBe(1));

    domScope.registerChangeHandler(onScopeChange);

    rerender(
        <Container>
            <Div>Decoy 1</Div>
            <Button ref={buttonRef}>Button</Button>
            <Div>Decoy 2</Div>
            <TextInput placeholder="Value" ref={textInputRef} />
            <Div>Decoy 3</Div>
        </Container>
    );

    await waitFor(() => expect(onScopeChange).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(onScopeChange).toHaveBeenCalledWith([buttonRef.current, textInputRef.current], expect.anything()));
});

test("when the aria-hidden attribute of an element change, the scope is updated", async () => {
    let domScope: FocusScope = null;

    const onScopeChange = jest.fn();

    const buttonRef = createRef<HTMLButtonElement>();
    const textInputRef = createRef<HTMLInputElement>();

    const { rerender } = render(
        <Container onInitialScope={scope => { domScope = scope; }}>
            <Div>Decoy 1</Div>
            <Button ref={buttonRef} aria-hidden="true">Button</Button>
            <Div>Decoy 2</Div>
            <TextInput placeholder="Value" ref={textInputRef} />
            <Div>Decoy 3</Div>
        </Container>
    );

    await waitFor(() => expect(domScope).not.toBeNull());
    await waitFor(() => expect(domScope.elements).not.toContain(buttonRef.current));
    await waitFor(() => expect(domScope.elements).toContain(textInputRef.current));
    await waitFor(() => expect(domScope.elements.length).toBe(1));

    domScope.registerChangeHandler(onScopeChange);

    rerender(
        <Container>
            <Div>Decoy 1</Div>
            <Button ref={buttonRef}>Button</Button>
            <Div>Decoy 2</Div>
            <TextInput placeholder="Value" ref={textInputRef} />
            <Div>Decoy 3</Div>
        </Container>
    );

    await waitFor(() => expect(onScopeChange).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(onScopeChange).toHaveBeenCalledWith([buttonRef.current, textInputRef.current], expect.anything()));
});

test("when the display attribute of an element change, the scope is updated", async () => {
    let domScope: FocusScope = null;

    const onScopeChange = jest.fn();

    const buttonRef = createRef<HTMLButtonElement>();
    const textInputRef = createRef<HTMLInputElement>();

    const { rerender } = render(
        <Container onInitialScope={scope => { domScope = scope; }}>
            <Div>Decoy 1</Div>
            <Button ref={buttonRef} style={{ display: "none" }}>Button</Button>
            <Div>Decoy 2</Div>
            <TextInput placeholder="Value" ref={textInputRef} />
            <Div>Decoy 3</Div>
        </Container>
    );

    await waitFor(() => expect(domScope).not.toBeNull());
    await waitFor(() => expect(domScope.elements).not.toContain(buttonRef.current));
    await waitFor(() => expect(domScope.elements).toContain(textInputRef.current));
    await waitFor(() => expect(domScope.elements.length).toBe(1));

    domScope.registerChangeHandler(onScopeChange);

    rerender(
        <Container>
            <Div>Decoy 1</Div>
            <Button ref={buttonRef}>Button</Button>
            <Div>Decoy 2</Div>
            <TextInput placeholder="Value" ref={textInputRef} />
            <Div>Decoy 3</Div>
        </Container>
    );

    await waitFor(() => expect(onScopeChange).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(onScopeChange).toHaveBeenCalledWith([buttonRef.current, textInputRef.current], expect.anything()));
});

test("when the visibility attribute of an element change, the scope is updated", async () => {
    let domScope: FocusScope = null;

    const onScopeChange = jest.fn();

    const buttonRef = createRef<HTMLButtonElement>();
    const textInputRef = createRef<HTMLInputElement>();

    const { rerender } = render(
        <Container onInitialScope={scope => { domScope = scope; }}>
            <Div>Decoy 1</Div>
            <Button ref={buttonRef} style={{ visibility: "hidden" }}>Button</Button>
            <Div>Decoy 2</Div>
            <TextInput placeholder="Value" ref={textInputRef} />
            <Div>Decoy 3</Div>
        </Container>
    );

    await waitFor(() => expect(domScope).not.toBeNull());
    await waitFor(() => expect(domScope.elements).not.toContain(buttonRef.current));
    await waitFor(() => expect(domScope.elements).toContain(textInputRef.current));
    await waitFor(() => expect(domScope.elements.length).toBe(1));

    domScope.registerChangeHandler(onScopeChange);

    rerender(
        <Container>
            <Div>Decoy 1</Div>
            <Button ref={buttonRef}>Button</Button>
            <Div>Decoy 2</Div>
            <TextInput placeholder="Value" ref={textInputRef} />
            <Div>Decoy 3</Div>
        </Container>
    );

    await waitFor(() => expect(onScopeChange).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(onScopeChange).toHaveBeenCalledWith([buttonRef.current, textInputRef.current], expect.anything()));
});

test("when the class attribute of an element change, the scope is updated", async () => {
    let domScope: FocusScope = null;

    const onScopeChange = jest.fn();

    const buttonRef = createRef<HTMLButtonElement>();
    const textInputRef = createRef<HTMLInputElement>();

    const { rerender } = render(
        <Container onInitialScope={scope => { domScope = scope; }}>
            <Div>Decoy 1</Div>
            <Button ref={buttonRef} className="hidden">Button</Button>
            <Div>Decoy 2</Div>
            <TextInput placeholder="Value" ref={textInputRef} />
            <Div>Decoy 3</Div>
        </Container>
    );

    await waitFor(() => expect(domScope).not.toBeNull());
    await waitFor(() => expect(domScope.elements).toContain(buttonRef.current));
    await waitFor(() => expect(domScope.elements).toContain(textInputRef.current));
    await waitFor(() => expect(domScope.elements.length).toBe(2));

    domScope.registerChangeHandler(onScopeChange);

    rerender(
        <Container>
            <Div>Decoy 1</Div>
            <Button ref={buttonRef}>Button</Button>
            <Div>Decoy 2</Div>
            <TextInput placeholder="Value" ref={textInputRef} />
            <Div>Decoy 3</Div>
        </Container>
    );

    await waitFor(() => expect(onScopeChange).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(onScopeChange).toHaveBeenCalledWith([buttonRef.current, textInputRef.current], expect.anything()));
});
