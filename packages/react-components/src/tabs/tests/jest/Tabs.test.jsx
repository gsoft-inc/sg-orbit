import { Panel, Tab, Tabs } from "@react-components/tabs";
import { createRef } from "react";
import { render, waitFor } from "@testing-library/react";

// ***** Refs *****

test("tab ref is a DOM element", async () => {
    const ref = createRef();

    render(
        <Tabs>
            <Tab ref={ref}>Tab</Tab>
            <Panel>Panel</Panel>
        </Tabs>
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("DIV");
});

test("panel ref is a DOM element", async () => {
    const ref = createRef();

    render(
        <Tabs>
            <Tab>Tab</Tab>
            <Panel ref={ref}>Panel</Panel>
        </Tabs>
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("DIV");
});
