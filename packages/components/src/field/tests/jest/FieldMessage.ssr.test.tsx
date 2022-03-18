/**
 * @jest-environment node
 */
import { ErrorMessage, ErrorMessageProps, HelpMessage, HelpMessageProps, ValidMessage, ValidMessageProps } from "@components/field";
import { forwardRef } from "react";
import { renderToString } from "react-dom/server";

const Help = forwardRef<HTMLElement, Omit<HelpMessageProps, "children">>((props, ref) => {
    return (
        <HelpMessage
            {...props}
            ref={ref}
        >
            Help!
        </HelpMessage>
    );
});

const Error = forwardRef<HTMLElement, Omit<ErrorMessageProps, "children">>((props, ref) => {
    return (
        <ErrorMessage
            {...props}
            ref={ref}
        >
            Error!
        </ErrorMessage>
    );
});

const Valid = forwardRef<HTMLElement, Omit<ValidMessageProps, "children">>((props, ref) => {
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
    // eslint-disable-next-line jest/valid-title
    describe(id, () => {
        test("can render on the server", async () => {
            const renderOnServer = () =>
                renderToString(
                    <Element />
                );

            expect(renderOnServer).not.toThrow();
        });
    });
});
