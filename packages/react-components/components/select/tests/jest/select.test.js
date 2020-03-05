import { Select } from "@orbit-ui/react-select/src";
import { createRef } from "react";
import { render, wait } from "@testing-library/react";
import { waitFor } from "@utils/wait-for";

const GENDERS = [
    {
        key: "Male",
        text: "Male",
        value: "Male"
    },
    {
        key: "Female",
        text: "Female",
        value: "Female"
    }
];

function createSelect(props = {}) {
    return <Select
        options={GENDERS}
        {...props}
    />;
}

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef();

    render(
        createSelect({
            ref
        })
    );

    await wait();

    expect(ref.current).not.toBeNull();
    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("DIV");
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode = null;

    render(
        createSelect({
            ref: node => {
                refNode = node;
            }
        })
    );

    await wait();

    expect(refNode).not.toBeNull();
    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("DIV");
    expect(refNode.getAttribute("data-testid")).toBe("dropdown");
});
