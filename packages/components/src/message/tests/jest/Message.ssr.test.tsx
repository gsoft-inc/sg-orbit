/**
 * @jest-environment node
 */
import { Message } from "@components/message";
import { renderToString } from "react-dom/server";
import { throwOnConsoleLogs } from "@jest-utils";

test("can render on the server", () => {
    throwOnConsoleLogs();

    const renderOnServer = () =>
        renderToString(
            <Message variant="warning">Scheduled launch today at 1PM.</Message>
        );

    expect(renderOnServer).not.toThrow();
});
