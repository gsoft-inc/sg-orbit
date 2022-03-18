/**
 * @jest-environment node
 */
import { Button } from "@components/button";
import { renderToString } from "react-dom/server";

test("Server-side rendering: renders on a server without crashing", () => {
    const renderOnServer = () =>
        renderToString(
            <Button autoFocus variant="secondary">Cutoff</Button>
        );

    expect(renderOnServer).not.toThrow();
});
