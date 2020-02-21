import { FilterIcon24, FilterIcon32 } from "./assets";
import { MultiVariantIcon } from "@orbit-ui/react-icons/src";
import { render, wait } from "@testing-library/react";

function createIcon(props = {}) {
    return <MultiVariantIcon
        type24={FilterIcon24}
        type32={FilterIcon32}
        {...props}
    />;
}

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
