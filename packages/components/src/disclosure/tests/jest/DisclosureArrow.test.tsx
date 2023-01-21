import { DisclosureArrow } from "@components/disclosure";
import { createRef } from "react";
import { renderWithTheme, waitFor } from "@test-utils";

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef<HTMLElement>();

    renderWithTheme(
        <DisclosureArrow open ref={ref} />
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof SVGElement).toBeTruthy();
    expect(ref.current.tagName.toUpperCase()).toBe("SVG");
});
