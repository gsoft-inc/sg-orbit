/**
 * @jest-environment node
 */
import { Button } from "@components/button";
import { Toolbar } from "@components/toolbar";
import { renderToString } from "react-dom/server";

test("Server-side rendering: renders on a server without crashing", () => {
    const renderOnServer = () =>
        renderToString(
            <Toolbar>
                <Button disabled>1</Button>
                <Button>2</Button>
            </Toolbar>
        );
    expect(renderOnServer).not.toThrow();
});
