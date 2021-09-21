import { Div, DivProps } from "@react-components/html";
import { ErrorBoundary, muteConsoleErrors } from "@utils/errorHandling";
import { ReactNode, createRef, forwardRef } from "react";
import { render, waitFor } from "@testing-library/react";
import { slot, useSlots } from "@react-components/shared";

// Errors in useEffect are not catch by @testing-library/react-hooks error handling code. Therefore we must catch those errors with a custom ErrorBoundary.
function withErrorBoundary(onError: (error: Error) => void) {
    return {
        wrapper: ({ children }: { children?: ReactNode }) => <ErrorBoundary onError={onError}>{children}</ErrorBoundary>
    };
}

function muteReactTestRendererConsoleErrors() {
    return muteConsoleErrors(["The above error occurred in the <ForwardRef> component:", "Required slot \"content\" must receive a component."]);
}

const RequiredCard = forwardRef<HTMLDivElement, DivProps>(({ children, ...rest }, ref) => {
    const { title, content } = useSlots(children, {
        _: {
            required: ["content"]
        },
        title: null,
        content: {
            style: {
                backgroundColor: "blue",
                color: "white"
            }
        }
    });

    return (
        <Div
            {...rest}
            ref={ref}
        >
            {title}
            {content}
        </Div>
    );
});

const FunctionalRequiredCard = forwardRef<HTMLDivElement, DivProps>(({ children, ...rest }, ref) => {
    const { title, content } = useSlots(children, {
        _: {
            required: slotElements => {
                return Object.keys(slotElements).some(x => x === "content")
                    ? []
                    : ["content"];
            }
        },
        title: null,
        content: null
    });

    return (
        <Div
            {...rest}
            ref={ref}
        >
            {title}
            {content}
        </Div>
    );
});

const Wrapper = slot("content", ({ children }: { children?: ReactNode }) => {
    return (
        <Div data-testid="wrapper">
            {children}
        </Div>
    );
});

function DefaultedCard({ children, ...rest }: DivProps) {
    const { content } = useSlots(children, {
        _: {
            defaultWrapper: Wrapper
        },
        content: null
    });

    return (
        <Div {...rest}>
            {content}
        </Div>
    );
}

test("throw an exception when a required slot is not fulfilled", () => {
    let hasError = false;

    const unmuteErrors = muteReactTestRendererConsoleErrors();

    render(
        <RequiredCard>
            <Div>Content</Div>
        </RequiredCard>,
        withErrorBoundary(() => {
            hasError = true;
        })
    );

    unmuteErrors();

    expect(hasError).toBeTruthy();
});

test("do not throw an exception when a required slot is fulfilled", () => {
    let hasError = false;

    render(
        <RequiredCard>
            <Div slot="content">Content</Div>
        </RequiredCard>,
        withErrorBoundary(() => {
            hasError = true;
        })
    );

    expect(hasError).toBeFalsy();
});

test("throw an exception when required is a function and unfilled slots are returned", () => {
    let hasError = false;

    const unmuteErrors = muteReactTestRendererConsoleErrors();

    render(
        <FunctionalRequiredCard>
            <Div>Content</Div>
        </FunctionalRequiredCard>,
        withErrorBoundary(() => {
            hasError = true;
        })
    );

    unmuteErrors();

    expect(hasError).toBeTruthy();
});

test("do not throw an exception when required is a function and no unfilled slots are returned", () => {
    let hasError = false;

    render(
        <FunctionalRequiredCard>
            <Div slot="content">Content</Div>
        </FunctionalRequiredCard>,
        withErrorBoundary(() => {
            hasError = true;
        })
    );

    expect(hasError).toBeFalsy();
});

test("do not wrap when there are no children", () => {
    const { queryByTestId } = render(
        <DefaultedCard />
    );

    expect(queryByTestId("wrapper")).toBeNull();
});

test("support ref", async () => {
    const ref = createRef<HTMLDivElement>();

    render(
        <RequiredCard>
            <Div ref={ref} slot="content">Content</Div>
        </RequiredCard>
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("DIV");
});
