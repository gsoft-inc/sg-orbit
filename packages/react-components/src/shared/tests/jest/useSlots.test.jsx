import { Box } from "@react-components/box";
import { ErrorBoundary, muteConsoleErrors } from "@utils/error-handling";
import { createRef, forwardRef } from "react";
import { render, waitFor } from "@testing-library/react";
import { slot, useSlots } from "@react-components/shared";

// Errors in useEffect are not catch by @testing-library/react-hooks error handling code. Therefore we must catch those errors with a custom ErrorBoundary.
function withErrorBoundary(onError) {
    return {
        wrapper: ({ children }) => <ErrorBoundary onError={onError}>{children}</ErrorBoundary>
    };
}

function muteReactTestRendererConsoleErrors() {
    return muteConsoleErrors(["The above error occurred in the <ForwardRef> component:", "Required slot \"content\" must receive a component."]);
}

const RequiredCard = forwardRef(({ children, ...rest }, ref) => {
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
        <Box
            {...rest}
            ref={ref}
        >
            {title}
            {content}
        </Box>
    );
});

const Wrapper = slot("content", ({ children }) => {
    return (
        <div data-testid="wrapper">
            {children}
        </div>
    );
});

function DefaultedCard({ children, ...rest }) {
    const { content } = useSlots(children, {
        _: {
            defaultWrapper: Wrapper
        },
        content: null
    });

    return (
        <Box {...rest}>
            {content}
        </Box>
    );
}

test("throw an exception when a required slot is not fulfilled", () => {
    let hasError = false;

    const unmuteErrors = muteReactTestRendererConsoleErrors();

    render(
        <RequiredCard>
            <Box>Content</Box>
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
            <Box slot="content">Content</Box>
        </RequiredCard>,
        withErrorBoundary(() => {
            hasError = true;
        })
    );

    expect(hasError).toBeFalsy();
});

test("do not wrap when there are no children", () => {
    const { queryByTestId } = render(
        <DefaultedCard>
        </DefaultedCard>
    );

    expect(queryByTestId("wrapper")).toBeNull();
});

test("support ref", async () => {
    const ref = createRef();

    render(
        <RequiredCard>
            <Box ref={ref} slot="content">Content</Box>
        </RequiredCard>
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("DIV");
});
