/**
 * @jest-environment node
 */
import { Form } from "@components/form";
import { renderToString } from "react-dom/server";

test("Server-side rendering: renders on a server without crashing", () => {
    const renderOnServer = () =>
        renderToString(
            <Form>
                <input type="text" />
            </Form>
        );
    expect(renderOnServer).not.toThrow();
});
