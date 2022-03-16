/**
 * @jest-environment node
 */
import { CheckIcon, IconList } from "@components/icons";
import { renderToString } from "react-dom/server";

test("Server-side rendering: renders on a server without crashing", () => {
    const renderOnServer = () =>
        renderToString(
            <IconList >
                <CheckIcon />
                <CheckIcon />
            </IconList>
        );
    expect(renderOnServer).not.toThrow();
});
