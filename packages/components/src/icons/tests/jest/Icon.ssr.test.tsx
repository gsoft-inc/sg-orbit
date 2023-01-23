/**
 * @jest-environment node
 */
import { AzureIcon32 } from "./assets";
import { Icon } from "@components/icons";
import { renderToString } from "react-dom/server";
import { throwOnConsoleLogs } from "@test-utils";

test("can render on the server", () => {
    throwOnConsoleLogs();

    const renderOnServer = () =>
        renderToString(
            <Icon
                src={AzureIcon32}
            />
        );

    expect(renderOnServer).not.toThrow();
});
