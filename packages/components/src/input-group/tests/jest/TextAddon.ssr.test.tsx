/**
 * @jest-environment node
 */
import { TextAddon } from "@components/input-group";
import { renderToString } from "react-dom/server";

test("can render on the server", () => {
    const renderOnServer = () =>
        renderToString(
            <TextAddon>Text</TextAddon>
        );

    expect(renderOnServer).not.toThrow();
});
