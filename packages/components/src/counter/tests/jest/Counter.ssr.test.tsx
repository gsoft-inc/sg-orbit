/**
 * @jest-environment node
 */
import { Counter } from "@components/counter";
import { renderToString } from "react-dom/server";

test("can render on the server", () => {
    const renderOnServer = () =>
        renderToString(
            <Counter>15</Counter>
        );

    expect(renderOnServer).not.toThrow();
});
