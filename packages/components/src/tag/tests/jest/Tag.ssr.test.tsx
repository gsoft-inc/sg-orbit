/**
 * @jest-environment node
 */
import { Tag } from "@components/tag";
import { renderToString } from "react-dom/server";

test("Server-side rendering: renders on a server without crashing", () => {
    const renderOnServer = () =>
        renderToString(
            <Tag>Falcon 9</Tag>
        );
    expect(renderOnServer).not.toThrow();
});
