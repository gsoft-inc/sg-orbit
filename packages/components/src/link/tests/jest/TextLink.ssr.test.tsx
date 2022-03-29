/**
 * @jest-environment node
 */
import { TextLink } from "@components/link";
import { renderToString } from "react-dom/server";
import { throwOnConsoleLogs } from "@jest-utils";

test("can render on the server", () => {
    throwOnConsoleLogs();
    
    const renderOnServer = () =>
        renderToString(
            <TextLink external href="#">
                Flight details
            </TextLink>
        );

    expect(renderOnServer).not.toThrow();
});
