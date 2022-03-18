/**
 * @jest-environment node
 */
import { Divider } from "@components/divider";
import { renderToString } from "react-dom/server";

test("can render on the server", () => {
    const renderOnServer = () =>
        renderToString(
            <Divider />
        );

    expect(renderOnServer).not.toThrow();
});
