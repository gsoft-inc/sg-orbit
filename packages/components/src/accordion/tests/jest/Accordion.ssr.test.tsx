/**
 * @jest-environment node
 */
import { Accordion } from "@components/accordion";
import { Content } from "@components/placeholders";
import { H3 } from "@components/typography";
import { Item } from "@components/collection";
import { renderToString } from "react-dom/server";

test("can render on the server", () => {
    const renderOnServer = () =>
        renderToString(
            <Accordion>
                <Item>
                    <H3>Header</H3>
                    <Content>Content</Content>
                </Item>
                <Item>
                    <H3>Header</H3>
                    <Content>Content</Content>
                </Item>
                <Item>
                    <H3>Header</H3>
                    <Content>Content</Content>
                </Item>
            </Accordion>
        );

    expect(renderOnServer).not.toThrow();
});

