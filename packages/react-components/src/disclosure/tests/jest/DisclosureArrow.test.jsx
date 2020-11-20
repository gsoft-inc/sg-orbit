import { DisclosureArrow } from "@react-components/disclosure";
import { createRef } from "react";
import { render, waitFor } from "@testing-library/react";

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef();

    render(
        <DisclosureArrow open ref={ref} />
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof SVGElement).toBeTruthy();
    expect(ref.current.tagName.toUpperCase()).toBe("SVG");
});
