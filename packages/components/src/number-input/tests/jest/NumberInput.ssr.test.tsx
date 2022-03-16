/**
 * @jest-environment node
 */
import { NumberInput } from "@components/number-input";
import { renderToString } from "react-dom/server";

test("Server-side rendering: renders on a server without crashing", () => {
    const renderOnServer = () =>
        renderToString(
            <NumberInput aria-label="Label" />
        );
    expect(renderOnServer).not.toThrow();
});
