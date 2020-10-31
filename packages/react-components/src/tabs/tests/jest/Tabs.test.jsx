import { Content, Header } from "@react-components/view";
import { KEYS } from "@react-components/shared";
import { Tab, Tabs } from "@react-components/tabs";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { createRef } from "react";

// ***** Accessibility *****

test("first tab is tabbable", async () => {
    const { getByTestId } = render(
        <Tabs aria-label="Planets">
            <Tab data-testid="tab-1">
                <Header>Header 1</Header>
                <Content>Content 1</Content>
            </Tab>
            <Tab data-testid="tab-2">
                <Header>Header 2</Header>
                <Content>Content 2</Content>
            </Tab>
        </Tabs>
    );

    await waitFor(() => expect(getByTestId("tab-1")).toHaveAttribute("tabindex", "0"));
    await waitFor(() => expect(getByTestId("tab-2")).toHaveAttribute("tabindex", "-1"));
});

test("selected tab is tabbable", async () => {
    const { getByTestId } = render(
        <Tabs defaultIndex={1} aria-label="Planets">
            <Tab data-testid="tab-1">
                <Header>Header 1</Header>
                <Content>Content 1</Content>
            </Tab>
            <Tab data-testid="tab-2">
                <Header>Header 2</Header>
                <Content>Content 2</Content>
            </Tab>
        </Tabs>
    );

    await waitFor(() => expect(getByTestId("tab-1")).toHaveAttribute("tabindex", "-1"));
    await waitFor(() => expect(getByTestId("tab-2")).toHaveAttribute("tabindex", "0"));
});

test("a disabled tab is not tabbable", async () => {
    const { getByTestId } = render(
        <Tabs aria-label="Planets">
            <Tab disabled data-testid="tab-1">
                <Header>Header 1</Header>
                <Content>Content 1</Content>
            </Tab>
            <Tab data-testid="tab-2">
                <Header>Header 2</Header>
                <Content>Content 2</Content>
            </Tab>
        </Tabs>
    );

    expect(getByTestId("tab-1")).not.toHaveAttribute("tabindex");
    await waitFor(() => expect(getByTestId("tab-2")).toHaveAttribute("tabindex", "0"));

});

test("when automatic, focusing a tab change the active tab", async () => {
    const { getByTestId } = render(
        <Tabs aria-label="Planets">
            <Tab>
                <Header>Header 1</Header>
                <Content>Content 1</Content>
            </Tab>
            <Tab data-testid="tab-2">
                <Header>Header 2</Header>
                <Content>Content 2</Content>
            </Tab>
        </Tabs>
    );

    act(() => {
        getByTestId("tab-2").focus();
    });

    await waitFor(() => expect(getByTestId("tab-2")).toHaveAttribute("aria-selected", "true"));
});

test("when manual, focusing a tab shouldn't change the active tab", async () => {
    const { getByTestId } = render(
        <Tabs manual aria-label="Planets">
            <Tab>
                <Header>Header 1</Header>
                <Content>Content 1</Content>
            </Tab>
            <Tab data-testid="tab-2">
                <Header>Header 2</Header>
                <Content>Content 2</Content>
            </Tab>
        </Tabs>
    );

    act(() => {
        getByTestId("tab-2").focus();
    });

    await waitFor(() => expect(getByTestId("tab-2")).toHaveAttribute("aria-selected", "false"));
});

test("when manual, spacebar keypress makes a tab active", async () => {
    const { getByTestId } = render(
        <Tabs manual aria-label="Planets">
            <Tab>
                <Header>Header 1</Header>
                <Content>Content 1</Content>
            </Tab>
            <Tab data-testid="tab-2">
                <Header>Header 2</Header>
                <Content>Content 2</Content>
            </Tab>
        </Tabs>
    );

    act(() => {
        fireEvent.keyDown(getByTestId("tab-2"), { key: "Space", keyCode: KEYS.space });
    });

    await waitFor(() => expect(getByTestId("tab-2")).toHaveAttribute("aria-selected", "true"));
});

test("when manual, enter keypress makes a tab active", async () => {
    const { getByTestId } = render(
        <Tabs manual aria-label="Planets">
            <Tab>
                <Header>Header 1</Header>
                <Content>Content 1</Content>
            </Tab>
            <Tab data-testid="tab-2">
                <Header>Header 2</Header>
                <Content>Content 2</Content>
            </Tab>
        </Tabs>
    );

    act(() => {
        fireEvent.keyDown(getByTestId("tab-2"), { key: "Enter", keyCode: KEYS.enter });
    });

    await waitFor(() => expect(getByTestId("tab-2")).toHaveAttribute("aria-selected", "true"));
});

