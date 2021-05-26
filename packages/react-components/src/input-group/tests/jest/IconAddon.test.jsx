import { IconAddon } from "@react-components/input-group";
import { LightbulbIcon } from "@react-components/icons";
import { createRef } from "react";
import { render, waitFor } from "@testing-library/react";

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef();

    render(
        <IconAddon ref={ref}>
            <LightbulbIcon />
        </IconAddon>
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("DIV");
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode = null;

    render(
        <IconAddon
            ref={node => {
                refNode = node;
            }}
        >
            <LightbulbIcon />
        </IconAddon>
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("DIV");
});

test("set ref once", async () => {
    const handler = jest.fn();

    render(
        <IconAddon ref={handler}>
            <LightbulbIcon />
        </IconAddon>
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
