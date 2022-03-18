/**
 * @jest-environment node
 */
import { Autocomplete } from "@components/autocomplete";
import { Item } from "@components/collection";
import { renderToString } from "react-dom/server";

test("can render on the server", () => {
    const renderOnServer = () =>
        renderToString(
            <Autocomplete
                aria-label="Planet"
            >
                <Item key="earth">Earth</Item>
                <Item key="jupiter">Jupiter</Item>
                <Item key="mars">Mars</Item>
                <Item key="mercury">Mercury</Item>
            </Autocomplete>
        );

    expect(renderOnServer).not.toThrow();
});

