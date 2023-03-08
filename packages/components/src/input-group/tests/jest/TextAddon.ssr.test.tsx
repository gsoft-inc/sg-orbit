/**
 * @jest-environment node
 */
import { TextAddon } from "@components/input-group";
import { renderToString } from "react-dom/server";
import { throwOnConsoleLogs } from "@test-utils";

test("can render on the server", () => {
    throwOnConsoleLogs();

    const renderOnServer = () =>
        renderToString(
            <TextAddon>Text</TextAddon>
        );

    expect(renderOnServer).not.toThrow();
});
