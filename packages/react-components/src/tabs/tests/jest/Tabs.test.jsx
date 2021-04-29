import { Content, Header } from "@react-components/placeholders";
import { Item } from "@react-components/collection";
import { Keys } from "@react-components/shared";
import { Tabs } from "@react-components/tabs";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { createRef } from "react";

// ***** Aria *****

test("when a root id is provided, it is used to compose the tab and panel ids", async () => {
    const { getByTestId } = render(
        <Tabs id="foo" aria-label="Tabs">
            <Item>
                <Header data-testid="header">Header 1</Header>
                <Content data-testid="content">Content 1</Content>
            </Item>
        </Tabs>
    );

    const header = await waitFor(() => getByTestId("header"));
    const content = await waitFor(() => getByTestId("content"));

    expect(header).toHaveAttribute("id", "foo-tab-0");
    expect(header).toHaveAttribute("aria-controls", "foo-panel-0");
    expect(content).toHaveAttribute("id", "foo-panel-0");
    expect(content).toHaveAttribute("aria-labelledby", "foo-tab-0");
});

test("when an header id is provided, it is assigned to the tab id", async () => {
    const { getByTestId } = render(
        <Tabs aria-label="Tabs">
            <Item>
                <Header id="tab-header" data-testid="header">Header 1</Header>
                <Content data-testid="content">Content 1</Content>
            </Item>
        </Tabs>
    );

    const header = await waitFor(() => getByTestId("header"));
    const content = await waitFor(() => getByTestId("content"));

    expect(header).toHaveAttribute("id", "tab-header");
    expect(content).toHaveAttribute("aria-labelledby", "tab-header");
});

test("when a content id is provided, it is assigned to the content id", async () => {
    const { getByTestId } = render(
        <Tabs aria-label="Tabs">
            <Item>
                <Header data-testid="header">Header 1</Header>
                <Content id="tab-content" data-testid="content">Content 1</Content>
            </Item>
        </Tabs>
    );

    const header = await waitFor(() => getByTestId("header"));
    const content = await waitFor(() => getByTestId("content"));

    expect(header).toHaveAttribute("aria-controls", "tab-content");
    expect(content).toHaveAttribute("id", "tab-content");
});

test("when the root id is auto generated, it is used to compose the tab and panel ids", async () => {
    const { getByTestId } = render(
        <Tabs aria-label="Tabs">
            <Item>
                <Header data-testid="header">Header 1</Header>
                <Content data-testid="content">Content 1</Content>
            </Item>
        </Tabs>
    );

    const header = await waitFor(() => getByTestId("header"));
    const content = await waitFor(() => getByTestId("content"));

    expect(header).toHaveAttribute("id");
    expect(header).toHaveAttribute("aria-controls", content.getAttribute("id"));
    expect(content).toHaveAttribute("id");
    expect(content).toHaveAttribute("aria-labelledby", header.getAttribute("id"));
});

test("when the header id is auto generated, it is assigned to the tab id", async () => {
    const { getByTestId } = render(
        <Tabs aria-label="Tabs">
            <Item>
                <Header data-testid="header">Header 1</Header>
                <Content data-testid="content">Content 1</Content>
            </Item>
        </Tabs>
    );

    const header = await waitFor(() => getByTestId("header"));
    const content = await waitFor(() => getByTestId("content"));

    expect(header).toHaveAttribute("id");
    expect(content).toHaveAttribute("aria-labelledby", header.getAttribute("id"));
});

test("when the content id is auto generated, it is assigned to the tab id", async () => {
    const { getByTestId } = render(
        <Tabs aria-label="Tabs">
            <Item>
                <Header data-testid="header">Header 1</Header>
                <Content data-testid="content">Content 1</Content>
            </Item>
        </Tabs>
    );

    const header = await waitFor(() => getByTestId("header"));
    const content = await waitFor(() => getByTestId("content"));

    expect(content).toHaveAttribute("id");
    expect(header.getAttribute("aria-controls")).toBe(content.getAttribute("id"));
});

// ***** Behaviors *****

