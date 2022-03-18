/**
 * @jest-environment node
 */
import { Transition } from "@components/transition";
import { renderToString } from "react-dom/server";

test("can render on the server", () => {
    const renderOnServer = () =>
        renderToString(
            <Transition show>
                <span>Content</span>
            </Transition>
        );

    expect(renderOnServer).not.toThrow();
});
