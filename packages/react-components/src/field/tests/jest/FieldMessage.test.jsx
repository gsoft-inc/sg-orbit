import { ErrorMessage, HelpMessage, ValidMessage } from "@react-components/field";
import { createRef, forwardRef } from "react";
import { render, waitFor } from "@testing-library/react";

const Help = forwardRef((props, ref) => {
    return (
        <HelpMessage
            {...props}
            ref={ref}
        >
            Help!
        </HelpMessage>
    );
});

const Error = forwardRef((props, ref) => {
    return (
        <ErrorMessage
            {...props}
            ref={ref}
        >
            Error!
        </ErrorMessage>
    );
});

const Valid = forwardRef((props, ref) => {
    return (
        <ValidMessage
            {...props}
            ref={ref}
        >
            Valid!
        </ValidMessage>
    );
});

// ***** Refs *****

[
    [Help, "help"],
    [Error, "error"],
    [Valid, "valid"]
].forEach(([Element, id]) => {
    describe(id, () => {
        test("ref is a DOM element", async () => {
            const ref = createRef();

            render(
                <Element ref={ref} />
            );

            await waitFor(() => expect(ref.current).not.toBeNull());

            expect(ref.current instanceof HTMLElement).toBeTruthy();
            expect(ref.current.tagName).toBe("DIV");
        });

        test("when using a callback ref, ref is a DOM element", async () => {
            let refNode = null;

            render(
                <Element
                    ref={node => {
                        refNode = node;
                    }}
                />
            );

            await waitFor(() => expect(refNode).not.toBeNull());

            expect(refNode instanceof HTMLElement).toBeTruthy();
            expect(refNode.tagName).toBe("DIV");
        });

        test("set ref once", async () => {
            const handler = jest.fn();

            render(
                <Element ref={handler} />
            );

            await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
        });
    });
});
