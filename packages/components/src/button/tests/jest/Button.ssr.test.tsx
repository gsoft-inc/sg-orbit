/**
 * @jest-environment node
 */
import { Button } from "@components/button";
import { renderToString } from "react-dom/server";

test("can render on the server", () => {
    const renderOnServer = () =>
        renderToString(
            <Button autoFocus variant="secondary">Cutoff</Button>
        );

    expect(renderOnServer).not.toThrow();
});
