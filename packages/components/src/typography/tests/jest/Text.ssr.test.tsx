/**
 * @jest-environment node
 */
import { Text } from "@components/typography";
import { renderToString } from "react-dom/server";

test("Server-side rendering: renders on a server without crashing", () => {
    const renderOnServer = () =>
        renderToString(
            <Text>Text</Text>
        );

    expect(renderOnServer).not.toThrow();
});
