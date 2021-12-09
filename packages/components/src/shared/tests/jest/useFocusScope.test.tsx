import { DomScope, useFocusScope, useMergedRefs } from "@components/shared";
import { ReactNode, createRef, forwardRef } from "react";
import { render, waitFor } from "@testing-library/react";

import { Button } from "@components/button";
import { Disclosure } from "@components/disclosure";
import { Div } from "@components/html";
import { TextInput } from "@components/text-input";

interface FocusScopeProps {
    tabIndex?: number;
    onInitialScope?: (scope: DomScope) => void;
    children: ReactNode;
}

const FocusScope = forwardRef(({ children, onInitialScope, ...props }: FocusScopeProps, ref) => {
    const [scope, scopeRef] = useFocusScope();

    const containerRef = useMergedRefs(scopeRef, ref);

    onInitialScope(scope);

    return (
        <Div ref={containerRef} {...props}>
            {children}
        </Div>
    );
});

test("the scope includes only focusable elements", async () => {
    let scope: DomScope = null;

    const buttonRef = createRef<HTMLButtonElement>();
    const textInputRef = createRef<HTMLInputElement>();

    render(
        <FocusScope onInitialScope={x => { scope = x; }}>
            <Div>Decoy 1</Div>
            <Button ref={buttonRef}>Button</Button>
            <Div>Decoy 2</Div>
            <TextInput placeholder="Value" ref={textInputRef} />
            <Div>Decoy 3</Div>
        </FocusScope>
    );

    // console.log(scope.elements);

    await waitFor(() => expect(scope).not.toBeNull());
    await waitFor(() => expect(scope.elements).toContain(buttonRef.current));
    await waitFor(() => expect(scope.elements).toContain(textInputRef.current));
    await waitFor(() => expect(scope.elements.length).toBe(2));
});

test("the scope does not contains non tabbable elements", async () => {
    let scope: DomScope = null;

    const buttonRef = createRef<HTMLButtonElement>();
    const textInputRef = createRef<HTMLInputElement>();

    render(
        <FocusScope onInitialScope={x => { scope = x; }}>
            <Div>Decoy 1</Div>
            <Button tabIndex={-1} ref={buttonRef}>Button</Button>
            <Div>Decoy 2</Div>
            <TextInput placeholder="Value" ref={textInputRef} />
            <Div>Decoy 3</Div>
        </FocusScope>
    );

    await waitFor(() => expect(scope).not.toBeNull());
    await waitFor(() => expect(scope.elements).not.toContain(buttonRef.current));
    await waitFor(() => expect(scope.elements).toContain(textInputRef.current));
    await waitFor(() => expect(scope.elements.length).toBe(1));
});

test("the scope does not includes focusable elements that are not visible", async () => {
    let scope: DomScope = null;

    const buttonRef = createRef<HTMLButtonElement>();
    const disclosureButtonRef = createRef<HTMLButtonElement>();
    const textInputRef = createRef<HTMLInputElement>();

    render(
        <FocusScope onInitialScope={x => { scope = x; }}>
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
        </FocusScope>
    );

    await waitFor(() => expect(scope).not.toBeNull());
    await waitFor(() => expect(scope.elements).toContain(buttonRef.current));
    await waitFor(() => expect(scope.elements).toContain(disclosureButtonRef.current));
    await waitFor(() => expect(scope.elements).not.toContain(textInputRef.current));
    await waitFor(() => expect(scope.elements.length).toBe(2));
});

test("when the root element is focusable, the scope includes the root element", async () => {
    let scope: DomScope = null;

    const rootRef = createRef<HTMLDivElement>();
    const buttonRef = createRef<HTMLButtonElement>();
    const textInputRef = createRef<HTMLInputElement>();

    render(
        <FocusScope tabIndex={1} ref={rootRef} onInitialScope={x => { scope = x; }}>
            <Div>Decoy 1</Div>
            <Button ref={buttonRef}>Button</Button>
            <Div>Decoy 2</Div>
            <TextInput placeholder="Value" ref={textInputRef} />
            <Div>Decoy 3</Div>
        </FocusScope>
    );

    await waitFor(() => expect(scope).not.toBeNull());
    await waitFor(() => expect(scope.elements).toContain(rootRef.current));
    await waitFor(() => expect(scope.elements).toContain(buttonRef.current));
    await waitFor(() => expect(scope.elements).toContain(textInputRef.current));
    await waitFor(() => expect(scope.elements.length).toBe(3));
});
