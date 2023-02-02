/**
 * @jest-environment node
 */
import { Dot } from "@components/dot";
import { renderToString } from "react-dom/server";
import { throwOnConsoleLogs } from "@test-utils";

test("can render on the server", () => {
    throwOnConsoleLogs();

    const renderOnServer = () =>
        renderToString(
            <Dot color="alias-basic" />
        );

    expect(renderOnServer).not.toThrow();
});
