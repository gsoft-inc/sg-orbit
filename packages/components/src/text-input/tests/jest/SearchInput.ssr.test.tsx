/**
 * @jest-environment node
 */
import { SearchInput } from "@components/text-input";
import { renderToString } from "react-dom/server";

test("Server-side rendering: renders on a server without crashing", () => {
    const renderOnServer = () =>
        renderToString(
            <SearchInput
                defaultValue="Mars"
                aria-label="Label"
            />
        );

    expect(renderOnServer).not.toThrow();
});
