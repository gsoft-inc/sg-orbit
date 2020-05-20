import { DropdownMenu } from "@react-components/dropdown-menu";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { createRef } from "react";

const ACTIONS = [
    { key: "New", text: "New", value: "New" },
    { key: "Open...", text: "Open...", value: "Open..." },
    { key: "Rename...", text: "Rename...", value: "Rename..." }
];

function createDropdownMenu(props = {}) {
    return <DropdownMenu
        text = "File"
        options={ACTIONS}
        {...props}
    />;
}

function getDropdownMenu(container) {
    return container.querySelector("div.menu.visible");
}

// ***** Behaviors *****

test("open the dropdown menu on spacebar keydown", async () => {
    const { getByTestId, container } = render(createDropdownMenu());

    const dropdownNode = getByTestId("dropdown");

    act(() => {
        dropdownNode.focus();
    });

    act(() => {
        fireEvent.keyDown(dropdownNode, { key: " ", keyCode: 32 });
    });

    await waitFor(() => expect(getDropdownMenu(container)).toBeInTheDocument());
});

test("open the dropdown menu on enter keydown", async () => {
    const { getByTestId, container } = render(createDropdownMenu());

    const dropdownNode = getByTestId("dropdown");

    act(() => {
        dropdownNode.focus();
    });

    act(() => {
        fireEvent.keyDown(dropdownNode, { key: "Enter", keyCode: 13 });
    });

    await waitFor(() => expect(getDropdownMenu(container)).toBeInTheDocument());
});

// test("close the dropdown menu on spacebar keydown", async () => {
//     const { getByTestId, container } = render(createDropdownMenu());

//     const dropdownNode = getByTestId("dropdown");

//     act(() => {
//         dropdownNode.focus();
//     });

//     act(() => {
//         fireEvent.keyDown(dropdownNode, { key: " ", keyCode: 32 });
//     });

//     await waitFor(() => expect(getDropdownMenu(container)).toBeInTheDocument());

//     act(() => {
//         fireEvent.keyDown(dropdownNode, { key: " ", keyCode: 32 });
//     });

//     await waitFor(() => expect(getDropdownMenu(container)).not.toBeInTheDocument());
// });

// test("close the dropdown menu on enter keydown", async () => {
//     const { getByTestId, container } = render(createDropdownMenu());

//     const dropdownNode = getByTestId("dropdown");

//     act(() => {
//         dropdownNode.focus();
//     });

//     act(() => {
//         fireEvent.keyDown(dropdownNode, { key: "Enter", keyCode: 13 });
//     });

//     await waitFor(() => expect(getDropdownMenu(container)).toBeInTheDocument());

//     act(() => {
//         fireEvent.keyDown(dropdownNode, { key: "Enter", keyCode: 13 });
//     });

//     await waitFor(() => expect(getDropdownMenu(container)).not.toBeInTheDocument());
// });

test("can open the dropdown menu on enter keydown after closing on blur", async () => {
    const { getByTestId, container } = render(createDropdownMenu());

    const dropdownNode = getByTestId("dropdown");

    act(() => {
        dropdownNode.focus();
    });

    act(() => {
        fireEvent.keyDown(dropdownNode, { key: "Enter", keyCode: 13 });
    });

    await waitFor(() => expect(getDropdownMenu(container)).toBeInTheDocument());

    act(() => {
        fireEvent.click(document);
    });

    await waitFor(() => expect(getDropdownMenu(container)).not.toBeInTheDocument());

    act(() => {
        dropdownNode.focus();
    });

    act(() => {
        fireEvent.keyDown(dropdownNode, { key: "Enter", keyCode: 13 });
    });

    await waitFor(() => expect(getDropdownMenu(container)).toBeInTheDocument());
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef();

    render(
        createDropdownMenu({
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
        createDropdownMenu({
            ref: node => {
                refNode = node;
            }
        })
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("DIV");
    expect(refNode.getAttribute("data-testid")).toBe("dropdown-wrapper");
});

test("set ref once", async () => {
    const handler = jest.fn();

    render(
        createDropdownMenu({
            ref: handler
        })
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});


