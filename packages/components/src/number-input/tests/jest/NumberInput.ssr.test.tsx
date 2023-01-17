/**
 * @jest-environment node
 */
import { NumberInput } from "@components/number-input";
import { renderToString } from "react-dom/server";
import { throwOnConsoleLogs } from "@jest-utils";

test("can render on the server", () => {
    throwOnConsoleLogs();

    const renderOnServer = () =>
        renderToString(
            <NumberInput aria-label="Label" />
        );

    expect(renderOnServer).not.toThrow();
});
