/**
 * @jest-environment node
 */
import { CheckMajorIcon, IconList } from "@components/icons";
import { renderToString } from "react-dom/server";
import { throwOnConsoleLogs } from "@test-utils";

test("can render on the server", () => {
    throwOnConsoleLogs();

    const renderOnServer = () =>
        renderToString(
            <IconList >
                <CheckMajorIcon />
                <CheckMajorIcon />
            </IconList>
        );

    expect(renderOnServer).not.toThrow();
});
