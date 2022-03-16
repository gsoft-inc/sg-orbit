/**
 * @jest-environment node
 */
import { TextAddon } from "@components/input-group";
import { renderToString } from "react-dom/server";

test("Server-side rendering: renders on a server without crashing", () => {
    const renderOnServer = () =>
        renderToString(
            <TextAddon>Text</TextAddon>
        );
    expect(renderOnServer).not.toThrow();
});
