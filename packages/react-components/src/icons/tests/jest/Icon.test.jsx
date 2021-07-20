import { AzureIcon32 } from "./assets";
import { Icon, createIcon } from "@react-components/icons";
import { render, waitFor } from "@testing-library/react";

function createAzureIcon(props = {}) {
    return <Icon
        src={AzureIcon32}
        {...props}
    />;
}

// ***** Refs *****

test("ref is a DOM element", async () => {
    let refNode = null;

    render(
        createAzureIcon({
            ref: node => {
                refNode = node;
            }
        })
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    expect(refNode instanceof SVGElement).toBeTruthy();
    expect(refNode.tagName.toUpperCase()).toBe("SVG");
});

test("hoc icon ref is a DOM element", async () => {
    let refNode = null;

    const HocIcon = createIcon(AzureIcon32);

    render(
        <HocIcon
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
        createAzureIcon({
            ref: handler
        })
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
