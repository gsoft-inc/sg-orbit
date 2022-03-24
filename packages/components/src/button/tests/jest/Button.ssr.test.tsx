/**
 * @jest-environment node
 */
import { Button } from "@components/button";
import { renderToString } from "react-dom/server";
import { throwOnConsoleLogs } from "@jest-utils";

test("can render on the server", () => {
    throwOnConsoleLogs();

    const renderOnServer = () =>
        renderToString(
            <Button autoFocus variant="secondary">Cutoff</Button>
        );

    expect(renderOnServer).not.toThrow();
});
