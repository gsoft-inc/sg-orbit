import { Content, Header } from "@react-components/placeholders";
import { Item } from "@react-components/placeholders";
import { KEYS } from "@react-components/shared";
import { Tabs } from "@react-components/tabs";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { createRef } from "react";

// ***** Ids *****

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

    expect(header.getAttribute("id")).toBe("foo-tab-0");
    expect(header.getAttribute("aria-controls")).toBe("foo-panel-0");
    expect(content.getAttribute("id")).toBe("foo-panel-0");
    expect(content.getAttribute("aria-labelledby")).toBe("foo-tab-0");
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

    expect(header.getAttribute("id")).toBe("tab-header");
    expect(content.getAttribute("aria-labelledby")).toBe("tab-header");
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

    expect(header.getAttribute("aria-controls")).toBe("tab-content");
    expect(content.getAttribute("id")).toBe("tab-content");
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

    expect(header.getAttribute("id")).toBe("o-ui-tabs-3-tab-0");
    expect(header.getAttribute("aria-controls")).toBe("o-ui-tabs-3-panel-0");
    expect(content.getAttribute("id")).toBe("o-ui-tabs-3-panel-0");
    expect(content.getAttribute("aria-labelledby")).toBe("o-ui-tabs-3-tab-0");
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

    expect(header.getAttribute("id")).toBe("o-ui-tabs-4-tab-0");
    expect(content.getAttribute("aria-labelledby")).toBe("o-ui-tabs-4-tab-0");
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

    expect(header.getAttribute("aria-controls")).toBe("o-ui-tabs-5-panel-0");
    expect(content.getAttribute("id")).toBe("o-ui-tabs-5-panel-0");
});

// ***** Accessibility *****

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
        <Tabs defaultIndex={1} aria-label="Tabs">
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
        fireEvent.keyDown(getByTestId("tab-2"), { key: "Space", keyCode: KEYS.space });
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
        fireEvent.keyDown(getByTestId("tab-2"), { key: "Enter", keyCode: KEYS.enter });
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
        fireEvent.keyDown(getByTestId("tab-1"), { key: "ArrowRight", keyCode: KEYS.right });
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
        fireEvent.keyDown(getByTestId("tab-1"), { key: "ArrowLeft", keyCode: KEYS.left });
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
        fireEvent.keyDown(getByTestId("tab-1"), { key: "ArrowDown", keyCode: KEYS.down });
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
        fireEvent.keyDown(getByTestId("tab-1"), { key: "ArrowUp", keyCode: KEYS.up });
    });

    await waitFor(() => expect(getByTestId("tab-3")).toHaveAttribute("aria-selected", "true"));
});

// ***** API *****

test("call onChange when the active tab change", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(
        <Tabs onChange={handler} aria-label="Tabs">
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

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), 1));
});

test("dont call onChange when a tab is disabled", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(
        <Tabs onChange={handler} aria-label="Tabs">
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
