/**
 * @jest-environment node
 */
import { TextArea } from "@components/text-area";
import { renderToString } from "react-dom/server";

test("can render on the server", () => {
    const renderOnServer = () =>
        renderToString(
            <TextArea autoFocus aria-label="Label" />
        );

    expect(renderOnServer).not.toThrow();
});
