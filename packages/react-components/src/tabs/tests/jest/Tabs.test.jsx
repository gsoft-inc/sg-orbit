import { Content, Header } from "@react-components/view";
import { Tab, Tabs } from "@react-components/tabs";
import { act, render, waitFor } from "@testing-library/react";
import { createRef } from "react";
import userEvent from "@utils/user-event";

test("when automatic, focusing a tab change the active tab", async () => {
    const handler = jest.fn();

    const { getByTestId } = render(
        <Tabs onChange={handler}>
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
        userEvent.click(getByTestId("tab-2").focus());
    });

    expect(handler).toHaveBeenLastCalledWith(expect.anything());
});

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
