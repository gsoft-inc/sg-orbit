/**
 * @jest-environment node
 */
import { Avatar, AvatarGroup } from "@components/avatar";
import { renderToString } from "react-dom/server";

test("can render on the server", () => {
    const renderOnServer = () =>
        renderToString(
            <AvatarGroup>
                <Avatar name="Elon Musk" />
                <Avatar name="Kimbal Musk" />
            </AvatarGroup>
        );

    expect(renderOnServer).not.toThrow();
});

