import { FilterIcon24, FilterIcon32 } from "./assets";
import { MultiVariantIcon, MultiVariantIconProps, createMultiVariantIcon } from "@components/icons";
import { renderWithTheme } from "@test-utils";

function createIcon(props: Omit<MultiVariantIconProps, "src24" | "src32"> = {}) {
    return <MultiVariantIcon
        src24={FilterIcon24}
        src32={FilterIcon32}
        {...props}
    />;
}

// ***** Refs *****

test("ref is a DOM element", async () => {
    let refNode: SVGSVGElement = null;

    renderWithTheme(
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
    let refNode: SVGSVGElement = null;

    const HocIcon = createMultiVariantIcon(FilterIcon24, FilterIcon32);

    renderWithTheme(
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
