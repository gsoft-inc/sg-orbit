/**
 * @jest-environment node
 */
import { Button } from "@components/button";
import { Content } from "@components/placeholders";
import { Disclosure } from "@components/disclosure";
import { renderToString } from "react-dom/server";

test("Server-side rendering: renders on a server without crashing", () => {
    const renderOnServer = () =>
        renderToString(
            <Disclosure>
                <Button>Header</Button>
                <Content>Content</Content>
            </Disclosure>
        );

    expect(renderOnServer).not.toThrow();
});
