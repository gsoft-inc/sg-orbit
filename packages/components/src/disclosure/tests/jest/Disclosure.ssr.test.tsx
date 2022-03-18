/**
 * @jest-environment node
 */
import { Button } from "@components/button";
import { Content } from "@components/placeholders";
import { Disclosure } from "@components/disclosure";
import { renderToString } from "react-dom/server";
import { throwOnConsoleLogs } from "@jest-utils";

test("can render on the server", () => {
    throwOnConsoleLogs();

    const renderOnServer = () =>
        renderToString(
            <Disclosure>
                <Button>Header</Button>
                <Content>Content</Content>
            </Disclosure>
        );

    expect(renderOnServer).not.toThrow();
});
