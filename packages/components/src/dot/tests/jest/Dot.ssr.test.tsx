/**
 * @jest-environment node
 */
import { Dot } from "@components/dot";
import { renderToString } from "react-dom/server";

test("can render on the server", () => {
    const renderOnServer = () =>
        renderToString(
            <Dot color="alias-basic" />
        );

    expect(renderOnServer).not.toThrow();
});
