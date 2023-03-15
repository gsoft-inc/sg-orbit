import { Loader } from "@components/loader";
import { createRef } from "react";
import { renderWithTheme } from "@test-utils";
import { screen, waitFor } from "@testing-library/react";

// ***** Api *****
test("when delay is specified, the spinner is not visible during that time", async () => {
    renderWithTheme(
        <Loader delay={800} aria-label="Loading..." />
    );

    const spinner = await screen.findByLabelText("Loading...");
    expect(spinner).not.toHaveClass("o-ui-loader-show");

    await waitFor(() => expect(spinner).toHaveClass("o-ui-loader-show"), { timeout: 1000 });
});

test("when no delay, the spinner is visible during that time instantly", async () => {
    renderWithTheme(
        <Loader aria-label="Loading..." />
    );

    const spinner = await screen.findByLabelText("Loading...");
    expect(spinner).toHaveClass("o-ui-loader-show");
});


// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef<HTMLElement>();

    renderWithTheme(
        <Loader aria-label="Loading..." ref={ref} />
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("DIV");
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode: HTMLElement = null;

    renderWithTheme(
        <Loader
            aria-label="Loading..."
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

    renderWithTheme(
        <Loader ref={handler} aria-label="Loading..." />
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
