/**
 * @jest-environment node
 */
import { SearchInput } from "@components/text-input";
import { renderToString } from "react-dom/server";
import { throwOnConsoleLogs } from "@test-utils";

test("can render on the server", () => {
    throwOnConsoleLogs();

    const renderOnServer = () =>
        renderToString(
            <SearchInput
                defaultValue="Mars"
                aria-label="Label"
            />
        );

    expect(renderOnServer).not.toThrow();
});
