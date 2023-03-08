/**
 * @jest-environment node
 */
import { Lozenge } from "@components/lozenge";
import { renderToString } from "react-dom/server";
import { throwOnConsoleLogs } from "@test-utils";

test("can render on the server", () => {
    throwOnConsoleLogs();

    const renderOnServer = () =>
        renderToString(
            <Lozenge>New</Lozenge>
        );

    expect(renderOnServer).not.toThrow();
});
