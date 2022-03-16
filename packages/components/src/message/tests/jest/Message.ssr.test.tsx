/**
 * @jest-environment node
 */
import { Message } from "@components/message";
import { renderToString } from "react-dom/server";

test("Server-side rendering: renders on a server without crashing", () => {
    const renderOnServer = () =>
        renderToString(
            <Message variant="warning">Scheduled launch today at 1PM.</Message>
        );
    expect(renderOnServer).not.toThrow();
});
