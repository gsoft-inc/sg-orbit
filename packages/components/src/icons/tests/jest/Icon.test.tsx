import { AzureIcon32 } from "./assets";
import { Icon, IconProps, createIcon } from "@components/icons";
import { renderWithTheme, waitFor } from "@test-utils";

function createAzureIcon(props: Omit<IconProps, "src"> = {}) {
    return <Icon
        src={AzureIcon32}
        {...props}
    />;
}

// ***** Refs *****

test("ref is a DOM element", async () => {
    let refNode: SVGSVGElement = null;

    renderWithTheme(
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
    let refNode: SVGSVGElement = null;

    const HocIcon = createIcon(AzureIcon32);

    renderWithTheme(
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

    renderWithTheme(
        createAzureIcon({
            ref: handler
        })
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
