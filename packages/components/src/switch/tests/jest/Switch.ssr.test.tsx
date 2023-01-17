/**
 * @jest-environment node
 */
import { Switch } from "@components/switch";
import { renderToString } from "react-dom/server";
import { throwOnConsoleLogs } from "@jest-utils";

test("can render on the server", () => {
    throwOnConsoleLogs();

    const renderOnServer = () =>
        renderToString(
            <Switch autoFocus>Engines</Switch>
        );

    expect(renderOnServer).not.toThrow();
});
