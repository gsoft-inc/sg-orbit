/**
 * @jest-environment node
 */
import { TextArea } from "@components/text-area";
import { renderToString } from "react-dom/server";

test("Server-side rendering: renders on a server without crashing", () => {
    const renderOnServer = () =>
        renderToString(
            <TextArea autoFocus aria-label="Label" />
        );

    expect(renderOnServer).not.toThrow();
});
