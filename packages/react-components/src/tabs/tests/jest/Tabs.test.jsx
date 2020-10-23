import { Content, Header } from "@react-components/view";
import { Tab, Tabs } from "@react-components/tabs";
import { createRef } from "react";
import { render, waitFor } from "@testing-library/react";

// test("when automatic, focusing a tab change the active tab", async () => {
//     const { getByTestId, queryByTestId } = render(
//         <Tabs>
//             <Tab>
//                 <Header>Header 1</Header>
//                 <Content>Content 1</Content>
//             </Tab>
//             <Tab>
//                 <Header>Header 2</Header>
//                 <Content>Content 2</Content>
//             </Tab>
//         </Tabs>
//     );

//     act(() => {

//     });
// });

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
