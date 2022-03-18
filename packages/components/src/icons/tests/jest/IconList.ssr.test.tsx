/**
 * @jest-environment node
 */
import { CheckIcon, IconList } from "@components/icons";
import { renderToString } from "react-dom/server";

test("can render on the server", () => {
    const renderOnServer = () =>
        renderToString(
            <IconList >
                <CheckIcon />
                <CheckIcon />
            </IconList>
        );

    expect(renderOnServer).not.toThrow();
});
