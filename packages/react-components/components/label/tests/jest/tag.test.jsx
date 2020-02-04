import { Tag } from "@orbit-ui/react-label/src";
import { render, wait } from "@testing-library/react";

// ***** Refs *****

test("ref is a DOM element", async () => {
    let refNode = null;

    render(
        <Tag
            ref={node => {
                refNode = node;
            }}
        />
    );

    await wait();

    expect(refNode).not.toBeNull();
    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("DIV");
});
