/**
 * @jest-environment node
 */
import { TextLink } from "@components/link";
import { renderToString } from "react-dom/server";

test("Server-side rendering: renders on a server without crashing", () => {
    const renderOnServer = () =>
        renderToString(
            <TextLink external href="#">
                Flight details
            </TextLink>
        );
    expect(renderOnServer).not.toThrow();
});
