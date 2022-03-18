/**
 * @jest-environment node
 */
import { DateInput } from "@components/date-input";
import { renderToString } from "react-dom/server";

test("Server-side rendering: renders on a server without crashing", () => {
    const renderOnServer = () =>
        renderToString(
            <DateInput
                max={new Date(2021, 0, 1)}
            />
        );

    expect(renderOnServer).not.toThrow();
});
