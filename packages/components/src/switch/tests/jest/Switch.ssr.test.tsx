/**
 * @jest-environment node
 */
import { Switch } from "@components/switch";
import { renderToString } from "react-dom/server";

test("can render on the server", () => {
    const renderOnServer = () =>
        renderToString(
            <Switch autoFocus>Engines</Switch>
        );

    expect(renderOnServer).not.toThrow();
});
