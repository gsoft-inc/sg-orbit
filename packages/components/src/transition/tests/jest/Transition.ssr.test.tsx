/**
 * @jest-environment node
 */
import { Transition } from "@components/transition";
import { renderToString } from "react-dom/server";
import { throwOnConsoleLogs } from "@test-utils";

test("can render on the server", () => {
    throwOnConsoleLogs();

    const renderOnServer = () =>
        renderToString(
            <Transition show>
                <span>Content</span>
            </Transition>
        );

    expect(renderOnServer).not.toThrow();
});
