/**
 * @jest-environment node
 */
import { Form } from "@components/form";
import { renderToString } from "react-dom/server";

test("can render on the server", () => {
    const renderOnServer = () =>
        renderToString(
            <Form>
                <input type="text" />
            </Form>
        );

    expect(renderOnServer).not.toThrow();
});
