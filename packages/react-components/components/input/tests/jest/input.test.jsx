import { Input } from "@orbit-ui/react-input/src";
import { render, wait } from "@testing-library/react";

// ***** Refs *****

test("ref is a DOM element", async () => {
    let refNode = null;

    render(
        <Input
            ref={node => {
                refNode = node;
            }}
        />
    );

    await wait();

    expect(refNode).not.toBeNull();
    expect(refNode instanceof HTMLElement).toBeTruthy();
});
