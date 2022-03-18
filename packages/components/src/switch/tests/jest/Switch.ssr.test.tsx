/**
 * @jest-environment node
 */
import { Switch } from "@components/switch";
import { renderToString } from "react-dom/server";

test("Server-side rendering: renders on a server without crashing", () => {
    const renderOnServer = () =>
        renderToString(
            <Switch autoFocus>Engines</Switch>
        );

    expect(renderOnServer).not.toThrow();
});
