/**
 * @jest-environment node
 */
import { Transition } from "@components/transition";
import { renderToString } from "react-dom/server";

test("Server-side rendering: renders on a server without crashing", () => {
    const renderOnServer = () =>
        renderToString(
            <Transition show>
                <span>Content</span>
            </Transition>
        );
    expect(renderOnServer).not.toThrow();
});
