/**
 * @jest-environment node
 */
import { Counter } from "@components/counter";
import { renderToString } from "react-dom/server";

test("Server-side rendering: renders on a server without crashing", () => {
    const renderOnServer = () =>
        renderToString(
            <Counter>15</Counter>
        );
    expect(renderOnServer).not.toThrow();
});
