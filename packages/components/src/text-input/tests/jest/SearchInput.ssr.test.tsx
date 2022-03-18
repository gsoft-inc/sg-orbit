/**
 * @jest-environment node
 */
import { SearchInput } from "@components/text-input";
import { renderToString } from "react-dom/server";

test("can render on the server", () => {
    const renderOnServer = () =>
        renderToString(
            <SearchInput
                defaultValue="Mars"
                aria-label="Label"
            />
        );

    expect(renderOnServer).not.toThrow();
});
