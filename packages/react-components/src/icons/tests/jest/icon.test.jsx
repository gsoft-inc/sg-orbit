import { AzureIcon32 } from "./assets";
import { Icon } from "@react-components/icons";
import { render, wait } from "@testing-library/react";

function createIcon(props = {}) {
    return <Icon
        type={AzureIcon32}
        {...props}
    />;
}

// ***** API *****

test("has \"icon\" class", async () => {
    const { container } = render(createIcon());

    await wait();

    expect(container.querySelector("svg.icon")).not.toBeNull();
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    let refNode = null;

    render(
        createIcon({
            ref: node => {
                refNode = node;
            }
        })
    );

    await wait();

    expect(refNode).not.toBeNull();
    expect(refNode instanceof SVGElement).toBeTruthy();
    expect(refNode.tagName.toUpperCase()).toBe("SVG");
});

test("hoc icon ref is a DOM element", async () => {
    let refNode = null;

    const HocIcon = Icon.create(AzureIcon32);

    render(
        <HocIcon
            ref={node => {
                refNode = node;
            }}
        />
    );

    await wait();

    expect(refNode).not.toBeNull();
    expect(refNode instanceof SVGElement).toBeTruthy();
    expect(refNode.tagName.toUpperCase()).toBe("SVG");
});

test("set ref once", async () => {
    const handler = jest.fn();

    render(
        createIcon({
            ref: handler
        })
    );

    await wait();

    expect(handler).toHaveBeenCalledTimes(1);
});
