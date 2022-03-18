/**
 * @jest-environment node
 */
import { Lozenge } from "@components/lozenge";
import { renderToString } from "react-dom/server";

test("can render on the server", () => {
    const renderOnServer = () =>
        renderToString(
            <Lozenge>New</Lozenge>
        );

    expect(renderOnServer).not.toThrow();
});
