/**
 * @jest-environment node
 */
import { NumberInput } from "@components/number-input";
import { renderToString } from "react-dom/server";

test("can render on the server", () => {
    const renderOnServer = () =>
        renderToString(
            <NumberInput aria-label="Label" />
        );

    expect(renderOnServer).not.toThrow();
});
