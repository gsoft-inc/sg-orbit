/**
 * @jest-environment node
 */
import { CheckIcon, IconList } from "@components/icons";
import { renderToString } from "react-dom/server";
import { throwOnConsoleLogs } from "@test-utils";

test("can render on the server", () => {
    throwOnConsoleLogs();

    const renderOnServer = () =>
        renderToString(
            <IconList >
                <CheckIcon />
                <CheckIcon />
            </IconList>
        );

    expect(renderOnServer).not.toThrow();
});
