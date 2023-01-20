/**
 * @jest-environment node
 */
import { FilterMajorIcon24, FilterMajorIcon32 } from "./assets";
import { MultiVariantIcon } from "@components/icons";
import { renderToString } from "react-dom/server";
import { throwOnConsoleLogs } from "@jest-utils";

test("can render on the server", () => {
    throwOnConsoleLogs();

    const renderOnServer = () =>
        renderToString(
            <MultiVariantIcon
                src24={FilterMajorIcon24}
                src32={FilterMajorIcon32}
            />
        );

    expect(renderOnServer).not.toThrow();
});
