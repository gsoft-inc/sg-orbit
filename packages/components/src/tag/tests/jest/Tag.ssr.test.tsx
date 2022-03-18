/**
 * @jest-environment node
 */
import { Tag } from "@components/tag";
import { renderToString } from "react-dom/server";

test("can render on the server", () => {
    const renderOnServer = () =>
        renderToString(
            <Tag>Falcon 9</Tag>
        );

    expect(renderOnServer).not.toThrow();
});
