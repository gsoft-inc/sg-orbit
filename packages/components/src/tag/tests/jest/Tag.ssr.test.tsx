/**
 * @jest-environment node
 */
import { Tag } from "@components/tag";
import { renderToString } from "react-dom/server";
import { throwOnConsoleLogs } from "@test-utils";

test("can render on the server", () => {
    throwOnConsoleLogs();

    const renderOnServer = () =>
        renderToString(
            <Tag>Falcon 9</Tag>
        );

    expect(renderOnServer).not.toThrow();
});
