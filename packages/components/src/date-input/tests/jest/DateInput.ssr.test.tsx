/**
 * @jest-environment node
 */
import { DateInput } from "@components/date-input";
import { renderToString } from "react-dom/server";
import { throwOnConsoleLogs } from "@test-utils";

test("can render on the server", () => {
    throwOnConsoleLogs();

    const renderOnServer = () =>
        renderToString(
            <DateInput
                max={new Date(2021, 0, 1)}
            />
        );

    expect(renderOnServer).not.toThrow();
});
