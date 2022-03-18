/**
 * @jest-environment node
 */
import { Button } from "@components/button";
import { Item } from "@components/collection";
import { Menu, MenuTrigger } from "@components/menu";
import { renderToString } from "react-dom/server";

test("can render on the server", () => {
    const renderOnServer = () =>
        renderToString(
            <MenuTrigger>
                <Button>Trigger</Button>
                <Menu>
                    <Item key="earth">Earth</Item>
                    <Item key="mars">Mars</Item>
                    <Item key="saturn">Saturn</Item>
                </Menu>
            </MenuTrigger>
        );

    expect(renderOnServer).not.toThrow();
});
