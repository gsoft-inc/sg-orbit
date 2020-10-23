import { Content, Header } from "@react-components/layout";
import { Tab, Tabs } from "@react-components/tabs";
import { createRef } from "react";
import { render, waitFor } from "@testing-library/react";

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
    expect(ref.current.tagName).toBe("DIV");
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
