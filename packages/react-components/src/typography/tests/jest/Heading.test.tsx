import { H1, Heading } from "@react-components/typography";
import { createRef } from "react";
import { render, waitFor } from "@testing-library/react";

// ***** Refs *****

describe("Heading", () => {
    test("ref is a DOM element", async () => {
        const ref = createRef<HTMLElement>();

        render(
            <Heading ref={ref}>Header</Heading>
        );

        await waitFor(() => expect(ref.current).not.toBeNull());

        expect(ref.current instanceof HTMLElement).toBeTruthy();
        expect(ref.current.tagName).toBe("DIV");
    });

    test("when using a callback ref, ref is a DOM element", async () => {
        let refNode: HTMLElement = null;

        render(
            <Heading
                ref={node => {
                    refNode = node;
                }}
            >
                Header
            </Heading>
        );

        await waitFor(() => expect(refNode).not.toBeNull());

        expect(refNode instanceof HTMLElement).toBeTruthy();
        expect(refNode.tagName).toBe("DIV");
    });

    test("set ref once", async () => {
        const handler = jest.fn();

        render(
            <Heading
                ref={handler}
            >
                Header
            </Heading>
        );

        await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
    });
});

describe("H1", () => {
    test("ref is a DOM element", async () => {
        const ref = createRef<HTMLElement>();

        render(
            <H1 ref={ref}>Header</H1>
        );

        await waitFor(() => expect(ref.current).not.toBeNull());

        expect(ref.current instanceof HTMLElement).toBeTruthy();
        expect(ref.current.tagName).toBe("H1");
    });

    test("when using a callback ref, ref is a DOM element", async () => {
        let refNode: HTMLElement = null;

        render(
            <H1
                ref={node => {
                    refNode = node;
                }}
            >
                Header
            </H1>
        );

        await waitFor(() => expect(refNode).not.toBeNull());

        expect(refNode instanceof HTMLElement).toBeTruthy();
        expect(refNode.tagName).toBe("H1");
    });

    test("set ref once", async () => {
        const handler = jest.fn();

        render(
            <H1
                ref={handler}
            >
                Header
            </H1>
        );

        await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
    });
});
