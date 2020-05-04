import { Dropdown } from "@react-components/dropdown";
import { createRef } from "react";
import { render, wait } from "@testing-library/react";
import { waitDelay } from "@utils/wait-for";

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

function createDropdown(props = {}) {
    return <Dropdown
        options={GENDERS}
        {...props}
    />;
}

test("when autofocus is true, the dropdown is autofocused on render", async () => {
    const { getByTestId } = render(createDropdown({
        autofocus: true
    }));

    await waitDelay(25);

    expect(getByTestId("dropdown")).toHaveFocus();
});

test("when autofocus is true, the inline dropdown is autofocused on render", async () => {
    const { getByTestId } = render(createDropdown({
        autofocus: true,
        inline: true
    }));

    await waitDelay(25);

    expect(getByTestId("dropdown")).toHaveFocus();
});

test("when autofocus is true, the searchable dropdown is autofocused on render", async () => {
    const { getByTestId } = render(createDropdown({
        autofocus: true,
        search: true
    }));

    await waitDelay(25);

    expect(getByTestId("dropdown").querySelector("input.search")).toHaveFocus();
});

test("when autofocus on a disabled dropdown, the dropdown is not autofocused on render", async () => {
    const { getByTestId } = render(createDropdown({
        disabled: true,
        autofocus: true
    }));

    await waitDelay(25);

    expect(getByTestId("dropdown")).not.toHaveFocus();
});

test("when delayed autofocus, the dropdown is autofocused after the delay", async () => {
    const { getByTestId } = render(createDropdown({
        autofocus: true,
        autofocusDelay: 100
    }));

    await wait();
    expect(getByTestId("dropdown")).not.toHaveFocus();

    // Cannot use testing-library "wait" utility function because the callback is fire on the next tick and it resolve to true which make it a valid expectation.
    await waitDelay(110);
    expect(getByTestId("dropdown")).toHaveFocus();
});

test("when delayed autofocus on a disabled dropdown, the dropdown is not autofocused after the delay", async () => {
    const { getByTestId } = render(createDropdown({
        disabled: true,
        autofocus: true,
        autofocusDelay: 100
    }));

    await wait();
    expect(getByTestId("dropdown")).not.toHaveFocus();

    // Cannot use testing-library "wait" utility function because the callback is fire on the next tick and it resolve to true which make it a valid expectation.
    await waitDelay(110);
    expect(getByTestId("dropdown")).not.toHaveFocus();
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef();

    render(
        createDropdown({
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
        createDropdown({
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
