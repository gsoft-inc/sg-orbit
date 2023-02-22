/**
 * @jest-environment node
 */
import { AddMajorIcon } from "@components/icons";
import { Link } from "@components/link";
import { renderToString } from "react-dom/server";
import { throwOnConsoleLogs } from "@test-utils";

test("can render on the server", () => {
    throwOnConsoleLogs();

    const renderOnServer = () =>
        renderToString(
            <Link external href="#" aria-label="Add">
                <AddMajorIcon />
            </Link>
        );

    expect(renderOnServer).not.toThrow();
});
