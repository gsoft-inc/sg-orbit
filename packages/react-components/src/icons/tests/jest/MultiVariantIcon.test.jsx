import { FilterIcon24, FilterIcon32 } from "./assets";
import { MultiVariantIcon, createMultiVariantIcon } from "@react-components/icons";
import { render } from "@testing-library/react";

function createIcon(props = {}) {
    return <MultiVariantIcon
        type24={FilterIcon24}
        type32={FilterIcon32}
        {...props}
    />;
}

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

    expect(refNode).not.toBeNull();
    expect(refNode instanceof SVGElement).toBeTruthy();
    expect(refNode.tagName.toUpperCase()).toBe("SVG");
});

test("hoc icon ref is a DOM element", async () => {
    let refNode = null;

    const HocIcon = createMultiVariantIcon(FilterIcon24, FilterIcon32);

    render(
        <HocIcon
            ref={node => {
                refNode = node;
            }}
        />
    );

    expect(refNode).not.toBeNull();
    expect(refNode instanceof SVGElement).toBeTruthy();
    expect(refNode.tagName.toUpperCase()).toBe("SVG");
});
