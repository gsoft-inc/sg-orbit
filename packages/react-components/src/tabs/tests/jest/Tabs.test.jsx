import { Content, Header } from "@react-components/view";
import { Tab, Tabs } from "@react-components/tabs";
import { act, render, waitFor } from "@testing-library/react";
import { createRef } from "react";
import userEvent from "@utils/user-event";

/*
MISSING JEST TEST:
    - when tab is disabled tabIndex = -1
    - throw an error when the selectedIndex is controlled and match a disabled tab
    - selected the first non disabled tab when the selectedIndex is uncontrolled (test with defaultIndex and without a defaultIndex)
    - onChange
    - throw when children is null or undefined
*/

test("when automatic, focusing a tab change the active tab", async () => {
    const { getByTestId } = render(
        <Tabs>
            <Tab>
                <Header>Header 1</Header>
                <Content>Content 1</Content>
            </Tab>
            <Tab>
                <Header data-testid="tab-2">Header 2</Header>
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
        <Tabs manual>
            <Tab>
                <Header>Header 1</Header>
                <Content>Content 1</Content>
            </Tab>
            <Tab>
                <Header data-testid="tab-2">Header 2</Header>
                <Content>Content 2</Content>
            </Tab>
        </Tabs>
    );

    act(() => {
        getByTestId("tab-2").focus();
    });

    await waitFor(() => expect(getByTestId("tab-2")).toHaveAttribute("aria-selected", "false"));
});

// test("when manual, spacebar keypress makes a tab active", async () => {

// });

// ***** API *****

/*
- call onChange when the active tab change (validate new index)
- don't call onChange when the tab is disabled
- can focus a tab with the focus api ???
*/

// ***** Refs *****

test("header ref is a DOM element", async () => {
    const ref = createRef();

    render(
        <Tabs>
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
        <Tabs>
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
