/**
 * @jest-environment node
 */
import { Form } from "@components/form";
import { renderToString } from "react-dom/server";
import { throwOnConsoleLogs } from "@jest-utils";

test("can render on the server", () => {
    throwOnConsoleLogs();

    const renderOnServer = () =>
        renderToString(
            <Form>
                <input type="text" />
            </Form>
        );

    expect(renderOnServer).not.toThrow();
});
