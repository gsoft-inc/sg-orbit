import { FocusScope, FocusScopeContext, isFunction, useFocusScope, useMergedRefs } from "@components/shared";
import { ReactNode, createRef, forwardRef } from "react";
import { render, waitFor } from "@testing-library/react";

import { Button } from "@components/button";
import { Disclosure } from "@components/disclosure";
import { Div } from "@components/html";
import { Item } from "@components/collection";
import { Select } from "@components/select";
import { TextInput } from "@components/text-input";
import { renderWithTheme } from "@jest-utils";

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

const ScopeContextContainer = forwardRef(({ children, onInitialScope, ...props }: FocusScopeProps, ref) => {
    const [focusScope, focusScopeRef] = useFocusScope();

    const containerRef = useMergedRefs(focusScopeRef, ref);

    if (isFunction(onInitialScope)) {
        onInitialScope(focusScope);
    }

    return (
        <Div ref={containerRef} {...props}>
            <FocusScopeContext.Provider value={{ scope: focusScope }}>
                {children}
            </FocusScopeContext.Provider>
        </Div>
    );
});

test("the scope includes only focusable elements", async () => {
    let focusScope: FocusScope = null;

    const buttonRef = createRef<HTMLButtonElement>();
    const textInputRef = createRef<HTMLInputElement>();

    render(
        <Container onInitialScope={scope => { focusScope = scope; }}>
            <Div>Decoy 1</Div>
            <Button ref={buttonRef}>Button</Button>
            <Div>Decoy 2</Div>
            <TextInput placeholder="Value" ref={textInputRef} />
            <Div>Decoy 3</Div>
        </Container>
    );

    await waitFor(() => expect(focusScope).not.toBeNull());
    await waitFor(() => expect(focusScope.getElements()).toContain(buttonRef.current));
    await waitFor(() => expect(focusScope.getElements()).toContain(textInputRef.current));
    await waitFor(() => expect(focusScope.getElements().length).toBe(2));
});

test("the scope can includes non tabbable elements", async () => {
    let focusScope: FocusScope = null;

    const buttonRef = createRef<HTMLButtonElement>();
    const textInputRef = createRef<HTMLInputElement>();

    render(
        <Container onInitialScope={scope => { focusScope = scope; }}>
            <Div>Decoy 1</Div>
            <Button tabIndex={-1} ref={buttonRef}>Button</Button>
            <Div>Decoy 2</Div>
            <TextInput placeholder="Value" ref={textInputRef} />
            <Div>Decoy 3</Div>
        </Container>
    );

    await waitFor(() => expect(focusScope).not.toBeNull());
    await waitFor(() => expect(focusScope.getElements()).toContain(buttonRef.current));
    await waitFor(() => expect(focusScope.getElements()).toContain(textInputRef.current));
    await waitFor(() => expect(focusScope.getElements().length).toBe(2));
});

test("the scope does not includes focusable elements that are not visible", async () => {
    let focusScope: FocusScope = null;

    const buttonRef = createRef<HTMLButtonElement>();
    const textInputRef = createRef<HTMLInputElement>();

    render(
        <Container onInitialScope={scope => { focusScope = scope; }}>
            <Div>Decoy 1</Div>
            <Button ref={buttonRef} hidden>Button</Button>
            <Div>Decoy 2</Div>
            <TextInput placeholder="Value" ref={textInputRef} />
            <Div>Decoy 3</Div>
        </Container>
    );

    await waitFor(() => expect(focusScope).not.toBeNull());
    await waitFor(() => expect(focusScope.getElements()).not.toContain(buttonRef.current));
    await waitFor(() => expect(focusScope.getElements()).toContain(textInputRef.current));
    await waitFor(() => expect(focusScope.getElements().length).toBe(1));
});

