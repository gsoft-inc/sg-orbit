/**
 * @jest-environment node
 */
import { Content, Header } from "@components/placeholders";
import { Item } from "@components/collection";
import { Tabs } from "@components/tabs";
import { renderToString } from "react-dom/server";

test("Server-side rendering: renders on a server without crashing", () => {
    const renderOnServer = () =>
        renderToString(
            <Tabs aria-label="Tabs" collapsible={false}>
                <Item>
                    <Header>Header 1</Header>
                    <Content>Content 1</Content>
                </Item>
                <Item>
                    <Header>Header 2</Header>
                    <Content>Content 2</Content>
                </Item>
            </Tabs>
        );
    expect(renderOnServer).not.toThrow();
});
