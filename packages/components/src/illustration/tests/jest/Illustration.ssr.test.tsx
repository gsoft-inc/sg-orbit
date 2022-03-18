/**
 * @jest-environment node
 */
import { Div } from "@components/html";
import { Illustration } from "@components/illustration";
import { renderToString } from "react-dom/server";

test("can render on the server", () => {
    const renderOnServer = () =>
        renderToString(
            <Illustration>
                <Div slot="image">Image</Div>
            </Illustration>
        );

    expect(renderOnServer).not.toThrow();
});