test("first tab is tabbable", async () => {
    const { getByTestId } = render(
        <Tabs aria-label="Tabs">
            <Item data-testid="tab-1">
                <Header>Header 1</Header>
                <Content>Content 1</Content>
            </Item>
            <Item data-testid="tab-2">
                <Header>Header 2</Header>
                <Content>Content 2</Content>
            </Item>
        </Tabs>
    );

    await waitFor(() => expect(getByTestId("tab-1")).toHaveAttribute("tabindex", "0"));
    await waitFor(() => expect(getByTestId("tab-2")).toHaveAttribute("tabindex", "-1"));
});

test("selected tab is tabbable", async () => {
    const { getByTestId } = render(
        <Tabs defaultSelectedKey="tab-2" aria-label="Tabs">
            <Item key="tab-1" data-testid="tab-1">
                <Header>Header 1</Header>
                <Content>Content 1</Content>
            </Item>
            <Item key="tab-2" data-testid="tab-2">
                <Header>Header 2</Header>
                <Content>Content 2</Content>
            </Item>
        </Tabs>
    );

    await waitFor(() => expect(getByTestId("tab-1")).toHaveAttribute("tabindex", "-1"));
    await waitFor(() => expect(getByTestId("tab-2")).toHaveAttribute("tabindex", "0"));
});

test("a disabled tab is not tabbable", async () => {
    const { getByTestId } = render(
        <Tabs aria-label="Tabs">
            <Item disabled data-testid="tab-1">
                <Header>Header 1</Header>
                <Content>Content 1</Content>
            </Item>
            <Item data-testid="tab-2">
                <Header>Header 2</Header>
                <Content>Content 2</Content>
            </Item>
        </Tabs>
    );

    expect(getByTestId("tab-1")).not.toHaveAttribute("tabindex");
    await waitFor(() => expect(getByTestId("tab-2")).toHaveAttribute("tabindex", "0"));

});

test("when automatic, focusing a tab change the active tab", async () => {
    const { getByTestId } = render(
        <Tabs aria-label="Tabs">
            <Item>
                <Header>Header 1</Header>
                <Content>Content 1</Content>
            </Item>
            <Item data-testid="tab-2">
                <Header>Header 2</Header>
                <Content>Content 2</Content>
            </Item>
        </Tabs>
    );

    act(() => {
        getByTestId("tab-2").focus();
    });

    await waitFor(() => expect(getByTestId("tab-2")).toHaveAttribute("aria-selected", "true"));
});

test("when manual, focusing a tab shouldn't change the active tab", async () => {
    const { getByTestId } = render(
        <Tabs manual aria-label="Tabs">
            <Item>
                <Header>Header 1</Header>
                <Content>Content 1</Content>
            </Item>
            <Item data-testid="tab-2">
                <Header>Header 2</Header>
                <Content>Content 2</Content>
            </Item>
        </Tabs>
    );

    act(() => {
        getByTestId("tab-2").focus();
    });

    await waitFor(() => expect(getByTestId("tab-2")).toHaveAttribute("aria-selected", "false"));
});

test("when manual, spacebar keypress makes a tab active", async () => {
    const { getByTestId } = render(
        <Tabs manual aria-label="Tabs">
            <Item>
                <Header>Header 1</Header>
                <Content>Content 1</Content>
            </Item>
            <Item data-testid="tab-2">
                <Header>Header 2</Header>
                <Content>Content 2</Content>
            </Item>
        </Tabs>
    );

    act(() => {
        fireEvent.keyDown(getByTestId("tab-2"), { key: Keys.space });
    });

    await waitFor(() => expect(getByTestId("tab-2")).toHaveAttribute("aria-selected", "true"));
});

test("when manual, enter keypress makes a tab active", async () => {
    const { getByTestId } = render(
        <Tabs manual aria-label="Tabs">
            <Item>
                <Header>Header 1</Header>
                <Content>Content 1</Content>
            </Item>
            <Item data-testid="tab-2">
                <Header>Header 2</Header>
                <Content>Content 2</Content>
            </Item>
        </Tabs>
    );

    act(() => {
        fireEvent.keyDown(getByTestId("tab-2"), { key: Keys.enter });
    });

    await waitFor(() => expect(getByTestId("tab-2")).toHaveAttribute("aria-selected", "true"));
});

