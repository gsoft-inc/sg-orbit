import { DisclosureArrow } from "@components/disclosure";
import { createRef } from "react";
import { render, waitFor } from "@testing-library/react";

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef<HTMLElement>();

    render(
        <DisclosureArrow open ref={ref} />
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof SVGElement).toBeTruthy();
    expect(ref.current.tagName.toUpperCase()).toBe("SVG");
});