/**
 * @jest-environment node
 */
import { Item } from "@components/collection";
import { Select } from "@components/select";
import { renderToString } from "react-dom/server";

test("can render on the server", () => {
    const renderOnServer = () =>
        renderToString(
            <Select>
                <Item key="earth">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Select>
        );

    expect(renderOnServer).not.toThrow();
});
