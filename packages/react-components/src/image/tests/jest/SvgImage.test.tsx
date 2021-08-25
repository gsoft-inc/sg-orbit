import { ComponentProps, createRef, forwardRef } from "react";
import { SvgImage } from "@react-components/image";
import { render, waitFor } from "@testing-library/react";

const BasicSvg = forwardRef<SVGSVGElement, ComponentProps<"svg">>((props, ref) => {
    return (
        <svg
            {...props}
            width="32"
            height="32"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            ref={ref}
        >
            <path d="M16 6.25a.75.75 0 01.75.75v8.25H25a.75.75 0 010 1.5h-8.25V25a.75.75 0 01-1.5 0v-8.25H7a.75.75 0 010-1.5h8.25V7a.75.75 0 01.75-.75z" />
            <path d="M16 6.25a.75.75 0 01.75.75v8.25H25a.75.75 0 010 1.5h-8.25V25a.75.75 0 01-1.5 0v-8.25H7a.75.75 0 010-1.5h8.25V7a.75.75 0 01.75-.75z" />
            <path d="M16 6.25a.75.75 0 01.75.75v8.25H25a.75.75 0 010 1.5h-8.25V25a.75.75 0 01-1.5 0v-8.25H7a.75.75 0 010-1.5h8.25V7a.75.75 0 01.75-.75z" />
        </svg>
    );
});

const SvgWithTitle = forwardRef<SVGSVGElement, ComponentProps<"svg">>((props, ref) => {
    return (
        <svg
            {...props}
            width="32"
            height="32"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            ref={ref}
        >
            <title>SVG title</title>
            <path d="M16 6.25a.75.75 0 01.75.75v8.25H25a.75.75 0 010 1.5h-8.25V25a.75.75 0 01-1.5 0v-8.25H7a.75.75 0 010-1.5h8.25V7a.75.75 0 01.75-.75z" />
            <path d="M16 6.25a.75.75 0 01.75.75v8.25H25a.75.75 0 010 1.5h-8.25V25a.75.75 0 01-1.5 0v-8.25H7a.75.75 0 010-1.5h8.25V7a.75.75 0 01.75-.75z" />
            <path d="M16 6.25a.75.75 0 01.75.75v8.25H25a.75.75 0 010 1.5h-8.25V25a.75.75 0 01-1.5 0v-8.25H7a.75.75 0 010-1.5h8.25V7a.75.75 0 01.75-.75z" />
        </svg>
    );
});

// ***** Behaviors *****

test("an aria-hidden attribute is added to all the path elements of the svg", async () => {
    const { getByTestId } = render(
        <SvgImage data-testid="svg" src={BasicSvg} aria-label="Basic SVG" />
    );

    const paths = getByTestId("svg").querySelectorAll("path");

    await waitFor(() => expect(paths[0]).toHaveAttribute("aria-hidden", "true"));
    await waitFor(() => expect(paths[1]).toHaveAttribute("aria-hidden", "true"));
    await waitFor(() => expect(paths[2]).toHaveAttribute("aria-hidden", "true"));
});

test("remove the title element of the svg", async () => {
    const { getByTestId } = render(
        <SvgImage data-testid="svg" src={SvgWithTitle} aria-label="Basic SVG" />
    );

    await waitFor(() => expect(getByTestId("svg").querySelector("title")).toBeNull());
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef<HTMLElement>();

    render(
        <SvgImage ref={ref} src={BasicSvg} aria-label="Basic SVG" />
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof SVGElement).toBeTruthy();
    expect(ref.current.tagName.toUpperCase()).toBe("SVG");
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode: HTMLElement = null;

    render(
        <SvgImage
            src={BasicSvg}
            aria-label="Basic SVG"
            ref={node => {
                refNode = node;
            }}
        />
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    expect(refNode instanceof SVGElement).toBeTruthy();
    expect(refNode.tagName.toUpperCase()).toBe("SVG");
});

test("set ref once", async () => {
    const handler = jest.fn();

    render(
        <SvgImage
            src={BasicSvg}
            aria-label="Basic SVG"
            ref={handler}
        />
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