test("when horizontal, right arrow keypress select the next tab", async () => {
    const { getByTestId } = render(
        <Tabs aria-label="Tabs">
            <Item data-testid="tab-1">
                <Header>Header 1</Header>
                <Content>Content 1</Content>
            </Item>
            <Item data-testid="tab-2">
                <Header>Header 2</Header>
                <Content>Content 2</Content>
            </Item>
            <Item>
                <Header>Header 3</Header>
                <Content>Content 3</Content>
            </Item>
        </Tabs>
    );

    act(() => {
        getByTestId("tab-1").focus();
    });

    act(() => {
        fireEvent.keyDown(getByTestId("tab-1"), { key: Keys.arrowRight });
    });

    await waitFor(() => expect(getByTestId("tab-2")).toHaveAttribute("aria-selected", "true"));
});

test("when horizontal, left arrow keypress select the next tab", async () => {
    const { getByTestId } = render(
        <Tabs aria-label="Tabs">
            <Item data-testid="tab-1">
                <Header>Header 1</Header>
                <Content>Content 1</Content>
            </Item>
            <Item>
                <Header>Header 2</Header>
                <Content>Content 2</Content>
            </Item>
            <Item data-testid="tab-3">
                <Header>Header 3</Header>
                <Content>Content 3</Content>
            </Item>
        </Tabs>
    );

    act(() => {
        getByTestId("tab-1").focus();
    });

    act(() => {
        fireEvent.keyDown(getByTestId("tab-1"), { key: Keys.arrowLeft });
    });

    await waitFor(() => expect(getByTestId("tab-3")).toHaveAttribute("aria-selected", "true"));
});

test("when vertical, down arrow keypress select the next tab", async () => {
    const { getByTestId } = render(
        <Tabs orientation="vertical" aria-label="Tabs">
            <Item data-testid="tab-1">
                <Header>Header 1</Header>
                <Content>Content 1</Content>
            </Item>
            <Item data-testid="tab-2">
                <Header>Header 2</Header>
                <Content>Content 2</Content>
            </Item>
            <Item>
                <Header>Header 3</Header>
                <Content>Content 3</Content>
            </Item>
        </Tabs>
    );

    act(() => {
        getByTestId("tab-1").focus();
    });

    act(() => {
        fireEvent.keyDown(getByTestId("tab-1"), { key: Keys.arrowDown });
    });

    await waitFor(() => expect(getByTestId("tab-2")).toHaveAttribute("aria-selected", "true"));
});

test("when vertical, up arrow keypress select the next tab", async () => {
    const { getByTestId } = render(
        <Tabs orientation="vertical" aria-label="Tabs">
            <Item data-testid="tab-1">
                <Header>Header 1</Header>
                <Content>Content 1</Content>
            </Item>
            <Item>
                <Header>Header 2</Header>
                <Content>Content 2</Content>
            </Item>
            <Item data-testid="tab-3">
                <Header>Header 3</Header>
                <Content>Content 3</Content>
            </Item>
        </Tabs>
    );

    act(() => {
        getByTestId("tab-1").focus();
    });

    act(() => {
        fireEvent.keyDown(getByTestId("tab-1"), { key: Keys.arrowUp });
    });

    await waitFor(() => expect(getByTestId("tab-3")).toHaveAttribute("aria-selected", "true"));
});

// ***** Api *****

test("call onSelectionChange when the active tab change", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(
        <Tabs onSelectionChange={handler} aria-label="Tabs">
            <Item>
                <Header>Header 1</Header>
                <Content>Content 1</Content>
            </Item>
            <Item data-testid="tab-2">
                <Header>Header 2</Header>
                <Content>Content 2</Content>
            </Item>
        </Tabs>
    );

    act(() => {
        fireEvent.click(getByTestId("tab-2"));
    });

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), "1"));
});

test("dont call onSelectionChange when a tab is disabled", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(
        <Tabs onSelectionChange={handler} aria-label="Tabs">
            <Item>
                <Header>Header 1</Header>
                <Content>Content 1</Content>
            </Item>
            <Item disabled data-testid="tab-2">
                <Header>Header 2</Header>
                <Content>Content 2</Content>
            </Item>
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
        <Tabs aria-label="Tabs">
            <Item>
                <Header ref={ref}>Header</Header>
                <Content>Content</Content>
            </Item>
        </Tabs>
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("BUTTON");
});

test("content ref is a DOM element", async () => {
    const ref = createRef();

    render(
        <Tabs aria-label="Tabs">
            <Item>
                <Header>Header</Header>
                <Content ref={ref}>Content</Content>
            </Item>
        </Tabs>
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("DIV");
});
