/**
 * @jest-environment node
 */
import { Heading } from "@components/typography";
import { renderToString } from "react-dom/server";

test("can render on the server", () => {
    const renderOnServer = () =>
        renderToString(
            <Heading>Header</Heading>
        );

    expect(renderOnServer).not.toThrow();
});
