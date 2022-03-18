/**
 * @jest-environment node
 */
import { FilterIcon24, FilterIcon32 } from "./assets";
import { MultiVariantIcon } from "@components/icons";

import { renderToString } from "react-dom/server";

test("can render on the server", () => {
    const renderOnServer = () =>
        renderToString(
            <MultiVariantIcon
                src24={FilterIcon24}
                src32={FilterIcon32}
            />
        );

    expect(renderOnServer).not.toThrow();
});
