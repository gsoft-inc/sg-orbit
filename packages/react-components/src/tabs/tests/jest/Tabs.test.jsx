import { Content, Header } from "@react-components/placeholders";
import { Item } from "@react-components/collection";
import { Keys } from "@react-components/shared";
import { Tabs } from "@react-components/tabs";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { createRef } from "react";
import { waitDelay } from "@utils/waitDelay";
import userEvent from "@testing-library/user-event";

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

    await waitFor(() => expect(getByTestId("tab-1")).not.toHaveAttribute("tabindex"));
    await waitFor(() => expect(getByTestId("tab-2")).toHaveAttribute("tabindex", "0"));

});

test("when manual, focusing a tab doesn't change the active tab", async () => {
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

test("when autofocus is true, the first item header is focused on render", async () => {
    const { getByTestId } = render(
        <Tabs autoFocus aria-label="Tabs">
            <Item>
                <Header data-testid="header-1">Header 1</Header>
                <Content>Content 1</Content>
            </Item>
            <Item>
                <Header>Header 2</Header>
                <Content>Content 2</Content>
            </Item>
        </Tabs>
    );

    await waitFor(() => expect(getByTestId("header-1")).toHaveFocus());
});

test("when autofocus is true and the first item is disabled, the next item header is focused on render", async () => {
    const { getByTestId } = render(
        <Tabs autoFocus aria-label="Tabs">
            <Item disabled>
                <Header>Header 1</Header>
                <Content>Content 1</Content>
            </Item>
            <Item>
                <Header data-testid="header-2">Header 2</Header>
                <Content>Content 2</Content>
            </Item>
        </Tabs>
    );

    await waitFor(() => expect(getByTestId("header-2")).toHaveFocus());
});

test("when autofocus is true and there is a selected key, the header of the item matching the selected key is focused on render", async () => {
    const { getByTestId } = render(
        <Tabs defaultSelectedKey="header-2" autoFocus aria-label="Tabs">
            <Item>
                <Header>Header 1</Header>
                <Content>Content 1</Content>
            </Item>
            <Item key="header-2">
                <Header data-testid="header-2">Header 2</Header>
                <Content>Content 2</Content>
            </Item>
        </Tabs>
    );

    await waitFor(() => expect(getByTestId("header-2")).toHaveFocus());
});

test("when autofocus is specified with a delay, the first item header is focused after the delay", async () => {
    const { getByTestId } = render(
        <Tabs autoFocus aria-label="Tabs">
            <Item>
                <Header data-testid="header-1">Header 1</Header>
                <Content>Content 1</Content>
            </Item>
            <Item>
                <Header>Header 2</Header>
                <Content>Content 2</Content>
            </Item>
        </Tabs>
    );

    await waitFor(() => expect(getByTestId("header-1")).not.toHaveFocus());

    await waitDelay(10);

    await waitFor(() => expect(getByTestId("header-1")).toHaveFocus());
});

// ***** Aria *****

test("when an id is provided, the tab id attribute match the provided id", async () => {
    const { getByTestId } = render(
        <Tabs id="foo" aria-label="Tabs" data-testid="tabs">
            <Item>
                <Header>Header 1</Header>
                <Content>Content 1</Content>
            </Item>
        </Tabs>
    );

    await waitFor(() => expect(getByTestId("tabs")).toHaveAttribute("id", "foo"));
});

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

    await waitFor(() => expect(header).toHaveAttribute("id", "foo-tab-0"));
    await waitFor(() => expect(header).toHaveAttribute("aria-controls", "foo-panel-0"));
    await waitFor(() => expect(content).toHaveAttribute("id", "foo-panel-0"));
    await waitFor(() => expect(content).toHaveAttribute("aria-labelledby", "foo-tab-0"));
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

    await waitFor(() => expect(header).toHaveAttribute("id", "tab-header"));
    await waitFor(() => expect(content).toHaveAttribute("aria-labelledby", "tab-header"));
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

    await waitFor(() => expect(header).toHaveAttribute("aria-controls", "tab-content"));
    await waitFor(() => expect(content).toHaveAttribute("id", "tab-content"));
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

    await waitFor(() => expect(header).toHaveAttribute("id"));
    await waitFor(() => expect(header).toHaveAttribute("aria-controls", content.getAttribute("id")));
    await waitFor(() => expect(content).toHaveAttribute("id"));
    await waitFor(() => expect(content).toHaveAttribute("aria-labelledby", header.getAttribute("id")));
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

    await waitFor(() => expect(header).toHaveAttribute("id"));
    await waitFor(() => expect(content).toHaveAttribute("aria-labelledby", header.getAttribute("id")));
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

    await waitFor(() => expect(content).toHaveAttribute("id"));
    await waitFor(() => expect(header.getAttribute("aria-controls")).toBe(content.getAttribute("id")));
});

test("a tab headers container have the \"tablist\" role", async () => {
    const { getByRole } = render(
        <Tabs aria-label="Tabs">
            <Item>
                <Header>Header 1</Header>
                <Content>Content 1</Content>
            </Item>
        </Tabs>
    );

    await waitFor(() => expect(getByRole("tablist")).toBeInTheDocument());
});

test("a tab header have the \"tab\" role", async () => {
    const { getByTestId } = render(
        <Tabs aria-label="Tabs">
            <Item>
                <Header data-testid="header">Header 1</Header>
                <Content>Content 1</Content>
            </Item>
        </Tabs>
    );

    await waitFor(() => expect(getByTestId("header")).toHaveAttribute("role", "tab"));
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
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});

test("call onSelectionChange once when a tab is clicked", async () => {
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
        userEvent.click(getByTestId("tab-2"));
    });

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});

test("dont' call onSelectionChange when the active tab is clicked", async () => {
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
        userEvent.click(getByTestId("tab-2"));
    });

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));

    act(() => {
        userEvent.click(getByTestId("tab-2"));
    });

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
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

    await waitFor(() => expect(handler).not.toHaveBeenCalled());
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

    await waitFor(() => expect(ref.current instanceof HTMLElement).toBeTruthy());
    await waitFor(() => expect(ref.current.tagName).toBe("BUTTON"));
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

    await waitFor(() => expect(ref.current instanceof HTMLElement).toBeTruthy());
    await waitFor(() => expect(ref.current.tagName).toBe("DIV"));
});
