import { Div } from "@components/html";
import { Grid, GridProps } from "@components/layout";
import { createRef, forwardRef } from "react";
import { renderWithTheme } from "@utils";
import { waitFor } from "@testing-library/react";

const SimpleGrid = forwardRef<HTMLDivElement, Omit<GridProps, "children">>((props, ref) => {
    return (
        <Grid
            {...props}
            ref={ref}
        >
            <Div>Alpha</Div>
            <Div>Bravo</Div>
            <Div>Charlie</Div>
        </Grid>
    );
});

test("ref is a DOM element", async () => {
    const ref = createRef<HTMLDivElement>();

    renderWithTheme(
        <SimpleGrid ref={ref} />
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLDivElement).toBeTruthy();
    expect(ref.current.tagName).toBe("DIV");
});

test("using a callback ref, ref is a DOM element", async () => {
    let refNode: HTMLDivElement = null;

    renderWithTheme(
        <SimpleGrid
            ref={node => {
                refNode = node;
            }}
        />
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    expect(refNode instanceof HTMLDivElement).toBeTruthy();
    expect(refNode.tagName).toBe("DIV");
});

test("set ref once", async () => {
    const handler = jest.fn();

    renderWithTheme(
        <SimpleGrid ref={handler} />
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
