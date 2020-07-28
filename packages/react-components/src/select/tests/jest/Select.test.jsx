import { Select } from "@react-components/select";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { createRef, forwardRef } from "react";
import { waitDelay } from "@utils/wait-delay";

const SimpleSelect = forwardRef((props, ref) => {
    return (
        <Select
            {...props}
            options={[
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
            ]}
            ref={ref}
        />
    );
});

function getDropdownMenu(container) {
    return container.querySelector("div.menu.visible");
}

// ***** Behaviors *****

test("open the select on spacebar keydown", async () => {
    const { getByTestId, container } = render(<SimpleSelect />);

    const dropdownNode = getByTestId("dropdown");

    act(() => {
        dropdownNode.focus();
    });

    act(() => {
        fireEvent.keyDown(dropdownNode, { key: " ", keyCode: 32 });
    });

    await waitFor(() => expect(getDropdownMenu(container)).toBeInTheDocument());
});

test("open the select on enter keydown", async () => {
    const { getByTestId, container } = render(<SimpleSelect />);

    const dropdownNode = getByTestId("dropdown");

    act(() => {
        dropdownNode.focus();
    });

    act(() => {
        fireEvent.keyDown(dropdownNode, { key: "Enter", keyCode: 13 });
    });

    await waitFor(() => expect(getDropdownMenu(container)).toBeInTheDocument());
});

test("close the select on spacebar keydown", async () => {
    const { getByTestId, container } = render(<SimpleSelect />);

    const dropdownNode = getByTestId("dropdown");

    act(() => {
        dropdownNode.focus();
    });

    act(() => {
        fireEvent.keyDown(dropdownNode, { key: " ", keyCode: 32 });
    });

    await waitFor(() => expect(getDropdownMenu(container)).toBeInTheDocument());

    act(() => {
        fireEvent.keyDown(dropdownNode, { key: " ", keyCode: 32 });
    });

    await waitFor(() => expect(getDropdownMenu(container)).not.toBeInTheDocument());
});

test("close the select on enter keydown", async () => {
    const { getByTestId, container } = render(<SimpleSelect />);

    const dropdownNode = getByTestId("dropdown");

    act(() => {
        dropdownNode.focus();
    });

    act(() => {
        fireEvent.keyDown(dropdownNode, { key: "Enter", keyCode: 13 });
    });

    await waitFor(() => expect(getDropdownMenu(container)).toBeInTheDocument());

    act(() => {
        fireEvent.keyDown(dropdownNode, { key: "Enter", keyCode: 13 });
    });

    await waitFor(() => expect(getDropdownMenu(container)).not.toBeInTheDocument());
});

test("can open the select on enter keydown after closing on blur", async () => {
    const { getByTestId, container } = render(<SimpleSelect />);

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

test("when autoFocus is true, the dropdown is autofocused on render", async () => {
    const { getByTestId } = render(
        <SimpleSelect autoFocus />
    );

    await waitFor(() => expect(getByTestId("dropdown")).toHaveFocus());
});

test("when autoFocus is true, the inline dropdown is autofocused on render", async () => {
    const { getByTestId } = render(
        <SimpleSelect
            autoFocus
            inline
        />
    );

    await waitFor(() => expect(getByTestId("dropdown")).toHaveFocus());
});

test("when autoFocus is true, the searchable dropdown is autofocused on render", async () => {
    const { getByTestId } = render(
        <SimpleSelect
            autoFocus
            search
        />
    );

    await waitFor(() => expect(getByTestId("dropdown").querySelector("input.search")).toHaveFocus());
});

test("when autoFocus on a disabled dropdown, the dropdown is not autofocused on render", async () => {
    const { getByTestId } = render(
        <SimpleSelect
            autoFocus
            disabled
        />
    );

    await waitDelay(5);

    expect(getByTestId("dropdown")).not.toHaveFocus();
});

test("when delayed autoFocus, the dropdown is autofocused after the delay", async () => {
    const { getByTestId } = render(
        <SimpleSelect
            autoFocus
            autoFocusDelay={60}
        />
    );

    await waitDelay(5);

    expect(getByTestId("dropdown")).not.toHaveFocus();

    await waitFor(() => expect(getByTestId("dropdown")).toHaveFocus());
});

test("when delayed autoFocus on a disabled dropdown, the dropdown is not autofocused after the delay", async () => {
    const { getByTestId } = render(
        <SimpleSelect
            autoFocus
            autoFocusDelay={60}
            disabled
        />
    );

    await waitDelay(60);

    expect(getByTestId("dropdown")).not.toHaveFocus();
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef();

    render(
        <SimpleSelect ref={ref} />
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("DIV");
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode = null;

    render(
        <SimpleSelect
            ref={node => {
                refNode = node;
            }}
        />
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("DIV");
    expect(refNode.getAttribute("data-testid")).toBe("dropdown-wrapper");
});

test("set ref once", async () => {
    const handler = jest.fn();

    render(
        <SimpleSelect
            ref={handler}
        />
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
