/**
 * @jest-environment node
 */
import { TextLink } from "@components/link";
import { renderToString } from "react-dom/server";

test("can render on the server", () => {
    const renderOnServer = () =>
        renderToString(
            <TextLink external href="#">
                Flight details
            </TextLink>
        );

    expect(renderOnServer).not.toThrow();
});
