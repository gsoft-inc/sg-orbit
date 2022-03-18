/**
 * @jest-environment node
 */
import { Text } from "@components/typography";
import { renderToString } from "react-dom/server";

test("can render on the server", () => {
    const renderOnServer = () =>
        renderToString(
            <Text>Text</Text>
        );

    expect(renderOnServer).not.toThrow();
});
