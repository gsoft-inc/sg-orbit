/**
 * @jest-environment node
 */
import { Image } from "@components/image";
import { renderToString } from "react-dom/server";

test("can render on the server", () => {
    const renderOnServer = () =>
        renderToString(
            <Image src="https://bit.ly/dan-abramov" alt="Dan Abramov" />
        );

    expect(renderOnServer).not.toThrow();
});
