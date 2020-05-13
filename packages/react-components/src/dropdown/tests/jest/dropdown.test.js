import { Dropdown } from "@react-components/dropdown";
import { createRef } from "react";
import { render, waitFor } from "@testing-library/react";
import { waitDelay } from "@utils/wait-delay";

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

    await waitFor(() => expect(getByTestId("dropdown")).toHaveFocus());
});

test("when autofocus is true, the inline dropdown is autofocused on render", async () => {
    const { getByTestId } = render(createDropdown({
        autofocus: true,
        inline: true
    }));

    await waitFor(() => expect(getByTestId("dropdown")).toHaveFocus());
});

test("when autofocus is true, the searchable dropdown is autofocused on render", async () => {
    const { getByTestId } = render(createDropdown({
        autofocus: true,
        search: true
    }));

    await waitFor(() => expect(getByTestId("dropdown").querySelector("input.search")).toHaveFocus());
});

test("when autofocus on a disabled dropdown, the dropdown is not autofocused on render", async () => {
    const { getByTestId } = render(createDropdown({
        disabled: true,
        autofocus: true
    }));

    await waitDelay(5);

    expect(getByTestId("dropdown")).not.toHaveFocus();
});

test("when delayed autofocus, the dropdown is autofocused after the delay", async () => {
    const { getByTestId } = render(createDropdown({
        autofocus: true,
        autofocusDelay: 50
    }));

    await waitDelay(5);

    expect(getByTestId("dropdown")).not.toHaveFocus();

    await waitFor(() => expect(getByTestId("dropdown")).toHaveFocus());
});

test("when delayed autofocus on a disabled dropdown, the dropdown is not autofocused after the delay", async () => {
    const { getByTestId } = render(createDropdown({
        disabled: true,
        autofocus: true,
        autofocusDelay: 50
    }));

    await waitDelay(60);

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

    await waitFor(() => expect(ref.current).not.toBeNull());

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

    await waitFor(() => expect(refNode).not.toBeNull());

    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("DIV");
    expect(refNode.getAttribute("data-testid")).toBe("dropdown");
});

test("set ref once", async () => {
    const handler = jest.fn();

    render(
        createDropdown({
            ref: handler
        })
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