test("the scope does not includes focusable elements with a parent that is not visible", async () => {
    let focusScope: FocusScope = null;

    const buttonRef = createRef<HTMLButtonElement>();
    const disclosureButtonRef = createRef<HTMLButtonElement>();
    const textInputRef = createRef<HTMLInputElement>();

    render(
        <Container onInitialScope={scope => { focusScope = scope; }}>
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

    await waitFor(() => expect(focusScope).not.toBeNull());
    await waitFor(() => expect(focusScope.getElements()).toContain(buttonRef.current));
    await waitFor(() => expect(focusScope.getElements()).toContain(disclosureButtonRef.current));
    await waitFor(() => expect(focusScope.getElements()).not.toContain(textInputRef.current));
    await waitFor(() => expect(focusScope.getElements().length).toBe(2));
});

test("when the root element is focusable, the scope includes the root element", async () => {
    let focusScope: FocusScope = null;

    const rootRef = createRef<HTMLDivElement>();
    const buttonRef = createRef<HTMLButtonElement>();
    const textInputRef = createRef<HTMLInputElement>();

    render(
        <Container tabIndex={1} ref={rootRef} onInitialScope={scope => { focusScope = scope; }}>
            <Div>Decoy 1</Div>
            <Button ref={buttonRef}>Button</Button>
            <Div>Decoy 2</Div>
            <TextInput placeholder="Value" ref={textInputRef} />
            <Div>Decoy 3</Div>
        </Container>
    );

    await waitFor(() => expect(focusScope).not.toBeNull());
    await waitFor(() => expect(focusScope.getElements()).toContain(rootRef.current));
    await waitFor(() => expect(focusScope.getElements()).toContain(buttonRef.current));
    await waitFor(() => expect(focusScope.getElements()).toContain(textInputRef.current));
    await waitFor(() => expect(focusScope.getElements().length).toBe(3));
});

test("when the hidden attribute of an element change, the scope is updated", async () => {
    let focusScope: FocusScope = null;

    const onScopeChange = jest.fn();

    const buttonRef = createRef<HTMLButtonElement>();
    const textInputRef = createRef<HTMLInputElement>();

    const { rerender } = render(
        <Container onInitialScope={scope => { focusScope = scope; }}>
            <Div>Decoy 1</Div>
            <Button ref={buttonRef} hidden>Button</Button>
            <Div>Decoy 2</Div>
            <TextInput placeholder="Value" ref={textInputRef} />
            <Div>Decoy 3</Div>
        </Container>
    );

    await waitFor(() => expect(focusScope).not.toBeNull());
    await waitFor(() => expect(focusScope.getElements()).not.toContain(buttonRef.current));
    await waitFor(() => expect(focusScope.getElements()).toContain(textInputRef.current));
    await waitFor(() => expect(focusScope.getElements().length).toBe(1));

    focusScope.registerChangeHandler(onScopeChange);

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
    let focusScope: FocusScope = null;

    const onScopeChange = jest.fn();

    const buttonRef = createRef<HTMLButtonElement>();
    const textInputRef = createRef<HTMLInputElement>();

    const { rerender } = render(
        <Container onInitialScope={scope => { focusScope = scope; }}>
            <Div>Decoy 1</Div>
            <Button ref={buttonRef} style={{ display: "none" }}>Button</Button>
            <Div>Decoy 2</Div>
            <TextInput placeholder="Value" ref={textInputRef} />
            <Div>Decoy 3</Div>
        </Container>
    );

    await waitFor(() => expect(focusScope).not.toBeNull());
    await waitFor(() => expect(focusScope.getElements()).not.toContain(buttonRef.current));
    await waitFor(() => expect(focusScope.getElements()).toContain(textInputRef.current));
    await waitFor(() => expect(focusScope.getElements().length).toBe(1));

    focusScope.registerChangeHandler(onScopeChange);

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
    let focusScope: FocusScope = null;

    const onScopeChange = jest.fn();

    const buttonRef = createRef<HTMLButtonElement>();
    const textInputRef = createRef<HTMLInputElement>();

    const { rerender } = render(
        <Container onInitialScope={scope => { focusScope = scope; }}>
            <Div>Decoy 1</Div>
            <Button ref={buttonRef} style={{ visibility: "hidden" }}>Button</Button>
            <Div>Decoy 2</Div>
            <TextInput placeholder="Value" ref={textInputRef} />
            <Div>Decoy 3</Div>
        </Container>
    );

    await waitFor(() => expect(focusScope).not.toBeNull());
    await waitFor(() => expect(focusScope.getElements()).not.toContain(buttonRef.current));
    await waitFor(() => expect(focusScope.getElements()).toContain(textInputRef.current));
    await waitFor(() => expect(focusScope.getElements().length).toBe(1));

    focusScope.registerChangeHandler(onScopeChange);

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
    let focusScope: FocusScope = null;

    const onScopeChange = jest.fn();

    const buttonRef = createRef<HTMLButtonElement>();
    const textInputRef = createRef<HTMLInputElement>();

    const { rerender } = render(
        <Container onInitialScope={scope => { focusScope = scope; }}>
            <Div>Decoy 1</Div>
            <Button ref={buttonRef} className="hidden">Button</Button>
            <Div>Decoy 2</Div>
            <TextInput placeholder="Value" ref={textInputRef} />
            <Div>Decoy 3</Div>
        </Container>
    );

    await waitFor(() => expect(focusScope).not.toBeNull());
    await waitFor(() => expect(focusScope.getElements()).toContain(buttonRef.current));
    await waitFor(() => expect(focusScope.getElements()).toContain(textInputRef.current));
    await waitFor(() => expect(focusScope.getElements().length).toBe(2));

    focusScope.registerChangeHandler(onScopeChange);

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

test("when a nested overlay component is defined and the child scopes are included, isInScope return true for an element of the nested overlay component", async () => {
    let focusScope: FocusScope = null;

    const itemRef = createRef<HTMLDivElement>();

    renderWithTheme(
        <ScopeContextContainer onInitialScope={scope => { focusScope = scope; }}>
            <Div>Decoy 1</Div>
            <Select defaultOpen>
                <Item id="item-1">Item 1</Item>
                <Item id="item-2" ref={itemRef}>Item 2</Item>
                <Item id="item-3">Item 3</Item>
            </Select>
            <Div>Decoy 2</Div>
        </ScopeContextContainer>
    );

    await waitFor(() => expect(focusScope).not.toBeNull());
    await waitFor(() => expect(focusScope.isInScope(itemRef.current, { includeChildScopes: true })).toBeTruthy());
});

test("when a nested overlay component is defined and the child scopes are not included, isInScope return false for an element of the nested overlay component", async () => {
    let focusScope: FocusScope = null;

    const itemRef = createRef<HTMLDivElement>();

    renderWithTheme(
        <ScopeContextContainer onInitialScope={scope => { focusScope = scope; }}>
            <Div>Decoy 1</Div>
            <Select defaultOpen>
                <Item id="item-1">Item 1</Item>
                <Item id="item-2" ref={itemRef}>Item 2</Item>
                <Item id="item-3">Item 3</Item>
            </Select>
            <Div>Decoy 2</Div>
        </ScopeContextContainer>
    );

    await waitFor(() => expect(focusScope).not.toBeNull());
    await waitFor(() => expect(focusScope.isInScope(itemRef.current, { includeChildScopes: false })).toBeFalsy());
});

test("when a nested overlay component is defined and the child scopes are included, getElements return the elements of the nested overlay component", async () => {
    let focusScope: FocusScope = null;

    renderWithTheme(
        <ScopeContextContainer onInitialScope={scope => { focusScope = scope; }}>
            <Div>Decoy 1</Div>
            <Select defaultOpen>
                <Item id="item-1">Item 1</Item>
                <Item id="item-2">Item 2</Item>
                <Item id="item-3">Item 3</Item>
            </Select>
            <Div>Decoy 2</Div>
        </ScopeContextContainer>
    );

    await waitFor(() => expect(focusScope).not.toBeNull());
    await waitFor(() => expect(focusScope.getElements({ includeChildScopes: true })).toHaveLength(4));
});

test("when a nested overlay component is defined and the child scopes are not included, getElements does not return the elements of the nested overlay component", async () => {
    let focusScope: FocusScope = null;

    renderWithTheme(
        <ScopeContextContainer onInitialScope={scope => { focusScope = scope; }}>
            <Div>Decoy 1</Div>
            <Select defaultOpen>
                <Item id="item-1">Item 1</Item>
                <Item id="item-2">Item 2</Item>
                <Item id="item-3">Item 3</Item>
            </Select>
            <Div>Decoy 2</Div>
        </ScopeContextContainer>
    );

    await waitFor(() => expect(focusScope).not.toBeNull());
    await waitFor(() => expect(focusScope.getElements({ includeChildScopes: false })).toHaveLength(1));
});

test("when a nested overlay component is defined, register it's scope as a child scope", async () => {
    let focusScope: FocusScope = null;

    const itemRef = createRef<HTMLDivElement>();

    renderWithTheme(
        <ScopeContextContainer onInitialScope={scope => { focusScope = scope; }}>
            <Div>Decoy 1</Div>
            <Select defaultOpen>
                <Item id="item-1">Item 1</Item>
                <Item id="item-2" ref={itemRef}>Item 2</Item>
                <Item id="item-3">Item 3</Item>
            </Select>
            <Div>Decoy 2</Div>
        </ScopeContextContainer>
    );

    await waitFor(() => expect(focusScope).not.toBeNull());
    await waitFor(() => expect(focusScope.isInScope(itemRef.current, { includeChildScopes: true })).toBeTruthy());
});

test("when a nested overlay component is defined, remove it's child scope on unmount", async () => {
    let focusScope: FocusScope = null;

    const itemRef = createRef<HTMLDivElement>();

    const { unmount } = renderWithTheme(
        <ScopeContextContainer onInitialScope={scope => { focusScope = scope; }}>
            <Div>Decoy 1</Div>
            <Select defaultOpen>
                <Item id="item-1">Item 1</Item>
                <Item id="item-2" ref={itemRef}>Item 2</Item>
                <Item id="item-3">Item 3</Item>
            </Select>
            <Div>Decoy 2</Div>
        </ScopeContextContainer>
    );

    await waitFor(() => expect(focusScope).not.toBeNull());
    await waitFor(() => expect(focusScope.isInScope(itemRef.current, { includeChildScopes: true })).toBeTruthy());

    unmount();

    await waitFor(() => expect(focusScope).not.toBeNull());
    await waitFor(() => expect(focusScope.isInScope(itemRef.current, { includeChildScopes: true })).toBeFalsy());
});
