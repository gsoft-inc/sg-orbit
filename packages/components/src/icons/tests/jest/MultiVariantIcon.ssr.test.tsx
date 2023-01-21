/**
 * @jest-environment node
 */
import { FilterIcon24, FilterIcon32 } from "./assets";
import { MultiVariantIcon } from "@components/icons";
import { renderToString } from "react-dom/server";
import { throwOnConsoleLogs } from "@test-utils";

test("can render on the server", () => {
    throwOnConsoleLogs();

    const renderOnServer = () =>
        renderToString(
            <MultiVariantIcon
                src24={FilterIcon24}
                src32={FilterIcon32}
            />
        );

    expect(renderOnServer).not.toThrow();
});
