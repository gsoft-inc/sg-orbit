/**
 * @jest-environment node
 */
import { AddIcon } from "@components/icons";
import { IconLink } from "@components/link";
import { renderToString } from "react-dom/server";

test("can render on the server", () => {
    const renderOnServer = () =>
        renderToString(
            <IconLink external href="#" aria-label="Add">
                <AddIcon />
            </IconLink>
        );

    expect(renderOnServer).not.toThrow();
});