test("when horizontal, right arrow keypress select the next tab", async () => {
    const { getByTestId } = render(
        <Tabs aria-label="Planets">
            <Tab data-testid="tab-1">
                <Header>Header 1</Header>
                <Content>Content 1</Content>
            </Tab>
            <Tab data-testid="tab-2">
                <Header>Header 2</Header>
                <Content>Content 2</Content>
            </Tab>
            <Tab>
                <Header>Header 3</Header>
                <Content>Content 3</Content>
            </Tab>
        </Tabs>
    );

    act(() => {
        fireEvent.keyDown(getByTestId("tab-1"), { key: "ArrowRight", keyCode: KEYS.right });
    });

    await waitFor(() => expect(getByTestId("tab-2")).toHaveAttribute("aria-selected", "true"));
});

test("when horizontal, left arrow keypress select the next tab", async () => {
    const { getByTestId } = render(
        <Tabs aria-label="Planets">
            <Tab data-testid="tab-1">
                <Header>Header 1</Header>
                <Content>Content 1</Content>
            </Tab>
            <Tab>
                <Header>Header 2</Header>
                <Content>Content 2</Content>
            </Tab>
            <Tab data-testid="tab-3">
                <Header>Header 3</Header>
                <Content>Content 3</Content>
            </Tab>
        </Tabs>
    );

    act(() => {
        fireEvent.keyDown(getByTestId("tab-1"), { key: "ArrowLeft", keyCode: KEYS.left });
    });

    await waitFor(() => expect(getByTestId("tab-3")).toHaveAttribute("aria-selected", "true"));
});

test("when vertical, down arrow keypress select the next tab", async () => {
    const { getByTestId } = render(
        <Tabs orientation="vertical" aria-label="Planets">
            <Tab data-testid="tab-1">
                <Header>Header 1</Header>
                <Content>Content 1</Content>
            </Tab>
            <Tab data-testid="tab-2">
                <Header>Header 2</Header>
                <Content>Content 2</Content>
            </Tab>
            <Tab>
                <Header>Header 3</Header>
                <Content>Content 3</Content>
            </Tab>
        </Tabs>
    );

    act(() => {
        fireEvent.keyDown(getByTestId("tab-1"), { key: "ArrowDown", keyCode: KEYS.down });
    });

    await waitFor(() => expect(getByTestId("tab-2")).toHaveAttribute("aria-selected", "true"));
});

test("when vertical, up arrow keypress select the next tab", async () => {
    const { getByTestId } = render(
        <Tabs orientation="vertical" aria-label="Planets">
            <Tab data-testid="tab-1">
                <Header>Header 1</Header>
                <Content>Content 1</Content>
            </Tab>
            <Tab>
                <Header>Header 2</Header>
                <Content>Content 2</Content>
            </Tab>
            <Tab data-testid="tab-3">
                <Header>Header 3</Header>
                <Content>Content 3</Content>
            </Tab>
        </Tabs>
    );

    act(() => {
        fireEvent.keyDown(getByTestId("tab-1"), { key: "ArrowUp", keyCode: KEYS.up });
    });

    await waitFor(() => expect(getByTestId("tab-3")).toHaveAttribute("aria-selected", "true"));
});

// ***** API *****

test("call onChange when the active tab change", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(
        <Tabs onChange={handler} aria-label="Planets">
            <Tab>
                <Header>Header 1</Header>
                <Content>Content 1</Content>
            </Tab>
            <Tab data-testid="tab-2">
                <Header>Header 2</Header>
                <Content>Content 2</Content>
            </Tab>
        </Tabs>
    );

    act(() => {
        fireEvent.click(getByTestId("tab-2"));
    });

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), 1));
});

test("dont call onChange when a tab is disabled", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(
        <Tabs onChange={handler} aria-label="Planets">
            <Tab>
                <Header>Header 1</Header>
                <Content>Content 1</Content>
            </Tab>
            <Tab disabled data-testid="tab-2">
                <Header>Header 2</Header>
                <Content>Content 2</Content>
            </Tab>
        </Tabs>
    );

    act(() => {
        fireEvent.click(getByTestId("tab-2"));
    });

    expect(handler).not.toHaveBeenCalled();
});

// ***** Refs *****

test("header ref is a DOM element", async () => {
    const ref = createRef();

    render(
        <Tabs aria-label="Planets">
            <Tab>
                <Header ref={ref}>Header</Header>
                <Content>Content</Content>
            </Tab>
        </Tabs>
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("BUTTON");
});

test("content ref is a DOM element", async () => {
    const ref = createRef();

    render(
        <Tabs aria-label="Planets">
            <Tab>
                <Header>Header</Header>
                <Content ref={ref}>Content</Content>
            </Tab>
        </Tabs>
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("DIV");
});
