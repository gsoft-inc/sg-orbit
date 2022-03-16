/**
 * @jest-environment node
 */
import { AddIcon } from "@components/icons";
import { IconLink } from "@components/link";
import { renderToString } from "react-dom/server";

test("Server-side rendering: renders on a server without crashing", () => {
    const renderOnServer = () =>
        renderToString(
            <IconLink external href="#" aria-label="Add">
                <AddIcon />
            </IconLink>
        );
    expect(renderOnServer).not.toThrow();
});
